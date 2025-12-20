---
title: Implementing the Repository Model with DynamoDB and Turbine
date: 2025-12-17
description: Creating the right level of abstraction for data storage to prevent future headaches.
taxonomies:
  category:
    - Reference
extra: {}
---


When you're building a new product at a small startup, speed and flexibility are of the essence. It's important to recognise which architectural patterns make sense, and which ones should be reserved until you have a better understand of the product you're building.

## Introducing the Repository pattern
One pattern that I found is essential to implement from the start is the **Repository pattern** from Domain-Driven Development (DDD). This pattern states that you should keep your data access layer and data storage layers separate:

<img src="https://mirri.link/2rCPegoEr" alt="Image" />

What does this look like in practice? Let's say we have a HTTP endpoint that returns a list of users:

```js
app.get("/users", async (req, res) => {
	const { Items } = await dynamodbClient.query({
		Table: "users-production",
		Index: "type-org",
		KeyConditionExpression: "type = 'user' AND org = :org",
		ExpressionAttributeValues: {
			":org": req.orgId
		},
		Limit: 10
	});
	
	return res.json(Items.map(/* ... */));
});
```

That works, but at some point in the development of your app, you might realise that since user data is highly relational, you might want to switch to using a SQL-based database to store them. 

Or maybe you simply want to switch the database structure and the access pattern for this data.

Either of these things would be a show-stopping amount of work if you don't abstract data access from the start!

*Side note: you might be thinking "But hey, I don't access my database directly, I already use some query library to access it. That's an abstraction, right?" – it is, but it usually is quite a **leaky abstraction**, in the sense that these libraries often expose APIs specific to the database you're using. You might still want to use a separate Repository layer in addition in such cases.*

## What a good repository looks like
Ideally, you want to have the above code look more like this:

```js
app.get("/users", async (req, res) => {
	const users = await Users.listByOrg(req.orgId, { limit: 10 });
	
	return res.json(users);
});
```

This is so much nicer! And now you'd only have to update the once place when you need to switch up your data storage model or engine.

A few rules:

- Repositories should not leak any specifics about the underlying data storage.
- Repository methods should be specific and fulfil use cases related to entities, not related to data storage patterns.
- Repositories should contain as little business logic as possible.

An example signature of our entire users repository might look like this:

```js
export class Users {
	public static listAll();
	public static listByOrg(orgId: string);
	public static getById(id: string);
	public static getByEmail(email: string);

	public static updateAvatar(id: string, url: string);
	public static updateBio(id: string, bio: string);

	public static delete(id: string);	
}
```

## DynamoDB and Turbine
My favourite database to start most new products with is DynamoDB – it's virtually infinitely scalable, I don't have to think about hosting, it's robust, supports event-based triggers using [DynamoDB stream](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html) and in most cases doesn't require complex migration setups to get started with.

The DynamoDB SDK itself is a bit verbose though, and if you had to write all of the repository methods using direct calls, your class file would get very long very quickly, especially when it comes to data validation and schemas.

I use **[Turbine](https://github.com/tschoffelen/turbine)**, a simple layer on top of DynamoDB to streamline these calls and validation logic. It introduces the concept of multiple types of entities, ideal for [single-table design](https://aws.amazon.com/blogs/compute/creating-a-single-table-design-with-amazon-dynamodb/). There's many like it, but this one is mine 😁.

To get started with it, we create a shared `table.ts` file, which specifies how Turbine should connect to the DynamoDB table:

```js
import { defineTable } from "dynamodb-turbine";

export const table = defineTable({
	name: "my-table-production", // usually a environment var!
	indexes: {
		table: {
			hashKey: "pk",
			rangeKey: "sk"
		},
		"type-org": {
			hashKey: "type",
			rangeKey: "org"
		}
	}
});
```

We then define our entities, each in a separate file. Take this `user-entity.ts` file:

```js
import { defineEntity, Entity } from "dynamodb-turbine";
import { table } from "./table";
import z from "zod";

// We define the entity, but we should only interact with
// it through the Users repository class methods.
export const userEntity = defineEntity({
	table,
	schema: z.object({
		id: z.string(),
		orgId: z.string(),
		name: z.string(),
		bio: z.string().optional(),
		avatarUrl: z.url().optional(),
		createdAt: z.iso.datetime(),
		updatedAt: z.iso.datetime()
	}),
	keys: {
		type: () => "User",
		pk: (entity) => `org#${entity.orgId}`,
		sk: (entity) => `user#${entity.id}`,
		createdAt: (entity) => entity.createdAt || new Date().toISOString(),
		updatedAt: (entity) => new Date().toISOString()
	},
});
```

The great thing about this is that you can also export the type for `User`, as defined in the schema, for easy TypeScript type checking:

```js
import { type Instance } from "dynamodb-turbine";

export type User = Instance<typeof userEntity>;
```

Now we can implement our actual `Users` repository:

```js
export class Users {
	public static async listByOrg(orgId: string): Promise<User[]> {
		return entity.queryAll(
			{
				index: "type-org",
				type: "user",
				org: orgId
			},
			{
				filters: {
					deletedAt: { notExists: true },
				}
			}
		);
	}
	
	// ...
	
	public static async delete(userId: string) {
		const user = entity.queryOne({
			pk: `user#${userId}`
		}, {
			filters: {
				deletedAt: { notExists: true }
			}
		});
		
		if(!user) throw new Error('User does not exist.');
		
		await user.update({
			deletedAt: new Date().toISOString()
		});
	}
}
```

This class is the only thing the rest of our codebase interacts with when it needs to access user information.

Notice how this pattern makes it easy to abstract away the fact that we're doing soft deletes in the database! The code calling `Users.listByOrg()` doesn't need to be aware of that fact, or anything else about how users are stored in the database.



<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>