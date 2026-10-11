---
title: Private ports
description: Open up to 5 TCP ports on a container. Other containers in the same project connect to NAME:PORT. Ports can also be origins for a managed Cloudflare Tunnel.
sidebar:
  order: 3
---

A container can open **private ports**. Use them when one container must call another one, for example a bot that calls a search worker. The same declared port can be selected as an origin for a [managed Cloudflare Tunnel](/containers/managed-tunnels/).

## Open a port

1. In the console, open **Containers**.
2. Select **Create container**, or select **Edit** on a container.
3. In **Ports**, enter the port numbers with commas. Example: `8080, 9000`.
4. Save. An edit restarts the container.

Rules:

- 5 ports at most for each container.
- Each port is from 1 to 65535. A port is in the list one time.
- TCP only.

To remove all ports, make the **Ports** field empty and save.

With the CLI:

```
pms container create api --image ghcr.io/owner/api:1.0 --size pms-c-250m-512 --port 8080 --port 9000
pms container edit api --port 8080
pms container edit api --clear-ports
```

In an edit, `--port` replaces all ports. `--clear-ports` removes all ports.

With the API, send `ports` as a list of numbers. In an update, `"ports": []` removes all ports. If you do not send `ports`, the ports stay the same.

## Connect to a port

A container with ports gets an internal name. The name is the container name. The container page shows it as **Internal address**. The API returns it as `internal_host`.

Other containers in the same project connect to `<internal_host>:<port>`. Example: the container `search` has port `8080`. Another container in the project uses:

```
http://search:8080
```

A container with no ports has no internal name. `internal_host` is `null`.

## Same project only

A private port is reachable only from other containers in the **same project**.

| From | Can connect? |
|---|---|
| A container in the same project | Yes |
| A managed tunnel connector attached to a container in the project | Yes, to any service in that project |
| A container in another project, also in your account | No |
| Your computer or the internet | No |

A container name that has ports must be different from the name of a database in the same project.

The same rule is true for databases. See [Databases](/databases/overview/#private-access-only).

## Problems

- The name does not resolve, or the connection times out: check that both containers are in the same project, and that the port is in the **Ports** list.
- The connection is refused: your app must listen on the port. Listen on `0.0.0.0`, not on `127.0.0.1`.
- Right after a container starts, the first connection can fail for a few seconds. Retry.
