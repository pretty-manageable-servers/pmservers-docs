---
title: AI billing
description: How AI requests are billed by token, with cache prices and the monthly budget.
sidebar:
  order: 2
---

## By token

We bill all models by token, also the models that run on our own hardware. Prices are in [Models and prices](/ai/models/).

The token counts come from the `usage` field of each answer.

## Cached prompt tokens

Some models cache the start of a prompt. Cached tokens bill at the **cache read** price, not the input price. Tokens written to the cache bill at the **cache write** price.

```
cost = (prompt_tokens - cached_tokens - cache_write_tokens) × input price
     + cached_tokens × cache read price
     + cache_write_tokens × cache write price
     + completion_tokens × output price
```

`prompt_tokens` includes `cached_tokens` and `cache_write_tokens`. They are in `usage.prompt_tokens_details`. Prices are for each 1M tokens.

## Requests with no usage

A request with no `usage` in the answer bills nothing.

## Budgets

| Budget | Period |
|---|---|
| Account | $5 for each calendar month (UTC). All keys together. It resets on the 1st of the month at 00:00 UTC. |
| Key | You set it. It counts the total spend of the key, for all time. |

When a budget is spent, requests fail with `402 budget_exceeded`. Requests that started before can complete, so the spend can go a little over the budget.

## See your spend

- Console: the **AI** tab shows the spend for each key.
- API: `GET /v1/projects/{project_id}/usage` returns `ai_spend_usd` for this month.
