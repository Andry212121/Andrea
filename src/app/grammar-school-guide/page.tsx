import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Grammar School Guide",
  description:
    "A free guide to the Buckinghamshire 11+ exam: test format, key dates, choosing a target school, and how to prepare.",
};

const timeline = [
  { date: "Year 4 – Year 5", event: "Ideal window to begin structured 11+ preparation" },
  { date: "Early July (Year 6)", event: "Registration deadline for the Buckinghamshire Transfer Test" },
  { date: "September (Year 6)", event: "CSSE test sits, typically over two mornings" },
  { date: "Mid-October", event: "Results released to parents" },
  { date: "Late October – November", event: "Grammar school applications and CAF submitted via local authority" },
  { date: "March (Year 6)", event: "National Offer Day" },
];

const testFormat = [
  { title: "English", description: "Comprehension and creative writing, assessing reading and written expression." },
  { title: "Maths", description: "Arithmetic and reasoning-based problem solving aligned to the national curriculum." },
  { title: "Verbal Reasoning", description: "Word-based logic, code-breaking and vocabulary-driven puzzles." },
  { title: "Non-Verbal Reasoning", description: "Pattern, sequence and spatial reasoning using shapes and diagrams." },
];

const faqs = [
  {
    q: "Is the Buckinghamshire test the same as GL or CEM?",
    a: "No — Buckinghamshire schools use the CSSE (Consortium of Selective Schools in Essex-style) test, which has its own format distinct from the GL Assessment and CEM papers used in other counties.",
  },
  {
    q: "Do all children sit the same test?",
    a: "Yes, all Buckinghamshire children applying for grammar school places sit the same Secondary Transfer Test regardless of which school they hope to attend.",
  },
  {
    q: "What score is needed to pass?",
    a: "There's no fixed 'pass mark' — children are ranked, and the qualifying standard is set each year based on overall performance. A tutor experienced with the CSSE format can help you understand realistic targets.",
  },
];

export default function GrammarSchoolGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Free guide"
        title="The parent's guide to the Buckinghamshire 11+"
        description="Everything you need to know about the exam format, key dates and how to prepare — written for parents, not educators."
      />

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Key dates" title="The 11+ timeline, year by year" />
          <div className="mt-10 space-y-4">
            {timeline.map((item) => (
              <div key={item.date} className="flex flex-col gap-1 rounded-2xl border border-navy-900/8 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:gap-6">
                <span className="w-48 shrink-0 font-serif-display font-medium text-navy-900">{item.date}</span>
                <span className="text-navy-700/90">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Test format" title="What the CSSE test actually covers" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {testFormat.map((f) => (
              <div key={f.title} className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
                <h3 className="font-serif-display text-lg font-medium text-navy-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Common questions" title="What parents ask us most" />
          <div className="mt-10 divide-y divide-navy-900/8 rounded-[var(--radius-card)] border border-navy-900/8 bg-white shadow-soft">
            {faqs.map((f) => (
              <div key={f.q} className="p-6">
                <h3 className="font-medium text-navy-900">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-16 text-center text-white">
        <div className="container-page">
          <h2 className="mx-auto max-w-xl font-serif-display text-2xl font-medium sm:text-3xl">
            Ready to start preparing with an expert tutor?
          </h2>
          <Button href="/find-a-tutor" variant="gold" size="lg" className="mt-6">
            Find my tutor
          </Button>
        </div>
      </section>
    </>
  );
}
