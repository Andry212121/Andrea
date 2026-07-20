"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { subjects } from "@/lib/data/subjects";
import { locations } from "@/lib/data/locations";

export function HeroSearch() {
  const router = useRouter();
  const [subject, setSubject] = useState("11-plus");
  const [location, setLocation] = useState("aylesbury");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/find-a-tutor?subject=${subject}&location=${location}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-soft-lg sm:flex-row sm:items-center"
    >
      <label className="flex-1">
        <span className="sr-only">Subject</span>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-xl border-0 bg-navy-50 px-4 py-3 text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
        >
          {subjects.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex-1">
        <span className="sr-only">Location</span>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-xl border-0 bg-navy-50 px-4 py-3 text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
        >
          {locations.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.town}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="rounded-xl bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
      >
        Find my tutor
      </button>
    </form>
  );
}
