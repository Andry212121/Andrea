# Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Safeguarding failure** (an unvetted or inadequately vetted individual gains access to children) | Low (with process) | Critical | Mandatory DBS + ID + manual profile review before listing (no auto-approval path); ongoing DBS re-verification; documented incident response; safeguarding lead with 24h SLA on reports. See [Security Plan](./08-security-plan.md). |
| **Cold-start: launch with insufficient tutor supply**, parents search and find nothing | Medium | High | 90-day roadmap explicitly gates paid marketing spend behind 30–50 approved tutors being live first (Week 13); founder-led manual recruiting starts Week 3, not Week 13. |
| **Off-platform leakage** (parents/tutors transact outside GradeHub to avoid commission) | Medium | Medium–High (revenue) | Decreasing commission tiers reward staying on-platform; platform value-adds (scheduling, payments, progress tracking, safeguarding assurance) that are genuinely costly to replicate manually; monitored via re-booking-rate metrics. |
| **Payment/payout failure or fraud** | Low–Medium | High | Stripe (PCI-compliant, not handling raw card data ourselves), 24h payment hold before payout release, webhook-driven reconciliation, admin dispute workflow, idempotency keys on payment mutations. |
| **Data breach** (personal data, especially children's data or DBS/ID documents) | Low | Critical | Encryption at rest/in transit, private storage buckets with signed URLs, RLS defence-in-depth, documented incident response with ICO notification process, DPIA completed pre-launch. |
| **Regulatory/compliance gap** (UK GDPR, safeguarding law, payment regulation) | Low–Medium | High | Solicitor review of legal pages pre-launch; DPA with every sub-processor; ICO registration; ongoing compliance review cadence, not a one-time check. |
| **Founder/key-person dependency** (solo founder building and operating) | High (structural, at MVP stage) | High | Thorough documentation (this docs folder) reduces bus-factor risk; admin tooling built early (Week 3, Week 10) so operations aren't entirely manual/tribal-knowledge; plan to bring in a second team member (ops/support) as soon as revenue supports it. |
| **SEO underperformance vs. larger incumbent domains** | Medium | Medium | Deliberately narrow initial keyword targeting (Buckinghamshire-specific, long-tail) rather than competing head-on for generic "tutor" terms; technical SEO excellence (Core Web Vitals, structured data) as a differentiator incumbents may under-invest in. See [SEO Strategy](./09-seo-strategy.md). |
| **Matching algorithm perceived as unfair or "pay to win"** | Low–Medium | Medium (trust) | Featured-tutor score boost is small, capped, and documented transparently rather than hidden; match reasons shown to parents so ranking isn't a black box. See [Matching Algorithm](./07-matching-algorithm.md). |
| **Third-party dependency outage** (Supabase, Stripe, Vercel) | Low | Medium–High | Status-page monitoring and alerting; rollback plan for app-layer issues; no single third-party outage should be able to lose data (idempotent operations, webhook retry handling). |
| **Negative review / PR incident** (a genuinely bad tutoring experience surfaces publicly) | Medium | Medium | Responsive, transparent dispute/refund process; safeguarding-first brand positioning means the response to an incident (not just its existence) is what the market judges. |
| **AI feature harm** (once built — hallucinated/incorrect content reaching a parent or child) | Low (mitigated by design) | Medium–High | Human-in-the-loop requirement on every AI feature by default (see [AI Roadmap](./10-ai-roadmap.md)); child-facing AI assistant explicitly deferred until a mature trust & safety process exists. |
| **Unit economics don't hold at scale** (CAC rises faster than projected, retention lower than modelled) | Medium | High | Quarterly review of real data against [projections](./11-monetisation-and-projections.md); expansion gated on leading indicators (see [Growth Roadmap](./16-growth-roadmap.md)) rather than a fixed calendar. |

## Risk review cadence

- Safeguarding and security risks: reviewed continuously (any incident triggers
  an immediate ad hoc review) plus a formal quarterly review.
- Business/financial risks: reviewed monthly against actuals during the first
  year, quarterly thereafter.
- This document itself is a living artifact — updated whenever a new material
  risk is identified, not treated as a one-time pre-launch exercise.
