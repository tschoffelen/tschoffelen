---
title: Rendering a PDF Page to a JPEG in Node.js
date: 2025-06-06
description: "`PDF.js` is one of those libraries that seems amazing in its scope – it's able to render basically any PDF you throw at it into an HTML canvas, with..."
taxonomies:
  category:
    - Reference
extra: {}
---


`PDF.js` is one of those libraries that seems amazing in its scope – it's able to render basically any PDF you throw at it into an HTML canvas, with all of the weirdness of the PDF file format.

It's also confusing and not super well documented.

I had to implement a use case where I wanted to let users select a section of a page from a PDF to embed it as a 'clipping' in their text. My rich text editor of choice, [TipTap](https://tiptap.dev/), made it very easy to create a custom node type for that, which would allow the user (or an AI prompt response) to insert a custom HTML element that looked like this:

```html
<page-clipping url="https://url/pdf-link.pdf" page="1" x="0.0444" y="0.2133" width="0.1022" height="0.1340"></page-clipping>
```

The dimensions here are fractions of the total page width/height (eg width="1" is full width, and x="0.5" is horizontally halfway on the page). Coordinates start at the top left corner of the page, so x="0" and y="0" is the top left corner of the page, and x="1" and y="1" is the bottom right corner of the page.

This was then rendered using a [web component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) into a `<img/>` that pointed at an API endpoint. In the endpoint, the following code would download the PDF, crop it, and output it as a JPEG image:

```ts
// Download the PDF
const response = await fetch(params.url);
const data = await response.arrayBuffer();

// Load it into PDF.js
const doc = await pdfjsLib.getDocument({ data }).promise;
const page = await doc.getPage(pageNumber);
const viewport = page.getViewport({ scale: 2.0 });

const clipX = x * viewport.width;
const clipY = y * viewport.height;
const clipWidth = width * viewport.width;
const clipHeight = height * viewport.height;

// Render into a new canvas
const canvas = doc.canvasFactory.create(clipWidth, clipHeight);

const renderViewport = viewport.clone({ dontFlip: false });
const renderContext = {
  canvasContext: canvas.context,
  viewport: renderViewport,
  // translate so (clipX, clipY) is at (0,0)
  transform: [1, 0, 0, 1, -clipX, -clipY],
};

await page.render(renderContext).promise;

// Convert to image
const image = canvas.canvas.toBuffer("image/jpeg");
```

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>