# SEO Strategy

## Objective

Own organic search for "11+ tutor [Buckinghamshire town]" and "[subject] tutor"
intent before competitors with far larger domains (Tutorful, MyTutor, Superprof,
First Tutors) can out-rank a focused, locally-relevant, technically excellent
site.

## Site architecture for SEO

- Every location and subject combination is a real, unique, statically-generated
  page (`/locations/[slug]`, `/subjects/[slug]`) with genuinely different content
  (local schools, tutor counts, subject descriptions) — not thin, templated
  duplicate pages.
- All marketing/content pages are statically generated (SSG) at build time via
  `generateStaticParams`, giving near-instant TTFB and strong Core Web Vitals,
  which is itself a ranking factor.
- Clean, human-readable URLs throughout (`/tutors/eleanor-whitfield`, not
  `/tutors?id=123`).
- `sitemap.xml` (`src/app/sitemap.ts`) and `robots.txt` (`src/app/robots.ts`)
  auto-generated from the same data sources as the pages themselves, so they can
  never drift out of sync.

## Priority landing pages (Phase 1 — Buckinghamshire)

| Page | Target query | Status |
|---|---|---|
| `/locations/aylesbury` | "11+ tutor Aylesbury" | Built |
| `/locations/high-wycombe` | "11+ tutor High Wycombe" | Built |
| `/locations/milton-keynes` | "11+ tutor Milton Keynes" | Built |
| `/locations/buckingham` | "11+ tutor Buckingham" | Built |
| `/locations/online` | "11+ tutor online" | Built |
| `/subjects/11-plus` | "grammar school tutor" / "11+ tutor" | Built |
| `/subjects/maths` | "maths tutor" | Built |
| `/subjects/english` | "english tutor" | Built |
| `/subjects/verbal-reasoning` | "verbal reasoning tutor" | Built |
| `/subjects/non-verbal-reasoning` | "non-verbal reasoning tutor" | Built |
| `/grammar-school-guide` | "buckinghamshire 11+ exam", "when to start 11+ tutoring" | Built |

## Metadata pattern

Every page sets a unique `<title>` (via the `template: "%s | GradeHub"` pattern
in the root layout) and `<meta description>` through the Next.js `Metadata` API,
plus Open Graph and Twitter card tags at the root layout level, overridden
per-page where content differs meaningfully (tutor profiles, blog posts,
location/subject pages all export their own `generateMetadata`).

## Structured data (schema.org) — recommended additions

| Page type | Schema | Purpose |
|---|---|---|
| Homepage / Organization | `Organization` + `WebSite` (with `SearchAction`) | Sitelinks search box eligibility, brand knowledge panel |
| Tutor profile | `Person` + `AggregateRating` + `Offer` | Star ratings in search results |
| Location pages | `LocalBusiness` (or `Service` with `areaServed`) | Local pack relevance |
| Blog posts | `Article` / `BlogPosting` | Rich snippets, author/date display |
| FAQ page | `FAQPage` | FAQ rich results |
| Grammar School Guide | `EducationalOccupationalCredential`-adjacent `Article` | Featured snippet eligibility for "when to start 11+" queries |

*(Not yet implemented in the current codebase — tracked for Week 5 of the
[90-day roadmap](./13-roadmap-90-days.md).)*

## Content strategy

- **Blog** (`/blog`) targets top-of-funnel, high-intent informational queries:
  "when to start 11+ tutoring", "verbal vs non-verbal reasoning", "how to choose
  a tutor" — each written to genuinely answer the question, with clear internal
  links to `/find-a-tutor` and relevant subject/location pages.
- **Grammar School Guide** is the cornerstone content asset: built to rank for
  and satisfy "Buckinghamshire 11+" research queries end-to-end, reducing bounce
  back to Google (a negative ranking signal) by being genuinely comprehensive.
- Publishing cadence: 2 posts/month at launch, ramping to weekly by Month 4,
  prioritised by realistic keyword difficulty vs. GradeHub's domain authority at
  each stage.

## Technical SEO checklist

- [x] Static generation for all indexable routes
- [x] `sitemap.xml`, `robots.txt` with dashboard routes disallowed
- [x] Dashboard routes marked `noindex, nofollow` via route-level metadata
- [x] Semantic heading hierarchy (single `h1` per page)
- [ ] Structured data (JSON-LD) — planned, see above
- [ ] Canonical tags on any future paginated/filtered URL variants of `/find-a-tutor`
- [ ] `next/image` with explicit `width`/`height` once real tutor/photo assets exist, to protect CLS
- [ ] Automated Lighthouse CI budget (LCP/CLS/INP thresholds) gating deploys

## Local SEO (beyond on-site)

- Google Business Profile for GradeHub, category "Tutoring service", with
  Buckinghamshire service area set explicitly.
- Structured outreach for backlinks from Buckinghamshire parenting forums, local
  school PTA newsletters (where permitted), and local press (see
  [Marketing Plan](./12-marketing-plan.md) PR section).
- NAP (name/address/phone) consistency wherever GradeHub is listed, even though
  the business itself is online-first — matters for local pack ranking.
