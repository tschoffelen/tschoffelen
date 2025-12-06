---
title: User Impersonation in AWS Cognito
date: 2021-03-17
description: Impersonating users in AWS Cognito (for customer support purposes) is not something that is supported out of the box, but it's possible to implement it.
taxonomies:
  category:
    - Blog
extra: {}
---


<img src="https://mirri.link/hJ_YBXIdc" alt="Image" />

I’ve been using [AWS Cognito](https://aws.amazon.com/cognito/) for quite a few recent projects. It makes a lot of sense to use when you’re building serverless applications on AWS Lambda, just because it’s right there and part of the ecosystem.

I also definitely don’t want to ever build my own authentication systems anymore. Been there, done that, introduced security issues, promised myself to never do it again.

And Cognito is great, especially in combination with the ready-made authentication UI elements from [AWS Amplify](https://docs.amplify.aws/ui/auth/authenticator/q/framework/react). But there are also some sharp edges and missing features that you run into once in a while.

One of them is **impersonation**. What I mean with that is being able to sign into a specific account as an administrator and seeing exactly what a user sees when they would sign in.

It’s something that is super important for being able to provide adequate customer support, but it’s something developers often dread building. And that’s understandable, because it basically means building a backdoor into your well-secured product. You can hang attach a big, beefy lock to that door (e.g. only let users with an administrator role impersonate other users), but it’s a door nonetheless.

It’s understandable then that Cognito doesn’t offer a default way to implement that functionality. If you do feel like you need it, though, there are a few different ways to go:

## Strategy 1: role impersonation using Cognito Groups

This is possibly the safest route to go, as you’re not actually signing in as a specific user, but rather giving the admin user access to the same resources that a specific user has access to. It requires that you use a particular Cognito setup though.

For most of my projects, I heavily rely on Cognito groups to give users access to certain resources. Imagine a product where you can be part of multiple organisations. For each organisation, you could create a Cognito group and assign those groups to the appropriate users that should be part of those organisations:

<img src="https://mirri.link/k5LBxpMSG" alt="Image" />

If you then want to see as an admin user what resources a specific user sees, you could simply add all the appropriate groups to admin user’s account, and they would be able to see more or less the same thing the user sees.

```js
const AWS = require("aws-sdk");  
const cognito = new AWS.CognitoIdentityServiceProvider();

await cognito.adminAddUserToGroup({   
  UserPoolId: "eu-west-1_xxxxx",  
  Username: "60dcb7f4-e059-4a10-b35d-fad125a1f436",   
  GroupName: "org-a"  
}).promise();
```

**Pros:**

- Accountability: admin is still using their own account, so logs will show your their JWT being used to interact with the user’s resources.
- Simplicity: easy to implement in a safe way. You can make sure only users that already belong to an ‘admins’ Cognito group are able to invoke a lambda that assigns these groups.

**Cons:**

- User experience: since it’s not true impersonation (you’re still using your own account), you might still not see the exact same thing the users sees when using their account.
- Cleanup: how do you keep track of what groups to remove and which ones to keep when you are done impersonating a user?

## Strategy 2: custom authentication challenges

Cognito’s custom authentication challenges can be used in a lot of different ways. I’ve shown before how it’s possible to use these to [set up a magic link login system](https://schof.co/cognito-magic-links/).

Similarly, you can set up a challenge that would allow you to circumvent needing to know the user’s email address if a certain condition applies (e.g. if you are able to prove you’re an admin user).

The [**serverless-magic-links-poc**](https://github.com/leanmotherfuckers/serverless-magic-links-poc) code should provide a good starting point for implementing such a solution.

**Pros:**

- Customisability: you can set this up in any way you like, using any type of authentication challenge.

**Cons:**

- Complex to set up and test properly, without disrupting the normal password workflow for users.
- No accountability: there will be no visible difference between the JWTs used by impersonators vs the real user.

## Strategy 3: Pre Token Generation trigger

Cognito has a lambda trigger hook to customize a JWT token based on client metadata sent along in a login request. You could use this to allow admin users to specify what user they want to impersonate in the login request.

Here is what the code for the [Pre-token Generation](https://aws.amazon.com/blogs/mobile/how-to-use-cognito-pre-token-generators-to-customize-claims-in-id-tokens/) trigger could look like:

```js
exports.handler = (event) => {   
   if (!event.request.userAttributes.isAdmin) {  
      // user signing in is not an admin, don't allow them  
      // to impersonate anyone!  
      return event;  
   }
   if (!event.request.clientMetadata.userToImpersonate) {  
      // no user ID to impersonate sent along  
      return event;  
   }
   
   event.response = {  
      "claimsOverrideDetails": {  
         "claimsToAddOrOverride": {  
            "impersonating": {  
               "sub": event.request.clientMetadata.userToImpersonate  
            }  
         }  
      }  
   };
   
   return event;
};
```


The resulting JWT token from a successful login could then look like this:

```js
{  
   "sub": "472ff4cd-9b09-46b5-8680-e8c5d6025d38",  
   "aud": "55pb79dl8gm0i1ho9hdre91r3k",  
   "token_use": "id",  
   "auth_time": 1576816174,  
   "exp": 1576819774,  
   "iat": 1576816174,  
   "iss": "[https://cognito-idp.us-east-1.amazonaws.com/](https://cognito-idp.us-east-1.amazonaws.com/)...",  
   "impersonating": {  
      "sub": "60dcb7f4-e059-4a10-b35d-fad125a1f436"  
   }  
}
```

**Pros:**

- Simple and therefore relatively safe compared to strategy 2. No cleanup needed either.
- Customisability: you determine what the resulting JWT token looks like.
- Accountability: JWT token will contain identity of both the admin user and the impersonated user.

**Cons:**

- Would require custom back-end code to make sure to check for the `impersonating` value and use the `sub` there as the User ID if it exists.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>