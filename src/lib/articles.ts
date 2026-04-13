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
  content: string;
}

const contentDir = path.join(process.cwd(), 'src/content/editorials');
const imagesDir = path.join(process.cwd(), 'public/images');
const EDITORIALS_PATH = path.join(process.cwd(), 'src/content/editorials');
const BROADCASTS_PATH = path.join(process.cwd(), 'src/content/broadcast');
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
export function getLinkedBroadcast(broadcastSlug: string): Record<string, any> | null {
  try {
    const fullPath = path.join(BROADCASTS_PATH, `${broadcastSlug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return { slug: broadcastSlug, ...data };
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
      content: matterResult.content,
    };
  } catch (e) {
    return null;
  }
}
