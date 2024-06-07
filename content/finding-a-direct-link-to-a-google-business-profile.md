---
title: Finding a Direct Link to a Google Business Profile
description: The other day, I was trying to find a way to link directly to a
  business listing in Google. There’s a lot of information available about…
date: 2023-10-06T17:13:34.928Z
taxonomies:
  category:
    - Blog
extra: {}
---
The other day, I was trying to find a way to link directly to a business listing in Google. There's a lot of information available about this online, but it's all quite disjointed. Here's an overview of what I found.

## Local reviews
Google really wants to help business owners get more reviews on Google, so they share a few different links to encourage this:

* **"Write a review" URL**
	* Format: `https://search.google.com/local/writereview?placeid={googlePlaceId}`
	* Requires the Google Place ID to be known
	* Will ask the user to sign in if they aren't already
	* [Example](https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4)
* **"Local reviews" URL**
	* Format: `https://search.google.com/local/reviews?placeid={googlePlaceId}`
	* Requires the Google Place ID to be known
	* Does not require login, but brings up a separate popup
	* [Example](https://search.google.com/local/reviews?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4)

## URLs using CID
Opening up a location directly in Google Maps and Google Search is possible if you know the "CID" (also known as "ludocid") of the location. You can get this through the `url` field in the Google Places details API endpoint.

* **Maps CID URL**
	* Format: `https://maps.google.com/?cid={cid}`
	* Requires the CID to be known
	* Will open in the Maps app on mobile if installed
	* [Example](https://maps.google.com/?cid=10281119596374313554)
* **Google Search CID URL**
	* Format: `https://local.google.com/place?id={cid}&use=srp`
	* Requires the CID to be known
	* Only URL that opens the location in Google Search without popups
	* [Example](https://local.google.com/place?id=10281119596374313554&use=srp)


## Helpful tools

* [Brightlocal Review Link Generator](https://www.brightlocal.com/free-local-seo-tools/google-id-and-review-link-generator)