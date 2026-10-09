---
title: Your first AI request
description: Make an AI key and send a chat request with curl or the OpenAI SDK.
sidebar:
  order: 3
---

## Make a key

1. In the console, open a project. Open the **AI** tab.
2. Click **Create API key**. Select the models the key can use. Set a budget in USD.
3. Copy the key. It starts with `pms_sk_`. The console shows it **one time only**.

## Send a request

```sh
curl https://api.pmservers.org/ai/v1/chat/completions \
  -H "Authorization: Bearer $PMS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gemma4-e4b", "messages": [{"role": "user", "content": "Hello"}]}'
```

## Use the OpenAI SDK

The AI API is OpenAI-compatible. Set the base URL to `https://api.pmservers.org/ai/v1`.

```python
from openai import OpenAI

client = OpenAI(base_url="https://api.pmservers.org/ai/v1", api_key="pms_sk_...")
answer = client.chat.completions.create(
    model="gemma4-e4b",
    messages=[{"role": "user", "content": "Hello"}],
)
print(answer.choices[0].message.content)
```

```js
import OpenAI from 'openai';

const client = new OpenAI({ baseURL: 'https://api.pmservers.org/ai/v1', apiKey: process.env.PMS_API_KEY });
const answer = await client.chat.completions.create({
  model: 'gemma4-e4b',
  messages: [{ role: 'user', content: 'Hello' }],
});
console.log(answer.choices[0].message.content);
```

Next: [Models](/ai/models/) and [Errors](/ai/errors/).
