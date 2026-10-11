---
title: Command overview
description: The pms commands for projects, members, VMs, SSH keys, containers, registry credentials, databases, AI keys, catalog, events and access.
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

## VMs

```sh
pms vm list
pms vm show <vm>
pms vm create <name> --size <size> --image <image> [--disk-gb N] (--ssh-key <key> | --public-key-file <file> | --generate-key [--key-out <file>]) [--wait]
pms vm start|stop|restart|delete <vm> [--wait]
pms vm metrics <vm>
pms vm console <vm>
pms vm ssh <vm> [-i <key>] [-u <user>] [-- <ssh args>]
pms ssh-config [--jump-host <host>]
```

- `vm create` needs one SSH key option. `--generate-key` makes a new ed25519 key on your computer and sends only the public key. The private key goes to `~/.ssh/pms_<name>_ed25519`, or to `--key-out`.
- `vm console` opens the serial console. Press Ctrl-] to leave.
- `vm ssh` connects through the jump host. See [Connect with SSH](/vms/ssh/).
- `ssh-config` prints an SSH config for the jump host and your VMs.

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
pms container create <name> --image <image> --size <size> [--registry-credential <cred>] [--runtime gvisor|native] [--port <port> ...] [--tunnel-port <port> (--tunnel-token-file <file> | --tunnel-token-stdin)] [-e KEY=VALUE ...] [--env-file <file>]
pms container edit <container> [--image ...] [--size ...] [--port <port> ... | --clear-ports] [--tunnel-port <port>] [--tunnel-token-file <file> | --tunnel-token-stdin | --detach-tunnel] [--set-env KEY=VALUE ...] [--set-env-file <file>] [--unset-env KEY ...]
pms container edit <container> [-e KEY=VALUE ... | --env-file <file> | --clear-env]
pms container start|stop|restart|delete <container> [--wait]
pms container logs <container> [--tail N] [--previous] [--follow]
```

App edits redeploy the container; managed tunnel edits replace only its connector. Tunnel tokens must come from standard input or a private file (mode 0600 or stricter), never a command-line value. `--set-env` and `--unset-env` change only the named variables (CLI 0.4.0). `-e`, `--env-file` and `--clear-env` replace **all** variables. You cannot use both kinds in one edit. See [Containers](/containers/overview/), [Private ports](/containers/private-ports/) and [Managed Cloudflare Tunnels](/containers/managed-tunnels/).

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
pms db connect <database> [--port N] [-i <key>]
```

The password of a new database prints one time. `db connect` opens a local port to the database. See [Connect from your computer](/databases/connect-from-your-computer/).

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
