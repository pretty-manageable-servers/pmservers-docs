// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';

export default defineConfig({
  site: 'https://docs.pmservers.org',
  integrations: [
    starlight({
      title: 'PMS Cloud Docs',
      description: 'Documentation for PMS Cloud: VMs, containers, storage and an OpenAI-compatible AI API.',
      favicon: '/favicon.svg',
      logo: { src: './src/assets/logo.svg', alt: 'PMS Cloud' },
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/source-serif-4',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/custom.css',
      ],
      components: {
        Header: './src/components/Header.astro',
        Hero: './src/components/Hero.astro',
        MarkdownContent: './src/components/MarkdownContent.astro',
        PageTitle: './src/components/PageTitle.astro',
        Sidebar: './src/components/Sidebar.astro',
      },
      head: [
        // Tell agents where the Markdown index is.
        { tag: 'link', attrs: { rel: 'alternate', type: 'text/plain', title: 'llms.txt', href: '/llms.txt' } },
      ],
      expressiveCode: {
        themes: ['github-dark-default', 'github-light-default'],
        defaultProps: { frame: 'code' },
        styleOverrides: {
          borderRadius: '0',
          borderWidth: '0',
          codeBackground: 'var(--pms-code-bg)',
          codeFontFamily: 'var(--sl-font-mono)',
          codeFontSize: '0.8125rem',
          codeLineHeight: '1.65',
          codePaddingBlock: '1rem',
          codePaddingInline: '1rem',
          frames: {
            frameBoxShadowCssValue: 'none',
            editorBackground: 'var(--pms-code-bg)',
            editorTabBarBackground: 'var(--pms-code-bg)',
            editorTabBarBorderBottomColor: 'transparent',
            terminalBackground: 'var(--pms-code-bg)',
            terminalTitlebarBackground: 'var(--pms-code-bg)',
            terminalTitlebarBorderBottomColor: 'transparent',
            inlineButtonBorder: 'transparent',
            inlineButtonBackground: 'var(--sl-color-gray-5)',
          },
        },
      },
      plugins: [
        starlightSidebarTopics([
          {
            label: 'Guides',
            link: '/get-started/overview/',
            items: [
              { label: 'Get started', items: [{ autogenerate: { directory: 'get-started' } }] },
              { label: 'VMs', items: [{ autogenerate: { directory: 'vms' } }] },
              { label: 'Containers', items: [{ autogenerate: { directory: 'containers' } }] },
              { label: 'Storage', items: [{ autogenerate: { directory: 'storage' } }] },
              { label: 'Billing and limits', items: [{ autogenerate: { directory: 'billing' } }] },
              { label: 'For agents', items: ['agents'] },
            ],
          },
          {
            label: 'AI API',
            link: '/ai/overview/',
            items: [{ label: 'AI API', items: [{ autogenerate: { directory: 'ai' } }] }],
          },
          {
            label: 'API reference',
            link: '/api/overview/',
            items: [{ label: 'API reference', items: [{ autogenerate: { directory: 'api' } }] }],
          },
        ]),
      ],
    }),
  ],
});
