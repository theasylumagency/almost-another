'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function NovelHubRedirect() {
  const router = useRouter();

  useEffect(() => {
    const lastRead = localStorage.getItem('lastReadNovelChapter');

    if (lastRead) {
      router.replace(`/novel/${lastRead}`);
      return;
    }

    router.replace('/novel/chapter-1');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
      <p className="font-label text-xs tracking-[0.2em] uppercase text-zinc-500">
        Accessing Sub-Level Archives...
      </p>
    </div>
  );
}
