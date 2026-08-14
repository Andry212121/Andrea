import { useState } from 'react';
import type { AppStore } from '../store';
import { slotKey, MEAL_TYPES } from '../store';
import type { Day, MealSlotType, MealStyleTag, Page } from '../types';
import { DAYS } from '../types';
import { RECIPES_BY_ID } from '../data/recipes';
import { MEAL_STYLE_OPTIONS, QUICK_COOK_TIMES } from '../data/options';
import { dateForDay, formatShortDate, todayDay } from '../utils/date';
import { matchRecipe, computeAvailability } from '../utils/mealGenerator';
import { t, mealTypeLabel, mealStyleLabel, dayLabel, type Lang } from '../i18n';
import Sheet from '../components/Sheet';
import Chip from '../components/Chip';
import Stepper from '../components/Stepper';
import MealCard from '../components/MealCard';
import MealOptionsList from '../components/MealOptionsList';
import RecipeDetail from '../components/RecipeDetail';

interface MealPlanProps {
  store: AppStore;
  onNavigate: (p: Page) => void;
}

interface SlotRef { day: Day; type: MealSlotType }

export default function MealPlan({ store, onNavigate }: MealPlanProps) {
  const lang = store.language;
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
            <h1 className="text-xl font-extrabold text-gray-900">{t(lang, 'mealplan.title')}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{t(lang, 'mealplan.subtitle')}</p>
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
              <span className="font-extrabold text-gray-900">{dayLabel(day, lang)}{day === today && <span className="ml-1.5 text-[10px] font-bold text-emerald-600 align-middle">{t(lang, 'mealplan.today')}</span>}</span>
              <span className="text-xs text-gray-400">{formatShortDate(dateForDay(store.weekPlan.weekStart, day))}</span>
            </div>
            <div className="space-y-2">
              {store.activeMealTypes.map((type) => {
                const slot = store.weekPlan.slots[slotKey(day, type)];
                const recipe = slot?.meal ? RECIPES_BY_ID[slot.meal.recipeId] : undefined;
                return (
                  <div key={type} className="flex items-center gap-2">
                    <span className="w-16 shrink-0 text-xs font-bold text-gray-400 flex items-center gap-1">{mealTypeEmoji(type)} {mealTypeLabel(type, lang)}</span>
                    {recipe && slot.meal ? (
                      <MealCard recipe={recipe} servings={slot.meal.servings} lang={lang} cooked={!!slot.meal.cookedAt} onClick={() => openSlot(day, type)} />
                    ) : (
                      <button
                        onClick={() => openSlot(day, type)}
                        className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl py-2.5 text-xs font-semibold text-gray-400 hover:border-emerald-300 hover:text-emerald-600"
                      >
                        {t(lang, 'mealplan.planThisMeal')}
                      </button>
                    )}
                  </div>
                );
              })}
              {store.activeMealTypes.length === 0 && (
                <p className="text-xs text-gray-400 px-1">{t(lang, 'mealplan.noMealTypes')}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Global settings: which meal types to plan across the week */}
      <Sheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title={t(lang, 'mealplan.mealsToPlan')}>
        <div className="px-5 py-4">
          <p className="text-sm text-gray-500 mb-3">{t(lang, 'mealplan.mealsToPlanSub')}</p>
          <div className="flex flex-wrap gap-2">
            {MEAL_TYPES.map((mt) => (
              <Chip
                key={mt}
                label={mealTypeLabel(mt, lang)}
                emoji={mealTypeEmoji(mt)}
                selected={store.activeMealTypes.includes(mt)}
                onClick={() => store.toggleMealTypeActive(mt)}
              />
            ))}
          </div>

          <button
            onClick={() => { setSettingsOpen(false); onNavigate('settings'); }}
            className="w-full text-left mt-5 pt-4 border-t border-gray-100 text-sm font-bold text-emerald-600"
          >
            {t(lang, 'mealplan.editPreferences')}
          </button>
        </div>
      </Sheet>

      {/* Slot editor + generation */}
      <Sheet
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `${mealTypeLabel(editing.type, lang)} · ${dayLabel(editing.day, lang)}` : ''}
      >
        {editing && phase === 'edit' && (
          <SlotEditor
            store={store}
            slotRef={editing}
            lang={lang}
            onGenerate={() => setPhase('options')}
          />
        )}
        {editing && phase === 'options' && (
          <SlotOptions
            store={store}
            slotRef={editing}
            lang={lang}
            excludeIds={excludeIds}
            onChoose={(recipeId) => {
              store.selectMealForSlot(editing.day, editing.type, recipeId);
              setEditing(null);
            }}
            onEditPreferences={() => { setEditing(null); onNavigate('settings'); }}
          />
        )}
      </Sheet>

      {/* Existing meal actions */}
      <Sheet open={!!actions} onClose={() => setActions(null)} title={t(lang, 'mealplan.mealOptions')}>
        {actions && (
          <div className="px-5 pb-4 space-y-2">
            <ActionButton label={t(lang, 'mealplan.viewRecipe')} onClick={() => { setViewing(actions); setActions(null); }} />
            <ActionButton label={t(lang, 'mealplan.swapMeal')} onClick={() => {
              const recipeId = store.weekPlan.slots[slotKey(actions.day, actions.type)].meal?.recipeId;
              setExcludeIds(recipeId ? [recipeId] : []);
              setPhase('options');
              setEditing(actions);
              setActions(null);
            }} />
            <ActionButton label={t(lang, 'mealplan.regenerate')} onClick={() => {
              const recipeId = store.weekPlan.slots[slotKey(actions.day, actions.type)].meal?.recipeId;
              setExcludeIds(recipeId ? [recipeId] : []);
              setPhase('options');
              setEditing(actions);
              setActions(null);
            }} />
            <ActionButton label={t(lang, 'mealplan.changeServings')} onClick={() => { setServingsEdit(actions); setActions(null); }} />
            <ActionButton label={t(lang, 'mealplan.removeMeal')} danger onClick={() => { store.removeMealFromSlot(actions.day, actions.type); setActions(null); }} />
          </div>
        )}
      </Sheet>

      {/* Servings editor */}
      <Sheet open={!!servingsEdit} onClose={() => setServingsEdit(null)} title={t(lang, 'mealplan.changeServingsTitle')}>
        {servingsEdit && (
          <div className="px-5 py-4">
            <Stepper
              label={t(lang, 'mealplan.servings')}
              min={1}
              max={12}
              value={store.weekPlan.slots[slotKey(servingsEdit.day, servingsEdit.type)].meal?.servings ?? 1}
              onChange={(v) => store.changeServings(servingsEdit.day, servingsEdit.type, v)}
            />
          </div>
        )}
      </Sheet>

      {/* Full recipe view */}
      <Sheet open={!!viewing} onClose={() => setViewing(null)} title={t(lang, 'mealplan.recipe')}>
        {viewing && <ViewingRecipe store={store} slotRef={viewing} lang={lang} />}
      </Sheet>
    </div>
  );
}

function mealTypeEmoji(type: MealSlotType): string {
  return type === 'breakfast' ? '🍳' : type === 'lunch' ? '🥪' : type === 'dinner' ? '🍽️' : '🍎';
}

function ActionButton({ label, onClick, danger }: { label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-semibold ${
        danger ? 'border-rose-100 bg-rose-50 text-rose-600' : 'border-gray-100 bg-gray-50 text-gray-700'
      }`}
    >
      {label}
    </button>
  );
}

function SlotEditor({ store, slotRef, lang, onGenerate }: { store: AppStore; slotRef: SlotRef; lang: Lang; onGenerate: () => void }) {
  const slot = store.weekPlan.slots[slotKey(slotRef.day, slotRef.type)];
  const isQuick = slot.styleFilters.includes('Quick meal');

  const toggleStyle = (s: MealStyleTag) => {
    const has = slot.styleFilters.includes(s);
    store.setSlotStyleFilters(slotRef.day, slotRef.type, has ? slot.styleFilters.filter((x) => x !== s) : [...slot.styleFilters, s]);
  };

  return (
    <div className="px-5 py-4 space-y-5">
      <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
        <Stepper label={t(lang, 'mealplan.adultsEating')} value={slot.people.adults} onChange={(v) => store.setSlotPeople(slotRef.day, slotRef.type, { ...slot.people, adults: v })} min={0} max={12} />
        <Stepper label={t(lang, 'mealplan.childrenEating')} value={slot.people.children} onChange={(v) => store.setSlotPeople(slotRef.day, slotRef.type, { ...slot.people, children: v })} min={0} max={12} />
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">{t(lang, 'mealplan.mealType')}</h3>
        <div className="flex flex-wrap gap-2">
          {MEAL_STYLE_OPTIONS.map((m) => (
            <Chip key={m.id} label={mealStyleLabel(m.id, lang)} emoji={m.emoji} selected={slot.styleFilters.includes(m.id)} onClick={() => toggleStyle(m.id)} size="sm" />
          ))}
        </div>
      </div>

      {isQuick && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">{t(lang, 'mealplan.maxCookTime')}</h3>
          <div className="flex gap-2">
            {QUICK_COOK_TIMES.map((mins) => (
              <Chip key={mins} label={`${mins} min`} selected={slot.maxCookTime === mins} onClick={() => store.setSlotMaxCookTime(slotRef.day, slotRef.type, slot.maxCookTime === mins ? undefined : mins)} size="sm" />
            ))}
          </div>
        </div>
      )}

      <button onClick={onGenerate} className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-2xl">
        {t(lang, 'mealplan.generateOptions')}
      </button>
    </div>
  );
}

function SlotOptions({
  store, slotRef, lang, excludeIds, onChoose, onEditPreferences,
}: {
  store: AppStore; slotRef: SlotRef; lang: Lang; excludeIds: string[]; onChoose: (id: string) => void; onEditPreferences: () => void;
}) {
  const slot = store.weekPlan.slots[slotKey(slotRef.day, slotRef.type)];
  const options = store.getOptionsForSlot(slotRef.day, slotRef.type, 3, excludeIds);
  const servings = Math.max(1, slot.people.adults + slot.people.children);
  const hasSlotFilters = slot.styleFilters.length > 0 || !!slot.maxCookTime;

  return (
    <div className="pb-4">
      <p className="text-sm text-gray-500 px-5 mb-3">{t(lang, 'mealplan.topMatches')}</p>
      <MealOptionsList
        options={options}
        servings={servings}
        lang={lang}
        onChoose={onChoose}
        emptyStateActions={
          <div className="space-y-2 mt-2">
            {hasSlotFilters && (
              <button
                onClick={() => {
                  store.setSlotStyleFilters(slotRef.day, slotRef.type, []);
                  store.setSlotMaxCookTime(slotRef.day, slotRef.type, undefined);
                }}
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-2xl"
              >
                {t(lang, 'mealplan.clearFilters')}
              </button>
            )}
            <button onClick={onEditPreferences} className="w-full border-2 border-emerald-600 text-emerald-700 font-bold py-3 rounded-2xl">
              {t(lang, 'mealplan.editPrefsBtn')}
            </button>
          </div>
        }
      />
    </div>
  );
}

function ViewingRecipe({ store, slotRef, lang }: { store: AppStore; slotRef: SlotRef; lang: Lang }) {
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
      lang={lang}
      cooked={cooked}
      onServingsChange={(v) => store.changeServings(slotRef.day, slotRef.type, v)}
      footer={
        !cooked ? (
          <button
            onClick={() => store.cookMeal(slotRef.day, slotRef.type)}
            className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-2xl"
          >
            {t(lang, 'recipe.cookThisMeal')}
          </button>
        ) : (
          <div className="w-full text-center bg-emerald-50 text-emerald-700 font-bold py-3.5 rounded-2xl">
            {t(lang, 'recipe.inventoryUpdated')}
          </div>
        )
      }
    />
  );
}
