---
title: Using AI in GitHub Pull Requests
date: 2025-05-16
description: We've been talking for a while about how we can be better at informing the Street Art Cities community about new features and changes to our...
taxonomies:
  category:
    - Blog
extra: {}
---


We've been talking for a while about how we can be better at informing the [Street Art Cities](https://streetartcities.com) community about new features and changes to our platform.

Our main way of sharing this info is [through our forum](https://streetart.community/), but sometimes it's hard to remember to share an update about a small change.

To encourage ourselves to do so, I built a little bot that will automatically create a draft forum post for every GitHub PR that gets opened, with a simple link to continue editing and post it.

<img src="https://mirri.link/sG4kcg8" alt="Image" />

To implement this, I relied on [GitHub Models](https://docs.github.com/en/github-models/prototyping-with-ai-models) and some JavaScript, which gets triggered through a GitHub Actions workflow.

## The script
I'm writing some JavaScript that will be executed by the [`actions/github-script`](https://github.com/actions/github-script) action. It has access to an already authorized version an the GitHub API client, making it very easy to do the API calls we need to do.

First, we get the full details of the Pull Request:

```js
const { data: pullRequest } = await github.rest.pulls.get({
	owner: context.repo.owner,
	repo: context.repo.repo,
	pull_number: context.issue.number,
});
```

We can then use those to form our very rudimentary prompt (shortened slightly for clarity) and run it through the GitHub Models API:

```js
// Build our prompt with the PR data
const prompt = `
You are a GitHub bot that helps developers write forum posts based on their pull request descriptions.
The forum post will be a public announcement of the new feature or change, for a non-technical audience.
The platform this is for is called Street Art Cities, and the forum is located at https://streetart.community.
Use informal, simple and friendly language, and make it sound exciting. Our focus is on community, street art and culture.

The pull request title is: "${pr.data.title}"
The pull request body is: "${pr.data.body || "No description provided."}"

Output a JSON object with the following fields:
- title: The title of the forum post
- body: The body of the forum post, including a short description of the feature or change, and any relevant links or images. You can use Markdown syntax for formatting.
`;

// Do the API call to GPT-4.1
const { data } = await github.request({
	method: "POST",
	url: "https://models.github.ai/inference/chat/completions",
	data: {
		model: "openai/gpt-4.1",
		messages: [
			{
				role: "user",
				content: prompt,
			},
		],
	},
});

// Extract the JSON response
const response = JSON.parse(data.choices[0].message.content);
```

The only thing left is to add our comment to the Pull Request thread:

```js
// Set the content for our body
const commentBody = `
💡 Suggested forum post for this feature update:
	
> **${response.title}**
> ${response.body}
`;

// Get existing comments on the PR
const comments = await github.rest.issues.listComments({
	owner: context.repo.owner,
	repo: context.repo.repo,
	issue_number: context.issue.number,
});

// Check if we already posted a preview URL comment
const existingComment = comments.data.find((comment) =>
	comment.body.includes("Suggested forum post for this feature update:"),
);

// If not, create a new comment, otherwise update the existing one
if (!existingComment) {
	await github.rest.issues.createComment({
		owner: context.repo.owner,
		repo: context.repo.repo,
		issue_number: context.issue.number,
		body: commentBody,
	});
} else {
	await github.rest.issues.updateComment({
		owner: context.repo.owner,
		repo: context.repo.repo,
		comment_id: existingComment.id,
		body: commentBody,
	});
}
```

## Github Actions workflow
To get the script to run at the right moment, with the right creds, we can set up a GitHub Actions workflow that looks like this:

```yaml
name: PR Comment - Forum Suggestion

on:
  pull_request:
    types: [opened, edited]

jobs:
  forum-suggestion:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
      models: read
    steps:
      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            // The JS script from above
```

What I especially love about this method is that there's no need to do anything in terms of configuring API credentials at any point, it's all just built-in!

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>