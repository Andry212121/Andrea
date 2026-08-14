import type { Recipe } from '../types';
import { RECIPE_TEXT_IT } from './recipeText';

export type { Lang, StringKey } from './strings';
export { t } from './strings';
export * from './labels';
export { foodName } from './foodNames';

export function recipeName(recipe: Recipe, lang: 'en' | 'it'): string {
  if (lang === 'en') return recipe.name;
  return RECIPE_TEXT_IT[recipe.id]?.name ?? recipe.name;
}

export function recipeDescription(recipe: Recipe, lang: 'en' | 'it'): string {
  if (lang === 'en') return recipe.description;
  return RECIPE_TEXT_IT[recipe.id]?.description ?? recipe.description;
}

export function recipeSteps(recipe: Recipe, lang: 'en' | 'it'): string[] {
  if (lang === 'en') return recipe.steps;
  return RECIPE_TEXT_IT[recipe.id]?.steps ?? recipe.steps;
}
