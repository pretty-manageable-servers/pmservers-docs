---
title: Warm pool
description: Templates keep warm sandboxes ready. A create from a template takes about 2.5 to 3 seconds when a warm sandbox is free, and about 13 seconds when none is free.
sidebar:
  order: 3
---

A warm pool keeps sandboxes of a [template](/sandboxes/templates/) ready before you ask for one. When you create a sandbox from the template, and a warm sandbox is free, the create returns faster.

The warm pool works for templates only. A sandbox with no template does not use it.

## Start times

Times measured in production on 2026-10-12:

| Create from a template | Time |
|---|---|
| A warm sandbox is free | About 2.5 to 3 seconds |
| No warm sandbox is free | About 13 seconds |

The first create in an account can still return `503` while the sandbox space starts. See [First create](/sandboxes/overview/#first-create).

## How the pool works

- A warm sandbox belongs to one template build in one project. Other projects cannot use it.
- A warm sandbox runs the start command of the template before you claim it.
- You do not set the size of the pool. PMS Cloud sets it, and the size can change.

## Start command and create envs

A warm sandbox runs the start command before you claim it. So the start command does not see the `envs` that you pass to `Sandbox.create`.

Do not depend on these `envs` in the start command.

Python:

```python
from e2b import Sandbox

sbx = Sandbox.create("my-site", envs={"APP_MODE": "demo"})
sbx.kill()
```

In this example, the start command does not see `APP_MODE`. Your commands in the sandbox do see it.
