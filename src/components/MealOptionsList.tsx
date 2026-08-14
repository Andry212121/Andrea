import { useState, type ReactNode } from 'react';
import type { GeneratedOption } from '../utils/mealGenerator';
import RecipeOptionCard from './RecipeOptionCard';
import RecipeDetail from './RecipeDetail';
import Sheet from './Sheet';
import EmptyState from './EmptyState';
import { t, type Lang } from '../i18n';

interface MealOptionsListProps {
  options: GeneratedOption[];
  servings: number;
  onChoose: (recipeId: string) => void;
  lang: Lang;
  /** Shown below the empty state — e.g. "Edit preferences" / "Clear filters" shortcuts,
   * since a zero-result search is almost always caused by a filter combination the user
   * can't see from here. */
  emptyStateActions?: ReactNode;
}

export default function MealOptionsList({ options, servings, onChoose, lang, emptyStateActions }: MealOptionsListProps) {
  const [viewing, setViewing] = useState<GeneratedOption | null>(null);
  const LABELS = [1, 2, 3, 4, 5].map((n) => `${lang === 'en' ? 'Option' : 'Opzione'} ${n}`);

  if (options.length === 0) {
    return (
      <div className="px-5">
        <EmptyState
          emoji="🤔"
          title={t(lang, 'mealplan.noMatches')}
          subtitle={t(lang, 'mealplan.noMatchesSub')}
        />
        {emptyStateActions}
      </div>
    );
  }

  return (
    <div className="space-y-3 px-5">
      {options.map((opt, i) => (
        <RecipeOptionCard
          key={opt.recipe.id}
          recipe={opt.recipe}
          match={opt.match}
          servings={servings}
          optionLabel={LABELS[i] ?? `${lang === 'en' ? 'Option' : 'Opzione'} ${i + 1}`}
          lang={lang}
          onSelect={() => onChoose(opt.recipe.id)}
          onViewRecipe={() => setViewing(opt)}
        />
      ))}

      <Sheet open={!!viewing} onClose={() => setViewing(null)} title={t(lang, 'mealplan.recipe')}>
        {viewing && (
          <RecipeDetail
            recipe={viewing.recipe}
            servings={servings}
            match={viewing.match}
            lang={lang}
            footer={
              <button
                onClick={() => {
                  onChoose(viewing.recipe.id);
                  setViewing(null);
                }}
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl"
              >
                {t(lang, 'recipe.chooseThisOption')}
              </button>
            }
          />
        )}
      </Sheet>
    </div>
  );
}
