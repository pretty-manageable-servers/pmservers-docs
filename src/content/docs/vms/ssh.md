---
title: Connect with SSH
description: Connect to a VM through the jump host at jump.pmservers.org.
sidebar:
  order: 2
---

VMs have a private IP only. You connect through the jump host `jump.pmservers.org` (port 22).

## Command

```sh
ssh -J pms@jump.pmservers.org <user>@<private-ip>
```

- `<user>` is the default user of the image. For `ubuntu-24.04` it is `ubuntu`.
- `<private-ip>` shows on the VM page in the console. The API returns it as `private_ip`.

Example:

```sh
ssh -J pms@jump.pmservers.org ubuntu@10.0.12.34
```

## SSH config

Add this to `~/.ssh/config`. Then use `ssh my-vm`.

```
Host my-vm
  HostName 10.0.12.34
  User ubuntu
  ProxyJump pms@jump.pmservers.org
  IdentityFile ~/.ssh/id_ed25519
```

## No private IP?

- The private IP shows about 1 minute after the first start. The guest agent in the VM reports it.
- A VM with no internet cannot install the guest agent. Then it shows no IP.

## Other way in

Use the [browser console](/vms/console/). It does not need SSH.
