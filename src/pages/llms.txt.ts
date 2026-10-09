import type { APIRoute } from 'astro';
import { getPages, markdownPath } from '../lib/pages';

// The index for agents. Format: https://llmstxt.org/
export const GET: APIRoute = async ({ site }) => {
  const pages = await getPages();
  const link = (path: string) => new URL(path, site).href;
  const lines = [
    '# PMS Cloud',
    '',
    '> PMS Cloud (PMServers) is a small cloud provider. It has VMs, containers and an OpenAI-compatible AI API. The console is https://console.pmservers.org. The API is https://api.pmservers.org.',
    '',
    `Each link below is a raw Markdown file. All pages in one file: ${link('/llms-full.txt')}`,
    `OpenAPI spec of the AI API: ${link('/openapi.json')}`,
    '',
    '## Docs',
    '',
    ...pages.map((page) => {
      const description = page.data.description ? `: ${page.data.description}` : '';
      return `- [${page.data.title}](${link(markdownPath(page.id))})${description}`;
    }),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
