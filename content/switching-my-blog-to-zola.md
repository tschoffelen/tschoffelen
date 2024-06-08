---
title: Switching My Blog to Zola
date: 2024-06-08
description: Switching from Next.js on Vercel to a much simpler site generated using Zola.
taxonomies:
  category:
    - Blog
extra: {}

---


For a while now, my personal website has been built using [Next.js](https://nextjs.org/), running on [Vercel](https://vercel.com). It was working fine, but it felt a bit slower than it should be, and quite heavy for something that is basically a static site.

I've also not been super happy with Vercel's reliability lately. Google's indexer doesn't seem to be super happy crawling the site, occasionally reporting network errors accessing pages in the [Search Console](https://search.google.com/search-console/about).

## Switching back to static
For a few weeks, I've been thinking about moving it back to something simpler, more static. Last night, I finally made the switch. I realised I didn't need React, I didn't need Tailwind, I didn't need anything related to the Node/JS ecosystem.

Initially, I wanted to just write a script to generate the pages from my own markdown files (I write my blogs in [Obsidian](https://obsidian.md/)), but then realised I should probably use a site generator. I've used Hugo and Gatsby in the past, but they're both quite advanced for my simple use case. Looking at the Hugo docs made it seem quite an undertaking to switch everything over.

I then came across **[Zola](https://www.getzola.org/)**, a simple static site generator written in Rust. It is simple enough, but also does everything that is a minimal requirement for me out of the box: RSS feeds, Sitemaps, simple category pages.

I ran `zola init`, exported my markdown, and started rewriting my JSX and [Tailwind](https://tailwindcss.com/) component mess into simple HTML and CSS.

Within 2 hours I had something that was extremely simple and pretty clean.

## Deploying to S3
I switched from Vercel back to just having a simple combination of AWS S3 and CloudFront to host the site.

It's deployed from GitHub CI, with beautiful simplicity:

```yaml
steps:
	- uses: actions/checkout@v4
	- uses: taiki-e/install-action@v2
	  with:
	    tool: zola@0.17.2
	- run: zola build
	- run: aws s3 sync public s3://schof.co --acl public-read --delete
	- run: aws cloudfront create-invalidation --distribution-id E1XOA26HO9HVF9 --paths "/*"
```

I love it when things are just this neat and simple. No NPM or Yarn installs, no node versions to manage.

In CI, my `zola build` takes less than 150ms, and about 6 seconds to upload the changes to S3.

Look at the resource list that is loaded when you click on a blog post:
<img src="https://mirri.link/84BSE20" alt="Image" />

No client side navigation needed, it's just plain HTML, so it's super fast. I can probably cut it down even further if I had to, but for now this serves my purposes extremely well.

## Obsidian workflow
The only thing left to do was to update my workflow for publishing posts.

I have my own little Obsidian plugin that publishes posts (aptly named `thomas-blog`). Previously, it would call an API endpoint on the old website which would store a new record in a PostgreSQL table for publishing a new post.

Now that the content lives in GitHub, I have changed it to call the GitHub API's [Contents endpoint](https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#create-or-update-file-contents) and create or update a file, which automatically gets committed to the `main` branch.

This in turn triggers the GitHub Actions workflow which deploys the new version of the site within a few seconds.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>