import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-navy-950 text-white", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(201,162,39,0.16),_transparent_55%)]" />
      <div className="container-page relative py-16 sm:py-20">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-serif-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100/80">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
