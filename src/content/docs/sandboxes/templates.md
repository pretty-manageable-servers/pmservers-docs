---
title: Templates
description: Build a sandbox image with the official e2b SDK, then start sandboxes from it with its name. Beta. Ubuntu 24.04 or a public image as base, apt and pip installs, copy files, start command and ready check.
sidebar:
  order: 2
---

A template is a sandbox image that you build one time. Then you start sandboxes from it with its name. Use a template when each sandbox needs the same packages, files or start command.

Set the environment variables first. See [Sandboxes](/sandboxes/overview/#set-up).

:::caution[Beta]
Templates are part of the sandbox beta. Limits can change during the beta. See [Limits](/sandboxes/overview/#limits).
:::

## Build a template

Build the template with `Template.build`. The SDK sends the steps to PMS Cloud and shows the build logs. A small template takes about 65 seconds to build.

Python:

```python
from e2b import Template, wait_for_port

template = (
    Template()
    .from_ubuntu_image("24.04")
    .apt_install(["python3"])
    .copy("index.html", "/home/user/index.html")
    .set_start_cmd(
        "python3 -m http.server 8000 --directory /home/user",
        wait_for_port(8000),
    )
)

Template.build(template, "my-site")
```

JavaScript:

```js
import { Template, waitForPort } from "e2b";

const template = Template()
  .fromUbuntuImage("24.04")
  .aptInstall(["python3"])
  .copy("index.html", "/home/user/index.html")
  .setStartCmd(
    "python3 -m http.server 8000 --directory /home/user",
    waitForPort(8000),
  );

await Template.build(template, "my-site");
```

The `copy` source is a path on your computer. It must be a relative path. It cannot contain `..`.

## Start a sandbox from a template

Pass the template name to `Sandbox.create`:

Python:

```python
from e2b import Sandbox

sbx = Sandbox.create("my-site")
print(sbx.commands.run("whoami").stdout)
sbx.kill()
```

JavaScript:

```js
import { Sandbox } from "e2b";

const sbx = await Sandbox.create("my-site");
const result = await sbx.commands.run("whoami");
console.log(result.stdout);
await sbx.kill();
```

PMS Cloud runs the start command in the new sandbox. It waits for the ready check before the create returns.

## Name and tag

Use a tag to keep more than one version of a template.

| Form | Where you can use it |
|---|---|
| `my-site` | Build name and `Sandbox.create` |
| `my-site:v2` | Build name and `Sandbox.create` |

Tags work only in these two places. The tag routes in the API return `501`.

## Build steps

Use only the steps in this table. Other SDK steps are not tested on PMS Cloud.

| Step | Python | JavaScript | Notes |
|---|---|---|---|
| Base: Ubuntu image | `from_ubuntu_image("24.04")` | `fromUbuntuImage("24.04")` | Makes the user `user`. |
| Base: public image | `from_image("python:3")` | `fromImage("python:3")` | Public images only. |
| Base: template | `from_template("name")` | `fromTemplate("name")` | Starts from another template. |
| Run a command | `run_cmd(cmd, user=...)` | `runCmd(cmd, { user })` | Runs during the build. |
| Install Python packages | `pip_install([...])` | `pipInstall([...])` | Runs as `root`. |
| Install Ubuntu packages | `apt_install([...])` | `aptInstall([...])` | Runs as `root`. |
| Copy files | `copy(src, dest)` | `copy(src, dest)` | Source is a relative path with no `..`. |
| Environment variables | `set_envs({...})` | `setEnvs({...})` | |
| Working folder | `set_workdir(path)` | `setWorkdir(path)` | |
| User | `set_user(name)` | `setUser(name)` | |
| Start command | `set_start_cmd(cmd, ready)` | `setStartCmd(cmd, ready)` | Runs in each sandbox. |
| Ready check | `set_ready_cmd(ready)` | `setReadyCmd(ready)` | Use `wait_for_port` or `waitForPort`. |

The build adds the `ss` tool if the image does not have it. So `wait_for_port` works.

## Users and commands

- Commands in a template sandbox run as `user`. The home folder is `/home/user`.
- A sandbox with no template runs commands as `ubuntu`. See [Limits](/sandboxes/overview/#limits).
- `sudo` does not work. To install software, add it to the build with `apt_install` or `run_cmd`. These steps run as `root`.

## Limits

| Item | Behavior |
|---|---|
| Memory snapshot | Not supported. A template is an image only. A sandbox does not start from a saved memory state. |
| Start command | Runs again in each new sandbox. A warm sandbox runs it before you claim it. See [Warm pool](/sandboxes/warm-pool/). |
| Size of the sandbox | Every sandbox has 0.5 vCPU and 512 MiB. The `cpu_count` and `memory_mb` values of a build are stored but not used. |
| Deleted template | Its image stays in the registry. There is no cleanup yet. |

## Not supported

These features return `501` or are not available:

| Feature | Notes |
|---|---|
| Tag routes in the API | Use `name:tag` in the build name and in `Sandbox.create`. |
| Private base image registries | `from_aws_registry`, `from_gcp_registry` and the registry credentials of `from_image`. Use a public image. |
| Public templates | A template belongs to one project. |
| Template commands in the `pms` CLI | Use the SDK. |
