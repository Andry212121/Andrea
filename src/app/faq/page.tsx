import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { faqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about GradeHub, from matching and safeguarding to payments and cancellations.",
};

const categories = ["General", "Parents", "Tutors", "Safeguarding", "Payments"] as const;

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" description="Can't find what you're looking for? Get in touch with our team." />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl space-y-12">
          {categories.map((category) => {
            const items = faqs.filter((f) => f.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="font-serif-display text-xl font-medium text-navy-900">{category}</h2>
                <div className="mt-4 divide-y divide-navy-900/8 rounded-[var(--radius-card)] border border-navy-900/8 bg-white shadow-soft">
                  {items.map((faq) => (
                    <details key={faq.question} className="group p-6">
                      <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-navy-900">
                        {faq.question}
                        <span className="ml-4 text-navy-400 transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-navy-700/80">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
