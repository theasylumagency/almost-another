import { getArticles } from '@/lib/articles';
import { getAllBroadcasts } from '@/lib/mdx';
import { getNovelChapters } from '@/lib/novels';

export const dynamic = 'force-static';

const SITE_URL = 'https://almostanother.com';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildItem({
  title,
  description,
  url,
  date,
}: {
  title: string;
  description: string;
  url: string;
  date: string;
}) {
  const pubDate = Number.isNaN(Date.parse(date)) ? new Date().toUTCString() : new Date(date).toUTCString();

  return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
}

function getSortTimestamp(date: string) {
  const timestamp = Date.parse(date);
  if (Number.isFinite(timestamp)) return timestamp;

  return 0;
}

export async function GET() {
  const articles = getArticles().slice(0, 18).map((article) => ({
    title: article.title,
    description: article.description || article.subtitle || 'New editorial',
    url: `${SITE_URL}/articles/${article.slug}`,
    date: article.date,
  }));

  const broadcasts = getAllBroadcasts().slice(0, 12).map((broadcast) => ({
    title: broadcast.title || broadcast.slug,
    description: broadcast.description || 'New dialogue',
    url: `${SITE_URL}/dialogues/${broadcast.slug}`,
    date: String(broadcast.date || ''),
  }));

  const chapters = [...getNovelChapters()]
    .reverse()
    .slice(0, 8)
    .map((chapter, index) => ({
      title: `Chapter ${chapter.chapterNumber}: ${chapter.title}`,
      description: chapter.description || 'New chronicle entry',
      url: `${SITE_URL}/novel/${chapter.slug}`,
      date: `${new Date(Date.now() - index * 60 * 1000).toISOString()}`,
    }));

  const items = [...articles, ...broadcasts, ...chapters]
    .sort((a, b) => getSortTimestamp(b.date) - getSortTimestamp(a.date))
    .slice(0, 25)
    .map(buildItem)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Almost Another</title>
    <link>${SITE_URL}</link>
    <description>Essays, dialogues, and chronicle entries from Almost Another.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
