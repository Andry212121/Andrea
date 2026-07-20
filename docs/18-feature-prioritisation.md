# Feature Prioritisation (MoSCoW)

Scoped against the [PRD](./01-prd.md) goals and the [90-Day Roadmap](./13-roadmap-90-days.md).

## Must have (MVP, required to launch)

- Public marketing site (homepage, how it works, pricing, FAQ, about, contact)
- Tutor search & filterable directory
- Tutor profiles with DBS/ID verification badges
- Tutor application, document upload, and admin approval workflow
- Matching questionnaire + algorithm (3–5 ranked results)
- Free consultation booking
- Paid lesson booking (one-off + recurring) with Stripe payment
- Tutor payouts via Stripe Connect, with commission calculation
- Parent dashboard: bookings, invoices, basic progress view
- Tutor dashboard: calendar, booking accept/decline, earnings
- Admin dashboard: tutor approval queue, basic metrics, dispute/refund handling
- Reviews (post-lesson)
- Legal/compliance pages: Privacy, Terms, Safeguarding, Cookie Policy, GDPR
  processes (DSAR, deletion)
- Core SEO infrastructure: sitemap, robots, metadata, location/subject landing
  pages, Grammar School Guide
- Security baseline: RBAC, RLS, rate limiting, CSRF/XSS/SQLi protections,
  audit logging (see [Security Plan](./08-security-plan.md))

## Should have (Phase 2, Months 4–6)

- Real-time in-app messaging
- Google Calendar/Meet auto-scheduling polish
- Referral programme (parent + tutor)
- Premium parent membership
- Mock exam product
- Structured data (JSON-LD) rollout across all page types
- Automated DBS re-verification reminders
- Support ticket system (beyond a basic inbox queue)

## Could have (Phase 3, Months 6–12)

- GCSE and A-Level as fully-fledged verticals (beyond basic subject tagging
  already supported by the schema)
- SEN specialist category expansion (speech therapists, OTs, educational
  psychologists) with category-specific vetting requirements
- Holiday revision courses (cohort-based product)
- Featured tutor paid listings
- Multi-region expansion tooling (region-aware content/SEO templating)
- Native mobile app (currently explicitly out of scope — see PRD non-goals)

## Won't have (not currently planned)

- Display advertising (conflicts with premium brand positioning — see
  [Monetisation](./11-monetisation-and-projections.md))
- Child-facing AI chat assistant (deferred indefinitely pending a mature trust
  & safety process — see [AI Roadmap](./10-ai-roadmap.md))
- Paid grammar school partnerships (safeguarding/impartiality conflict — see
  [Marketing Plan](./12-marketing-plan.md))
- Multi-currency/international payments (UK-only until there's a specific,
  evaluated reason to expand internationally)

## Prioritisation principles

1. Nothing in "Should/Could have" ships before every "Must have" item is both
   built **and** verified against its acceptance criteria in the 90-day roadmap.
2. Safeguarding and payment-integrity features are never deprioritised
   regardless of time pressure — if a trade-off is needed, scope down elsewhere
   (e.g. ship a simpler admin metrics dashboard) rather than cut a vetting step.
3. Revenue-generating "Should have" items (Premium membership, mock exams) are
   sequenced ahead of nice-to-have UX polish once MVP is live, to fund the
   team growth needed for further roadmap execution.
