# Matching Algorithm

## Goal

Given a parent's questionnaire answers, return the best 3–5 tutors — ranked by
genuine fit, not just proximity, price or who paid for a featured listing.

## Inputs

| Field | Source | Notes |
|---|---|---|
| Subjects needed | Questionnaire | e.g. `11-plus`, `verbal-reasoning` |
| Target school | Questionnaire | Used to weight tutors with documented experience at that school |
| Location / mode | Questionnaire | Postcode or town + online/in-person/either |
| Budget (max £/hr) | Questionnaire | Hard filter, not just a weight |
| Availability | Questionnaire | Day/time windows |
| Learning needs | Questionnaire (optional free text / SEN flags) | Boosts SEN-experienced tutors |
| Child's year group | Questionnaire | Filters tutors who teach that level |

## Candidate filtering (hard filters, applied first)

A tutor is only a candidate if **all** of the following hold:
1. `is_listed = true` and `verification_status = 'approved'`
2. Teaches at least one requested subject at the requested level
3. `hourly_rate_pence <= budget_max_pence` (or budget unset)
4. Lesson mode compatible (tutor offers online if parent wants online, etc.)
5. If in-person requested: tutor's location is within a reasonable distance
   (haversine distance ≤ tutor's `travel_radius_km`, or same town)

## Scoring (weighted sum, 0–1 normalised per factor)

| Factor | Weight | Calculation |
|---|---|---|
| Subject/level match strength | 25% | 1.0 if exact subject+level match on all requested subjects, scaled down per partial match |
| Target school experience | 20% | 1.0 if tutor has documented lessons/reviews referencing the same school, 0.5 if same test format (e.g. CSSE), else 0 |
| Availability overlap | 20% | Proportion of requested time windows that overlap tutor's availability |
| Rating & review volume | 15% | Bayesian-adjusted average rating (pulls low-review-count tutors toward the platform mean to avoid a single 5-star review outranking a well-reviewed tutor) |
| Learning needs fit | 10% | 1.0 if tutor has SEN/relevant tags matching stated needs, else 0.5 baseline |
| Response time | 5% | Faster average response time scores higher |
| Price proximity to budget | 5% | Slight preference for tutors priced comfortably under budget (avoids always surfacing the most expensive tutor under the cap) |

```
match_score = 0.25*subject_fit + 0.20*school_fit + 0.20*availability_fit
            + 0.15*rating_score + 0.10*needs_fit + 0.05*response_score
            + 0.05*price_fit
```

**Featured tutors** (`is_featured = true`, a paid placement — see
[Monetisation](./11-monetisation-and-projections.md)) receive a small, capped
score boost (+0.03) — enough to break ties among similarly-strong matches, never
enough to place a weak match above a strong unpaid one. This boost is explicitly
documented and auditable, since silently favouring paying tutors would undermine
the trust the whole platform is built on.

## Output

Top 3–5 candidates by `match_score`, each returned with 1–3 human-readable
`match_reasons` strings (e.g. "5 years preparing children for Aylesbury Grammar
School", "Available Tuesdays 4–6pm", "SEN-experienced") so parents understand
*why* a tutor was suggested, not just a black-box score.

## Anti-gaming & fairness

- Hard filters (budget, subject, mode) cannot be overridden by weighting — a
  tutor outside budget never appears, regardless of rating.
- Bayesian rating adjustment prevents a brand-new tutor with one 5★ review from
  outranking an established tutor with 100 reviews at 4.9★.
- New tutors (< 5 completed lessons) receive a small "new tutor" boost (+0.02,
  time-limited to their first 30 days listed) so the marketplace doesn't purely
  entrench early leaders — reviewed quarterly against actual outcome data.
- All scoring weights are configuration, not hardcoded, so they can be tuned
  from observed conversion data without a deploy (Phase 2: move from a static
  config to a `match_weights` config table, admin-editable).

## Implementation notes (MVP)

- MVP implementation is a synchronous scoring pass over the (filtered) candidate
  set in the `/match` API route — fully sufficient at Buckinghamshire scale
  (hundreds, not tens of thousands, of tutors).
- Distance calculation uses the Haversine formula against tutor lat/long
  (geocoded from postcode via Google Maps Geocoding API at profile save time).
- As supply grows nationally, move filtering to a Postgres query with a PostGIS
  radius filter before scoring in-memory, to avoid scoring the entire tutor table
  on every request.
