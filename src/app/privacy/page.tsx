import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GradeHub collects, uses and protects your personal data, in line with UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="20 July 2026"
      intro={
        'GradeHub Ltd ("GradeHub", "we", "us") is committed to protecting your privacy. This policy explains what data we collect, why, and how we keep it safe, in line with UK GDPR and the Data Protection Act 2018.'
      }
      sections={[
        {
          heading: "1. Data we collect",
          body: [
            "We collect information you provide directly, including account details, child's year group and learning needs (provided voluntarily by parents), tutor qualifications and DBS information, messages sent through the platform, and payment information processed by Stripe.",
            "We also collect usage data such as pages visited, device and browser information, and approximate location, used to improve the product and for analytics via PostHog and Microsoft Clarity.",
          ],
        },
        {
          heading: "2. How we use your data",
          body: [
            "To provide the matching and booking service, process payments, verify tutor identity and safeguarding documents, communicate with you about your account or bookings, and improve our platform through aggregated, anonymised analytics.",
          ],
        },
        {
          heading: "3. Legal basis for processing",
          body: [
            "We process personal data under the legal bases of contract (to provide our services), legitimate interest (platform safety and improvement), consent (marketing communications), and legal obligation (safeguarding and financial record-keeping).",
          ],
        },
        {
          heading: "4. Children's data",
          body: [
            "GradeHub is a platform for parents and tutors; children do not create their own accounts. Information about a child (such as year group and learning needs) is provided by a parent or guardian and used solely to support tutor matching and lesson delivery.",
          ],
        },
        {
          heading: "5. Data sharing",
          body: [
            "We share data with the minimum necessary third parties to operate the platform: Stripe (payments), Supabase (database hosting), Resend (transactional email), Google (calendar and video integrations), and analytics providers. We never sell personal data.",
          ],
        },
        {
          heading: "6. Data retention",
          body: [
            "We retain account and booking data for as long as your account is active, and for a limited period afterward as required for legal, tax and safeguarding record-keeping obligations.",
          ],
        },
        {
          heading: "7. Your rights",
          body: [
            "Under UK GDPR you have the right to access, correct, delete, or export your personal data, and to object to or restrict certain processing. Contact privacy@gradehub.co.uk to exercise these rights.",
          ],
        },
        {
          heading: "8. Contact",
          body: ["Questions about this policy can be directed to privacy@gradehub.co.uk."],
        },
      ]}
    />
  );
}
