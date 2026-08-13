import type { Recipe } from '../types';
import RecipeMedia from './RecipeMedia';
import type { RecipeMatch } from '../utils/mealGenerator';

interface RecipeOptionCardProps {
  recipe: Recipe;
  match: RecipeMatch;
  servings: number;
  optionLabel: string;
  onSelect: () => void;
  onViewRecipe: () => void;
}

export default function RecipeOptionCard({ recipe, match, servings, optionLabel, onSelect, onViewRecipe }: RecipeOptionCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={onViewRecipe} className="w-full text-left flex gap-3 p-3">
        <RecipeMedia emoji={recipe.emoji} gradient={recipe.gradient} size="md" className="w-20 h-20" />
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">{optionLabel} · {recipe.cuisine}</div>
          <div className="font-bold text-gray-900 leading-snug truncate">{recipe.name}</div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-xs text-gray-500">
            <span>⏱ {recipe.prepTime + recipe.cookTime}m</span>
            <span>·</span>
            <span>{recipe.difficulty}</span>
            <span>·</span>
            <span>{servings} servings</span>
          </div>
          <div className="mt-1.5 text-xs font-semibold">
            <span className="text-emerald-600">✓ {match.have.length} have</span>
            {match.need.length > 0 && <span className="text-amber-600 ml-2">+ {match.need.length} to buy</span>}
          </div>
        </div>
      </button>
      <div className="flex border-t border-gray-100">
        <button onClick={onViewRecipe} className="flex-1 py-2.5 text-sm font-semibold text-gray-500">
          View recipe
        </button>
        <div className="w-px bg-gray-100" />
        <button onClick={onSelect} className="flex-1 py-2.5 text-sm font-bold text-emerald-600">
          Choose this
        </button>
      </div>
    </div>
  );
}
