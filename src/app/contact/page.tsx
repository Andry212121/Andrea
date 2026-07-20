import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the GradeHub team — parents, tutors, schools and press all welcome.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="We're here to help" description="Whether you're a parent, tutor, school or journalist — send us a message and we'll get back to you within one business day." />
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-8 shadow-soft">
            <ContactForm />
          </div>
          <div className="space-y-6">
            <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-navy-50 p-6">
              <h3 className="font-medium text-navy-900">Email</h3>
              <p className="mt-1 text-sm text-navy-700/80">hello@gradehub.co.uk</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-navy-50 p-6">
              <h3 className="font-medium text-navy-900">Safeguarding concerns</h3>
              <p className="mt-1 text-sm text-navy-700/80">safeguarding@gradehub.co.uk</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-navy-50 p-6">
              <h3 className="font-medium text-navy-900">Based in</h3>
              <p className="mt-1 text-sm text-navy-700/80">Buckinghamshire, United Kingdom</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
