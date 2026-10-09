---
title: Management API reference
description: All endpoints of the management API at https://api.pmservers.org/v1.
sidebar:
  order: 3
---

Base URL: `https://api.pmservers.org/v1`. Auth: the console sign-in token. See [API overview](/api/overview/).

`{p}` is a project ID. `{vm}` and `{k}` are resource IDs. Lists return `{"items": [...]}`.

## Account

| Method | Path | Use |
|---|---|---|
| `GET` | `/me` | Your user ID, email and plan. |
| `GET` | `/catalog` | Regions, VM sizes, VM images and AI models. |

## Projects

| Method | Path | Use |
|---|---|---|
| `GET` | `/projects` | List projects. |
| `POST` | `/projects` | Create a project. Body: `{"name": "..."}`. |
| `GET` | `/projects/{p}` | Get a project. |
| `PATCH` | `/projects/{p}` | Rename a project. Body: `{"name": "..."}`. |
| `DELETE` | `/projects/{p}` | Delete a project. It must have no VMs and no AI keys. Returns `202`. |
| `GET` | `/projects/{p}/usage` | vCPU, memory, disk and AI spend against your limits. |

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
| `GET` | `/events/stream?ticket=...` | Server-sent events (SSE) for all your projects. To resume, send `Last-Event-ID` or `?last_event_id=`. |
