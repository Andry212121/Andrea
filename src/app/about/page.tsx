import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "GradeHub was founded to make finding a trustworthy 11+ tutor simple, safe and transparent for Buckinghamshire families.",
};

const values = [
  {
    title: "Trust first",
    description:
      "Every tutor is vetted before a parent ever sees their profile. We'd rather have 250 excellent tutors than 5,000 unverified ones.",
  },
  {
    title: "Radical clarity",
    description:
      "No hidden fees, no vague pricing, no confusing onboarding. Parents should know exactly what they're getting at every step.",
  },
  {
    title: "Built for real families",
    description:
      "The 11+ process is stressful enough. Our product decisions start with 'does this reduce a parent's anxiety?'",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About GradeHub"
        title="We built the tutor search we wished existed for our own kids"
        description="GradeHub started in Buckinghamshire because too many parents were relying on Facebook groups and word-of-mouth to find someone to trust with their child's education."
      />

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="From frustrated parents to a better way to search"
            />
            <div className="mt-6 space-y-4 text-navy-700/90">
              <p>
                Finding an 11+ tutor in Buckinghamshire meant scrolling Facebook groups, hoping a
                recommendation from a friend-of-a-friend was still accurate, and taking a leap of
                faith on safeguarding. There was no way to compare tutors on the things that
                actually mattered: verified qualifications, real DBS checks, and genuine fit for a
                specific target school.
              </p>
              <p>
                GradeHub exists to fix that. We built a platform where every tutor is vetted
                before they can accept a booking, where matching is based on your child&apos;s
                actual needs rather than who has the biggest advertising budget, and where
                progress is visible instead of a black box.
              </p>
              <p>
                We&apos;re starting in Buckinghamshire because that&apos;s where we understand the
                exam format, the schools, and the families best. From here, we&apos;re expanding
                across the UK.
              </p>
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-navy-50 p-8">
            <h3 className="font-serif-display text-xl font-medium text-navy-900">Our mission</h3>
            <p className="mt-3 text-navy-700/90">
              To become the UK&apos;s most trusted education marketplace — starting with grammar
              school preparation and growing into a lifelong learning partner for families.
            </p>
            <h3 className="mt-8 font-serif-display text-xl font-medium text-navy-900">
              Where we&apos;re headed
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-navy-700/90">
              <li>GCSE and A-Level tutoring nationwide</li>
              <li>SEN specialists, speech therapists and educational psychologists</li>
              <li>Mock exams and holiday revision courses</li>
              <li>An AI study assistant and progress dashboard for every family</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="What we believe" title="The principles behind every decision" align="center" className="mx-auto" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
                <h3 className="font-serif-display text-lg font-medium text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center sm:py-24">
        <div className="container-page">
          <h2 className="mx-auto max-w-xl font-serif-display text-3xl font-medium text-navy-900">
            Want to help build the UK&apos;s most trusted education marketplace?
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" size="lg">
              Get in touch
            </Button>
            <Button href="/become-a-tutor" variant="outline" size="lg">
              Join as a tutor
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
