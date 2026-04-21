import type { Metadata } from 'next';
import NovelHubRedirect from './NovelHubRedirect';

export const metadata: Metadata = {
  title: 'Chronicle',
  description:
    'Enter the parallel-world chronicle that extends the essays and dialogues into narrative form.',
  alternates: {
    canonical: '/novel/chapter-1',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NovelHub() {
  return <NovelHubRedirect />;
}
