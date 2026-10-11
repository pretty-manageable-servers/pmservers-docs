import { getCollection, type CollectionEntry } from 'astro:content';

export type DocsPage = CollectionEntry<'docs'>;

// The order of the sidebar. Pages in other folders come last.
const SECTION_ORDER = [
  '',
  'get-started',
  'cli',
  'vms',
  'containers',
  'databases',
  'sandboxes',
  'storage',
  'billing',
  'agents',
  'changelog',
  'ai',
  'api',
];

function section(page: DocsPage): string {
  return page.id === 'index' ? '' : page.id.split('/')[0];
}

function sectionIndex(page: DocsPage): number {
  const index = SECTION_ORDER.indexOf(section(page));
  return index === -1 ? SECTION_ORDER.length : index;
}

/** All pages, in sidebar order. */
export async function getPages(): Promise<DocsPage[]> {
  const pages = await getCollection('docs', (page) => !page.data.draft);
  return pages.sort(
    (a, b) =>
      sectionIndex(a) - sectionIndex(b) ||
      (a.data.sidebar.order ?? 999) - (b.data.sidebar.order ?? 999) ||
      a.id.localeCompare(b.id),
  );
}

/** The path of the raw Markdown file for a page, for example `/vms/ssh.md`. */
export function markdownPath(id: string): string {
  return id === 'index' || id === '' ? '/index.md' : `/${id}.md`;
}

/**
 * Makes root-relative links absolute. A link to a page points at its Markdown file.
 * Example: `](/vms/ssh/#keys)` becomes `](https://docs.pmservers.org/vms/ssh.md#keys)`.
 */
export function absoluteLinks(markdown: string, site: URL | undefined): string {
  const base = (site ?? new URL('https://docs.pmservers.org')).origin;
  return markdown.replace(/\]\(\/(?!\/)([^)\s#]*)(#[^)\s]*)?\)/g, (_match, path: string, hash = '') => {
    let target = path;
    if (target === '') target = 'index.md';
    else if (target.endsWith('/')) target = `${target.slice(0, -1)}.md`;
    return `](${base}/${target}${hash})`;
  });
}

/** The page as one Markdown document: title, description, source URL, then the body. */
export function pageMarkdown(page: DocsPage, site: URL | undefined): string {
  const url = new URL(page.id === 'index' ? '/' : `/${page.id}/`, site).href;
  const lines = [`# ${page.data.title}`, ''];
  if (page.data.description) lines.push(`> ${page.data.description}`, '');
  lines.push(`Source: ${url}`, '', absoluteLinks((page.body ?? '').trim(), site), '');
  return lines.join('\n');
}
