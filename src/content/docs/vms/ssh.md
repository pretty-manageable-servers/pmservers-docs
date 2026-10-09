---
title: Connect with SSH
description: SSH to a VM through the jump host jump.pmservers.org, with cloudflared or Docker.
sidebar:
  order: 2
---

VMs have a private IP only. You connect through the jump host `jump.pmservers.org`. The jump host goes through Cloudflare over HTTPS, so it works on most networks, also where port 22 is blocked.

:::note[PMS CLI]
The jump host needs `cloudflared` on your computer. A future PMS CLI will do this setup for you.
:::

## What you need

- The private key of an SSH key that the jump host accepts:
  - the key that you gave when you created the VM, or
  - a saved key on your account (**SSH keys** in the console).

  For a VM made before 2026-10-09, only a saved key works.
- The private IP and the SSH user of the VM. The VM page shows them. The user is `ubuntu` for `ubuntu-24.04`.
- `cloudflared` or Docker. See the steps below.

The jump host lets your key reach port 22 of your own VMs only. It has no shell.

## 1. Get cloudflared

Install it:

| System | Command |
|---|---|
| macOS | `brew install cloudflared` |
| Windows | `winget install --id Cloudflare.cloudflared` |
| Debian, Ubuntu | See [Cloudflare downloads](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/) |

You do not need a Cloudflare account. There is no login.

### Do not want to install it? Use Docker

If Docker is on your computer, you can run `cloudflared` in a container. Use the Docker line in step 2. The first connection pulls the image, so it is slower.

## 2. Add the jump host to your SSH config

Add this to `~/.ssh/config` (on Windows: `C:\Users\<you>\.ssh\config`):

```
Host pms-jump
  HostName jump.pmservers.org
  User jump
  ProxyCommand cloudflared access ssh --hostname %h
```

With Docker, use this `ProxyCommand` line instead:

```
  ProxyCommand docker run --rm -i cloudflare/cloudflared:latest access ssh --hostname %h
```

## 3. Connect

```sh
ssh -J pms-jump ubuntu@10.40.0.23
```

Use the private IP of your VM. If your key is not the default key, add `-i ~/.ssh/<key>`.

To give the VM a short name, add it to `~/.ssh/config` too:

```
Host web-1
  HostName 10.40.0.23
  User ubuntu
  ProxyJump pms-jump
```

Then use `ssh web-1`. `scp`, `rsync` and VS Code Remote SSH also use this name.

## Problems

- **Permission denied (publickey)**: the key is not the VM create key or a saved key on your account, or the VM is not running. The jump host accepts a key only when it can reach at least one of your running VMs.
- **channel open failed** or **stdio forwarding failed**: the IP is not one of your VMs. Check the private IP on the VM page. The IP can change after a restart.
- **no such host**: wait a few minutes and try again.
- **No private IP**: see below.

You can always use the [browser console](/vms/console/).

## Private IP

- The private IP shows about 1 minute after the first start. The guest agent in the VM reports it.
- A VM with no internet cannot install the guest agent. Then it shows no IP.
