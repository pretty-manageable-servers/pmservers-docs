---
title: Sign in and choose a project
description: Sign in with pms login (device login with GitHub), choose a default project, and get JSON output for scripts.
sidebar:
  order: 2
---

## Sign in

```sh
pms login
```

The command prints a short code and opens the sign-in page. Sign in with GitHub, check that the code is the same, then allow the request. The CLI then has its own session. The code expires after 10 minutes and works once. It saves the session in `~/.config/pms/credentials.json` with mode `0600`. The CLI does not use the OS keychain, so it does not ask for keychain access. If an older version saved the session in the keychain, the CLI moves it to that file the first time it finds no session file.

| Option | Use |
|---|---|
| `--no-browser` | Print the sign-in URL and the code, and do not open the browser. Use this over SSH or in a container, and open the URL on another device. |
| `--email` | Sign in with email and password. The CLI asks for both in the terminal. |

Check who you are:

```sh
pms whoami
```

Sign out and remove the saved session:

```sh
pms logout
```

`pms logout` does not sign you out of the console.

## Choose a project

Most commands work in one project. Give it with `--project <ID or name>`, or save a default:

```sh
pms project list
pms project use my-project
```

`pms project use` saves the default in `~/.config/pms/config.toml`. You can also set the `PMS_PROJECT` environment variable.

To make a project and use it at once:

```sh
pms project create my-project --use
```

## Output formats

The default output is a table. For scripts, use JSON:

```sh
pms container list -o json
```

You can also set `PMS_OUTPUT=json`.

## Other options

| Option | Meaning |
|---|---|
| `--yes`, `-y` | Do not ask for confirmation. A delete asks first. Without a terminal, a delete fails unless you pass `--yes`. |
| `--wait` | On create and on actions: wait until the resource is ready. `--timeout <seconds>` sets the limit. The default is 600. |
| `--api-url` | The API address. Default: `https://api.pmservers.org`. Also `PMS_API_URL`. |

A secret prints one time: an AI key secret, or a database password. The API does not show it again. Copy it when it prints.

Use `pms <command> --help` to see all options of a command.
