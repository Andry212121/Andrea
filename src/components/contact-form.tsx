"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="font-serif-display text-lg font-medium text-emerald-800">Message sent</p>
        <p className="mt-2 text-sm text-emerald-700">
          Thanks for reaching out — our team typically replies within one business day.
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
          <span className="font-medium text-navy-900">Name</span>
          <input required type="text" className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
        </label>
        <label className="text-sm">
          <span className="font-medium text-navy-900">Email</span>
          <input required type="email" className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-navy-900">I am a...</span>
        <select className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm">
          <option>Parent</option>
          <option>Tutor</option>
          <option>School / Partner</option>
          <option>Journalist / Press</option>
          <option>Other</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="font-medium text-navy-900">Message</span>
        <textarea required rows={5} className="mt-1.5 w-full rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
      </label>
      <Button type="submit" className="w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
}
