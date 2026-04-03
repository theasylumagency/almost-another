'use client';

import { useEffect, useState } from 'react';
import { Eye, Hexagon, Power } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ArchiveDrawer, { ChapterMetaData } from '@/components/novel/ArchiveDrawer';
import ChapterTimeline from '@/components/novel/ChapterTimeline';

interface NovelClientWrapperProps {
  slug: string;
  chapters: ChapterMetaData[];
  currentChapter: number;
}

// მცირე, მექანიკური "ხრახნის" კომპონენტი
const Screw = () => (
  <div className="w-2 h-2 rounded-full bg-[#2D3A33] border border-[#1A2520] shadow-inner relative flex items-center justify-center">
    <div className="w-full h-[1px] bg-[#1A2520] rotate-45"></div>
    <div className="w-full h-[1px] bg-[#1A2520] -rotate-45"></div>
  </div>
);

export default function NovelClientWrapper({ slug, chapters, currentChapter }: NovelClientWrapperProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const [jumpTo, setJumpTo] = useState('');

  useEffect(() => {
    // Save last read
    localStorage.setItem('lastReadNovelChapter', slug);
  }, [slug]);

  // ვფილტრავთ წინა 3 და შემდეგ 3 თავს
  const visiblePrev = chapters
    .filter(c => c.chapterNumber < currentChapter && c.chapterNumber >= currentChapter - 3)
    .sort((a, b) => a.chapterNumber - b.chapterNumber);

  const visibleNext = chapters
    .filter(c => c.chapterNumber > currentChapter && c.chapterNumber <= currentChapter + 3)
    .sort((a, b) => a.chapterNumber - b.chapterNumber);

  // ფუნქცია გამჭვირვალობის დასადგენად (მანძილის მიხედვით)
  const getOpacityClass = (distance: number) => {
    if (distance === 1) return "opacity-70";
    if (distance === 2) return "opacity-40";
    if (distance === 3) return "opacity-20";
    return "opacity-100";
  };

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const targetInfo = chapters.find(c => c.chapterNumber === parseInt(jumpTo));
    if (targetInfo) {
      router.push(`/novel/${targetInfo.slug}`);
      setJumpTo('');
    } else {
      setJumpTo('');
    }
  };

  return (
    <>
      <ArchiveDrawer
        chapters={chapters}
        currentChapter={currentChapter}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* DESKTOP NAVIGATION: საბჭოთა რეტრო-ფუტურისტული კონსოლი */}
      <div className="hidden md:flex flex-col fixed top-0 left-0 h-full w-[75px] bg-[#f3561c] border-r border-[#2D3A33] z-40 items-center justify-between py-6 group hover:bg-[#ff4400] transition-colors duration-500 ease-in-out font-mono text-[10px] text-[#A3B1A9] uppercase tracking-widest">

        {/* section 1: archive */}
        <div className="flex flex-col items-center gap-2 w-full p-2 relative">
          <div className="absolute top-0 left-0 p-1"><Screw /></div>
          <div className="absolute top-0 right-0 p-1"><Screw /></div>

          <div className="font-sans text-[8px] opacity-70 mb-1">SECTOR</div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center w-12 h-12 rounded-sm bg-[#111915] border border-[#2D3A33] hover:border-accent hover:bg-[#202E28] transition-all duration-300 relative group"
            title="Access Prefecture Archive"
          >
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-600 border border-[#1A2520] animate-pulse"></div>
            <Eye size={22} className="text-[#A3B1A9] group-hover:text-accent transition-colors" />
          </button>

          <span className="mt-1">ARCHIVE</span>
        </div>

        {/* divider */}
        <div className="h-[2px] w-full bg-[#2D3A33] border-t border-[#1A2520]"></div>

        {/* chapter list */}
        <div className="flex flex-col items-center gap-2 w-full p-2 relative">
          <div className="absolute top-0 left-0 p-1"><Screw /></div>
          <div className="absolute top-0 right-0 p-1"><Screw /></div>

          <div className="font-sans text-[8px] opacity-70 mb-1">CH. LIST</div>

          <div className="flex flex-col items-center gap-3 w-full select-none text-white">

            {/* previous chapters */}
            {visiblePrev.map(chap => (
              <Link
                key={chap.slug}
                href={`/novel/${chap.slug}`}
                className={`transition-all duration-300 hover:text-accent hover:opacity-100 hover:scale-110 ${getOpacityClass(currentChapter - chap.chapterNumber)}`}
                title={chap.title}
              >
                {String(chap.chapterNumber).padStart(2, '0')}
              </Link>
            ))}

            {/* current chapter (LED screen) */}
            <div className="w-full flex justify-center py-2 bg-[#111915] border-y border-[#2D3A33] relative">
              <div className="absolute inset-y-0 left-0 w-[3px] bg-red-600 opacity-60"></div>
              <div className="absolute inset-y-0 right-0 w-[3px] bg-red-600 opacity-60"></div>

              <span className="text-accent font-bold text-base tracking-[0.2em] relative flex items-center justify-center">
                <span className="absolute -left-1 text-red-600 opacity-30">[</span>
                {String(currentChapter).padStart(2, '0')}
                <span className="absolute -right-1 text-red-600 opacity-30">]</span>
              </span>
            </div>

            {/* next chapters */}
            {visibleNext.map(chap => (
              <Link
                key={chap.slug}
                href={`/novel/${chap.slug}`}
                className={`transition-all duration-300 hover:text-accent hover:opacity-100 hover:scale-110 ${getOpacityClass(chap.chapterNumber - currentChapter)}`}
                title={chap.title}
              >
                {String(chap.chapterNumber).padStart(2, '0')}
              </Link>
            ))}
          </div>

          <span className="mt-2">CONTROL</span>
        </div>

        {/* divider */}
        <div className="h-[2px] w-full bg-[#2D3A33] border-t border-[#1A2520]"></div>

        {/* fast jump */}
        <div className="flex flex-col items-center gap-2 w-full p-2 relative">
          <div className="absolute top-0 left-0 p-1"><Screw /></div>
          <div className="absolute top-0 right-0 p-1"><Screw /></div>

          <div className="font-sans text-[8px] opacity-70 mb-1">CH. JUMP</div>

          <form onSubmit={handleJump} className="w-full group px-2">
            <input
              type="number"
              min="1"
              max={chapters.length}
              value={jumpTo}
              onChange={(e) => setJumpTo(e.target.value)}
              className="w-full bg-[#111915] border border-[#2D3A33] text-center text-xs font-mono text-white outline-none focus:border-red-600 py-2 transition-colors placeholder:text-[#2D3A33]"
              placeholder=".."
            />
            <button type="submit" className="hidden"></button>
          </form>

          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-red-600 border border-[#1A2520]"></div>
            <span>POWER ON</span>
          </div>

          {/* დეკორატიული ტექსტი */}
          <div
            className="font-mono text-[9px] text-[#2D3A33] opacity-60 whitespace-nowrap mt-4 pointer-events-none select-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            SYS.NAV.ONLINE
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION: რჩება უცვლელი */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-white/10 z-40 flex flex-col pointer-events-auto">
        <div className="flex h-12 items-center justify-between px-2">
          {/* ToC Toggle */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center w-12 h-full border-r border-white/10 text-zinc-500 hover:text-accent transition-colors"
            title="Access Archive"
          >
            <Eye size={20} />
          </button>

          {/* Chapter Timeline */}
          <div className="flex-1 flex justify-center items-center px-2">
            <ChapterTimeline chapters={chapters} currentChapter={currentChapter} />
          </div>
        </div>
      </div>
    </>
  );
}