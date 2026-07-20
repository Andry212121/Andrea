import { PageHero } from "@/components/page-hero";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={`Last updated ${updated}`} title={title} description={intro} />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-serif-display text-xl font-medium text-navy-900">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-navy-700/90">
                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
