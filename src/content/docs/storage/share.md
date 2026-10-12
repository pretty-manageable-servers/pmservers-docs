---
title: Share a file
description: Share one file with a presigned URL. Anyone with the URL can read the file until it expires. Examples for the AWS CLI, boto3 and the JavaScript SDK v3. The longest lifetime is 7 days.
sidebar:
  order: 5
---

Buckets are private. To let someone read a file, make a presigned URL and send it to them. The person does not need an access key.

## How it works

- A presigned URL gives read access to one object for a set time.
- The URL uses the S3 endpoint, for example `https://s3.pmservers.org/my-bucket/photos/cat.jpg`.
- Anyone with the URL can read the object until the time ends. Share it only with people you trust.
- The URL is signed with your access key. It stops working when you delete or reset the key. It stops working when the account is `suspended`.
- The longest lifetime is 7 days (604800 seconds). This is the limit of SigV4 signing.

Set path style first. See [Quick start](/storage/quick-start/#path-style-is-required).

## AWS CLI

```sh
aws s3 presign s3://my-bucket/photos/cat.jpg --expires-in 3600 --endpoint-url https://s3.pmservers.org
```

`--expires-in` is in seconds. 3600 is one hour.

## boto3 (Python)

```python
import os

import boto3
from botocore.config import Config

s3 = boto3.client(
    "s3",
    endpoint_url="https://s3.pmservers.org",
    region_name="pms",
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    config=Config(s3={"addressing_style": "path"}),
)

url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "my-bucket", "Key": "photos/cat.jpg"},
    ExpiresIn=3600,
)
print(url)
```

## JavaScript SDK v3

Install the presigner with `npm install @aws-sdk/s3-request-presigner`.

```js
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  endpoint: "https://s3.pmservers.org",
  region: "pms",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const url = await getSignedUrl(
  s3,
  new GetObjectCommand({ Bucket: "my-bucket", Key: "photos/cat.jpg" }),
  { expiresIn: 3600 },
);
```

## Lifetime

The time is in seconds in all three examples. Use 604800 (7 days) at most. A longer time does not work. Use a shorter time when you can.

## Stop a shared link

A presigned URL works until it expires. To stop it sooner, delete or reset the access key that made it:

```sh
pms storage key rm <key-id>
```
