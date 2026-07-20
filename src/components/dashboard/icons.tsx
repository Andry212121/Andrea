export function Icon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-full">
      <path d={path} />
    </svg>
  );
}

export const icons = {
  home: "M4 11.5L12 4l8 7.5M6 10v9h12v-9",
  calendar: "M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z",
  messages: "M4 5h16v11H8l-4 4V5z",
  payments: "M3 7h18v10H3zM3 10h18M7 15h3",
  students: "M12 4a4 4 0 100 8 4 4 0 000-8zM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6",
  reports: "M5 4h14v16H5zM8 9h8M8 13h8M8 17h5",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM4.6 10.4l-1.4-.2-.6 1.6 1.2.9a7 7 0 000 2.6l-1.2.9.6 1.6 1.4-.2c.5.7 1.1 1.3 1.8 1.8l-.2 1.4 1.6.6.9-1.2c.9.2 1.7.2 2.6 0l.9 1.2 1.6-.6-.2-1.4c.7-.5 1.3-1.1 1.8-1.8l1.4.2.6-1.6-1.2-.9a7 7 0 000-2.6l1.2-.9-.6-1.6-1.4.2a7 7 0 00-1.8-1.8l.2-1.4-1.6-.6-.9 1.2a7 7 0 00-2.6 0l-.9-1.2-1.6.6.2 1.4c-.7.5-1.3 1.1-1.8 1.8z",
  earnings: "M12 3v18M17 7a4 4 0 00-4-2h-1a3 3 0 000 6h2a3 3 0 010 6h-1a4 4 0 01-4-2",
  analytics: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  approvals: "M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7z",
  disputes: "M12 3l9 16H3zM12 9v4M12 16h.01",
  support: "M12 18a6 6 0 100-12 6 6 0 000 12zM12 6V3M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4M3 12h1M20 12h1",
  cms: "M4 4h16v4H4zM4 10h10v10H4zM16 10h4v10h-4z",
  bookings: "M4 5h16v15H4zM4 9h16M9 3v4M15 3v4",
  favourite: "M12 20.3l-1.5-1.4C5.4 14.6 2 11.5 2 7.7 2 4.6 4.4 2.3 7.4 2.3c1.7 0 3.4.8 4.6 2.2 1.2-1.4 2.9-2.2 4.6-2.2 3 0 5.4 2.3 5.4 5.4 0 3.8-3.4 6.9-8.5 11.2l-1.5 1.4z",
};
