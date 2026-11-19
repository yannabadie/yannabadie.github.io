#!/usr/bin/env node
// Byte budgets for a built page (BRIEF §6): HTML+CSS+JS ≤ 120 KB gzipped, fonts ≤ 110 KB, JS ≤ 10 KB gzipped.
//   node scripts/budget.mjs [page]     default: dist/index.html
import { readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const page = process.argv[2] ?? 'index.html';
const html = readFileSync(join(DIST, page), 'utf8');
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const kib = (n) => `${(n / 1024).toFixed(1)} KiB`;
const full = (n) => `${n.toLocaleString('en-US')} bytes = ${(n / 1024).toFixed(1)} KiB = ${(n / 1000).toFixed(1)} kB`;

const inlineJs = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
const inlineCss = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
const extJs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => readFileSync(join(DIST, m[1]), 'utf8')).join('\n');
const extCss = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((m) => readFileSync(join(DIST, m[1]), 'utf8')).join('\n');
const fonts = [...new Set([...html.matchAll(/url\((\/_astro\/[^)]+\.woff2)\)/g)].map((m) => m[1]))];
const fontBytes = fonts.reduce((sum, f) => sum + statSync(join(DIST, f)).size, 0);

const total = gz(html) + (extJs ? gz(extJs) : 0) + (extCss ? gz(extCss) : 0);
const js = gz(inlineJs + extJs);
const rows = [
  ['HTML (incl. inline CSS + JS), gzip', gz(html)],
  ['  of which CSS, gzip', gz(inlineCss + extCss)],
  ['  of which JS, gzip', js],
  ['External CSS/JS files, gzip', (extJs ? gz(extJs) : 0) + (extCss ? gz(extCss) : 0)],
  [`Fonts (${fonts.length} woff2)`, fontBytes],
];
for (const [k, v] of rows) console.log(`${k.padEnd(40)} ${kib(v)}`);
const checks = [
  ['HTML+CSS+JS ≤ 120 KiB gzip', total <= 120 * 1024, kib(total)],
  ['JS ≤ 10 KiB gzip', js <= 10 * 1024, kib(js)],
  ['Fonts ≤ 110 KiB (binary KB; 110 kB decimal would be 110,000 bytes)', fontBytes <= 110 * 1024, full(fontBytes)],
  ['≤ 4 font files', fonts.length <= 4, String(fonts.length)],
];
let ok = true;
for (const [name, pass, val] of checks) {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name} (${val})`);
  ok &&= pass;
}
process.exit(ok ? 0 : 1);
