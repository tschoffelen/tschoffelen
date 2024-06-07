---
title: Allowing ACLs for S3 Objects in CloudFormation
description: AWS has added a few new defaults for new S3 buckets to make it
  harder to create leaky buckets that put all of your company’s data out there…
date: 2023-07-25T09:04:55.688Z
taxonomies:
  category:
    - Reference
extra: {}
---
AWS has added a few [new defaults for new S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html) to make it harder to create leaky buckets that put all of your company's data out there for everyone to grab.

These defaults also disable object-based ACLs, which is frustrating if you want to make some objects publicly available. 

It's weirdly hard to find info on this online, so putting it here for future reference, the [`OwnershipControls`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-ownershipcontrols.html) property is what you need to update:

```yaml
 WebBucket:
	Type: AWS::S3::Bucket
	Properties:
		BucketName: my-bucket
		OwnershipControls:
			Rules:
				- ObjectOwnership: BucketOwnerPreferred
```