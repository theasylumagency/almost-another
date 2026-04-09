const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BROADCASTS_PATH = path.join(process.cwd(), 'src', 'content', 'broadcast');

function getBroadcastBySlug(slug) {
    try {
        const fullPath = path.join(BROADCASTS_PATH, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) {
            console.log("File not found at:", fullPath);
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return { slug, frontmatter: data, content };
    } catch (error) {
        console.error("Error reading broadcast:", error);
        return null;
    }
}

console.log(process.cwd());
console.log(getBroadcastBySlug('aa-trump') ? 'FOUND' : 'NOT FOUND');
