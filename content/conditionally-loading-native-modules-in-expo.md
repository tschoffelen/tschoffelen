---
title: Conditionally Loading Native Modules in Expo
date: 2026-02-02
description: I used to be a 'plain' React Native guy, but I've really grown to enjoy using Expo for the last few apps I've built.   Much less compile errors to...
taxonomies:
  category:
    - Blog
extra: {}
---

I used to be a 'plain' React Native guy, but I've really grown to enjoy using [Expo](https://expo.dev) for the last few apps I've built. 

Much less compile errors to deal with, and I really love using the **Expo Go** app to quickly debug an app without having to wait for a development build to finish or opening Xcode.

Of course, some apps need custom packages with native functionality that isn't available in Expo Go. Depending on what type of functionality they offer, they might be optional for debugging.

Recently, I had to use the [Intercom](https://intercom.com) SDK in an app. Their [React Native package](https://github.com/intercom/intercom-react-native) is great, but it doesn't work with Expo Go, since it relies on their native iOS and Android SDKs.

As soon as you `import` it in your code anywhere, your app will crash if you try to open it in Expo Go. Annoying, especially since I don't really need the Intercom functionality to debug my app.

The solution? Conditionally import it, based on whether the native module exists:

```ts
import { Linking, NativeModules, Platform } from "react-native";

export const getIntercom = async () => {
  if (!NativeModules.IntercomEventEmitter) {
    console.log("Intercom SDK not available");
    return null;
  }

  const { default: Intercom } = await import("@intercom/intercom-react-native");
  return Intercom;
};
```

Now we have the best of both worlds – I can still debug all of the other app functionality in Expo Go, but in a native build, the Intercom SDK loads correctly.

Anywhere I want to call any of the Intercom SDK methods, I'd just do:

```ts
const intercom = await getIntercom();
intercom?.presentMessageComposer();
```





<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>