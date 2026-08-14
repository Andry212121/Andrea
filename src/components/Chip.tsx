interface ChipProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export default function Chip({ label, emoji, selected, onClick, size = 'md' }: ChipProps) {
  const padding = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${padding} rounded-full font-semibold border transition-all whitespace-nowrap ${
        selected
          ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
          : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'
      }`}
    >
      {emoji && <span className="mr-1">{emoji}</span>}
      {label}
    </button>
  );
}
