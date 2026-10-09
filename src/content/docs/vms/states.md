---
title: VM states and actions
description: What each VM status means, and how to start, stop, restart and delete a VM.
sidebar:
  order: 4
---

## Status

| `status` | Meaning |
|---|---|
| `provisioning` | The VM is being made, is starting, or is stopping. `status_message` gives details, for example `Importing image 45%` or `Stopping`. |
| `running` | The VM runs. |
| `stopped` | The VM is off. Its disk stays. |
| `deleting` | The VM is being deleted. |
| `failed` | Something went wrong. `status_message` tells why. |
| `pending` | A short state that is not known yet. |

:::note
While a VM stops, it shows as `provisioning` with the message `Stopping`. This is normal.
:::

## Failed messages

| `status_message` | What to do |
|---|---|
| No room on the host to start this VM. | Try again later, or use a smaller size. |
| The image could not be pulled. | Delete the VM and create it again. |
| The disk could not be made. | Delete the VM and create it again. |
| The VM keeps crashing. | Open the [console](/vms/console/) to see the boot log. |

## Actions

`POST /v1/projects/{project_id}/vms/{vm_id}/actions` with one of these bodies:

```json
{"action": "start"}
{"action": "stop"}
{"action": "restart"}
```

The API returns `202`. The status changes in a few seconds.

## Delete

`DELETE /v1/projects/{project_id}/vms/{vm_id}` returns `202`. The VM and its disk are deleted. You cannot undo this.

## Private IP

`private_ip` is `null` until the guest agent reports it, about 1 minute after the first start. A VM with no internet shows no IP.
