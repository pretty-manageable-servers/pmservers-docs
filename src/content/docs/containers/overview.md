---
title: Containers
description: Worker containers with project-private ports and optional managed Cloudflare Tunnel access. No disk. linux/amd64 images, run as a non-root user, on gVisor. Each account needs approval.
sidebar:
  order: 1
---

## Get access

Containers need approval for each account.

1. In the console, open **Containers**.
2. Write why you need containers, then select **Request access**.
3. The PMServers team reads your request. When they approve it, the console sets up your container space. This takes about 1 minute.

If the team rejects the request, the console shows their note. You can request again.

In a shared project, the **project owner's** account must have access. A member sees "The project owner must request access." See [Project members](/get-started/members/).

## Workers only

A container is a **worker**. It runs all the time.

- No public address by default. An optional [managed Cloudflare Tunnel](/containers/managed-tunnels/) can expose an HTTP or WebSocket service through a hostname you configure in your Cloudflare account.
- Optional private ports: other containers in the **same project** can connect. See [Private ports](/containers/private-ports/).
- Good for: a Discord bot, a queue worker, a scheduled job runner, a helper service for another container.
- A public website or HTTP API needs a [managed Cloudflare Tunnel](/containers/managed-tunnels/); the container has no public address by default.

## Create a container

In the console, open **Containers**, then select **Create container**. Give:

| Field | Rule |
|---|---|
| Name | Lowercase letters, digits and `-`. It starts with a letter. 63 characters at most. Unique in the project. |
| Image | For example `ghcr.io/owner/app:1.0`. With no host, the image is from Docker Hub (`docker.io`). |
| Size | 0.25 vCPU / 512 MiB, or 0.5 vCPU / 1 GiB. |
| Registry credential | Optional. Only for a private image. See [Registry credentials](/containers/registry-credentials/). |
| Ports | Optional. 5 at most, from 1 to 65535. Used for project networking and as an origin for a managed tunnel. See [Private ports](/containers/private-ports/). |
| Managed Cloudflare Tunnel | Optional. Provide a remotely managed tunnel token and one declared port. See [Managed tunnels](/containers/managed-tunnels/). |
| Environment variables | Optional. 50 at most, 32 KiB in total. Names: letters, digits and `_`, not a digit first. |

After you save a variable, nobody can read its value again, also not in the console. The console shows only the names.

## Images

- Images must be `linux/amd64`. On an Apple Silicon Mac, build with `docker build --platform linux/amd64`.
- The container runs as user `1000`, not as root. Your app must not need root, and it must not write to folders that only root can write to.

## States

| State | Meaning |
|---|---|
| Provisioning | The container is starting, or it restarts after a change. |
| Running | The container runs. |
| Stopped | You stopped it. It uses no vCPU. |
| Failed | The container stops at once or crashes. The console shows the reason. |
| Deleting | The container is being deleted. |
| Unknown | We cannot get the state now. Try again in a minute. |

## Change a container

- **Stop**, **Start** and **Restart** are in the container's side panel.
- **Edit** changes the image, size, registry credential, ports, environment variables or tunnel attachment. App changes restart the container; tunnel changes restart only the connector.
- To change environment variables, you change only the variables that you want. In the edit form, each variable has a row. Type a value to change it. Leave the value empty to keep it. Select **Remove** to delete a variable. Select **Add variable** to add a new one. The other variables keep their values.
- With the `pms` CLI, use `pms container edit <name> --set-env KEY=VALUE --unset-env KEY`. Repeat a flag for more variables. `--env` and `--env-file` replace **all** variables.

## Logs

The side panel shows the last 200 lines of the log, and refreshes them. If the container crashed, select **Previous run** to see the log of the run before the crash.

## Stateless

There is no disk. **A restart or a redeploy deletes all files in the container.** Keep data in your own database or in object storage.

## Limits

| Limit | Value |
|---|---|
| Containers for each account | 2 |
| Sizes | 0.25 vCPU / 512 MiB, or 0.5 vCPU / 1 GiB |
| Quota | Containers use the same vCPU and memory quota as VMs (2 vCPU, 4 GiB on the free tier). |

See [Limits](/billing/limits/).

## gVisor

Containers run in the gVisor sandbox. Most apps work: Node.js, Python, Go, Java.

- Apps that use `io_uring`, eBPF, raw kernel features or `ptrace` can fail.
- Heavy disk or network work can be 10 to 30% slower.

If your app does not work on gVisor, ask support for native containers. The team approves each account. On an approved account, you select **gVisor** or **Native** for each container. gVisor is the default.

## Network

A container can connect to:

- The public internet.
- Containers and databases in the **same project**. See [Private ports](/containers/private-ports/).

An attached tunnel connector can reach **any service in its project**. Use a separate project to limit this.

A container cannot connect to a container or database in another project, also if both are in your account. VMs cannot connect to containers.
