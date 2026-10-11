---
title: Changelog
description: Changes to PMS Cloud, newest first. We release changes when they are ready, so each entry has a date, not a version.
---

PMS Cloud changes all the time. We release a change when it is ready. Each entry has the date it went live, newest first.

## 2026-10-11

### Dashboard navigation on mobile

We fixed bugs with the dashboard on mobile. Before, on a narrow screen, some sections were off the side of the screen and you could not easily get to them.

- When the sections do not fit on one line, the dashboard shows a menu button. The menu has all sections, Docs, and Change theme.
- Each section now has an icon.

### Managed Cloudflare Tunnels (beta)

You can now publish a container through a Cloudflare Tunnel in your own Cloudflare account. Create a remotely managed tunnel in Cloudflare, set its origin to the URL that PMS shows, and give PMS only the connector token. PMS runs the `cloudflared` connector beside your container and shows if it is connected.

- Set it in the dashboard, or with `pms container create` or `pms container edit` and `--tunnel-port` with `--tunnel-token-file` or `--tunnel-token-stdin` (CLI 0.6.0).
- Each connector uses 0.05 vCPU and 128 MiB of your compute limit while it is attached.
- The tunnel can reach any service in the same project. Use a separate project to limit this.

This feature is in beta. Tell us if something does not work. See [Managed Cloudflare Tunnels](/containers/managed-tunnels/).

## 2026-10-10

### CLI sign-in with a code

`pms login` now uses device login (CLI 0.5.0). The CLI prints a short code and opens the sign-in page. Sign in with GitHub and allow the code. This also works over SSH and in containers: run `pms login --no-browser` and open the URL on another device.

- `--port` is removed. The CLI no longer starts a local server for the sign-in.
- `pms login --email` does not change.

See [Sign in and choose a project](/cli/sign-in/).

### AI key budget limit

The budget of an AI key can no longer be more than the monthly AI budget of your account. If you create or edit a key with a higher budget, the API returns `validation_error`. Keys made before this change keep their budget.

### AI gateway errors during an outage

If the AI gateway cannot check your key because of an internal problem, it now returns `503`. Before, it could return `401`, which looked like a bad key. Try again later when you get `503`.

### Edit single environment variables

You can now change one environment variable of a container without typing the others again.

- In the console, the edit form shows a row for each variable. Type a value to change it. Select **Remove** to delete it. Select **Add variable** to add one. The other variables keep their values.
- The CLI has `pms container edit <name> --set-env KEY=VALUE --unset-env KEY` (CLI 0.4.0). `--env` still replaces all variables.
- API: `env_set` and `env_unset` on update. `env` still replaces all.

See [Containers](/containers/overview/).

### PMS CLI

The `pms` command-line tool is out. It is open source (MIT).

- Install from the GitHub releases page: macOS (arm64, x86_64) and Linux (x86_64, arm64).
- `pms login` signs in with GitHub in the browser. The session is in the OS keychain.
- It covers projects, members, VMs, SSH keys, containers, registry credentials, databases, AI keys, the catalog, events and access.
- `pms vm ssh` connects to a VM through the jump host.

See [Install the CLI](/cli/install/) and the [command overview](/cli/commands/).

### Connect to a database from your computer

`pms db connect` opens a local port to a database through the SSH jump host. Use it with `psql` or any Postgres client. The database stays private. All project members can connect. See [Connect from your computer](/databases/connect-from-your-computer/).

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
