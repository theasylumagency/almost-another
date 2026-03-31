"use client";

import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareButtonsProps {
  title: string;
  className?: string;
  isDesktop?: boolean;
}

export default function ShareButtons({ title, className = "", isDesktop = false }: ShareButtonsProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setUrl(window.location.href);
  }, []);

  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);

  const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const buttonClass = "text-zinc-500 hover:text-zinc-300 transition-colors flex flex-col items-center gap-1";

  const content = (
    <>
      {isDesktop && (
        <>
          <span className="font-label text-[10px] tracking-widest text-zinc-500 uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>Share</span>
          <div className="w-[1px] h-12 bg-outline-variant opacity-20"></div>
        </>
      )}
      {!isDesktop && (
        <span className="font-label text-[10px] tracking-widest text-zinc-500 uppercase">Share</span>
      )}
      
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={buttonClass} aria-label="Share on X (Twitter)">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
        {isDesktop && <span className="font-label text-[8px] uppercase tracking-tighter text-zinc-600">X</span>}
      </a>
      
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={buttonClass} aria-label="Share on LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        {isDesktop && <span className="font-label text-[8px] uppercase tracking-tighter text-zinc-600">LI</span>}
      </a>
      
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={buttonClass} aria-label="Share on Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103v3.328h-2.328c-2.111 0-2.312.623-2.312 2.329v1.8h3.814l-.443 3.667h-3.371v7.98h-2.686z" />
        </svg>
        {isDesktop && <span className="font-label text-[8px] uppercase tracking-tighter text-zinc-600">FB</span>}
      </a>
      
      <button onClick={handleCopy} className={buttonClass} title="Copy link" aria-label="Copy link">
        <Share2 size={20} className={copied ? "text-primary transition-colors" : ""} />
        {isDesktop && (
          <span className={`font-label text-[8px] uppercase tracking-tighter transition-colors ${copied ? "text-primary" : "text-zinc-600"}`}>
            {copied ? "Copied" : "Copy"}
          </span>
        )}
      </button>
    </>
  );

  return (
    <div className={className}>
      {content}
    </div>
  );
}
