interface RecipeMediaProps {
  emoji: string;
  gradient: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'text-3xl rounded-xl',
  md: 'text-5xl rounded-2xl',
  lg: 'text-7xl rounded-3xl',
};

export default function RecipeMedia({ emoji, gradient, size = 'md', className = '' }: RecipeMediaProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 ${SIZE_CLASSES[size]} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_55%)]" />
      <span className="relative drop-shadow-sm">{emoji}</span>
    </div>
  );
}
