---
title: AI errors
description: Error codes of the AI API, OpenAI and Anthropic formats, and retry rules.
sidebar:
  order: 5
---

Chat Completions and Responses return HTTP errors in OpenAI format. OpenAI SDKs
read them as normal errors.

```json
{"error": {"message": "The budget for this key or account is spent.", "type": "insufficient_quota", "code": "budget_exceeded"}}
```

Messages returns native Anthropic errors:

```json
{"type": "error", "error": {"type": "authentication_error", "message": "Invalid API key."}}
```

HTTP statuses and retry rules are shared. The Anthropic `error.type` is
`authentication_error` for `401`, `permission_error` for `403`,
`request_too_large` for `413`, `rate_limit_error` for `429`, `api_error` for
server failures, and `invalid_request_error` for invalid input or a spent budget.
Upstream error messages are sanitized in HTTP responses and streaming events.

## Codes

| Status | `code` | Cause | What to do |
|---|---|---|---|
| `400` | `invalid_request` | The body is not valid. The `message` tells why. | Fix the request. |
| `401` | `invalid_api_key` | The key is wrong, rotated or revoked. | Check the key. |
| `402` | `budget_exceeded` | The key budget or the monthly account budget is spent. | Raise the key budget, or wait for the next month (UTC). |
| `403` | `model_not_allowed` | The key cannot use this model, or the model does not exist. | Add the model to the key, or fix the model name. |
| `413` | `request_too_large` | The request is too large. | Send less input. |
| `429` | `rate_limit_exceeded` | More than 60 requests in one minute on this key. | Wait and retry with backoff. |
| `502` | `upstream_error` | The model service is not available now. | Retry later. |
| `504` | `upstream_timeout` | The model took too long to answer. | Use `"stream": true`. |

## Retry rules

- Retry `429`, `502` and `504` with exponential backoff.
- Do not retry `400`, `401`, `402`, `403` or `413` without a change.
