"use client";

import { useMemo, useState } from "react";
import { TutorCard } from "@/components/tutor-card";
import type { Tutor } from "@/lib/data/tutors";
import type { Subject } from "@/lib/data/subjects";
import type { LocationPage } from "@/lib/data/locations";
import { cn } from "@/lib/utils";

export function TutorSearch({
  tutors,
  subjects,
  locations,
  initialSubject,
  initialLocation,
}: {
  tutors: Tutor[];
  subjects: Subject[];
  locations: LocationPage[];
  initialSubject?: string;
  initialLocation?: string;
}) {
  const [subject, setSubject] = useState(initialSubject ?? "all");
  const [location, setLocation] = useState(initialLocation ?? "all");
  const [mode, setMode] = useState<"all" | "Online" | "In-person">("all");
  const [maxPrice, setMaxPrice] = useState(100);

  const results = useMemo(() => {
    return tutors.filter((tutor) => {
      if (subject !== "all" && !tutor.subjectSlugs.includes(subject)) return false;
      if (location !== "all") {
        const town = locations.find((l) => l.slug === location)?.town;
        if (town && town !== "Online" && !tutor.location.includes(town)) return false;
        if (town === "Online" && tutor.mode === "In-person") return false;
      }
      if (mode !== "all" && !tutor.mode.includes(mode)) return false;
      if (tutor.hourlyRate > maxPrice) return false;
      return true;
    });
  }, [tutors, subject, location, mode, maxPrice, locations]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft lg:sticky lg:top-24">
        <h2 className="font-serif-display text-lg font-medium text-navy-900">Filters</h2>

        <div className="mt-6">
          <label className="text-sm font-medium text-navy-900">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-2 w-full rounded-lg border border-navy-900/10 bg-navy-50 px-3 py-2 text-sm"
          >
            <option value="all">All subjects</option>
            {subjects.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-navy-900">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-2 w-full rounded-lg border border-navy-900/10 bg-navy-50 px-3 py-2 text-sm"
          >
            <option value="all">All locations</option>
            {locations.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.town}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <span className="text-sm font-medium text-navy-900">Lesson type</span>
          <div className="mt-2 flex gap-2">
            {(["all", "Online", "In-person"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  mode === m
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/15 text-navy-700 hover:bg-navy-50"
                )}
              >
                {m === "all" ? "Any" : m}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <label className="flex items-center justify-between text-sm font-medium text-navy-900">
            Max hourly rate <span className="text-navy-500">£{maxPrice}</span>
          </label>
          <input
            type="range"
            min={20}
            max={100}
            step={5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-2 w-full accent-gold-500"
          />
        </div>
      </aside>

      <div>
        <p className="mb-4 text-sm text-navy-700/70">{results.length} tutors found</p>
        {results.length === 0 ? (
          <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-navy-50 p-10 text-center">
            <p className="font-medium text-navy-900">No tutors match those filters yet</p>
            <p className="mt-2 text-sm text-navy-700/70">
              Try widening your budget or lesson type — we&apos;re adding new tutors every week.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
