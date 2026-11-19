/** Permalink to a README line (or range) at a pinned commit, rendered with line numbers. */
export function readmeLine(repo: string, sha: string, line: string): string {
  const [from, to] = line.split('-');
  const anchor = to ? `#L${from}-L${to}` : `#L${from}`;
  return `${repo.replace(/\/+$/, '')}/blob/${sha}/README.md?plain=1${anchor}`;
}

/** "7" -> "L7", "9-12" -> "L9–12" */
export function lineLabel(line: string): string {
  const [from, to] = line.split('-');
  return to ? `L${from}–${to}` : `L${from}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}
