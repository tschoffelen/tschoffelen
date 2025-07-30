---
title: Building a Plugin System for a React App
date: 2025-07-30
description: Examplary is a new tool we're building to help teachers create better tests and exams.  One of my philosophies about product development is that the...
taxonomies:
  category:
    - Blog
extra: {}
---


[Examplary](https://examplary.ai) is a new tool we're building to help teachers create better tests and exams.

One of my philosophies about product development is that the more integration and extensibility options you create within a product, the more opportunities you're creating for a community to flourish around it. As part of that, I wanted to make it possible to create custom question types.

When creating an exam, you have a few default question types you can choose from - single line text, multiple choice, essay, etc. In the future, I envision also being able to add programming questions, diagramming questions, and all sorts of subject-specific questions.

Rather than having to implement these all within the core platform, I wanted to give other developers the opportunity to build these question types, and make them available on the platform.

So after a few weeks of thinking about it, within a few days, I built an MVP, including [developer documentation](https://developers.examplary.ai/question-types/), a [CLI tool](https://www.npmjs.com/package/@examplary/question-type-bundler) for local development and publishing, and an open-sourced [default question types](https://github.com/examplary-ai/default-questions-pack) pack.

<img src="https://mirri.link/4UOLnLN" alt="Image" />

## Anatomy of a question type

Under the hood, question types consist of a JSON file with metadata, and one or more React components that are shown within the Examplary UI in different scenarios (e.g. one to display the question to a student when taking a test online, one for the print version of the question, and one to show the student's answer in the teacher's review tool).

```
my-custom-question-type/  
├── question-type.json  
├── icon.svg  
├── component-assessment.jsx  
└── component-print.jsx
```

## How it works

It took me a long time to think about the best way to get arbitrary React components rendered within our front-end. After all, modern React components require some transpiling and bundling to make them executable in a browser. 

I didn't want to have developers creating a question type have to deal with Vite or [Esbuild](https://esbuild.github.io) directly though, so I decided to build a simple CLI tool in Node that uses Esbuild under the hood to bundle the React components in a format I can load within the main Examplary app. It also will detect any [Tailwind CSS](https://tailwindcss.com) classes used in the component, and bundle the resulting CSS styles alongside the component.

The [CLI](https://www.npmjs.com/package/@examplary/question-type-bundler) then uploads these to our file storage, and [calls the Examplary API](https://developers.examplary.ai/rest-api/post-question-types) to insert or update the question type definition in our database.

In the metadata file, you can specify whether you want to make your question type available for use by all Examplary users, or only within the workspace your API key is tied to.

## Under the hood: bundling

My description of the bundling might make it seem like this is a long, difficult process, but I was astonished how few lines of code were required for this.

Here's what the main JS bundling looks like (omitting some boring code that generates and saves source maps):

```js
import { build } from "esbuild";

const buildComponent = async (file) => {
  const res = await build({
    entryPoints: [file],
    bundle: true,
    write: false,
    minify: true,
    platform: "browser",
    format: "cjs",
    external: [
      "@examplary/ui",
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react-dom/client",
    ],
  });

  let js = res.outputFiles[0].text;
  return js;
}
```

By specifying React and `@examplary/ui` as external, we're telling the bundler not to bundle references to them, but instead to keep `require()` statements to load those libraries at run-time. Since we already include them in our main app front-end, we don't want to double up and make our bundle sizes much larger!

## Under the hood: front-end rendering
The actual rendering of the bundled components is a bit more complicated.

Since we've specified CommonJS as the format for bundling, the code expects to be executed in an environment where the `module` object and the `require` function exist.

For our purposes, we can implement minimal versions of these, like so:

```js
import * as React from 'react';
import * as ExamplaryUI from '@examplary/ui';

const module = { 
  exports: {}
};

const require = (name) => {
  if (name === "react") return React;
  if (name === "@examplary/ui") return ExamplaryUI;
  throw new Error(`Module not found: ${name}`);
};
```

Now we can execute our bundled code within the context of these two variables. There's a few ways to do that, and none of them seem very clean.

Here's the one that will probably make some Eslint rules shout:

```js
// Execute our bundled code in context
const scopedJs = `const { require, module } = this; ${js}`;
new Function(scopedJs).call({
  module,
  require
});

// If it worked, module.exports should now be populated!
const Component = module.exports.default;
if (!Component) {
  throw new RuntimeError('No default export found!');
}

// Now you can render <Component />
```

What this does is create a new function from a string (similar to the dangerous `eval`!), and then set `this` to be whatever you pass into `.call()`. We then destruct `this` so we have `module` and `require` variables in the scope.

**In production, you might want to consider running this code in an `<iframe>` to shield it from the rest of your application**, and you probably want to throw in some `try ... catch` statements to display error messages if something goes wrong at any step of this process.


## Under the hood: styles
Since the rest of Examplary uses Tailwind, I also wanted the option of using Tailwind class names in my question type components. 

Tailwind usually scans your files to dynamically only create the CSS you need, given the class names you use.

Including a line like this in your React component:

```jsx
<input className="mt-4" />
```

Causes Tailwind to spit out this in your stylesheet:

```css
.mt-4 {
  margin-top: calc(var(--spacing) * 4);
}
```

Of course, Tailwind won't know about the class names used in question types, since the code for those isn't part of the main application's codebase.

There are also static builds of Tailwind that include all default styles, but those are really bulky, plus they don't allow some of the more dynamic options in Tailwind I tend to rely on, like being able to specify any value by including it within square brackets:

```jsx
<input className="h-[158px]" />
```

So instead, I decided to run the Tailwind bundler over the React components as part of the question type bundling process. Again, the code is a lot simpler than you might expect:

```js
const buildStyles = async () => {
  const inputCSS = `@import "tailwindcss";`;

  const result = await postcss([
    tailwindcss({
      optimize: { minify: true },
    }),
  ]).process(inputCSS, { from: "styles.css" });

  return result.css;
}
```

That's all that's needed to generate a Tailwind CSS file based on the classes used in files in the current working directory.

In our production version, we do a bit more to remove Tailwind's default CSS reset styles (the ['preflight styles'](https://tailwindcss.com/docs/preflight#disabling-preflight)) to ensure the bundle is as small as possible, and so that it doesn't override any of our custom theme in the main app.


## Conclusion

I do really think that extensible software is better software, but I also simply really enjoyed this challenge. 

Building developer tools that are easy to use and abstract all the complexity is quite fun, and this was a project where I spent almost more time upfront thinking out how the whole thing would work than building it. Having those puzzle pieces slot into place (almost always whilst in the shower or dozing off to sleep) is an amazing feeling.

Now we'll just have to wait and see if anyone other than me will ever use this to build custom question types 😁



<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>