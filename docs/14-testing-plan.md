# Testing Plan

## Testing pyramid

| Layer | Tooling | What it covers |
|---|---|---|
| Unit | Vitest | Matching algorithm scoring, pricing/commission calculations, form validation, utility functions |
| Component | React Testing Library | UI components in isolation (`Button`, `TutorCard`, `StarRating`, form components) |
| Integration | Vitest + Supabase local dev instance | API route handlers against a real (local/test) Postgres instance, including RLS policy checks |
| End-to-end | Playwright | Full user journeys in a real browser against a staging deploy |
| Visual regression | Playwright screenshot comparison (or Chromatic) | Catch unintended design-system drift on key pages |
| Accessibility | axe-core (via Playwright) + manual screen reader pass | WCAG 2.1 AA on priority flows |
| Performance | Lighthouse CI | Core Web Vitals budget enforced in CI on every PR |
| Load | k6 or Artillery | Search/matching/booking endpoints at target + 5x concurrency |
| Security | Manual review + `npm audit`/Dependabot + Stripe/Supabase RLS test suite | See [Security Plan](./08-security-plan.md) |

## Critical path E2E scenarios (must pass before every production deploy)

1. Parent registers → completes matching questionnaire → receives ranked
   matches → books free consultation
2. Parent books and pays for a recurring lesson (Stripe test mode) → receives
   calendar invite with Meet link
3. Tutor applies → uploads DBS/ID/qualifications → admin approves → tutor
   appears in search results
4. Tutor accepts a booking request → marks lesson complete with a progress note
   → parent sees it on their dashboard
5. Payment is captured, held, and released to tutor payout 24h after lesson
   completion (simulated via time-travel in test environment)
6. Admin processes a refund/dispute end-to-end
7. Unauthenticated user cannot access any `/dashboard/*` route or another
   user's data via direct API calls (negative test)

## RLS / authorization test suite

A dedicated integration suite that, for every table with RLS enabled, asserts:
- Owner can read/write their own rows
- A different authenticated user of the same role **cannot** read/write those
  rows
- An unauthenticated request is rejected
- Admin-only tables/actions reject non-admin roles

This suite is treated as a release gate — it must be green before any schema
or policy change ships.

## CI pipeline (per PR)

```
lint → typecheck → unit + component tests → build →
integration tests (against ephemeral Supabase branch) →
Lighthouse CI budget check → Playwright E2E (staging preview deploy)
```

A PR cannot merge to `main` with a failing step. `main` deploys automatically
to a preview; production deploy is a manual promotion after the E2E suite is
green on the preview URL (see [Deployment Guide](./15-deployment-guide.md)).

## Manual QA checklist (every release, in addition to automated tests)

- Mobile Safari + Android Chrome pass on the booking flow specifically (highest
  business-impact flow, most likely to surface device-specific issues)
- Screen reader pass (VoiceOver or NVDA) on the matching questionnaire and
  booking form
- Visual check of email templates (Resend) render correctly in Gmail/Outlook

## Test data & environments

- **Local:** Supabase CLI local stack, seeded from `src/lib/data/*.ts`
- **Staging:** dedicated Supabase project + Stripe test mode, mirrors production
  schema via migrations, used for the Week 12 soak test and every pre-release E2E run
- **Production:** Stripe live mode, real Supabase project, feature-flagged
  rollout for any risky change (see rollout strategy in the Deployment Guide)
