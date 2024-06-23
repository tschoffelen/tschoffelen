---
title: Creating Awesome Embeddable Scripts
date: 2024-06-23
description: I was looking at a video about the new version of Apple's MapKit JS, their web maps library, and they showed how to initialise the SDK by loading the...
taxonomies:
  category:
    - Blog
extra: {}
---

I was looking at a video about the new version of Apple's [MapKit JS](https://developer.apple.com/documentation/mapkitjs), their web maps library, and they showed how to initialise the SDK by loading the script. 

The code looks something [like this](https://developer.apple.com/documentation/mapkitjs/loading_the_latest_version_of_mapkit_js#3331749):

```html
<script
    src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"
    crossorigin async
    data-callback="initMapKit"
    data-libraries="services,full-map,geojson"
    data-token="Your MapKit JS token"></script>
```

That's very neat, being able to specify the token and other details using the `data-` attributes on the script tag. That made me wonder how this worked. 

After searching through the minified version of the source code for a bit, I found out what their method was for making this work: [`document.currentScript`](https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript)

I did not know that property existed - but apparently it's supported in all major browsers and allows you to get the script DOM element that invoked the currently running Javascript.

Now that we know that, we could build a similar embed script ourselves, combining `currentScript` with the [`dataset`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#javascript_access) API for getting HTML `data` attributes.

Here's our example HTML:

```html
<script 
   src="./embed.js"
   data-message="Hello world"
></script>
```

And our `embed.js` script:

```js
if (document.currentScript) {
   // Invoked from an HTML page
   const data = document.currentScript.dataset;
   if (data.message) {
      alert(`Embed script says: ${data.message}`);
   }
}
```

Hopefully you can use this the next time you are building an embed system. 

I really enjoy building these things, and have gotten the opportunity to build a few of them:
- A really simple embed for [Street Art Cities maps](https://streetartcities.com/embed/tool), using iframes
- A slightly more sophisticated [embeddable widget for NearSt](https://developers.near.st/product-locator/widget/embed)


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>