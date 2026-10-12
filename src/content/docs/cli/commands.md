---
title: Command overview
description: The pms commands for projects, members, SSH keys, containers, registry credentials, databases, AI keys, catalog, events and access.
sidebar:
  order: 3
---

This page lists the command groups. Use `pms <command> --help` for all options. Read [Sign in and choose a project](/cli/sign-in/) first.

## Projects

```sh
pms project list
pms project create <name> [--use]
pms project show
pms project rename <name>
pms project delete
pms project use <project>
pms project usage
pms project leave
```

`delete` needs a project with no resources. `leave` is for members. `usage` shows usage and limits.

## Members

```sh
pms member list
pms member invite <email>
pms member remove <email|user-id>
```

See [Project members](/get-started/members/).

## SSH keys

```sh
pms ssh-key list
pms ssh-key add <name> [--file <file> | --key <key>]
pms ssh-key delete <id>
```

`ssh-key add` reads the key from standard input if you give no key or file.

## Containers

```sh
pms container list
pms container show <container>
pms container create <name> --image <image> --size <size> [--registry-credential <cred>] [--runtime gvisor|native] [--port <port> ...] [-e KEY=VALUE ...] [--env-file <file>]
pms container edit <container> [--image ...] [--size ...] [--port <port> ... | --clear-ports] [--set-env KEY=VALUE ...] [--set-env-file <file>] [--unset-env KEY ...]
pms container edit <container> [-e KEY=VALUE ... | --env-file <file> | --clear-env]
pms container start|stop|restart|delete <container> [--wait]
pms container logs <container> [--tail N] [--previous] [--follow]
```

App edits redeploy the container. `--set-env` and `--unset-env` change only the named variables (CLI 0.4.0). `-e`, `--env-file` and `--clear-env` replace **all** variables. You cannot use both kinds in one edit. See [Containers](/containers/overview/) and [Private ports](/containers/private-ports/).

## Registry credentials

```sh
pms registry-credential list
pms registry-credential add <name> --host <host> --username <user> --token-stdin
pms registry-credential delete <credential>
```

With `--token-stdin`, the CLI reads the token from standard input. Without it, the CLI asks. See [Registry credentials](/containers/registry-credentials/).

## Databases

```sh
pms db list
pms db show <database>
pms db create <name> [--size <size>] [--vector] [--wait]
pms db delete <database> [--wait]
pms db vector on|off <database>
pms db reset-password <database>
```

The password of a new database prints one time. To connect from your computer, see [Networking](/networking/overview/).

## Networking

```sh
pms network show [--project P]
pms network tailscale enable [--auth-key-file PATH]
pms network tailscale disable
pms network cloudflared enable [--token-file PATH]
pms network cloudflared disable
pms network expose <name> [--port N] [--via tailscale|cloudflared|both] [--external-port N]
pms network unexpose <name> [--port N] [--via tailscale|cloudflared|both]
```

`show` lists both connectors, their status and each target with its address. `expose` and `unexpose` change the targets of the connectors. `<name>` is a container or a database. The default for `--via` is `both`. It applies only to the connectors that exist. For `expose`, the default for `--port` is the only port of the container. If it has more than one port, give `--port`. For `unexpose`, no `--port` removes every port of that container or database. `--external-port` works only for Tailscale.

The token or key is read from a file, or from standard input when you give no file. Never give a token as a command-line value. See [Tailscale](/networking/tailscale/) and [Cloudflare Tunnel](/networking/cloudflare/).

## AI keys

```sh
pms ai-key list
pms ai-key show <key>
pms ai-key create <name> --model <model> [--model <model> ...] --budget <usd>
pms ai-key edit <key> [--model <model> ...] [--budget <usd>]
pms ai-key rotate <key>
pms ai-key delete <key>
```

`--model` is required on create. On edit, the new list of models replaces the old list. `rotate` makes a new secret, and the old secret stops working. See [AI keys](/ai/keys/).

## Catalog

```sh
pms catalog [sizes|images|models]
```

Shows the sizes, images and AI models that you can use.

## Object storage

```sh
pms storage status
pms storage enable | disable
pms storage bucket ls | create <name> | rm <name>
pms storage key ls | create <name> [--read-only] [--bucket B ...] [--env] | reset <key-id> [--env] | rm <key-id>
```

Sign in with `pms login`. API tokens cannot use object storage. See [CLI commands for object storage](/storage/cli/).

## Events

```sh
pms events [--follow]
```

Shows recent events of the current project. With `--follow`, the CLI keeps the stream open.

## Access

```sh
pms access show
pms access request <reason>
```

Containers need approval for each account. `access show` shows the state. `access request` asks for access. Say what you want to run.
