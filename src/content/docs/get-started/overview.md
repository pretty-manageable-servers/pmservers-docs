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

- A project holds containers, databases and AI keys.
- You can make more than one project.
- You can invite other people to a project. See [Project members](/get-started/members/).
- To delete a project, first delete its containers, databases and AI keys. Only the owner can delete a project.

## Region

There is one region: `ca-tor-1` (Toronto, Canada). All projects use it.

## Free tier limits

The limits apply to your whole account, not to each project. Usage in a project that you own counts against your account, also when a member creates it.

| Resource | Limit |
|---|---|
| vCPU, all containers and databases together | 2 |
| Memory, all containers and databases together | 4 GiB |
| AI keys | 5 |
| AI spend | $3 for each calendar month (UTC) |
| Saved SSH keys | 20 |

See [Limits](/billing/limits/) for all limits.

## Next steps

- [Create your first container](/containers/overview/)
- [Make your first AI request](/get-started/first-ai-request/)
