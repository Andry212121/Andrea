"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BookingForm({ tutorName }: { tutorName: string }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="font-serif-display text-lg font-medium text-emerald-800">Request sent!</p>
        <p className="mt-2 text-sm text-emerald-700">
          {tutorName} typically responds within a couple of hours. You&apos;ll get an email to
          confirm your free consultation time.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="font-medium text-navy-900">Parent name</span>
          <input
            required
            type="text"
            className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
            placeholder="Jane Smith"
          />
        </label>
        <label className="text-sm">
          <span className="font-medium text-navy-900">Email</span>
          <input
            required
            type="email"
            className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
            placeholder="jane@example.com"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-navy-900">Child&apos;s year group</span>
        <select className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm">
          <option>Year 3</option>
          <option>Year 4</option>
          <option>Year 5</option>
          <option>Year 6</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="font-medium text-navy-900">What would you like to cover?</span>
        <textarea
          rows={3}
          className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
          placeholder="e.g. Verbal Reasoning ahead of the Bucks CSSE test in September"
        />
      </label>
      <Button type="submit" variant="gold" className="w-full">
        Request a free consultation
      </Button>
      <p className="text-center text-xs text-navy-700/60">No payment required for this step.</p>
    </form>
  );
}
