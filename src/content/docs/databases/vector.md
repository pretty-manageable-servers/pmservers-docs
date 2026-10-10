---
title: Vector search
description: Store embeddings in a pgvector column and find the nearest rows. Example with the embeddinggemma2 model of the PMS AI API (768 dimensions).
sidebar:
  order: 3
---

First select **Enable vector** on the database. See [Vector](/databases/overview/#vector).

This example stores text with an embedding from the `embeddinggemma2` model. That model returns 768 dimensions. See [Models](/ai/models/).

## Make a table

```sql
create table docs (
  id bigserial primary key,
  body text not null,
  embedding vector(768) not null
);

create index on docs using hnsw (embedding vector_cosine_ops);
```

## Add rows and search

Python, with `psycopg` and the `openai` client:

```python
import os
import psycopg
from openai import OpenAI

ai = OpenAI(base_url="https://api.pmservers.org/ai/v1", api_key=os.environ["PMS_API_KEY"])

def embed(text: str) -> str:
    vector = ai.embeddings.create(model="embeddinggemma2", input=text).data[0].embedding
    return "[" + ",".join(str(x) for x in vector) + "]"

with psycopg.connect(os.environ["DATABASE_URL"]) as conn:
    conn.execute("insert into docs (body, embedding) values (%s, %s)",
                 ("Containers are workers.", embed("Containers are workers.")))
    rows = conn.execute(
        "select body from docs order by embedding <=> %s::vector limit 5",
        (embed("What is a container?"),),
    ).fetchall()
    print(rows)
```

`<=>` is the cosine distance. A smaller value is a closer match.

## Storage

Vectors use storage quickly. One `vector(768)` value is about 3 KiB. 100,000 rows with an index can be more than 600 MiB. Watch the storage bar in the console. See [Storage limit](/databases/storage-limit/).
