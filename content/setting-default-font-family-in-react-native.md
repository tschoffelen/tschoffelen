---
title: Setting Default Font Family in React Native
description: Here's the right, albeit hacky, way to set a default font in React Native 0.72.
date: 2023-07-30T14:28:05.328Z
taxonomies:
  category:
    - Reference
extra: {}
---
I was struggling to find the right way to set a default font in React Native `0.72.x`.

This is what I ended up with eventually:

```js
const defaultTextStyle = {
  fontSize: 16,
  fontFamily: Constants.fontFamily,
};

const originalRender = Text.render;
Text.render = function render(props) {
  props = {
    ...props,
    style: [
      defaultTextStyle,
      props.style,
    ],
  };

  return originalRender.apply(this, [props]);
};
```