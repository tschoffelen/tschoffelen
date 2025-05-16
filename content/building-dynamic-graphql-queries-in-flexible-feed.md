---
title: Building Dynamic GraphQL Queries in Flexible Feed
date: 2025-05-16
description: Flexible Feed is a small Shopify app I built a few years ago. It helps merchants create XML and CSV feeds to use with Google Shopping and other...
taxonomies:
  category:
    - Blog
extra: {}
---

[Flexible Feed](https://apps.shopify.com/inventory-feed) is a small Shopify app I built a few years ago. It helps merchants create XML and CSV feeds to use with Google Shopping and other similar platforms.

At the core of it is this simple feed attribute mapping UI:

<img src="https://mirri.link/17kvWpT" alt="Image" />

Here, you can configure what fields are available in the feed, and where the data for this field should be pulled from.

Even though it looks pretty minimal - there's a lot of stuff happening behind the scenes here! The 'Shopify value' field accepts almost any Javascript expression, allowing you to build really complicated constructions, with `if` statements, concatenating fields, and anything else you can do in a programming language.

## Determining what fields we need
Somehow, from this JS expression, we need to get to a GraphQL query we can run against Shopify's [`productVariants`](https://shopify.dev/docs/api/admin-graphql/latest/queries/productVariants) edge.

To do so, we first parse each JavaScript expression into an AST (abstract syntax tree), using the wonderful [`acorn`](https://github.com/acornjs/acorn) package. This allows us to extract all the identifiers used in the expression:

```ts
import * as acorn from "acorn";
import * as walk from "acorn-walk";

// Get all identifiers in a JS expression string
const getIdentifiers = (expression: string) => {
	const identifiers = new Set<string>();

	walk.ancestor(
		acorn.parse(expression, { ecmaVersion: 2020, }),
		{
			Identifier(node) {
				identifiers.add(node.name);
			},
			MemberExpression(node, s, ancestors) {
				if (!node.property) return;
				// simplified slightly for brevity
				identifiers.add(node.property.name);
			}
		}
	);

	return Array.from(identifiers);
}
```

For an expression like `inventoryLevel.available > 2 ? "in stock" : "low stock"`, this results in a list of identifiers that looks like `["inventoryLevel", "inventoryLevel.available"]`.

We only need the lowest level identifiers, so a little `filter` can be used to end up only with `["inventoryLevel.available"]` in the example above:

```ts
// Filter out all identifiers that have common ancestors
const filteredIdentifiers = identifiers.filter(
	(identifier) =>
		identifiers.some((other) => other.startsWith(identifier + ".")
	)
);
```


## Generating GraphQL queries
Once we have the identifiers used in each of the field mapping expressions, we can start turning this into a GraphQL query that includes certain fields based on which identifiers are needed.

Building complex GraphQL queries by hand is difficult, especially if they need to be mostly dynamic. The package [`json-to-graphql-query`](https://www.npmjs.com/package/json-to-graphql-query) is really handy to get around this (and a godsend for people like me that never fully got to grips with the GraphQL syntax to begin with).

By looping through the identifiers, splitting at each dot, and going a level deeper each time), we can slowly build a JSON-style GraphQL query:

```ts
// Our base query (massively shortened)
const jsonQuery = {
	productVariants: {
		__args: {
			first: 100,
		},
		edges: {
			node: {
				id: true
			}
		}
	}
};

// Loop through each identifier, and add it to the query
for (const identifier of filteredIdentifiers) {
	const parts = identifier.split(".");
	
	let current = jsonQuery.productVariants.edges.node;
	for (const [index, part] of Object.entries(parts)) {
		const isLastPart = Number(index) === parts.length - 1;
		
		if (!isLastPart) {
			current[part] = {};
			current = current[part];
		} else {
			current[part] = true;
		}
	}
}
```

I've omitted all the very complicated and ugly field mapping code here, mapping alternative names for fields (this app was originally built based on the Shopify Admin REST API), and a lot of shortcuts (e.g. `inventoryLevel` from above is available at `edges.node.inventoryItem.inventoryLevel.nodes.item` in reality).

Once we have a JSON object where every field we want included in the query is defined as a key with value `true`, we can then easily convert it into a GraphQL string:

```ts
import { jsonToGraphQLQuery } from "json-to-graphql-query";

const query = jsonToGraphQLQuery({ query: jsonQuery });
```


## Fetching data and mapping fields
Now all that's left is to run the query, paginate through all of the results, and then call our user-inputted JS expressions with the resulting data to get the eventual feed output.

To make sure we can run user-defined code safely, we use a very locked down AWS Lambda environment, and a package called [`SandboxJS`](https://github.com/nyariv/SandboxJS), which runs the code in an environment that only has access to certain JS built-ins, and the data we pass into it, which looks something like this:

```ts
import Sandbox from "@nyariv/sandboxjs";

const sandbox = new Sandbox();

const code = `return ${mapping.shopifyField};`;
const expression = sandbox.compile(code);

const result = expression.run(productVariant);
```

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>