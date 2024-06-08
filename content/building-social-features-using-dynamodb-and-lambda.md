---
title: Building Social Features Using DynamoDB and Lambda
date: 2023-04-08
description: How we built a personalised feeds service and following using  serverless on AWS.
taxonomies:
  category:
    - Blog
extra: {}

---


Last month, we added some simple social features to [Street Art Cities](https://streetartcities.com/). These allow you to follow any entity on the platform (cities, artists, users), view a personalised feed of items related to those entities, and be notified when new items from entities you follow are posted.

<img src="https://mirri.link/4CTA0yz" alt="Image" />

Street Art Cities is built as a set of serverless services on AWS Lambda and DynamoDB, and figuring out the best architecture for this new functionality was a lot of fun.


## Single-table design

Street Art Cities runs on a single DynamoDB table with about two dozen different entity types. For the new social functionality, we introduced two new ones: `Follow` and `Activity`.

I tend to use Google Sheets or something similar to figure out how these entities should be laid out across the indexes in the table in a way that works with our access patterns. For these new entities, this looked roughly like this:

<img src="https://mirri.link/spJjqY5" alt="Image" />

The following access patterns were kept into account:

**Follow**

* Get list of followers of entity: `pk=follow#user_{me}`
* Get list of followed entities: `type=Follow, sk={me}`

**Activity**

* Get activities for specific entity: `pk=activity#user_{userId}`
* Get activities for people I follow: `type=Activity, sk begins with {me}`

This pattern allowed enough flexibility to easily fetch user-related activities and followers, but also to extend it to following cities, artists and other entities we might introduce in the future.


## Activity fan-out

As part of making activities available for all followers of a certain entity, we need to create multiple copies of that activity for each recipient. This creates a lot of overhead in terms of number of rows, but for the scale of our platform, and with the fact that DynamoDB scales quite gracefully, this is a worthwhile trade-off that has the following benefits:

1. Near-instant feed updates for a user - when a new activity is added, only a single row needs to be added, rather than re-creating their whole feed
2. Super quick queries for a user's feed - no need to do any post-processing, a single DynamoDB query will return any user's up-to-date feed
3. Allows for an easy mechanism to back-fill content for later followers (more about that below)

Here's what the final architecture for that looks like:

<img src="https://mirri.link/GwviNXY" alt="Image" />


## Updating feed on follow and unfollow

When a user starts following someone, we want to retroactively add the followed user's activities to the feed for the follower. 

With this database structure, that is easily accomplished. We simply listen to a DynamoDB stream event for new follows, and kick off a process to find the original versions of recent activities for that user, and add them to the follower's feed in a similar way to the fan-out depicted above.

When a user unfollows an entity, the opposite happens: any activities related to that entity, are removed from the user's feed.

Of course, unlike with the fan-out, there are no push notifications sent to the user when these activities are created or removed.


## Follow suggestions

That's really all you need to get a working social feed, but you can't just present a user an empty feed to start out with. Our solution to this is two-fold:

1. Alongside your personal feed, you can also switch to see the 'world' feed, which contains all activity across the platform. This is the first feed new users see.
2. If you personal feed is empty, we show a suggested list of users, cities and artists to follow.

Although I have some exciting ideas on how to create a personalised list of suggested entities to follow, for now every user on the platform sees the same list. This list is refreshed every few hours, and contains a semi-random selection of our top cities, verified artists and most active users:

<img src="https://mirri.link/SkHnivp" alt="Image" />


## Architecture questions homework

We're quite happy with how this setup works, and users have responded very enthusiastically to the new functionality. 

There are however a few considerations to think about in the future:

1. This system treats the original copies of activities and their per-user variants very similar, by storing them in the same place. If this platform were to scale massively, storing a per-user variant might become too expensive. Would we skip to a more temporary in-memory database to hold per-user variants, or rather step away from storing per-user variants at all, and compile the feed at request-time? Is there a way to do so that is fast enough?
2. There is currently no process in place to remove activities related to a specific piece of content from all users' feeds easily. On our platform that isn't much of a problem, because removing artworks is rare (they usually get updated to indicate 'removed' state rather than removing the original entity in the database), but is it possible to migrate to a structure that makes it easier to achieve mass deletes of a specific activity?

It's going to be exciting to see how this system scales over the next couple of months as more users start following and posting!

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>