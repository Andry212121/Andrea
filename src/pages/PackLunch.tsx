import { useState } from 'react';
import type { AppStore } from '../store';
import type { Day, WorkLunchStyle } from '../types';
import { RECIPES_BY_ID } from '../data/recipes';
import { WORK_LUNCH_STYLES } from '../data/options';
import Chip from '../components/Chip';
import EmptyState from '../components/EmptyState';
import Sheet from '../components/Sheet';
import RecipeMedia from '../components/RecipeMedia';
import RecipeDetail from '../components/RecipeDetail';
import { computeAvailability, matchRecipe } from '../utils/mealGenerator';
import { t, dayLabel, cuisineLabel, workLunchStyleLabel, lunchSlotLabel, foodName, recipeName, type Lang } from '../i18n';

interface PackLunchProps {
  store: AppStore;
}

const SCHOOL_DAYS: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function PackLunch({ store }: PackLunchProps) {
  const lang = store.language;
  const [tab, setTab] = useState<'school' | 'work'>('school');

  return (
    <div className="pb-28">
      <div className="px-5 pt-8 pb-3">
        <h1 className="text-xl font-extrabold text-gray-900">{t(lang, 'packlunch.title')}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t(lang, 'packlunch.subtitle')}</p>

        <div className="flex gap-2 mt-4">
          <button onClick={() => setTab('school')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold ${tab === 'school' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-500 border border-gray-100'}`}>
            {t(lang, 'packlunch.school')}
          </button>
          <button onClick={() => setTab('work')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold ${tab === 'work' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-500 border border-gray-100'}`}>
            {t(lang, 'packlunch.work')}
          </button>
        </div>
      </div>

      {tab === 'school' ? <SchoolTab store={store} lang={lang} /> : <WorkTab store={store} lang={lang} />}
    </div>
  );
}

function SchoolTab({ store, lang }: { store: AppStore; lang: Lang }) {
  const [childId, setChildId] = useState<string | null>(store.prefs.children[0]?.id ?? null);
  const activeChild = childId ?? store.prefs.children[0]?.id;

  if (store.prefs.children.length === 0) {
    return (
      <EmptyState emoji="🎒" title={t(lang, 'packlunch.noChildren')} subtitle={t(lang, 'packlunch.noChildrenSub')} />
    );
  }

  const lunches = SCHOOL_DAYS.map((day) => store.schoolLunches.find((l) => l.ownerId === activeChild && l.day === day));
  const hasAny = lunches.some(Boolean);

  return (
    <div className="px-5">
      {store.prefs.children.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {store.prefs.children.map((c, i) => (
            <Chip key={c.id} label={`${t(lang, 'packlunch.childLabel')} ${i + 1} (${c.age}${lang === 'en' ? 'y' : 'a'})`} selected={activeChild === c.id} onClick={() => setChildId(c.id)} />
          ))}
        </div>
      )}

      <button
        onClick={() => activeChild && store.generateSchoolLunchWeek(activeChild)}
        className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl mb-4"
      >
        {hasAny ? t(lang, 'packlunch.regenerateWeek') : t(lang, 'packlunch.generateWeek')}
      </button>

      <div className="space-y-3">
        {SCHOOL_DAYS.map((day, i) => {
          const lunch = lunches[i];
          return (
            <div key={day} className="bg-white rounded-2xl border border-gray-100 p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-800 text-sm">{dayLabel(day, lang)}</span>
                {activeChild && (
                  <button onClick={() => store.regenerateSchoolDay(activeChild, day)} className="text-xs font-bold text-emerald-600">
                    {t(lang, 'packlunch.regenerateDay')}
                  </button>
                )}
              </div>
              {lunch ? (
                <div className="grid grid-cols-3 gap-2">
                  {lunch.items.map((item) => (
                    <div key={item.slot} className="bg-gray-50 rounded-xl px-2 py-2 text-center">
                      <div className="text-lg">{item.emoji}</div>
                      <div className="text-[11px] font-semibold text-gray-700 leading-tight mt-0.5 truncate">{foodName(item.name, lang)}</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wide">{lunchSlotLabel(item.slot, lang)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">{t(lang, 'packlunch.notGenerated')}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkTab({ store, lang }: { store: AppStore; lang: Lang }) {
  const [style, setStyle] = useState<WorkLunchStyle>('Quick lunch');
  const [viewingDay, setViewingDay] = useState<Day | null>(null);
  const hasAny = store.workLunches.length > 0;

  const viewingLunch = viewingDay ? store.workLunches.find((l) => l.day === viewingDay) : null;
  const viewingRecipe = viewingLunch?.recipeId ? RECIPES_BY_ID[viewingLunch.recipeId] : null;
  const availability = computeAvailability(store.pantry);

  return (
    <div className="px-5">
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">{t(lang, 'packlunch.lunchStyle')}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {WORK_LUNCH_STYLES.map((s) => (
          <Chip key={s.id} label={workLunchStyleLabel(s.id, lang)} emoji={s.emoji} selected={style === s.id} onClick={() => setStyle(s.id)} size="sm" />
        ))}
      </div>

      <button onClick={() => store.generateWorkLunchWeek(style)} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl mb-4">
        {hasAny ? t(lang, 'packlunch.regenerateWeek') : t(lang, 'packlunch.generateWeek')}
      </button>

      <div className="space-y-2.5">
        {SCHOOL_DAYS.map((day) => {
          const lunch = store.workLunches.find((l) => l.day === day);
          const recipe = lunch?.recipeId ? RECIPES_BY_ID[lunch.recipeId] : null;
          return (
            <div key={day} className="bg-white rounded-2xl border border-gray-100 p-3 flex items-center gap-3">
              <span className="w-10 shrink-0 text-xs font-bold text-gray-400">{dayLabel(day, lang)}</span>
              {recipe ? (
                <button onClick={() => setViewingDay(day)} className="flex-1 flex items-center gap-3 text-left">
                  <RecipeMedia emoji={recipe.emoji} gradient={recipe.gradient} size="sm" className="w-11 h-11" />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-gray-900 truncate">{recipeName(recipe, lang)}</div>
                    <div className="text-[11px] text-gray-500">⏱ {recipe.prepTime + recipe.cookTime}m · {cuisineLabel(recipe.cuisine, lang)}</div>
                  </div>
                </button>
              ) : (
                <span className="flex-1 text-xs text-gray-400">{t(lang, 'packlunch.notGenerated')}</span>
              )}
              <button onClick={() => store.regenerateWorkDay(day, style)} className="text-xs font-bold text-emerald-600 shrink-0">
                🔄
              </button>
            </div>
          );
        })}
      </div>

      <Sheet open={!!viewingDay} onClose={() => setViewingDay(null)} title={t(lang, 'mealplan.recipe')}>
        {viewingRecipe && (
          <RecipeDetail recipe={viewingRecipe} servings={viewingRecipe.baseServings} match={matchRecipe(viewingRecipe, viewingRecipe.baseServings, availability)} lang={lang} />
        )}
      </Sheet>
    </div>
  );
}
