import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Icon, icons } from "@/components/dashboard/icons";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { tutors } from "@/lib/data/tutors";

export const metadata: Metadata = {
  title: "Parent Dashboard",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/dashboard/parent", label: "Overview", icon: <Icon path={icons.home} />, active: true },
  { href: "/dashboard/parent", label: "Bookings", icon: <Icon path={icons.bookings} /> },
  { href: "/dashboard/parent", label: "Messages", icon: <Icon path={icons.messages} /> },
  { href: "/dashboard/parent", label: "Payments", icon: <Icon path={icons.payments} /> },
  { href: "/dashboard/parent", label: "Progress reports", icon: <Icon path={icons.reports} /> },
  { href: "/dashboard/parent", label: "Favourites", icon: <Icon path={icons.favourite} /> },
  { href: "/dashboard/parent", label: "Settings", icon: <Icon path={icons.settings} /> },
];

const upcomingLessons = [
  { tutor: tutors[0], subject: "Verbal Reasoning", date: "Mon 22 Jul", time: "4:00–5:00pm" },
  { tutor: tutors[1], subject: "Maths (11+)", date: "Wed 24 Jul", time: "5:00–6:00pm" },
  { tutor: tutors[4], subject: "Creative Writing", date: "Sun 28 Jul", time: "11:00am–12:00pm" },
];

const invoices = [
  { id: "INV-1042", date: "14 Jul 2026", tutor: "Eleanor Whitfield", amount: "£48.00", status: "Paid" },
  { id: "INV-1038", date: "07 Jul 2026", tutor: "Daniel Osei", amount: "£42.00", status: "Paid" },
  { id: "INV-1031", date: "30 Jun 2026", tutor: "Sofia Marchetti", amount: "£44.00", status: "Paid" },
];

const progress = [
  { subject: "Verbal Reasoning", score: 78, target: 85 },
  { subject: "Non-Verbal Reasoning", score: 64, target: 80 },
  { subject: "Maths", score: 82, target: 85 },
];

export default function ParentDashboardPage() {
  return (
    <DashboardShell
      role="Parent"
      userName="Sarah Thompson"
      userInitials="ST"
      navItems={navItems}
      title="Welcome back, Sarah"
      subtitle="Here's how Amelia's 11+ preparation is going."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Lessons this month" value="8" trend="+2 vs last month" />
        <StatCard label="Total spent" value="£384.00" />
        <StatCard label="Avg. mock score" value="74%" trend="+6% this term" />
        <StatCard label="Days to exam" value="52" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display text-lg font-medium text-navy-900">Upcoming lessons</h2>
            <Button href="/find-a-tutor" variant="outline" size="sm">
              Book another lesson
            </Button>
          </div>
          <div className="mt-4 divide-y divide-navy-900/8">
            {upcomingLessons.map((lesson) => (
              <div key={lesson.subject + lesson.date} className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={lesson.tutor.initials} gradient={lesson.tutor.gradient} size={42} />
                  <div>
                    <p className="font-medium text-navy-900">{lesson.subject}</p>
                    <p className="text-sm text-navy-700/70">with {lesson.tutor.name}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-navy-700/80">
                  <p className="font-medium text-navy-900">{lesson.date}</p>
                  <p>{lesson.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
          <h2 className="font-serif-display text-lg font-medium text-navy-900">Progress by subject</h2>
          <div className="mt-4 space-y-5">
            {progress.map((p) => (
              <div key={p.subject}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-navy-900">{p.subject}</span>
                  <span className="text-navy-700/70">{p.score}% / {p.target}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-navy-50">
                  <div
                    className="h-2 rounded-full bg-gold-500"
                    style={{ width: `${(p.score / p.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft lg:col-span-2">
          <h2 className="font-serif-display text-lg font-medium text-navy-900">Invoices</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-900/8 text-left text-navy-700/60">
                  <th className="pb-3 font-medium">Invoice</th>
                  <th className="pb-3 font-medium">Tutor</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-navy-900/8 last:border-0">
                    <td className="py-3 font-medium text-navy-900">{inv.id}</td>
                    <td className="py-3 text-navy-700/80">{inv.tutor}</td>
                    <td className="py-3 text-navy-700/80">{inv.date}</td>
                    <td className="py-3 text-navy-700/80">{inv.amount}</td>
                    <td className="py-3">
                      <Badge tone="green">{inv.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
          <h2 className="font-serif-display text-lg font-medium text-navy-900">This week&apos;s homework</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gold-500" />
              <span>Complete VR Practice Paper 4, questions 1–20 (Eleanor)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gold-500" />
              <span>Review fraction word problems worksheet (Daniel)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gold-500" />
              <span>Draft a 30-minute creative writing piece: &ldquo;The Locked Door&rdquo; (Sofia)</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardShell>
  );
}
