---
title: Connect with SSH
description: Coming soon. SSH to VMs through a jump host. Until then, use the browser console.
sidebar:
  order: 2
  badge:
    text: Soon
    variant: caution
---

:::caution[Coming soon]
SSH from the internet does not work yet. Use the [browser console](/vms/console/) to get into your VM.
:::

VMs have a private IP only. SSH access from the internet will go through a jump host. This page will give the command when it is available.

## Your SSH key

You still need an SSH public key to create a VM. PMS Cloud puts it on the VM for the default user (`ubuntu` for `ubuntu-24.04`). When SSH is available, you will use this key.

## Private IP

- The private IP shows about 1 minute after the first start. The guest agent in the VM reports it.
- A VM with no internet cannot install the guest agent. Then it shows no IP.
