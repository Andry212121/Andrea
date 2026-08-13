import { useState, type ReactNode } from 'react';
import type { GeneratedOption } from '../utils/mealGenerator';
import RecipeOptionCard from './RecipeOptionCard';
import RecipeDetail from './RecipeDetail';
import Sheet from './Sheet';
import EmptyState from './EmptyState';

interface MealOptionsListProps {
  options: GeneratedOption[];
  servings: number;
  onChoose: (recipeId: string) => void;
  /** Shown below the empty state — e.g. "Edit preferences" / "Clear filters" shortcuts,
   * since a zero-result search is almost always caused by a filter combination the user
   * can't see from here. */
  emptyStateActions?: ReactNode;
}

const LABELS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

export default function MealOptionsList({ options, servings, onChoose, emptyStateActions }: MealOptionsListProps) {
  const [viewing, setViewing] = useState<GeneratedOption | null>(null);

  if (options.length === 0) {
    return (
      <div className="px-5">
        <EmptyState
          emoji="🤔"
          title="No matching recipes"
          subtitle="Nothing in our recipe book fits every filter you've set — diet, allergies, cuisine, cooking time and dislikes all narrow the list down."
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
          optionLabel={LABELS[i] ?? `Option ${i + 1}`}
          onSelect={() => onChoose(opt.recipe.id)}
          onViewRecipe={() => setViewing(opt)}
        />
      ))}

      <Sheet open={!!viewing} onClose={() => setViewing(null)} title="Recipe">
        {viewing && (
          <RecipeDetail
            recipe={viewing.recipe}
            servings={servings}
            match={viewing.match}
            footer={
              <button
                onClick={() => {
                  onChoose(viewing.recipe.id);
                  setViewing(null);
                }}
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl"
              >
                Choose this option
              </button>
            }
          />
        )}
      </Sheet>
    </div>
  );
}
