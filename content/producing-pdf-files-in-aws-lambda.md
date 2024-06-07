---
title: Producing PDF files in AWS Lambda
description: Something I’ve had to do a few times now is to generate PDF files
  in AWS Lambda. This could be anything from reports to invoices. My…
date: 2023-07-09T13:56:14.842Z
taxonomies:
  category:
    - Reference
extra: {}
---
Something I've had to do a few times now is to generate PDF files in AWS Lambda. This could be anything from reports to invoices. My general approach for this is two-fold:

1. Generate HTML by rendering a [Twig](https://twig.symfony.com) template
2. Use [Puppeteer](https://pptr.dev) to spawn a headless Chrome/Chromium instance and export a PDF

## Rendering templates
For the first step I prefer using something like Twig because it's such a powerful templating language. Its syntax with things like loops, filters and inheritance means that you can write clean, readable templates, rather than a long Javascript file with a single HTML string.

The `twig` NPM package, a [Javascript implementation](https://github.com/twigjs/twig.js/) of the Twig syntax, is very easy to use, and can be extended with [custom filters and tags](https://github.com/twigjs/twig.js/wiki/Extending-twig.js):

```js
import Twig from "twig";

var template = Twig.twig({
    data: "Hello, {{ name }}. How are you?"
});

console.log(
    template.render({ name: "John" })
);
// outputs: "Hello, John. How are you?"
```

## Creating a PDF
Using one of the many packages to run Puppeteer in Lambda, like [`chrome-aws-lambda`](https://github.com/alixaxel/chrome-aws-lambda), makes it easy to generate our PDF payload. We can then save this to AWS S3 to serve it to customers, or output it directly.

Here's an example of rendering an HTML string and saving the PDF to S3:

```js
import chromium from "chrome-aws-lambda";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3();

// Launch the browser
const browser = await chromium.puppeteer.launch({
	args: chromium.args,
	executablePath: await chromium.executablePath
});

// Render HTML string
let page = await browser.newPage();
await page.setContent("<h1>Hello, world</h1>", {  
	timeout: 30000,  
	waitUntil: "load"  
});

// Export PDF
const pdf = await page.pdf({
	format: "a4",
	printBackground: true,
	displayHeaderFooter: false,
	margin: { top: "1.5cm", right: "1.5cm", bottom: "1.5cm", left: "1.5cm" }
});

await browser.close();

// Save to S3
await s3.putObject({
	Key: 'my-document.pdf',
	Bucket: process.env.PDFS_BUCKET,
	Body: pdf,
	ContentType: "application/pdf",
	ACL: "public-read"
}).promise();
```

Note that you might want to load in Chromium through an Lambda Layer, like so:

```yml
functions:
	generate-pdf:
		handler: src/fucntions/generate-pdf.handler
		layers:
			- "arn:aws:lambda:eu-west-1:764866452798:layer:chrome-aws-lambda:25"
		events:
			# - ...
```