import type { Recipe } from '../types';
import RecipeMedia from './RecipeMedia';
import { cuisineLabel, recipeName, type Lang } from '../i18n';

interface MealCardProps {
  recipe: Recipe;
  servings: number;
  lang: Lang;
  cooked?: boolean;
  onClick: () => void;
}

export default function MealCard({ recipe, servings, lang, cooked, onClick }: MealCardProps) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-2.5 text-left">
      <RecipeMedia emoji={recipe.emoji} gradient={recipe.gradient} size="sm" className="w-12 h-12" />
      <div className="min-w-0 flex-1">
        <div className="font-bold text-gray-900 text-sm truncate">{recipeName(recipe, lang)}</div>
        <div className="flex items-center gap-x-2 text-[11px] text-gray-500 flex-wrap">
          <span>{cuisineLabel(recipe.cuisine, lang)}</span>
          <span>·</span>
          <span>⏱ {recipe.prepTime + recipe.cookTime}m</span>
          <span>·</span>
          <span>{servings} serv.</span>
        </div>
      </div>
      {cooked && <span className="shrink-0 text-emerald-500 text-lg">✓</span>}
    </button>
  );
}
