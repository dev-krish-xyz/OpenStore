const compactFormat = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const exactFormat = new Intl.NumberFormat('en');
// Pinned to UTC so server and client render identical dates.
const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export const compact = (n?: number | null) => (n == null ? '—' : compactFormat.format(n));
export const exact = (n?: number | null) => (n == null ? 'Unavailable' : exactFormat.format(n));
export const formatDate = (value?: string | null) => (value ? dateFormat.format(new Date(value)) : 'Unavailable');
export const plural = (count: number, one: string, many = `${one}s`) => (count === 1 ? one : many);
