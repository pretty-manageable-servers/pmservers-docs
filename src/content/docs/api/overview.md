---
title: API overview
description: The two PMS Cloud APIs, their base URLs, auth and error format.
sidebar:
  order: 1
---

PMS Cloud has two APIs.

| API | Base URL | Auth | Use |
|---|---|---|---|
| [AI API](/api/ai/) | `https://api.pmservers.org/ai/v1` | AI key (`pms_sk_...`) | Call AI models. OpenAI-compatible. |
| [Management API](/api/management/) | `https://api.pmservers.org/v1` | Console sign-in token | Manage projects, VMs, SSH keys and AI keys. |

## Management API auth

The console uses the management API. It sends the sign-in token of your session as `Authorization: Bearer <token>`.

:::caution
There are no long-lived API tokens for the management API yet. For now, use the console to manage resources. Use the AI API with an AI key from your code.
:::

## Management API errors

```json
{"error": {"code": "quota_exceeded", "message": "You can have 1 VM. Delete a VM first."}}
```

| Status | `code` | Meaning |
|---|---|---|
| `401` | `unauthorized` | No token, or the token expired. Sign in again. |
| `403` | `not_allowed` | You cannot do this. |
| `404` | `not_found` | The resource does not exist, or it is not yours. |
| `409` | `quota_exceeded` | You are at a limit. See [Limits](/billing/limits/). |
| `409` | `conflict` | The resource is not in the right state, for example the VM is not running. |
| `422` | `validation_error` | A field is not valid. The `message` tells which. |
| `502` | `upstream_error` | The VM host did not answer. Try again. |
| `500` | `internal` | Something went wrong on our side. |

## AI API errors

The AI API uses the OpenAI error format. See [AI errors](/ai/errors/).

## OpenAPI

The OpenAPI spec of the AI API is at [`/openapi.json`](/openapi.json).
