---
title: Models and prices
description: The AI models, their types, and the price per 1M tokens in USD.
sidebar:
  order: 2
---

All models run on PMS Cloud hardware. You pay for each token, also for these on-prem models.

## Models

| `model` | Type | Endpoint | Notes |
|---|---|---|---|
| `qwen3.8-flash-next` | `llm` | `/chat/completions` | Reasoning model. |
| `gemma4-e4b` | `llm` | `/chat/completions` | Small and fast. |
| `embeddinggemma2` | `embedding` | `/embeddings` | 768 dimensions. |
| `kev` | `decision` | `/systemone` | Multiple-choice decisions with probabilities. See [Kev](/ai/kev/). |

Claude models for a premium tier are coming soon.

## Prices

USD for each 1M tokens.

| `model` | Input | Output | Cache read | Cache write |
|---|---|---|---|---|
| `qwen3.8-flash-next` | 0.45 | 1.41 | 0.048 | 0.60 |
| `gemma4-e4b` | 0.05 | 0.156667 | 0.005333 | 0.066667 |
| `embeddinggemma2` | 0.03 | 0 | — | — |
| `kev` | 0.0378 | 0 | — | — |

See [AI billing](/billing/ai-billing/) for how we count tokens.

## List models with the API

`GET /ai/v1/models` returns only the models that your key can use.

```json
{"object": "list", "data": [{"id": "gemma4-e4b", "object": "model", "created": 0, "owned_by": "pmservers"}]}
```
