"use client";

import { Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { SITE_URL } from "@/lib/site";

interface ShareButtonsProps {
  title: string;
  className?: string;
  isDesktop?: boolean;
}

export default function ShareButtons({
  title,
  className = "",
  isDesktop = false,
}: ShareButtonsProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const url = `${SITE_URL}${pathname || ""}`;
  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);
  const xUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
  const redditUrl = `https://www.reddit.com/submit?url=${shareUrl}&title=${shareText}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("share_clicked", {
        platform: "copy",
        title,
      });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Swallow clipboard errors and leave the UI unchanged.
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator.share !== "function") {
      await handleCopy();
      return;
    }

    try {
      await navigator.share({ title, url });
      trackEvent("share_clicked", {
        platform: "native",
        title,
      });
    } catch {
      // Dismissal should not throw visible UI errors.
    }
  };

  const buttonClass =
    "text-zinc-500 hover:text-zinc-200 transition-colors flex flex-col items-center gap-1";
  const labelClass = "font-label text-[8px] uppercase tracking-[0.22em] text-zinc-600";

  return (
    <div className={className}>
      {isDesktop ? (
        <>
          <span
            className="font-label text-[10px] uppercase tracking-widest text-zinc-500 rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            Share
          </span>
          <div className="h-12 w-px bg-outline-variant opacity-20"></div>
        </>
      ) : (
        <span className="font-label text-[10px] uppercase tracking-widest text-zinc-500">
          Share
        </span>
      )}

      {!isDesktop && (
        <button
          onClick={handleNativeShare}
          className={buttonClass}
          title="Share"
          aria-label="Share this page"
        >
          <Share2 size={20} />
          <span className={labelClass}>Share</span>
        </button>
      )}

      <a
        href={redditUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on Reddit"
        onClick={() => trackEvent("share_clicked", { platform: "reddit", title })}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M14.03 15.349c.666 0 1.208-.54 1.208-1.208 0-.667-.542-1.209-1.208-1.209-.668 0-1.209.542-1.209 1.209 0 .667.541 1.208 1.209 1.208Zm-4.06-2.417c-.667 0-1.208.542-1.208 1.209 0 .667.541 1.208 1.208 1.208.668 0 1.209-.54 1.209-1.208 0-.667-.541-1.209-1.209-1.209Zm4.961 5.04c-.913.911-2.659.986-3.85 0a.298.298 0 0 0-.42.42c1.435 1.19 3.52 1.115 4.69-.002a.297.297 0 1 0-.42-.418Zm6.726-6.092a2.123 2.123 0 0 0-3.64-1.476 9.92 9.92 0 0 0-5.728-1.835c-.272 0-.544.013-.812.035l.955-4.5 3.13.664a1.506 1.506 0 1 0 .127-.593l-3.42-.725a.297.297 0 0 0-.35.23l-1.03 4.86a9.96 9.96 0 0 0-5.522 1.86 2.12 2.12 0 0 0-3.598 1.52c0 .844.497 1.571 1.213 1.91-.038.243-.06.49-.06.741 0 3.323 3.71 6.03 8.275 6.03s8.274-2.707 8.274-6.03c0-.245-.02-.485-.055-.721a2.126 2.126 0 0 0 1.221-1.92Z" />
        </svg>
        <span className={labelClass}>Reddit</span>
      </a>

      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on X"
        onClick={() => trackEvent("share_clicked", { platform: "x", title })}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
        <span className={labelClass}>X</span>
      </a>

      <button onClick={handleCopy} className={buttonClass} title="Copy link" aria-label="Copy link">
        <Copy size={20} className={copied ? "text-primary transition-colors" : ""} />
        <span className={`${labelClass} ${copied ? "text-primary" : ""}`}>
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
    </div>
  );
}
