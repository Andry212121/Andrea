# API Specification

REST API served from Next.js Route Handlers (`/src/app/api/**/route.ts`), backed
by Supabase Postgres. All authenticated routes require a Supabase session (JWT in
an httpOnly cookie). Admin routes additionally require `role = 'admin'`.

Base URL: `https://api.gradehub.co.uk/v1` (or same-origin `/api/*` in the Next.js app).

## Conventions

- JSON request/response bodies, `Content-Type: application/json`
- Pagination: `?page=1&per_page=20`, response includes `meta: { page, per_page, total }`
- Errors: `{ "error": { "code": "string", "message": "string", "fields": {} } }`
  with standard HTTP status codes (400, 401, 403, 404, 409, 422, 429, 500)
- All list endpoints support `?sort=` and filter query params documented per-route
- Rate limited per IP + per user (see [Security Plan](./08-security-plan.md))

## Auth

| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Create account (role: parent or tutor) |
| POST | `/auth/login` | Email/password login (Supabase Auth) |
| POST | `/auth/logout` | Invalidate session |
| POST | `/auth/password/forgot` | Send reset email |
| POST | `/auth/password/reset` | Reset with token |
| GET | `/auth/me` | Current user + role + profile summary |

## Parents & children

| Method | Path | Description |
|---|---|---|
| GET | `/parents/me` | Get own parent profile |
| PATCH | `/parents/me` | Update profile |
| GET | `/parents/me/children` | List children |
| POST | `/parents/me/children` | Add a child |
| PATCH | `/children/:id` | Update child |
| DELETE | `/children/:id` | Remove child |

## Tutors & search

| Method | Path | Description |
|---|---|---|
| GET | `/tutors` | Search/list tutors. Query: `subject`, `location`, `mode`, `max_price`, `min_rating`, `sort` |
| GET | `/tutors/:slug` | Public tutor profile |
| POST | `/tutors` | Create tutor application (role: tutor, status starts `pending`) |
| PATCH | `/tutors/me` | Update own tutor profile |
| POST | `/tutors/me/documents` | Upload a document (multipart → Supabase Storage, creates `tutor_documents` row) |
| GET | `/tutors/me/documents` | List own uploaded documents + status |
| PUT | `/tutors/me/availability` | Replace availability windows |
| GET | `/tutors/me/dashboard-summary` | Stats for tutor dashboard overview |

## Matching

| Method | Path | Description |
|---|---|---|
| POST | `/match` | Submit questionnaire, returns ranked top 3–5 tutors (see [Matching Algorithm](./07-matching-algorithm.md)) |

**Request body:**
```json
{
  "subject_slugs": ["11-plus", "verbal-reasoning"],
  "location": "aylesbury",
  "mode": "online_and_in_person",
  "budget_max_pence": 5000,
  "child_year_group": "Year 5",
  "target_school_id": "uuid",
  "learning_needs": "dyslexia",
  "availability": [{ "day_of_week": 1, "start": "16:00", "end": "18:00" }]
}
```

**Response:**
```json
{
  "matches": [
    { "tutor": { "...": "tutor summary object" }, "match_score": 0.94, "match_reasons": ["Target school experience", "Available Mon 4-6pm", "Within budget"] }
  ]
}
```

## Bookings

| Method | Path | Description |
|---|---|---|
| POST | `/bookings` | Create a booking (consultation or paid lesson) |
| GET | `/bookings` | List own bookings (parent or tutor context) |
| GET | `/bookings/:id` | Booking detail |
| PATCH | `/bookings/:id/accept` | Tutor accepts a requested booking |
| PATCH | `/bookings/:id/decline` | Tutor declines |
| PATCH | `/bookings/:id/cancel` | Cancel (parent or tutor), applies cancellation policy |
| PATCH | `/bookings/:id/complete` | Tutor marks lesson complete, optionally attaches a progress report |

## Payments & invoices

| Method | Path | Description |
|---|---|---|
| POST | `/payments/intent` | Create a Stripe PaymentIntent for a booking |
| POST | `/payments/webhook` | Stripe webhook receiver (signature-verified) |
| GET | `/payments` | List own payments |
| GET | `/invoices/:id` | Get invoice (PDF link) |
| POST | `/payouts/connect-link` | Generate a Stripe Connect onboarding link for a tutor |

## Messaging

| Method | Path | Description |
|---|---|---|
| GET | `/conversations` | List own conversations |
| GET | `/conversations/:id/messages` | Paginated messages |
| POST | `/conversations/:id/messages` | Send a message |

## Reviews & progress

| Method | Path | Description |
|---|---|---|
| POST | `/reviews` | Leave a review (requires a completed booking) |
| GET | `/tutors/:slug/reviews` | Public reviews for a tutor |
| POST | `/progress-reports` | Tutor creates a progress report for a booking |
| GET | `/children/:id/progress-reports` | Parent views progress history for a child |

## Admin

| Method | Path | Description |
|---|---|---|
| GET | `/admin/tutors?status=pending` | Tutor approval queue |
| PATCH | `/admin/tutors/:id/approve` | Approve tutor, sets `is_listed = true` |
| PATCH | `/admin/tutors/:id/reject` | Reject with reason |
| GET | `/admin/disputes` | List disputes |
| PATCH | `/admin/disputes/:id/resolve` | Resolve with outcome + optional refund |
| GET | `/admin/metrics` | Platform KPIs for dashboard |
| GET | `/admin/support-tickets` | Support queue |

## Webhooks (inbound)

| Source | Path | Purpose |
|---|---|---|
| Stripe | `/webhooks/stripe` | Payment succeeded/failed, payout events, dispute created |
| Resend | `/webhooks/resend` | Bounce/complaint handling (suppress future sends) |

## Rate limits (indicative)

| Route group | Limit |
|---|---|
| `/auth/*` | 10 requests / 5 min / IP |
| `/match` | 20 requests / hour / user |
| `/tutors` (search) | 60 requests / min / IP |
| `/conversations/*/messages` (POST) | 30 requests / min / user |
| Everything else, authenticated | 300 requests / min / user |
