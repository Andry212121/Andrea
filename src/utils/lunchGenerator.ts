import type { Day, HouseholdPreferences, LunchItem, LunchItemSlot, PackedLunch, PantryItem, WeekPlan, WorkLunchStyle } from '../types';
import {
  LUNCH_MAINS, LUNCH_FRUIT, LUNCH_VEG, LUNCH_SNACK, LUNCH_DAIRY, LUNCH_DRINK, type LunchboxOption,
} from '../data/lunchbox';
import { RECIPES } from '../data/recipes';
import { computeAvailability, generateMealOptions, type GenContext } from './mealGenerator';

function isAllowed(option: LunchboxOption, prefs: HouseholdPreferences): boolean {
  for (const allergy of prefs.allergies) {
    if (option.allergens.some((a) => a.toLowerCase() === allergy.toLowerCase())) return false;
  }
  for (const dislike of prefs.dislikes) {
    if (option.name.toLowerCase().includes(dislike.toLowerCase())) return false;
  }
  if (prefs.diets.includes('vegetarian') && option.allergens.includes('fish')) return false;
  if (prefs.diets.includes('vegan') && (option.allergens.includes('dairy') || option.allergens.includes('egg') || option.allergens.includes('fish'))) return false;
  if (prefs.diets.includes('dairy-free') && option.allergens.includes('dairy')) return false;
  if (prefs.diets.includes('gluten-free') && option.allergens.includes('gluten')) return false;
  return true;
}

function pick(
  pool: LunchboxOption[],
  prefs: HouseholdPreferences,
  avoidNames: Set<string>
): LunchboxOption {
  const allowed = pool.filter((o) => isAllowed(o, prefs));
  const fresh = allowed.filter((o) => !avoidNames.has(o.name));
  const options = fresh.length > 0 ? fresh : allowed.length > 0 ? allowed : pool;
  return options[Math.floor(Math.random() * options.length)];
}

function toLunchItem(slot: LunchItemSlot, option: LunchboxOption): LunchItem {
  return { slot, name: option.name, emoji: option.emoji };
}

/** Generates one child's packed lunch for a single day, trying to avoid repeating the same
 * main/snack used earlier in the week for variety. */
export function generateSchoolLunch(
  day: Day,
  ownerId: string,
  prefs: HouseholdPreferences,
  usedThisWeek: { mains: Set<string>; snacks: Set<string> }
): PackedLunch {
  const main = pick(LUNCH_MAINS, prefs, usedThisWeek.mains);
  const fruit = pick(LUNCH_FRUIT, prefs, new Set());
  const veg = pick(LUNCH_VEG, prefs, new Set());
  const snack = pick(LUNCH_SNACK, prefs, usedThisWeek.snacks);
  const dairy = pick(LUNCH_DAIRY, prefs, new Set());
  const drink = pick(LUNCH_DRINK, prefs, new Set());

  return {
    day,
    ownerId,
    items: [
      toLunchItem('main', main),
      toLunchItem('fruit', fruit),
      toLunchItem('veg', veg),
      toLunchItem('snack', snack),
      toLunchItem('dairy', dairy),
      toLunchItem('drink', drink),
    ],
  };
}

export function generateSchoolWeek(ownerId: string, prefs: HouseholdPreferences, days: Day[]): PackedLunch[] {
  const usedMains = new Set<string>();
  const usedSnacks = new Set<string>();
  const week: PackedLunch[] = [];
  for (const day of days) {
    const lunch = generateSchoolLunch(day, ownerId, prefs, { mains: usedMains, snacks: usedSnacks });
    usedMains.add(lunch.items.find((i) => i.slot === 'main')!.name);
    usedSnacks.add(lunch.items.find((i) => i.slot === 'snack')!.name);
    week.push(lunch);
  }
  return week;
}

const WORK_STYLE_TO_FILTER: Record<WorkLunchStyle, (r: (typeof RECIPES)[number]) => boolean> = {
  'Quick lunch': (r) => r.tags.includes('Quick meal') || r.prepTime + r.cookTime <= 20,
  'Healthy lunch': (r) => r.tags.includes('Healthy meal') || r.tags.includes('Light meal'),
  'High-protein lunch': (r) => r.nutrition.protein >= 20 || r.tags.includes('High-protein'),
  Leftovers: (r) => r.tags.includes('Use leftovers') || r.ingredients.some((i) => i.name.startsWith('Leftover')),
  'Meal-prep lunch': (r) => r.tags.includes('Meal prep'),
  'No-reheat lunch': (r) => !!r.noReheat,
};

export function generateWorkLunch(
  day: Day,
  style: WorkLunchStyle,
  prefs: HouseholdPreferences,
  pantry: PantryItem[],
  weekPlan: WeekPlan | undefined,
  avoidRecipeIds: Set<string>
): PackedLunch | null {
  const pool = RECIPES.filter((r) => r.mealTypes.includes('lunch') && WORK_STYLE_TO_FILTER[style](r));
  const availability = computeAvailability(pantry, weekPlan);
  const ctx: GenContext = {
    prefs,
    mealType: 'lunch',
    people: { adults: 1, children: 0 },
    styleFilters: [],
  };
  const options = generateMealOptions(ctx, availability, 5, pool).filter((o) => !avoidRecipeIds.has(o.recipe.id));
  const chosen = options[0] ?? generateMealOptions(ctx, availability, 5, pool)[0];
  if (!chosen) return null;
  return {
    day,
    ownerId: 'adult',
    recipeId: chosen.recipe.id,
    items: [{ slot: 'main', name: chosen.recipe.name, emoji: chosen.recipe.emoji }],
  };
}

export function generateWorkWeek(
  style: WorkLunchStyle,
  prefs: HouseholdPreferences,
  pantry: PantryItem[],
  weekPlan: WeekPlan | undefined,
  days: Day[]
): PackedLunch[] {
  const used = new Set<string>();
  const week: PackedLunch[] = [];
  for (const day of days) {
    const lunch = generateWorkLunch(day, style, prefs, pantry, weekPlan, used);
    if (lunch) {
      if (lunch.recipeId) used.add(lunch.recipeId);
      week.push(lunch);
    }
  }
  return week;
}
