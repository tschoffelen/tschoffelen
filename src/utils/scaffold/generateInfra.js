import { generateSentry } from "./generateSentry";

export const generateInfra = (root, options, sls, packageJson) => {
  const { extensions, domain } = options;
  const src = root.folder("src");
  const infra = src.folder("infrastructure");

  // Webpack
  if (extensions.includes("webpack")) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...(extensions.includes("jest")
        ? {
            "@babel/core": "^7.12.3",
            "@babel/preset-env": "^7.12.1",
            "babel-jest": "^26.6.3",
          }
        : {}),
      "serverless-webpack": "^5.3.5",
      webpack: "^5.4.0",
    };
    sls.plugins.push("serverless-webpack");
    sls.custom.webpack = {
      webpackConfig: "webpack.config.js",
      packager: "yarn",
      includeModules: {
        packagePath: "package.json",
        forceExclude: ["aws-sdk"],
      },
    };
    root.file(
      "webpack.config.js",
      `const slsw = require('serverless-webpack');

module.exports = {
  target: 'node',
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  node: false,
  optimization: {
    minimize: false
  },
  externals: ['aws-sdk']
};
`
    );
  }

  if (extensions.includes("dynamodb")) {
    sls.resources.push(`$\{file(./src/infrastructure/database/table.yml)}`);
    sls.provider.iamRoleStatements.push({
      Effect: "Allow",
      Action: ["dynamodb:*"],
      Resource: [
        "*", // TODO: make this more specific
      ],
    });
    packageJson.dependencies["aws-sdk"] = "^2.786.0";
    packageJson.dependencies["uuid"] = "^8.3.1";
    src.folder("lib").file(
      "database.js",
      `import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

export const tableName = process.env.TABLE_NAME;
export const dynamo = new AWS.DynamoDB.DocumentClient();

export const date = () => new Date().toISOString();
export const time = (date = null) => Math.floor((date || new Date()).valueOf() / 1000);

export { uuid };
`
    );
    sls.provider.environment.TABLE_NAME = `$\{self:service}-$\{self:custom.stage}`;
    infra.folder("database").file(
      "table.yml",
      `Resources:
  Table:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: $\{self:service}-$\{self:custom.stage}
      AttributeDefinitions:
        - AttributeName: pk
          AttributeType: S
        - AttributeName: sk
          AttributeType: S
        - AttributeName: type
          AttributeType: S
      BillingMode: PAY_PER_REQUEST
      KeySchema:
        - AttributeName: pk
          KeyType: HASH
        - AttributeName: sk
          KeyType: RANGE
      TimeToLiveSpecification:
        AttributeName: expiresAt
        Enabled: true
      GlobalSecondaryIndexes:
        - IndexName: type-sk
          KeySchema:
            - AttributeName: type
              KeyType: HASH
            - AttributeName: sk
              KeyType: RANGE
          Projection:
            ProjectionType: ALL
`
    );
  }

  if (extensions.includes("sentry")) {
    src.folder("lib").file("sentry.js", generateSentry());
  }

  if (extensions.includes("cognito")) {
    sls.resources.push(`$\{file(./src/infrastructure/users/user-pool.yml)}`);
    sls.resources.push(
      `$\{file(./src/infrastructure/users/user-pool-client.yml)}`
    );
    sls.resources.push(
      `$\{file(./src/infrastructure/users/user-pool-domain.yml)}`
    );
    sls.custom.callbackUrl = {
      default: `https://${domain || "my-domain.com"}`,
      local: "http://localhost:3000",
    };
    const cognito = infra.folder("users");
    cognito.file(
      "user-pool.yml",
      `Resources:
  UserPool:
    Type: "AWS::Cognito::UserPool"
    Properties:
      UserPoolName: $\{self:service}-$\{self:custom.stage}
      AutoVerifiedAttributes:
        - email
      UsernameAttributes:
        - email
      Schema:
        - Name: name
          AttributeDataType: String
          Mutable: true
          Required: true
        - Name: email
          AttributeDataType: String
          Mutable: false
          Required: true
        # - Name: myattribute
        #   AttributeDataType: String
        #   Mutable: false
        #   Required: false
`
    );
    cognito.file(
      "user-pool-client.yml",
      `Resources:
  UserPoolClient:
    Type: AWS::Cognito::UserPoolClient
    Properties:
      ClientName: $\{self:service}-$\{self:custom.stage}
      AllowedOAuthFlowsUserPoolClient: true
      UserPoolId: !Ref UserPool
      SupportedIdentityProviders:
        - COGNITO
      AllowedOAuthFlows:
        - code
      AllowedOAuthScopes:
        - email
        - openid
        - profile
      ReadAttributes:
        - name
        - email
        - email_verified
        # - 'custom:myattribute'
      WriteAttributes:
        - name
        - email
      ExplicitAuthFlows:
        - ALLOW_REFRESH_TOKEN_AUTH
        - ALLOW_USER_SRP_AUTH
      CallbackURLs:
        - $\{self:custom.callbackUrl.$\{self:custom.stage}, self:custom.callbackUrl.default}
      LogoutURLs:
        - $\{self:custom.callbackUrl.$\{self:custom.stage}, self:custom.callbackUrl.default}
`
    );
    cognito.file(
      "user-pool-domain.yml",
      `Resources:
  HostedUi:
    Type: AWS::Cognito::UserPoolDomain
    Properties:
      Domain: $\{self:service}-$\{self:custom.stage}
      UserPoolId: !Ref UserPool
`
    );
  }

  src.folder("lib").file(
    "output.js",
    `export const success = (data, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify({
      data
    })
  };
};

export const error = (message, statusCode = 400) => {
  return {
    statusCode,
    body: JSON.stringify({
      error: message
    })
  };
};
`
  );
};
