---
title: Serverless magic links with AWS Cognito
description: I've written before about what I consider to be best practices for
  magic links from a UX perspective. Recently, I got a chance to apply…
date: 2020-07-27T00:00:00.000Z
taxonomies:
  category:
    - Reference
extra:
  title: Serverless magic links with AWS Cognito
  date: 2020-07-27T00:00:00.000Z
  category: Serverless
---

I've written before about what I consider to be [best practices for magic links](https://uxdesign.cc/user-friendly-magic-links-e39023ec3e2) from a UX perspective. Recently, I got a chance to apply those principles to using magic links with [AWS Cognito](https://aws.amazon.com/cognito/).

Cognito by is heavily focussed on username and password based login by default. Alongside that it offers ways to do 2-factor authentication and OAuth login, but no direct way of using magic links instead of passwords.

That begs the question: is there a way to work around that? Can we make that workaround simple enough to still retain all the advantages of using Cognito in the first place?

## The ingredients

The key in the solution lies in the multi-factor login support Cognito has. This system is built in a flexible manner to not only allow it for use as a second factor, but also as a replacement for a password.

The second important piece of the puzzle is that user accounts in Cognito have attributes. There's a set of default attributes (email, name, phone, etc.), but you can also add your own custom attributes, and configure those to be editable by the user or only by the admin.

## The solution

The combination of those properties of Cognito makes it relatively easy to implement easy to use magic links.

You can find **[the code for my proof-of-concept](https://github.com/leanmotherfuckers/serverless-magic-links-poc)** on Github. It turned out to be really simple: just a few lambdas (mostly to respond to Cognito's hooks) and two calls to Cognito via the AWS Amplify library on the front-end.

## How it works

1. When you click 'Sign in' after entering your email address, the React app performs a `POST /login`.
2. This triggers a lambda that sets a custom user attribute called `authChallenge` with a value in the form of `{authChallenge},{timestamp}` and sends the login link. It will fail if there is no user with that email address defined. `authChallenge` is a random UUID.
3. When the user clicks on the email link (which will have a format of `/sign-in/{email},{authChallenge}`), the Amplify javascript library is used to sign the user in.
4. It will call `signIn(email)` first, followed by `sendCustomChallengeAnswer(authChallenge)`. Upon completion, Amplify automatically stores the resulting JWT in a cookie.
5. It then redirects back to the home route, where the user will now be signed in.

## How safe is it?

You won't be able to get access to a user's account without knowing their email address and having access to their inbox.

Having the `authChallenge` as a random UUID adds enough entropy to make brute-force attacks unlikely, especially in combination with the login throttling that AWS Cognito has as a built-in feature.

Adding an expiry date to the links (30 minutes in this example) means gaining access to old emails won't give attackers access to their accounts.

## How scalable is this?

This does a `AdminUpdateUserAttributes` request on every login. That method has a soft limit of 5 calls per second, which should be sufficient for most user bases, as the chance of more than 5 users signing in at the same second is probably very unlikely unless you have 50k+ active users.

If so, you could ask AWS to raise that soft limit, and you should be good for at least another 250k MAUs. After that, it be time to start looking into something more robust to manage your authentication needs :)

## How can we further improve UX?

- Use a more deterministic method for generating `authChallenge`, so that if the user accidentally sends themselves more than one magic link email in a short period of time, the second send doesn't make the first link invalid. However, introducing determinism might make the system less safe if done incorrectly.
