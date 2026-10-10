---
title: Registry credentials
description: Use private images from GitHub Container Registry, Docker Hub or another registry. The token is write-only.
sidebar:
  order: 2
---

A registry credential lets a container pull a private image. Public images need no credential.

## Add a credential

1. In the console, open **Settings**, then **Registry credentials**.
2. Select **Add credential**. Give:
   - **Name**: your name for it.
   - **Host**: the registry host, for example `ghcr.io` or `docker.io`.
   - **Username**: your registry user name.
   - **Token**: a token that can read packages. For GitHub, use a token with the `read:packages` scope.
3. Select **Save**.

After you save it, nobody can read the token again, also not in the console. To change a token, delete the credential and add it again.

Credentials are on your account, not on a project. You can have 10.

## Use a credential

When you create or edit a container, select the credential. The credential host must match the image host:

| Image | Host |
|---|---|
| `ghcr.io/owner/app:1.0` | `ghcr.io` |
| `registry.example.com:5000/app` | `registry.example.com:5000` |
| `owner/app` or `nginx` | `docker.io` |

## Delete a credential

You cannot delete a credential while a container uses it. Edit or delete the container first.
