---
title: Databases
description: Postgres 18 databases with optional pgvector. Private access from your containers only. 1 database and 1 GiB for each account. No backups.
sidebar:
  order: 1
---

A database is a Postgres 18 server with one database for your app. You can turn on [pgvector](https://github.com/pgvector/pgvector) for vector search.

Databases need no approval. Any account can make one.

:::caution[No backups]
We do not back up databases. The data is on one server. If the disk fails, the data is lost. Keep your own copy of data that you need. See [Back up your data](#back-up-your-data).
:::

## Create a database

In the console, open **Databases**, then select **Create database**. Give:

| Field | Rule |
|---|---|
| Name | Lowercase letters, digits and `-`. It starts with a letter. 63 characters at most. Unique in the project. |
| Size | 0.25 vCPU / 512 MiB. |
| Enable vector | Optional. Turns on the `vector` extension. You can change it later. |

After you create the database, the console shows the **password** and the **connection URL** one time. Copy them. We do not keep the password. If you lose it, select **Reset password** in the database's side panel. A reset ends all open connections.

The database is ready in about 1 minute.

## Connection details

| Field | Value |
|---|---|
| Host | Shown in the console. It ends in `.svc.cluster.local`. |
| Port | `5432` |
| Database | `app` |
| User | `app` |

The connection URL has this format:

```
postgresql://app:<password>@<host>:5432/app
```

See [Connect from a container](/databases/connect/).

## Private access only

A database has no public address. Nothing is open to the internet.

- The containers of the **same project** can connect to it. Containers in other projects of your account cannot.
- You can connect from your computer with the PMS CLI. The command `pms db connect` opens a local port through the SSH jump host. All members of the project can use it. See [Connect from your computer](/databases/connect-from-your-computer/).
- Hosted apps cannot use `pms db connect`. It works only where the CLI runs.

- Containers need approval for each account. See [Containers](/containers/overview/).

## The `app` user

The user `app` owns the database `app`. It is not a superuser.

- You can make tables, indexes, schemas and roles in `app`.
- You can make trusted extensions, for example `pg_trgm` and `vector`.
- You cannot use superuser features, for example `COPY ... PROGRAM`.

## Vector

Select **Enable vector** in the side panel, or set it on create. This runs `CREATE EXTENSION vector`. See [Vector search](/databases/vector/).

To turn vector off, first drop all columns and indexes that use the `vector` type. If one exists, the console shows an error.

## States

| State | Meaning |
|---|---|
| Provisioning | The database is starting. |
| Running | The database runs. |
| Read-only | The account is at the storage limit. See [Storage limit](/databases/storage-limit/). |
| Suspended | The account is far over the storage limit. Connections are blocked. |
| Failed | The database did not start. The console shows the reason. |
| Deleting | The database is being deleted. |

## Back up your data

We do not back up databases. Use `pg_dump` from a container to save a copy in your own storage:

```sh
pg_dump "$DATABASE_URL" --format=custom --file=backup.dump
```

## Delete a database

Select **Delete** in the side panel. **This deletes all data. You cannot undo it.**

A project with a database cannot be deleted. Delete the databases first.

## Limits

| Limit | Value |
|---|---|
| Databases for each account | 1 |
| Storage, all databases together | 1 GiB |
| Size | 0.25 vCPU / 512 MiB |
| Quota | Databases use the same vCPU and memory quota as containers (2 vCPU, 4 GiB on the free tier). |
| Backups | None |
| Replicas | None. One server. |

See [Limits](/billing/limits/).

## API

- `GET` and `POST /v1/projects/{project_id}/databases`
- `GET`, `PATCH` and `DELETE /v1/projects/{project_id}/databases/{database_id}`
- `POST /v1/projects/{project_id}/databases/{database_id}/reset-password`

Only the create and reset responses contain `password` and `connection_url`.
