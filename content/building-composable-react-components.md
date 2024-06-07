---
title: Building Composable React Components
description: Imagine you're building a component. You might add some props to
  control the appearance, like variant or size. You end up with a component…
date: 2024-05-26T12:14:30.461Z
taxonomies:
  category:
    - Blog
extra: {}
---

Imagine you're building a `<Button>` component. You might add some props to control the appearance, like `variant` or `size`. You end up with a component that looks like this:

```js
const Button = ({ variant, size, children }) => {
	const className = getCorrectStylesFor(variant, size);

	return (
		<button className={className}>
			{children}
		</button>
	);
}
```

Okay, but now you run into a problem. This always renders as a `<button>` HTML element, and you might need it to be an `<a>` tag sometimes so that you can use it as a link. Or maybe even a `Link` from React Router or Next, so that you can link to other pages within your SPA.

Here's two simple ways to take care of this:

## Adding an `as` prop
This is the classic. Adding a prop that allows you to define the actual component to render, so that you can do the following:

```js
<Button as={a} href="https://example.com">
	Link to other website
</Button>
```

Or maybe like this:

```js
import { Link } from "react-router-dom";

<Button as={Link} to="/profile">
	Edit profile
</Button>
```

An implementation of that could look something like this:

```js
const Button = ({ children, as, ...props }) => {
	const Component = as || "button";

	return (
		<Component {...props}>
			{children}
		</Component>
	);
}
```

Note how the `Component` variable needs to start with a capital to make sure that React renders it as a React component, rather than just as a HTML element (a lowercased `component` would be rendered as the HTML element `<component>`, rather than the actual value of the `component` variable).

This approach has a drawback, however: you need to pass through all props you want the final element to have. This works using the normal `...props` spreading method, but editors will get confused because there's no Typescript definition for what those props could be, and therefore you're missing out on linting and validation.

## A better approach: `asChild`
Because of those reasons, an alternative way has become more popular recently – adding an `asChild` prop. That makes our `Link` example from above look something like this:

```js
import { Link } from "react-router-dom";

<Button asChild>
	<Link to="/profile">
		Edit profile
	</Link>
</Button>
```

That has the advantage of not needing to pass through our props directly from `Button` to `Link`. But now we need to do the opposite: we need to pass through some of our styling props (`className`) in the `Button` component so that they're applied to `Link`.

A nice and easy way to do so is using the [`Slot`](https://www.radix-ui.com/primitives/docs/utilities/slot) component from Radix:

```js
import { Slot } from "@radix-ui/react-slot";

const Button = ({ variant, size, children, asChild }) => {
	const className = getCorrectStylesFor(variant, size);
	const Component = asChild ? Slot : "button";

	return (
		<Component className={className}>
			{children}
		</Component>
	);
}
```

You can also build your own simple `Slot`, if you want to understand how it works:

```js
const Slot = ({ children, ...props }) => {
  const slots = React.Children.toArray(children);

  return slots.map((slot) => {
    return React.cloneElement(slot, {
      ...slot.props,
      ...props,
    });
  });
};
```

Of course that's a very naive implementation - to make this usable, you'd want to be able to deal with non-React elements (e.g. strings), merge certain props (like `className` and `style`), and maybe allow multiple levels of passing through. 

Or just use the Radix one, it [does all of those things](https://github.com/radix-ui/primitives/blob/main/packages/react/slot/src/Slot.tsx).


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>