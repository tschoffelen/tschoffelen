---
title: Processing Incoming Email with AWS SES
description: AWS Simple Email Service is a service I've never been that big of a
  fan of, because it feels like a bit of a black box. Things have…
date: 2023-05-09T00:00:00.000Z
taxonomies:
  category:
    - Blog
extra:
  date: 2023-05-09T00:00:00.000Z
---

AWS [Simple Email Service](https://aws.amazon.com/ses/) is a service I've never been that big of a fan of, because it feels like a bit of a black box. Things have improved recently with the introduction of [Virtual Deliverability Manager](https://docs.aws.amazon.com/ses/latest/dg/vdm-get-started.html) tools in the AWS Console.

There's one AWS SES feature I really love though: the ability to set it up for receiving email. You can point your domain name's MX records at AWS, and SES will accept emails sent to that domain. This is useful in many situations, but specifically handy if you're building any sort of tool where you send email notifications you want users to be able to reply to (think the comment emails in a Google Doc, or the functionality to reply via email in your favourite project management tool).

Here's how to set it up:

## Set up a rule set
To start, we need to set up some things in the AWS Console. You can set this up using CloudFormation or the CDK too, but I always prefer to do it through the Console first, so that I have an understanding of what options are available. You can get started in the [Incoming email section](https://eu-west-1.console.aws.amazon.com/ses/home?region=eu-west-1#/email-receiving) of the SES Console.

In there, you can set up an email receiving rule set. Within there, you can have multiple routes with different conditions, which will allow you to route emails based on things like the email address or domain it is addressed to. You then specify what actions happen when the rule's conditions are met. 

![](https://schof.link/5QU88UK)

## Save to S3

The main thing you usually want to happen here is saving the email to S3. Alternatively, it is also possible to send the email as [an SNS notification](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-action-sns.html). The latter seems like the easiest to connect up to things like AWS Lambda, but it comes with a limitation in terms of email size that can be accepted, since an SNS message can't be larger than 150 KB, which is not too big, considering this includes the email's headers and most email clients will send both a plain text and HTML version of an email.

By first saving the email into S3, you can circumvent this limit, and then [use S3 object triggers](https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html) (or SNS notifications) to invoke a Lambda function to process the email further.

## Parse the email

If you set this up with an email domain and a S3 bucket and send a test email, you might notice that the resulting file in S3 is a plain email payload, headers and weird encoding and all. Not super easy to read.

Emails are usually formatted using multipart encoding, which allows it to store multiple files in one: the plain and HTML versions of the content, and any attachments. Rather than writing parsing logic for this yourself, there are mail parser libraries available for most languages.

For Javascript, I tend to use the great [`mailparser` package](https://www.npmjs.com/package/mailparser) that is part of NodeMailer suite of tools.

Using it to parse our emails from S3 would look something like this:

```js
const { simpleParser } = require('mailparser');  
  
const email = await simpleParser(objectBody);
   
console.log(`Received an email sent to: ${email.to.value[0].address}`);
console.log(`Email text: ${email.text}`);
```

Have a look at the docs to learn more about the [structure of the `email` object](https://nodemailer.com/extras/mailparser/#mail-object). There's a lot more data available in that object, including any attachments.

Tip: use Laconia's [S3 adapter](https://laconiajs.io/docs/api/adapter#s3options-app) to simplify parsing the S3 event payload and getting access to the S3 object as a stream in your Lambda handler.


## Practical use

So how might you use this in your application? The easiest way would be to set a `Reply-To` header on any email you send, and have it contain a unique email address on your domain. For example, if you're sending a notification of a new discussion being posted on your forum website, you might want to include the following header in your email notification:

```
Reply-To: discussion-1234567@myforum.com
```

Where `1234567` represents the unique ID of the discussion. This will allow you to very easily identify what discussion the user is replying to, and creating their email body as a comment on that particular discussion.

You can look up the user that the comment should be attributed to based on the `From` email address. In that case, you might want to check the value of the header `Authentication-Results` though, which [will contain information](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-concepts.html#receiving-email-auth-and-scan) on whether the email passed DKIM, DMARC and SPF authentication. SES does not automatically discard an email with an invalid DKIM signature, so unless you make sure to discard these in your application code, it would be very easy for someone to pretend to be another user!

_Note: relying solely on the email address is still dangerous, because it relies on the user's email hoster having set up things like DKIM and DMARC authentication. A better alternative might be generating a unique email address for each user and discussion combination, so that knowing the specific reply email address is an authentication factor by itself._

SES also does some spam and virus scanning, the results of which will be in the `X-SES-Spam-Verdict` and `X-SES-Virus-Verdict` headers.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>