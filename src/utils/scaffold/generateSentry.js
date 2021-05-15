export const generateSentry =
  () => `import * as Sentry from "@sentry/serverless";
import * as SentryTracing from '@sentry/tracing';
import { error } from "./output";

const { SENTRY_DSN, NODE_ENV, STAGE } = process.env;

SentryTracing.addExtensionMethods();

Sentry.init({
  dsn: SENTRY_DSN,
  environment: STAGE || NODE_ENV,
  tracesSampleRate: 0.2,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true })
  ]
});

export default (handler) => async(...args) => {
  try {
    return await Sentry.AWSLambda.wrapHandler(handler)(...args);
  } catch (e) {
    e.args = args;
    console.error(e);
    return error(e.message || 'Internal server error.', 500);
  }
}
`;
