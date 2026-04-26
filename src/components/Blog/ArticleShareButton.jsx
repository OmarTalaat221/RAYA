"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function ArticleShareButton({ title, url }) {
  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);

      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      resetTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 font-poppins! text-sm font-medium text-soft-black transition-colors duration-200 hover:border-main/30 hover:text-main"
      aria-label="Share article"
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}
      {copied ? "Link copied" : "Share article"}
    </button>
  );
}
