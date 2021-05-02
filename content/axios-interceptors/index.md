---
title: Interceptors in Axios
date: 2021-04-05
category: Engineering
---

Interceptors in [Axios](https://github.com/axios/axios#interceptors) are a great tool to simplify your management of network requests.

Some examples of how you can use them:

## Debugging

Sure, in web browsers we have developer tools with a 'Network' tab that shows us all of the HTTP requests that take place. When building in React Native, you're not always as fortunate. There's tools to work around that, but for simple debugging I like to use this bit of code:

```js
axios.interceptors.request.use((request) => {
  // Request started
  console.log(`[API] Started ${request.method} ${request.url}`);
  return request;
});

axios.interceptors.response.use(
  (response) => {
    // Success response
    console.log(`[API] Got ${response.status} for ${response.request._url}`);
    return response;
  },
  ({ response }) => {
    // Error response
    console.log(`[API] Got ${response.status} for ${response.request._url}`);
    return response;
  }
);
```

This will log any requests started, as well as the status codes for the responses.

## Authentication

I usually like to use `axios.create()` to create a mini API client, and then use interceptors to supply authentication:

```js
export const api = axios.create({
  baseURL: "https://my-api.io/v1/",
});

api.interceptors.request.use((config) => {
  config.headers["x-access-token"] = store.getState().auth.token;
  return config;
});
```

Of course, if your authentication token isn't going to change throughout the lifetime of that `api` constant, it's much easier to add it directly into the headers of the `axios.create()` call:

```js
export const api = axios.create({
  baseURL: "https://my-api.io/v1/",
  headers: {
    "x-access-token": store.getState().auth.token, // only called once
  },
});
```
