import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Case studies (BRIEF §5). Every claim in a body links to its README line via <Src />. */
const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '*.mdx' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    oneLiner: z.string().max(240),
    status: z.enum(['working', 'alpha', 'hackathon', 'production']),
    /** Status pill label on one axis (stage): Released, Alpha, Hackathon or Working. */
    statusLabel: z.string().max(24),
    year: z.number().int().min(2020).max(2030),
    stack: z.array(z.string()).min(1).max(6),
    repo: z.url(),
    /** Commit the README was read at; source links are pinned to it. */
    readmeSha: z.string().regex(/^[0-9a-f]{40}$/),
    demo: z.url().optional(),
    demoLabel: z.string().optional(),
    video: z.url().optional(),
    videoLabel: z.string().optional(),
    /** Show the demo and video links in the home work list (off for pages that sell something). */
    demoOnHome: z.boolean().default(false),
    order: z.number().int().min(1),
    /** Date of the last push to the default branch (GitHub API `pushed_at`; check dates in content-facts.md). */
    lastPush: z.coerce.date(),
    /** One-sentence outcome for the home list. `mark` is highlighted and links to README line `line`. */
    summary: z.object({
      before: z.string(),
      mark: z.string().optional(),
      after: z.string(),
      line: z.string().optional(),
    }),
  }),
});

export const collections = { work };
