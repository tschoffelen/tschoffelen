---
title: Upgrading Your AWS Lambdas to Node 20
description: The Node 16 runtime on Lambda will be deprecated in June.
date: 2024-02-19T10:50:24.699Z
taxonomies:
  category:
    - Blog
extra: {}
---

The Node 16 runtime on Lambda will be [deprecated in June](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html).

Upgrading to Node 18 or 20 is relatively easy for most applications, with few breaking changes from Node 16.

Some notable additions are the native support for [`fetch()`](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html), which you might be familiar with from browser environments, and a [built-in test runner](https://nodejs.org/dist/latest-v18.x/docs/api/test.html).

What is more difficult, is the lack of the AWS SDK v2, which is included out of the box in the `node16.x` Lambda runtime, but not in the more recent runtime versions.

## Upgrading to AWS SDK v3

Ideally, you'd upgrade to v3 of the SDK, but this might involve rewriting a lot of your code. If you want to go this route, the [codemod](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/migrating-to-v3.html#using-codemod) is a good starting point.

## Including v2 in your bundle

For those of us not ready to move on to v3 yet, you need to include v2 in your bundle.

### With serverless

If you use the Serverless framework, you might need to move the `aws-sdk` package from `devDependencies` to `dependencies` in your `package.json`. This will tell the framework [to not exclude it](https://www.serverless.com/framework/docs/providers/aws/guide/packaging#development-dependencies) from the bundle.

### With serverless-esbuild

The `serverless-esbuild` plugin by default will exclude the `aws-sdk` package as well, so you need to specifically pass an empty array to override this behaviour:

```yaml
provider:
   runtime: nodejs20.x

custom:
   serverless-esbuild:
      exclude: []
```

This will tell `esbuild` to bundle the `aws-sdk`. The AWS SDK v2 is massive though, so this might result in large bundles, or even hang `esbuild` if it can't use enough memory.

This is a problem we've experienced with several of our larger services, and there's two good strategies for getting around it:

- Manually including the SDK in the package by adding `node_modules/aws-sdk/**` into your [package patterns](https://www.serverless.com/framework/docs/providers/aws/guide/packaging#development-dependencies). This leads to a relatively large package (multiple MBs), but is pretty quick. You can further optimise this by excluding files in the SDK folder that you don't need, like the `dist` folder or all of the `*.d.ts` definition files.
- If you want to keep your lambda package very small, an alternative solution is including the SDK as a Lambda Layer. You can create this layer by zipping op the SDK (ensure to keep the folder structure, so that it ends up in node_modules).


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>