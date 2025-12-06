---
title: Using AWS S3 as a Simple Cache Service
date: 2021-12-06
description: S3 is great for file storage, but it does so much more as well. I love using S3 as a simple caching mechanism for any stateless functions that need...
taxonomies:
  category:
    - Blog
extra: {}
---


S3 is great for file storage, but it does so much more as well. I love using S3 as a simple caching mechanism for any stateless functions that need to save some ephemeral data to keep state.

Traditionally, you would use in-memory caching tools like Redis for this, and Redis does still have its place as it will be faster than retrieving data from S3 in almost every case. However, if millisecond performance is not a concern, S3 is a cheap, low-effort and simple to implement alternative.


## Some basic caching helpers

```js
// cache.js
const { S3 } = require('aws-sdk');  
const s3 = new S3({ region: 'eu-west-1' });

const { CACHE_BUCKET } = process.env;

const get = async(key, defaultValue = null) => {  
  try {  
    const { Body } = await s3  
      .getObject({  
        Bucket: CACHE_BUCKET,  
        Key: `${key}.json`  
      })  
      .promise();  
    return JSON.parse(Body.toString());  
  }  
  catch(e) {  
    // File might not exist yet  
    return defaultValue;  
  }  
};

const set = (key, value) =>  
  s3  
    .putObject({  
      Bucket: CACHE_BUCKET,  
      Key: `${key}.json`,  
      Body: JSON.stringify(value)  
    })  
    .promise();

module.exports = {  
  get,  
  set  
};
```

You would use them like this (be sure to define the `CACHE_BUCKET`environment variable):

```js
const cache = require('./cache.js');

// ...

await cache.set('my-key', { message: 'Hello, world!', boolValue: true });

const value = await cache.get('my-key');  
console.log(value); // { message: 'Hello, world!', boolValue: true }
```

## Storage types

In our example code above, we’re storing values as JSON objects. Of course you’re able to store any type of content (binary, plain text) as you see fit for your purpose.

## S3 Lifecycle Rules

Using S3 as a cache works especially well in combination with [S3 Lifecycle configurations](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html). This will allow you to automatically delete cache resources after a certain period of time has passed.

An example on how to set that up in CloudFormation:

```yaml
Resources:  
  S3Bucket:  
    Type: 'AWS::S3::Bucket'  
    Properties:  
      BucketName: 'my-caching-bucket' # Set bucket name  
      AccessControl: Private # We don't want these cache files to be publicly available!  
      LifecycleConfiguration:  
        Rules:  
          - Id: ExpirationRule  
            Status: Enabled  
            ExpirationInDays: 2 # Will delete items after 2 days
```

You can add a [`Prefix`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule.html#cfn-s3-bucket-lifecycleconfig-rule-prefix) or [`TagFilters`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule.html#cfn-s3-bucket-rule-tagfilters) condition to only apply this auto-deletion rule to objects in the bucket that have keys that start with specific prefixes, or attach tags and filter by those.

## Extending methods

If you find yourself using this method of caching data a lot, you might want to expand our little `cache.js` helper with a few additional methods. S3 is quite flexible, so it should be relatively easy to implement functions that:

- Delete cache keys
- Delete cache keys that start with a prefix
- Tag cache keys and allow for deleting or retrieving all keys with a specific tag

## Further reading

- [`AWS::S3::Bucket Rule`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule.html) [Cloudformation documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule.html)
- [Whitepaper: Best Practices Design Patterns: Optimizing Amazon S3 Performance](https://d1.awsstatic.com/whitepapers/AmazonS3BestPractices.pdf?stod_obj2=)

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>