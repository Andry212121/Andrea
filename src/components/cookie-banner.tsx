"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "gradehub-cookie-consent";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

function getServerSnapshot() {
  return true;
}

export function CookieBanner() {
  const consented = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "true");
    window.dispatchEvent(new Event("storage"));
  }

  if (consented) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-900/10 bg-white p-4 shadow-soft-lg">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-navy-700/90">
          We use essential and analytics cookies to improve GradeHub. See our{" "}
          <Link href="/cookie-policy" className="font-medium text-navy-900 underline">
            Cookie Policy
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-full bg-navy-900 px-5 py-2 text-sm font-medium text-white hover:bg-navy-800"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
