---
title: AI API reference
description: All endpoints of the AI API at https://api.pmservers.org/ai/v1.
sidebar:
  order: 2
---

Base URL: `https://api.pmservers.org/ai/v1`. Auth: `Authorization: Bearer pms_sk_...`.

The OpenAPI spec is at [`/openapi.json`](/openapi.json).

| Method | Path | Body | Answer |
|---|---|---|---|
| `GET` | `/models` | — | OpenAI model list. Only the models of the key. |
| `POST` | `/chat/completions` | OpenAI chat request. `model` must be an `llm` model. | OpenAI chat response, or an SSE stream with `"stream": true`. |
| `POST` | `/embeddings` | OpenAI embeddings request. `model` must be `embeddinggemma2`. | OpenAI embeddings response. 768 dimensions. |
| `POST` | `/systemone` | System One request. `model` must be `kev`. | System One response. See [Kev](/ai/kev/). |

## Differences from OpenAI

- `model` in the answer is our model ID, for example `gemma4-e4b`.
- `system_fingerprint` is always `null`.
- The answer has no cost field. See [AI billing](/billing/ai-billing/).
- In a stream, `usage` comes in the last content chunk (the chunk with `finish_reason`), if you send `"stream_options": {"include_usage": true}`. There is no separate usage chunk.

## Embeddings example

```sh
curl https://api.pmservers.org/ai/v1/embeddings \
  -H "Authorization: Bearer $PMS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "embeddinggemma2", "input": ["first text", "second text"]}'
```
