---
title: Setting Up Syntax Highlighting in HubSpot CMS
date: 2024-09-21
description: I've been building out our NearSt Engineering Blog over the last couple of days, and one of the things I ran into is the need to show...
taxonomies:
  category:
    - Reference
extra: {}
---


I've been building out our [NearSt Engineering Blog](https://stockroom.near.st/?utm_source=schof) over the last couple of days, and one of the things I ran into is the need to show syntax-highlighted code in some of the blog posts.

HubSpot CMS doesn't have a built-in way to do that, but you can easily add this yourself.

In the HubSpot Design Manager, you'll want to find your blog post template (often called something like `blog-post.html` in the `template` folder of your theme). At the bottom of that, just before the `{% endblock body %}` statement, add this:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

<script>
  const brPlugin = {
    "before:highlightBlock": ({ block }) => {
      block.innerHTML = block.innerHTML
        .replace(/\n/g, "")
        .replace(/<br[ /]*>/g, "\n")
        .replace(/\t/g, "    ");
    },
    "after:highlightBlock": ({ result }) => {
      result.value = result.value.replace(/\n/g, "<br>");
    },
  };

  // how to use it
  hljs.addPlugin(brPlugin);
  hljs.highlightAll();
</script>
```

You might be wondering why there is so much custom Javascript required to make this work: by default, HubSpot puts `<br>` tags in your `<pre>` code blocks to create line breaks, rather than just leaving the normal line breaks (`\n`). That's not really an ideal practice, and therefore not supported by any highlighting libraries.

Thankfully, it is easy to add some Javascript to convert those back into normal line breaks before the highlighting starts.

Once you have this in place, your code might still not be syntax highlighted.

Unfortunately, there's a second step: all code blocks need to be wrapped like this:

```html
<pre>
	<code>
		// my brilliant javascript example
	</code>
</pre>
```

The HubSpot HTML editor will by default give you only `<code>` tags, so you'll need to jump into the **Advanced** → **Source code** view of the HubSpot blog editor to manually adjust this.

<img src="https://mirri.link/zztbShm" alt="Image" />


If all of that seems hard and painful, I agree. HubSpot Blogs is a marketing platform, and clearly not really meant for this sort of content.

A quicker solution might be to use [GitHub Gist](https://gist.github.com/) embeds, but these don't render well in the HubSpot editor, and are not very customizable in terms of styling.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>