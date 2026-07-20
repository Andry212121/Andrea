import Link from "next/link";

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/how-it-works", label: "How it Works" },
      { href: "/find-a-tutor", label: "Find a Tutor" },
      { href: "/become-a-tutor", label: "Become a Tutor" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/grammar-school-guide", label: "Grammar School Guide" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/locations/online", label: "Online 11+ Tutors" },
    ],
  },
  {
    title: "Locations",
    links: [
      { href: "/locations/aylesbury", label: "11+ Tutor Aylesbury" },
      { href: "/locations/high-wycombe", label: "11+ Tutor High Wycombe" },
      { href: "/locations/milton-keynes", label: "11+ Tutor Milton Keynes" },
      { href: "/locations/buckingham", label: "11+ Tutor Buckingham" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/safeguarding", label: "Safeguarding" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-navy-100">
      <div className="container-page py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-gold-500 font-serif-display text-lg font-semibold text-navy-950">
                G
              </span>
              <span className="font-serif-display text-xl font-semibold text-white">
                GradeHub
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/70">
              The UK&apos;s most trusted grammar school tutoring marketplace. Vetted 11+ tutors,
              starting in Buckinghamshire.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-navy-100/60">
              <span className="rounded-full border border-white/15 px-3 py-1">DBS-checked tutors</span>
              <span className="rounded-full border border-white/15 px-3 py-1">GDPR compliant</span>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-100/70 transition-colors hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-navy-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GradeHub Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-gold-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-400">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-gold-400">
              Cookie Policy
            </Link>
            <Link href="/safeguarding" className="hover:text-gold-400">
              Safeguarding
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
