import type { APIRoute } from 'astro';
import { SITE } from '../consts';

const SITEMAPS = [
  `${SITE}/sitemap-index.xml`,
  `${SITE}/facturkit-2027/sitemap.xml`,
  `${SITE}/observatoire-dpe-rge-france/sitemap.xml`,
  `${SITE}/eu-tenders-opendata-explorer/sitemap.xml`,
  `${SITE}/cra-sbom-guard/sitemap.xml`,
  `${SITE}/accessikit-eaa-rgaa/sitemap.xml`,
  `${SITE}/ai-act-art50-guard/sitemap.xml`,
  `${SITE}/battery-dpp-check/sitemap.xml`,
];

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\n${SITEMAPS.map((u) => `Sitemap: ${u}`).join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
