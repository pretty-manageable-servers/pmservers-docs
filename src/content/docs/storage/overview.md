---
title: Object storage
description: S3-compatible object storage (beta). One storage for each account, for approved accounts only. Built on Garage. Path style only. No backups.
sidebar:
  order: 1
---

PMS Cloud object storage stores files in buckets. It has an S3 API. You can use any S3 tool or SDK. You must turn on path style. See [Quick start](/storage/quick-start/).

Object storage is in beta. Only approved accounts can turn it on.

:::caution[No backups]
We do not back up object storage. All data is on one node. If the disk fails, the data is lost. Keep your own copy of data that you need.
:::

## Turn it on

Object storage is one switch for each account. It is not a switch for each project.

| How | Command or request |
|---|---|
| Console | Select **Enable object storage**. |
| CLI | `pms storage enable` |
| API | `POST /v1/storage/enable` |

Wait until the status is `active`. Check it with `pms storage status` or `GET /v1/storage`.

If your account is not approved, the request fails with `403`. Ask the PMServers team for approval.

## Who can manage it

- The account owner can manage object storage.
- Members of any project in the account can manage it too. See [Project members](/get-started/members/).
- The usage counts against the account owner.
- An API token cannot manage object storage. Use a sign-in. See [CLI sign-in](/cli/sign-in/).

## Built on Garage

PMS Cloud object storage is built on [Garage](https://garagehq.deuxfleurs.fr/). Garage is an S3-compatible object store. It is free software under the GNU Affero General Public License version 3 (AGPLv3). We run Garage without changes.

Garage does not have every S3 feature. Read [Limitations](/storage/limitations/) before you rely on a feature.

## Next steps

- [Quick start](/storage/quick-start/)
- [From your containers](/storage/from-containers/)
- [Buckets and access keys](/storage/buckets-and-keys/)
- [Share a file](/storage/share/)
- [Limits and states](/storage/limits/)
- [Pricing](/storage/pricing/)
