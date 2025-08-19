---
title: Creating Modern Wordpress Themes
date: 2025-08-19
description: I started out as a developer building Wordpress websites when I was in my early teens. Since then, I haven't really touched Wordpress for a while,...
taxonomies:
  category:
    - Blog
extra: {}
---


I started out as a developer building Wordpress websites when I was in my early teens. Since then, I haven't really touched Wordpress for a while, other than occasionally having to make some small tweaks to one of those ancient websites.

Modern Wordpress is something completely different, though. I had heard of [Gutenberg](https://wordpress.org/gutenberg/), and tried it in its early stages a few years ago, but I did not actively work with it until this week. It's awesome. The Wordpress [full-site editing](https://wordpress.org/documentation/article/site-editor/) experience is as good or better than Squarespace and Shopify's visual site editors.

It basically allows you to build a whole site without needing any custom code in a lot of cases. If you do want to build a custom theme, where's how to get started:


## Why you might want a custom theme
Themes allow you to add a few things that you might want to use to enhance your experience using the site editor:

- **[Theme settings and styles](https://developer.wordpress.org/themes/global-settings-and-styles/)** allow you to set default colors, fonts and spacing
- **[Patterns](https://developer.wordpress.org/themes/patterns/introduction-to-patterns/)** allow you to create reusable groups of blocks (think a hero section, a pricing table, a navigation bar).
- **[Custom blocks](https://developer.wordpress.org/block-editor/)** to add specific functionality, like a testimonials slider or a specific styled embed.

## Creating our theme
Let's start by creating an empty directory for our theme. To build any theme in Wordpress, you first need to create a `style.css` file that will define our theme. Fill it with something like this:

```css
/*
Theme Name: my-website
Theme URI: https://my-website.com
Description: Custom theme for my-website.com, based on 'Twenty Twenty-Four'
Author: Includable
Author URI: https://includable.com
Template: twentytwentyfour
Version: 1.0.0
*/
```

It only acts to register the theme. This file is sufficient to show your theme as an option in the dashboard.

We extend the built-in theme `twentytwentyfour` here to inherit all of its default styles and patterns.

## Running locally
Now, let's create a `.wp-env.json` file, so that we can run our theme in a local Wordpress installation to test and develop it:

```json
{
	"core": null,
	"themes": ["."]
}
```

This simply says that the Wordpress core should be downloaded, and the current directory should be installed as a theme on the test site.

A simple `npx @wordpress/env start` in this directory will spin up a set of Docker containers, and within a minute or two you'll have a local Wordpress installation running on `http://localhost:8888`.

## Theme settings and styles
You might want to change some of the defaults of this theme, like the color palette that is available. Doing so is easy through creating a `theme.json` file. Any keys not specified will inherit their values from the parent theme:

```json
{
	"$schema": "https://schemas.wp.org/wp/6.5/theme.json",
	"version": 2,
	
	"settings": {
		"color": {
			"palette": [
				{
					"color": "#F05B4D",
					"name": "My red",
					"slug": "red"
				},
				{
					"color": "#ECB251",
					"name": "My yellow",
					"slug": "yellow"
				}
			]
		}
	}
}
```

You can find out the other available settings [here](https://developer.wordpress.org/themes/global-settings-and-styles/settings/).

I usually tend to also add the following:
- `typography.fontFamilies` to set the available fonts. If you extend the theme `twentytwentyfour`, you want to have at least two fonts with the slugs `body` and `heading` defined, as those are referenced in the default styles of the theme.
- `layout.contentSize` and `layout.wideSize` control the max width of containers on the page.

## Loading custom CSS
If you want to use `style.css` as a stylesheet to override some default CSS, you need to [enqueue](https://developer.wordpress.org/reference/functions/wp_enqueue_style/) the stylesheet. The easiest way to do this is to add a `functions.php` file to your theme, and add the following:

```php
<?php

function my_website_enqueue_styles()
{
    wp_enqueue_style(
        'my-website-style',
        get_stylesheet_directory_uri() . '/style.css'
    );
}

add_action('wp_enqueue_scripts', 'my_website_enqueue_styles');
add_action('enqueue_block_editor_assets', 'my_website_enqueue_styles');
```

Note that we execute this for two different [hooks](https://developer.wordpress.org/plugins/hooks/): when the front-end loads (`wp_enqueue_scripts`) to get it added to the `<head>` of the public website, and in the site editor (`enqueue_block_editor_assets`), so that we can see those styles reflected whilst editing in the dashboard as well.

## Adding custom blocks
If you want to add custom blocks, your best bet is to use the [`@wordpress/create-block`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/) CLI to scaffold block files. After running this, you can copy the `src` directory of the result, as well as the `package.json` file into your theme directory.

You'll now have a setup that lets you edit your custom block(s) and automatically build them by running `npm run build`, or re-build them automatically as you edit the files using `npm start`.

To actually register the blocks to be usable in the editor, you need to add some more code to your `functions.php` file:

```php
<?php

function my_website_create_blocks()
{
    wp_register_block_types_from_metadata_collection(
        __DIR__ . '/build',
        __DIR__ . '/build/blocks-manifest.php'
    );
}

add_action('init', 'my_website_create_blocks');
```

This will register any block referenced in the auto-generated `build/blocks-manifest.php` file.

This all is really fun and relatively easy - building blocks and then immediately getting to use them yourself is quite fun, although editing them and refreshing the site editor takes a bit of getting used to if you're used to hot reloading React applications.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>