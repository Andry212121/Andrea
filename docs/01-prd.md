# Product Requirements Document (PRD)

## 1. Vision

Build the UK's most trusted education marketplace, starting with grammar school
(11+) tutoring in Buckinghamshire. Win on trust, clarity and product quality where
incumbents (Tutorful, MyTutor, Superprof, First Tutors, Explore Learning) win on
raw supply and SEO volume alone.

## 2. Problem statement

**Parents** face an opaque, anxiety-inducing search: no reliable way to verify a
tutor's safeguarding status or genuine track record with their target school, and
no visibility into whether tutoring is actually working.

**Tutors** are excellent educators but poor marketers: they lose time chasing
enquiries, invoices and scheduling instead of teaching.

## 3. Target users & personas

### Parent — "Anxious Amelia's Mum, Sarah"
- Household income allows £150–400/month on tutoring
- Time-poor, researching in the evening on mobile
- Primary fear: wasting money on the wrong tutor, or missing a safeguarding red flag
- Wants: verified credentials, transparent pricing, visible progress, a human to
  talk to before paying

### Tutor — "Eleanor, ex-grammar-school teacher turned full-time tutor"
- Has 5–15 years of experience, currently relies on word-of-mouth + one other
  platform + a spreadsheet
- Primary fear: unpaid invoices, unreliable no-shows, reputational risk from an
  unvetted platform
- Wants: consistent, qualified enquiries; automatic payments; a professional
  profile that converts

### Admin — GradeHub operations
- Small team (1–3 people at launch) reviewing tutor applications, handling
  disputes and safeguarding escalations, and monitoring platform health

## 4. Goals & non-goals

**Goals for MVP (90 days):**
- Parents can search, get matched, view verified tutor profiles, book a free
  consultation, pay for lessons, and see basic progress.
- Tutors can apply, get vetted and approved, manage a calendar, accept bookings,
  message parents, and get paid out.
- Admins can review and approve/reject tutor applications and see basic platform
  metrics.
- Full SEO-optimised public site covering Buckinghamshire 11+ search intent.

**Explicit non-goals for MVP:**
- Native mobile apps (mobile-web only)
- AI features (recommendation engine beyond rule-based matching, homework
  generation, etc.) — designed but not built in MVP
- Multi-country / multi-currency support
- In-app video calling infrastructure (use Google Meet links initially)

## 5. Success metrics (North Star + supporting)

- **North Star:** Number of completed, paid lesson-hours per month.
- Supporting metrics:
  - Parent → matched → free consultation booked conversion rate (target 40%+)
  - Consultation → paid lesson conversion rate (target 55%+)
  - Tutor application → approved conversion rate and time-to-approval (target < 3
    business days)
  - Tutor 90-day retention (still teaching on platform after 90 days)
  - Net Promoter Score from parents post-lesson-3
  - Organic (SEO) sessions to `/find-a-tutor` and location pages

## 6. Platform-wide requirements

- Premium, modern, trustworthy visual design (see [Design System](./04-design-system.md))
- Mobile-first, WCAG 2.1 AA accessibility target
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1 on 4G mid-tier mobile
- SEO-first architecture: statically generated marketing/location/subject pages
- GDPR-compliant data handling end to end (see [Security Plan](./08-security-plan.md))

## 7. Feature set by phase

### Phase 1 — MVP (Buckinghamshire, 90 days)
Marketing site, tutor directory & search, tutor profiles, matching questionnaire,
free consultation booking, Stripe payments, parent dashboard (bookings, payments,
progress), tutor dashboard (calendar, bookings, earnings), admin approval queue,
reviews, blog/SEO content, legal/safeguarding pages.

### Phase 2 — Post-launch hardening (Months 4–6)
Real-time messaging, Google Calendar/Meet integration, automated DBS re-verification
reminders, dispute/refund workflows, referral programme, mock exams product,
Premium parent membership.

### Phase 3 — Geographic & subject expansion (Months 6–12)
Expand beyond Buckinghamshire to neighbouring counties, then nationally. Add GCSE
and A-Level as primary verticals. Launch SEN specialist category (speech
therapists, occupational therapists, educational psychologists).

### Phase 4 — AI & platform maturity (Year 2)
AI study assistant, learning progress predictions, homework generation, holiday
revision courses, white-label school partnerships. See [AI Roadmap](./10-ai-roadmap.md).

## 8. Constraints & assumptions

- Solo founder (or very small team) building and operating the MVP
- No existing tutor supply — cold-start solved via manual recruiting of the first
  30–50 tutors in Buckinghamshire before public launch (see 90-day roadmap)
- Third-party dependencies: Stripe (payments), Supabase (DB/auth/storage), Resend
  (email), Google (Calendar/Meet), Vercel (hosting), Cloudflare (DNS/CDN/WAF)
