---
title: Premature Abstraction of Entity Names
date: 2025-11-09
description: It’s easy to name your entities something too abstract too early when designing data structures.
taxonomies:
  category:
    - Blog
extra: {}
---


When I started building the current iteration of the Street Art Cities platform a few years ago, I decided on the following core entities:

<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Site Entity (left box) -->
  <rect x="50" y="75" width="100" height="50" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="100" y="105" text-anchor="middle" fill="currentColor" font-family="sans-serif" font-size="16">Site</text>
  
  <!-- Marker Entity (right box) -->
  <rect x="250" y="75" width="100" height="50" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="300" y="105" text-anchor="middle" fill="currentColor" font-family="sans-serif" font-size="16">Marker</text>
  
  <!-- Relationship line -->
  <line x1="150" y1="100" x2="250" y2="100" stroke="currentColor" stroke-width="2"/>
  
  <!-- Left side: || (exactly one) - moved further from box -->
  <line x1="160" y1="95" x2="160" y2="105" stroke="currentColor" stroke-width="2"/>
  <line x1="165" y1="95" x2="165" y2="105" stroke="currentColor" stroke-width="2"/>
  
  <!-- Right side: o{ (zero or many) - moved further from box -->
  <circle cx="230" cy="100" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="240" y1="95" x2="240" y2="100" stroke="currentColor" stroke-width="2"/>
  <line x1="240" y1="105" x2="240" y2="100" stroke="currentColor" stroke-width="2"/>
</svg>

A Site can have multiple Markers, and a Marker is connected to a single Site.

Both of these are somewhat abstract entities. A Marker has a type attribute, which can be either `artwork` or `place`. Places are things that aren’t artworks, but still relevant to display on the map, and has a bunch of sub-types: Hall of Fame, Can Shop, Skate Park, Street Art Bookshop, etc.

Sites work the same way, but at launch there was only one type: `city`. Each Site represents a city that someone can have permission to add markers to, and holds a lot of metadata to render `streetartcities.com/cities/{siteId}`.

In my mind, there might be other types of Sites in the future - maybe a street art festival would have their own Site, or a gallery. Maybe there would be some other type of Site that I hadn’t thought about yet. 

This turned out to be a useless abstract, since all of those other structures ended up being built as separate entities, as you always want a Marker connected to a specific city, even when it’s **also** part of a festival or gallery. 

Trying to be clever here was a major distraction, and over time, as multiple people worked on the codebase, we started using the works `site` and `city` interchangeably in variable names and comments, which is a bit messy. 

It would have been so much better to stick to the use cases we fully understood, and have gone with a City entity. If we would have had to refactor later, that would have been easier than ending up with a situation where we’re using not using [ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html) for this entity in our model.


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>