---
title: Writing JSDoc for React Components
description: I'm starting to get into the habit of consistently
  writing JSDoc comments for our front-end components, which helps with
  explaining usage…
date: 2024-05-22T09:02:14.355Z
taxonomies:
  category:
    - Blog
extra: {}
---

I'm starting to get into the habit of consistently writing [JSDoc](https://jsdoc.app/) comments for my front-end components, which helps with explaining usage of a component, and gets rid of VSCode’s red squiggles because it can't figure out the type of certain props.

Here's some simple examples of how to use JSDoc effectively to better document your React components.

## Simple example

```js
/**
 * A great component that displays a shop name!
 *
 * @param {object} props
 * @param {string} props.shopName The name of the shop
 * @returns {JSX.Element}
 */
const ShopLabel = ({ shopName }) => {
	return <p>{shopName}</p>;
};
```

## Advanced props

If you have more than one or two props, you might want to create a separate type definition for your component props:

- Define as a separate [`@typedef`](https://jsdoc.app/tags-typedef) within the same JSDoc comment
- If your component name is `MyComponent`, this type should probably be called something like `MyComponentProps`

```js
/**
 * A great component that displays a shop name!
 *
 * @typedef {object} ShopLabelProps
 * @property {string} shopName The name of the shop
 * @property {string} [className] Optional class name
 *
 * @param {ShopLabelProps} props
 * @returns {JSX.Element}
 */
const ShopLabel = ({ shopName, className = '' }) => {
	return <p className={className}>{shopName}</p>;
};
```

## Adding usage examples
You can add one or more examples of how to use the component using the [`@example`](<https://jsdoc.app/tags-example>) tag, which will be displayed when you hover over a component in VSCode. 

For a single example, feel free to omit the example description after `@example`.

```js
/**
 * A great component that displays a shop name!
 *
 * @example <caption>Rendering a shop name</caption>
 * <ShopLabel shopName="My shop" />
 *
 * @example <caption>Adding a class name</caption>
 * <ShopLabel shopName="My Shop" className="hello" />
 *
 * @param {ShopLabelProps} props
 * @returns {JSX.Element}
 */
const ShopLabel = ({ shopName, className = '' }) => {
	return <p className={className}>{shopName}</p>;
};

```

## Extending HTML elements
If you want your component to accept normal props for an HTML element in addition to your custom props, make the type of your props param [an intersection](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types) between your props type and `React.HTMLAttributes<*>`.

Example for a `<p>` tag:

```js
/**
 * A great component that displays a shop name!
 *
 * @typedef {object} ShopLabelProps
 * @property {string} shopName The name of the shop
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement> & ShopLabelProps} props
 * @returns {JSX.Element}
 */
const ShopLabel = ({ shopName, ...props }) => {
	return <p {...props}>{shopName}</p>;
};
```

Note that for input type fields, you want to use `React.InputHTMLAttributes<*>`, to ensure the `onChange` prop exists and has the right type.

Example for an input:

```js
/**
 * Text field (renders as `<input>`).
 *
 * @typedef TextInputProps
 * @property {string} [suffix] Optional suffix to display after the input field
 *
 * @param {React.InputHTMLAttributes<HTMLInputElement> & TextInputProps} props
 * @returns {JSX.Element}
 */
const TextInput = ({ type = 'text', suffix = '', ...props }) => {
	return (
		<div className={styles.inputContainer}>
			<input className={styles.input} type={type} {...props} />
			{suffix && <span className={styles.inputSuffix}>{suffix}</span>}
		</div>
	);
};
```

## React Element types

There are a few similar types you might see, here’s when to use which:

### `JSX.Element`

Usually used as the return value of a component, indicates it returns a single DOM/JSX elements. This is basically the same as `ReactElement`, although `ReactElement` is more generic (it technically is `ReactElement<T>`, meant for type expansion to define what props that element takes).

May also be used as `React.JSX.Element`, although both Typescript and ESLint understand what you mean if you just use `JSX.Element`, so that is cleaner and preferable.

### `ReactNode`

If your component returns anything other than just a single element, you might want to consider using this. It is a union type that also includes things like `JSX.Element[]`, `boolean`, and `string`.

Not super common you would need this as a return value, but might be useful as a prop. Note that it is an element, not a component (e.g. an instance of a component). Example usage:

```js
/**
 * Only shows the children if you have access, otherwise returns the fallback.
 *
 * @typedef ProtectProps
 * @property {ReactNode} children Rendered when you have access
 * @property {ReactNode} fallback Rendered when you don't have access
 *
 * @param {ProtectProps} props
 * @returns {JSX.Element}
 */
export const Protect = ({ children, fallback }) => {
	// ...
};

// usage:
<Protect fallback={<p>Boo, no access!</p>}>
	<p>Boom, access!</p>
</Protect>
```

### `React.FC`

Stands for FunctionComponent. This is the type of the component itself, and can be useful when you want to accept a component as a prop rather than an element:

```js
/**
 * A great component that displays a shop name!
 *
 * @typedef {object} ShopLabelProps
 * @property {React.FC} as The component to render as
 *
 * @param {ShopLabelProps} props
 * @returns {JSX.Element}
 */
const ShopLabel = (props) => {
	const Component = props.as || 'p';
	return <Component>Shop name</Component>;
};

// usage:
<ShopLabel as="h1" />
<ShopLabel as={Badge} />
```

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>