---
title: Moving over Street Art Cities to PMtiles and MapLibreGL
description: Street Art Cities is basically one big map. Well, lot’s of individual maps.
date: 2023-06-08T19:15:23.465Z
taxonomies:
  category:
    - Blog
extra: {}
---
[Street Art Cities](https://streetartcities.com/) is basically one big map. Well, lot's of individual maps.

We've long struggled with rising costs of our map providers. Originally, we relied fully on the Google Maps JS API, until this got too slow for the number of markers on some of our maps, and it was getting quite expensive. We then used [Mapbox](https://www.mapbox.com)'s SDK for a while, with its amazing `mapbox-gl` JavaScript library.

Recently, our maps bill has risen to more than triple our entire hosting bill. 

We've previously looked into running our own tile server based on OpenStreetMap, but it seemed hard to maintain, considering that the rest of our infrastructure is fully serverless (AWS DynamoDB and Lambda).

And then, a few months ago, we learned about [Protomaps](https://protomaps.com/), a new serverless system for providing self-hosted planet scale maps. It is built to run directly on a file hosting service like AWS S3.

By default, it uses HTTP range requests (like those you would use to stream video) to be able to download small parts of a single, large tile file (in `.pmtiles` format).

Setting this up was relatively straightforward. We replaced Mapbox GL with [MapLibre GL](https://maplibre.org), and set up a CDN in front of the [PMTiles](https://protomaps.com/docs/pmtiles) archive file.

**That means we now have a fully self-hosted vector map, with very minimal costs!**

![](https://schof.link/tZD2bJq)