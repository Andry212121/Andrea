import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Icon, icons } from "@/components/dashboard/icons";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tutor Dashboard",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/dashboard/tutor", label: "Overview", icon: <Icon path={icons.home} />, active: true },
  { href: "/dashboard/tutor", label: "Calendar", icon: <Icon path={icons.calendar} /> },
  { href: "/dashboard/tutor", label: "Bookings", icon: <Icon path={icons.bookings} /> },
  { href: "/dashboard/tutor", label: "Students", icon: <Icon path={icons.students} /> },
  { href: "/dashboard/tutor", label: "Messages", icon: <Icon path={icons.messages} /> },
  { href: "/dashboard/tutor", label: "Earnings", icon: <Icon path={icons.earnings} /> },
  { href: "/dashboard/tutor", label: "Reviews", icon: <Icon path={icons.reports} /> },
  { href: "/dashboard/tutor", label: "Profile editor", icon: <Icon path={icons.settings} /> },
];

const bookingRequests = [
  { parent: "Priya S.", subject: "11+ Verbal Reasoning", when: "Tue 23 Jul, 5:00pm" },
  { parent: "Marcus B.", subject: "Non-Verbal Reasoning", when: "Thu 25 Jul, 4:30pm" },
];

const upcoming = [
  { student: "Amelia T.", subject: "Verbal Reasoning", date: "Mon 22 Jul", time: "4:00–5:00pm" },
  { student: "Oscar B.", subject: "11+ Maths", date: "Tue 23 Jul", time: "5:00–6:00pm" },
  { student: "Freya L.", subject: "Verbal Reasoning", date: "Wed 24 Jul", time: "4:00–5:00pm" },
];

const reviews = [
  { parent: "Sarah T.", rating: 5, comment: "Amelia looks forward to every session — genuinely brilliant tutor." },
  { parent: "Michael R.", rating: 5, comment: "Clear communication after every lesson. Highly recommend." },
];

export default function TutorDashboardPage() {
  return (
    <DashboardShell
      role="Tutor"
      userName="Eleanor Whitfield"
      userInitials="EW"
      navItems={navItems}
      title="Welcome back, Eleanor"
      subtitle="You have 2 new booking requests waiting for a response."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="This month's earnings" value="£1,860" trend="+12% vs last month" />
        <StatCard label="Lessons taught" value="42" />
        <StatCard label="Average rating" value="4.98" />
        <StatCard label="Response time" value="< 1 hour" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft lg:col-span-2">
          <h2 className="font-serif-display text-lg font-medium text-navy-900">New booking requests</h2>
          <div className="mt-4 space-y-3">
            {bookingRequests.map((req) => (
              <div key={req.parent} className="flex flex-col gap-3 rounded-xl border border-navy-900/8 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-navy-900">{req.subject}</p>
                  <p className="text-sm text-navy-700/70">{req.parent} · {req.when}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Accept</Button>
                  <Button size="sm" variant="outline">Decline</Button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-8 font-serif-display text-lg font-medium text-navy-900">Upcoming lessons</h2>
          <div className="mt-4 divide-y divide-navy-900/8">
            {upcoming.map((lesson) => (
              <div key={lesson.student + lesson.date} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-navy-900">{lesson.subject}</p>
                  <p className="text-sm text-navy-700/70">with {lesson.student}</p>
                </div>
                <div className="text-right text-sm text-navy-700/80">
                  <p className="font-medium text-navy-900">{lesson.date}</p>
                  <p>{lesson.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
            <h2 className="font-serif-display text-lg font-medium text-navy-900">Payout status</h2>
            <p className="mt-2 text-sm text-navy-700/80">Next payout to your connected Stripe account</p>
            <p className="mt-3 font-serif-display text-2xl font-medium text-navy-900">£420.00</p>
            <p className="text-xs text-navy-700/60">Scheduled for 24 Jul 2026</p>
            <Badge tone="green" className="mt-3">Stripe Connect active</Badge>
          </div>

          <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
            <h2 className="font-serif-display text-lg font-medium text-navy-900">Recent reviews</h2>
            <div className="mt-4 space-y-4">
              {reviews.map((r) => (
                <div key={r.parent}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-navy-900">{r.parent}</p>
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="mt-1 text-sm text-navy-700/80">&ldquo;{r.comment}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
