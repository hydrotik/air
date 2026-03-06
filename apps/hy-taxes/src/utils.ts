/* ─── Utility functions ──────────────────────────────────────────────────── */

/** Format a number as USD currency */
export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

/** Generate a short unique id: prefix + random hex */
export function genId(prefix: string): string {
  const hex = Math.random().toString(16).slice(2, 10);
  return `${prefix}-${hex}`;
}

/**
 * Parse a date string in various formats and return a sortable timestamp.
 * Returns 0 if unparsable (sorts to top).
 */
export function parseDateForSort(dateStr: string): number {
  if (!dateStr) return 0;

  // Try native parse first (handles YYYY-MM-DD, Month DD YYYY, etc.)
  const native = Date.parse(dateStr);
  if (!isNaN(native)) return native;

  // Handle M/DD or M/DD/YY or M/DD/YYYY
  const parts = dateStr.split('/');
  if (parts.length >= 2) {
    const month = parseInt(parts[0], 10) - 1;
    const day = parseInt(parts[1], 10);
    let year = parts[2] ? parseInt(parts[2], 10) : new Date().getFullYear();
    if (year < 100) year += 2000;
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d.getTime();
  }

  return 0;
}
