---
title: AI API overview
description: The OpenAI-compatible AI API at https://api.pmservers.org/ai/v1, its endpoints and auth.
sidebar:
  order: 1
---

The AI API supports OpenAI Chat Completions, OpenAI Responses, and Anthropic
Messages formats. Change the SDK's base URL and key.

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
| `POST /ai/v1/responses` | Stateless Responses with native function tools and streaming. | `llm` |
| `POST /ai/v1/messages` | Anthropic Messages with native tool use and streaming. | `llm` |
| `POST /ai/v1/embeddings` | Embeddings. | `embedding` |
| `POST /ai/v1/systemone` | Decisions with the `vane` model. Not OpenAI format. See [Vane](/ai/vane/). | `decision` |
| `POST /ai/v1/audio/transcriptions` | Speech to text. WAV files only. | `stt` |
| `POST /ai/v1/audio/speech` | Text to speech. Output is WAV. | `tts` |

A model works only on the endpoint for its type. For example, `vane` does not work on `/chat/completions`.

## Streaming

Use `"stream": true` for long answers. A non-streaming request that takes too long returns `504 upstream_timeout`.

The last chat chunk has `usage` if you send `"stream_options": {"include_usage": true}`.
Responses and Messages preserve their native streaming events and usage fields.

For the Anthropic SDK, use base URL `https://api.pmservers.org/ai` and your PMS
key as its API key. The SDK appends `/v1/messages`. This route also accepts bearer
auth. Responses are stateless (`store=false`); send history in `input` rather than
using `previous_response_id`. See the [AI API reference](/api/ai/) for tool round trips
and protocol details.

## Reasoning tokens

`nimbus` is a reasoning model. `completion_tokens` includes the reasoning tokens. `max_tokens` does not limit the reasoning.

## More

- [Models and prices](/ai/models/)
- [AI keys](/ai/keys/)
- [Errors](/ai/errors/)
- [AI billing](/billing/ai-billing/)
- OpenAPI spec: [`/openapi.json`](/openapi.json)
