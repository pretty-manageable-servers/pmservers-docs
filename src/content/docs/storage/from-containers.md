---
title: From your containers
description: Use object storage from your containers with the private address http://garage.pms-storage.svc:3900 and path style. The traffic does not use TLS and stays in your private network.
sidebar:
  order: 3
---

A container can use object storage without the public endpoint. Use the private address:

```
http://garage.pms-storage.svc:3900
```

Path style is required, as for the public endpoint. The region is `pms`.

## Set the variables

Add these environment variables to the container. See [Edit a container](/containers/overview/).

| Variable | Value |
|---|---|
| `AWS_ENDPOINT_URL` | `http://garage.pms-storage.svc:3900` |
| `AWS_REGION` | `pms` |
| `AWS_ACCESS_KEY_ID` | The key ID of an access key. |
| `AWS_SECRET_ACCESS_KEY` | The secret of the same key. |

The container needs the same path style and checksum settings as in [Quick start](/storage/quick-start/#path-style-is-required).

## Python example

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

print(s3.list_objects_v2(Bucket="my-bucket").get("KeyCount"))
```

## Notes

- The connection uses HTTP, not HTTPS. The traffic stays in your private network. Do not send keys outside the private network.
- The address works only from containers. It does not work from your computer. Use the public endpoint for your computer.
- Use a key with the smallest permission that the container needs. See [Buckets and access keys](/storage/buckets-and-keys/).
- Restarting a container does not delete objects. Objects are stored in object storage, not in the container. The container has no disk.
