import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Icon, icons } from "@/components/dashboard/icons";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/dashboard/admin", label: "Overview", icon: <Icon path={icons.home} />, active: true },
  { href: "/dashboard/admin", label: "Tutor approvals", icon: <Icon path={icons.approvals} /> },
  { href: "/dashboard/admin", label: "Users", icon: <Icon path={icons.students} /> },
  { href: "/dashboard/admin", label: "Bookings", icon: <Icon path={icons.bookings} /> },
  { href: "/dashboard/admin", label: "Disputes & refunds", icon: <Icon path={icons.disputes} /> },
  { href: "/dashboard/admin", label: "Revenue & analytics", icon: <Icon path={icons.analytics} /> },
  { href: "/dashboard/admin", label: "Support tickets", icon: <Icon path={icons.support} /> },
  { href: "/dashboard/admin", label: "Blog / CMS", icon: <Icon path={icons.cms} /> },
];

const pendingTutors = [
  { name: "Rebecca Hollis", initials: "RH", subjects: "11+ English, Creative Writing", submitted: "2 days ago" },
  { name: "Thomas Ferrand", initials: "TF", subjects: "GCSE Maths, A-Level Maths", submitted: "3 days ago" },
  { name: "Nadia Farouk", initials: "NF", subjects: "SEN Support, 11+ Verbal Reasoning", submitted: "5 days ago" },
];

const disputes = [
  { id: "DSP-204", parent: "L. Ahmed", tutor: "M. Osborne", reason: "Lesson quality concern", status: "Open" },
  { id: "DSP-201", parent: "K. Novak", tutor: "J. Caldwell", reason: "Cancellation fee dispute", status: "Resolved" },
];

const supportTickets = [
  { id: "TCK-1183", subject: "Unable to reschedule lesson", priority: "Medium" },
  { id: "TCK-1179", subject: "DBS document not uploading", priority: "High" },
  { id: "TCK-1174", subject: "Refund request follow-up", priority: "Low" },
];

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      role="Admin"
      userName="Platform Admin"
      userInitials="GH"
      navItems={navItems}
      title="Platform overview"
      subtitle="Monday, 20 July 2026"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Monthly revenue" value="£28,420" trend="+18% MoM" />
        <StatCard label="Active tutors" value="256" trend="+9 this week" />
        <StatCard label="Active parents" value="1,840" />
        <StatCard label="Lessons booked (30d)" value="3,120" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display text-lg font-medium text-navy-900">Tutor approvals pending review</h2>
            <Badge tone="gold">{pendingTutors.length} pending</Badge>
          </div>
          <div className="mt-4 divide-y divide-navy-900/8">
            {pendingTutors.map((t) => (
              <div key={t.name} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Avatar initials={t.initials} gradient={["#0f2545", "#c9a227"]} size={40} />
                  <div>
                    <p className="font-medium text-navy-900">{t.name}</p>
                    <p className="text-sm text-navy-700/70">{t.subjects} · Submitted {t.submitted}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
          <h2 className="font-serif-display text-lg font-medium text-navy-900">Support tickets</h2>
          <div className="mt-4 space-y-3">
            {supportTickets.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg bg-navy-50 px-4 py-3 text-sm">
                <div>
                  <p className="font-medium text-navy-900">{t.subject}</p>
                  <p className="text-navy-700/60">{t.id}</p>
                </div>
                <Badge tone={t.priority === "High" ? "gold" : "neutral"}>{t.priority}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
        <h2 className="font-serif-display text-lg font-medium text-navy-900">Disputes & refunds</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-900/8 text-left text-navy-700/60">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Parent</th>
                <th className="pb-3 font-medium">Tutor</th>
                <th className="pb-3 font-medium">Reason</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((d) => (
                <tr key={d.id} className="border-b border-navy-900/8 last:border-0">
                  <td className="py-3 font-medium text-navy-900">{d.id}</td>
                  <td className="py-3 text-navy-700/80">{d.parent}</td>
                  <td className="py-3 text-navy-700/80">{d.tutor}</td>
                  <td className="py-3 text-navy-700/80">{d.reason}</td>
                  <td className="py-3">
                    <Badge tone={d.status === "Open" ? "gold" : "green"}>{d.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
