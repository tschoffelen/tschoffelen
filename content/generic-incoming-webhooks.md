---
title: A New Type of Generic Integrations
date: 2026-10-26
description: Incoming webhooks in the era of AI.
taxonomies:
  category:
    - Blog
extra: {}
---


Before, if you wanted your system to listen to events in Linear and GitHub, you'd have to build webhook integrations for those two systems. Your service provides some URL that these external systems can send API calls to, in the very specific format for each platform, and you process that payload.

Want to also support GitLab? You can re-use some of what you've built, but GitHub and GitLab webhook events aren't structured the same, so you'd have to build a new integration, probably on a separate URL, to listen to these new events.

<img src="https://mirri.link/J3fr9zAjl" alt="Image" />

Recently, however, you might decide to approach this differently, especially if you want your system to integrate with lots and lots of different webhooks.

Why not just put in place a small LLM to accept these webhooks, and field requests that way? My [personal tasks app](https://schof.co/building-personal-software/) approaches it that way.

In the settings, I can create a new webhook, optionally with some additional LLM instructions (e.g. 'ignore forum posts that aren't bug reports') and it will give me an arbitrary webhook URL I can use for any type of system. The LLM will figure out if and how fields in the payload should be mapped to task fields.

<img src="https://mirri.link/7LM3xOisY" alt="Image" />

This won't work for all types of integrations and webhooks flows, but it's perfect for something like this.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>