import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/site-chrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const siteUrl = "https://www.gradehub.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GradeHub | Trusted 11+ & Grammar School Tutors in Buckinghamshire",
    template: "%s | GradeHub",
  },
  description:
    "GradeHub connects Buckinghamshire parents with DBS-checked, expert-vetted 11+ and grammar school tutors. Book a free consultation and find the right tutor in minutes.",
  keywords: [
    "11+ tutor",
    "grammar school tutor",
    "Buckinghamshire tutor",
    "11 plus tuition",
    "Aylesbury tutor",
    "High Wycombe tutor",
    "verbal reasoning tutor",
    "non-verbal reasoning tutor",
  ],
  authors: [{ name: "GradeHub" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "GradeHub",
    title: "GradeHub | Trusted 11+ & Grammar School Tutors",
    description:
      "Find DBS-checked, expert-vetted 11+ and grammar school tutors in Buckinghamshire. Free consultation, secure payments, real results.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GradeHub | Trusted 11+ & Grammar School Tutors",
    description:
      "Find DBS-checked, expert-vetted 11+ and grammar school tutors in Buckinghamshire.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy-900">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
