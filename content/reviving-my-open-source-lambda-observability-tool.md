---
title: Reviving My Open-Source Lambda Observability Tool
date: 2026-11-17
description: "Introducing Ivy: an alternative to Lumigo for open-source AWS Lambda tracing."
taxonomies:
  category:
    - Blog
extra: {}
---


I've been using <span title="Internal link: Lumigo">Lumigo</span> for a long time to trace my Lambda functions. I just find it too hard to quickly see what errors are occurring in my functions, and I've never really got to grips with how [X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html) could be set up in a way that would be useful for me.

Lumigo is shutting down now (it's been acquired by [Dash0](https://www.dash0.com/)), and with it goes the advantage it had: it was built specifically for AWS Lambda, whereas most other observability platforms are set up to be more generic. That's great if you have lots of containers or Kubernetes clusters, but I mostly just have a bunch of projects with Lambda functions.

A few years ago, I built [TraceStack](https://schof.co/tracestack-open-source-observability/), an open-source self-hosted Lumigo alternative. I made some architecture decisions that made it hard to scale, so I eventually abandoned it. In the blog post I wrote about it, I explained how if I had to build it again, I'd build it as a single container with ClickHouse behind it.

And so the other day, I did finally build a v2 of it, now called [Ivy](https://ivytrace.dev/?utm_source=schof.co).

It's still open-source, easy to host, but there's also a hosted version, which is relatively cheap (100k free traces per month, then $5/million traces) and super easy to set up.

You connect your AWS account, select which functions to trace, and the rest happens automatically. 

<img src="https://mirri.link/YxWq6etqQ" alt="Image" />

It natively supports LLM traces, to be able to show you LLM usage, auto-traces all AWS and HTTP calls, and comes with an MCP that makes it easy to debug within your AI coding agent:

<img src="https://mirri.link/zgTnaQ6nh" alt="Image" />

It has all the basics: Slack alerts, an email digest, and – something I quite like – the ability to query the raw data if you have to, making it very easy to ask Claude to show you the functions making the most database calls, or the ones that are slowest, or the user workspace that is getting the most traffic.

This might never become a big tool, but currently it's serving my own needs really well as a simple Lumigo alternative that is cheap to run.

[ivytrace.dev](https://ivytrace.dev/?utm_source=schof.co)

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>