---
title: Sandboxes
description: Beta. Run commands and files in an isolated Linux sandbox with the official e2b SDK. E2B-compatible. Needs account approval. Free in beta.
sidebar:
  order: 1
---

A sandbox is a Linux machine that you create from code. You run commands in it, read and write files, and kill it when you finish. Each sandbox runs in gVisor.

PMS Cloud sandboxes are compatible with [E2B](https://e2b.dev). Use the official `e2b` SDK for Python or JavaScript. You change only the environment variables.

:::caution[Beta]
Sandboxes are in beta. Your account must be approved before you can create a sandbox. Limits can change during the beta. See [Limits](#limits).
:::

## Set up

Set these three environment variables:

```sh
export E2B_API_KEY="pms_..."
export E2B_API_URL="https://api.pmservers.org/sandboxes"
export E2B_SANDBOX_URL="https://sandbox.pmservers.org"
```

| Variable | Value |
|---|---|
| `E2B_API_KEY` | A project token. It starts with `pms_`. The project comes from the token. A console sign-in token does not work. See [API tokens](/api/tokens/). |
| `E2B_API_URL` | `https://api.pmservers.org/sandboxes` |
| `E2B_SANDBOX_URL` | `https://sandbox.pmservers.org` |

Install the SDK:

```sh
pip install e2b
```

```sh
npm install e2b
```

The SDK sends create, list and kill calls to `E2B_API_URL`. It sends command and file calls to `E2B_SANDBOX_URL`.

## Example

This example creates a sandbox, runs a command, writes and reads a file, and kills the sandbox.

```python
from e2b import Sandbox

sbx = Sandbox.create()

result = sbx.commands.run("echo hello from PMS Cloud")
print(result.stdout)

sbx.files.write("/tmp/hello.txt", "Hello")
print(sbx.files.read("/tmp/hello.txt"))

sbx.kill()
```

```js
import { Sandbox } from "e2b";

const sbx = await Sandbox.create();

const result = await sbx.commands.run("echo hello from PMS Cloud");
console.log(result.stdout);

await sbx.files.write("/tmp/hello.txt", "Hello");
console.log(await sbx.files.read("/tmp/hello.txt"));

await sbx.kill();
```

Kill each sandbox when you finish. A sandbox counts against your limit until it is killed or its timeout ends.

To start sandboxes from your own image, with packages and files, see [Templates](/sandboxes/templates/). A template can use a [warm pool](/sandboxes/warm-pool/) for faster starts.

## Lifetime

A sandbox stops when its timeout ends. A killed sandbox is not found by get, list or connect. There is no idle timeout yet.

## First create

The first create in an account can take up to about 35 seconds. The sandbox space starts during this time. While it starts, the API returns `503`. Wait a few seconds and try again.

## Limits

| Limit | Value (beta) |
|---|---|
| Running sandboxes for each account | 4. A create above this limit returns `429`. |
| vCPU | 0.5 vCPU |
| Memory | 512 MiB |
| Runtime | gVisor |
| Internet access | On |
| Default user | `ubuntu`. Commands run as this user. |
| Image | Ubuntu 24.04 |
| Price | $0 in beta |

Usage is metered per vCPU second.

## Errors

| Status | Meaning | What to do |
|---|---|---|
| `401` | No token, or the token is not valid. | Check `E2B_API_KEY`. See [API tokens](/api/tokens/). |
| `404` | The sandbox does not exist, or it was killed. | Create a new sandbox. |
| `429` | You have 4 running sandboxes. | Kill a sandbox you do not need. |
| `501` | The feature is not supported yet. | See [Not supported yet](#not-supported-yet). |
| `503` | The sandbox space is starting. | Wait a few seconds and try again. |

## Not supported yet

These features return `501`:

- Pause and resume
- Snapshots
- Fork
- Some template features. See [Templates](/sandboxes/templates/#not-supported).
- Volumes
- Logs and metrics
- Custom network rules
