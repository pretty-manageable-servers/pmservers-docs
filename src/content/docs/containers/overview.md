---
title: Containers
description: Coming soon. Worker containers with no inbound traffic, no disk, linux/amd64 images, on gVisor.
sidebar:
  order: 1
  badge:
    text: Soon
    variant: caution
---

:::caution[Coming soon]
Containers are not available yet. This page tells how they will work.
:::

## Workers only

A container is a **worker**. It runs all the time and connects out only.

- No port, no URL, no inbound traffic.
- Good for: a Discord bot, a queue worker, a scheduled job runner.
- Not for: a website or an HTTP API.

## Limits

| Limit | Value |
|---|---|
| Containers for each account | 2 |
| Sizes | 0.25 vCPU / 512 MiB, or 0.5 vCPU / 1 GiB |
| Quota | Containers use the same vCPU and memory quota as VMs (2 vCPU, 4 GiB on the free tier). |

## Stateless

There is no disk. **A restart or a redeploy deletes all files in the container.** Keep data in S3 storage or in your own database.

## Images

- Images must be `linux/amd64`. Build with `docker build --platform linux/amd64`.
- Public and private registries work. For a private registry, add a registry token in the console. You cannot read the token again after you save it.

## gVisor

Containers run in the gVisor sandbox. Most apps work: Node.js, Python, Go, Java.

- Apps that use `io_uring`, eBPF, raw kernel features or `ptrace` can fail.
- Heavy disk or network work can be 10 to 30% slower.

If your app does not work on gVisor, ask support for a native container. The team approves each request.

## Network

Containers can connect to the public internet only.
