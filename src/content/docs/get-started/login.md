---
title: Sign in to the CLI
description: Sign in to PMServers Cloud from the pms command line.
sidebar:
  order: 2
---

Run `pms login` to start device login. The command prints a short code and opens the verification page. Sign in with GitHub, check the device code, then allow the request. The CLI saves its own session in `~/.config/pms/credentials.json`, with mode `0600`. If you updated from an older version, run `pms login` once. Older versions kept the session in the keychain, and the CLI does not read that item.

To sign in from SSH, a container, or a machine without a browser, run `pms login --no-browser`. Open the printed URL on another device and enter the code. The code expires after 10 minutes and works once.

To use email and password, run `pms login --email`. This mode needs a terminal.

The old `--port` option was removed. Device login does not start a local callback server.
