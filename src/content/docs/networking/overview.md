---
title: Networking
description: Project connectors give devices outside PMServers private access to the containers and databases you select. Tailscale (beta) and Cloudflare Tunnel. Nothing is public.
sidebar:
  order: 1
---

A connector is a small service that runs in your project. It lets devices outside PMServers reach the containers and databases that you select. You control who connects, in your own Tailscale or Cloudflare account.

## Connector kinds

| Connector | Use it for | Guide |
|---|---|---|
| Tailscale (beta) | Private access from devices on your tailnet. For example `psql` or a GUI tool on your laptop. | [Tailscale](/networking/tailscale/) |
| Cloudflare Tunnel | HTTP services on a hostname you own. TCP access to a database with `cloudflared`. | [Cloudflare Tunnel](/networking/cloudflare/) |

## Rules

- A project has at most one Tailscale connector and at most one Cloudflare connector.
- You choose which containers, databases and ports each connector can reach. The platform enforces your choice. A connector cannot reach anything else in the project.
- Nothing is public on PMServers. A connector does not give a public address to your containers or databases.
- Your tailnet ACL (Tailscale) or your Cloudflare Access policy (Cloudflare) decides who can connect.
- A connector uses compute quota while it exists, also when its containers are stopped:

| Connector | vCPU | Memory |
|---|---|---|
| Tailscale | 0.1 | 128 MiB |
| Cloudflare Tunnel | 0.05 | 128 MiB |

- A project with a connector cannot be deleted. Disable the connector first.

## Targets

A **target** is one container port or one database. A container port must be in the **Ports** list of the container. See [Private ports](/containers/private-ports/). The database uses port `5432`.

- If you remove a port that a connector uses, first remove it from the connector.
- If you delete a container or a database, its targets are removed from the connectors.

## Set up a connector

1. In the console, open **Networking**.
2. Turn on a connector. Give its key or token. PMServers stores it and does not show it again.
3. Check the containers and databases that the connector can reach.
4. Check the status. When it is **Connected**, copy the address and connect.

The same steps work with the CLI. See [Commands](/cli/commands/#networking).

```sh
pms network show
pms network tailscale enable --auth-key-file ~/.config/pms/tailscale-key
pms network expose db --via tailscale
```

## Status

| Status | Meaning |
|---|---|
| Provisioning | The connector is starting. |
| Connected | The connector has an active link to its network. |
| Disconnected | The connector runs, but it has no active link yet. Check the key or token. |
| Stopped | The connector stopped. It cannot start. Check the key or token. |
| Deleting | The connector is being deleted. |

A **Connected** status does not check your DNS, TLS, Access rules or app. Test the connection from a device.
