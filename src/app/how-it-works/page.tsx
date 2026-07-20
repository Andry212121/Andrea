import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How it Works",
  description:
    "See exactly how GradeHub matches parents with vetted 11+ tutors, and how tutors get approved and receive bookings.",
};

const parentSteps = [
  {
    title: "1. Complete the matching questionnaire",
    description:
      "Tell us your child's target school, current level, budget, availability and any learning needs. Takes under three minutes.",
  },
  {
    title: "2. Receive your top tutor matches",
    description:
      "Our matching algorithm returns your best 3–5 tutors, ranked on genuine fit — subject expertise, target school experience, availability and rating.",
  },
  {
    title: "3. Review tutor profiles",
    description:
      "See qualifications, DBS verification, video introductions, reviews and lesson history before making a decision.",
  },
  {
    title: "4. Book a free consultation",
    description:
      "Every match includes a free 15-minute call so you and your child can meet the tutor before committing.",
  },
  {
    title: "5. Choose your tutor and pay securely",
    description:
      "Book recurring or one-off lessons. Payments are processed securely through Stripe and held until 24 hours after each lesson.",
  },
  {
    title: "6. Track progress on your dashboard",
    description:
      "See lesson notes, homework, mock exam scores and revision plans in one place — no more guessing how things are going.",
  },
  {
    title: "7. Leave a review",
    description:
      "Help other parents by rating your experience once your child has completed lessons.",
  },
];

const tutorSteps = [
  {
    title: "1. Register",
    description: "Create your tutor account and tell us about your subjects, experience and availability.",
  },
  {
    title: "2. Complete your profile",
    description: "Add a bio, hourly rate, availability calendar and a short video introduction.",
  },
  {
    title: "3. Upload qualifications",
    description: "Provide evidence of relevant qualifications, teaching experience or subject expertise.",
  },
  {
    title: "4. Submit DBS & ID verification",
    description: "An Enhanced DBS certificate and verified photo ID are required for every tutor on GradeHub.",
  },
  {
    title: "5. Profile review",
    description: "Our admin team reviews every application manually before approval — typically within 3 business days.",
  },
  {
    title: "6. Get approved & receive enquiries",
    description: "Once approved, your profile appears in search and matching results, and enquiries start coming in.",
  },
  {
    title: "7. Teach & get paid",
    description: "Accept bookings, teach your lessons, and receive automatic payouts through Stripe Connect.",
  },
  {
    title: "8. Build your reputation",
    description: "Collect verified reviews and grow your booking rate — no marketing spend required.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="A transparent journey for parents and tutors"
        description="Whether you're looking for a tutor or want to become one, here's exactly what to expect at every step."
      />

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="For parents" title="Your journey to a booked lesson" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {parentSteps.map((step) => (
              <div key={step.title} className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
                <h3 className="font-serif-display text-lg font-medium text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/find-a-tutor" size="lg">
              Find my tutor
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="For tutors" title="Your journey to your first booking" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tutorSteps.map((step) => (
              <div key={step.title} className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
                <h3 className="font-medium text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/become-a-tutor" variant="gold" size="lg">
              Apply to become a tutor
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
