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
const PRODUCT_SITEMAPS = [
  'https://yannabadie.github.io/observatoire-dpe-rge-france/sitemap.xml',
  'https://yannabadie.github.io/eu-tenders-opendata-explorer/sitemap.xml',
  'https://yannabadie.github.io/cra-sbom-guard/sitemap.xml',
  'https://yannabadie.github.io/accessikit-eaa-rgaa/sitemap.xml',
  'https://yannabadie.github.io/ai-act-art50-guard/sitemap.xml',
  'https://yannabadie.github.io/battery-dpp-check/sitemap.xml',
];

export default defineConfig({
  site: 'https://yannabadie.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [mdx(), sitemap({ customSitemaps: PRODUCT_SITEMAPS })],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
