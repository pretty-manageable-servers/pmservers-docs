---
title: Models and prices
description: The AI models, their types, and the price per 1M tokens in USD.
sidebar:
  order: 2
---

All models run on PMS Cloud hardware. You pay for each token of the chat, embedding and decision models, also for these on-prem models. The speech models bill by minute or by character.

## Models

| `model` | Type | Endpoint | Notes |
|---|---|---|---|
| `nimbus` | `llm` | `/chat/completions` | Reasoning model. |
| `cirrus` | `llm` | `/chat/completions` | Small and fast. |
| `stratus` | `embedding` | `/embeddings` | 768 dimensions. |
| `vane` | `decision` | `/systemone` | Multiple-choice decisions with probabilities. See [Vane](/ai/vane/). |
| `squall` | `stt` | `/audio/transcriptions` | Speech to text. PCM WAV files only, up to 25 MB and 300 seconds. |
| `thunder` | `tts` | `/audio/speech` | Text to speech. Output is WAV, 24 kHz mono 16-bit. Up to 4096 characters for each request. |

Claude models for a premium tier are coming soon.

## Prices

USD for each 1M tokens.

| `model` | Input | Output | Cache read | Cache write |
|---|---|---|---|---|
| `nimbus` | 0.45 | 1.41 | 0.048 | 0.60 |
| `cirrus` | 0.05 | 0.156667 | 0.005333 | 0.066667 |
| `stratus` | 0.03 | 0 | — | — |
| `vane` | 0.0378 | 0 | — | — |

See [AI billing](/billing/ai-billing/) for how we count tokens.

## Audio prices

| `model` | Price |
|---|---|
| `squall` | $0.004 per minute |
| `thunder` | $10.00 per 1M characters |

The minutes of `squall` come from the WAV file that you send. The characters of `thunder` are the characters of the `input` field.

## List models with the API

`GET /ai/v1/models` returns only the models that your key can use.

```json
{"object": "list", "data": [{"id": "cirrus", "object": "model", "created": 0, "owned_by": "pmservers"}]}
```
