---
title: Not a Swarm of Agents, but Still Effective
date: 2026-10-01
description: Simple tweaks to make my AI development flow more effective.
taxonomies:
  category:
    - Thought
extra: {}
---


I know some devs who have multiple Claude Max 200 subscriptions, and have a swarm of agents working for them all the time. 

I don't really like that, it feels too overwhelming for the level of code review I want to do myself, and how much control I want to retain over the codebase. What I do have is what I think of as a very effective flow, however.

My recent addition has been a few snippets in [Alfred](https://www.alfredapp.com/) that allow me to quickly insert often-used prompt snippets:

Typing `^impl` outputs this:

```plain
Implement this in the simplest way. Cleanness over complexity. Minimal and simple. Extra points for making it very clean and readable code.
```

Sometimes I want it to automatically branch and create a PR, so I use `^pr`:

```plain
Create the simplest possible PR to implement this. Cleanness over complexity. Minimal and simple. Extra points for making it very clean and readable code.
```

Sometimes I want it to absolutely not commit any code before I look at it in my local editor, `^dont`:

```plain
Don't commit, branch or push yet. I'll do this later after reviewing the code myself first.
```


These are super simple, but they save me a lot of time, and feel like a real level-up for my flow.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>