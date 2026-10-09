---
title: Your first VM
description: Create an Ubuntu VM in the console and open its browser console.
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

When the VM is `running`, open the VM page and click the console. The console logs in as `ubuntu`. See [Browser console](/vms/console/).

SSH from the internet is coming soon. See [Connect with SSH](/vms/ssh/).
