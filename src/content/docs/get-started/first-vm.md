---
title: Your first VM
description: Create an Ubuntu VM in the console and connect to it with SSH.
sidebar:
  order: 2
---

## Steps

1. Open `https://console.pmservers.org` and sign in.
2. Open a project. Click **Create VM**.
3. Type a name, for example `web-1`. Use lowercase letters, digits and `-`.
4. Select a size, for example `pms-2c-4g`.
5. Select an SSH key:
   - Select a saved key, or paste a public key, or
   - Click **Generate a key pair**. The browser downloads the private key one time. PMS Cloud does not keep it.
6. Click **Create**.

The VM status is `provisioning` while the disk is made. Then it changes to `running`.

## Connect

Wait about 1 minute after the VM starts. Then the private IP shows on the VM page.

```sh
ssh -J pms@jump.pmservers.org ubuntu@<private-ip>
```

See [Connect with SSH](/vms/ssh/) for details.
