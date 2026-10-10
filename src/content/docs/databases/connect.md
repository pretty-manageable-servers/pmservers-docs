---
title: Connect from a container
description: Give the connection URL to a container as an environment variable, then connect with any Postgres client. Retry the first connection.
sidebar:
  order: 2
---

Only containers of the same account can connect to a database. See [Private access only](/databases/overview/#private-access-only).

## 1. Add the URL to the container

1. Copy the **connection URL** when you create the database. If you lost it, select **Reset password** to get a new one.
2. Open the container, select **Edit**, and add an environment variable `DATABASE_URL` with the URL as its value.
3. Save. The container restarts with the new variable.

The console does not show the value again. To change the password, reset it, then edit the container again.

## 2. Connect

Use any Postgres client. The connection does not use TLS. The traffic stays in your private network.

Python (`psycopg`):

```python
import os
import psycopg

with psycopg.connect(os.environ["DATABASE_URL"]) as conn:
    print(conn.execute("select version()").fetchone())
```

Node.js (`pg`):

```js
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const { rows } = await pool.query("select version()");
console.log(rows[0]);
```

## Retry the first connection

Just after a container starts, the first connection can fail for a few seconds. Retry the connection in your app, for example 5 times with 2 seconds between tries. Most Postgres pools do this if you set them to.

## Problems

| Error | Cause |
|---|---|
| `could not translate host name` | The container is in a different account, or it just started. Retry. |
| `password authentication failed` | The password was reset. Use the new URL. |
| `cannot execute ... in a read-only transaction` | The account is at the storage limit. See [Storage limit](/databases/storage-limit/). |
| `too many connections for role "app"` | The database is suspended. See [Storage limit](/databases/storage-limit/). |
