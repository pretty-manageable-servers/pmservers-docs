---
title: Management API reference
description: All endpoints of the management API at https://api.pmservers.org/v1.
sidebar:
  order: 3
---

Base URL: `https://api.pmservers.org/v1`. Auth: the console sign-in token. See [API overview](/api/overview/).

`{p}` is a project ID. `{vm}`, `{c}` and `{k}` are resource IDs. Lists return `{"items": [...]}`.

## Account

| Method | Path | Use |
|---|---|---|
| `GET` | `/me` | Your user ID, email and plan. |
| `GET` | `/catalog` | Regions, VM sizes, VM images, container sizes and AI models. |
| `GET` | `/account/access` | Your container access: `access` (`none`, `pending`, `approved`, `rejected`), `runtime` (`gvisor` or `native`), `vcluster` (`none`, `creating`, `ready`, `failed`, `deleting`), `reason`, `note`, `requested_at`, `decided_at`. |
| `POST` | `/account/access/request` | Request container access. Body: `{"reason": "..."}` (1 to 1000 characters). `409` if the request is pending or approved. |

## Projects

| Method | Path | Use |
|---|---|---|
| `GET` | `/projects` | List the projects that you own or are a member of. Each has `role`: `owner` or `member`. |
| `POST` | `/projects` | Create a project. Body: `{"name": "..."}`. |
| `GET` | `/projects/{p}` | Get a project. |
| `PATCH` | `/projects/{p}` | Rename a project. Body: `{"name": "..."}`. |
| `DELETE` | `/projects/{p}` | Delete a project. Owner only (`403` for a member). It must have no VMs, no containers and no AI keys. Returns `202`. |
| `GET` | `/projects/{p}/usage` | vCPU and memory (VMs and containers), disk and AI spend of the project owner, against the owner's limits. |

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

## VMs

| Method | Path | Use |
|---|---|---|
| `GET` | `/projects/{p}/vms` | List VMs. |
| `POST` | `/projects/{p}/vms` | Create a VM. See [Create a VM](/vms/create/). Returns `202`. |
| `GET` | `/projects/{p}/vms/{vm}` | Get a VM. |
| `DELETE` | `/projects/{p}/vms/{vm}` | Delete a VM. Returns `202`. |
| `POST` | `/projects/{p}/vms/{vm}/actions` | Body: `{"action": "start" \| "stop" \| "restart"}`. Returns `202`. |
| `POST` | `/projects/{p}/vms/{vm}/console/ticket` | Get a ticket for the console WebSocket. |
| WebSocket | `/projects/{p}/vms/{vm}/console?ticket=...` | The serial console. See [Browser console](/vms/console/). |

VM object:

```json
{
  "id": "vm_...",
  "name": "web-1",
  "status": "running",
  "status_message": null,
  "size": "pms-2c-4g",
  "image": "ubuntu-24.04",
  "disk_gb": 20,
  "private_ip": "10.0.12.34",
  "ssh_user": "ubuntu",
  "created_at": "2026-10-08T12:00:00+00:00"
}
```

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
| `PATCH` | `/projects/{p}/containers/{c}` | Change `image`, `size`, `registry_credential_id`, `env` or `runtime`. `env` replaces all variables. Restarts the container. Returns `202`. |
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
| `POST` | `/projects/{p}/ai-keys` | Create a key. Body: `{"name": "...", "models": ["gemma4-e4b"], "budget_usd": 5}`. The answer has `secret` one time only. |
| `GET` | `/projects/{p}/ai-keys/{k}` | Get a key. |
| `PATCH` | `/projects/{p}/ai-keys/{k}` | Change `models` or `budget_usd`. |
| `POST` | `/projects/{p}/ai-keys/{k}/rotate` | Make a new secret. The old secret stops at once. |
| `DELETE` | `/projects/{p}/ai-keys/{k}` | Revoke the key. Returns `204`. |

## Events

| Method | Path | Use |
|---|---|---|
| `GET` | `/projects/{p}/events` | The last 50 events of the project. |
| `POST` | `/events/ticket` | Get a ticket for the event stream. |
| `GET` | `/events/stream?ticket=...` | Server-sent events (SSE) for all projects that you own or are a member of. To resume, send `Last-Event-ID` or `?last_event_id=`. |
