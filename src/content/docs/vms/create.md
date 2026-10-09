---
title: Create a VM
description: VM sizes, images, disk size, name rules and the SSH key that a new VM needs.
sidebar:
  order: 1
---

You create a VM in the console (**Create VM**) or with `POST /v1/projects/{project_id}/vms`.

## Fields

| Field | Rule |
|---|---|
| `name` | 1 to 63 characters. Lowercase letters, digits and `-`. Must start with a letter. |
| `size` | One of the sizes below. |
| `image` | One of the images below. |
| `disk_gb` | 10 to 20 (GB). |
| `ssh_public_key` | One OpenSSH public key, for example `ssh-ed25519 AAAA... me@laptop`. Do not send a private key. |

## Sizes

| ID | vCPU | Memory |
|---|---|---|
| `pms-1c-1g` | 1 | 1 GiB |
| `pms-1c-2g` | 1 | 2 GiB |
| `pms-2c-4g` | 2 | 4 GiB |

The sum of all your VMs must stay in your quota: 2 vCPU and 4 GiB on the free tier.

## Images

| ID | OS | Default user |
|---|---|---|
| `ubuntu-24.04` | Ubuntu 24.04 LTS | `ubuntu` |

## Limits

- **One VM for each account** on the free tier.
- If you go over a limit, the API returns `409` with code `quota_exceeded`.

## SSH keys

- You can save up to 20 public keys on your account (console: **Settings → SSH keys**). Then you can select one when you create a VM.
- In the console, **Generate a key pair** makes an ed25519 key in your browser. The browser downloads the private key one time. PMS Cloud keeps only the public key.

## Example

```sh
curl -X POST https://api.pmservers.org/v1/projects/$PROJECT_ID/vms \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "web-1", "size": "pms-2c-4g", "image": "ubuntu-24.04", "disk_gb": 20,
       "ssh_public_key": "ssh-ed25519 AAAA... me@laptop"}'
```

The API returns `202` and the VM with `"status": "provisioning"`. See [VM states](/vms/states/).
