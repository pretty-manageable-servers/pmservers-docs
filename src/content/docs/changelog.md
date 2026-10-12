---
title: Changelog
description: Changes to PMS Cloud, newest first. We release changes when they are ready, so each entry has a date, not a version.
---

PMS Cloud changes all the time. We release a change when it is ready. Each entry has the date it went live, newest first.

## 2026-10-12

### Email when your limits change

When the PMServers team changes a limit of your account (vCPU, memory, AI budget, AI keys, containers, databases, database storage or sandboxes), you get an email. It gives the old and the new value of each limit that changed. If a limit is now lower than your use, your running resources keep running. Only new creates are blocked. See [Limits](/billing/limits/).

### Terminated accounts

The PMServers team can terminate an account. You get an email with the reason. The API then refuses all requests of the account with `403` and the code `account_terminated`. All resources of the account are deleted, then the sign-in is deleted. You can sign up again with the same email, but nothing comes back. See [Management API errors](/api/overview/#management-api-errors).

### AI prompting guidelines

New page: [Prompting guidelines](/ai/prompting/). It gives the context window and max output of `nimbus` (200K and 50K tokens) and `cirrus` (64K and 32K tokens). It also tells you how to keep the system prompt small, send tools as tool schemas, not cut off the output with a low `max_tokens`, send tool errors back to the model so it can try again, and convert JSON data to short text before you send it.

### CLI v0.9.0: session in a file, no keychain

The `pms` CLI no longer uses the OS keychain. It keeps your session in `~/.config/pms/credentials.json`, with mode `0600`. On macOS, this stops the keychain prompts.

After you update, run `pms login` one time. The CLI does not read the old keychain item. You can delete the `pms-cli` item in Keychain Access.

Get it from [GitHub releases](https://github.com/pretty-manageable-servers/pmservers-cli/releases/tag/v0.9.0). See [Sign in](/cli/sign-in/).

### Sandbox templates and warm pool

You can now build your own sandbox image, called a template, with the official `e2b` SDK. Start a sandbox from it with its name:

```python
Template.build(template, "my-site")
sbx = Sandbox.create("my-site")
```

A template can have packages, files, environment variables, a start command and a ready check. Use `name:tag` to keep more than one version.

A warm pool keeps sandboxes of a template ready. A create from a template takes about 2.5 to 3 seconds when a warm sandbox is free, and about 13 seconds when none is free.

Not supported yet: tag routes in the API, private base image registries, public templates and template commands in the `pms` CLI.

See [Templates](/sandboxes/templates/) and [Warm pool](/sandboxes/warm-pool/).

## 2026-10-11

### VM service removed

The VM service is removed. Use containers, databases or sandboxes instead:

- [Containers](/containers/overview/)
- [Databases](/databases/overview/)
- [Sandboxes](/sandboxes/overview/)

The `pms vm` commands are removed from the CLI.

### New model names

The models have new IDs. The old IDs still work until 2026-11-10. After that date, the old IDs stop working. Use the new IDs. Responses show the new ID.

| Old ID | New ID | Name |
|---|---|---|
| `qwen3.8-flash-next` | `nimbus` | Nimbus |
| `gemma4-e4b` | `cirrus` | Cirrus |
| `embeddinggemma2` | `stratus` | Stratus |
| `kev` | `vane` | Vane |

The page for `kev` is now at [Vane](/ai/vane/). The old link `/ai/kev/` goes to the new page.

### Speech to text and text to speech models

Two new audio models are in the AI API.

- `squall` (speech to text): `POST /ai/v1/audio/transcriptions`. PCM WAV files only, up to 25 MB and 300 seconds.
- `thunder` (text to speech): `POST /ai/v1/audio/speech`. The answer is a WAV file. Up to 4096 characters for each request.

Audio is billed per minute (`squall`) or per character (`thunder`). See [AI API reference](/api/ai/) and [Models and prices](/ai/models/).

### API calls from CI and servers

Calls to `api.pmservers.org` from GitHub Actions and other servers in data centers now work. Before, Cloudflare sent these calls a browser check, and `pms` got `403` after sign-in worked.

### Shared rate limits

The API now has a request limit for each user: 600 requests in one minute, for your sign-in session and all your API tokens together. After that, the API returns `429 rate_limited` for one minute. The limit of 10 bad tokens from one IP address in one minute now applies to the whole API. Before, each server counted alone. See [API tokens](/api/tokens/) and [Limits](/billing/limits/).

### Sandboxes and API tokens in the dashboard

- A new **Sandboxes** page shows the running sandboxes of a project. You can stop a sandbox there. If you have none, the page shows how to start one.
- A new **API tokens** tab in project settings. Create a token (it is shown one time), see your tokens, and revoke them.

### Sandboxes (beta)

You can now run code in sandboxes on PMS Cloud. The sandbox API is compatible with E2B, so you use the official `e2b` SDK for Python or JavaScript. Change only three environment variables:

- `E2B_API_KEY`: a PMS API token (see below).
- `E2B_API_URL=https://api.pmservers.org/sandboxes`
- `E2B_SANDBOX_URL=https://sandbox.pmservers.org`

Each sandbox has 0.5 vCPU and 512 MiB, runs on gVisor, and has internet access. You can run 4 sandboxes at the same time. Your account must be approved. The first sandbox of your account can take up to about 35 seconds and can return `503` while your sandbox space starts. Retry.

Not supported yet: pause and resume, snapshots, fork, templates, volumes, logs and metrics, and custom network rules. Sandboxes are free in the beta.

See [Sandboxes](/sandboxes/overview/).

### API tokens

You can now make project API tokens (`pms_...`) for CI and for sandboxes. A token works for one project only. It is shown one time. You can set an expiry or none.

- `pms token create`, `pms token list` and `pms token revoke` (CLI 0.7.0).
- Set `PMS_TOKEN` to use a token with the CLI, for example in CI.
- A token cannot manage tokens, SSH keys, members, AI keys, or create or delete projects.

See [API tokens](/api/tokens/).

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
