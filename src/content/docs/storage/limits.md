---
title: Limits and states
description: Object storage limits. 10 GiB free for each account. Read-only at 100%, suspended at 125%, back to normal below 90%. Requests per second and the 100 MB request size limit.
sidebar:
  order: 6
---

All limits apply to the whole account. Usage in a shared project counts against the account owner.

## Limits

| Limit | Value |
|---|---|
| Storage, all buckets together | 10 GiB (free tier). See [Pricing](/storage/pricing/) above 10 GiB. |
| Buckets | 10 |
| Access keys | 20 |
| Size of one request body | 100 MB. Use multipart upload for larger files. |
| Requests per second | 100 for each account. The burst is 300 requests. |

Requests above the rate limit get the S3 error `SlowDown` (HTTP `503`). The AWS SDKs retry this error.

:::note[Request size]
Cloudflare rejects a request body larger than 100 MB. Most S3 tools use multipart upload for large files. Keep each part at 100 MB or less.
:::

## States

We check the storage use of each account each minute. The state depends on the storage use.

| Storage use | State | What you can do |
|---|---|---|
| Below 100% | `active` | Your keys work as set. Public read works. |
| 100% or more | `read_only` | Read objects. You cannot write or delete objects. Public read works. |
| 125% or more | `suspended` | No access with your keys. Public read stops. Contact support. |
| Below 90% again | `active` | Back to normal. |

Between 90% and 100%, the state does not change. This stops the state from changing again and again.

## Free space in a read-only account

In `read_only`, you cannot delete objects. Contact support to free space.

## Suspended

When the account is `suspended`, your keys do not work and public read stops. Contact support.

## Overshoot

We check the storage use each minute. Uploads between two checks can go over the limit. The overshoot is small.

## Check the state

```sh
pms storage status
```

The status shows the state, the storage used and the limit. See [CLI](/storage/cli/).
