import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const EDITORIALS_PATH = path.join(process.cwd(), 'content/editorials');
const BROADCASTS_PATH = path.join(process.cwd(), 'content/broadcasts');

export function getEditorialBySlug(slug: string) {
    const fullPath = path.join(EDITORIALS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        frontmatter: data,
        content,
    };
}


export function getLinkedBroadcast(broadcastSlug: string) {
    try {
        const fullPath = path.join(BROADCASTS_PATH, `${broadcastSlug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return { slug: broadcastSlug, ...data };
    } catch (error) {
        return null;
    }
}