---
title: Creating a Production-Ready Public API Using Serverless
date: '{"date":"2023-01-01T00:00:00.000Z"}'
description: How to build an API using Lambda and API Gateway for use by external developers.
taxonomies:
  category:
    - Blog
extra: {}

---



I've been working with serverless tech like AWS Lambda and AWS API Gateway for quite a while now, but only recently was the first time I built an API using those technologies that was meant for public consumption, rather than just internally by my own front-ends.

I love the process of putting myself in the shoes of an external developer and thinking about how to make the API as easy to use as possible, with clear route names and error codes.

Here are some of the main things to consider when building your API using AWS serverless tools:

## REST or HTTP API?

API Gateway lets you choose between two different types of APIs: REST or HTTP.

These have quite a few differences. The full comparison can be found in [the AWS documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html). Here's a quick summary:

- REST APIs: the older generation. This has a lot more options for customisation, like custom response mapping for built-in gateway errors, built in API key management, caching, and advanced throttling. In the Serverless framework, this is available under the name `http`.
- HTTP APIs: newer generation. Much simpler in terms of built-in features, but cheaper. This is the default option for most of the APIs I build, but depending on your requirements you might decide to go for REST APIs instead. Serverless framework name: `httpApi`.

## Consistent error messages

For a public-facing API, having consistent error messages is important. It might also mean you need to respond with errors in a slightly more structured way than you do for internal APIs.

Where for an internal API something like this might be sufficient:

```json
{
	"error": "Invalid document visibility setting."
}
```

For an external-facing API, you might want to also return an error code, which will allow your clients to map these to their own error messages, and return any relevant links to help developers. The [JSON API specification](https://jsonapi.org/format/#error-objects) has a nice structure for this, which roughly looks like this:

```json
{
	"errors": [
		{
			"code": "InvalidVisibility",
			"status": 400,
			"title": "Invalid document visibility setting.",
			"source": {
				"pointer": "/data/attributes/visiblity",
			},
			"links": [
				{
					"href": "https://docs.myapi.com/...",
					"about": "API Docs: Document visibility"
			],
		}
	]
}
```

This seems like a lot more work, but doing some up-front work to create a file with error definitions and creating some middleware to automatically convert thrown `Error` objects into a response like this makes it easy as you continue to develop your API.

Tools like [Laconia's API Gateway error mapping](https://laconiajs.io/docs/api/adapter-api) can help with this.

Don't forget about default responses from API Gateway - things like 404s or authorisation failures. To modify those, you will have to use REST APIs rather than HTTP APIs, as those don't allow you to edit those. For REST APIs, you can [add these as custom Cloudformation resources](https://stackoverflow.com/a/66486792/1129689) in your `serverless.yml`.

## Lambda warming

To ensure your API has a consistent response time, it might be useful to keep your lambdas warm, to avoid the dreaded cold start. This is becoming less and less of a problem as the platform keeps getting faster cold start times, but it's still noticeable, especially when using some of the slower Lambda runtimes, like Java or dotnet.

For the serverless framework, there is a handy [warmup plugin](https://github.com/juanjoDiaz/serverless-plugin-warmup).

You can use it like this in your `serverless.yml`:

```yaml
plugins:
    - serverless-plugin-warmup

custom:
    warmup:
        default:
            enabled: production
            events:
                - schedule: "cron(0/12 8-17 ? * MON-FRI *)"
```

## Throttling

Both versions of API Gateway offer options for throttling, and employ some default account-wide throttling settings. Throttling in API Gateway uses the [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket). Without requesting increases, this is a rate limit of 10,000 requests per second, with a burst limit of 5,000 RPS.

Clients will receive a `429 Too Many Requests` error response if this limit is crossed.

It's also possible to set a API-specific or even route-specific limit. This can be done through the console, or by using a [serverless throttling plugin](https://www.serverless.com/plugins/serverless-api-gateway-throttling).

## CORS

By default, CORS is not enabled for API Gateway routes. This is a great default, as it makes it harder for attackers to misuse your internal APIs, but depending on your needs (e.g. external developers using your API from their front-ends), you might need to enable this.

When using the REST API, this requires [some configuration in API Gateway](https://www.serverless.com/framework/docs/providers/aws/events/apigateway#enabling-cors) and sending along the correct headers.

With the HTTP API, it should be sufficient to set the `cors` property in your `serverless.yml`:

```yaml
provider:
    httpApi:
        cors: true
```

## Testing and monitoring

Think about how you want to test your API. Ideally, it should be impossible to deploy to production without running tests. A good approach here is to, beyond simple unit tests, also add end-to-end tests.

Thanks to how easy it is to deploy a copy of a serverless API to a new stage, a good practice here is to deploy to a test stage from your CI, and then run end-to-end tests on this 'live' version of your API rather than just testing a local instance.

In your CI (like GitHub Actions), you could do something like:

```shell
yarn serverless deploy --stage ci-testing
yarn jest e2e
```

With a separate set of end-to-end tests with `e2e` in the file name if you're using something like `jest`.

Last but not least, you want to have proper monitoring in place. AWS has some tools in place, but I prefer a full tracing solution like [Lumigo](https://lumigo.io).


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>