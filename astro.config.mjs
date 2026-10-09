// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.pmservers.org',
  integrations: [
    starlight({
      title: 'PMS Cloud Docs',
      description: 'Documentation for PMS Cloud: VMs, containers, storage and an OpenAI-compatible AI API.',
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      components: {
        PageTitle: './src/components/PageTitle.astro',
      },
      head: [
        // Tell agents where the Markdown index is.
        { tag: 'link', attrs: { rel: 'alternate', type: 'text/plain', title: 'llms.txt', href: '/llms.txt' } },
      ],
      social: [
        { icon: 'external', label: 'Console', href: 'https://console.pmservers.org' },
      ],
      sidebar: [
        { label: 'Get started', items: [{ autogenerate: { directory: 'get-started' } }] },
        { label: 'VMs', items: [{ autogenerate: { directory: 'vms' } }] },
        { label: 'Containers', items: [{ autogenerate: { directory: 'containers' } }] },
        { label: 'AI', items: [{ autogenerate: { directory: 'ai' } }] },
        { label: 'Storage', items: [{ autogenerate: { directory: 'storage' } }] },
        { label: 'Billing and limits', items: [{ autogenerate: { directory: 'billing' } }] },
        { label: 'API reference', items: [{ autogenerate: { directory: 'api' } }] },
        { label: 'For agents', link: '/agents/' },
      ],
    }),
  ],
});
