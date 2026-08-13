import { useState } from 'react';
import type { AppStore } from '../store';
import { slotKey, MEAL_TYPES } from '../store';
import type { Day, MealSlotType, MealStyleTag } from '../types';
import { DAYS } from '../types';
import { RECIPES_BY_ID } from '../data/recipes';
import { MEAL_TYPE_META, MEAL_STYLE_OPTIONS, QUICK_COOK_TIMES } from '../data/options';
import { dateForDay, formatShortDate, todayDay } from '../utils/date';
import { matchRecipe, computeAvailability } from '../utils/mealGenerator';
import Sheet from '../components/Sheet';
import Chip from '../components/Chip';
import Stepper from '../components/Stepper';
import MealCard from '../components/MealCard';
import MealOptionsList from '../components/MealOptionsList';
import RecipeDetail from '../components/RecipeDetail';

interface MealPlanProps {
  store: AppStore;
}

interface SlotRef { day: Day; type: MealSlotType }

export default function MealPlan({ store }: MealPlanProps) {
  const [editing, setEditing] = useState<SlotRef | null>(null);
  const [phase, setPhase] = useState<'edit' | 'options'>('edit');
  const [excludeIds, setExcludeIds] = useState<string[]>([]);
  const [actions, setActions] = useState<SlotRef | null>(null);
  const [viewing, setViewing] = useState<SlotRef | null>(null);
  const [servingsEdit, setServingsEdit] = useState<SlotRef | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const today = todayDay();

  const openSlot = (day: Day, type: MealSlotType) => {
    const slot = store.weekPlan.slots[slotKey(day, type)];
    if (slot?.meal) {
      setActions({ day, type });
    } else {
      setExcludeIds([]);
      setPhase('edit');
      setEditing({ day, type });
    }
  };

  return (
    <div className="pb-28">
      <div className="px-5 pt-8 pb-3 sticky top-0 bg-[#f7faf5] z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Meal Plan</h1>
            <p className="text-sm text-gray-500 mt-0.5">Monday – Sunday</p>
          </div>
          <button onClick={() => setSettingsOpen(true)} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-lg">
            ⚙️
          </button>
        </div>
      </div>

      <div className="px-5 space-y-4 mt-2">
        {DAYS.map((day) => (
          <div key={day} className={`rounded-2xl border p-3 ${day === today ? 'border-emerald-300 bg-emerald-50/40' : 'border-gray-100 bg-white'}`}>
            <div className="flex items-baseline justify-between mb-2 px-1">
              <span className="font-extrabold text-gray-900">{day}{day === today && <span className="ml-1.5 text-[10px] font-bold text-emerald-600 align-middle">TODAY</span>}</span>
              <span className="text-xs text-gray-400">{formatShortDate(dateForDay(store.weekPlan.weekStart, day))}</span>
            </div>
            <div className="space-y-2">
              {store.activeMealTypes.map((type) => {
                const slot = store.weekPlan.slots[slotKey(day, type)];
                const meta = MEAL_TYPE_META[type];
                const recipe = slot?.meal ? RECIPES_BY_ID[slot.meal.recipeId] : undefined;
                return (
                  <div key={type} className="flex items-center gap-2">
                    <span className="w-16 shrink-0 text-xs font-bold text-gray-400 flex items-center gap-1">{meta.emoji} {meta.label}</span>
                    {recipe && slot.meal ? (
                      <MealCard recipe={recipe} servings={slot.meal.servings} cooked={!!slot.meal.cookedAt} onClick={() => openSlot(day, type)} />
                    ) : (
                      <button
                        onClick={() => openSlot(day, type)}
                        className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl py-2.5 text-xs font-semibold text-gray-400 hover:border-emerald-300 hover:text-emerald-600"
                      >
                        + Plan this meal
                      </button>
                    )}
                  </div>
                );
              })}
              {store.activeMealTypes.length === 0 && (
                <p className="text-xs text-gray-400 px-1">No meals selected — tap ⚙️ to choose which meals to plan.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Global settings: which meal types to plan across the week */}
      <Sheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Meals to plan">
        <div className="px-5 py-4">
          <p className="text-sm text-gray-500 mb-3">Choose which meals you'd like planned every day. You can still leave individual days empty.</p>
          <div className="flex flex-wrap gap-2">
            {MEAL_TYPES.map((t) => (
              <Chip
                key={t}
                label={MEAL_TYPE_META[t].label}
                emoji={MEAL_TYPE_META[t].emoji}
                selected={store.activeMealTypes.includes(t)}
                onClick={() => store.toggleMealTypeActive(t)}
              />
            ))}
          </div>
        </div>
      </Sheet>

      {/* Slot editor + generation */}
      <Sheet
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `${MEAL_TYPE_META[editing.type].label} · ${editing.day}` : ''}
      >
        {editing && phase === 'edit' && (
          <SlotEditor
            store={store}
            slotRef={editing}
            onGenerate={() => setPhase('options')}
          />
        )}
        {editing && phase === 'options' && (
          <SlotOptions
            store={store}
            slotRef={editing}
            excludeIds={excludeIds}
            onChoose={(recipeId) => {
              store.selectMealForSlot(editing.day, editing.type, recipeId);
              setEditing(null);
            }}
          />
        )}
      </Sheet>

      {/* Existing meal actions */}
      <Sheet open={!!actions} onClose={() => setActions(null)} title="Meal options">
        {actions && (
          <div className="px-5 pb-4 space-y-2">
            <ActionButton emoji="📖" label="View recipe" onClick={() => { setViewing(actions); setActions(null); }} />
            <ActionButton emoji="🔄" label="Swap meal" onClick={() => {
              const recipeId = store.weekPlan.slots[slotKey(actions.day, actions.type)].meal?.recipeId;
              setExcludeIds(recipeId ? [recipeId] : []);
              setPhase('options');
              setEditing(actions);
              setActions(null);
            }} />
            <ActionButton emoji="✨" label="Regenerate alternatives" onClick={() => {
              const recipeId = store.weekPlan.slots[slotKey(actions.day, actions.type)].meal?.recipeId;
              setExcludeIds(recipeId ? [recipeId] : []);
              setPhase('options');
              setEditing(actions);
              setActions(null);
            }} />
            <ActionButton emoji="👥" label="Change servings" onClick={() => { setServingsEdit(actions); setActions(null); }} />
            <ActionButton emoji="🗑" label="Remove meal" danger onClick={() => { store.removeMealFromSlot(actions.day, actions.type); setActions(null); }} />
          </div>
        )}
      </Sheet>

      {/* Servings editor */}
      <Sheet open={!!servingsEdit} onClose={() => setServingsEdit(null)} title="Change servings">
        {servingsEdit && (
          <div className="px-5 py-4">
            <Stepper
              label="Servings"
              min={1}
              max={12}
              value={store.weekPlan.slots[slotKey(servingsEdit.day, servingsEdit.type)].meal?.servings ?? 1}
              onChange={(v) => store.changeServings(servingsEdit.day, servingsEdit.type, v)}
            />
          </div>
        )}
      </Sheet>

      {/* Full recipe view */}
      <Sheet open={!!viewing} onClose={() => setViewing(null)} title="Recipe">
        {viewing && <ViewingRecipe store={store} slotRef={viewing} />}
      </Sheet>
    </div>
  );
}

function ActionButton({ emoji, label, onClick, danger }: { emoji: string; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-semibold ${
        danger ? 'border-rose-100 bg-rose-50 text-rose-600' : 'border-gray-100 bg-gray-50 text-gray-700'
      }`}
    >
      <span className="text-lg">{emoji}</span> {label}
    </button>
  );
}

function SlotEditor({ store, slotRef, onGenerate }: { store: AppStore; slotRef: SlotRef; onGenerate: () => void }) {
  const slot = store.weekPlan.slots[slotKey(slotRef.day, slotRef.type)];
  const isQuick = slot.styleFilters.includes('Quick meal');

  const toggleStyle = (s: MealStyleTag) => {
    const has = slot.styleFilters.includes(s);
    store.setSlotStyleFilters(slotRef.day, slotRef.type, has ? slot.styleFilters.filter((x) => x !== s) : [...slot.styleFilters, s]);
  };

  return (
    <div className="px-5 py-4 space-y-5">
      <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
        <Stepper label="Adults eating" value={slot.people.adults} onChange={(v) => store.setSlotPeople(slotRef.day, slotRef.type, { ...slot.people, adults: v })} min={0} max={12} />
        <Stepper label="Children eating" value={slot.people.children} onChange={(v) => store.setSlotPeople(slotRef.day, slotRef.type, { ...slot.people, children: v })} min={0} max={12} />
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Meal type</h3>
        <div className="flex flex-wrap gap-2">
          {MEAL_STYLE_OPTIONS.map((m) => (
            <Chip key={m.id} label={m.id} emoji={m.emoji} selected={slot.styleFilters.includes(m.id)} onClick={() => toggleStyle(m.id)} size="sm" />
          ))}
        </div>
      </div>

      {isQuick && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Max cooking time</h3>
          <div className="flex gap-2">
            {QUICK_COOK_TIMES.map((t) => (
              <Chip key={t} label={`${t} min`} selected={slot.maxCookTime === t} onClick={() => store.setSlotMaxCookTime(slotRef.day, slotRef.type, slot.maxCookTime === t ? undefined : t)} size="sm" />
            ))}
          </div>
        </div>
      )}

      <button onClick={onGenerate} className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-2xl">
        Generate meal options ✨
      </button>
    </div>
  );
}

function SlotOptions({ store, slotRef, excludeIds, onChoose }: { store: AppStore; slotRef: SlotRef; excludeIds: string[]; onChoose: (id: string) => void }) {
  const slot = store.weekPlan.slots[slotKey(slotRef.day, slotRef.type)];
  const options = store.getOptionsForSlot(slotRef.day, slotRef.type, 3, excludeIds);
  const servings = Math.max(1, slot.people.adults + slot.people.children);
  return (
    <div className="pb-4">
      <p className="text-sm text-gray-500 px-5 mb-3">Here are your top matches based on what's in your kitchen.</p>
      <MealOptionsList options={options} servings={servings} onChoose={onChoose} />
    </div>
  );
}

function ViewingRecipe({ store, slotRef }: { store: AppStore; slotRef: SlotRef }) {
  const slot = store.weekPlan.slots[slotKey(slotRef.day, slotRef.type)];
  if (!slot.meal) return null;
  const recipe = RECIPES_BY_ID[slot.meal.recipeId];
  if (!recipe) return null;
  const availability = computeAvailability(store.pantry, store.weekPlan, slotKey(slotRef.day, slotRef.type));
  const match = matchRecipe(recipe, slot.meal.servings, availability);
  const cooked = !!slot.meal.cookedAt;

  return (
    <RecipeDetail
      recipe={recipe}
      servings={slot.meal.servings}
      match={match}
      cooked={cooked}
      onServingsChange={(v) => store.changeServings(slotRef.day, slotRef.type, v)}
      footer={
        !cooked ? (
          <button
            onClick={() => store.cookMeal(slotRef.day, slotRef.type)}
            className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-2xl"
          >
            Cook this meal 👩‍🍳
          </button>
        ) : (
          <div className="w-full text-center bg-emerald-50 text-emerald-700 font-bold py-3.5 rounded-2xl">
            Inventory updated ✓
          </div>
        )
      }
    />
  );
}
