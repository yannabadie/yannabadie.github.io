/** Canonical site URL (no trailing slash). Mirrors `site` in astro.config.mjs. */
export const SITE = String(import.meta.env.SITE ?? 'https://yannabadie.github.io').replace(/\/+$/, '');

export const OWNER = 'Yann Abadie';
export const ROLE = 'Senior AI & Cloud Security Architect';

/** The only call to action on the site. */
export const UPWORK_URL = 'https://www.upwork.com/freelancers/~01dc21c6a984dc9a05';
export const GITHUB_URL = 'https://github.com/yannabadie';
export const HUGGINGFACE_URL = 'https://huggingface.co/yannabadie';

/** Build an absolute canonical URL from a site-relative path such as "/work/meta-ygn/". */
export function canonical(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const rel = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return `${SITE}${rel.startsWith('/') ? rel : `/${rel}`}`;
}

/** Prefix an internal path with the configured base path. */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
