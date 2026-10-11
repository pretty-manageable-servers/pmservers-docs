---
title: Limits
description: Every quota and limit of PMS Cloud on one page.
sidebar:
  order: 1
---

All limits are for the free tier. They apply to your whole account, not to each project.

Usage in a shared project counts against the project owner. See [Project members](/get-started/members/).

## VMs

| Limit | Value |
|---|---|
| VMs | 1 |
| vCPU, all VMs together | 2 |
| Memory, all VMs together | 4 GiB |
| Disk for each VM | 10 to 20 GB |
| Console connections for each VM | 1 at a time |
| Saved SSH public keys | 20 |

## Projects

| Limit | Value |
|---|---|
| Members in each project | 20, plus the owner |

## AI

| Limit | Value |
|---|---|
| AI keys | 5 |
| Requests for each key | 60 each minute |
| AI spend for each account | $3 for each calendar month (UTC) |
| Budget for each key | You set it: $0 to $100,000, for all time |

## Containers

Each account needs approval. See [Containers](/containers/overview/).

| Limit | Value |
|---|---|
| Containers | 2 |
| Sizes | 0.25 vCPU / 512 MiB, or 0.5 vCPU / 1 GiB |
| Registry credentials | 10 |
| vCPU and memory | Shared with VMs (see above) |
| Disk | None. Containers are stateless. |
| Inbound traffic | None. Workers only. |

## Databases

No approval needed. See [Databases](/databases/overview/).

| Limit | Value |
|---|---|
| Databases | 1 |
| Size | 0.25 vCPU / 512 MiB |
| Storage, all databases together | 1 GiB. Read-only at 100%, connections blocked at 150%. See [Storage limit](/databases/storage-limit/). |
| vCPU and memory | Shared with VMs and containers (see above) |
| Backups | None |

## S3 storage (coming soon)

| Limit | Value |
|---|---|
| Size of one upload request | 100 MB. Use multipart upload for larger files. |

## Errors

- Management API: `409` with code `quota_exceeded`.
- AI API: `402 budget_exceeded` or `429 rate_limit_exceeded`.

The management API also limits requests: 600 in one minute for each user, sessions and API tokens together. After that it returns `429 rate_limited` for one minute.

To ask for higher limits, contact enterprise support.
