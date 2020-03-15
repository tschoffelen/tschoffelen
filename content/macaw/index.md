---
title: Transactional emails at scale
date: 2020-02-24
category: Open source
---

At every tech startup I've created, we've had a need for transactional emails. You know, the ones that welcome you after you created your account, or help you reset your lost password, or update you about the status of your support request.

When it's just one or two, it's still relatively simple to manage them. At some point, however, there will be a few dozen, not all using the same layouts, possibly in multiple languages, and things become more complicated.

Partnerships will want to be in control of the copy in the emails, the UI designer wants and easy way to update templates without having to dive into the business logic, and engineers just want to be able to fire off the right template at the right moment, without having to touch the design or copy at all.

## Introducing Macaw

That's why I started building a toolkit named [Macaw](https://github.com/macaw-email/macaw) a few weeks ago. It builds on the experience I've gained setting up transactional emails at scale for [NearSt](https://near.st/) and [Street Art Cities](https://streetartcities.com/).

![In-browser email preview tool](browser-preview.png)

## Templating structure

It introduces a neat structure for managing email templates, separating out copy and layouts as re-usable components:

- In Macaw, an email **template** is a simple Markdown file with some frontmatter to choose what layout to use, and optionally set a subject, etc. This makes it easy to edit the copy of emails, even for non-developers.
- A **layout** is written in [MJML](https://mjml.io/), a very simple HTML-like markup language that allows you to design responsive and cross-client compatible emails.

Keeping these two things separate allows easy editing by each stakeholder (designers can work on the layout files, partnerships can work on the actual templates).

## The toolkit

The [Macaw toolkit](https://github.com/macaw-email/macaw) is open source and available on Github.

It currently consists of the following tools:

- **Node.js library** to discover, parse and send emails with a few lines of Javascript.
- **In-browser preview tool** to help you view what your emails will look like while editing them, in real-time.
- **Command-line utility** that automates the process of setting up the email templates structure in your project.

I'm very excited for people to see this, and look forward to extending it in the coming months with additional functionality.

<a class="button" rel="noopener noreferrer" href="https://github.com/macaw-email/macaw" target="_blank">View on Github</a>
