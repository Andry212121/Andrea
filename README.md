# GradeHub

GradeHub is the UK's premium grammar school tutoring marketplace — connecting
parents with vetted, DBS-checked 11+ tutors, starting in Buckinghamshire.

This repository contains a **working frontend MVP**: a full Next.js + TypeScript
+ Tailwind CSS marketing site, tutor search & profiles, matching-questionnaire
UI, booking flow UI, and parent/tutor/admin dashboard UI — all running on mock
data (`src/lib/data/*.ts`) with no backend connected yet.

See [`/docs`](./docs/README.md) for the full product, design, engineering and
business documentation, including the [90-day roadmap](./docs/13-roadmap-90-days.md)
to take this from prototype to a real, backend-connected launch.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build (also runs the TypeScript compiler) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4

The target production stack also includes Supabase (database/auth/storage),
Stripe (payments + Connect payouts), Resend (email), Google Maps/Calendar/Meet,
Vercel + Cloudflare (hosting/CDN), and PostHog + Microsoft Clarity (analytics) —
see [`/docs/15-deployment-guide.md`](./docs/15-deployment-guide.md) and
[`/docs/13-roadmap-90-days.md`](./docs/13-roadmap-90-days.md) for how these get
wired in.

## Project structure

See [`/docs/README.md`](./docs/README.md#repository-folder-structure) for the
annotated folder structure.
