---
title: Managed Cloudflare Tunnels
description: Expose a container through a Cloudflare Tunnel you control.
sidebar:
  order: 4
---

PMS can run one `cloudflared` connector beside a container. Use this to publish an HTTP or WebSocket service without giving PMS access to your Cloudflare account.

## Configure Cloudflare

1. Create a **remotely managed tunnel** in your Cloudflare account. Use a dedicated tunnel; any other connector attached to that tunnel can also receive its traffic.
2. Add a public hostname route in Cloudflare for the hostname you want. Set its service to the origin shown by PMS, for example `http://web:3000`. Cloudflare manages the route, DNS and HTTPS. Add a Cloudflare Access policy there if you want one.
3. Copy the tunnel's connector token. PMS needs only that token and the origin port. The token lets a connector join the tunnel; it does not let PMS change hostnames, DNS, HTTPS or Access policies.

## Attach it to a container

In **Create container** or **Edit**, declare the app's port under **Ports**, select it as the tunnel origin port and enter the connector token. PMS encrypts the token and never shows it again. Use the same steps to replace the token.

The app must listen on `0.0.0.0` at that port. Its suggested origin is `http://<container-name>:<port>`. The selected port is a setup convenience, not an access boundary: the connector can reach any service in the same project. Use a separate project to limit this.

The CLI accepts the token from standard input or a private file, never as an argument:

```sh
chmod 600 ~/.config/pms/tunnel-token
pms container create web --image ghcr.io/owner/web:1.0 --size pms-c-250m-512 \
  --port 3000 --tunnel-port 3000 --tunnel-token-file ~/.config/pms/tunnel-token
```

Use `--tunnel-token-stdin` to read from a secret manager or a pipe. In an edit, `--tunnel-token-file` or `--tunnel-token-stdin` replaces the token, `--tunnel-port` changes the origin port, and `--detach-tunnel` removes the PMS connector and its stored token.

## Status and lifecycle

PMS reports the connector as provisioning, connected, disconnected, stopped or unknown, with an observation time when available. Connected means `cloudflared` has an active Cloudflare edge connection. It does not confirm the hostname's DNS, TLS or origin health.

The connector starts and stops with its container. Editing only the tunnel does not restart the app. Detaching or deleting the container removes the PMS connector and stored token; Cloudflare tunnel resources remain in your account. Revoke a compromised token in Cloudflare and replace the token in PMS. Revocation or rotation may not terminate existing sessions immediately.

The connector reserves 0.05 vCPU and 128 MiB from your compute allowance while attached, including while stopped. It does not use a container-count slot.
