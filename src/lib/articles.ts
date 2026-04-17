import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleData {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  author: string;
  description: string;
  imageWide?: string;
  imageSquare?: string;
  ogImage?: string;
  linked_broadcast?: string;
  tags: string[];
  relatedSlugs: string[];
  wordCount: number;
  readingTime: string;
  content: string;
}

export interface LinkedBroadcastData extends Record<string, unknown> {
  slug: string;
  title?: string;
  description?: string;
  author?: string;
  target_chapter?: string;
}

const contentDir = path.join(process.cwd(), 'src/content/editorials');
const imagesDir = path.join(process.cwd(), 'public/images');
const BROADCASTS_PATH = path.join(process.cwd(), 'src/content/broadcast');

const STOPWORDS = new Set([
  'about', 'after', 'again', 'against', 'almost', 'another', 'around', 'because',
  'before', 'being', 'between', 'could', 'first', 'from', 'have', 'history', 'into',
  'just', 'like', 'more', 'most', 'other', 'over', 'same', 'some', 'than', 'that',
  'their', 'there', 'these', 'they', 'this', 'those', 'through', 'under', 'very',
  'what', 'when', 'where', 'which', 'while', 'with', 'would', 'your',
]);

function resolveImages(prefix: string) {
  if (!prefix) return { imageWide: '', imageSquare: '' };

  // If it's already a full path or doesn't match the new prefix pattern, return it as is
  if (prefix.includes('/') || prefix.endsWith('.webp') || prefix.endsWith('.jpg') || prefix.endsWith('.png')) {
    const p = prefix.startsWith('/') ? prefix : `/images/${prefix}`;
    return { imageWide: p, imageSquare: p };
  }

  const wideName = `${prefix}1200.webp`;
  const squareName = `${prefix}500.webp`;

  const hasSquare = fs.existsSync(path.join(imagesDir, squareName));
  const hasWide = fs.existsSync(path.join(imagesDir, wideName));

  // If even the wide doesn't exist, we might have a broken link, but let's assume it exists or fallback gracefully
  return {
    imageWide: hasWide ? `/images/${wideName}` : '',
    imageSquare: hasSquare ? `/images/${squareName}` : (hasWide ? `/images/${wideName}` : ''),
  };
}
function resolveEditorialOgImage(data: Record<string, unknown>) {
  const raw = typeof data.og_image === 'string' ? data.og_image : (typeof data.ogImage === 'string' ? data.ogImage : '');
  if (raw) {
    const trimmed = raw.trim();
    if (trimmed.startsWith('/')) return trimmed;
    if (trimmed.includes('/')) return `/${trimmed}`;
    if (/\.(webp|png|jpg|jpeg)$/i.test(trimmed)) return `/images/${trimmed}`;
    const { imageWide, imageSquare } = resolveImages(trimmed);
    return imageWide || imageSquare || '';
  }

  const fallback = typeof data.image === 'string' ? data.image : '';
  const { imageWide, imageSquare } = resolveImages(fallback);
  return imageWide || imageSquare || '';
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function calculateReadingStats(content: string) {
  const trimmed = content.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));

  return {
    wordCount,
    readingTime: `${minutes} min read`,
  };
}

function tokenizeArticle(article: Pick<ArticleData, 'title' | 'subtitle' | 'description' | 'tags'>) {
  const content = [
    article.title,
    article.subtitle || '',
    article.description,
    article.tags.join(' '),
  ]
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ');

  return new Set(
    content
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length > 3 && !STOPWORDS.has(token))
  );
}

function getArticleMatchScore(baseArticle: ArticleData, candidate: ArticleData) {
  let score = 0;

  if (baseArticle.relatedSlugs.includes(candidate.slug)) score += 60;
  if (candidate.relatedSlugs.includes(baseArticle.slug)) score += 30;

  if (
    baseArticle.linked_broadcast &&
    candidate.linked_broadcast &&
    baseArticle.linked_broadcast === candidate.linked_broadcast
  ) {
    score += 25;
  }

  const baseTags = new Set(baseArticle.tags.map((tag) => tag.toLowerCase()));
  const sharedTags = candidate.tags.filter((tag) => baseTags.has(tag.toLowerCase())).length;
  score += sharedTags * 10;

  const baseTokens = tokenizeArticle(baseArticle);
  const candidateTokens = tokenizeArticle(candidate);
  let tokenOverlap = 0;

  candidateTokens.forEach((token) => {
    if (baseTokens.has(token)) tokenOverlap += 1;
  });

  score += Math.min(tokenOverlap, 8) * 3;

  const baseDate = Date.parse(baseArticle.date);
  const candidateDate = Date.parse(candidate.date);

  if (Number.isFinite(baseDate) && Number.isFinite(candidateDate)) {
    const dayDelta = Math.abs(baseDate - candidateDate) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 8 - Math.floor(dayDelta / 45));
  }

  return score;
}

export function getLinkedBroadcast(broadcastSlug: string): LinkedBroadcastData | null {
  try {
    const fullPath = path.join(BROADCASTS_PATH, `${broadcastSlug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: broadcastSlug,
      ...(data as Record<string, unknown>),
    };
  } catch (error) {
    console.error("Broadcast not found:", error);
    return null;
  }
}
export function getArticles(): ArticleData[] {
  if (!fs.existsSync(contentDir)) return [];
  const fileNames = fs.readdirSync(contentDir);
  const allArticles = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);
      const { imageWide, imageSquare } = resolveImages(matterResult.data.image || '');
      const ogImage = resolveEditorialOgImage(matterResult.data);
      const stats = calculateReadingStats(matterResult.content);

      return {
        slug,
        title: matterResult.data.title || slug,
        subtitle: matterResult.data.subtitle || '',
        date: matterResult.data.date || '',
        author: matterResult.data.author || '',
        description: matterResult.data.description || '',
        imageWide,
        imageSquare,
        ogImage,
        linked_broadcast: matterResult.data.linked_broadcast || '',
        tags: toStringArray(matterResult.data.tags),
        relatedSlugs: toStringArray(matterResult.data.related_slugs),
        wordCount: stats.wordCount,
        readingTime: stats.readingTime,
        content: matterResult.content,
      };
    });

  // Sort articles by date descending (newest to oldest)
  return allArticles.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getArticleBySlug(slug: string): ArticleData | null {
  try {
    const fullPath = path.join(contentDir, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const { imageWide, imageSquare } = resolveImages(matterResult.data.image || '');
    const ogImage = resolveEditorialOgImage(matterResult.data);
    const stats = calculateReadingStats(matterResult.content);

    return {
      slug,
      title: matterResult.data.title || slug,
      subtitle: matterResult.data.subtitle || '',
      date: matterResult.data.date || '',
      author: matterResult.data.author || '',
      description: matterResult.data.description || '',
      imageWide,
      imageSquare,
      ogImage,
      linked_broadcast: matterResult.data.linked_broadcast || '',
      tags: toStringArray(matterResult.data.tags),
      relatedSlugs: toStringArray(matterResult.data.related_slugs),
      wordCount: stats.wordCount,
      readingTime: stats.readingTime,
      content: matterResult.content,
    };
  } catch {
    return null;
  }
}

export function getRelatedArticles(article: ArticleData, limit = 3) {
  return getArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      score: getArticleMatchScore(article, candidate),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return Date.parse(b.article.date) - Date.parse(a.article.date);
    })
    .slice(0, limit)
    .map(({ article: relatedArticle }) => relatedArticle);
}
