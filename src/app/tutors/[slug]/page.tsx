import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { BookingForm } from "@/components/find-tutor/booking-form";
import { FavouriteButton } from "@/components/find-tutor/favourite-button";
import { getTutorBySlug, tutors } from "@/lib/data/tutors";
import { subjects } from "@/lib/data/subjects";

export function generateStaticParams() {
  return tutors.map((tutor) => ({ slug: tutor.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutor = getTutorBySlug(slug);
  if (!tutor) return {};
  return {
    title: `${tutor.name} — ${tutor.tagline}`,
    description: tutor.bio,
  };
}

export default async function TutorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutor = getTutorBySlug(slug);
  if (!tutor) notFound();

  const tutorSubjects = subjects.filter((s) => tutor.subjectSlugs.includes(s.slug));

  return (
    <div className="bg-navy-50/40">
      <section className="border-b border-navy-900/8 bg-white">
        <div className="container-page py-10 sm:py-14">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <Avatar initials={tutor.initials} gradient={tutor.gradient} size={96} />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif-display text-3xl font-medium text-navy-900">
                    {tutor.name}
                  </h1>
                  {tutor.dbsVerified && <Badge tone="green">DBS Verified</Badge>}
                  {tutor.idVerified && <Badge tone="neutral">ID Verified</Badge>}
                </div>
                <p className="mt-2 max-w-xl text-navy-700/80">{tutor.tagline}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-navy-700/80">
                  <span className="flex items-center gap-1.5">
                    <StarRating rating={tutor.rating} />
                    <span className="font-semibold text-navy-900">{tutor.rating.toFixed(2)}</span>
                    <span>({tutor.reviewCount} reviews)</span>
                  </span>
                  <span>{tutor.location}</span>
                  <span>{tutor.mode}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <div className="text-right">
                <span className="font-serif-display text-2xl font-medium text-navy-900">
                  £{tutor.hourlyRate}
                </span>
                <span className="text-sm text-navy-700/70">/hour</span>
              </div>
              <FavouriteButton />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_360px] sm:py-16">
        <div className="space-y-10">
          <div className="aspect-video overflow-hidden rounded-[var(--radius-card)] border border-navy-900/8 bg-gradient-to-br from-navy-900 to-navy-700 text-white shadow-soft">
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <span className="flex size-14 items-center justify-center rounded-full bg-white/15">
                <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <p className="text-sm text-navy-100/80">Video introduction from {tutor.name.split(" ")[0]}</p>
            </div>
          </div>

          <div>
            <h2 className="font-serif-display text-xl font-medium text-navy-900">About</h2>
            <p className="mt-3 leading-relaxed text-navy-700/90">{tutor.bio}</p>
          </div>

          <div>
            <h2 className="font-serif-display text-xl font-medium text-navy-900">Subjects</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {tutorSubjects.map((s) => (
                <Link key={s.slug} href={`/subjects/${s.slug}`}>
                  <Badge tone="navy">{s.name}</Badge>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif-display text-xl font-medium text-navy-900">Qualifications</h2>
            <ul className="mt-3 space-y-2">
              {tutor.qualifications.map((q) => (
                <li key={q} className="flex items-start gap-2 text-sm text-navy-700/90">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gold-500" />
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
              <h3 className="font-medium text-navy-900">At a glance</h3>
              <dl className="mt-3 space-y-2 text-sm text-navy-700/90">
                <div className="flex justify-between">
                  <dt>Experience</dt>
                  <dd className="font-medium">{tutor.yearsExperience} years</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Lessons completed</dt>
                  <dd className="font-medium">{tutor.lessonsCompleted.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Response time</dt>
                  <dd className="font-medium">{tutor.responseTime}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Languages</dt>
                  <dd className="font-medium">{tutor.languages.join(", ")}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft">
              <h3 className="font-medium text-navy-900">Availability</h3>
              <ul className="mt-3 space-y-2 text-sm text-navy-700/90">
                {tutor.availability.map((slot) => (
                  <li key={slot} className="rounded-lg bg-navy-50 px-3 py-2">
                    {slot}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft-lg lg:sticky lg:top-24">
          <h2 className="font-serif-display text-lg font-medium text-navy-900">
            Book a free consultation
          </h2>
          <p className="mt-1 text-sm text-navy-700/70">
            No payment required — meet {tutor.name.split(" ")[0]} before booking paid lessons.
          </p>
          <div className="mt-5">
            <BookingForm tutorName={tutor.name} />
          </div>
        </aside>
      </section>
    </div>
  );
}
