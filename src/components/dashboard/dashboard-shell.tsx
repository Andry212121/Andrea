"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

export function DashboardShell({
  role,
  userName,
  userInitials,
  navItems,
  title,
  subtitle,
  children,
}: {
  role: string;
  userName: string;
  userInitials: string;
  navItems: DashboardNavItem[];
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-navy-50/60">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy-950 text-white lg:flex">
        <Link href="/" className="flex items-center gap-2 px-6 py-6">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gold-500 font-serif-display text-base font-semibold text-navy-950">
            G
          </span>
          <span className="font-serif-display text-lg font-semibold">GradeHub</span>
        </Link>
        <p className="px-6 pb-4 text-xs font-semibold uppercase tracking-wide text-navy-100/50">
          {role}
        </p>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                item.active ? "bg-white/10 text-white" : "text-navy-100/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="size-4.5">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 border-t border-white/10 px-6 py-5">
          <Avatar initials={userInitials} gradient={["#c9a227", "#2a4d85"]} size={36} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{userName}</p>
            <Link href="/" className="text-xs text-navy-100/60 hover:text-gold-400">
              Sign out
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-navy-900/8 bg-white px-6 py-5 lg:px-10">
          <div>
            <h1 className="font-serif-display text-xl font-medium text-navy-900 sm:text-2xl">{title}</h1>
            {subtitle ? <p className="mt-1 text-sm text-navy-700/70">{subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex size-10 items-center justify-center rounded-full text-navy-700 hover:bg-navy-50" aria-label="Notifications">
              <svg viewBox="0 0 20 20" className="size-5" fill="currentColor">
                <path d="M10 2a5 5 0 00-5 5v2.6c0 .5-.2 1-.5 1.4L3 13.5c-.5.6 0 1.5.8 1.5h12.4c.8 0 1.3-.9.8-1.5l-1.5-2.5a2 2 0 01-.5-1.4V7a5 5 0 00-5-5zM8.3 16a1.7 1.7 0 003.4 0" />
              </svg>
            </button>
            <Avatar initials={userInitials} gradient={["#0f2545", "#2a4d85"]} size={38} className="lg:hidden" />
          </div>
        </header>
        <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
