---
title: Advent of Code 2023
description: Trying some new tool combinations this year with Jupyter Notebooks and Node.js.
date: 2023-12-02T19:22:28.530Z
taxonomies:
  category:
    - Blog
extra: {}
---

[Advent of Code](https://adventofcode.com/) has started again!

There's always a question around what language or tool you use to complete the challenges. This year, I decided to keep it simple, and keep it to what I know best: Javascript.

I did want to try a new way of running Javascript though, something I've thought about before but never had a chance to try: Jupyter Notebooks.

If you're not familiar with [Jupyter](https://jupyter.org), it's an interactive notebook platform, mostly used in the Python and data science community to quickly evaluate code on data and see instant results.

It has a really nice [built-in Visual Studio Code interface](https://code.visualstudio.com/docs/datascience/jupyter-notebooks), which Microsoft ships pre-installed with their build of VSCode.

## Running Javascript in Jupyter
Jupyter consists of two parts - the UI, and the underlying 'kernel' that runs your code. Usually this is a Python environment, but you can install and build your own kernels to be available to Jupyter. One of those is [IJavascript](https://n-riesco.github.io/ijavascript/index.html).

Installing it is pretty simple. These are the commands I ran on my Mac:

```sh
brew install jupyter
npm install -g ijavascript
ijsinstall
```

After running those, I was able to run 'Create: New Jupyter Notebook' in VSCode, and able to select 'javascript' as the kernel in the the notebook.

There we go, ready to save some elves:

![Image](https://mirri.link/0nDG3tf)

Here's my repo with my solutions so far: 🔖 [tschoffelen/aoc-2023](https://github.com/tschoffelen/aoc-2023)


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>