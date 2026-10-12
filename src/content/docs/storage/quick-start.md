---
title: Quick start
description: Turn on object storage, make a bucket and an access key. Then use the AWS CLI, boto3 or the JavaScript SDK v3 with path style, region pms and the endpoint https://s3.pmservers.org.
sidebar:
  order: 2
---

This page uses the PMS CLI for the first steps. You can also use the console or the API. See [Object storage](/storage/overview/).

## 1. Turn on object storage

```sh
pms storage enable
pms storage status
```

Wait until the status is `active`.

## 2. Make a bucket

```sh
pms storage bucket create my-bucket
```

Bucket names are unique across all of PMS Cloud. See [Buckets and access keys](/storage/buckets-and-keys/) for the rules.

## 3. Make an access key

```sh
eval "$(pms storage key create ci --env)"
```

This sets these variables in your shell:

| Variable | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | The key ID. |
| `AWS_SECRET_ACCESS_KEY` | The secret. |
| `AWS_ENDPOINT_URL` | `https://s3.pmservers.org` |
| `AWS_REGION` | `pms` |
| `AWS_DEFAULT_REGION` | `pms` |

:::caution[The secret is shown one time]
The secret is shown one time. We do not store it. If you lose it, run `pms storage key reset <key-id>`. The old secret stops working.
:::

The variables do not turn on path style. Set path style in your tool, as shown below.

## Path style is required

The endpoint is `https://s3.pmservers.org`. It only works with path style. The bucket name goes in the path, for example `https://s3.pmservers.org/my-bucket/photo.jpg`. Do not use `my-bucket.s3.pmservers.org`.

| Setting | Value |
|---|---|
| Endpoint | `https://s3.pmservers.org` |
| Region | `pms` |
| Addressing style | Path |
| Checksum validation for responses | `when_required` (`WHEN_REQUIRED` in the JavaScript SDK) |

The checksum setting is needed because of Garage. Garage returns a wrong checksum for objects that were uploaded in parts (multipart upload). Without this setting, boto3 and the newer AWS SDKs fail to read those objects.

## AWS CLI

Add the settings to `~/.aws/config`:

```ini
[default]
region = pms
endpoint_url = https://s3.pmservers.org
response_checksum_validation = when_required
s3 =
  addressing_style = path
```

Or set the path style with one command:

```sh
aws configure set default.s3.addressing_style path
```

Then use the CLI as usual:

```sh
aws s3 cp ./photo.jpg s3://my-bucket/photo.jpg
aws s3 ls s3://my-bucket/
aws s3 cp s3://my-bucket/photo.jpg ./photo-copy.jpg
```

The AWS CLI uses multipart upload for files larger than 8 MiB by default. That is below the 100 MB limit for each request.

## boto3 (Python)

```python
import os

import boto3
from botocore.config import Config

s3 = boto3.client(
    "s3",
    endpoint_url=os.environ["AWS_ENDPOINT_URL"],
    region_name=os.environ["AWS_REGION"],
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    config=Config(
        s3={"addressing_style": "path"},
        response_checksum_validation="when_required",
    ),
)

s3.upload_file("photo.jpg", "my-bucket", "photo.jpg")
s3.download_file("my-bucket", "photo.jpg", "photo-copy.jpg")
```

boto3 uses multipart upload for files larger than 8 MiB by default.

## JavaScript SDK v3

```js
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "node:fs";

const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT_URL,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
  responseChecksumValidation: "WHEN_REQUIRED",
});

// Upload splits a large file into parts. A plain PutObject does not.
await new Upload({
  client: s3,
  params: {
    Bucket: "my-bucket",
    Key: "photo.jpg",
    Body: createReadStream("photo.jpg"),
  },
}).done();

const { Body } = await s3.send(
  new GetObjectCommand({ Bucket: "my-bucket", Key: "photo.jpg" }),
);
```

## Other tools

Use the endpoint, the region and path style in any S3 tool. For example, rclone needs `provider = Other`, `endpoint = https://s3.pmservers.org`, `region = pms` and `force_path_style = true`.

## Next steps

- [From your containers](/storage/from-containers/)
- [Limits and states](/storage/limits/)
- [Limitations](/storage/limitations/)
