---
title: Pricing
description: Object storage is free up to 10 GiB for each account. Above 10 GiB it costs $0.014 per GiB-month. It is metered now and not charged yet.
sidebar:
  order: 8
---

## Price

| Storage | Price |
|---|---|
| First 10 GiB for each account | Free |
| Above 10 GiB | $0.014 for each GiB-month |

A GiB-month is one GiB of storage for one month. Above 10 GiB, the price is pro-rated by the hour.

## Metering, not charging

We measure the storage each minute. We average the measurements for each hour. The console shows what the storage would cost. The API returns the amount as `would_cost_usd` in `GET /v1/storage`. We do not charge you for it yet. See [API](/storage/api/).

## Limits

The free tier also has limits. See [Limits and states](/storage/limits/).

## Other prices

See [Limits](/billing/limits/) for all limits and prices of PMS Cloud.
