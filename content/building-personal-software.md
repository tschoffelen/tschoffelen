---
title: Building Personal Software
date: 2026-10-23
description: Building my own perfect tasks app, with an agent I can hand tasks off to.
taxonomies:
  category:
    - Blog
extra: {}
---



I've used Things as my main todo list app for years now. There's been slight interruptions at times when I switched back to something else for a bit because of its theoretical benefits (Todoist to work together with my colleagues, Obsidian to keep my tasks and notes in one place), but I keep on coming back to Things.

Recently though, the fact that Things runs as a native app that syncs, but otherwise doesn't really communicate or integrate with other tools, has really started to become a limitation. I want to be able to tell Claude about tasks it should add, sync Linear tickets, and most importantly, let it read from other sources to suggest actions to take to complete the task.

So the other day I spent a day "building" (almost entirely vibe-coding) an app that looks a bit like Things, and copies its best features (tasks automatically rolling over to the next day, Reminders import, etc).

<img src="https://mirri.link/Wz8vlUfzS" alt="Image" />

It's amazing how much you can get done in a day. I have a largely native iOS and Mac app, a web version, the ability to hand tasks to an agent that can read GitHub repos, talk to MCPs, and respond to webhooks. It's called [Queues](https://queues.bot), for now (I like the domain `queues.bot` I got for it, but it also doesn't entirely fit what the app does).

There's so many flows this unlocks:

## Automatically listen to the Street Art Cities forum

A large part of my work for Street Art Cities is seeing the bugs and feature requests people report on the forum, and taking appropriate action.

A simple webhook URL you can copy from the app and paste anywhere allows it to listen in real-time to new posts on the SAC forum. A small LLM then decides whether it's an actionable request, and if it is, it creates a task and hands it off to the agent.

## Automate the ticket lifecycle

The agent might decide to read the SAC source code from GitHub to get more background info on the feature request or bug report (why it works like that right now, what would have to be changed), and proposes a Linear ticket to create.

Once I approve it, Claude Code starts drafting a PR.

I might choose to not approve it though, or take over from the agent and mark myself as the assignee of the task. 

Maybe I'll write out a more detailed description of what I think needs to happen, or split it up in subtasks, then hand it back to the agent. Or I might just complete it myself.

## Lifecycle events

If a Linear ticket was created as part of the task, it's ID will be added as a watch word for the task. When Linear's webhook reports the ticket was marked as completed, the agent wakes up and decides on the next action: assign a subtask to me to reply to the original forum post, draft an email, or simply mark the task as done.

## Reality vs theory

What I realised quickly though, is that quite a lot of the tasks in my todo list are mundane things, like "put the bins out" or "schedule a dentist appointment". 

It's taken some effort to get the system to correctly judge which things can be helped by the agent, and which things are just simple tasks that are mine alone to complete.

"Start thinking about Christmas gifts" was a surprising one where the agent was able to help a lot: it pulled a lot of info from my daily notes, suggesting which people to get presents for, what those people had said in the past that could be used as gift inspiration, and suggesting to move this task into the future, since it's still only October!

## How to effectively vibe-code tools like this

What I've learned is that for things like this, were I really don't care that much about the underlying code, the only thing I want to be more or less in charge of is the data model - that's the main lever that decides how everything else is implemented and if it makes sense. 

That's why all my prompts start with the instruction to use my [DynamoDB ORM-style library](https://turbine.js.org/), descriptions of the different entities I envision, and the request to create an OpenAPI spec for the API. That allows me to inspect the internals of the system as it grows, and easily steer the AI by using the terminology it uses for the entities in the system.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>