export function Avatar({
  initials,
  gradient,
  size = 56,
  className,
}: {
  initials: string;
  gradient: [string, string];
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        color: "white",
        fontWeight: 600,
        fontSize: size * 0.36,
        letterSpacing: "0.02em",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}
