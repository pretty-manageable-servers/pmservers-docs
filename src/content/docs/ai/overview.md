---
title: AI API overview
description: The OpenAI-compatible AI API at https://api.pmservers.org/ai/v1, its endpoints and auth.
sidebar:
  order: 1
---

The AI API is OpenAI-compatible. Use any OpenAI SDK or tool. Change only the base URL and the key.

| Setting | Value |
|---|---|
| Base URL | `https://api.pmservers.org/ai/v1` |
| Auth | `Authorization: Bearer pms_sk_...` |
| Format | OpenAI request and response format |

## Endpoints

| Method and path | Use | Model types |
|---|---|---|
| `GET /ai/v1/models` | List the models that your key can use. | all |
| `POST /ai/v1/chat/completions` | Chat. Supports `"stream": true`. | `llm` |
| `POST /ai/v1/embeddings` | Embeddings. | `embedding` |
| `POST /ai/v1/systemone` | Decisions with the `kev` model. Not OpenAI format. See [Kev](/ai/kev/). | `decision` |

A model works only on the endpoint for its type. For example, `kev` does not work on `/chat/completions`.

## Streaming

Use `"stream": true` for long answers. A non-streaming request that takes too long returns `504 upstream_timeout`.

The last chunk of a stream has `usage` if you send `"stream_options": {"include_usage": true}`.

## Reasoning tokens

`qwen3.8-flash-next` is a reasoning model. `completion_tokens` includes the reasoning tokens. `max_tokens` does not limit the reasoning.

## More

- [Models and prices](/ai/models/)
- [AI keys](/ai/keys/)
- [Errors](/ai/errors/)
- [AI billing](/billing/ai-billing/)
- OpenAPI spec: [`/openapi.json`](/openapi.json)
