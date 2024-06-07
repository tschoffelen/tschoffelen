---
title: Tags - From UX to Implementation
description: Recently, I've become a really massive fan of tags and attributes
  as ways of allowing users on the platforms I build to structure data.
date: 2024-05-20T06:54:47.205Z
taxonomies:
  category:
    - Blog
extra: {}
---

Recently, I've become a really massive fan of tags and attributes as ways of allowing users on the platforms I build to structure data. 

My main note taking app [Obsidian](https://obsidian.md) supports both of these concepts as well, and they basically eliminate the need for folders and file name structures. I've basically adopted a single level file structure, where all notes live in the same single folder. Tags and attributes is how I filter, which is much more powerful. Finding an in-progress project at my company means searching for notes with the tag `#business` and the attribute `status = in-progress`. No dragging of notes between folders when statuses or scopes change.

The nice thing about tags and attributes as well is that they're very extensible and flexible. When building apps or data structures, there will always be unknowns about how users will interact with a feature. I was recently building the basics of a new platform for a customer, and was designing the database structure for the `Place` entity within their platform. Rather than trying to up front know which fields are important and which ones might fade away as it becomes clear that users don't care about them, I added a simple map of attributes, which allows the platform's admin users to determine what fields should exist, and update that taxonomy over time.

## Setting up infrastructure for tags
Adding tags to an entity is a very easy thing to do. I tend to leave the format of tags completely up to the end user, with minimal validation, often just representing them as an array of strings (`String[]`). 

Even those strings probably don't need too much validation or formatting. I do prefer to trim and lowercase them where possible, to decrease the chance of two tags being created that represent the same thing but are slightly different strings.

If you allow almost all characters in the tags, you can leave it up to the user how to use them:

- A user might use emoji as quick visual indicators: `Project stalled 💀` or `Low priority 🟢` / `High priority 🔴`
- It is possible to create a sense of hierarchy by using slashes: `projects/the-one`, `projects/a-second`
- Or even use them as very simple key-value pairs: `blood-pressure:high`, `status:in-progress`

To make it easy to show a UI to auto-fill previously used tags, or to manage tags, I tend to create a separate database entity that represents the tags themselves:

```ts
interface Tag {
   name: String,
   numberOfUses: Number
}
```

A background process or event-driven infrastructure can be used to update these `Tag` entities when new tags are added to entities, or clean up tags that are no longer in use by any entities.

The `numberOfUses` allows you to present a management UI where you can sort the tags by most used or least used, an easy way to find tags that should be cleaned up.

Having a separate entity for tags also allows you to attach more metadata in the future, like an `icon` or `color` field per tag, similar to MacOS Finder, where you can specify a color for any file tags you create.

## Building a UI to input tags

I find myself using the [react-select](https://react-select.com) package a lot to build tag selection UIs. 

<img src="https://mirri.link/uR_JD_u" alt="Image" />

It allows you to dynamically show autocomplete suggestions, but also allows arbitrary options to be added through the `AsyncCreatableSelect` version of the select:

```js
import React, { useMemo } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";

import { useData } from "@/lib/api";

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[^\w]+/g, "")
    .trim();

const TagsSelect = ({ onChange, value }) => {
  const { data: allTags } = useData("tags");

  const memoizedTags = useMemo(
    () =>
      (allTags || []).map((tag) => ({
        filterValue: normalize(tag),
        label: tag,
        value: tag,
      })),
    [allTags],
  );

  const promiseOptions = async (inputValue) => {
    const normalizedInput = normalize(inputValue);
    let filterOptions = memoizedTags || [];

    // Filter the options based on the search input
    const finalOptions = !normalizedInput
      ? filterOptions
      : filterOptions.filter((artist) =>
          artist.filterValue.includes(normalizedInput),
        );

    return finalOptions
      .sort((a, b) =>
        a.filterValue.indexOf(normalizedInput) <
        b.filterValue.indexOf(normalizedInput)
          ? -1
          : 1,
      )
      .slice(0, 15);
  };

  return (
    <AsyncCreatableSelect
      cacheOptions
      isMulti={allowMultiple}
      allowCreateWhileLoading
      isValidNewOption={(inputValue) => !!inputValue}
      placeholder="Add tags..."
      defaultOptions
      loadOptions={promiseOptions}
      formatCreateLabel={(inputValue) => `Add new tag "${inputValue}"`}
      onChange={(value) => onChange(value.map(({ value }) => value))}
      value={(value || []).map((tag) => ({ value: tag, label: tag }))}
    />
  );
};

export default TagsSelect;
```

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>