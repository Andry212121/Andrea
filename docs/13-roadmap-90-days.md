# 90-Day Build Roadmap (Solo Founder → Buckinghamshire MVP Launch)

## Starting point

This repo already contains a working **frontend prototype**: the full Next.js +
TypeScript + Tailwind marketing site, tutor search/profile UI, booking form UI,
and parent/tutor/admin dashboard UI, all running on mock data with no backend
(see root `README.md`). Treat this plan as starting **after** that prototype —
it accelerates Weeks 4–10 below, which would otherwise be pure frontend build
time. The real remaining work is: real data, real auth, real payments, real
vetting workflow, real content, and a real launch.

12 weeks of build + 1 week of buffer/launch = 13 weeks ≈ 90 days.

---

## Week 1 — Foundations, legal, accounts

**Focus:** Everything that has to exist before writing backend code.

- Register GradeHub Ltd (or confirm existing entity), business bank account
- Create accounts: Supabase, Stripe (+ Stripe Connect application), Clerk or
  confirm Supabase Auth, Resend, Google Cloud (Maps/Calendar/Meet APIs), Vercel,
  Cloudflare, PostHog, Microsoft Clarity
- Buy domain, configure Cloudflare DNS, connect to Vercel
- Complete a Data Protection Impact Assessment (DPIA) given children's data
  processing (see [Security Plan](./08-security-plan.md))
- Finalise legal pages content with a solicitor review pass (Terms, Privacy,
  Safeguarding — drafts already exist in `/src/app`)
- Set up project management (task board), error tracking (Sentry or Vercel's
  built-in), and this docs folder as the living source of truth

**Acceptance criteria:** All third-party accounts created and billing configured;
DPIA signed off; legal page drafts reviewed; empty Supabase project connected to
a deployed "Hello World" on the production domain over HTTPS.

## Week 2 — Database & auth

**Focus:** Ship the schema, wire real authentication.

- Migrate the schema in [Database Schema](./05-database-schema.md) to Supabase,
  table by table, with RLS policies for parent/tutor/admin
- Implement Supabase Auth: register/login/logout/password reset for parent and
  tutor roles
- Replace the current mock `/dashboard` role-picker with real session-based
  routing (redirect to the correct dashboard by role, protect dashboard routes
  server-side)
- Seed script: load the existing mock tutor/subject/location data
  (`src/lib/data/*.ts`) into real tables so the frontend keeps working end to end

**Acceptance criteria:** A real user can register as a parent or tutor, log in,
get redirected to the correct dashboard, and log out; RLS verified by attempting
(and failing) to read another user's data via the API directly.

## Week 3 — Tutor onboarding & admin approval pipeline

**Focus:** The safeguarding-critical workflow — nothing else matters if this
isn't solid.

- Build the real "Become a Tutor" application flow: profile fields, qualification
  entry, DBS certificate upload, ID upload (private Supabase Storage bucket,
  signed URLs)
- Build the admin approval queue (real data replacing the mock admin dashboard
  widget): review documents, approve/reject with reason, status notifications
  to the tutor via Resend
- Implement `tutor_profiles.is_listed` gating so unapproved tutors never appear
  in search/matching

**Acceptance criteria:** A test tutor account can submit a full application; an
admin account can review and approve/reject it; only approved tutors appear on
`/find-a-tutor`; rejection sends an email with the reason and lets the tutor
resubmit.

## Week 4 — Tutor directory & profiles on real data

**Focus:** Reconnect the existing search/profile UI to the database.

- Replace `src/lib/data/tutors.ts` reads with live Supabase queries in
  `/find-a-tutor` and `/tutors/[slug]`
- Implement server-side filtering (subject, location, mode, price) as a real
  Postgres query, replacing the current client-side mock filter
- Add tutor photo upload (replacing/augmenting the initials-avatar fallback)
  and video introduction upload/embed

**Acceptance criteria:** Search filters return real approved tutors from the
database; a tutor can upload a profile photo and video that renders on their
public profile; page load performance (LCP) stays within the Core Web Vitals
budget from the [PRD](./01-prd.md).

## Week 5 — Matching algorithm & SEO pages

**Focus:** The core differentiator, plus locking in SEO groundwork early
(indexing lead time matters).

- Implement the `/match` API and questionnaire flow per
  [Matching Algorithm](./07-matching-algorithm.md), replacing the current
  client-side filter-only hero search with a real multi-step questionnaire
- Add JSON-LD structured data (Organization, Person, AggregateRating, FAQPage) —
  see [SEO Strategy](./09-seo-strategy.md) checklist
- Submit sitemap to Google Search Console; verify domain

**Acceptance criteria:** Submitting the questionnaire returns 3–5 ranked tutors
with visible match reasons; structured data validates in Google's Rich Results
Test; sitemap indexed with zero errors in Search Console.

## Week 6 — Bookings & calendar

**Focus:** Turn a match into a scheduled lesson.

- Build real booking creation (consultation + paid lesson), replacing the mock
  `BookingForm` success state with an actual `bookings` row and status flow
- Google Calendar + Google Meet integration: generate a Meet link and calendar
  invite for online lessons on booking confirmation
- Recurring lesson support (weekly), cancellation/reschedule flow with the
  24-hour policy enforced server-side, not just described in copy

**Acceptance criteria:** A parent can book a free consultation and, separately,
a paid recurring lesson slot; both tutor and parent receive calendar invites
with a working Meet link; cancelling inside 24 hours is visibly flagged before
confirmation.

## Week 7 — Payments & payouts

**Focus:** Money moving safely.

- Stripe PaymentIntent flow for lesson payments (parent side), Stripe Connect
  Express onboarding for tutors (payout side)
- Payment capture held until 24h post-lesson-completion, then released to tutor
  minus commission (tiered per [Monetisation](./11-monetisation-and-projections.md))
- Invoice generation (PDF) and the real parent Invoices view (replacing the
  mock table in `/dashboard/parent`)
- Stripe webhook handling (payment succeeded/failed, payout events, disputes)

**Acceptance criteria:** A real (test-mode) card payment completes booking
confirmation; a tutor completes Stripe Connect onboarding and receives a test
payout; an invoice PDF is generated and downloadable; a simulated dispute
correctly surfaces in the admin dashboard.

## Week 8 — Parent dashboard, progress & messaging

**Focus:** The retention loop.

- Replace mock parent dashboard data with real bookings, invoices and homework/
  progress data
- Progress reports: tutor-submitted after each lesson, visible on the parent
  dashboard's progress chart
- In-app messaging (conversations/messages tables), real-time via Supabase
  Realtime, replacing any need for off-platform contact before booking

**Acceptance criteria:** A completed test lesson results in a tutor-submitted
progress note appearing on the parent's dashboard within the same session; a
parent and tutor can exchange messages in real time without a page refresh.

## Week 9 — Tutor dashboard & reviews

**Focus:** Make GradeHub obviously better than a spreadsheet for the tutor.

- Real tutor dashboard: calendar, booking requests (accept/decline wired to
  real state changes), earnings summary, payout status
- Review flow: prompt parent post-lesson-3 (or post-consultation for
  no-continuation cases), review moderation queue for admin
- Tutor profile editor (rate, availability, bio, subjects) writing to real data

**Acceptance criteria:** Accepting/declining a booking request updates its
status live for the parent; a submitted review appears on the tutor's public
profile after admin moderation; a tutor can edit their availability and see it
reflected in the matching algorithm's availability scoring.

## Week 10 — Admin dashboard, disputes, support

**Focus:** Give the (small) ops team what they need to run the platform daily.

- Real admin metrics (revenue, active tutors/parents, bookings) sourced from
  actual data, replacing the mock stat cards
- Dispute/refund workflow: admin can review a flagged booking and issue a
  partial/full Stripe refund
- Basic support ticket intake (even if initially just a structured inbox/queue,
  not a full helpdesk product)

**Acceptance criteria:** Admin dashboard metrics match a manual database query
for the same period; an admin can issue a test refund end-to-end from the
dashboard; a support enquiry submitted via `/contact` appears in the admin
queue.

## Week 11 — Content, analytics, performance & accessibility pass

**Focus:** Everything that makes the difference between "functional" and
"launch-ready."

- Publish an initial content set: 6–8 blog posts, full Grammar School Guide
  content review with a subject-matter fact-check
- Wire PostHog (product analytics/funnels) and Microsoft Clarity (session
  replay/heatmaps) with cookie-consent gating already built in `CookieBanner`
- Lighthouse/Core Web Vitals audit across key pages; fix regressions
- Accessibility audit against WCAG 2.1 AA (screen reader pass on the booking
  flow specifically, given its importance)
- Cross-browser/device QA (iOS Safari, Android Chrome, desktop Chrome/Firefox/Safari)

**Acceptance criteria:** All priority landing pages pass Core Web Vitals
thresholds from the PRD; PostHog funnel tracks the full parent journey
end-to-end; zero critical/serious axe-core accessibility violations on the
homepage, search, tutor profile and booking flow.

## Week 12 — Security review, load testing, staging soak

**Focus:** Don't find out about a problem in production.

- Full pass against [Security Plan](./08-security-plan.md) checklist:
  penetration-style manual review of auth, RLS policies, file upload handling,
  rate limits, CSP headers
- Load test the search/matching endpoints and booking flow at expected launch
  volume + 5x headroom
- Staging environment soak test with the real, recruited tutor cohort
  (see below) using real (test-mode payment) bookings
- Finalise incident response runbook and on-call coverage for launch week

**Acceptance criteria:** No high/critical findings open from the security
review; load test sustains target concurrent users with p95 latency within
budget; at least 10 real tutors have completed a full test booking cycle on
staging without a blocking bug.

## Week 13 — Tutor recruiting completion, soft launch, monitor

**Focus:** Go live — carefully.

- Note: tutor recruiting (the cold-start problem) should have been running in
  parallel since Week 3 — by Week 13 the target is **30–50 approved,
  Buckinghamshire-based tutors** live in search before any paid marketing spend
  begins, so a parent's first search isn't an empty results page
- Soft launch: PR outreach + owned channels (email waitlist, local Facebook
  groups) before turning on paid acquisition
- Daily monitoring of error rates, payment failures, and the admin approval
  queue during launch week
- Fast-follow bug-fix cadence (same-day for anything blocking a booking or
  payment)

**Acceptance criteria:** Platform live on the production domain with 30+
approved tutors; first 10 real parent bookings completed successfully
end-to-end (search → match → consultation → paid lesson → payment released);
zero unresolved P0/P1 incidents at end of week.

---

## Cross-cutting workstreams (run throughout, not confined to one week)

| Workstream | Owned by / when |
|---|---|
| Tutor recruiting | Founder, starting Week 3, continuous through launch |
| Content (blog/guide) | Founder or contractor, starting Week 5 |
| Legal/compliance review | External solicitor, Week 1 draft + Week 12 pre-launch check |
| QA (manual) | Founder, every week on that week's shipped surface |

## What "done" looks like at Day 90

A parent in Buckinghamshire can find this site organically or via a referral,
search or answer a matching questionnaire, review a genuinely vetted tutor's
profile, book a free consultation, pay securely for ongoing lessons, and see
real progress on a dashboard — and a tutor can apply, get approved, receive
bookings, teach, and get paid, entirely without founder intervention in the
day-to-day loop (only in the admin approval/dispute edge cases by design).
