// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Deployed as a GitHub Pages user site (repository `yannabadie.github.io`), served from the
 * domain root. Canonical links, the sitemap, robots.txt, Open Graph and JSON-LD all build
 * their absolute URLs from `site`; mirrored as the fallback of SITE in src/consts.ts.
 */
export default defineConfig({
  site: 'https://yannabadie.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
