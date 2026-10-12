---
title: CLI commands
description: The pms storage commands for object storage. Status, enable and disable, buckets, and access keys. Sign in with pms login. API tokens are refused.
sidebar:
  order: 9
---

Object storage uses `pms storage`. You must sign in with `pms login`. API tokens cannot use object storage. See [CLI sign-in](/cli/sign-in/).

If you are a project member, add `--account <owner-id>` to each command. The owner ID is the user ID of the account owner.

## Account

```sh
pms storage status
pms storage enable
pms storage disable
```

`disable` works only when no buckets are left. It deletes all data in object storage.

## Buckets

```sh
pms storage bucket ls
pms storage bucket create <name>
pms storage bucket rm <name>
```

`rm` works only for an empty bucket. It asks first. Use `--yes` to skip the question.

## Access keys

```sh
pms storage key ls
pms storage key create <name> [--read-only] [--bucket <bucket> ...] [--env]
pms storage key reset <key-id> [--env]
pms storage key rm <key-id>
```

- `--read-only`: the key can read, but cannot write or delete.
- `--bucket`: a bucket the key can use. Repeat it for more buckets. Without it, the key can use all buckets.
- `--env`: prints `export` lines for the AWS CLI and SDKs. Use it with `eval`.

The secret is shown one time. See [Buckets and access keys](/storage/buckets-and-keys/).

## Examples

```sh
pms storage enable
pms storage bucket create my-bucket
eval "$(pms storage key create ci --env)"
aws s3 cp ./build.zip s3://my-bucket/build.zip
pms storage key rm <key-id>
```

Set path style and the checksum setting before you use the AWS CLI. See [Quick start](/storage/quick-start/).
