"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/find-a-tutor", label: "Find a Tutor" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/grammar-school-guide", label: "Grammar School Guide" },
  { href: "/become-a-tutor", label: "Become a Tutor" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-navy-900/8 bg-white/80 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-navy-900 font-serif-display text-lg font-semibold text-gold-400">
            G
          </span>
          <span className="font-serif-display text-xl font-semibold text-navy-900">
            GradeHub
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900",
                pathname === link.href && "bg-navy-50 text-navy-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/dashboard" variant="ghost" size="sm">
            Log in
          </Button>
          <Button href="/find-a-tutor" variant="gold" size="sm">
            Get Matched
          </Button>
        </div>

        <button
          className="flex size-10 items-center justify-center rounded-full text-navy-900 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-900/8 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button href="/dashboard" variant="outline" size="sm">
              Log in
            </Button>
            <Button href="/find-a-tutor" variant="gold" size="sm">
              Get Matched
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
