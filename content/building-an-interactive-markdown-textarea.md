---
title: Building an Interactive Markdown Textarea
date: 2024-06-29
description: I really love the markdown editor on GitHub, especially how easy it is to drop in files and images.  It's still all plain text, but it works...
taxonomies:
  category:
    - Blog
extra: {}
---

I really love the markdown editor on GitHub, especially how easy it is to drop in files and images.

It's still all plain text, but it works interactively. If you drag and drop a file, it uploads that file and inserts a link into your text. If you paste an image, it uploads it and inserts an markdown image tag.

I was trying to replicate this behaviour recently, and realised it's a lot more straightforward then you might think initially! Here's my final end product ([video version here](https://mirri.link/5Mc5WTg)):

<iframe src="https://codesandbox.io/embed/rxlc7l?view=preview&module=%2Fpackage.json&hidenavigation=1" style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;" title="markdown-upload-editor" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

Let's go through some of the main features and how they work:

## Auto grow
I started doing web development in an era where you needed to write every feature twice, once for modern browsers, and once for Internet Explorer, so I didn't quite realise it was so unbelievably straightforward to do this now:

```js
const autoGrow = (e) => {
  const el = e.target;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};

textarea.addEventListener("input", autoGrow);
```

Setting a `min-height` in the CSS for the `<textarea>` is advised, to give the user enough space. I also usually add `resize: none;` to hide the resize handle – the user won't need to resize the text box if it auto-sizes.

## Drag and drop files
As you can see in the video linked below, or by trying the example, the following things happen when you drop a file into the text box:

1. Placeholder text is inserted in the form of `[Uploading filename.ext...]()`
2. The file is uploaded and the final public URL is retrieved
3. The placeholder text is replaced with the final link or image tag

To implement this, the first step is to listen to the `drop` event on the textbox:

```js
textarea.addEventListener("drop", async (e) => {
	// only take action if a file is being dropped,
	// as we want to keep the default behaviour for
	// dropping text into the text box
	if (!e.dataTransfer.files.length) return;
    e.preventDefault();

	// grab our File object
    const file = e.dataTransfer.files[0];

	// insert some placeholder text
	const placeholder = `![Uploading ${file.name}...]()`;
	insertAtCaret(e.target, placeholder);

	// do what we need to upload the file
	const url = await uploadFile(file);

	// replace with final value
	const isImage = !file.type || file.type?.startsWith("image");
	const finalTag = isImage
		? `![${file.name}](${url})`
		: `[${file.name}](${url})`;

	e.target.value = e.target.value.replace(placeholder, finalTag);
});
```

To make sure we deal with inserting the text at the right place in the text box, based on where the user's cursor is, let's introduce the a little helper function:

```js
const insertAtCaret = (el, text) => {
  if (el.selectionStart || el.selectionStart == "0") {
    el.value =
      el.value.substring(0, el.selectionStart) +
      text +
      el.value.substring(el.selectionEnd, el.value.length);
  } else {
    el.value += text;
  }
};
```

If we can't figure out where the cursor is, or if the text area isn't focussed, we'll append the image or link at the end of the current value.

You can further optimise this by dealing with whitespaces: if you're appending directly after a word or sentence, you might want to add a space or newline before the image or link.

## Pasting images
Now that we have drag and drop working for files, adding the ability to add the ability to paste files and images into the text field is quite trivial!

We simply swap out listening to the `drop` event for listening to the [`paste` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event), and look at the `clipboardData` from the event:

```js
textarea.addEventListener("paste", async (e) => {
	// only take action if a file is being pasted,
	// as we want to keep the default behaviour for
	// pasting text into the text box
	if (!e.clipboardData.files.length) return;
    e.preventDefault();

	// grab our File object from the clipboard data
    const file = e.clipboardData.files[0];

	// do the rest of the upload and insert like before
	// ...
});
```

Working with the modern web is such a joy!

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>