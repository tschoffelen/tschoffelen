---
title: TraceStack - Building an Open-Source Serverless Observability Tool
date: 2025-03-29
description: "Last summer, I started building TraceStack: A serverless observability tool for AWS Lambda."
taxonomies:
  category:
    - Blog
extra: {}
---


Last summer, I started building [TraceStack](https://github.com/includable/trace-stack): A serverless observability tool for AWS Lambda. 

<img src="https://mirri.link/0q5NbUF" alt="Image" />

My goal was to build an open-source self-hosted alternative to [Lumigo](https://lumigo.io) or [New Relic](https://newrelic.com), focusing on tracing Lambda invocations of Javascript functions. I have a lot of small projects I run, where some observability would be nice, but I quickly run into the limits of what free tiers of these hosted platforms provide.

This project was super exciting to work on. I built a slick user interface along with a [self-installer package](https://github.com/includable/trace-stack#getting-started) that makes deployment incredibly easy – just one command and you're up and running.

In the process though, I learned a lot about observability. And I realised some of my assumptions were wrong at the start of this project.

I'll probably not continue working on it any time soon, but I learned a lot!

## Throughput and database choice
[DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) isn't a [OLAP database](https://en.wikipedia.org/wiki/Online_analytical_processing). I already knew that, but it's also the serverless database offering from AWS that I'm the most familiar with, and I love that it fully scales from zero in terms of costs.

I wanted this to be something you could deploy from day one on a side project, without worrying about observability adding to the cost of that project.

And for the most part, I was able to build a table design that didn't require any more flexibility in how I was querying the data than DynamoDB allows. There is some relationality in the data, but it's limited to only a few entities, and very hierarchical:

<img src="https://mirri.link/VZQUqbw" alt="Drawing" />

By pre-computing some fields, and storing some duplicate data (each `Trace` that errored is also stored as a separate `Error` item), I was able to make this work quite performantly in DynamoDB. 

However, what I didn't appreciate, was how much it would cost to store this data. A single function call might have hundreds of spans (a span representing a database or API call), and therefore kilobytes of data – for a single request!

This quickly adds up, and started to be noticeable on the AWS bill for [Street Art Cities](https://streetartcities.com), even though our total Lambda invocation count is relatively low, compared to some of the other projects I work on.

I spent some time on deduplication of data and trimming spans, but quickly entered trade-off territory, where I was choosing between cost optimisation and helpfulness of the trace data.

## OpenTelemetry and wide events
At the same time, I started learning more about [OpenTelemetry](https://opentelemetry.io/docs/concepts/observability-primer/) and the practice of [instrumenting using Wide Events](https://jeremymorrell.dev/blog/a-practitioners-guide-to-wide-events/). 

The more I played around with this principle, and platforms like [Honeycomb](https://www.honeycomb.io), the more I realised that was the way forward for my own observability needs. I started adding OpenTelemetry support to my [serverless-middleware](https://github.com/includable/serverless-middleware?tab=readme-ov-file#opentelemetry-span-enrichment) and thinking in terms of attributes I wanted to add to my events.

This model doesn't work at all with TraceStack, which is built on a DB that doesn't allow querying on arbitrary fields, and uses a proprietary tracing format (I used [Lumigo's open source Node tracer](https://github.com/lumigo-io/lumigo-node) as the basis for the code that is automatically added to each Lambda to trace it).

## If I was starting over
I don't think I'll have space anytime soon to start working on a new version of TraceStack that incorporates some of these ideas, but if I knew what I know now when building it in the first place, I'd probably take a completely different approach:

- Deploy it as a container, rather than Lambda functions and a DynamoDB table. This not only takes away any lambda invocation charges and reduces the linear nature of the cost profile, but also means there's only a single resource added to the target AWS account, so that we don't add a bunch of resources that might conflict with the actual app's infrastructure or confuse developers.
- In that container, I'd probably run an instance of [ClickHouse](https://clickhouse.com). I've been using ClickHouse a bit recently, and really like it as a database for this purpose. It's very good at real-time data ingest, and aggregation across massive amounts of data.

There's also just the question of whether self-hosting observability tools is what you should want as a developer. The worst thing would be to have to debug why your observability tools isn't working whilst trying to solve a real issue. 

But it would be an interesting option as a cheap alternative for small-scale apps and services that can't afford any of the industry standard tools. 

There's some tools that get closer to the approach I described above, like [Zipkin](https://zipkin.io/) and [Jaeger](https://www.jaegertracing.io/), but to my eye, their UIs leave a lot to be desired.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>