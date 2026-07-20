import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for parents and tutors on GradeHub. No hidden fees, free consultations, and simple commission-based tutor payouts.",
};

const parentPlans = [
  {
    name: "Pay as you go",
    price: "No membership fee",
    description: "Pay only for the lessons you book. Tutor rates typically range £25–£85/hour.",
    features: [
      "Free tutor matching questionnaire",
      "Free 15-minute consultation with every match",
      "Secure Stripe payments",
      "Standard progress dashboard",
    ],
    cta: "Find a tutor",
    href: "/find-a-tutor",
  },
  {
    name: "GradeHub Premium",
    price: "£12/month",
    description: "For families who want more support alongside their lessons.",
    features: [
      "Everything in Pay as you go",
      "Priority tutor matching",
      "Grammar School Readiness Score",
      "Mock exam discounts",
      "Priority customer support",
    ],
    cta: "Start Premium",
    href: "/contact",
    highlighted: true,
  },
];

const tutorFees = [
  { tier: "0–£2,000 lifetime earnings", fee: "20%" },
  { tier: "£2,000–£10,000 lifetime earnings", fee: "15%" },
  { tier: "£10,000+ lifetime earnings", fee: "10%" },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="No hidden fees for parents. Tutors keep the majority of what they earn, with our commission reducing the more they teach."
      />

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="For parents" title="Only pay for the lessons you book" align="center" className="mx-auto" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl">
            {parentPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[var(--radius-card)] border p-8 shadow-soft ${
                  plan.highlighted ? "border-gold-400 bg-navy-950 text-white" : "border-navy-900/8 bg-white"
                }`}
              >
                {plan.highlighted && <Badge tone="gold" className="mb-4">Most popular</Badge>}
                <h3 className="font-serif-display text-xl font-medium">{plan.name}</h3>
                <p className={`mt-1 text-2xl font-serif-display font-medium ${plan.highlighted ? "text-gold-400" : "text-navy-900"}`}>
                  {plan.price}
                </p>
                <p className={`mt-3 text-sm ${plan.highlighted ? "text-navy-100/80" : "text-navy-700/80"}`}>{plan.description}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 ${plan.highlighted ? "text-navy-100/90" : "text-navy-700/90"}`}>
                      <span className={plan.highlighted ? "text-gold-400" : "text-gold-600"}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  href={plan.href}
                  variant={plan.highlighted ? "gold" : "primary"}
                  className="mt-8 w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="For tutors" title="A commission structure that rewards loyalty" align="center" className="mx-auto" />
          <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-[var(--radius-card)] border border-navy-900/8 bg-white shadow-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-900/8 bg-navy-50 text-left">
                  <th className="px-6 py-4 font-medium text-navy-900">Lifetime earnings tier</th>
                  <th className="px-6 py-4 font-medium text-navy-900">GradeHub fee</th>
                </tr>
              </thead>
              <tbody>
                {tutorFees.map((row) => (
                  <tr key={row.tier} className="border-b border-navy-900/8 last:border-0">
                    <td className="px-6 py-4 text-navy-700/90">{row.tier}</td>
                    <td className="px-6 py-4 font-medium text-navy-900">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-navy-700/70">
            No monthly subscription required. Optional Featured Tutor listings and a Verified Pro
            badge are available for tutors who want extra visibility.
          </p>
        </div>
      </section>
    </>
  );
}
