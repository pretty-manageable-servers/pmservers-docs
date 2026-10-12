---
title: Cloudflare Tunnel
description: Publish containers and databases through a Cloudflare Tunnel in your own Cloudflare account. Protect them with Cloudflare Access.
sidebar:
  order: 3
---

A Cloudflare connector runs the `cloudflared` client in your project. The client joins a tunnel that you create in your Cloudflare account. You set the hostnames, DNS, HTTPS and access rules in Cloudflare. PMServers stores only the connector token.

## 1. Make a tunnel in Cloudflare

In your Cloudflare account, create a **remotely managed** tunnel. Use a dedicated tunnel. Any other connector on that tunnel can also receive its traffic.

Copy the connector token that Cloudflare shows. It lets the connector join the tunnel. It does not let PMServers change your hostnames, DNS, HTTPS or Access rules.

## 2. Turn on the connector

In the console, open **Networking**, then the **Cloudflare Tunnel** card. Paste the token and select **Enable**.

With the CLI, save the token in a private file and give the file. Do not put the token on the command line:

```sh
chmod 600 ~/.config/pms/tunnel-token
pms network cloudflared enable --token-file ~/.config/pms/tunnel-token
```

To use standard input, run `pms network cloudflared enable` with no flag and pipe the token to it.

To replace the token, turn the connector on again with the new token. To turn it off:

```sh
pms network cloudflared disable
```

## 3. Choose the services

In **Networking**, check each container port or database that the connector can reach. With the CLI:

```sh
pms network expose web --port 3000 --via cloudflared
pms network expose db --via cloudflared
```

The console and `pms network show` list the origin for each service:

| Service | Origin |
|---|---|
| Container | `http://<container name>:<port>` |
| Database | `tcp://<database service>:5432` |

## 4. Add public hostnames in Cloudflare

In your tunnel, add a public hostname for each service. Set the service to the origin that PMServers shows.

- For a container, use an HTTP origin, for example `http://web:3000`.
- For a database, use a TCP origin, for example `tcp://<database service>:5432`.

Use Cloudflare Access to protect each hostname. Add a policy that allows only the people who must connect. Without an Access policy, anyone who can reach the hostname can try to connect.

The app must listen on `0.0.0.0` at the port. See [Private ports](/containers/private-ports/).

## 5. Connect

- **HTTP service**: open the hostname in a browser. If you set an Access policy, Cloudflare asks you to sign in.
- **Database**: the client needs `cloudflared` on its computer. Start a local port to the hostname, then connect to the local port:

```sh
cloudflared access tcp --hostname db.example.com --url localhost:5432
```

```
postgres://app:<password>@localhost:5432/app
```

Keep the `cloudflared access tcp` command running while you connect.

## Status and limits

- **Connected** means `cloudflared` has an active connection to Cloudflare. It does not check your DNS, TLS, Access rules or origin.
- The connector uses 0.05 vCPU and 128 MiB. See [Networking](/networking/overview/#rules).
- PMServers does not see your Cloudflare account. Cloudflare keeps the hostnames, DNS and Access rules.
- If a token leaks, revoke it in Cloudflare. Then turn on the connector again with a new token. An old session can stay open for a short time after you revoke a token.

## Problems

- **Status is Stopped**: the token is wrong or the tunnel was deleted. Check the token in Cloudflare. Turn on the connector again.
- **Status is Disconnected**: the connector has no connection to Cloudflare yet. Wait a minute. If it stays, check the token.
- **502 or 504 from the hostname**: the origin is wrong, or the app does not listen on the port. Check the origin in the hostname settings.
