---
title: Using Worker Threads in Node.js
date: 2026-02-15
description: I had a use case recently where I was building a custom framework for managing background jobs. It needed to be possible for the user to cancel a...
taxonomies:
  category:
    - Reference
extra: {}
---


I had a use case recently where I was building a custom framework for managing background jobs. It needed to be possible for the user to cancel a long-running background job, which should cancel its execution.

In Node, that's actually pretty hard to do. If you have a bunch of promises running that are doing things like HTTP requests, there are only very minimal options available to cancel these.

The 'official' one would be to create an [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and pass this along to the job, and make sure that every HTTP request uses it. Given the fact that there's a lot of third-party SDK calls in my background jobs, this was unfeasible.

What is one other sure-fire way to stop a JS process from continuing to run? `process.exit()` works, but obviously you don't want to kill the entire server, so that option is excluded as well.

Unless... the job runs in a separate process. You could so something like this:

```ts
import { spawn } from "node:child_process";

const child = spawn("node", "./background-task.js");
child.stdout.on('data', () => /* ... */);
child.stderr.on('data', () => /* ... */);
child.on('close', (exitCode) => /* ... */);
```

However, there's an even easier way: [worker threads](https://nodejs.org/api/worker_threads.html#new-workerfilename-options)!

Worker threads are similar to child processes, but they can share memory and communicate with each other. They also have a very cool system to share data:

```ts
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

if (isMainThread) {
	// We're in the main thread, so let's create a worker:
	const worker = new Worker(import.meta.url, {
		workerData: { hello: "world" }
	});
	worker.on("message", (message) => {
		if (message.error) {
			console.error("worker error:", message.error);
		}
	});
	worker.on("exit", (code) => {
		console.log("worker exited with code", code);
	});

} else {
	// We are a worker:
	const data = workerData;
	
	// Check for cancellation and exit early if needed:
	setInterval(() => {
		if(checkJobWasCancelled()) {
			process.exit(130); // unique exit code to mark user cancellation
		}
	}, 1000);
	
	// Run the actual worker job:
	try {
		await doSomething(data);
	} catch (e) {
		// On error, post back a message to the parent with
		// error info, then end thread
		parentPort.postMessage({ error: e.message });
		process.exit(1);
	}
}
```

The cool thing about this system is that you can have a single file that both acts as the worker as well as the worker orchestrator. This helps with bundling through ESBuild or similar, where you might not know the path at which your worker code ends up.

I successfully used this in AWS Lambda to cancel my background jobs, without triggering a failed Lambda invocation every time I exited the process early.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>