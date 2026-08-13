import type { Page } from '../types';

interface NavProps {
  current: Page;
  onNavigate: (p: Page) => void;
  shoppingCount: number;
}

const items: { page: Page; label: string; emoji: string }[] = [
  { page: 'home', label: 'Home', emoji: '🏠' },
  { page: 'mealplan', label: 'Meal Plan', emoji: '📅' },
  { page: 'myfood', label: 'My Food', emoji: '🥫' },
  { page: 'packlunch', label: 'Pack Lunch', emoji: '🍱' },
  { page: 'shopping', label: 'Shopping', emoji: '🛒' },
];

export default function Nav({ current, onNavigate, shoppingCount }: NavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-emerald-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] z-40 safe-bottom">
      <div className="flex justify-around items-stretch max-w-lg mx-auto">
        {items.map(({ page, label, emoji }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`relative flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors ${
              current === page ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            <span className="relative text-xl">
              {emoji}
              {page === 'shopping' && shoppingCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[10px] leading-none font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {shoppingCount > 9 ? '9+' : shoppingCount}
                </span>
              )}
            </span>
            <span className="text-[11px] font-semibold">{label}</span>
            {current === page && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-emerald-500" />}
          </button>
        ))}
      </div>
    </nav>
  );
}
