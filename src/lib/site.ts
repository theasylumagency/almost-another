export const SITE_URL = 'https://almostanother.com';
export const SITE_HOST = 'almostanother.com';
export const SITE_NAME = 'Almost Another';
export const SITE_DESCRIPTION =
  'Essays, dialogues, and the chronicle of a parallel world.';
export const SITE_KEYWORDS = [
  'essays',
  'dialogues',
  'novel',
  'archive',
  'parallel world',
  'breaking the paradigm',
  'almost another',
] as const;
export const SITE_RSS_PATH = '/feed.xml';

export function buildAbsoluteUrl(pathname = '/') {
  const normalizedPath = pathname
    ? pathname.startsWith('/')
      ? pathname
      : `/${pathname}`
    : '/';

  return new URL(normalizedPath, SITE_URL).toString();
}

export function toAbsoluteUrl(value?: string | null) {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;

  return buildAbsoluteUrl(value);
}

export function toValidDate(value?: string | Date | null) {
  if (!value) return undefined;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}
