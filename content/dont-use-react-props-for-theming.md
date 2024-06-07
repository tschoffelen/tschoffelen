---
title: Don't Use React Props for Theming
description: "So we all know that in most cases, using the style prop is
  considered back practice in React:"
date: 2023-07-24T07:03:49.242Z
taxonomies:
  category:
    - Style Guide
extra: {}
---
So we all know that in most cases, using the `style` prop is considered back practice in React:

```js
<div style={{ color: 'red' }} />
```

Using a class name (if possible with [CSS modules](https://css-tricks.com/css-modules-part-1-need/)) is cleaner:

```js
import styles from './Component.style.scss`;

<div className={styles.alertContainer} />
```

But I think there's also an important rule around using **props** to customise and apply styling that often gets overlooked:

```js
const Icon = ({ name, color, size, className, ...props }) => {
	return (
		<span 
			className={`icon-${name} ${className}`}
			style={{ width: `${size}px`, color }}
			{...props}
		/>
	);
}
```

Instead, where possible, don't introduce props like `color` and `size`, and only allow specifying a `className` prop. 

This gives the user of the component a way to style the element, without the need to remember whether that prop was called `size` or `width` and if it takes a string or a number as the value. It's easier to do this through CSS.