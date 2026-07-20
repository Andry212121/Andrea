import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How GradeHub uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="20 July 2026"
      intro="This policy explains how GradeHub uses cookies and similar technologies when you visit our website."
      sections={[
        {
          heading: "1. What are cookies?",
          body: [
            "Cookies are small text files stored on your device that help websites function and remember your preferences.",
          ],
        },
        {
          heading: "2. Cookies we use",
          body: [
            "Essential cookies: required for core functionality such as staying logged in and remembering booking progress. These cannot be disabled.",
            "Analytics cookies: PostHog and Microsoft Clarity help us understand how the site is used so we can improve it. These are only set with your consent.",
            "Preference cookies: remember settings such as your last search filters.",
          ],
        },
        {
          heading: "3. Managing cookies",
          body: [
            "You can manage or withdraw consent for non-essential cookies at any time through our cookie banner or your browser settings. Disabling essential cookies may affect site functionality.",
          ],
        },
        {
          heading: "4. Contact",
          body: ["Questions about our use of cookies can be directed to privacy@gradehub.co.uk."],
        },
      ]}
    />
  );
}
