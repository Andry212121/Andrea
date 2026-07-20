# User Flows

## Parent journey

```mermaid
flowchart TD
  A[Homepage] --> B[Search / Matching questionnaire]
  B --> C[Top 3-5 tutor matches]
  C --> D[View tutor profile]
  D --> E[Book free consultation]
  E --> F{Happy with tutor?}
  F -- No --> C
  F -- Yes --> G[Choose tutor & lesson plan]
  G --> H[Secure Stripe payment]
  H --> I[Lesson booked & calendar invite sent]
  I --> J[Attend lesson]
  J --> K[Progress dashboard updated]
  K --> L{More lessons?}
  L -- Yes --> I
  L -- No --> M[Leave review]
```

**Key decision points & requirements:**
- After step B, the matching algorithm (see [Matching Algorithm](./07-matching-algorithm.md))
  must return results in under 2 seconds.
- Step E (free consultation) is mandatory before first paid booking — enforced in
  the booking flow, not just suggested.
- Step H must support recurring bookings (weekly recurring lesson) as well as
  one-off, with the ability to cancel/reschedule with a 24-hour policy.
- Step K progress updates come from the tutor after each lesson (lesson note +
  optional score); this is the retention-driving loop.

## Tutor journey

```mermaid
flowchart TD
  A[Register] --> B[Complete profile]
  B --> C[Upload qualifications]
  C --> D[Upload DBS certificate]
  D --> E[Identity verification]
  E --> F[Submit for review]
  F --> G{Admin review}
  G -- Rejected --> H[Feedback + resubmit]
  H --> F
  G -- Approved --> I[Profile live in search & matching]
  I --> J[Receive enquiry / booking request]
  J --> K[Accept or decline]
  K -- Accept --> L[Teach lesson]
  L --> M[Mark lesson complete + leave notes]
  M --> N[Payout released after 24h]
  N --> O[Build reviews & repeat bookings]
```

**Key decision points & requirements:**
- Step F→G: admin review SLA target is 3 business days; tutor sees a status
  tracker (Submitted → In review → Approved/Changes requested).
- Step D/E cannot be skipped — a tutor cannot reach "submit for review" without
  both an uploaded DBS certificate and verified ID.
- Step N payout: Stripe Connect Express account required before a tutor can
  accept paid bookings (can still do the free consultation without it).

## Admin journey (tutor approval)

```mermaid
flowchart TD
  A[New application in queue] --> B[Review qualifications]
  B --> C[Verify DBS certificate number]
  C --> D[Verify ID document]
  D --> E[Review profile content & video]
  E --> F{Meets bar?}
  F -- Yes --> G[Approve — tutor notified, profile goes live]
  F -- No --> H[Request changes — tutor notified with reason]
  H --> A
```

## Booking cancellation / dispute flow

```mermaid
flowchart TD
  A[Parent or tutor requests cancellation] --> B{>24h before lesson?}
  B -- Yes --> C[Free cancellation, full refund/credit]
  B -- No --> D[Tutor cancellation policy applied]
  D --> E{Parent disputes charge?}
  E -- Yes --> F[Admin reviews dispute]
  F --> G[Refund, partial refund, or uphold charge]
  E -- No --> H[Charge stands]
```
