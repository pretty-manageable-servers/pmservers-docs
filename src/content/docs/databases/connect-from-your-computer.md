---
title: Connect from your computer
description: Use pms db connect to open a local port to a database through the SSH jump host. No public address.
sidebar:
  order: 3
---

Use the [PMS CLI](/cli/install/) to connect to a database from your computer, for example with `psql` or a GUI tool. The database stays private. The CLI opens a local port that goes through the SSH jump host.

## What you need

- The `pms` CLI, signed in. See [Install the CLI](/cli/install/) and [Sign in](/cli/sign-in/).
- A running database.
- An SSH key: a key saved on your account (`pms ssh-key add`), or a key that you gave to a VM.
- The database password. We show it one time when you create the database. If you lost it, run `pms db reset-password <database>`. A reset ends all open connections.

All members of the project can connect.

## Connect

```sh
pms db connect mydb
```

The CLI prints the local address and a connection URL:

```
Listening on localhost:5432
postgres://app:<password>@localhost:5432/app
```

Put the database password in place of `<password>`. Then use the URL with any Postgres client:

```sh
psql "postgres://app:<password>@localhost:5432/app"
```

Press Ctrl-C to stop. The CLI closes the tunnel and the local port.

## Options

| Option | Meaning |
|---|---|
| `--port <N>` | The local port. Default: `5432`. Use it when that port is in use. |
| `-i`, `--identity <file>` | The private key file. Use it when `ssh` does not find your key. The key must be one that you saved or gave to a VM. |
| `--project <project>` | The project of the database. Default: your default project. |

## How it works

- The CLI starts `ssh` with a local port forward to the database. The traffic goes through the jump host `jump.pmservers.org`.
- The jump host needs `cloudflared`. If it is missing, the CLI asks, then downloads a pinned version and checks its SHA-256. `--yes` skips the question.
- The CLI trusts the key of the jump host on first use. A changed key is refused.
- The local port listens on `127.0.0.1` only. Other computers cannot use it.

## Limits

- It works only where the CLI runs. Hosted apps cannot use it. An app in a container uses the [private connection](/databases/connect/).
- The CLI must stay open. When you press Ctrl-C, the connection ends.

## Problems

- **Permission denied (publickey)**: the key is not saved on your account and not a VM key. Add it with `pms ssh-key add`, or give it with `-i`.
- **Address already in use**: the local port is in use. Give another port with `--port`.
- **password authentication failed**: the password is wrong or was reset. Run `pms db reset-password <database>`.
