---
title: Prompting guidelines
description: How to write prompts for nimbus and cirrus. Keep the system prompt short, send tools as tool schemas, and do not send raw JSON dumps.
sidebar:
  order: 6
---

`nimbus` and `cirrus` give better answers, faster and at a lower cost, when the prompt is short and clear.
Use these rules for all chat endpoints.

## Rules

1. Keep the system prompt short. Put only the role, the rules and the output format in it.
2. Send tools as tool schemas. Do not describe tools in the prompt text.
3. Do not send raw JSON dumps. Convert data to short text first.
4. Send chat history as messages, one message for each turn. Do not put the history in one big string.
5. Send only the data that the model needs for this request.
6. Put data that does not change at the start of the prompt. This lets the cache work.

## Context limits

| `model` | Context window | Max output |
|---|---|---|
| `nimbus` | 200K tokens | 50K tokens |
| `cirrus` | 64K tokens | 32K tokens |

The context window holds the input and the output together. For `nimbus`, the output includes the reasoning tokens.
A big input leaves less space for the answer. For `cirrus`, a 40K-token input leaves only 24K tokens for the output.

## Keep the system prompt short

The system prompt goes with each request. A long system prompt costs more and makes the first token slow.
The model also follows the important rules less well when they are hidden in a long prompt.

Bad:

```text
You are a helpful bot. Here is the full server config: {"guilds":[{"id":"1528063444874432734","channels":[...]}], ...}
Here are the last 200 messages: [{"authorIdentity":{"discord_handle":"teddio",...}}, ...]
```

Good:

```text
You are Slopbot, a Discord assistant. Reply in less than 3 sentences.
Use the tools to act. Do not invent message IDs.
```

## Send tools as tool schemas

Each chat format has a field for tools:

| Endpoint | Field |
|---|---|
| `/chat/completions` | `tools` with `type: "function"` |
| `/responses` | `tools` with `type: "function"` |
| `/messages` | `tools` with `input_schema` |

The model is trained to read this field and to return correct tool calls.
If you describe the tools in the system prompt, the model must guess the format, and the calls fail more frequently.

Give each tool a clear name, a one-line description, and a JSON Schema for its parameters.
Mark the required parameters. Send only the tools that this request can use.

```json
{
  "type": "function",
  "function": {
    "name": "create_poll",
    "description": "Post a poll in the current Discord channel.",
    "parameters": {
      "type": "object",
      "properties": {
        "question": {"type": "string"},
        "answers": {"type": "array", "items": {"type": "string"}, "maxItems": 10}
      },
      "required": ["question", "answers"]
    }
  }
}
```

See the [AI API reference](/api/ai/) for tool round trips.

## Do not send raw JSON dumps

Do not put serialized objects into a system or user message. Escaped JSON (`\"text\":\"...\"`) is the worst case.
It uses many tokens for quotes, keys and IDs that the model does not need, and it makes the real text hard to find.

Bad (a user turn):

```text
Source-channel context: [{\"authorIdentity\":{\"discord_handle\":\"teddio\",\"discord_name\":\"teddio\",\"server_nickname\":\"teddio\",\"server_name\":\"Slopbot Staging\"},\"authorName\":\"teddio\",\"authorAliases\":[\"teddio\",\"teddio\"],\"id\":\"1559068903408148503\",\"server\":\"1528063444874432734\",\"channel\":\"1528064977913647236\",\"author\":\"667118522887045160\",\"text\":\"hello slopbot\",\"addressed\":false,\"timestamp\":1791781392672,\"isBot\":false}, ...]
```

Good:

```text
Recent messages in #general (Slopbot Staging):
[12:03] teddio: hello slopbot
[12:04] teddio: slopbot do the coolest thing u can do
```

To convert data:

- Remove fields that the model does not use, such as IDs, duplicate names and flags.
- Remove fields that have the same value in all items. Write the value one time, as a header.
- Change timestamps to short, human-readable times.
- Keep IDs only if the model must send them back in a tool call. Then put the ID at the end of the line, for example `(id 1559068903408148503)`.
- Do not send internal logs, timing data or debug output.

If the model must read structured data, use short lines or a small table. Use JSON only for tool calls and tool results.

## Send history as messages

Send each earlier turn as its own `user` or `assistant` message, and send tool results as tool result messages.
Do not put the full history into one user message.
If the history is long, keep the last turns and replace the old turns with a short summary.

## Use the cache

The cache reads the start of the prompt that is the same as in the last request. Cache reads cost less. See [Models and prices](/ai/models/).

- Put the system prompt and the tool schemas first. Do not change them between requests.
- Put data that changes, such as the time or new messages, at the end.
- Do not put a timestamp or a random ID in the system prompt.

## Check list

- The system prompt has only the role, the rules and the output format. It has no data dumps, logs or tool descriptions.
- All tools are in the `tools` field.
- No message has escaped JSON (`\"`) in it.
- Each turn is its own message.
- The `usage` field shows that `prompt_tokens` is not much larger than you expect.
