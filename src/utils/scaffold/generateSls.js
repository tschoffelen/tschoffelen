export const generateSls = ({
  extensions,
  functions,
  name,
  domain,
  cert,
  sentryDsn,
}) => {
  const compiledFunctions = functions.map((func) => {
    const name = func.name.replace(/\//g, "-").toLowerCase().trim();
    const path = func.name.toLowerCase().trim();
    return {
      name,
      path,
      sls: {
        [name]: {
          handler: `src/functions/${path}/handler.handler`,
          events: func.triggers.map((event) => {
            switch (event.type) {
              case "httpGet":
              case "httpPost":
              case "httpPut":
              case "httpDelete":
              case "httpAny":
                return {
                  httpApi: {
                    path: event.path,
                    method: event.type.substring(4).toLowerCase(),
                  },
                };
              case "scheduleRate":
                return {
                  schedule: `rate(${event.rate})`,
                };
              case "scheduleCron":
                return {
                  schedule: `cron(${event.cron})`,
                };
              case "s3ObjectCreated":
                return {
                  s3: {
                    bucket: event.bucket,
                    event: "s3:ObjectCreated:*",
                    existing: true,
                  },
                };
              case "eventBridgeBus":
                return {
                  eventBridge: {
                    eventBus: event.bus || "default",
                  },
                };
              case "eventBridgeSource":
                return {
                  eventBridge: {
                    pattern: {
                      source: [event.source],
                    },
                  },
                };
              default:
                return null;
            }
          }),
        },
      },
    };
  });
  const slsObject = {
    service: name,
    plugins: ["serverless-offline"],
    custom: {
      stage: `\${opt:stage, 'local'}`,
      region: `\${opt:region, 'eu-west-1'}`,
    },
    package: {
      individually: true,
    },
    provider: {
      name: "aws",
      runtime: "nodejs10.x",
      timeout: 25,
      region: `\${self:custom.region}`,
      stage: `\${self:custom.stage}`,
      environment: {
        SERVICE: `\${self:service}`,
        STAGE: `\${self:custom.stage}`,
        REGION: `\${self:custom.region}`,
        NODE_ENV: `\${self:custom.stage}`,
      },
      iamRoleStatements: [],
    },
    functions: compiledFunctions.map(
      (func) => `\${file(./src/functions/${func.path}/function.yml)}`
    ),
    resources: [],
  };

  const packageJson = {
    name: name,
    version: "1.0.0",
    license: "proprietary",
    private: true,
    scripts: {
      start: "serverless offline",
      deploy: "serverless deploy",
    },
    dependencies: {},
    devDependencies: {
      serverless: "^2.8.0",
      "serverless-offline": "^6.8.0",
    },
  };

  extensions.forEach((ext) => {
    switch (ext) {
      case "jest":
        packageJson.devDependencies.jest = "^26.6.1";
        packageJson.scripts.test = "jest";
        break;
      case "serverless-prune-plugin":
        packageJson.devDependencies["serverless-prune-plugin"] = "^1.4.1";
        slsObject.plugins.push("serverless-prune-plugin");
        slsObject.custom.prune = {
          automatic: true,
          number: 20,
        };
        break;
      case "serverless-esbuild":
        packageJson.devDependencies["serverless-esbuild"] = "^1.4.0";
        slsObject.plugins.push("serverless-esbuild");
        slsObject.custom.esbuild = {
          packager: "yarn",
        };
        slsObject.package = {
          individually: true,
        };
        break;
      case "serverless-domain-manager":
        packageJson.devDependencies["serverless-domain-manager"] = "^5.0.0";
        slsObject.plugins.push("serverless-domain-manager");
        slsObject.custom.customDomain = {
          domainName: domain,
          stage: "production",
          certificateName: cert || domain,
          createRoute53Record: true,
          endpointType: "edge",
          autoDomain: true,
        };
        break;
      case "serverless-dotenv-plugin":
        packageJson.devDependencies["serverless-dotenv-plugin"] = "^3.1.0";
        slsObject.plugins.push("serverless-dotenv-plugin");
        break;
      case "sentry":
        packageJson.devDependencies["@sentry/serverless"] = "^5.27.1";
        slsObject.provider.environment.SENTRY_DSN = sentryDsn;
        break;
      default:
        break;
    }
  });

  console.log({ slsObject, compiledFunctions, packageJson });
  return { sls: slsObject, compiledFunctions, packageJson };
};
