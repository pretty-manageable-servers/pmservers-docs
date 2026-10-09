---
title: Browser console
description: Open the serial console of a VM in the browser.
sidebar:
  order: 3
---

The console page gives you the serial console of the VM in your browser.

- The VM must be `running`.
- The console logs in automatically as the default user of the image (`ubuntu` for `ubuntu-24.04`).
- **One console connection at a time** for each VM. Close the console in other tabs first.

## With the API

1. `POST /v1/projects/{project_id}/vms/{vm_id}/console/ticket`. The answer has a `ticket` and a `url`.
2. Open a WebSocket to `wss://api.pmservers.org` + `url`.

If the VM is not running, step 1 returns `409` with code `conflict`.
