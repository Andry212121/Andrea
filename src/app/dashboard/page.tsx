import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const roles = [
  { href: "/dashboard/parent", label: "Parent Dashboard", description: "Bookings, payments, progress reports and messages." },
  { href: "/dashboard/tutor", label: "Tutor Dashboard", description: "Calendar, students, earnings and reviews." },
  { href: "/dashboard/admin", label: "Admin Dashboard", description: "Approvals, disputes, revenue and support." },
];

export default function DashboardIndexPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-6 py-16 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex size-10 items-center justify-center rounded-lg bg-gold-500 font-serif-display text-lg font-semibold text-navy-950">
            G
          </span>
          <h1 className="mt-4 font-serif-display text-2xl font-medium">Preview a dashboard</h1>
          <p className="mt-2 text-sm text-navy-100/70">
            This MVP demo doesn&apos;t have live authentication yet — choose a role to preview its
            dashboard experience.
          </p>
        </div>
        <div className="space-y-3">
          {roles.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="block rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
            >
              <p className="font-medium">{role.label}</p>
              <p className="mt-1 text-sm text-navy-100/70">{role.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
