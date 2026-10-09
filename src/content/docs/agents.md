---
title: For agents
description: How to give these docs to an AI agent, and the machine-readable files the site serves.
---

These docs are made to be read by AI agents. Give your agent one URL:

```
https://docs.pmservers.org/llms.txt
```

## Files

| URL | Contents |
|---|---|
| `/llms.txt` | An index of all pages, with a one-line summary each. Format: [llmstxt.org](https://llmstxt.org/). |
| `/llms-full.txt` | All pages in one Markdown file. |
| `/<page>.md` | One page as raw Markdown. Add `.md` to the page path, for example `/vms/ssh.md`. |
| `/openapi.json` | The OpenAPI 3.1 spec of the AI API. |

Each page in the browser also has **View as Markdown** and **Copy as Markdown** buttons.

## Prompt examples

```
Read https://docs.pmservers.org/llms.txt. Then write a Python script that
sends a chat request to PMS Cloud with the model gemma4-e4b.
```

```
Read https://docs.pmservers.org/llms-full.txt. Then help me connect to my
PMS Cloud VM with SSH.
```

## Rules for agents

- The AI API is OpenAI-compatible. Use base URL `https://api.pmservers.org/ai/v1` and the key in `PMS_API_KEY`.
- Never put an AI key in code that runs in a browser.
- `kev` works only on `POST /ai/v1/systemone`.
- For long answers, use `"stream": true`.
- Retry `429`, `502` and `504` with backoff. Do not retry `402`.
