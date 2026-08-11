---
title: Turning a Product Into a Platform
date: 2026-08-11
description: Building a platform is about well-defined constructs, open integration surfaces, and an active community.
taxonomies:
  category:
    - Blog
extra: {}
---



I'm a massive fan of building not just a product, but a platform - not only solving a specific product for a user, but building a foundation to allow others to solve their own problems using your system.

To do so, I think there are three essential components needed: well-defined constructs, open integration surfaces and community.

## Well-defined constructs
If you want your platform to be something people can talk about and build upon, you need to have easy to understand building blocks that are at the core of the platform, with consistent names and behaviours, and documentation that establishes what these constructs are.

Let’s make this more concrete - for the [Examplary](https://examplary.ai/?utm_source=schof-blog) platform, these are things like Organisations, Tests, Practice Spaces, Source Materials.

Being able to reason about how these basic entities interact with each other, makes it easier for community members to realise how to use the platform and to suggest features, and for developers to think about what an integration with the platform might look like.

👉 This is an area I think that is often missing in technical documentation. There might be information about APIs, rate limits and authentication, but no clear overview of how various entities in the system relate to each other. Don’t make developers have to piece together the UML diagram themselves.

## Open integration surfaces
A product is part of a suite, a platform is part of an ecosystem. In order to become part of an ecosystem, you need integration options. 

That doesn’t mean you need to build all of these integrations yourself. Moreover, I’d try to avoid building any specific integration with another system if you instead can build an integration surface: a way to allow other systems to plug into your platform.

Rather than building a ‘Sign in with Google’ functionality, build OpenID Connect support into your platform. That way, you can offer ‘Sign in with Google’, but also allow enterprise customers to bring their own identity provider.

Rather than building a specific API endpoint so that one system can retrieve activity updates from your platform, offer an RSS feed, which customers can use for a lot of different purposes.

That often times means supporting old open standards, rather than building a new shiny proprietary thing, which is much more tempting.

One of my previous companies offered customers various methods for uploading large datasets, including a beautiful modern JSON API and various cloud-native connectors. Yet, almost every single customer used our FTP connector, since that's what they know and universally worked the same.

You can't always avoid having to build a proprietary integration of course, but where you can, try to build open integration surfaces rather than single-purpose one-off integrations.

## Community
A platform isn't worth anything if you don't have an active community of users rallying around it, that can help suggest features, help other users, share tips and tricks, and show that your platform is worth integrating with.

I've tried various different ways to start a community over the last few years, and to me the two things that were always most effective, are:

- **A newsletter**: let your users know what is new, and inspire them to use as many different parts of your platform as possible. This might sound basic, but being able to re-activate users that might have not thought about your platform for the last few weeks is very helpful.
- **Your own forum**: I adore [Discourse](https://www.discourse.org/). Yes, you could run a Subreddit or a Discord, but there's something about owning the place where conversations take place. Discourse itself very much is also a platform, which means that it's a great place to post your announcements and product updates, and have them automatically show up in your product's support widget or dashboard, or to have a product ideas form that automatically leads to a forum posts that other people can contribute to. That's also an excellent way to start running your forum -  initially, it's just you posting on there, and over time people will join and take over the torch from you.






<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>