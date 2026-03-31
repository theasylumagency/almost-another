import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface NovelChapterData {
  slug: string;
  title: string;
  bookTitle: string;
  author: string;
  chapterNumber: number;
  description: string;
  coverImage: string;
  content: string;
}

const contentDir = path.join(process.cwd(), 'src/content/novel');

export function getNovelChapters(): NovelChapterData[] {
  if (!fs.existsSync(contentDir)) return [];
  const fileNames = fs.readdirSync(contentDir);
  const allChapters = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || slug,
        bookTitle: matterResult.data.bookTitle || '',
        author: matterResult.data.author || '',
        chapterNumber: matterResult.data.chapterNumber || 0,
        description: matterResult.data.description || '',
        coverImage: matterResult.data.coverImage || '',
        content: matterResult.content,
      };
    });

  // Sort chapters by chapterNumber ascending
  return allChapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
}

export function getNovelChapterBySlug(slug: string): NovelChapterData | null {
  try {
    const fullPath = path.join(contentDir, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || slug,
      bookTitle: matterResult.data.bookTitle || '',
      author: matterResult.data.author || '',
      chapterNumber: matterResult.data.chapterNumber || 0,
      description: matterResult.data.description || '',
      coverImage: matterResult.data.coverImage || '',
      content: matterResult.content,
    };
  } catch (e) {
    return null;
  }
}
