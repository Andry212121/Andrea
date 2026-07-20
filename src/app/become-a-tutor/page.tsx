import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Become a Tutor",
  description:
    "Join GradeHub as a vetted 11+ or grammar school tutor. Set your own rate, get consistent enquiries, and let us handle bookings and payments.",
};

const perks = [
  {
    title: "Consistent enquiries",
    description: "Our matching algorithm sends you students who genuinely fit your subjects, availability and rate — no cold outreach required.",
  },
  {
    title: "You set your rate",
    description: "GradeHub takes a transparent service fee on completed lessons. No subscription required to get started.",
  },
  {
    title: "Payments handled for you",
    description: "Stripe-powered payouts mean no more chasing invoices — funds are released automatically after each lesson.",
  },
  {
    title: "Build real credibility",
    description: "Verified reviews, a DBS-checked badge and lesson history all work together to build trust with new families.",
  },
  {
    title: "Simple booking tools",
    description: "Manage your calendar, message parents, and track earnings from one dashboard.",
  },
  {
    title: "Be part of something bigger",
    description: "We're building the UK's most trusted education marketplace — and looking for tutors who share that standard.",
  },
];

const requirements = [
  "Enhanced DBS certificate (or willingness to obtain one — we can guide you through the process)",
  "Evidence of relevant qualifications, teaching experience or subject-matter expertise",
  "A short video introduction for your profile",
  "Verified photo ID",
  "A commitment to safeguarding best practice",
];

export default function BecomeTutorPage() {
  return (
    <>
      <PageHero
        eyebrow="Become a tutor"
        title="Spend less time marketing yourself, more time teaching"
        description="Join a vetted network of Buckinghamshire's best 11+ and grammar school tutors. We bring the students — you bring the expertise."
      />

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Why tutors choose GradeHub" title="Everything you need, none of the admin" align="center" className="mx-auto" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <div key={p.title} className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
                <h3 className="font-serif-display text-lg font-medium text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Requirements" title="What you'll need to apply" />
            <ul className="mt-6 space-y-3">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-navy-700/90">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg viewBox="0 0 20 20" className="size-3" fill="currentColor">
                      <path d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" />
                    </svg>
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-8 shadow-soft">
            <h3 className="font-serif-display text-xl font-medium text-navy-900">Approval process</h3>
            <ol className="mt-4 space-y-4 text-sm text-navy-700/90">
              <li><span className="font-semibold text-navy-900">1. Apply online</span> — takes about 15 minutes.</li>
              <li><span className="font-semibold text-navy-900">2. Document review</span> — our admin team verifies your DBS, ID and qualifications.</li>
              <li><span className="font-semibold text-navy-900">3. Profile review</span> — we check your profile meets our quality bar.</li>
              <li><span className="font-semibold text-navy-900">4. Approval</span> — typically within 3 business days, and you&apos;re live in search.</li>
            </ol>
            <Button href="/contact" variant="gold" className="mt-8 w-full">
              Start your application
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
