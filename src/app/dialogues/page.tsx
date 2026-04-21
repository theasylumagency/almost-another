import type { Metadata } from 'next';
import { getAllBroadcasts } from '@/lib/mdx';
import AABCHubClient from './AABCHubClient';

const description =
  'AABC dialogues that answer the essays with adjacent voices, conflicts, and linked narrative branches.';

export const metadata: Metadata = {
  title: 'Dialogues',
  description,
  alternates: {
    canonical: '/dialogues',
  },
};

export default async function AABCHub() {
  // Fetch broadcasts dynamically on the server
  const tempBroadcasts = getAllBroadcasts();
  
  const broadcasts = tempBroadcasts.map((b: any) => ({
    slug: b.slug,
    title: b.title || b.slug,
    subject: b.subject || 'CLASSIFIED',
    reality: b.reality || 'REALITY MULTIVERSE',
    research_reality: b.research_reality || null,
    status: b.status || 'DECRYPTED LOG',
    description: b.description || 'No summary available.',
    date: b.date || 'UNKNOWN',
    format: b.format || 'interview',
  }));

  return <AABCHubClient broadcasts={broadcasts} />;
}
