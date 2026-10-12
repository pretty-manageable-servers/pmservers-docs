---
title: Public read
description: Let anyone read the objects of a bucket with a plain GET or HEAD request at https://<bucket>-pub.pmservers.org/<key>. Website mode serves index.html for folder paths. No listing.
sidebar:
  order: 5
---

You can make a bucket public for reading. Anyone with the link can read its objects. They do not need a key.

## Turn it on

```sh
pms storage bucket public my-bucket on
```

Or set `--public` when you make the bucket. In the console, use the **Public read** switch. In the API, set `public_read` to `true`. See [API](/storage/api/).

Changes take effect in up to about 1 minute.

## URL format

```
https://<bucket>-pub.pmservers.org/<key>
```

For example, the object `photos/cat.jpg` in the bucket `my-bucket` is at:

```
https://my-bucket-pub.pmservers.org/photos/cat.jpg
```

The public URL uses a different host from the S3 endpoint. Public read does not use `https://s3.pmservers.org`.

## Website mode

A public bucket works like a static website:

| Request | Result |
|---|---|
| `/cat.jpg` | Returns the object `cat.jpg`. |
| `/photos/` | Returns the object `photos/index.html`. |
| A folder with no `index.html` | No file list. The bucket does not list the files in a folder. |

Redirects are not supported.

## Methods

Public read supports only `GET` and `HEAD`. Other methods return `405`.

Public read requests are not signed. Public read is not a way to use the S3 API without a key. The S3 API at `https://s3.pmservers.org` does not accept anonymous requests.

## Turn it off

```sh
pms storage bucket public my-bucket off
```

After it is off, the public URLs stop working.

## Public read and account limits

Public read works while the account is `active` or `read_only`. It stops when the account is `suspended`. See [Limits and states](/storage/limits/).
