import type { CatalogIngredient, PantryItem, ShoppingCategory, ShoppingItem, WeekPlan } from '../types';
import { CATALOG_BY_ID } from '../data/ingredients';
import { RECIPES_BY_ID } from '../data/recipes';

function roundQty(n: number): number {
  return Math.round(n * 10) / 10;
}

function mapToShoppingCategory(catalogItem: CatalogIngredient | undefined, name: string): ShoppingCategory {
  const lname = name.toLowerCase();
  if (/bread|tortilla|pitta|bagel|naan|roll/.test(lname)) return 'Bakery';
  if (!catalogItem) return 'Other';
  if (catalogItem.section === 'freezer') return 'Frozen';
  if (catalogItem.category === 'Vegetables' || catalogItem.category === 'Fruit') return 'Fruit & vegetables';
  if (catalogItem.category === 'Meat' || catalogItem.category === 'Fish') return 'Meat & fish';
  if (catalogItem.category === 'Dairy' || catalogItem.category === 'Eggs') return 'Dairy';
  if (catalogItem.category === 'Leftovers' || catalogItem.category === 'Deli products') return 'Other';
  return 'Pantry';
}

/** Builds the "missing ingredients" shopping list from every enabled, meal-assigned slot in the
 * week plan, checking each needed ingredient against the pantry (and any tracked quantity). */
export function buildAutoShoppingItems(weekPlan: WeekPlan, pantry: PantryItem[]): ShoppingItem[] {
  const pantryMap = new Map(pantry.map((p) => [p.ingredientId, p]));
  const needed = new Map<string, { ingredientId: string; name: string; qty: number; unit: string }>();

  for (const slot of Object.values(weekPlan.slots)) {
    if (!slot.enabled || !slot.meal) continue;
    const recipe = RECIPES_BY_ID[slot.meal.recipeId];
    if (!recipe) continue;
    const scale = slot.meal.servings / recipe.baseServings;
    for (const ingredient of recipe.ingredients) {
      if (ingredient.optional) continue;
      const qty = ingredient.qty * scale;
      const key = `${ingredient.ingredientId}|${ingredient.unit}`;
      const cur = needed.get(key);
      needed.set(key, {
        ingredientId: ingredient.ingredientId,
        name: ingredient.name,
        unit: ingredient.unit,
        qty: (cur?.qty ?? 0) + qty,
      });
    }
  }

  const items: ShoppingItem[] = [];
  for (const { ingredientId, name, qty, unit } of needed.values()) {
    const pantryItem = pantryMap.get(ingredientId);
    let missingQty = qty;
    if (pantryItem?.have) {
      if (pantryItem.quantity === undefined) continue; // marked as "have", assumed enough
      missingQty = Math.max(0, qty - pantryItem.quantity);
      if (missingQty <= 0) continue;
    }
    items.push({
      id: crypto.randomUUID(),
      name,
      category: mapToShoppingCategory(CATALOG_BY_ID[ingredientId], name),
      qty: roundQty(missingQty),
      unit,
      checked: false,
      source: 'auto',
      ingredientId,
    });
  }
  return items;
}

export const SHOPPING_CATEGORY_ORDER: ShoppingCategory[] = [
  'Fruit & vegetables', 'Meat & fish', 'Dairy', 'Bakery', 'Pantry', 'Frozen', 'Other',
];
