---
title: API tokens
description: Project tokens that start with pms_. Each token works on one project only and is shown one time. Optional expiry, 20 for each project. Use them in CI, scripts and sandboxes.
sidebar:
  order: 4
---

An API token lets a program act on one project. Use a token in CI, in scripts and for [sandboxes](/sandboxes/overview/). A token starts with `pms_`.

:::caution[Shown one time]
The token is shown one time, when you create it. Copy it then. We keep only a hash of the token. If you lose a token, revoke it and create a new one.
:::

## Token rules

| Rule | Value |
|---|---|
| Format | `pms_`, then 43 letters and digits |
| Project | One project. The project comes from the token. |
| Expiry | 1 to 365 days, or never. You set it when you create the token. |
| Tokens for each project | 20 |

## Create a token

With the `pms` CLI:

```sh
pms token create --project <name> --name <n> [--expires 90d|never]
```

With the API, send a `POST` request to `https://api.pmservers.org/v1/projects/{id}/tokens` with the body `{"name": "ci", "expires_in_days": 90}`. Use `null` for `expires_in_days` to make a token that does not expire (1 to 365 days, or `null`). The response contains the token. Only your sign-in can create a token.

## List and revoke tokens

```sh
pms token list
pms token revoke <token-id>
```

With the API, send a `DELETE` request to `/v1/projects/{id}/tokens/{token_id}`. A revoked token cannot be used again.

Only your sign-in can list or revoke tokens. A token cannot do this.

## Use a token

Send the token to the management API as `Authorization: Bearer pms_...`.

For the `pms` CLI, set the `PMS_TOKEN` environment variable:

```sh
export PMS_TOKEN="pms_..."
```

In CI, store the token as a secret. Set `PMS_TOKEN` from that secret in the job.

For sandboxes, set the token as `E2B_API_KEY`. See [Sandboxes](/sandboxes/overview/#set-up).

## What a token can do

A token works on its own project only.

| Can do | Cannot do |
|---|---|
| Read your user, the catalog, and the project list (its project only) | Create, change or delete a project |
| Read the project, its usage and its events | Create or revoke tokens |
| Use the VMs, containers and databases of the project | Manage SSH keys |
| Get a console ticket and reset a database password | Manage members |
| List registry credentials | Add, change or delete registry credentials |
| | Manage AI keys |
| | Manage account access |
| | Use admin routes |

See [API overview](/api/overview/) and [Management API reference](/api/management/).

## Errors

| Status | Code | Meaning |
|---|---|---|
| `401` | `unauthorized` | No token, a token that is not valid, or an expired token. |
| `429` | `rate_limited` | More than 10 bad tokens from one IP address in one minute. Requests from that IP address are blocked for 10 minutes. |
