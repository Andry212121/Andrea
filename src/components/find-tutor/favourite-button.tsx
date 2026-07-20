"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FavouriteButton({ className }: { className?: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSaved((v) => !v)}
      aria-pressed={saved}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
        saved
          ? "border-gold-400 bg-gold-100 text-gold-600"
          : "border-navy-900/15 text-navy-700 hover:bg-navy-50",
        className
      )}
    >
      <svg viewBox="0 0 20 20" className="size-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6}>
        <path d="M10 17.3l-1.1-1c-4-3.6-6.5-6-6.5-8.9C2.4 5.2 4.2 3.5 6.4 3.5c1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.2 0 4 1.7 4 3.9 0 2.9-2.5 5.3-6.5 8.9l-.1.1z" strokeLinejoin="round" />
      </svg>
      {saved ? "Saved" : "Save tutor"}
    </button>
  );
}
