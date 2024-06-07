---
title: Launching Flexible Feed
description: I released my first Shopify app a few years ago. It’s called
  Flexible Fulfillment, and it helps store owners distribute orders to…
date: 2023-12-20T16:30:48.874Z
taxonomies:
  category:
    - Blog
extra: {}
---

I released my first Shopify app a few years ago. It’s called [Flexible Fulfillment](https://apps.shopify.com/marketplace-fulfillment), and it helps store owners distribute orders to t
hird-party vendors, often used for dropshipping.

Today, I’ve released my second app: [**Flexible Feed**](https://apps.shopify.com/inventory-feed). It’s a pretty simple app that makes it easier to create product and inventory feeds from your Shopify stock. This allows you to connect NearSt easily, or set up feeds for other platforms.

It’s pretty simple right now, but I look forward to extending it into something more powerful based on feedback from users.

## Building for Shopify
I really admire the ecosystem that Shopify has created. They are obviously very large as a company, but a lot of the value of their product comes from their App Store, which allows third party developers to build all sorts of new functionality to extend your store with.

They could have gone the route most other platforms choose - expose an API, and allow other developers to build their own, separate apps using some sort of OAuth for login. Instead, Shopify locked this down a bit more: you can’t just sign in with your Shopify account in other apps - those apps need to be approved by Shopify and exist within their App Store. This allows them to keep quality high through a review process reminiscent of Apple’s App Store Review.

In addition, these apps often live within Shopify rather than outside of it: they’re displayed within the Shopify admin panel, and can hook into extending the retailer’s e-commerce website, checkout process or point-of-sale tablet. This creates one coherent experience, with[ a shared design language](https://polaris.shopify.com).

This has some disadvantages as well (payments need to go through Shopify’s very minimal payments API), but overall it makes building Shopify apps quite fun!

## Taking it serverless
If you read anything else I write, you know that I love building on AWS Lambda and DynamoDB. That’s also what I do for these Shopify apps. 

It took a while to adapt [Shopify’s default app starter template](https://github.com/Shopify/shopify-app-js) into a version that could easily be deployed on AWS Lambda, but I now have a starter template of my own for this, which allows me to whip up a new app in a day or two.

I plan on releasing this starter template if I find time to clean it up and add documentation, and might even open source Flexible Feed, again, if time allows for doing the ‘hard’ bits to get it up to a standard I’m happy to release publicly.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>