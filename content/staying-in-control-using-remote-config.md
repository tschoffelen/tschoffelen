---
title: Staying in Control Using Remote Config
date: 2025-05-25
description: Apple and Google's app review process for getting a new version of an app released into the App Store and Google Play is pretty fast these days,...
taxonomies:
  category:
    - Blog
extra: {}
---


Apple and Google's app review process for getting a new version of an app released into the App Store and Google Play is pretty fast these days, often taking less than 48 hours, and frequently even under 24 hours.

That's still a long time to wait if you need to deal with an urgent bug or have information you want to communicate with your app users. That's why it's important to build in some controls into your production mobile apps to be able to deal with situations where you want to make small adjustments.

## Feature flags
The easiest one of these is feature flags, also sometimes known as feature toggles. These allow you to remotely toggle on or off certain functionality in your app. 

This is often used as a way to keep beta functionality hidden until it's ready for a full audience release, or when feature releases need to be synced up with marketing activities. It's also super useful for dealing with unexpected issues, where turning off a certain set of features for a limited time might help resolve a crash.

Services like [LaunchDarkly](https://launchdarkly.com/) will let you configure these on a per-user level, so you can roll out a certain feature only to a subset of users, or gradually increase roll-out across the full audience over a certain period of time, allowing you to stop it if any issues occur.

For [Street Art Cities](https://streetartcities.com), I've opted for a more low-tech solution: a JSON file hosted in AWS S3. Admins on the platform have a simple dashboard where the feature toggles are available, and the app downloads an updated version of the feature flags file every time it is launched.

<img src="https://mirri.link/p1ackRA" alt="Image" />

## Dynamic content
In addition, we've done something that allows us to display dynamic content in various areas of the app. This is super useful to quickly add information for users regarding a bug, but also to insert marketing content. The 'Book a tour' button below is an example of this dynamic content:

<img src="https://mirri.link/OVBFs-O" alt="Image" />

This is again powered by JSON files living in AWS S3. These contain definitions of banners and buttons, and the app will try to load files based on the area of the app it's in, e.g. `.../media/global/above_feed.json` or `.../media/cities/paris.json`.

If a file doesn't exist and a 404 response is returned, the app won't show any content.

This is an example of one of these files, specifically meant to show a 'Best of 2024 Awards' banner above the homepage feed of the app:

```js
[
    {
      "id": "awards2024",
      "appearance": "banner",
      "conditions": [
          ["dateAfter", "2025-01-01T00:00:00Z"],
          ["dateBefore", "2025-01-27T20:40:00Z"]
      ],
      "content": {
        "type": "touchable",
        "attr": {
          "style": {
            "borderRadius": 12,
            "backgroundColor": "#e62d37"
          }
        },
        "action": {
          "type": "web",
          "content": "http://streetartcities.com/awards/2024/inline"
        },
        "content": [
	      {
            "type": "image",
            "content": "https://streetartcities.com/...",
            "attr": {
              "resizeMode": "cover",
              "style": {
                "height": 84
              }
            }
          },
          {
            "type": "view",
            "attr": {
              "style": {
                "flexDirection": "row"
              }
            },
            "content": [
              // ... etc etc ...
            ]
          }
        ]
      }
    }
  ]
```


A simple conditional checking system validates if each item should be displayed, allowing us to only show these items during certain dates, or for users using certain versions of the app:

```js
import { Platform } from "react-native";
import pkg from "@/package.json";

const checkCondition = (condition, user = null) => {
  const [type, value] = condition;
  
  switch (type) {
    case "platform":
      return value === Platform.OS;
    case "osVersionAfter":
      return value > Platform.Version;
    case "osVersionBefore":
      return value < Platform.Version;
    case "appVersionAfter":
      return value > pkg.version;
    case "appVersionBefore":
      return value < pkg.version;
    case "dateAfter":
      return new Date(value).valueOf() < new Date().valueOf();
    case "dateBefore":
      return new Date(value).valueOf() > new Date().valueOf();
    case "hasRole":
      return user?.roles.includes(value);
    default:
      return false;
  }
};

const shouldShowMediaItem = (item, user) =>
	!item.conditions ||
	item.conditions.every((condition) => checkCondition(condition));
```

The content itself is rendered using some basic logic that converts the JSON into React Native views, touchables and images, with some pre-configured actions when the items are tapped: open a web page, navigate to a screen or open a new screen with content specified in the JSON.

The flexibility of this system is so helpful, and has saved me from disaster multiple times. I keep extending this system and adding new areas in the app where this data can be pulled in.

There's also a hidden staging area in the app, where I can test and preview content, before it goes live for the production app users audience:

<img src="https://mirri.link/ygy3tp2" alt="Image" />




<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>