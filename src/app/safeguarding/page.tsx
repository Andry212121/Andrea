import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Safeguarding",
  description: "GradeHub's safeguarding policy: how we vet tutors and keep children safe on and off the platform.",
};

export default function SafeguardingPage() {
  return (
    <LegalPage
      title="Safeguarding Policy"
      updated="20 July 2026"
      intro="The safety of every child using GradeHub is our highest priority. This policy sets out how we vet tutors, protect children, and respond to concerns."
      sections={[
        {
          heading: "1. Tutor vetting standards",
          body: [
            "Every tutor must hold a valid Enhanced DBS certificate, checked against the DBS Update Service where applicable, before being approved to appear in search or matching results.",
            "Tutors must provide verified photo ID and evidence of relevant qualifications or teaching experience. Our admin team manually reviews every application before approval — no tutor is auto-approved.",
          ],
        },
        {
          heading: "2. Ongoing monitoring",
          body: [
            "We periodically re-verify DBS status and monitor tutor reviews for safeguarding red flags. Any report of concerning conduct triggers an immediate review and, where necessary, suspension pending investigation.",
          ],
        },
        {
          heading: "3. Safe online lessons",
          body: [
            "Online lessons take place through our integrated, recorded-optional video system. We recommend a parent or guardian is reachable in the home during lessons for younger children, and that lessons take place in a shared family space rather than a bedroom.",
          ],
        },
        {
          heading: "4. Safe in-person lessons",
          body: [
            "We recommend first in-person lessons take place in a public setting (such as a library) or with a parent present, and encourage parents to meet a tutor via the free video consultation before any in-person session.",
          ],
        },
        {
          heading: "5. Reporting a concern",
          body: [
            "If you have any safeguarding concern about a tutor, parent, or interaction on GradeHub, contact safeguarding@gradehub.co.uk immediately. Concerns are reviewed by our safeguarding lead within 24 hours, and where appropriate, escalated to local authority children's services or the police.",
          ],
        },
        {
          heading: "6. Data protection for children",
          body: [
            "Information about a child is provided by their parent or guardian and is only used to support tutor matching and lesson delivery. See our Privacy Policy for full details.",
          ],
        },
      ]}
    />
  );
}
