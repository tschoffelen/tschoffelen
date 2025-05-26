---
title: Keeping Your Environments Distinct with Separate Favicons
date: 2025-05-26
description: When you're working on a web app that runs in multiple environments (dev, staging, production), it's easy to get confused and get frustrated about a...
taxonomies:
  category:
    - Blog
extra: {}
---

When you're working on a web app that runs in multiple environments (dev, staging, production), it's easy to get confused and get frustrated about a change not working, only to realise that you've been refreshing the production app rather than your locally running version for the last 5 minutes.

To keep it easier to separate them, I like to set custom titles and favicons based on the stage:

<img src="https://mirri.link/yG4-hfT" alt="Image" />

In [Vite](https://vite.dev/), it's pretty easy to do so. 

First, we configure some variables in our `vite.config.js`:

```js
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    define: {
      "import.meta.env.VITE_STAGE_SUFFIX": JSON.stringify(
        mode === "production" ? "" : `-${mode}`,
      ),
      "import.meta.env.VITE_TITLE_PREFIX": JSON.stringify(
        mode === "production" ? "" : `(${mode}) `,
      ),
    },
    // ...
  };
}
```

Now we can use these variables in our `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <title>%VITE_TITLE_PREFIX%Examplary</title>

    <link
      rel="icon"
      href="/images/favicon%VITE_STAGE_SUFFIX%.svg"
      type="image/svg+xml"
    />
```

This will load `/images/favicon.svg` in production, and `/images/favicon-{mode}.svg` in every other mode.


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>