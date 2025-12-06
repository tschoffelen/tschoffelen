---
title: Microservice Forensics 101
date: 2018-06-19
description: Recently we were brought in by a customer to investigate a problem with their microservices architecture where specific transactions weren’t yielding...
taxonomies:
  category:
    - Blog
extra: {}
---


Recently we were brought in by a customer to investigate a problem with their microservices architecture where specific transactions weren’t yielding the expected results. Since some of their microservices heavily rely on one another, it wasn’t immediately clear which one of them was the one misbehaving.

After a few days of combing through their code, we finally found the culprit. These are some of the lessons we learned while debugging.

## 1. Run it locally

With a microservices infrastructure where at least a dozen docker containers are required to debug a specific part of a transaction, you might be inclined to delay setting up a local development environment as long as possible. Sure, it’s a hassle, but being able to make changes directly in the code and SSH’ing directly into boxes to debug and see logs makes it so much easier to actually reproduce a transaction in a way that lets you find the root cause of the problem. In the end, it’s much faster than only poking around in production logs and going through code.

## 2. One service at a time

Don’t try to understand what the full lifecycle of a transaction is through the myriad of API calls that connect microservices to each other. Instead, go for a one-by-one approach. Understand what a certain service does with your input data, look at the logs for that one service when you replay the transaction, verify the output contains what you would expect it to contain, and move on to the next service.

In cases where microservices don’t talk directly to each other but use message busses or queues, make sure to shut down the consumer service so that you have time to inspect the messages being put into the queue before they are being processed. That goes more or less back to the first point, since you probably shouldn’t be shutting down services in the production environment 🙃.

## 3. Have a central place for logs

Having multiple places where production services send their log files is not only really annoying, but might also make it very hard to get a full picture of what happened to a certain transaction in the different stages of it being processed.

Also, save logs of all severities. Nothing is more painful than realising you’re missing an important part of the puzzle because you didn’t save verbose/debug logs. Or, better yet: build a mechanism to temporarily enable debug-level logs for all production services when necessary.

## 4. Follow the code

It is really easy to be led astray by confusing or vague log messages. Make sure you understand what code gets executed when you send a certain request to a service, and only then run it and explore the logs. That way you know exactly what to look out for, as well as where potential pain points in the code might be located.

## 5. Write tests

When you finally have found the cause of your issue, don’t just patch it and go on with your life, but write a few unit or integration tests to make sure that if someone else breaks the same thing again, they won’t have to waste as many hours as you just did on finding out what they did wrong.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>