---
title: Building a Serverless Search Engine Using Fuse.js
description: Using AWS S3 and Lambda to build a cheap and simple search engine.
date: 2023-12-03T11:23:53.510Z
taxonomies:
  category:
    - Reference
extra: {}
---

One of my side projects that gets considerable traffic finally used up all its free [Algolia](https://www.algolia.com) credits.

I love Algolia because of how easy it is to set up, with great SDKs, both for managing your search index, and its ready-made front-end UI components for React and many other front-end environments.

My use case in this project is really simple though - a data set of about 50,000 items, and only need fuzzy search on a single 'title' field. It currently gets around 100,000 searches per month. This costs around $100 per month, which isn't much, but is relatively much compared to the total hosting costs for this particular project, especially considering it is a secondary functionality.

## Serverless solutions
In looking for alternatives, I looked at AWS OpenSearch Serverless, which despite the name, still isn't a full serverless solution in the same way as Lambda or S3. You pay per unit, where the number of units per hour is dependent on usage. Looking at the costs, it's about triple what I'm currently paying for Algolia. Not an option.

Something that I realised whilst looking at the data set I want to search though, is that it's relatively small. I can easily store it in a single file in S3.

**In which case – why not do that, and then use something like [Lunr](https://lunrjs.com) or [Fuse](https://www.fusejs.io) to do the actual search?**

To start prototyping this and seeing how fast it was, I first updated the way my indexing logic worked:

![Drawing](https://mirri.link/rEfWQjX)

Rather than listening to changes in the DynamoDB stream, I now have a cron that will query all the relevant records on a set interval, format them in a way that makes them usable in my front-ends, and store them as a big JSON file in S3.

This query is very fast, taking about 10 seconds to complete, and the resulting file in S3 is about 14 MB. Big, but fast to download for a Lambda running in the same region.

## The actual search
I chose to go with  [Fuse.js](https://www.fusejs.io) to implement the fuzzy search. A separate Lambda is used to expose a search API endpoint to my frontends, and it does the following:

1. Downloads the latest version of the search index from S3 and caches it outside the handler in memory, so that we only need to download once during the [lifetime of the Lambda container](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html#runtimes-lifecycle).
2. Load the data into Fuse, then run a simple search using the query passed through as the `query` query string parameter from API Gateway.
3. Do some reshuffling of the results and return a neat little array with the top 10 matching items.

The code for that looks something like this:

```js
import { S3 } from "aws-sdk";
import Fuse from "fuse.js";

const s3 = new S3();

const initializeSearchIndex = async () => {
	const { Body } = await s3.getObject({
		Bucket: process.env.SEARCH_INDEX_BUCKET,
		Key: `search-index.json`,
	}).promise();
	const data = JSON.parse(Body.toString());

	return new Fuse(data, { keys: ["title"] });
};

let searchIndex = null; // allows us to cache between invocations

export const handler = async ({ queryStringParameters }) => {
  const { query } = queryStringParameters;
  if (!query) {
	throw new Error('Search query parameter required.');
  }

  if (!searchIndex) {
    searchIndex = await initializeSearchIndex();
  }

  const results = searchIndex.search(query);
  return results.slice(0, 20);
};
```

## End result
The end result is a search that is somewhat slower than Algolia - taking around 200ms per request, rather than the 10ms for Algolia, but this difference is barely noticeable on the front-end.

In terms of costs, the whole solution [costs about $2.71 per month](https://calculator.aws/#/estimate?id=8cf5b5f8f614a20533e9dd0b4856b73de85e04aa) to run, which I would say is quite a good in terms of cost savings for minimal work.

If you have a small dataset you'd like to search over and don't want to spend money on a 'real' search engine, I think using serverless tools in this way is a really great solution.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>