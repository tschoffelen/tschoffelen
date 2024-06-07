---
title: Building a RSS Customizer Tool
description: Vercel makes buying domains and deploying apps way too simple,
  which is how I end up building things like **feedfixer.xyz** as soon as the
  idea enters my brain.
date: 2023-09-01T10:44:50.965Z
taxonomies:
  category:
    - Blog
extra: {}
---
Vercel makes buying domains and deploying apps way too simple, which is how I end up building things like [**feedfixer.xyz**](https://feedfixer.xyz) as soon as the idea enters my brain.

I've been using RSS a lot this year to stay up to date on blogs and websites I care about, whilst sparing my email inbox from hundreds of newsletters.

My RSS reader of choice is [NetNewsWire](https://netnewswire.com), which is clean, simple, and syncs read statuses and stars between my iPhone, iPad and Mac really well.

It is very basic on the organisation front, letting you organise your feeds into a one-level set of directories. That's fine, but something that I've noticed a lot is that many website RSS feeds are not granular enough for what I want to see. Certain types of posts are not interesting to me, and I want to filter them out.

That's why I created my little [Feed Fixer](https://feedfixer.xyz) tool, which allows you to set up rules for what makes it through to the final RSS feed. Great to filter out those "Daily recap" or "Sponsored post" items.

I'm planning to extend it more in the future as my needs grow, and it's open source, so other people can [add additional rules](https://github.com/includable/feed-fixer/blob/main/lib/rules.js).