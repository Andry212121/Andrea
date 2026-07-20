import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  size = "sm",
  className,
}: {
  rating: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const stars = [0, 1, 2, 3, 4];
  const dimension = size === "sm" ? "size-3.5" : "size-4.5";

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rated ${rating} out of 5`}>
      {stars.map((i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1);
        return (
          <span key={i} className={cn("relative inline-block", dimension)}>
            <svg viewBox="0 0 20 20" className={cn("absolute inset-0", dimension, "text-navy-100")} fill="currentColor">
              <path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.8L10 14.7l-5.3 2.8 1.1-5.8L1.5 7.6l5.9-.7L10 1.5z" />
            </svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 20 20" className={cn(dimension, "text-gold-500")} fill="currentColor">
                <path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.8L10 14.7l-5.3 2.8 1.1-5.8L1.5 7.6l5.9-.7L10 1.5z" />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}
