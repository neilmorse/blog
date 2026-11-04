import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Personal Pages: base = '/'. Project Pages: base = '/repository/'.
export default defineConfig({
  site: 'https://neilmorse.github.io',
  base: '/blog/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (url) => !url.endsWith('/404/') })],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
