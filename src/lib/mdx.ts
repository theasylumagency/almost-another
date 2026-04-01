import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const EDITORIALS_PATH = path.join(process.cwd(), 'src', 'content', 'editorials');
const BROADCASTS_PATH = path.join(process.cwd(), 'src', 'content', 'broadcast');

export function getLinkedBroadcast(broadcastSlug: string) {
    try {
        const fullPath = path.join(BROADCASTS_PATH, `${broadcastSlug}.mdx`);

        if (!fs.existsSync(fullPath)) {
            console.error(`[AABC DEBUG] Broadcast file NOT FOUND at: ${fullPath}`);
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return { slug: broadcastSlug, ...data };
    } catch (error) {
        console.error("Broadcast read error:", error);
        return null;
    }
}
// src/lib/mdx.ts - დაამატე ფაილის ბოლოში

export function getBroadcastBySlug(slug: string) {
    try {
        const fullPath = path.join(BROADCASTS_PATH, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return { slug, frontmatter: data, content };
    } catch (error) {
        console.error("Error reading broadcast:", error);
        return null;
    }
}

export function getAllBroadcasts() {
    try {
        if (!fs.existsSync(BROADCASTS_PATH)) return [];

        const files = fs.readdirSync(BROADCASTS_PATH);
        const broadcasts = files
            .filter((file) => file.endsWith('.mdx'))
            .map((file) => {
                const slug = file.replace('.mdx', '');
                const fullPath = path.join(BROADCASTS_PATH, file);
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data } = matter(fileContents);
                return { slug, ...data };
            });

        return broadcasts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error("Error reading all broadcasts:", error);
        return [];
    }
}