---
title: Limitations
description: What object storage does not do. No versioning, bucket policies, ACLs, object lock or anonymous S3 access. One node, no backups, and path style only.
sidebar:
  order: 7
---

Object storage is built on Garage. Garage does not support every S3 feature. PMS Cloud adds its own limits. Read this page before you build on object storage.

## Not supported

| Feature | Status |
|---|---|
| Versioning | Not supported. `GetBucketVersioning` returns that versioning is not enabled. |
| Bucket policies | Not supported. Use access keys and [presigned URLs](/storage/share/). |
| ACLs | Not supported. |
| Object lock | Not supported. |
| Lifecycle rules | Not supported. Garage has a partial lifecycle API (expiration and abort of incomplete uploads). Do not rely on it. |
| Anonymous S3 API | Not supported. The S3 endpoint needs a signed request. To share a file, use a [presigned URL](/storage/share/). |
| Virtual-host style | Not supported. Use path style. See [Quick start](/storage/quick-start/#path-style-is-required). |

## Other limits

- **One node.** There is one copy of your data. There is no replication.
- **No backups.** If the disk fails, the data is lost. Keep your own copy of data that you need.
- **100 MB for each request body.** Use multipart upload for larger files.
- **Multipart checksums.** Objects that were uploaded in parts need `response_checksum_validation = when_required` in the AWS SDKs. See [Quick start](/storage/quick-start/).
- **Limits and states.** See [Limits and states](/storage/limits/).

## Garage

Garage is free software. Its documentation lists the S3 features it supports. See [Garage](https://garagehq.deuxfleurs.fr/).
