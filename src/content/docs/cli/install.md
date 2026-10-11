---
title: Install the CLI
description: Install pms, the PMS Cloud command-line tool, from a GitHub release archive for macOS or Linux.
sidebar:
  order: 1
---

`pms` is the PMS Cloud command-line tool. It does what the console does: projects, containers, databases and AI keys.

The CLI is open source under the MIT license. The code is at [github.com/pretty-manageable-servers/pmservers-cli](https://github.com/pretty-manageable-servers/pmservers-cli).

## Download

Get the archive for your system from the [releases page](https://github.com/pretty-manageable-servers/pmservers-cli/releases).

| System | Archive |
|---|---|
| macOS, Apple silicon | `pms-<tag>-aarch64-apple-darwin.tar.gz` |
| macOS, Intel | `pms-<tag>-x86_64-apple-darwin.tar.gz` |
| Linux, x86_64 | `pms-<tag>-x86_64-unknown-linux-gnu.tar.gz` |
| Linux, arm64 | `pms-<tag>-aarch64-unknown-linux-gnu.tar.gz` |

`<tag>` is the release tag, for example `v0.3.1`.

With the GitHub CLI:

```sh
gh release download --repo pretty-manageable-servers/pmservers-cli --pattern 'pms-*-aarch64-apple-darwin.tar.gz'
```

## Check the download

Each release has a file `SHA256SUMS`. Download it too, then check the archive:

```sh
sha256sum --check --ignore-missing SHA256SUMS
```

On macOS, use `shasum -a 256 --check --ignore-missing SHA256SUMS`.

The macOS binaries are not signed or notarized.

## Put pms on your PATH

```sh
tar -xzf pms-*-aarch64-apple-darwin.tar.gz
install pms-*/pms ~/.local/bin/pms
```

Make sure `~/.local/bin` is in your `PATH`. Then check the install:

```sh
pms --version
```

## Next

- [Sign in and choose a project](/cli/sign-in/)
- [Command overview](/cli/commands/)
