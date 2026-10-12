---
title: Management API reference
description: All endpoints of the management API at https://api.pmservers.org/v1.
sidebar:
  order: 3
---

Base URL: `https://api.pmservers.org/v1`. Auth: the console sign-in token or a [project token](/api/tokens/). See [API overview](/api/overview/).

`{p}` is a project ID. `{c}` and `{k}` are resource IDs. Lists return `{"items": [...]}`.

## Account

| Method | Path | Use |
|---|---|---|
| `GET` | `/me` | Your user ID, email and plan. |
| `GET` | `/catalog` | Regions, container sizes, database sizes and AI models. |
| `GET` | `/account/access` | Your container access: `access` (`none`, `pending`, `approved`, `rejected`), `runtime` (`gvisor` or `native`), `vcluster` (`none`, `creating`, `ready`, `failed`, `deleting`), `reason`, `note`, `requested_at`, `decided_at`. |
| `POST` | `/account/access/request` | Request container access. Body: `{"reason": "..."}` (1 to 1000 characters). `409` if the request is pending or approved. |

## Projects

| Method | Path | Use |
|---|---|---|
| `GET` | `/projects` | List the projects that you own or are a member of. Each has `role`: `owner` or `member`. |
| `POST` | `/projects` | Create a project. Body: `{"name": "..."}`. |
| `GET` | `/projects/{p}` | Get a project. |
| `PATCH` | `/projects/{p}` | Rename a project. Body: `{"name": "..."}`. |
| `DELETE` | `/projects/{p}` | Delete a project. Owner only (`403` for a member). It must have no containers and no AI keys. Returns `202`. |
| `GET` | `/projects/{p}/usage` | vCPU and memory (containers and databases), disk and AI spend of the project owner, against the owner's limits. |

## Project members

See [Project members](/get-started/members/).

| Method | Path | Use |
|---|---|---|
| `GET` | `/projects/{p}/members` | List the owner and the members. Each has `user_id`, `email`, `role` and `created_at`. |
| `POST` | `/projects/{p}/members` | Add a member. Owner only. Body: `{"email": "..."}`. Returns `201` with `invited: true` if the person had no account and got an invite email. `409` if they are already a member. |
| `DELETE` | `/projects/{p}/members/{user_id}` | The owner removes a member, or a member removes themselves to leave. The owner cannot leave. Returns `204`. |

## SSH keys

Saved on your account, not on a project. Public keys only. Up to 20.

| Method | Path | Use |
|---|---|---|
| `GET` | `/ssh-keys` | List saved public keys. |
| `POST` | `/ssh-keys` | Save a key. Body: `{"name": "...", "public_key": "ssh-ed25519 ..."}`. |
| `DELETE` | `/ssh-keys/{k}` | Delete a saved key. Returns `204`. |

## Registry credentials

Saved on your account, not on a project. Up to 10. See [Registry credentials](/containers/registry-credentials/).

| Method | Path | Use |
|---|---|---|
| `GET` | `/registry-credentials` | List credentials: `id`, `name`, `host`, `username`, `created_at`. The token is never returned. |
| `POST` | `/registry-credentials` | Add a credential. Body: `{"name": "...", "host": "ghcr.io", "username": "...", "token": "..."}`. Returns `201`. `409` if the name exists. |
| `DELETE` | `/registry-credentials/{k}` | Delete a credential. Returns `204`. `409` if a container uses it. |

## Containers

The project owner's account must have access (`403 not_allowed` if not). See [Containers](/containers/overview/).

| Method | Path | Use |
|---|---|---|
| `GET` | `/projects/{p}/containers` | List containers. |
| `POST` | `/projects/{p}/containers` | Create a container. Body: `{"name": "...", "type": "worker", "image": "...", "size": "pms-c-250m-512", "registry_credential_id": null, "env": {"NAME": "value"}, "runtime": "gvisor"}`. `runtime` is optional (default `gvisor`); `native` needs an account with `runtime: native` (else `403 native_not_allowed`). Returns `202`. |
| `GET` | `/projects/{p}/containers/{c}` | Get a container. |
| `PATCH` | `/projects/{p}/containers/{c}` | Change `image`, `size`, `registry_credential_id`, `env`, `env_set`, `env_unset` or `runtime`. `env` replaces all variables. `env_set` (an object, `{"NAME": "value"}`) adds or changes only the named variables. `env_unset` (a list of names) removes only the named variables. A name in `env_unset` that does not exist is refused (`422 validation_error`). Send `env`, or `env_set` and `env_unset`, not both (`422 validation_error`). A name cannot be in both `env_set` and `env_unset`. The limits apply to the full set after the change. Restarts the container. Returns `202`. |
| `DELETE` | `/projects/{p}/containers/{c}` | Delete a container. Returns `202`. |
| `POST` | `/projects/{p}/containers/{c}/actions` | Body: `{"action": "start" \| "stop" \| "restart"}`. Returns `202`. |
| `GET` | `/projects/{p}/containers/{c}/logs?tail=200&previous=false` | The last log lines (`tail` 1 to 2000). `previous=true`: the run before the last restart. Returns `{"lines": [{"time": "...", "message": "..."}]}`. |

Container object (env values are never returned):

```json
{
  "id": "ctr_...",
  "name": "bot",
  "type": "worker",
  "image": "ghcr.io/owner/bot:1.0",
  "size": "pms-c-250m-512",
  "vcpu": 0.25,
  "memory_mib": 512,
  "registry_credential_id": null,
  "env_names": ["DISCORD_TOKEN"],
  "runtime": "gvisor",
  "status": "running",
  "status_message": null,
  "created_at": "2026-10-10T12:00:00+00:00",
  "updated_at": "2026-10-10T12:00:00+00:00"
}
```

`status`: `provisioning`, `running`, `stopped`, `failed`, `deleting` or `unknown`.

## AI keys

| Method | Path | Use |
|---|---|---|
| `GET` | `/projects/{p}/ai-keys` | List keys. |
| `POST` | `/projects/{p}/ai-keys` | Create a key. Body: `{"name": "...", "models": ["cirrus"], "budget_usd": 5}`. The answer has `secret` one time only. |
| `GET` | `/projects/{p}/ai-keys/{k}` | Get a key. |
| `PATCH` | `/projects/{p}/ai-keys/{k}` | Change `models` or `budget_usd`. |
| `POST` | `/projects/{p}/ai-keys/{k}/rotate` | Make a new secret. The old secret stops at once. |
| `DELETE` | `/projects/{p}/ai-keys/{k}` | Revoke the key. Returns `204`. |

## Object storage

Object storage is for approved accounts. The project owner's account is used. Members add `?account_id=<owner-id>`. Sign-in only: API tokens get `403`. See [Object storage](/storage/overview/) and [API](/storage/api/).

| Method | Path | Use |
|---|---|---|
| `GET` | `/storage` | The state, the storage used, the limit, the number of buckets and keys, and `would_cost_usd`. |
| `POST` | `/storage/enable` | Turn on object storage. Returns `202`. `403` if the account is not approved. |
| `POST` | `/storage/disable` | Turn off object storage. Returns `202`. `409` if buckets are left. |
| `GET` | `/storage/buckets` | List buckets. |
| `POST` | `/storage/buckets` | Make a bucket. Body: `{"name": "...", "public_read": false}`. Returns `202`. `409` if the name is taken. `409` `quota_exceeded` at 10 buckets. |
| `GET` | `/storage/buckets/{name}` | Get a bucket. |
| `PATCH` | `/storage/buckets/{name}` | Body: `{"public_read": true}`. Returns `202`. |
| `DELETE` | `/storage/buckets/{name}` | Delete an empty bucket. Returns `202`. |
| `GET` | `/storage/keys` | List access keys. |
| `POST` | `/storage/keys` | Make a key. Body: `{"name": "...", "permission": "read_write" or "read_only", "buckets": "all" or ["bucket", ...]}`. Returns `201` with `secret_access_key` one time, `endpoint` and `region`. `409` `quota_exceeded` at 20 keys. |
| `GET` | `/storage/keys/{key_id}` | Get a key. |
| `PATCH` | `/storage/keys/{key_id}` | Change `name`, `permission` or `buckets`. Returns `202`. |
| `DELETE` | `/storage/keys/{key_id}` | Delete a key. Returns `204`. |
| `POST` | `/storage/keys/{key_id}/reset` | Make a new key ID and secret, with the same settings. The old key stops working. Returns the new secret one time. |

The paths above are under `/v1`. For example, `GET /v1/storage`.

## Events

| Method | Path | Use |
|---|---|---|
| `GET` | `/projects/{p}/events` | The last 50 events of the project. |
| `POST` | `/events/ticket` | Get a ticket for the event stream. |
| `GET` | `/events/stream?ticket=...` | Server-sent events (SSE) for all projects that you own or are a member of. To resume, send `Last-Event-ID` or `?last_event_id=`. |
