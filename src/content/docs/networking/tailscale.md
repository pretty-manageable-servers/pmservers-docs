---
title: Tailscale
description: Connect to your containers and databases from devices on your Tailscale tailnet. Beta.
sidebar:
  order: 2
  badge: Beta
---

:::caution[Beta]
The Tailscale connector is in beta. Tell us if something does not work.
:::

A Tailscale connector joins your tailnet as one device. Your devices reach the selected services through that device. You need a Tailscale account, and a device on the tailnet that runs the client.

## 1. Make an auth key

In the Tailscale admin console, open **Settings**, then **Keys**. Select **Generate auth key**. Set:

| Setting | Value |
|---|---|
| Reusable | On |
| Ephemeral | On |
| Tags | One tag, for example `tag:pms`. The tag must be in your tailnet policy file, under `tagOwners`. |

Copy the key. It starts with `tskey-`. Tailscale shows it one time.

## 2. Turn on the connector

In the console, open **Networking**, then the **Tailscale** card. Paste the key and select **Enable**.

With the CLI, save the key in a private file and give the file. Do not put the key on the command line:

```sh
chmod 600 ~/.config/pms/tailscale-key
pms network tailscale enable --auth-key-file ~/.config/pms/tailscale-key
```

To use standard input, run `pms network tailscale enable` with no flag and pipe the key to it.

To replace the key, turn the connector on again with the new key. To turn it off:

```sh
pms network tailscale disable
```

## 3. Choose the services

In the **Networking** page, check each container port or database that Tailscale can reach. Each service has an external port. The default external port is the service port.

With the CLI:

```sh
pms network expose web --port 3000 --via tailscale
pms network expose db --via tailscale
```

## 4. Check the connector

Run `pms network show`, or open **Networking** in the console. The Tailscale status must be **Connected**. The address appears when the connector knows its tailnet name.

## 5. Connect

The address has this form:

```
<project>.<tailnet>.ts.net:<external port>
```

Use the address that the console shows. Example for the database:

```
postgres://app:<password>@<project>.<tailnet>.ts.net:5432/app
```

Use the database password from when you created the database. Use the external port that the console shows.

### Two services on one port

Two services cannot use the same external port. If a container and the database both use port `5432`, set a different external port for one of them. For example, set the container to `5433`:

```sh
pms network expose api --port 5432 --via tailscale --external-port 5433
```

Then connect to `<project>.<tailnet>.ts.net:5433`.

## Access and limits

- Your tailnet ACL decides which devices can connect to the connector. Set the ACL in the Tailscale admin console.
- PMServers does not set subnet routes or an exit node. The connector gives access only to the services that you select. It does not give access to your project network.
- The connector uses 0.1 vCPU and 128 MiB. See [Networking](/networking/overview/#rules).

## Problems

- **Status is Stopped**: the key is wrong, expired, used up or has no tag in the policy file. Make a new key, then turn on the connector again.
- **Status is Disconnected**: the connector has no link to Tailscale yet. Wait a minute. If it stays, check the key.
- **No address**: the connector has not learned its tailnet name yet. Wait for the status to be **Connected**.
- **Connection times out**: check that your device is on the tailnet, that the ACL allows it, and that the service is in the selected list. Check the external port.
