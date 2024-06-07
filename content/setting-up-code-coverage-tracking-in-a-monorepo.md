---
title: Setting Up Code Coverage Tracking in a Monorepo
description: There’s a lot of tools like Codecov to track code coverage. I don’t
  personally like these tools too much for simpler projects, where I just…
date: 2023-07-23T15:40:35.012Z
taxonomies:
  category:
    - Reference
extra: {}
---
There's a lot of tools like [Codecov](https://about.codecov.io) to track [code coverage](https://en.wikipedia.org/wiki/Code_coverage). I don't personally like these tools too much for simpler projects, where I just want an easy way to see how I'm doing coverage wise.

In my monorepo, every package with tests has the following [Jest](https://jestjs.io) setup in `package.json`:

```js
{
	// ...
	"devDependencies": {
		"jest": "^29.6.1"
	},
	"jest": {
		"collectCoverage": true,
		"collectCoverageFrom": [
			"src/**/*.{js,ts}"
		]
	}
}
```

This is sufficient to get Jest to generate coverage reports in the `coverage` directory of each package.

We want to merge these, which can be done with a tool like [istanbul-merge](https://www.npmjs.com/package/istanbul-merge):

```shell
npx istanbul-merge --out .nyc_output/coverage.json **/coverage/coverage-final.json
```

We save these to a directory called `.nyc_output`, so that we can use [Istanbul](https://github.com/istanbuljs/nyc)'s reporting tool to generate text summaries or HTML pages from this:

```shell
npx nyc report --reporter=lcov --reporter=text
```

## Setting up GitHub Actions

We can set this up to automatically post PR comments with a nice coverage summary using [this GitHub Action](https://github.com/marketplace/actions/comment-pull-request) and using [Turborepo](https://turbo.build/repo) to execute the tests for all packages:

```yaml
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  test:
    name: Run unit tests 🧪
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: yarn

      - name: Test
        run: yarn turbo run test --output-logs=new-only --color

      - name: Collect coverage
        run: |
          yarn istanbul-merge --out .nyc_output/coverage.json **/coverage/coverage-final.json
          echo -e "Code coverage summary:\n\n" > summary.txt
          echo '```' >> summary.txt
          yarn nyc report --reporter=lcov --reporter=text | grep -v '^  ' | grep -v '\.\.\.' >> summary.txt
          echo '```' >> summary.txt

      - name: Add PR comment with coverage
        uses: thollander/actions-comment-pull-request@v2
        with:
          filePath: summary.txt
          comment_tag: coverage-summary
```