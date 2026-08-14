import { useState, type ReactNode } from 'react';
import type { AppStore } from '../store';
import { slotKey, MEAL_TYPES } from '../store';
import type { Page } from '../types';
import { RECIPES_BY_ID } from '../data/recipes';
import { computeAvailability, generateMealOptions, matchRecipe, type GenContext } from '../utils/mealGenerator';
import { daysUntil } from '../utils/date';
import { t, mealTypeLabel, recipeName, foodName } from '../i18n';
import RecipeMedia from '../components/RecipeMedia';
import Sheet from '../components/Sheet';
import RecipeDetail from '../components/RecipeDetail';
import EmptyState from '../components/EmptyState';

interface HomeProps {
  store: AppStore;
  onNavigate: (p: Page) => void;
}

export default function Home({ store, onNavigate }: HomeProps) {
  const [viewingRecipeId, setViewingRecipeId] = useState<string | null>(null);
  const lang = store.language;

  const todaySlots = MEAL_TYPES.filter((t) => store.activeMealTypes.includes(t))
    .map((t) => ({ type: t, slot: store.weekPlan.slots[slotKey(store.todayDay, t)] }))
    .filter((x) => x.slot?.meal);

  const weekMealsPlanned = Object.values(store.weekPlan.slots).filter((s) => s.enabled && s.meal).length;
  const weekMealsTotal = Object.values(store.weekPlan.slots).filter((s) => s.enabled).length;

  const pantryHaveCount = store.pantry.filter((p) => p.have).length;

  const availability = computeAvailability(store.pantry, store.weekPlan);
  const ctx: GenContext = {
    prefs: store.prefs,
    mealType: 'dinner',
    people: { adults: store.prefs.adults, children: store.prefs.children.length },
    styleFilters: [],
    expiringIngredientIds: store.expiringIngredientIds,
  };
  const whatCanICook = generateMealOptions(ctx, availability, 3);

  const uncheckedShopping = store.shoppingItems.filter((i) => !i.checked).length;

  const viewingRecipe = viewingRecipeId ? RECIPES_BY_ID[viewingRecipeId] : null;
  const servingsForView = ctx.people.adults + ctx.people.children || 1;

  return (
    <div className="pb-28">
      <div className="px-5 pt-8 pb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-400 font-medium">{t(lang, 'home.greeting')}</p>
          <h1 className="text-2xl font-extrabold text-gray-900">{t(lang, 'home.headline')}</h1>
        </div>
        <button
          onClick={() => onNavigate('settings')}
          aria-label="Preferences"
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-lg shrink-0 mt-1"
        >
          ⚙️
        </button>
      </div>

      {store.expiringItems.length > 0 && (
        <div className="mx-5 mb-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="font-bold text-amber-800 text-sm">⏳ {store.expiringItems.length} {t(lang, 'home.expiringSoon')}</div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {store.expiringItems.slice(0, 6).map((i) => (
              <span key={i.id} className="text-xs bg-white border border-amber-200 text-amber-700 rounded-full px-2.5 py-1 font-medium">
                {i.emoji} {foodName(i.name, lang)}{i.expiry ? ` · ${Math.max(0, daysUntil(i.expiry))}g` : ''}
              </span>
            ))}
          </div>
          <button onClick={() => onNavigate('mealplan')} className="text-xs font-bold text-amber-700 mt-2 underline">
            {t(lang, 'home.useInMeal')}
          </button>
        </div>
      )}

      {/* This week */}
      <SectionCard title={t(lang, 'home.thisWeek')} emoji="📅" onPress={() => onNavigate('mealplan')} viewAllLabel={t(lang, 'home.viewAll')}>
        <p className="text-xs text-gray-500 mb-2">{t(lang, 'home.plannedMealsChosen', { count: weekMealsPlanned, total: weekMealsTotal })}</p>
        {todaySlots.length === 0 ? (
          <p className="text-sm text-gray-400">{t(lang, 'home.noMealsToday')}</p>
        ) : (
          <div className="space-y-2">
            {todaySlots.map(({ type, slot }) => {
              const recipe = slot!.meal ? RECIPES_BY_ID[slot!.meal.recipeId] : undefined;
              if (!recipe) return null;
              return (
                <div key={type} className="flex items-center gap-2.5">
                  <RecipeMedia emoji={recipe.emoji} gradient={recipe.gradient} size="sm" className="w-10 h-10" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">{mealTypeLabel(type, lang)}</div>
                    <div className="text-sm font-bold text-gray-800 truncate">{recipeName(recipe, lang)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>

      {/* What can I cook */}
      <SectionCard title={t(lang, 'home.whatCanICook')} emoji="🍳" subtitle={t(lang, 'home.usingWhatYouHave')}>
        {whatCanICook.length === 0 ? (
          <EmptyState emoji="🥫" title={t(lang, 'home.addIngredients')} subtitle={t(lang, 'home.addIngredientsSub')} />
        ) : (
          <div className="flex gap-3 overflow-x-auto -mx-1 px-1 pb-1">
            {whatCanICook.map((opt) => (
              <button key={opt.recipe.id} onClick={() => setViewingRecipeId(opt.recipe.id)} className="shrink-0 w-32 text-left">
                <RecipeMedia emoji={opt.recipe.emoji} gradient={opt.recipe.gradient} size="md" className="w-32 h-24" />
                <div className="text-xs font-bold text-gray-800 mt-1.5 leading-tight">{recipeName(opt.recipe, lang)}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">✓ {opt.match.have.length}/{opt.recipe.ingredients.length} {t(lang, 'home.have')}</div>
              </button>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Quick links */}
      <div className="px-5 grid grid-cols-2 gap-3 mt-1">
        <QuickTile emoji="🥫" title={t(lang, 'home.myFood')} subtitle={`${pantryHaveCount} ${t(lang, 'home.items')}`} onPress={() => onNavigate('myfood')} />
        <QuickTile emoji="🍱" title={t(lang, 'home.packLunch')} subtitle={`${store.schoolLunches.length + store.workLunches.length} ${t(lang, 'home.planned')}`} onPress={() => onNavigate('packlunch')} />
        <QuickTile emoji="🛒" title={t(lang, 'home.shoppingList')} subtitle={`${uncheckedShopping} ${t(lang, 'home.itemsNeeded')}`} onPress={() => onNavigate('shopping')} />
        <QuickTile emoji="📅" title={t(lang, 'home.mealPlan')} subtitle={`${weekMealsPlanned} ${t(lang, 'home.mealsSet')}`} onPress={() => onNavigate('mealplan')} />
      </div>

      <Sheet open={!!viewingRecipe} onClose={() => setViewingRecipeId(null)} title={t(lang, 'mealplan.recipe')}>
        {viewingRecipe && (
          <RecipeDetail
            recipe={viewingRecipe}
            servings={servingsForView}
            match={matchRecipe(viewingRecipe, servingsForView, availability)}
            lang={lang}
            footer={
              <button
                onClick={() => {
                  store.selectMealForSlot(store.todayDay, 'dinner', viewingRecipe.id);
                  setViewingRecipeId(null);
                  onNavigate('mealplan');
                }}
                className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-2xl"
              >
                {t(lang, 'home.addToTodaysDinner')}
              </button>
            }
          />
        )}
      </Sheet>
    </div>
  );
}

function SectionCard({ title, emoji, subtitle, onPress, viewAllLabel, children }: { title: string; emoji: string; subtitle?: string; onPress?: () => void; viewAllLabel?: string; children: ReactNode }) {
  return (
    <div className="mx-5 mb-4 bg-white rounded-2xl border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span>{emoji}</span>
          <h2 className="font-bold text-gray-900">{title}</h2>
        </div>
        {onPress && (
          <button onClick={onPress} className="text-xs font-bold text-emerald-600">
            {viewAllLabel}
          </button>
        )}
      </div>
      {subtitle && <p className="text-xs text-gray-400 mb-2">{subtitle}</p>}
      {children}
    </div>
  );
}

function QuickTile({ emoji, title, subtitle, onPress }: { emoji: string; title: string; subtitle: string; onPress: () => void }) {
  return (
    <button onClick={onPress} className="bg-white rounded-2xl border border-gray-100 p-4 text-left">
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="font-bold text-gray-900 text-sm">{title}</div>
      <div className="text-xs text-gray-400">{subtitle}</div>
    </button>
  );
}
