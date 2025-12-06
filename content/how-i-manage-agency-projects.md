---
title: How I Manage Agency Projects
date: 2018-11-16
description: I’ve both worked in classic startup environments, where you typically work on one or two big products, and agency environments where there’s anywhere...
taxonomies:
  category:
    - Blog
extra: {}
---



<img src="https://mirri.link/EjOBmTTHE" alt="Image" />

I’ve both worked in classic startup environments, where you typically work on one or two big products, and agency environments where there’s anywhere between 5 and 25 ongoing projects at any time.

I feel like enough has been written about how project management is done within startups, so I’d like to focus on this post on how we manage projects at Includable Agency.

## Background

First some background: we’re a small agency based in Amsterdam, developing mobile applications for iOS and Android, as well as bespoke web applications. My colleague Dante and I both work full time on managing projects and doing some of the design and development work. We’re surrounded by a team of part-timers and contractors, made up of designers and React Native, iOS, Android and web developers. Nearly all of them work remotely.

Our customer base ranges from tiny startups to nationally known companies and several branches of Dutch government. We tend to mostly have customers that stay with us for a long time — the average duration of a customer relationship is about 3–4 years at the moment.

## The tool belt

<img src="https://mirri.link/PFpXSAF5K" alt="Image" />

Over the years, we tried every project management tool from Basecamp to Asana, to Flow and JIRA, and everything in between. At some point we decided that Trello would be our default tool for project management, since it’s super flexible, cheap, and very easy to use, both for our internal team and our customers.

We still use JIRA for tracking bug and feature requests on our most complex and long-lasting projects, but for everything else we use a series of Trello boards, as well as Slack for quick discussion about tasks.

## Weekly overview

<img src="https://mirri.link/Rl7Kd8tmx" alt="Image" />

The central board for our team is the Weekly Overview board. Everyone in the team has access to it. The main goal of this board is to show day-by-day deadlines and priorities across all of our projects. It answers the central question: “What do I need to get done today?”

It contains the following columns:  
**Monday | Tuesday | Wednesday | Thursday | Friday | Next Week | Future**

Every Friday afternoon we fill the first five columns with cards from the Next Week and Future columns. Throughout the week cards get constantly added and shuffled around.

All cards for which all prerequisites have been met (design assets, info from the customer, etc) get an assignee, and their description and links should be enough for that team member to get started on that task. If they have questions, they can see who created the task (usually either Dante or me) and contact that person either through the comments on Trello or via Slack.

When a task is completed, it gets assigned back to Dante or me for review, and then archived when completed. If there’s still work to be done, it either gets re-assigned to the original assignee, or a new card with a follow-up task is created.

## Big picture

<img src="https://mirri.link/H5aRfz6LM" alt="Image" />

Another board that is central to our management is a board called Big Picture. Only Dante and myself have access to it.

It has a column per week (in the format Week XX), which lists the on-going projects during that week. This allows us to quickly gauge the workload in that week, and see when we have time to fit in new projects.

Cards in this board are very simple — they just contain a title and one or more labels denoting the type of work: design, mobile dev, web dev. Cards are duplicated for each week that a project will be ongoing.

At the end of every week, the column of that week gets removed.

## Project boards

<img src="https://mirri.link/AZ-_9S15K" alt="Image" />

For every project that has a duration of more than one or two days, we also create separate kanban-like boards. Access for those is limited to Dante and myself, the members of our team working on that specific project, and the client.

It has these columns:  
**Backlog | Planned | In Progress | Review | Done**

The backlog column contains any tasks that still need a clearer briefing, or tasks for which we’re still waiting on the customer to deliver resources (often designs, variables or access to certain services or accounts).

Our team members move tasks from Planned to In Progress to Review, where either Dante/me or the client check the completed work and move the card to the Done column.

Depending on the scale and structure of a project, we might invite a customer to join the board right from the start of the project, or only once we enter the testing/bugfix phase of the project. During that phase the customer is encouraged to report any issues they face during testing in the Backlog column, giving them an easy way to report problems and track progress on fixes.

From our Weekly Overview board, we often link cards through to these project boards, so that team members have the project summary and tasks in one place. For smaller projects that only take a few hours, we just use checklists on the cards in the Weekly Overview board.

## Iteration

We’re constantly iterating this structure with the team and our customers.

I would love to hear how you use Trello or other project management tools to keep track of your development projects!

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>