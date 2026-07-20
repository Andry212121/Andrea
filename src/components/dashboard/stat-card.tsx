export function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-5 shadow-soft">
      <p className="text-xs font-medium uppercase tracking-wide text-navy-700/60">{label}</p>
      <p className="mt-2 font-serif-display text-2xl font-medium text-navy-900">{value}</p>
      {trend ? <p className="mt-1 text-xs font-medium text-emerald-600">{trend}</p> : null}
    </div>
  );
}
