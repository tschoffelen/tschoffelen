---
title: The power of `.toString()`
description: Using `.toString` on functions in JavaScript is a powerful way to
  create reflection-like behaviours.
date: 2023-06-02T13:44:24.131Z
taxonomies:
  category:
    - Blog
extra: {}
---
I was building this little tool recently that allows me to send text messages with specific slash commands to automate certain things, like `/slack-status` or `/track-hours`.

The way I implemented this is by having an array of available commands in my source code, like so:

```js
const commands = [
	{
		id: "slack-status",
		handler: (text, snooze = false) => {
			// ...
		}
	},
	// ...
];
```

As part of that, I also implemented a `/help` command. Rather than manually updating the text this returns, I wanted a way to automatically list the available functions and the arguments they accepted.

Many compiled languages usually have a set of tools referred to as **Reflection** to accomplish this.

In JavaScript, using `toString()` on a Function is a good alternative, as it will return a stringified version of that function (basically its entire source code):

```js
function hello(name) {
	console.log(`Hello, ${name}`);
}

console.log(hello.toString()); 
// outputs: "function hello(name) { console.log(`Hello, ${name}`); }"
```

Given our commands array above, you can use this to generate a nice list of available commands:

```js
const getFunctionArguments = 
    (fn) => fn.toString()
        .split(')')[0]
        .replace('(', '')
        .split(/\s*,\s*/)
        .filter(Boolean);

console.log('Available commands:');
for (const {id, handler} of commands) {
	const args = getFunctionArguments(handler);
	console.log(`/${id}${args.map(a => ` [${a}]`).join('')}`);
}
```

Given our earlier `commands` array, this would output:

```
Available commands:
/slack-status [text] [snooze = false]
```