import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const EDITORIALS_PATH = path.join(process.cwd(), 'src', 'content', 'editorials');
const BROADCASTS_PATH = path.join(process.cwd(), 'src', 'content', 'broadcast');
const BROADCAST_IMAGES_PATH = path.join(process.cwd(), 'public', 'aabc_images');

export type BroadcastFrontmatter = Record<string, any> & { ogImage?: string };
export type BroadcastData = {
    slug: string;
    frontmatter: BroadcastFrontmatter;
    content: string;
    ogImage?: string;
};
export type LinkedBroadcastData = Record<string, unknown> & {
    slug: string;
    title?: string;
    description?: string;
    author?: string;
    target_chapter?: string;
};

function resolveBroadcastOgImage(slug: string, data: Record<string, unknown>) {
    const raw = typeof data.og_image === 'string' ? data.og_image : (typeof data.ogImage === 'string' ? data.ogImage : '');
    if (raw) {
        const trimmed = raw.trim();
        if (trimmed.startsWith('/')) return trimmed;
        if (trimmed.includes('/')) return `/${trimmed}`;
        return `/aabc_images/${slug}/${trimmed}`;
    }

    if (typeof data.mainImage === 'string' && data.mainImage) {
        return `/aabc_images/${slug}/${data.mainImage}`;
    }

    try {
        const folder = path.join(BROADCAST_IMAGES_PATH, slug);
        if (!fs.existsSync(folder)) return '';
        const files = fs.readdirSync(folder).filter((file) => !file.startsWith('.'));
        if (files.length === 0) return '';
        files.sort();
        return `/aabc_images/${slug}/${files[0]}`;
    } catch {
        return '';
    }
}

export function getLinkedBroadcast(broadcastSlug: string): LinkedBroadcastData | null {
    try {
        const fullPath = path.join(BROADCASTS_PATH, `${broadcastSlug}.mdx`);

        if (!fs.existsSync(fullPath)) {
            console.error(`[AABC DEBUG] Broadcast file NOT FOUND at: ${fullPath}`);
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return { slug: broadcastSlug, ...(data as Record<string, unknown>) };
    } catch (error) {
        console.error("Broadcast read error:", error);
        return null;
    }
}
// src/lib/mdx.ts - დაამატე ფაილის ბოლოში

export function getBroadcastBySlug(slug: string): BroadcastData | null {
    try {
        const fullPath = path.join(BROADCASTS_PATH, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const frontmatter = data as BroadcastFrontmatter;

        const ogImage = resolveBroadcastOgImage(slug, frontmatter);

        return { slug, frontmatter: { ...frontmatter, ogImage }, content, ogImage };
    } catch (error) {
        console.error("Error reading broadcast:", error);
        return null;
    }
}

export function getAllBroadcasts(): Array<BroadcastFrontmatter & { slug: string; ogImage?: string }> {
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
                const frontmatter = data as BroadcastFrontmatter;
                const ogImage = resolveBroadcastOgImage(slug, frontmatter);
                return { slug, ...frontmatter, ogImage };
            });

        return broadcasts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error("Error reading all broadcasts:", error);
        return [];
    }
}
