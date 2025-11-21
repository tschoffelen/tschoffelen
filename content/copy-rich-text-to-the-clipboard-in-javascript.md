---
title: Copy Rich Text to the Clipboard in JavaScript
date: 2025-11-21
description: Did you know that you can populate the clipboard with multiple types of content with different mime types at the same time?
taxonomies:
  category:
    - Reference
extra: {}
---


I really like how in [Linear](https://linear.app), if you press <kbd>Cmd + C</kbd>, which is listed as 'Copy issue title', it will copy the title as plain text, but also as an HTML link, so that if you paste it in a Google Doc or in Obsidian, it will show a link to that issue.

I recently wanted to implement the same thing, but in the reverse, for Street Art Cities, where you can click 'Copy map link' to get a link to the map with the current map center point coordinates and zoom level.

<img src="https://mirri.link/DQzQS4Uf4" alt="Image" />

If you paste it into a text message, it's just a URL, but if you paste it in a place that can deal with HTML, it's a link with the text 'Street Art Cities map'.

Doing that in Javascript is pretty easy, once you figure out the slightly weird syntax:

```ts
const url = 'https://streetartcities.com/...';

await navigator.clipboard.write([
	new ClipboardItem({
		"text/plain": new Blob(
			[url], 
			{ type: "text/plain" }
		),
		"text/html": new Blob(
			[`<a href="${url}">Street Art Cities map</a>`],
			{ type: "text/html" }
		)
	})
]);
```

There's lots of one-item arrays in here, but overall it's quite neat that browsers give you this functionality!

This is also how you could copy an image to the clipboard, you just create a [`ClipboardItem`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem) with an `image/jpeg` entry, or similar.

For production, you might want to wrap this into a `try-catch` with a more generic version, for browsers that don't support this yet, or when you're running in an insecure context (`ClipboardItem` is only available through HTTPS, although some browsers seem to make an exception for `localhost`, thankfully).

Here's a more hardened version, with some toasts to give feedback to the user:

```ts
const url = 'https://streetartcities.com/...';

try {
	await navigator.clipboard.write([
		new ClipboardItem({
			"text/plain": new Blob(
				[url], 
				{ type: "text/plain" }
			),
			"text/html": new Blob(
				[`<a href="${url}">Street Art Cities map</a>`],
				{ type: "text/html" }
			)
		})
	]);
	toast.success("Copied to clipboard");
} catch (error) {
	// Try the simpler .writeText() if it failed
	try {
		await navigator.clipboard.writeText(url);
		toast.success("Copied to clipboard");
	} catch (error) {
		// Or show an error if we still can't hack it
		toast.error(`Failed to copy link to clipboard: ${error.message}`);
	}
}
```

When you're building stuff like this, this little [Clipboard Inspector](https://evercoder.github.io/clipboard-inspector/) tool is super useful to see the exact contents of the clipboard:

<img src="https://mirri.link/xMWF78SL5" alt="Image" />



<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>