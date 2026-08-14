import { DAYS, type Day } from '../types';

export function getMondayISO(date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

export function dayIndex(day: Day): number {
  return DAYS.indexOf(day);
}

export function dateForDay(weekStartISO: string, day: Day): Date {
  const d = new Date(weekStartISO);
  d.setDate(d.getDate() + dayIndex(day));
  return d;
}

export function formatShortDate(d: Date): string {
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

export function todayDay(): Day {
  const idx = new Date().getDay();
  return DAYS[idx === 0 ? 6 : idx - 1];
}

export function daysUntil(isoDate: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(isoDate);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / 86_400_000);
}
