---
title: Kev (decision model)
description: Use the kev decision model with POST /ai/v1/systemone to get a choice and probabilities.
sidebar:
  order: 4
---

`kev` is a decision model. It does not write text. It reads one document and answers typed questions. Each answer has a probability for each option. One call takes about 200 ms.

**Use `POST /ai/v1/systemone`.** Do not use `/chat/completions`. It does not accept `kev`.

The request and response use the System One format. Existing System One clients work with base URL `https://api.pmservers.org/ai`.

## Request

| Field | Rule |
|---|---|
| `model` | `"kev"` |
| `state` | A string. The document to read. |
| `questions` | An object with one or more questions. Each question needs `type`, `instructions` and `criteria`. |

```sh
curl https://api.pmservers.org/ai/v1/systemone \
  -H "Authorization: Bearer $PMS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "kev",
    "state": "Customer: my order arrived broken, I want my money back.",
    "questions": {
      "team": {
        "type": "choice",
        "instructions": "Which team should handle this message?",
        "criteria": {
          "billing": "Payments and invoices.",
          "returns": "Refunds and damaged items.",
          "shipping": "Delivery status."
        }
      }
    }
  }'
```

## Response

```json
{
  "model": "kev",
  "answers": {
    "team": {
      "type": "choice",
      "choice": "returns",
      "probabilities": {"billing": 0.017, "returns": 0.958, "shipping": 0.025},
      "confidence": 0.938
    }
  },
  "usage": {"input_tokens": 48, "output_tokens": 0}
}
```

## Errors

| Status | Cause |
|---|---|
| `400` `The field 'state' must be a string.` | `state` is missing or not a string. |
| `400` `The field 'questions' must be a non-empty object.` | `questions` is missing or empty. |
| `400` `question "team" has no instructions` | A question has no `instructions`. |

Other errors are the same as for all AI endpoints. See [Errors](/ai/errors/).

## Price

$0.0378 for each 1M input tokens. Output is free (`output_tokens` is always 0).
