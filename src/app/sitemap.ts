import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/articles';
import { getAllBroadcasts } from '@/lib/mdx';
import { getNovelChapters } from '@/lib/novels';
import { buildAbsoluteUrl, toAbsoluteUrl, toValidDate } from '@/lib/site';

type SitemapEntry = MetadataRoute.Sitemap[number];

function getLatestDate(values: Array<string | Date | null | undefined>) {
  return values.reduce<Date | undefined>((latest, value) => {
    const current = toValidDate(value);
    if (!current) return latest;
    if (!latest || current > latest) return current;
    return latest;
  }, undefined);
}

function uniqueImages(values: Array<string | null | undefined>) {
  return [...new Set(values.map((value) => toAbsoluteUrl(value)).filter(Boolean))] as string[];
}

function entry(
  pathname: string,
  options: Omit<SitemapEntry, 'url'> = {}
): SitemapEntry {
  return {
    url: buildAbsoluteUrl(pathname),
    ...options,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles();
  const broadcasts = getAllBroadcasts();
  const chapters = getNovelChapters();

  const latestArticleDate = getLatestDate(articles.map((article) => article.date));
  const latestBroadcastDate = getLatestDate(
    broadcasts.map((broadcast) => String(broadcast.date ?? ''))
  );
  const latestContentDate = getLatestDate([
    latestArticleDate,
    latestBroadcastDate,
  ]);

  const staticEntries: MetadataRoute.Sitemap = [
    entry('/', {
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 1,
    }),
    entry('/articles', {
      lastModified: latestArticleDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    }),
    entry('/dialogues', {
      lastModified: latestBroadcastDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    entry('/terminal', {
      changeFrequency: 'monthly',
      priority: 0.5,
    }),
  ];

  const articleEntries = articles.map((article) =>
    entry(`/articles/${article.slug}`, {
      lastModified: toValidDate(article.date),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: uniqueImages([
        article.ogImage,
        article.imageWide,
        article.imageSquare,
      ]),
    })
  );

  const broadcastEntries = broadcasts.map((broadcast) =>
    entry(`/dialogues/${broadcast.slug}`, {
      lastModified: toValidDate(String(broadcast.date ?? '')),
      changeFrequency: 'monthly',
      priority: 0.75,
      images: uniqueImages([broadcast.ogImage as string | undefined]),
    })
  );

  const chapterEntries = chapters.map((chapter) =>
    entry(`/novel/${chapter.slug}`, {
      changeFrequency: 'monthly',
      priority: chapter.chapterNumber === 1 ? 0.7 : 0.65,
      images: uniqueImages([chapter.ogImage, chapter.coverImage]),
    })
  );

  return [
    ...staticEntries,
    ...articleEntries,
    ...broadcastEntries,
    ...chapterEntries,
  ];
}
