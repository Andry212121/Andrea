import { useState } from 'react';
import type { AppStore } from '../store';
import type { ShoppingCategory } from '../types';
import { SHOPPING_CATEGORY_ORDER } from '../utils/shoppingList';
import EmptyState from '../components/EmptyState';
import Chip from '../components/Chip';

interface ShoppingProps {
  store: AppStore;
}

const CATEGORY_EMOJI: Record<ShoppingCategory, string> = {
  'Fruit & vegetables': '🥕', 'Meat & fish': '🍗', Dairy: '🧀', Bakery: '🍞', Pantry: '🥫', Frozen: '🧊', Other: '🧺',
};

export default function Shopping({ store }: ShoppingProps) {
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState<ShoppingCategory>('Other');

  const checkedCount = store.shoppingItems.filter((i) => i.checked).length;
  const grouped = SHOPPING_CATEGORY_ORDER.map((cat) => ({
    cat,
    items: store.shoppingItems.filter((i) => i.category === cat),
  })).filter((g) => g.items.length > 0);

  const addItem = () => {
    if (!newItem.trim()) return;
    store.addManualShoppingItem(newItem.trim(), newCategory);
    setNewItem('');
  };

  return (
    <div className="pb-28">
      <div className="px-5 pt-8 pb-3">
        <h1 className="text-xl font-extrabold text-gray-900">Shopping List</h1>
        <p className="text-sm text-gray-500 mt-0.5">Only what's missing from your kitchen.</p>

        <button onClick={store.refreshShoppingList} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl mt-4">
          🔄 Update from meal plan
        </button>

        <div className="flex gap-2 mt-4">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add an item..."
            className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
          <button onClick={addItem} className="bg-emerald-600 text-white font-bold w-11 h-11 rounded-full shrink-0">+</button>
        </div>
        <div className="flex gap-1.5 mt-2 overflow-x-auto">
          {SHOPPING_CATEGORY_ORDER.map((c) => (
            <Chip key={c} size="sm" label={c} selected={newCategory === c} onClick={() => setNewCategory(c)} />
          ))}
        </div>
      </div>

      {store.shoppingItems.length === 0 ? (
        <EmptyState emoji="🛒" title="Your list is empty" subtitle="Plan some meals, then tap 'Update from meal plan' to pull in missing ingredients." />
      ) : (
        <div className="px-5 space-y-4 mt-2">
          {grouped.map(({ cat, items }) => (
            <div key={cat} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-2.5 bg-gray-50 font-bold text-sm text-gray-700 flex items-center gap-2">
                <span>{CATEGORY_EMOJI[cat]}</span> {cat}
              </div>
              <div className="divide-y divide-gray-50">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 px-4 py-2.5">
                    <button
                      onClick={() => store.toggleShoppingChecked(item.id)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                        item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'
                      }`}
                    >
                      {item.checked && '✓'}
                    </button>
                    <span className={`flex-1 text-sm ${item.checked ? 'line-through text-gray-350 text-gray-400' : 'text-gray-700 font-medium'}`}>
                      {item.name}
                    </span>
                    {item.quantity && <span className="text-xs text-gray-400">{item.quantity}</span>}
                    {item.source === 'auto' && <span className="text-[9px] font-bold text-emerald-500 uppercase">auto</span>}
                    <button onClick={() => store.removeShoppingItem(item.id)} className="text-gray-300 text-sm ml-1">✕</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {checkedCount > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-5 z-30">
          <div className="max-w-lg mx-auto">
            <button onClick={store.addCheckedToMyFood} className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-2xl shadow-lg">
              ✅ Add {checkedCount} checked item{checkedCount === 1 ? '' : 's'} to My Food
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
