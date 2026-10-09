---
title: AI keys
description: Make, limit, rotate and revoke AI keys. Key budgets, model lists and rate limits.
sidebar:
  order: 3
---

An AI key starts with `pms_sk_`. You send it as `Authorization: Bearer pms_sk_...`.

## Create

In the console: open a project, open the **AI** tab, click **Create API key**.

| Setting | Rule |
|---|---|
| Name | 1 to 80 characters. |
| Models | The models the key can use. Other models return `403 model_not_allowed`. |
| Budget | USD, from 0 to 100000. The key stops when its total spend reaches the budget. |

The full key shows **one time only**. After that, the console shows only the start of the key, for example `pms_sk_Ab3x`.

## Limits

| Limit | Value |
|---|---|
| Keys for each account | 5 |
| Rate limit for each key | 60 requests each minute |
| Key budget | The total spend of the key, for all time. |
| Account budget | $5 for each calendar month (UTC), all keys together. |

A request fails with `402 budget_exceeded` when the key budget **or** the account budget is spent.

:::note
The budget check runs before each request. Requests that start before the budget is spent can complete. So the spend can go a little over the budget.
:::

## Change a key

You can change the models and the budget of a key. The secret stays the same.

## Rotate

**Rotate key** makes a new secret. The old secret stops at once. The models, budget and spend stay.

## Revoke

**Revoke key** deletes the key. It stops at once. You cannot undo this.

## Keep keys safe

- Do not put a key in code that runs in a browser or in a public repo.
- Use an environment variable, for example `PMS_API_KEY`.
- If a key leaks, rotate it.
