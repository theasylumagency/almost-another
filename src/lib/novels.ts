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
  wordCount: number;
  readingTime: string;
  linked_broadcast?: string;
  ideologicalDeviation: number;
}

const contentDir = path.join(process.cwd(), 'src/content/novel');

function calculateStats(content: string, chapterNumber: number) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  const readingTime = `${minutes}m ${Math.floor(Math.random() * 60).toString().padStart(2, '0')}s`;
  
  // Random ideological deviation between 20 and 40, potentially higher for later chapters
  const baseDeviation = 20 + (chapterNumber * 2);
  const ideologicalDeviation = Math.min(99, baseDeviation + Math.floor(Math.random() * 15));

  return { wordCount: words, readingTime, ideologicalDeviation };
}

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
      const stats = calculateStats(matterResult.content, matterResult.data.chapterNumber || 0);

      return {
        slug,
        title: matterResult.data.title || slug,
        bookTitle: matterResult.data.bookTitle || '',
        author: matterResult.data.author || '',
        chapterNumber: matterResult.data.chapterNumber || 0,
        description: matterResult.data.description || '',
        coverImage: matterResult.data.coverImage || '',
        content: matterResult.content,
        wordCount: stats.wordCount,
        readingTime: stats.readingTime,
        ideologicalDeviation: stats.ideologicalDeviation,
        linked_broadcast: matterResult.data.linked_broadcast,
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
    
    const stats = calculateStats(matterResult.content, matterResult.data.chapterNumber || 0);

    return {
      slug,
      title: matterResult.data.title || slug,
      bookTitle: matterResult.data.bookTitle || '',
      author: matterResult.data.author || '',
      chapterNumber: matterResult.data.chapterNumber || 0,
      description: matterResult.data.description || '',
      coverImage: matterResult.data.coverImage || '',
      content: matterResult.content,
      wordCount: stats.wordCount,
      readingTime: stats.readingTime,
      ideologicalDeviation: stats.ideologicalDeviation,
      linked_broadcast: matterResult.data.linked_broadcast,
    };
  } catch (e) {
    return null;
  }
}
