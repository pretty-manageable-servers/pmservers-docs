---
title: API
description: The endpoints of the object storage API under /v1/storage. Account, buckets and access keys. The full reference is on the API reference page.
sidebar:
  order: 10
---

The object storage API is part of the management API at `https://api.pmservers.org/v1`. Sign in with your session. API tokens get `403`. See [API overview](/api/overview/).

Project members add `?account_id=<owner-id>` to each request.

## Endpoints

| Method | Path | Use |
|---|---|---|
| `GET` | `/v1/storage` | The state, the storage used, the limit and the cost that would apply. |
| `POST` | `/v1/storage/enable` | Turn on object storage. Approved accounts only. |
| `POST` | `/v1/storage/disable` | Turn off object storage. Only with no buckets. |
| `GET` | `/v1/storage/buckets` | List buckets. |
| `POST` | `/v1/storage/buckets` | Make a bucket. Body: `{"name": "my-bucket"}`. |
| `GET` | `/v1/storage/buckets/{name}` | Get a bucket. |
| `DELETE` | `/v1/storage/buckets/{name}` | Delete an empty bucket. |
| `GET` | `/v1/storage/keys` | List access keys. |
| `POST` | `/v1/storage/keys` | Make a key. Body: `{"name": "ci", "permission": "read_write", "buckets": "all"}`. `buckets` is `"all"` or a list of bucket names. The response has `secret_access_key` one time, with `endpoint` and `region`. |
| `GET` | `/v1/storage/keys/{key_id}` | Get a key. |
| `PATCH` | `/v1/storage/keys/{key_id}` | Change `name`, `permission` or `buckets`. |
| `DELETE` | `/v1/storage/keys/{key_id}` | Delete a key. |
| `POST` | `/v1/storage/keys/{key_id}/reset` | Make a new key ID and secret. The response has the new secret one time. |

The S3 endpoint is `https://s3.pmservers.org`. Its region is `pms`.

## Errors

| Code | Meaning |
|---|---|
| `403` | Your account is not approved, or you used an API token. |
| `404` | The bucket or key does not exist. |
| `409` | The name is taken, the state does not allow the change, or you reached a limit (`quota_exceeded`): buckets or access keys. |
| `422` | The name or the body is not valid (`validation_error`). |

## Full reference

See the [Management API reference](/api/management/#object-storage) for the request and response fields.
