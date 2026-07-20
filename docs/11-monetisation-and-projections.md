# Monetisation, Pricing & Revenue Projections

## Revenue model (recommended mix)

| Stream | Mechanism | Priority |
|---|---|---|
| **Commission on lessons** | Tiered % fee charged to tutors on completed bookings (see [Pricing](../src/app/pricing/page.tsx)): 20% up to £2k lifetime earnings, 15% to £10k, 10% beyond | Primary, from day one |
| **Parent Premium membership** | £12/month: priority matching, Grammar School Readiness Score, mock exam discounts, priority support | Secondary, launched at MVP |
| **Featured tutor listings** | Paid placement with a small, capped matching-score boost (see [Matching Algorithm](./07-matching-algorithm.md)) | Phase 2 — only once organic supply/demand is healthy enough that paid placement doesn't crowd out quality |
| **Mock exam fees** | Paid, proctored mock 11+ exams with scored feedback | Phase 2 |
| **Holiday revision courses** | Multi-day intensive courses, higher-margin cohort-based delivery | Phase 2/3 |
| **Affiliate partnerships** | Curated 11+ book/resource recommendations (Amazon Associates-style) | Low priority, opportunistic |
| **Advertising** | Explicitly **not recommended** at current scale — display ads would undercut the premium, trust-first brand positioning that differentiates GradeHub from lower-end competitors | Not planned |

**Why commission-first, not a tutor subscription:** a subscription creates a
cash-cost barrier for new tutors before they've earned anything on the platform,
directly working against the cold-start goal of recruiting 30–50 quality tutors
pre-launch. Commission only charges tutors once they're already being paid,
aligning GradeHub's incentives with actually generating bookings.

## Pricing recommendations

- **Parents:** no platform booking fee beyond the tutor's advertised rate — free
  to search, match, and take a consultation. This removes the biggest conversion
  friction point relative to competitors that layer fees onto every booking.
- **Tutors:** no listing fee; tiered commission (above) that *decreases* with
  tutor loyalty/volume, which both incentivises tutors to funnel all their
  bookings through GradeHub (rather than moving parents off-platform to avoid
  fees) and rewards the most active, highest-quality supply.
- **Premium (parent):** priced to be an easy "why not" add-on relative to
  £25–85/hr lesson spend, not a meaningful new line-item.

## Unit economics (illustrative, Buckinghamshire MVP)

Assumptions: £45 average hourly tutor rate, 17% blended average commission
(mix of tier 1/2/3 tutors), 1.4 average lessons/week per active family over an
average 9-month 11+ prep engagement.

| Metric | Value |
|---|---|
| Average revenue per booked lesson | £45 × 17% ≈ **£7.65** |
| Average lessons per family (9-month engagement) | ~50 |
| Average revenue per family (LTV, lesson commission only) | **≈ £383** |
| + Premium membership (30% attach, 9 months) | + £32 (blended) |
| **Blended parent LTV** | **≈ £415** |
| Estimated CAC (blended paid + organic, Buckinghamshire) | £35–60 |
| **LTV:CAC ratio** | **~7–12:1** |

Tutor-side: a tutor earning £15k/year through the platform pays roughly £1,700–£2,250
in commission across the tiers — materially less than the time cost of
self-marketing, which is the retention pitch.

## 3-year revenue projection (illustrative, not a forecast commitment)

| | Year 1 (Bucks MVP + early expansion) | Year 2 (regional expansion + Phase 2 products) | Year 3 (national + Phase 3/4) |
|---|---|---|---|
| Active tutors (period end) | 250 | 1,200 | 4,500 |
| Active families (period end) | 900 | 5,000 | 20,000 |
| Booked lesson-hours (annualised) | 22,000 | 140,000 | 620,000 |
| Commission revenue | £170k | £1.05m | £4.6m |
| Premium membership revenue | £25k | £220k | £950k |
| Mock exams / courses (from Year 2) | — | £90k | £480k |
| **Total revenue** | **≈ £195k** | **≈ £1.36m** | **≈ £6.0m** |

These figures are directional planning inputs for hiring/spend decisions, not a
committed forecast — they should be revisited quarterly against real conversion,
retention and CAC data once the MVP is live.

## Key economic risks to unit economics

- **Off-platform leakage:** parents and tutors agreeing to move recurring
  lessons off-platform to avoid commission after an initial GradeHub-sourced
  match. Mitigated by the decreasing-commission-with-loyalty structure, plus
  platform value-adds (payments, scheduling, progress tracking) that are
  genuinely easier to keep using than to replicate manually.
- **CAC inflation** as paid channels (Google Ads) get more competitive — the SEO
  investment (see [SEO Strategy](./09-seo-strategy.md)) exists specifically to
  keep blended CAC below the illustrative range above over time.
