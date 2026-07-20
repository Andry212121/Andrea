import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the GradeHub platform for parents and tutors.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="20 July 2026"
      intro="These terms govern your use of the GradeHub platform. By creating an account or booking a lesson, you agree to the terms below."
      sections={[
        {
          heading: "1. The service",
          body: [
            "GradeHub is a marketplace connecting parents seeking tutoring services with independent tutors. GradeHub facilitates matching, booking, messaging and payment, but tutors are independent contractors, not GradeHub employees.",
          ],
        },
        {
          heading: "2. Accounts",
          body: [
            "You must provide accurate information when creating an account and keep your login credentials secure. Parent accounts must be held by an adult with parental responsibility for any child receiving tutoring.",
          ],
        },
        {
          heading: "3. Tutor vetting",
          body: [
            "All tutors must pass GradeHub's verification process, including an Enhanced DBS check, ID verification and qualification review, before being listed. GradeHub relies on documentation provided by tutors and third-party checking services, and encourages parents to exercise their own judgement.",
          ],
        },
        {
          heading: "4. Bookings and payments",
          body: [
            "Lessons are booked and paid for through the platform via Stripe. Funds are held until 24 hours after a lesson is marked complete. Cancellations made less than 24 hours before a lesson may be charged in line with the tutor's cancellation policy.",
          ],
        },
        {
          heading: "5. Fees",
          body: [
            "GradeHub charges tutors a service fee on completed bookings as set out on our Pricing page. Parents are not charged a booking fee beyond the tutor's advertised hourly rate, except for optional Premium membership.",
          ],
        },
        {
          heading: "6. Conduct and safeguarding",
          body: [
            "All users must comply with GradeHub's Safeguarding Policy. GradeHub reserves the right to suspend or terminate accounts that breach these terms, engage in unsafe conduct, or attempt to circumvent the platform to avoid fees.",
          ],
        },
        {
          heading: "7. Liability",
          body: [
            "GradeHub facilitates the connection between parents and tutors but is not responsible for the quality of tuition delivered. We encourage parents to use the free consultation to assess fit before committing to paid lessons.",
          ],
        },
        {
          heading: "8. Changes to these terms",
          body: [
            "We may update these terms from time to time. Material changes will be communicated by email or in-platform notice ahead of taking effect.",
          ],
        },
      ]}
    />
  );
}
