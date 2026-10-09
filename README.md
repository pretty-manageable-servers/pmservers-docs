# PMS Cloud docs

The public docs at https://docs.pmservers.org. Built with [Astro Starlight](https://starlight.astro.build/).

## Edit the docs

All pages are Markdown files in `src/content/docs/`. The folder is the URL:
`src/content/docs/vms/ssh.md` is `/vms/ssh/`.

Each page needs front matter:

```yaml
---
title: Connect with SSH
description: One sentence. Agents read it in llms.txt.
sidebar:
  order: 2
---
```

Push to `main`. Cloudflare Pages builds and deploys the site. Other branches get preview URLs.

### Writing rules

- Use ASD-STE100 Simplified Technical English. Short sentences.
- Each page must make sense alone. Agents often read one page only.
- Give exact numbers: "100 MB", not "large files".
- Put error codes and limits in tables.
- Use plain Markdown. Starlight asides (`:::note`) are fine. Do not use MDX components: the raw `.md` output must stay readable.

## For agents

The build makes these files from the Markdown:

| URL | Source |
|---|---|
| `/llms.txt` | `src/pages/llms.txt.ts`: index of all pages |
| `/llms-full.txt` | `src/pages/llms-full.txt.ts`: all pages in one file |
| `/<page>.md` | `src/pages/[...slug].md.ts`: one page as raw Markdown |
| `/openapi.json` | `public/openapi.json`: the AI API spec, written by hand |

Keep `public/openapi.json` the same as the AI gateway in `pmservers-api` (`rust/ai-gateway`).

## Run locally

```sh
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # output in dist/
```

## Deploy

`infra/` has the OpenTofu config for the Pages project and the `docs.pmservers.org` record. See `infra/README.md`.
