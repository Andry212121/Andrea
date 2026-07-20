import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { TutorCard } from "@/components/tutor-card";
import { Button } from "@/components/ui/button";
import { locations } from "@/lib/data/locations";
import { tutors } from "@/lib/data/tutors";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return {};
  return {
    title: location.heading,
    description: location.intro,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();

  const matchingTutors = tutors.filter((t) =>
    location.town === "Online" ? t.mode !== "In-person" : t.location.includes(location.town)
  );

  return (
    <>
      <PageHero
        eyebrow={`${location.tutorCountEstimate} vetted tutors`}
        title={location.heading}
        description={location.intro}
      />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap gap-2">
            {location.schools.map((school) => (
              <span key={school} className="rounded-full bg-navy-50 px-4 py-2 text-sm font-medium text-navy-700">
                {school}
              </span>
            ))}
          </div>
          {matchingTutors.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchingTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <p className="text-navy-700/80">
              We&apos;re actively onboarding tutors in {location.town}. Browse all tutors below in
              the meantime.
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
