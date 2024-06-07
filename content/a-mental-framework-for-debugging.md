---
title: A Mental Framework for Debugging
description: Engineers spend a lot of their time debugging issues. It's a skill
  you acquire over time, and something that each engineer does in a…
date: 2023-12-11T18:47:19.177Z
taxonomies:
  category:
    - Productivity
extra: {}
---

Engineers spend a lot of their time debugging issues. It's a skill you acquire over time, and something that each engineer does in a slightly different way - a personal style.

Over time you get better at spotting patterns and finding the tools that help you trace down problems or mistakes. In addition, you'll develop a (explicit, or more likely implicit) mental model or process you follow to debug something.

Thinking about my personal process, it breaks down into three parts:

1. Verifying the symptoms
2.  Shortening the cycle
3. Revealing assumptions

Let's break these down:

## Verifying the symptoms

Something I've done way too often is assumed a bug was actually a bug, and not user error or a side effect of something outside the control of my code.

Rather than wasting time trying to get to the bottom - first try to verify issue exists in the form it has been reported.

This might mean trying to reproduce the issue, or simply looking at contextual data, like application or database logs. Tools like Hotjar are worth their weight in gold here for front-end issues, showing you exactly how the user interacted with your app and what they got to see after encountering the bug.

Trying to collect as much as possible of this contextual data will make the rest of the debugging process much easier, and will give you more confidence in your solution.

## Shortening the cycle

Once you've verified the issue exists, you want to make it as easy as possible for yourself to do the actual debugging - making changes to the code and verifying the result.

This might sound like an obvious statement, but I feel like this is a step of the process that junior devs will sometimes not spend the appropriate amount of time on.

Spending a little more time setting up your test environment pays back in a big way in saving you time in the actual fixing. Over the years, I've wasted a lot of time by feeling like something was too simple or straightforward to write an automated test for it, ultimately at the end of the process coming back to realising that if I'd done the from the start, I'd have saved myself a bunch of time.

The question you want to ask in this step: how can I make it take as little time as possible to see the result of my code changes? And a unit test (if applicable) is almost always faster to run than clicking around on a web page!

## Revealing assumptions

This then leads into the more straightforward part of the debugging process: make changes to your code until the expected result is achieved.

It's tempting to jump around, but try to follow a linear approach to your problem solving, actually reading each line of the relevant code and asking yourself what assumptions you are making about how the code behaves.

Testing those assumptions comes in a bunch of flavours:

- Simple `print` and `console.log` statements - they're really cheap and fast! My colleagues all have added a shortcut in their IDE where <kbd>Cmd + L</kbd> will insert a `console.log({variable})` statement.
- Debuggers and debugging tools might seem overkill in many situations, but things like React Devtools, and the built in debugger in VSCode are good things to be aware of.
- Sometimes it helps to test assumptions in a 'clean' environment. Apps like CodeRunner, Jupyter Notebooks (which are built into VSCode!) and tools like JSBin or [JSNotebook](https://jsnotebook.dev) are a good way to quickly validate assumptions on things like the behaviour of built-in functions and language features.

I hope some of these tips were useful, happy bug fixing!

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>