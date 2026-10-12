---
title: Buckets and access keys
description: Bucket name rules, the limit of 10 buckets and 20 access keys, read-write and read-only keys, keys for all buckets or chosen buckets, and how to reset or delete a key.
sidebar:
  order: 4
---

## Buckets

A bucket holds objects (files). Each account can have up to **10 buckets**.

### Name rules

| Rule | Value |
|---|---|
| Length | 3 to 63 characters. |
| Characters | Lowercase letters, digits and `-`. |
| Start and end | A letter or a digit. |
| Uniqueness | Unique across all of PMS Cloud. Two accounts cannot use the same name. |
| Reserved | Some names are reserved for PMServers pages and hosts. |

A taken name returns `409`. A reserved or invalid name returns `422`.

### Make a bucket

```sh
pms storage bucket create my-bucket
pms storage bucket create my-public-bucket --public
```

Use `--public` for [public read](/storage/public-read/). You can change it later.

### List, change and delete a bucket

```sh
pms storage bucket ls
pms storage bucket public my-bucket on
pms storage bucket public my-bucket off
pms storage bucket rm my-bucket
```

You can delete a bucket only when it is empty. Delete all objects first. If the bucket still has objects, the bucket stays. It shows a status message.

## Access keys

An access key has a key ID and a secret. The key ID starts with `GK`. Each account can have up to **20 access keys**.

| Setting | Values |
|---|---|
| Permission | `read_write` (default) or `read_only`. |
| Buckets | All buckets, now and later. Or only the buckets you choose. |
| Name | 1 to 64 characters. |

### Make a key

```sh
pms storage key create ci
pms storage key create reader --read-only --bucket my-bucket
eval "$(pms storage key create ci --env)"
```

The secret is shown one time. Save it at once. We do not store the secret.

A read-only key can read objects. It cannot write or delete objects.

### Change a key

A key keeps its key ID when you change its permission or buckets.

```sh
pms storage key ls
```

### Reset a key

A reset makes a new key ID and a new secret. The new key has the same name, permission and buckets. The old key stops working.

```sh
pms storage key reset <key-id> --env
```

Update your apps with the new secret at once.

### Delete a key

```sh
pms storage key rm <key-id>
```

Apps that use the key stop working.

## Console and API

The console and the API do the same things. See [API](/storage/api/) for the requests.
