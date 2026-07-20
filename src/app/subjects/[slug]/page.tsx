import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { TutorCard } from "@/components/tutor-card";
import { Button } from "@/components/ui/button";
import { subjects } from "@/lib/data/subjects";
import { tutors } from "@/lib/data/tutors";

export function generateStaticParams() {
  return subjects.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const subject = subjects.find((s) => s.slug === slug);
  if (!subject) return {};
  return {
    title: `${subject.name} Tutors in Buckinghamshire`,
    description: subject.description,
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = subjects.find((s) => s.slug === slug);
  if (!subject) notFound();

  const matchingTutors = tutors.filter((t) => t.subjectSlugs.includes(subject.slug));

  return (
    <>
      <PageHero
        eyebrow={subject.category}
        title={`${subject.name} Tutors`}
        description={subject.description}
      />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          {matchingTutors.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchingTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <p className="text-navy-700/80">
              We&apos;re actively onboarding {subject.name.toLowerCase()} specialists. Browse all
              tutors below in the meantime.
            </p>
          )}
          <div className="mt-10">
            <Button href="/find-a-tutor" variant="outline">
              Browse all tutors
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
