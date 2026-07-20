import { cn } from "@/lib/utils";

type BadgeTone = "navy" | "gold" | "green" | "neutral";

const tones: Record<BadgeTone, string> = {
  navy: "bg-navy-900 text-white",
  gold: "bg-gold-100 text-gold-600",
  green: "bg-emerald-50 text-emerald-700",
  neutral: "bg-navy-50 text-navy-700",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
