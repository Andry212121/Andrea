# GradeHub — Product & Engineering Documentation

GradeHub is a marketplace connecting parents with vetted, DBS-checked 11+ and grammar
school tutors — launching in Buckinghamshire before expanding across the UK.

This folder contains the full product, design, engineering, growth and business
documentation for the platform. The `/src` app is a working Next.js frontend MVP
(marketing site + tutor search + tutor profiles + parent/tutor/admin dashboard UI)
built on mock data — see the root `README.md` for how to run it.

## Contents

| Doc | Purpose |
|---|---|
| [01-prd.md](./01-prd.md) | Product Requirements Document — vision, users, goals, feature set |
| [02-information-architecture.md](./02-information-architecture.md) | Sitemap, navigation, page inventory, wireframe descriptions |
| [03-user-flows.md](./03-user-flows.md) | Parent and tutor journeys, as diagrams |
| [04-design-system.md](./04-design-system.md) | Brand, colour, typography, components, accessibility |
| [05-database-schema.md](./05-database-schema.md) | Full PostgreSQL/Supabase schema (DDL) |
| [06-api-specification.md](./06-api-specification.md) | REST API specification |
| [07-matching-algorithm.md](./07-matching-algorithm.md) | Tutor recommendation engine design |
| [08-security-plan.md](./08-security-plan.md) | Security, safeguarding and GDPR compliance |
| [09-seo-strategy.md](./09-seo-strategy.md) | SEO strategy, landing pages, schema markup |
| [10-ai-roadmap.md](./10-ai-roadmap.md) | Future AI features |
| [11-monetisation-and-projections.md](./11-monetisation-and-projections.md) | Revenue model, pricing, unit economics, 3-year projections |
| [12-marketing-plan.md](./12-marketing-plan.md) | 12-month go-to-market and growth marketing plan |
| [13-roadmap-90-days.md](./13-roadmap-90-days.md) | Week-by-week build plan to MVP launch |
| [14-testing-plan.md](./14-testing-plan.md) | Testing strategy across the stack |
| [15-deployment-guide.md](./15-deployment-guide.md) | Environments, CI/CD, infrastructure |
| [16-growth-roadmap.md](./16-growth-roadmap.md) | Post-launch expansion beyond Buckinghamshire |
| [17-risk-assessment.md](./17-risk-assessment.md) | Key risks and mitigations |
| [18-feature-prioritisation.md](./18-feature-prioritisation.md) | MoSCoW feature prioritisation |

## How to read this

Start with the PRD, then the 90-day roadmap — together they answer "what are we
building and in what order." The remaining documents are reference material each
roadmap week draws on (schema, API, design system, security, SEO, etc.).

## Repository folder structure

```
.
├── docs/                        # This documentation set
├── public/                      # Static assets (favicon, etc.)
├── src/
│   ├── app/                     # Next.js App Router routes
│   │   ├── (marketing pages)/   # page.tsx per route — about, pricing, blog, etc.
│   │   ├── tutors/[slug]/       # Tutor profile (SSG)
│   │   ├── locations/[slug]/    # Local SEO landing pages (SSG)
│   │   ├── subjects/[slug]/     # Subject SEO landing pages (SSG)
│   │   ├── blog/[slug]/         # Blog posts (SSG)
│   │   ├── dashboard/           # Parent / tutor / admin dashboards
│   │   ├── sitemap.ts           # Auto-generated sitemap.xml
│   │   ├── robots.ts            # Auto-generated robots.txt
│   │   ├── layout.tsx           # Root layout: fonts, metadata, SiteChrome
│   │   └── globals.css          # Design tokens (Tailwind v4 @theme)
│   ├── components/
│   │   ├── ui/                  # Design-system primitives (Button, Badge, Avatar, ...)
│   │   ├── layout/               # Navbar, Footer, SiteChrome, DashboardShell
│   │   ├── dashboard/            # Dashboard-specific widgets (StatCard, icons)
│   │   ├── find-tutor/           # Search filters, booking form, favourite button
│   │   └── home/                 # Homepage-specific components (hero search)
│   └── lib/
│       ├── data/                 # Mock data (tutors, subjects, locations, blog, FAQs) —
│       │                         # replaced by real Supabase queries per the 90-day roadmap
│       └── utils.ts              # Shared helpers (className merging)
├── package.json
└── tsconfig.json
```

Future backend additions (per the [90-Day Roadmap](./13-roadmap-90-days.md)) will
add `src/app/api/**/route.ts` handlers, `supabase/migrations/`, and a
`src/lib/supabase/` client module — the current structure is deliberately
frontend-only so it drops into that backend work without a restructure.
