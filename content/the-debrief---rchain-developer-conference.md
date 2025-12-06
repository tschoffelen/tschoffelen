---
title: The Debrief - RChain Developer Conference
date: 2018-04-26
description: Earlier this month, some members of the Includable and Moonshot.Expressteams were invited to Boulder, a small town near Denver, CO, to join the...
taxonomies:
  category:
    - Blog
extra: {}
---


Earlier this month, some members of the [Includable](https://includable.com/?utm_source=th3build) and [Moonshot.Express](http://moonshot.express/)teams were invited to Boulder, a small town near Denver, CO, to join the RChain Developer Conference. There, the team behind [RChain](https://www.rchain.coop/) showed off their progress in the development of a new blockchain platform that promises near-infinite scalability by using asynchronous smart contracts and a new programming language called [Rholang](https://developer.rchain.coop/tutorial).

<img src="https://mirri.link/bFk7hc2QA" alt="Image" />

We came there with not much more knowledge about the RChain platform than the very short [executive summary](https://thomasschoffelen.com/gist/E1) I had prepared for the team, but that didn’t stop us from quickly getting the development environment for writing smart contracts set up and even building our [own tool](http://rchain.cloud/) to test smart contracts online after the first day of the conference. More on that later.

Without further ado, here are some of our main takeaways from the conference.

## The flight to Mercury

Musk might have set his sights on Mars, but the RChain community is currently focussing on Mercury. That’s the code name for the first major release of the RChain platform (later releases are named Venus and Earth). As much of excitement there is for this release, which is currently planned for the end of this year, there’s has also been quite a bit of unclarity about what is and what isn’t included in this release.

The deployment of the first testnet, which will allow you to actually test smart contracts working on multiple nodes is planned for the start of this summer, with a first version of the [communications layer](https://rchain.atlassian.net/wiki/spaces/CORE/pages/2293768/Communications) and [namespace logic](https://rchain.atlassian.net/wiki/spaces/CORE/pages/33839/Namespaces) being finished right now.

Then in December, the launch of the RChain main net is planned, which will allow developers to actually deploy their first real dApps on the RChain platform.

A global roadmap for the Mercury release can be found on the [RChain Confluence documentation site](https://rchain.atlassian.net/wiki/spaces/CORE/pages/105709609/The+Flight+to+Mercury), as well as very detailed briefings for the minor releases (0.3, 0.4, etc.) that are scheduled for the next months.

<img src="https://mirri.link/7k4thC7WG" alt="Image" />

## Rholang

Applications for the RChain network are built in a new language called Rholang, which implements Rho Calculus, an extension of Pi Calculus. Pi Calculus is quite a unique way of building processes that run in parallel (think Javascript `async/await`, but for statement you write).

A great way to learn about it is using [JsonPi](https://github.com/glenbraun/JsonPi), a sample implementation of Pi Calculus by Glen Braun, with some great documentation on how the basics of it work.

Currently trying out Rholang itself requires you to boot up a RChain node (a server on the blockchain) using Docker, which can be slightly tedious, especially on Windows machines. That’s why our team (lead by Ahsan Fazal and myself) immediately sprung into action to build a simple web-based tool to execute Smart Contracts (programs) written in Rholang. You can find it on [**rchain.cloud**](http://rchain.cloud/). There is a link to the Github repository for the project there as well, so feel free to contribute to it if you feel like it!

## Community

The community behind RChain is quickly growing, and it is quite clear why: it is a blockchain platform that is built on solid theory, and the product of more than ten years of research by the founders.

Excitement about the possibilities is very great, and although it will take a while before the platform is built out far enough to be able to actually get started on building those apps that people in the RChain community are fantasising about, but there is a pretty tight-woven group of people both inside the organisation and big group of volunteers that try to get to this reality as fast as possible.

One of the ways in which this is being achieved is through the [RChain bounty program](https://github.com/rchain/bounties), which can be joined by everyone, and is a great way to collaborate on this awesome project while also making some bucks.

<iframe width="560" height="315" src="https://www.youtube.com/embed/vcIZSZmpO9E?si=CXqbj_R3SU0nmTPm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

It is also great to see that blockchain platforms can comfortably live next to each other (for now). We met some great Ethereum stakeholders at the conference as well!

## Extending in Europe

Includable is supporting [Inblockio](http://inblockio.com/) in getting RChain excitement going in Europe. To that effect we’re working on developing learning tools, as well as organising community meetups in The Netherlands and Germany. The first one will be held soon in Amsterdam, so stay tuned!

## Back to Boulder

For me, it was the second time being in Boulder. It’s a beautiful small town, in a valley just 10 minutes from the Rocky Mountains by car. We went there [two years ago](https://medium.com/@egidvanhoutem/why-we-go-to-boulder-and-the-boulder-startup-week-f928729bb1f2) during Boulder Startup Week to show some officials from my hometown, Heerlen, what a city of that size could be in terms of supporting startups and creating a Silicon Valley-like environment (the good parts!).

[Boulder Startup Week](http://boulderstartupweek.com/) starts on the 14th of May this year, so if you have the opportunity to drop by, I would certainly recommend it!

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>