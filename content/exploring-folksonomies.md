---
title: Exploring Folksonomies
description: I've been getting very obsessed with tagging systems around the
  internet in the last couple of weeks. It all started with me thinking about a
  new tagging system for artworks on Street Art Cities, and...
date: 2023-06-26T15:01:08.177Z
taxonomies:
  category:
    - Blog
extra: {}
---
I've been getting very obsessed with tagging systems around the internet in the last couple of weeks. It all started with me thinking about a new tagging system for artworks on Street Art Cities, and trying to figure out both how much freedom/structure to provide to users, and what this would look like visually.

It re-fueled my obsession with the [OpenStreetMap](https://www.openstreetmap.org/about) community, which has a social tagging system that is completely free-form. [Tags](https://wiki.openstreetmap.org/wiki/Tags) on OpenStreetMap consist out of key-value pairs, which can be freely defined by users. Not only can they enter any value, but they can also define any key. If you think starting to track rain barrels on OpenStreetMap is useful, you can add a "rain_barrel" tag, without needing anyone's approval.

These taxonomy systems managed by the users of a platform are often referred to as [Folksonomies](https://en.wikipedia.org/wiki/Folksonomy), as coined by [Thomas Vander Wal](https://web.archive.org/web/20051204013128/http://www.ok-cancel.com/archives/article/2005/07/tagging-for-fun-and-finding.html) in 2005.

## Professional tag-teams

This system of tagging puts a large responsibility on the community to self-police tag use, and come to consensus about what it means to use a certain tag in a given context (i.e. a tag name "creator" might be filled with completely different values based on the user's understanding of this term in a given context - with an artwork entry on Street Art Cities, would this refer to the original artist, or the photographer, or the person creating the representation of this artwork on the website?)

The popular fan-fiction website [Archive of Our Own (AO3)](https://archiveofourown.org) is another great example of community-based tagging, and it has hugely contributed to the site's growth. Community members were able to find the works that perfectly aligned with their preferences by combining several tags.

They recently recruit new volunteers who sign up to be Tag Wranglers:

> The Tag Wranglers are responsible for helping to connect and sort the tags on AO3! Wranglers follow internal guidelines to choose the tags that appear in the filters and auto-complete, which link related works together. This makes it easier to browse and search on the archive, [...].
> If you're an experienced AO3 user who likes organizing, working in teams, or having excuses to fact-check your favorite fandoms, you might enjoy tag wrangling! To join us, click through to the job description and fill in our application form.
> [source](https://archiveofourown.org/admin_posts/26281)

## Discovery and search

Of course, the main reason to have these tags is usually two-fold, with one feeding into the other:

1. Improve **discoverability** of content by giving more ways of searching and filtering for specific bits of content.
2. Add more **data** to the content. In cases like OpenStreetMap, adding tags is part of creating the content itself.

## Implementing in Street Art Cities

For [Street Art Cities](https://streetartcities.com), the second of these is the most important and urgent at the moment. For a while, _hunters_ on the platform have been asking for additional fields to document things like the organisation that helped realise the artwork, the festival during which the artwork was created, and additional information about the artwork itself (subject matter, materials, public/private access).

![Tags in Street Art Cities](https://schof.link/iLtprpc)

After lots of conversations, for now, we ended up going for a mix between system-defined tags and giving users flexibility within the system.

The Street Art Cities core team decides what tag _names_ are available (with input from the community of hunters and artists, and tweaked constantly), and hunters can add any value.

That means, that as a hunter, you can add the 'Festival' tag to an artwork. Once you start typing a value, it will show autocomplete options for existing values, but you're free to add a new entry if one that works for you doesn't yet exist.

These tags are shown on the artwork details pages, and link to a tag overview page where you can see all artworks [tagged with the name of a festival](https://streetartcities.com/markers/attributes/festival/Street%20Art%20Frauenfeld), or 'Artwork Subject = Nature', etc. A great way to explore new content. You can also generate embeddable maps for a specific tag, for example to show all artworks for a specific edition of a festival. 

![](https://schof.link/8YnxIGt)

We're looking into further expanding the search and discovery functionality over the next months, and I'm really excited to see how the community uses this functionality. Hopefully it'll not only improve our street art database, but also make it easier for users to explore that content.