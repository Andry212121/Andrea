# Security, Safeguarding & Compliance Plan

## Authentication & authorization

- Supabase Auth (email/password + optional magic link) issuing short-lived JWTs
  in httpOnly, `Secure`, `SameSite=Lax` cookies — never stored in `localStorage`.
- Role-based access control (`parent` / `tutor` / `admin`) enforced at two layers:
  1. Postgres Row Level Security policies (defence in depth — holds even if an
     API route has a bug)
  2. Route-handler checks before any Supabase service-role query
- Admin routes require `role = 'admin'` **and** run exclusively server-side using
  the Supabase service role key, which is never sent to the browser.
- Passwords: delegated entirely to Supabase Auth (bcrypt/Argon2 under the hood,
  no custom password handling in application code).

## Data protection

- All personal data encrypted at rest (Supabase/Postgres default) and in transit
  (TLS 1.2+ everywhere, enforced via Cloudflare + Vercel).
- DBS certificates and ID documents stored in a private Supabase Storage bucket
  with signed, time-limited URLs — never a public bucket, never linked directly.
- Children's data (name, year group, learning needs) is only ever entered by a
  parent/guardian, only visible to that parent and a tutor with an active booking
  for that child, and purged/anonymised on account deletion requests (see GDPR
  below).
- Field-level minimisation: tutor search/matching never exposes a child's full
  name to a tutor pre-booking — only year group, subject and learning-needs
  summary, matching the "need to know" principle.

## Application security

- **CSRF:** same-site cookies + explicit origin checks on state-changing routes;
  Next.js Server Actions/Route Handlers validate `Origin`/`Referer` for
  non-GET requests.
- **XSS:** React's default escaping for all user-generated content (reviews,
  messages, bios); no `dangerouslySetInnerHTML` for user input; strict CSP header
  (`script-src 'self'`, no inline scripts) served via `next.config.ts` headers.
- **SQL injection:** all database access via Supabase's parameterised
  query builder / prepared statements — no raw string-concatenated SQL.
- **Rate limiting:** per-IP and per-user limits on auth, matching, messaging and
  search endpoints (see [API Specification](./06-api-specification.md)),
  implemented at the edge via Cloudflare rate limiting rules plus an
  application-layer token bucket for authenticated endpoints.
- **File upload safety:** DBS/ID/qualification uploads restricted by MIME type
  and size, virus-scanned on upload (Supabase Storage + a scanning function
  before a document is marked `pending → verifiable`), stored outside any
  publicly routable path.
- **Dependency hygiene:** automated dependency vulnerability scanning
  (`npm audit` / Dependabot) in CI, blocking merge on high/critical findings.
- **Secrets management:** all API keys (Stripe, Supabase service role, Resend,
  Google) stored as encrypted environment variables in Vercel, never committed;
  `.env` files git-ignored.

## Audit logging

Every privileged action (tutor approval/rejection, refund issued, document
reviewed, admin login) writes an `audit_logs` row capturing actor, action,
entity and metadata — immutable, queryable by admins for incident review and
required for safeguarding accountability.

## Safeguarding (see also the public [Safeguarding Policy](../src/app/safeguarding/page.tsx))

- No tutor can be approved without: a valid Enhanced DBS certificate, verified
  photo ID, and a manual admin profile review — no auto-approval path exists.
- Ongoing monitoring: DBS status re-checked on a recurring schedule (DBS Update
  Service where the tutor is subscribed); any review flagging a safeguarding
  concern immediately suspends the tutor's `is_listed` flag pending investigation.
- A dedicated `safeguarding@gradehub.co.uk` inbox is triaged within 24 hours by
  a named safeguarding lead, with a documented escalation path to local
  authority children's services / police where appropriate.
- Online lesson guidance (parent present/reachable, shared family space, first
  in-person lessons in public settings) is presented to parents before booking.

## GDPR / UK data protection compliance

- Lawful bases documented per data category (contract, legitimate interest,
  consent, legal obligation) — see [Privacy Policy](../src/app/privacy/page.tsx).
- Data Subject Access Requests (DSAR), rectification, deletion and portability
  requests handled via a documented internal process with a 30-day SLA.
- Data retention schedule: active-account data retained while active; financial
  records retained per HMRC requirements (6 years) even after account closure;
  all other personal data anonymised/deleted within 90 days of a verified
  deletion request, except where a legal/safeguarding obligation requires longer
  retention.
- Cookie consent banner gates non-essential (analytics) cookies until explicit
  consent (see `/cookie-policy`); essential cookies (session, CSRF) are exempt
  under PECR.
- Data Processing Agreements (DPAs) in place with all sub-processors (Stripe,
  Supabase, Resend, Google, PostHog, Microsoft Clarity) before go-live.
- A Data Protection Impact Assessment (DPIA) is required before launch given the
  processing of children's data — to be completed as part of Week 1–2 of the
  [90-day roadmap](./13-roadmap-90-days.md).

## Incident response

- Documented runbook: detect → contain → assess scope → notify (ICO within 72
  hours if a personal data breach meets the UK GDPR threshold; affected users
  notified without undue delay if high risk) → remediate → post-incident review.
- Vercel/Cloudflare/Supabase status pages and alerting wired into an on-call
  notification channel (initially: founder's phone; Slack/PagerDuty as the team
  grows).
