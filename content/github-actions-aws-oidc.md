---
title: Setting up GitHub Actions to have access to your AWS account
description: GitHub Actions is the best CI/CD provider I've used so far. It is
  extremely flexible, and has really quickly caught up in terms of feature set
  with CI providers that existed for years before Actions was...
date: 2023-05-28T18:11:10.205Z
taxonomies:
  category:
    - Reference
extra: {}
---
GitHub Actions is the best CI/CD provider I've used so far. It is extremely flexible, and has really quickly caught up in terms of feature set with CI providers that existed for years before Actions was launched.

One of its great features is being able to set up OIDC AWS access, without having to manually create credentials and risk them leaking.

GitHub has [documentation on this here](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services), but since I always have trouble setting it up, here is a quick recap to help future me:

## 1. Add Identity Provider

You can do this either in the AWS console:
1. Go to [IAM → Identity Providers](https://us-east-1.console.aws.amazon.com/iamv2/home#/identity_providers)
2. Click **Add Provider**, choose **OpenID Connect**
3. Enter Provider URL: `https://token.actions.githubusercontent.com` and click **Get thumbprint**.
3. Add audience `sts.amazonaws.com` and save.

Or using a CloudFormation template:

```yml
GithubOidc:
   Type: AWS::IAM::OIDCProvider
   Condition: CreateOIDCProvider
   Properties:
      Url: [https://token.actions.githubusercontent.com](https://token.actions.githubusercontent.com/)
      ClientIdList: 
         - sts.amazonaws.com
      ThumbprintList:
         - 6938fd4d98bab03faadb97b34396831e3780aea1
```

([link here](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/create?templateURL=https://schof-link-files.s3-eu-west-1.amazonaws.com/JS7ZXNA) to launch this in the CloudFormation console)

## 2. Create IAM role

Set up an IAM role with the permissions you need, and a trust policy like this:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::{AWS_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": "repo:{REPO_NAME}:*"
                },
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
                }
            }
        }
    ]
}
```

Make sure to replace `{AWS_ACCOUNT_ID}` with the target AWS account ID (9 digit number), and `{REPO_NAME}` with the full repo name, like `tschoffelen/example-repo`.

## 3. Set up workflow

Your resulting workflow YAML will look something like this:

```yml
name: Deploy
on: [push]

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: yarn
      - uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: {ROLE_ARN}
          aws-region: eu-west-1
      - run: yarn
      - run: yarn deploy
```

Two things to note here:

* Paste the role ARN from the IAM role you created.
* **Don't forget the `permissions` bit in the workflow!** You need to explicitly allow the workflow to have `id-token` write permissions.