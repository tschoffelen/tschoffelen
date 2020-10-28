export const generateSentry = () => `const Sentry = require("@sentry/serverless");
const { SENTRY_DSN, NODE_ENV, STAGE } = process.env;

Sentry.init({
  dsn: SENTRY_DSN,
  environment: STAGE || NODE_ENV,
  tracesSampleRate: 0.2,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true })
  ]
});

module.exports = Sentry.AWSLambda.wrapHandler;
`
