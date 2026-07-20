# UI Design System

This is the design system implemented in `/src` (Tailwind CSS v4 tokens in
`src/app/globals.css`). It's intentionally close to Stripe/Linear/Airbnb: generous
white space, soft shadows, rounded corners, restrained colour, confident serif
display type for a premium/academic feel.

## Brand palette

| Token | Hex | Usage |
|---|---|---|
| `navy-950` | `#060f21` | Deepest backgrounds (hero, footer) |
| `navy-900` | `#0a1930` | Primary text, primary buttons |
| `navy-800` / `navy-700` / `navy-600` / `navy-500` | — | Gradients, secondary surfaces |
| `navy-100` / `navy-50` | `#e7edf6` / `#f4f7fb` | Section backgrounds, subtle fills |
| `gold-600` → `gold-100` | `#a97e1f` → `#faf3df` | Accent, CTAs, verification highlights |
| `cream` | `#fbfaf7` | Optional warm background alternative |
| White | `#ffffff` | Primary background |

**Rule of thumb:** navy for trust/authority, gold used sparingly as an accent
(primary CTA, badges, highlights) — never as a large background.

## Typography

- **Display/serif:** Fraunces (`--font-serif`) — headings, stat numbers, tutor
  names. Conveys academic prestige without looking dated.
- **Body/sans:** Inter (`--font-sans`) — body copy, UI labels, forms. Optimised
  for legibility at small sizes.
- **Scale:** `text-sm` (14px) body-secondary → `text-base`/`text-lg` body →
  `text-3xl`–`text-6xl` serif display headings, responsive via Tailwind
  breakpoints (mobile-first).

## Spacing, radius & elevation

- Base spacing unit: Tailwind's 4px scale; sections use `py-16`–`py-28`.
- Card radius: `--radius-card: 1.25rem` (20px) — consistent across cards,
  buttons use full pill radius (`rounded-full`).
- Shadows: two custom tokens — `--shadow-soft` (resting state) and
  `--shadow-soft-lg` (hover/elevated state) — soft, diffuse, no hard drop shadows.

## Components (implemented in `src/components/ui`)

| Component | Notes |
|---|---|
| `Button` | Variants: `primary` (navy), `gold`, `outline`, `outline-light` (for dark backgrounds), `ghost`. Sizes: `sm`/`md`/`lg`. Renders as `<Link>` or `<button>` based on `href` prop. |
| `Badge` | Tones: `navy`, `gold`, `green` (verification/success), `neutral` |
| `Avatar` | Initials-based gradient avatar (no stock photography — see Content Guidelines) |
| `StarRating` | Partial-fill star rendering for fractional ratings (e.g. 4.98) |
| `SectionHeading` | Eyebrow + serif title + optional description, left or center aligned |
| `TutorCard` | Directory/grid card: avatar, verification icon, tagline, level badges, rating, location/mode/experience, rate, CTA |

## Content guidelines

- **No stock photography of real people.** Tutor "photos" are gradient initials
  avatars by design — this avoids implying real identities for what is currently
  mock/demo data, and remains a deliberate, premium-feeling fallback pattern even
  in production if a tutor hasn't uploaded a photo yet.
- Copy tone: warm but precise. No hype language ("amazing!!!", exclamation
  marks). Lead with specifics (years of experience, exam boards, real numbers)
  over adjectives.
- Trust signals (DBS Verified, ID Verified, ratings) are always visible near the
  tutor's name — never buried in a profile tab.

## Accessibility

- Target WCAG 2.1 AA. Colour contrast checked for navy-on-white and white-on-navy
  text combinations (all pass AA at body text sizes).
- All interactive elements have visible focus states (`focus-visible:ring-2`).
- Form inputs have associated `<label>` elements (visually hidden where the
  design calls for placeholder-only inputs, e.g. hero search).
- Semantic HTML: `<nav>`, `<main>`, `<footer>`, heading hierarchy starts at `h1`
  per page.

## Responsive strategy

Mobile-first Tailwind breakpoints (`sm`, `lg`) throughout. Navigation collapses
to a hamburger menu below `lg`. Dashboard sidebar hides below `lg` (mobile
dashboard nav is a documented gap — see [Risk Assessment](./17-risk-assessment.md)
and Week 7 of the [90-day roadmap](./13-roadmap-90-days.md)).

## Motion

Minimal, purposeful transitions only: `transition-colors`/`transition-all
duration-200` on hover states, subtle `-translate-y-1` lift on card hover. No
scroll-jacking, no large entrance animations that could hurt Core Web Vitals or
motion-sensitive users (respect `prefers-reduced-motion` in production).
