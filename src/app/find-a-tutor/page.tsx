import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TutorSearch } from "@/components/find-tutor/tutor-search";
import { tutors } from "@/lib/data/tutors";
import { subjects } from "@/lib/data/subjects";
import { locations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Find a Tutor",
  description:
    "Search and filter DBS-checked, expert-vetted 11+ and grammar school tutors across Buckinghamshire by subject, location, price and lesson type.",
};

export default async function FindTutorPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; location?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Find a tutor"
        title="Browse our vetted 11+ and grammar school tutors"
        description="Every tutor is DBS-checked and profile-reviewed. Filter by subject, location, price and lesson type to find your best match."
      />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <TutorSearch
            tutors={tutors}
            subjects={subjects}
            locations={locations}
            initialSubject={params.subject}
            initialLocation={params.location}
          />
        </div>
      </section>
    </>
  );
}
