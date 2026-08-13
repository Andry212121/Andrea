import { useState, type ReactNode } from 'react';
import type { AppStore } from '../store';
import type { DietTag, Page } from '../types';
import Chip from '../components/Chip';
import Stepper from '../components/Stepper';
import { DIET_OPTIONS, COMMON_ALLERGIES, CUISINE_OPTIONS, MEAL_STYLE_OPTIONS } from '../data/options';

interface SettingsProps {
  store: AppStore;
  onNavigate: (p: Page) => void;
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export default function Settings({ store, onNavigate }: SettingsProps) {
  const { prefs, setPrefs } = store;
  const [customAllergy, setCustomAllergy] = useState('');
  const [customDislike, setCustomDislike] = useState('');

  const addChild = () => setPrefs({ children: [...prefs.children, { id: crypto.randomUUID(), age: 6 }] });
  const removeChild = (id: string) => setPrefs({ children: prefs.children.filter((c) => c.id !== id) });
  const setChildAge = (id: string, age: number) => setPrefs({ children: prefs.children.map((c) => (c.id === id ? { ...c, age } : c)) });

  const toggleDiet = (d: DietTag) => {
    if (d === 'no-restrictions') {
      setPrefs({ diets: prefs.diets.includes('no-restrictions') ? [] : ['no-restrictions'] });
    } else {
      setPrefs({ diets: toggle(prefs.diets.filter((x) => x !== 'no-restrictions'), d) });
    }
  };

  const addAllergy = () => {
    if (customAllergy.trim()) setPrefs({ allergies: [...prefs.allergies, customAllergy.trim()] });
    setCustomAllergy('');
  };
  const addDislike = () => {
    if (customDislike.trim()) setPrefs({ dislikes: [...prefs.dislikes, customDislike.trim()] });
    setCustomDislike('');
  };

  return (
    <div className="pb-28">
      <div className="px-5 pt-8 pb-3 flex items-center gap-3 sticky top-0 bg-[#f7faf5] z-10">
        <button onClick={() => onNavigate('home')} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-lg shrink-0">
          ←
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Preferences</h1>
          <p className="text-sm text-gray-500 mt-0.5">Changes save instantly and shape every suggestion.</p>
        </div>
      </div>

      <div className="px-5 space-y-5 mt-2">
        <Section title="Household" emoji="🏡">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-3">
            <Stepper label="Adults" value={prefs.adults} onChange={(v) => setPrefs({ adults: v })} min={1} max={10} />
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Children</span>
              <button onClick={addChild} className="text-sm font-bold text-emerald-600">+ Add child</button>
            </div>
            {prefs.children.length === 0 && <p className="text-xs text-gray-400">No children added.</p>}
            <div className="space-y-2">
              {prefs.children.map((c, i) => (
                <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                  <span className="text-sm text-gray-600">Child {i + 1}</span>
                  <div className="flex items-center gap-3">
                    <Stepper value={c.age} onChange={(v) => setChildAge(c.id, v)} min={0} max={18} label="age" />
                    <button onClick={() => removeChild(c.id)} className="text-gray-400 text-sm">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Typical serving size" emoji="🍴">
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <Stepper label="People per meal" value={prefs.defaultServings} onChange={(v) => setPrefs({ defaultServings: v })} min={1} max={12} />
          </div>
        </Section>

        <Section title="Dietary preferences" emoji="🥗">
          <div className="flex flex-wrap gap-2">
            {DIET_OPTIONS.map((d) => (
              <Chip key={d.id} label={d.label} emoji={d.emoji} selected={prefs.diets.includes(d.id)} onClick={() => toggleDiet(d.id)} />
            ))}
          </div>
        </Section>

        <Section title="Allergies" emoji="⚠️">
          <div className="flex flex-wrap gap-2 mb-3">
            {COMMON_ALLERGIES.map((a) => (
              <Chip key={a} label={a} selected={prefs.allergies.includes(a)} onClick={() => setPrefs({ allergies: toggle(prefs.allergies, a) })} />
            ))}
          </div>
          <CustomAdder placeholder="Add another allergy..." value={customAllergy} onChange={setCustomAllergy} onAdd={addAllergy} />
          {prefs.allergies.filter((a) => !COMMON_ALLERGIES.includes(a)).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {prefs.allergies.filter((a) => !COMMON_ALLERGIES.includes(a)).map((a) => (
                <Chip key={a} label={a} selected onClick={() => setPrefs({ allergies: toggle(prefs.allergies, a) })} />
              ))}
            </div>
          )}
        </Section>

        <Section title="Foods you'd rather avoid" emoji="🙅">
          <CustomAdder placeholder="e.g. mushrooms, olives..." value={customDislike} onChange={setCustomDislike} onAdd={addDislike} />
          <div className="flex flex-wrap gap-2 mt-3">
            {prefs.dislikes.map((d) => (
              <Chip key={d} label={d} selected onClick={() => setPrefs({ dislikes: toggle(prefs.dislikes, d) })} />
            ))}
          </div>
          {prefs.dislikes.length === 0 && <p className="text-xs text-gray-400 mt-1">No disliked ingredients added yet.</p>}
        </Section>

        <Section title="Favourite cuisines" emoji="🌍">
          <div className="flex flex-wrap gap-2">
            {CUISINE_OPTIONS.map((c) => (
              <Chip key={c.id} label={c.id} emoji={c.emoji} selected={prefs.cuisines.includes(c.id)} onClick={() => setPrefs({ cuisines: toggle(prefs.cuisines, c.id) })} />
            ))}
          </div>
        </Section>

        <Section title="Preferred meal styles" emoji="🍽️">
          <div className="flex flex-wrap gap-2">
            {MEAL_STYLE_OPTIONS.map((m) => (
              <Chip key={m.id} label={m.id} emoji={m.emoji} selected={prefs.mealStyles.includes(m.id)} onClick={() => setPrefs({ mealStyles: toggle(prefs.mealStyles, m.id) })} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, emoji, children }: { title: string; emoji: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 flex items-center gap-1.5">
        <span>{emoji}</span> {title}
      </h2>
      {children}
    </div>
  );
}

function CustomAdder({ value, onChange, onAdd, placeholder }: { value: string; onChange: (v: string) => void; onAdd: () => void; placeholder: string }) {
  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onAdd()}
        placeholder={placeholder}
        className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
      />
      <button onClick={onAdd} className="bg-emerald-600 text-white font-bold w-11 h-11 rounded-full shrink-0">+</button>
    </div>
  );
}
