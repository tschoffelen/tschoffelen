---
title: Running ESBuild in the Browser
description: So, I found out the other day that it’s possible to run ESBuild –
  that tool you usually use for bundling Javascript and Typescript code…
date: 2023-09-16T17:36:17.793Z
taxonomies:
  category:
    - Reference
extra: {}
---
So, I found out the other day that it's possible to run ESBuild – that tool you usually use for bundling Javascript and Typescript code (used by Vite and Snowpack) – in the browser!

There is a package called [`esbuild-wasm`](https://www.npmjs.com/package/esbuild-wasm), which contains a WebAssembly binary version of the bundler, meaning you can invoke it in the browser with a few lines of code:

```js
import * as esbuild from "esbuild-wasm";

await esbuild.initialize({
	worker: true,
	wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
});

const result = await esbuild.transform(code, options);
```

This allows you to do really fun things, like building an online [Javascript notebooks](https://jsnotebook.dev) application!

Using the ESBuild `plugins` infrastructure, you can easily extend it to allow dynamic imports from HTTP sources, which is quite cool for building an online code preview tool.

I really enjoyed playing around with this, and can't wait to find ways to use my new notebooks tool - here's a quick example of what it can be used for: [comparing available CRC32 libraries](https://jsnotebook.dev/lNz5qyl).

---

Sources:

* [ESBuild Documentation - In the browser](https://schof.co/running-esbuild-in-the-browser)