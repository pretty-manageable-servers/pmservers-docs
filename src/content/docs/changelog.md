---
title: Changelog
description: Changes to PMS Cloud, newest first. We release changes when they are ready, so each entry has a date, not a version.
---

PMS Cloud changes all the time. We release a change when it is ready. Each entry has the date it went live, newest first.

## 2026-10-10

### Container private ports

A container can now open up to 5 private TCP ports.

- Set **Ports** when you create or edit a container. The CLI has `--port` and `--clear-ports`.
- Other containers in the **same project** connect to `<name>:<port>`. The container page shows the internal address.
- No public address. VMs and other projects cannot connect.
- API: `ports` on create and update, and `ports` and `internal_host` in the container.

### Databases: same project only

A database can now be reached only from containers in the **same project**. Before, containers in any project of the account could connect. If a container in another project uses a database, move one of them to the same project.

See [Private ports](/containers/private-ports/) and [Databases](/databases/overview/).

### Free AI budget is now $3

The free tier AI budget is now $3 for each account, each calendar month (UTC). Before, it was $5. If your account spent $3 or more this month, AI requests return `402 budget_exceeded` until the 1st of next month.

### Databases

You can now make Postgres databases.

- Postgres 18. Select **Enable vector** to turn on pgvector.
- No approval needed. 1 database and 1 GiB of storage for each account.
- Private access only: the containers of your account can connect. No public address.
- The password is shown one time. **Reset password** makes a new one.
- At the storage limit, the database is read-only. At 150%, connections are blocked.
- No backups. Use `pg_dump` to keep your own copy.
- API: `/v1/projects/{project_id}/databases`.
- A project with a database cannot be deleted. Delete the databases first.

See [Databases](/databases/overview/).

### Containers

You can now run worker containers.

- Each account needs approval. Request access on the **Containers** page in the console.
- A container is a worker: no inbound traffic and no disk. Images must be `linux/amd64` and run as a non-root user.
- 2 containers for each account. They use the same vCPU and memory quota as VMs.
- Containers run in the gVisor sandbox. The team can allow native containers for an account.
- Private images: add a registry credential in **Settings**. The token is write-only.
- Logs, environment variables (values hidden), stop, start, restart and edit in the console.
- API: `/v1/account/access`, `/v1/registry-credentials` and `/v1/projects/{project_id}/containers`.
- A project with containers cannot be deleted. Delete the containers first.

See [Containers](/containers/overview/) and [Registry credentials](/containers/registry-credentials/).

## 2026-10-09

### Project members

You can now invite other people to a project.

- The owner invites a person by email in **Settings**. If the person has no account, they get an email to set up a sign-in.
- Members can do all that the owner can, but they cannot delete the project or change the members.
- A member can leave a project. The owner can remove a member. VMs and API keys in the project stay.
- Usage in a shared project counts against the owner's limits.
- Shared projects show **Shared** in the project switcher.
- API: `GET` and `POST /v1/projects/{project_id}/members`, and `DELETE /v1/projects/{project_id}/members/{user_id}`. Each project now has a `role` field.

See [Project members](/get-started/members/).
