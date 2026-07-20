import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { Avatar } from "@/components/ui/avatar";
import { TutorCard } from "@/components/tutor-card";
import { HeroSearch } from "@/components/home/hero-search";
import { getFeaturedTutors } from "@/lib/data/tutors";
import { testimonials, platformStats } from "@/lib/data/testimonials";
import { subjects } from "@/lib/data/subjects";
import { faqs } from "@/lib/data/faqs";

const steps = [
  {
    title: "Tell us what you need",
    description:
      "Answer a short questionnaire about your child's target school, current level, budget and availability.",
  },
  {
    title: "Get matched instantly",
    description:
      "Our algorithm returns your best 3–5 vetted tutor matches, ranked by genuine fit — not just proximity.",
  },
  {
    title: "Meet for free",
    description:
      "Every match includes a free 15-minute consultation call before you commit to paid lessons.",
  },
  {
    title: "Book and track progress",
    description:
      "Pay securely, book recurring lessons, and follow your child's progress on a live dashboard.",
  },
];

const benefits = [
  {
    title: "Every tutor is vetted",
    description:
      "Enhanced DBS checks, verified qualifications and ID verification before anyone appears in search.",
  },
  {
    title: "Matched, not just searched",
    description:
      "Our matching algorithm weighs target school, learning needs and availability — not just star ratings.",
  },
  {
    title: "Transparent progress",
    description:
      "Parents get a live dashboard with lesson notes, homework and mock exam scores after every session.",
  },
  {
    title: "Secure by design",
    description:
      "Payments are held securely and released after each lesson, with full GDPR-compliant data protection.",
  },
];

export default function HomePage() {
  const featuredTutors = getFeaturedTutors();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(201,162,39,0.18),_transparent_55%)]" />
        <div className="container-page relative py-20 sm:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Badge tone="gold" className="mb-6">
                Buckinghamshire&apos;s trusted 11+ tutor network
              </Badge>
              <h1 className="font-serif-display text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
                Find a grammar school tutor your family can{" "}
                <span className="text-gold-400">actually trust.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100/80">
                GradeHub matches parents with DBS-checked, expert-vetted 11+ tutors across
                Buckinghamshire — with transparent pricing, verified reviews and a free
                consultation before you commit to anything.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/find-a-tutor" variant="gold" size="lg">
                  Find my tutor
                </Button>
                <Button href="/how-it-works" variant="outline-light" size="lg">
                  How it works
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-navy-100/70">
                <div className="flex items-center gap-2">
                  <StarRating rating={4.9} />
                  <span className="font-semibold text-white">4.9/5</span>
                  <span>from 600+ parents</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 20 20" className="size-5 text-emerald-400" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 1.5l6.5 2.6v5.1c0 4.4-2.8 8.3-6.5 9.3-3.7-1-6.5-4.9-6.5-9.3V4.1L10 1.5zm3.4 6.1a.75.75 0 00-1.1-1L9 10 7.7 8.6a.75.75 0 10-1.1 1l1.9 2a.75.75 0 001.1 0l3.8-3.9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Every tutor DBS-checked</span>
                </div>
              </div>
            </div>

            <div className="lg:pl-6">
              <HeroSearch />
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex -space-x-3">
                  {featuredTutors.slice(0, 3).map((t) => (
                    <Avatar
                      key={t.id}
                      initials={t.initials}
                      gradient={t.gradient}
                      size={36}
                      className="ring-2 ring-navy-950"
                    />
                  ))}
                </div>
                <p className="text-sm text-navy-100/80">
                  <span className="font-semibold text-white">250+ vetted tutors</span> ready to
                  help your child succeed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why GradeHub"
            title="Everything Tutorful and MyTutor should have been"
            description="We built GradeHub because Buckinghamshire parents deserve a faster, safer, more transparent way to find 11+ support."
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft"
              >
                <h3 className="font-serif-display text-lg font-medium text-navy-900">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Simple by design"
            title="From search to booked lesson in minutes"
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <span className="font-serif-display text-4xl font-medium text-gold-500/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif-display text-lg font-medium text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/how-it-works" variant="outline">
              See the full journey
            </Button>
          </div>
        </div>
      </section>

      {/* Featured tutors */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Meet our tutors"
              title="A small selection of our vetted tutors"
              className="max-w-xl"
            />
            <Button href="/find-a-tutor" variant="outline">
              Browse all tutors
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-900 py-16 text-white">
        <div className="container-page grid grid-cols-2 gap-8 lg:grid-cols-4">
          {platformStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif-display text-3xl font-medium text-gold-400 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-navy-100/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Subjects"
            title="Support across the entire academic journey"
            description="Starting with 11+ preparation in Buckinghamshire, expanding into GCSE, A-Level and SEN support."
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/subjects/${subject.slug}`}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-navy-900/8 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                    {subject.category}
                  </p>
                  <h3 className="mt-1 font-medium text-navy-900">{subject.name}</h3>
                  <p className="mt-1 text-sm text-navy-700/70">{subject.description}</p>
                </div>
                <span className="mt-1 text-navy-400 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Grammar school info */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Grammar School Guide"
              title="Understand the 11+ before you commit to a tutor"
              description="Buckinghamshire uses the CSSE test, distinct from the GL and CEM formats used elsewhere. Our free guide breaks down deadlines, test structure and how to choose a target school."
            />
            <Button href="/grammar-school-guide" variant="primary" className="mt-8">
              Read the Grammar School Guide
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Registration deadline", value: "Early July" },
              { label: "Exam sits", value: "Second week of September" },
              { label: "Results released", value: "Mid-October" },
              { label: "Test format", value: "CSSE (Bucks-specific)" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-navy-900/8 bg-white p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                  {item.label}
                </p>
                <p className="mt-2 font-serif-display text-lg font-medium text-navy-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Real families, real results"
            title="What parents and tutors say"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-7 shadow-soft"
              >
                <StarRating rating={t.rating} />
                <p className="mt-4 text-base leading-relaxed text-navy-800">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-medium text-navy-900">
                  {t.name} <span className="font-normal text-navy-700/70">— {t.context}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="FAQ" title="Common questions" align="center" className="mx-auto" />
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-navy-900/8 rounded-[var(--radius-card)] border border-navy-900/8 bg-white shadow-soft">
            {faqs.slice(0, 5).map((faq) => (
              <details key={faq.question} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-navy-900">
                  {faq.question}
                  <span className="ml-4 text-navy-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-navy-700/80">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/faq" variant="outline">
              View all FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 py-20 text-center text-white sm:py-24">
        <div className="container-page">
          <h2 className="mx-auto max-w-2xl font-serif-display text-3xl font-medium sm:text-4xl">
            Give your child the best possible start on their 11+ journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-100/80">
            Get matched with a vetted tutor in minutes — free consultation, no obligation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/find-a-tutor" variant="gold" size="lg">
              Find my tutor
            </Button>
            <Button href="/become-a-tutor" variant="outline-light" size="lg">
              Become a tutor
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
