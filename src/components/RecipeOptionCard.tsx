import type { Recipe } from '../types';
import RecipeMedia from './RecipeMedia';
import type { RecipeMatch } from '../utils/mealGenerator';
import { t, cuisineLabel, difficultyLabel, recipeName, type Lang } from '../i18n';

interface RecipeOptionCardProps {
  recipe: Recipe;
  match: RecipeMatch;
  servings: number;
  optionLabel: string;
  lang: Lang;
  onSelect: () => void;
  onViewRecipe: () => void;
}

export default function RecipeOptionCard({ recipe, match, servings, optionLabel, lang, onSelect, onViewRecipe }: RecipeOptionCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={onViewRecipe} className="w-full text-left flex gap-3 p-3">
        <RecipeMedia emoji={recipe.emoji} gradient={recipe.gradient} size="md" className="w-20 h-20" />
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">{optionLabel} · {cuisineLabel(recipe.cuisine, lang)}</div>
          <div className="font-bold text-gray-900 leading-snug truncate">{recipeName(recipe, lang)}</div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-xs text-gray-500">
            <span>⏱ {recipe.prepTime + recipe.cookTime}m</span>
            <span>·</span>
            <span>{difficultyLabel(recipe.difficulty, lang)}</span>
            <span>·</span>
            <span>{servings} {t(lang, 'mealplan.servings').toLowerCase()}</span>
          </div>
          <div className="mt-1.5 text-xs font-semibold">
            <span className="text-emerald-600">✓ {match.have.length} {t(lang, 'recipe.haveCount')}</span>
            {match.need.length > 0 && <span className="text-amber-600 ml-2">+ {match.need.length} {t(lang, 'recipe.toBuy')}</span>}
          </div>
        </div>
      </button>
      <div className="flex border-t border-gray-100">
        <button onClick={onViewRecipe} className="flex-1 py-2.5 text-sm font-semibold text-gray-500">
          {t(lang, 'recipe.viewRecipe')}
        </button>
        <div className="w-px bg-gray-100" />
        <button onClick={onSelect} className="flex-1 py-2.5 text-sm font-bold text-emerald-600">
          {t(lang, 'recipe.chooseThis')}
        </button>
      </div>
    </div>
  );
}
