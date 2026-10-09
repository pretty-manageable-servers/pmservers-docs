---
title: Limits
description: Every quota and limit of PMS Cloud on one page.
sidebar:
  order: 1
---

All limits are for the free tier. They apply to your whole account, not to each project.

## VMs

| Limit | Value |
|---|---|
| VMs | 1 |
| vCPU, all VMs together | 2 |
| Memory, all VMs together | 4 GiB |
| Disk for each VM | 10 to 20 GB |
| Console connections for each VM | 1 at a time |
| Saved SSH public keys | 20 |

## AI

| Limit | Value |
|---|---|
| AI keys | 5 |
| Requests for each key | 60 each minute |
| AI spend for each account | $5 for each calendar month (UTC) |
| Budget for each key | You set it: $0 to $100,000, for all time |

## Containers (coming soon)

| Limit | Value |
|---|---|
| Containers | 2 |
| vCPU and memory | Shared with VMs (see above) |
| Disk | None. Containers are stateless. |
| Inbound traffic | None. Workers only. |

## S3 storage (coming soon)

| Limit | Value |
|---|---|
| Size of one upload request | 100 MB. Use multipart upload for larger files. |

## Errors

- Management API: `409` with code `quota_exceeded`.
- AI API: `402 budget_exceeded` or `429 rate_limit_exceeded`.

To ask for higher limits, contact support.
