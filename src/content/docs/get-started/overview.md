---
title: Overview
description: Accounts, projects, the region, and the free tier limits.
sidebar:
  order: 1
---

PMS Cloud is a small cloud provider. You manage everything in the console at `https://console.pmservers.org`.

## Accounts

- Sign-ups are closed. You need an invite.
- You sign in with GitHub or with email.

## Projects

- A project holds VMs and AI keys.
- You can make more than one project.
- You can invite other people to a project. See [Project members](/get-started/members/).
- To delete a project, first delete its VMs and AI keys. Only the owner can delete a project.

## Region

There is one region: `ca-tor-1` (Toronto, Canada). All projects use it.

## Free tier limits

The limits apply to your whole account, not to each project. Usage in a project that you own counts against your account, also when a member creates it.

| Resource | Limit |
|---|---|
| VMs | 1 |
| vCPU, all VMs together | 2 |
| Memory, all VMs together | 4 GiB |
| Disk for each VM | 10 to 20 GB |
| AI keys | 5 |
| AI spend | $5 for each calendar month (UTC) |
| Saved SSH keys | 20 |

See [Limits](/billing/limits/) for all limits.

## Next steps

- [Create your first VM](/get-started/first-vm/)
- [Make your first AI request](/get-started/first-ai-request/)
