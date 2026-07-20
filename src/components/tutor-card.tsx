import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import type { Tutor } from "@/lib/data/tutors";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <Link
      href={`/tutors/${tutor.slug}`}
      className="group flex flex-col rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="flex items-start gap-4">
        <Avatar initials={tutor.initials} gradient={tutor.gradient} size={64} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-serif-display text-lg font-medium text-navy-900">
              {tutor.name}
            </h3>
            {tutor.dbsVerified && (
              <span title="DBS Verified" className="text-emerald-600">
                <svg viewBox="0 0 20 20" className="size-4" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 1.5l6.5 2.6v5.1c0 4.4-2.8 8.3-6.5 9.3-3.7-1-6.5-4.9-6.5-9.3V4.1L10 1.5zm3.4 6.1a.75.75 0 00-1.1-1L9 10 7.7 8.6a.75.75 0 10-1.1 1l1.9 2a.75.75 0 001.1 0l3.8-3.9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-navy-700/80">{tutor.tagline}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tutor.levels.slice(0, 3).map((level) => (
          <Badge key={level} tone="neutral">
            {level}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-navy-700/80">
        <StarRating rating={tutor.rating} />
        <span className="font-medium text-navy-900">{tutor.rating.toFixed(2)}</span>
        <span>({tutor.reviewCount} reviews)</span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-navy-700/80">
        <div>
          <dt className="sr-only">Location</dt>
          <dd>{tutor.location}</dd>
        </div>
        <div>
          <dt className="sr-only">Mode</dt>
          <dd>{tutor.mode}</dd>
        </div>
        <div>
          <dt className="sr-only">Experience</dt>
          <dd>{tutor.yearsExperience} yrs experience</dd>
        </div>
        <div>
          <dt className="sr-only">Response time</dt>
          <dd>Responds {tutor.responseTime.toLowerCase()}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between border-t border-navy-900/8 pt-4">
        <div>
          <span className="font-serif-display text-xl font-medium text-navy-900">
            £{tutor.hourlyRate}
          </span>
          <span className="text-sm text-navy-700/70">/hour</span>
        </div>
        <span className="text-sm font-semibold text-navy-900 group-hover:text-gold-600">
          View profile →
        </span>
      </div>
    </Link>
  );
}
