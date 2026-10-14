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
| `POST` | `/responses` | OpenAI Responses request. `model` must be an `llm` model. | OpenAI Response object, or native Responses SSE events. |
| `POST` | `/messages` | Anthropic Messages request. `model` must be an `llm` model. | Anthropic Message object, or native Messages SSE events. |
| `POST` | `/embeddings` | OpenAI embeddings request. `model` must be `stratus`. | OpenAI embeddings response. 768 dimensions. |
| `POST` | `/systemone` | System One request. `model` must be `vane`. | System One response. See [Vane](/ai/vane/). |
| `POST` | `/audio/transcriptions` | Multipart form: `model`, `file`, and optional `response_format` and `language`. `model` must be `squall`. | Speech to text. JSON or plain text. See [Speech to text](#speech-to-text). |
| `POST` | `/audio/speech` | JSON request. `model` must be `thunder`. | Text to speech. A WAV file. See [Text to speech](#text-to-speech). |

## Differences from OpenAI

- `model` in the answer is our model ID, for example `cirrus`.
- `system_fingerprint` is always `null`.
- The answer has no cost field. See [AI billing](/billing/ai-billing/).
- In a chat stream, `usage` comes in the last content chunk (the chunk with `finish_reason`), if you send `"stream_options": {"include_usage": true}`. There is no separate usage chunk.

## Responses and tools

Use your OpenAI SDK with base URL `https://api.pmservers.org/ai/v1` and call
`responses.create`. Send `input`, `tools`, and `tool_choice` in Responses format.
Native tool calls appear as `function_call` output items. Execute the function in
your client and send a `function_call_output` item with the matching `call_id` in
the next request's `input`, together with the conversation history.

Responses are stateless. `store` is forced to `false` when omitted. Explicit
`store: true`, `previous_response_id`, `conversation`, and `background: true`
return `400`. Response retrieval and deletion are not supported.

With `stream: true`, native events such as `response.function_call_arguments.delta`
and `response.completed` are preserved. Usage stays in the Response object;
`stream_options.include_usage` is only for Chat Completions.

## Anthropic Messages

Set your Anthropic SDK's base URL to `https://api.pmservers.org/ai`; the SDK appends
`/v1/messages`. Set its API key to your `pms_sk_...` key. Direct requests to
`/ai/v1/messages` accept `x-api-key` or `Authorization: Bearer`. If both are sent,
the bearer header takes precedence. Use the SDK's `anthropic-version` header;
`anthropic-beta` is also forwarded to the model service.

Send `messages`, `max_tokens`, and tools with `input_schema` in Anthropic format.
Native calls appear as `tool_use` content blocks. Execute the function in your
client and return a `tool_result` block with the matching `tool_use_id` in a user
message, together with the conversation history. Streaming preserves Messages
events and tool argument deltas. Errors use the native Anthropic error envelope.

These routes use the same model permissions, key rate limit, and account/key
budgets as Chat Completions. Choose a model returned by `/models`; protocol
compatibility does not add Claude models to your key. Tool support depends on
the selected model. PMS does not execute your functions.

## Embeddings example

```sh
curl https://api.pmservers.org/ai/v1/embeddings \
  -H "Authorization: Bearer $PMS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "stratus", "input": ["first text", "second text"]}'
```

## Speech to text

`POST /ai/v1/audio/transcriptions` turns speech into text. Use the `squall` model. The request is a multipart form.

| Field | Required | Value |
|---|---|---|
| `model` | Yes | `squall` |
| `file` | Yes | A PCM WAV file. Up to 25 MB and up to 300 seconds of audio. |
| `response_format` | No | `json` (default) or `text`. |
| `language` | No | The language of the audio, for example `en`. The value is passed to the model. |

- Only PCM WAV files are accepted. Send the file with the type `audio/wav`.
- The WAV file must have a sample rate of 8000 to 192000 Hz, 1 to 8 channels, and 8, 16, 24 or 32 bits for each sample.
- The file can be up to 25 MB. The audio can be up to 300 seconds long.
- `json` returns `{"text": "..."}`. `text` returns the text as `text/plain`.
- Other values of `response_format` return `400`.
- Billed per minute of audio. The length of the audio comes from the WAV file. See [Models and prices](/ai/models/).

```sh
curl https://api.pmservers.org/ai/v1/audio/transcriptions \
  -H "Authorization: Bearer $PMS_API_KEY" \
  -F "model=squall" \
  -F "file=@meeting.wav;type=audio/wav"
```

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.pmservers.org/ai/v1",
    api_key=os.environ["PMS_API_KEY"],
)

with open("meeting.wav", "rb") as f:
    result = client.audio.transcriptions.create(
        model="squall",
        file=("meeting.wav", f, "audio/wav"),
    )

print(result.text)
```

## Text to speech

`POST /ai/v1/audio/speech` turns text into speech. Use the `thunder` model. The request is JSON.

| Field | Required | Value |
|---|---|---|
| `model` | Yes | `thunder` |
| `input` | Yes | The text to speak. 1 to 4096 characters. |
| `voice` | Yes | The voice to use, for example `alloy`. |
| `instructions` | No | A description of the voice, 1 to 1000 characters. For example: `A calm, clear adult man with a low voice.` Without it, the voice can change from one text to the next. Send the same text each time to keep one voice. Not billed. |
| `response_format` | No | `wav` (default). Other values return `400`. |

- The answer is a WAV file. The `Content-Type` is `audio/wav`. The audio is 24 kHz, mono, 16-bit PCM.
- Billed per character of `input`. See [Models and prices](/ai/models/).
- The OpenAI SDK sends `mp3` by default. Set `response_format` to `wav`.

```sh
curl https://api.pmservers.org/ai/v1/audio/speech \
  -H "Authorization: Bearer $PMS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "thunder", "input": "Hello from PMS Cloud.", "voice": "alloy", "response_format": "wav"}' \
  --output hello.wav
```

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.pmservers.org/ai/v1",
    api_key=os.environ["PMS_API_KEY"],
)

speech = client.audio.speech.create(
    model="thunder",
    voice="alloy",
    input="Hello from PMS Cloud.",
    response_format="wav",
)
speech.write_to_file("hello.wav")
```

## Audio errors

These errors are in the OpenAI error format.

| Status | `type` | `code` | Message | Cause |
|---|---|---|---|---|
| `400` | `invalid_request_error` | `invalid_request` | `The file must be a valid PCM WAV audio file.` | Speech to text: the file is not a valid PCM WAV file. |
| `400` | `invalid_request_error` | `invalid_request` | `Audio is longer than 300 seconds.` | Speech to text: the audio is longer than 300 seconds. |
| `400` | `invalid_request_error` | `invalid_request` | Names the field that is wrong. | `response_format` is not allowed. `voice` is missing. `input` is empty or longer than 4096 characters. `instructions` is not a string of 1 to 1000 characters. `file` or `model` is missing. |
| `413` | `invalid_request_error` | `request_too_large` | | Speech to text: the file is larger than 25 MB. |
| `502` | `upstream_error` | `upstream_error` | | The model service failed. Retry later. |
| `504` | `upstream_error` | `upstream_timeout` | | The model took too long to answer. Retry later. |

Other errors are the same for all AI endpoints: `401`, `403` with `model_not_allowed`, `402` with `budget_exceeded` and `429`. See [AI errors](/ai/errors/).
