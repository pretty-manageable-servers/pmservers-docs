---
title: Storage limit
description: 1 GiB for all databases of an account. Read-only at 100%, connections blocked at 150%, normal again below 90%. How to free space.
sidebar:
  order: 4
---

Each account has **1 GiB** of database storage. This is the total size of all databases of the account. In a shared project, the storage counts against the project owner.

We check the size each minute. The console shows it as a storage bar in the database's side panel.

## What happens at the limit

| Total size | State | Effect |
|---|---|---|
| Below 100% (1 GiB) | Running | Normal. |
| 100% or more | Read-only | New transactions are read-only. Open connections are closed one time. |
| 150% (1.5 GiB) or more | Suspended | The user `app` cannot connect. |
| Below 90% again | Running | Normal. |

Between 90% and 100%, the state does not change. This stops the state from changing again and again.

## Free space in a read-only database

A read-only database still accepts connections. To delete data, turn off read-only in your session first:

```sql
set default_transaction_read_only = off;
```

Then free space:

- `drop table` and `truncate` free space at once.
- `delete` does not make the database smaller. After a large `delete`, run `vacuum full <table>;`. It locks the table while it runs.
- Drop indexes that you do not use. Vector indexes are large.

The database goes back to **Running** at the next check when the total is below 90% (about 920 MiB).

## Suspended

When a database is suspended, you cannot connect, so you cannot delete data. Contact support.

Support can unblock the databases of your account for **24 hours**. In that time, the databases are read-only but accept connections. Free space as shown above. After 24 hours, the normal limits apply again. If the total is still at 150% or more, the databases are suspended again.

## Higher limits

For more storage, contact enterprise support.
