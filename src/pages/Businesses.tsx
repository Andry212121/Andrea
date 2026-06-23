import { useState } from 'react';
import type { Business } from '../types';

const EMOJIS = ['🛍️', '🍪', '🌸', '🎨', '🐶', '🚗', '📚', '🎵', '🌱', '⭐', '🧁', '🎯'];
const COLORS = [
  'bg-yellow-100', 'bg-pink-100', 'bg-purple-100', 'bg-blue-100',
  'bg-green-100', 'bg-orange-100', 'bg-red-100', 'bg-indigo-100',
];

interface BusinessesProps {
  businesses: Business[];
  addBusiness: (b: Omit<Business, 'id' | 'createdAt' | 'totalEarned'>) => void;
  deleteBusiness: (id: string) => void;
}

export default function Businesses({ businesses, addBusiness, deleteBusiness }: BusinessesProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('🛍️');
  const [color, setColor] = useState('bg-yellow-100');

  const submit = () => {
    if (!name.trim()) return;
    addBusiness({ name: name.trim(), description: description.trim(), emoji, color });
    setName('');
    setDescription('');
    setEmoji('🛍️');
    setColor('bg-yellow-100');
    setShowForm(false);
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-black text-gray-800">My Businesses 🏪</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black px-4 py-2 rounded-2xl shadow transition-all hover:scale-105"
        >
          + New
        </button>
      </div>

      {/* New Business Form */}
      {showForm && (
        <div className="bg-white rounded-3xl p-5 mb-4 shadow-lg border-2 border-yellow-300">
          <h2 className="font-black text-gray-700 text-lg mb-4">🌟 New Business Idea</h2>

          <label className="block text-sm font-bold text-gray-600 mb-1">Business Name *</label>
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-3 focus:border-yellow-400 outline-none"
            placeholder="e.g. Cookie Stand, Dog Walking..."
          />

          <label className="block text-sm font-bold text-gray-600 mb-1">What do you sell/do?</label>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-3 focus:border-yellow-400 outline-none"
            placeholder="Describe your business..."
          />

          <label className="block text-sm font-bold text-gray-600 mb-2">Pick an emoji</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {EMOJIS.map(e => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className={`text-2xl p-1.5 rounded-xl transition-all ${emoji === e ? 'bg-yellow-200 scale-125' : 'hover:bg-gray-100'}`}
              >
                {e}
              </button>
            ))}
          </div>

          <label className="block text-sm font-bold text-gray-600 mb-2">Pick a color</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full ${c} border-2 transition-all ${color === c ? 'border-gray-600 scale-125' : 'border-transparent'}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-2 rounded-xl border-2 border-gray-200 font-bold text-gray-500 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={!name.trim()}
              className="flex-1 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 font-black text-yellow-900 disabled:opacity-40 transition-all"
            >
              Create! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Business List */}
      {businesses.length === 0 && !showForm ? (
        <div className="text-center py-12">
          <span className="text-6xl">🏪</span>
          <p className="text-gray-500 mt-3 font-semibold">No businesses yet!</p>
          <p className="text-gray-400 text-sm">Tap "+ New" to create your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {businesses.map(b => (
            <div key={b.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${b.color}`}>
                  {b.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-gray-800 text-lg">{b.name}</h3>
                  <p className="text-gray-500 text-sm">{b.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Since {new Date(b.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-black ${b.totalEarned >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${b.totalEarned.toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${b.name}"?`)) deleteBusiness(b.id);
                    }}
                    className="text-xs text-red-400 hover:text-red-600 mt-1"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
