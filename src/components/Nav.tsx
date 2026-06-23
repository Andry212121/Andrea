import type { Page } from '../types';

interface NavProps {
  current: Page;
  onNavigate: (p: Page) => void;
}

const items: { page: Page; label: string; emoji: string }[] = [
  { page: 'dashboard', label: 'Home', emoji: '🏠' },
  { page: 'businesses', label: 'Businesses', emoji: '🏪' },
  { page: 'money', label: 'Money', emoji: '💰' },
  { page: 'goals', label: 'Goals', emoji: '🎯' },
  { page: 'learn', label: 'Learn', emoji: '📚' },
];

export default function Nav({ current, onNavigate }: NavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-yellow-300 shadow-lg z-50">
      <div className="flex justify-around items-center py-2 max-w-lg mx-auto">
        {items.map(({ page, label, emoji }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              current === page
                ? 'bg-yellow-400 text-yellow-900 scale-110'
                : 'text-gray-500 hover:text-yellow-600'
            }`}
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-xs font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
