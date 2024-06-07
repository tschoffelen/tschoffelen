---
title: Processing MDX into an OpenAPI specification
description: Last night, I realised I wanted to set up a Postman collection for
  an API we have built. The easiest way to do this seemed to be to import…
date: 2023-07-15T13:01:35.753Z
taxonomies:
  category:
    - Reference
extra: {}
---
Last night, I realised I wanted to set up a [Postman](https://www.postman.com) collection for an API we have built. The easiest way to do this seemed to be to import an [OpenAPI specification](https://en.wikipedia.org/wiki/OpenAPI_Specification) JSON/YAML file.

We didn't have one, but we do have a documentation site built using [MDX](https://mdxjs.com) files that will contain snippets like this:

```html
# Insights API

<ApiMethod
  method="get"
  path="/analytics/local-listings"
  summary="Get weekly impressions and clicks">
  Get weekly clicks and impressions stats.

  <Parameter in="query" name="storeId" type="uuid" required>
    The ID of a store to query
  </Parameter>
  <Parameter in="query" name="startDate" type="date" required>
    Start date, in format `yyyy-mm-dd`
  </Parameter>

  <Response status="200 OK">
    { "data": [...] }
  </Response>
</ApiMethod>
```

I really enjoy writing MDX. Markdown is very core to how I write in any app, and MDX adds a bit of interactivity and structure to it.


## Parsing MDX
These MDX pages contain all the data we would need to build our OpenAPI spec document. But, how can we get this out of there without building our own parser, which definitely seemed outside of the scope of my energy level last night.

A good starting point seemed to be the [MDX compiler](https://mdxjs.com/packages/mdx/), provided as an NPM package with the catchy name `@mdx-js/mdx`.

It has a few different methods, and usually `compile(file, options?)` would be the one you'd use to start your journey of rendering MDX.

But, there's also this lovely `createProcessor()` method. It returns a [`unified`](https://unifiedjs.com) pipeline that is used by the `compile` method.

We can use it like this:

```js
import fs from "node:fs/promises";
import { createProcessor } from "@mdx-js/mdx";
    
const pipeline = createProcessor();
  
const tree = await pipeline.parse(
	await fs.readFile('insights-api.mdx')
);
    
/*  
returns an AST object that looks like this:
{
  type: 'root',
  children: [
    { type: 'heading', children: [Array] },
    { type: 'mdxJsxFlowElement', name: 'ApiMethod', attributes: [Array], children: [Array] }
    { type: 'paragraph', children: [Array] },
    { type: 'paragraph', children: [Array] }
  ]
}
*/
```

Okay, now we're off to the races.

## Parsing the AST

The `parse` method on the processing pipeline returns an abstract syntax tree. We can now walk through this to extract our data:

```js
const processTree = (tree) => {
	for (const child of tree.children) {
		if (child.name === "ApiMethod") {
			// add API method to the spec file
		} else if (child.children?.length) {
			// make sure we recursively walk through the nested tree
			processTree(child);
		}
	}
}
```

Now we just need to extract the right attributes and build our OpenAPI JSON payload!

The full (very messy) code [can be found here](https://gist.github.com/tschoffelen/c90267addffc3526e39e61c1deed3aee).