import type {
  Recipe, RecipeIngredient, HouseholdPreferences, PantryItem, MealSlotType,
  MealStyleTag, SlotPeople, WeekPlan, Day, DietTag,
} from '../types';
import { RECIPES } from '../data/recipes';
import { slugify } from './slugify';

/** Perishable categories where a single "have" checkbox (no tracked quantity) should still be
 *  treated as "used up" once allocated to a meal this week, so we don't suggest the same
 *  chicken breast for two different dinners. Store-cupboard staples are treated as effectively
 *  unlimited since a pinch of salt or a splash of oil is never the limiting ingredient. */
const LIMITED_CATEGORIES = new Set([
  'Meat', 'Fish', 'Dairy', 'Eggs', 'Deli products', 'Leftovers',
  'Frozen meals', 'Bread',
]);

export interface Availability {
  have: boolean;
  qty?: number;
  limited: boolean;
}

export type AvailabilityMap = Map<string, Availability>;

/** Builds a live "what's actually available" map: pantry items minus anything already
 * allocated to other meal slots in the current week plan (soft reservation). */
export function computeAvailability(
  pantry: PantryItem[],
  weekPlan?: WeekPlan,
  excludeSlotKey?: string
): AvailabilityMap {
  const map: AvailabilityMap = new Map();
  for (const item of pantry) {
    if (!item.have) continue;
    map.set(item.ingredientId, {
      have: true,
      qty: item.quantity,
      limited: LIMITED_CATEGORIES.has(item.category) || item.quantity !== undefined,
    });
  }

  if (weekPlan) {
    for (const [key, slot] of Object.entries(weekPlan.slots)) {
      if (key === excludeSlotKey) continue;
      if (!slot.meal) continue;
      for (const id of slot.meal.allocatedIngredientIds) {
        const avail = map.get(id);
        if (!avail) continue;
        if (avail.qty !== undefined) {
          avail.qty = Math.max(0, avail.qty - 1); // approximate: one portion consumed per allocation
          if (avail.qty <= 0) avail.have = false;
        } else if (avail.limited) {
          avail.have = false;
        }
      }
    }
  }
  return map;
}

export interface IngredientMatch {
  ingredient: RecipeIngredient;
  scaledQty: number;
  have: boolean;
}

export interface RecipeMatch {
  recipe: Recipe;
  servings: number;
  have: IngredientMatch[];
  need: IngredientMatch[];
  matchRatio: number;
  allocatedIngredientIds: string[];
}

export function matchRecipe(recipe: Recipe, servings: number, availability: AvailabilityMap): RecipeMatch {
  const scale = servings / recipe.baseServings;
  const have: IngredientMatch[] = [];
  const need: IngredientMatch[] = [];
  const allocated: string[] = [];

  const required = recipe.ingredients.filter((i) => !i.optional);
  for (const ingredient of recipe.ingredients) {
    const scaledQty = Math.round(ingredient.qty * scale * 100) / 100;
    const avail = availability.get(ingredient.ingredientId);
    const isHave = !!avail?.have;
    (isHave ? have : need).push({ ingredient, scaledQty, have: isHave });
    if (isHave) allocated.push(ingredient.ingredientId);
  }

  const requiredHave = required.filter((i) => availability.get(i.ingredientId)?.have).length;
  const matchRatio = required.length === 0 ? 1 : requiredHave / required.length;

  return { recipe, servings, have, need, matchRatio, allocatedIngredientIds: allocated };
}

export interface GenContext {
  prefs: HouseholdPreferences;
  mealType: MealSlotType;
  people: SlotPeople;
  styleFilters: MealStyleTag[];
  maxCookTime?: number;
  expiringIngredientIds?: Set<string>;
}

function containsWord(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.trim().toLowerCase());
}

const MEAT_KEYWORDS = ['chicken', 'beef', 'pork', 'lamb', 'turkey', 'bacon', 'sausage', 'ham', 'salami', 'chorizo', 'steak', 'mince'];
const FISH_KEYWORDS = ['salmon', 'cod', 'tuna', 'prawn', 'fish', 'anchovy', 'shrimp'];

function hasIngredientLike(recipe: Recipe, keywords: string[]): boolean {
  return recipe.ingredients.some((i) => keywords.some((k) => i.name.toLowerCase().includes(k)));
}

/** Real dietary *restrictions* are checked dynamically from ingredients/allergens rather than
 * trusting the hand-authored `recipe.diets` tags alone — those tags are necessarily incomplete
 * (a recipe is rarely tagged with every diet it happens to satisfy), so relying on them as an
 * AND-filter across several selected diets could wrongly zero out otherwise-valid recipes.
 * "Leaning" diets like high-protein/low-carb/mediterranean are treated as soft scoring
 * preferences instead of hard filters — see scoreRecipe. */
const HARD_DIET_CHECKS: Partial<Record<DietTag, (r: Recipe) => boolean>> = {
  vegetarian: (r) => !hasIngredientLike(r, MEAT_KEYWORDS) && !hasIngredientLike(r, FISH_KEYWORDS) && !r.allergens.includes('fish') && !r.allergens.includes('shellfish'),
  vegan: (r) =>
    !hasIngredientLike(r, MEAT_KEYWORDS) && !hasIngredientLike(r, FISH_KEYWORDS) &&
    !r.allergens.includes('fish') && !r.allergens.includes('shellfish') &&
    !r.allergens.includes('dairy') && !r.allergens.includes('egg') &&
    !r.ingredients.some((i) => i.name.toLowerCase() === 'honey'),
  pescatarian: (r) => !hasIngredientLike(r, MEAT_KEYWORDS),
  'gluten-free': (r) => !r.allergens.includes('gluten'),
  'dairy-free': (r) => !r.allergens.includes('dairy'),
};

export function passesHardFilters(recipe: Recipe, ctx: GenContext): boolean {
  if (!recipe.mealTypes.includes(ctx.mealType)) return false;

  for (const diet of ctx.prefs.diets) {
    const check = HARD_DIET_CHECKS[diet];
    if (check && !check(recipe)) return false;
  }

  for (const allergy of ctx.prefs.allergies) {
    const a = allergy.toLowerCase();
    if (recipe.allergens.some((x) => x.toLowerCase() === a)) return false;
    if (recipe.ingredients.some((i) => containsWord(i.name, allergy))) return false;
  }

  for (const dislike of ctx.prefs.dislikes) {
    if (recipe.ingredients.some((i) => containsWord(i.name, dislike) || containsWord(dislike, i.name))) {
      return false;
    }
  }

  if (ctx.maxCookTime && recipe.cookTime > ctx.maxCookTime) return false;

  return true;
}

const SOFT_DIETS: DietTag[] = ['low-carb', 'high-protein', 'mediterranean'];

function scoreRecipe(recipe: Recipe, ctx: GenContext, match: RecipeMatch): number {
  let score = match.matchRatio * 100;

  if (ctx.prefs.cuisines.length > 0 && ctx.prefs.cuisines.includes(recipe.cuisine)) score += 20;
  if (recipe.cuisine === 'International') score += 4;

  // Leaning diets (not hard restrictions) nudge ranking rather than exclude recipes outright.
  for (const diet of ctx.prefs.diets) {
    if (!SOFT_DIETS.includes(diet)) continue;
    if (recipe.diets.includes(diet)) score += 12;
    else if (diet === 'high-protein' && recipe.nutrition.protein >= 25) score += 8;
    else if (diet === 'low-carb' && recipe.nutrition.carbs <= 20) score += 8;
    else if (diet === 'mediterranean' && ['Italian', 'Mediterranean', 'Greek'].includes(recipe.cuisine)) score += 8;
  }

  for (const style of ctx.styleFilters) {
    if (recipe.tags.includes(style)) score += 15;
  }
  // "Quick meal" implies cookTime should be as short as possible
  if (ctx.styleFilters.includes('Quick meal')) score += Math.max(0, 10 - recipe.cookTime / 3);

  if (ctx.prefs.children.length > 0 && recipe.tags.includes('Kid-friendly')) score += 6;

  if (ctx.expiringIngredientIds?.size) {
    const usesExpiring = recipe.ingredients.some((i) => ctx.expiringIngredientIds!.has(i.ingredientId));
    if (usesExpiring) score += 18;
  }

  return score;
}

export interface GeneratedOption {
  recipe: Recipe;
  match: RecipeMatch;
  score: number;
}

export function generateMealOptions(
  ctx: GenContext,
  availability: AvailabilityMap,
  count = 3,
  pool: Recipe[] = RECIPES
): GeneratedOption[] {
  const servings = ctx.people.adults + ctx.people.children;
  const candidates = pool
    .filter((r) => passesHardFilters(r, ctx))
    .map((recipe) => {
      const match = matchRecipe(recipe, Math.max(1, servings), availability);
      return { recipe, match, score: scoreRecipe(recipe, ctx, match) };
    })
    .sort((a, b) => b.score - a.score);

  const picked: GeneratedOption[] = [];
  const usedCuisines = new Set<string>();

  // First pass: best option per distinct cuisine, for variety
  for (const c of candidates) {
    if (picked.length >= count) break;
    if (usedCuisines.has(c.recipe.cuisine)) continue;
    picked.push(c);
    usedCuisines.add(c.recipe.cuisine);
  }
  // Fill any remaining slots with the next best overall candidates
  for (const c of candidates) {
    if (picked.length >= count) break;
    if (picked.some((p) => p.recipe.id === c.recipe.id)) continue;
    picked.push(c);
  }

  return picked;
}

export function getExpiringIngredientIds(pantry: PantryItem[], withinDays = 4): Set<string> {
  const now = Date.now();
  const ids = new Set<string>();
  for (const item of pantry) {
    if (!item.have || !item.expiry) continue;
    const days = (new Date(item.expiry).getTime() - now) / 86_400_000;
    if (days <= withinDays) ids.add(item.ingredientId);
  }
  return ids;
}

export function scaleIngredient(ingredient: RecipeIngredient, servings: number, baseServings: number) {
  const scale = servings / baseServings;
  const qty = Math.round(ingredient.qty * scale * 100) / 100;
  return { ...ingredient, qty };
}

export function ingredientIdFor(name: string): string {
  return slugify(name);
}

export const DAY_ORDER: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
