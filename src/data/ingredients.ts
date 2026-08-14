import type { CatalogIngredient, StorageLocation } from '../types';
import { slugify } from '../utils/slugify';

type Row = [name: string, emoji: string, unit: string];

function build(section: StorageLocation, category: string, rows: Row[]): CatalogIngredient[] {
  return rows.map(([name, emoji, unit]) => ({
    id: slugify(name),
    name,
    emoji,
    section,
    category,
    defaultUnit: unit,
  }));
}

// ---------------- Fridge ----------------

const fridgeVegetables = build('fridge', 'Vegetables', [
  ['Tomatoes', '🍅', 'pcs'], ['Onions', '🧅', 'pcs'], ['Garlic', '🧄', 'cloves'],
  ['Carrots', '🥕', 'pcs'], ['Peppers', '🫑', 'pcs'], ['Cucumber', '🥒', 'pcs'],
  ['Courgette', '🥒', 'pcs'], ['Broccoli', '🥦', 'head'], ['Spinach', '🥬', 'bag'],
  ['Lettuce', '🥬', 'head'], ['Mushrooms', '🍄', 'g'], ['Potatoes', '🥔', 'pcs'],
  ['Sweet potatoes', '🍠', 'pcs'], ['Celery', '🥬', 'sticks'], ['Aubergine', '🍆', 'pcs'],
  ['Spring onions', '🧅', 'bunch'], ['Ginger', '🫚', 'g'], ['Avocado', '🥑', 'pcs'],
  ['Sweetcorn', '🌽', 'pcs'], ['Green beans', '🫛', 'g'],
]);

const fridgeFruit = build('fridge', 'Fruit', [
  ['Apples', '🍎', 'pcs'], ['Bananas', '🍌', 'pcs'], ['Oranges', '🍊', 'pcs'],
  ['Grapes', '🍇', 'bunch'], ['Strawberries', '🍓', 'punnet'], ['Blueberries', '🫐', 'punnet'],
  ['Lemons', '🍋', 'pcs'], ['Limes', '🍋', 'pcs'], ['Pears', '🍐', 'pcs'],
  ['Melon', '🍈', 'pcs'], ['Kiwi', '🥝', 'pcs'], ['Pineapple', '🍍', 'pcs'],
  ['Mango', '🥭', 'pcs'], ['Raspberries', '🍓', 'punnet'],
]);

const fridgeDairy = build('fridge', 'Dairy', [
  ['Milk', '🥛', 'ml'], ['Butter', '🧈', 'g'], ['Cheddar cheese', '🧀', 'g'],
  ['Mozzarella', '🧀', 'g'], ['Parmesan', '🧀', 'g'], ['Yoghurt', '🥣', 'g'],
  ['Cream', '🥛', 'ml'], ['Cream cheese', '🧀', 'g'], ['Feta cheese', '🧀', 'g'],
  ['Sour cream', '🥛', 'g'], ['Halloumi', '🧀', 'g'],
]);

const fridgeEggs = build('fridge', 'Eggs', [
  ['Eggs', '🥚', 'pcs'],
]);

const fridgeMeat = build('fridge', 'Meat', [
  ['Chicken breast', '🍗', 'g'], ['Chicken thighs', '🍗', 'g'], ['Minced beef', '🥩', 'g'],
  ['Beef steak', '🥩', 'g'], ['Pork chops', '🥩', 'g'], ['Bacon', '🥓', 'rashers'],
  ['Sausages', '🌭', 'pcs'], ['Lamb', '🥩', 'g'], ['Turkey mince', '🦃', 'g'],
]);

const fridgeFish = build('fridge', 'Fish', [
  ['Salmon fillets', '🐟', 'pcs'], ['Cod fillets', '🐟', 'pcs'], ['Prawns', '🦐', 'g'],
  ['Tuna steak', '🐟', 'pcs'], ['Smoked salmon', '🐟', 'g'],
]);

const fridgeDeli = build('fridge', 'Deli products', [
  ['Ham', '🥓', 'g'], ['Salami', '🍖', 'g'], ['Hummus', '🥣', 'g'],
  ['Olives', '🫒', 'g'], ['Pesto', '🥣', 'jar'], ['Chorizo', '🌭', 'g'],
]);

const fridgeSauces = build('fridge', 'Sauces', [
  ['Mayonnaise', '🥣', 'ml'], ['Ketchup', '🍅', 'ml'], ['Mustard', '🥣', 'ml'],
  ['Soy sauce', '🍶', 'ml'], ['Salad dressing', '🥣', 'ml'],
]);

const fridgeLeftovers = build('fridge', 'Leftovers', [
  ['Leftover rice', '🍚', 'g'], ['Leftover roast chicken', '🍗', 'g'],
  ['Leftover pasta', '🍝', 'g'], ['Leftover vegetables', '🥕', 'g'],
  ['Leftover curry', '🍛', 'g'],
]);

// ---------------- Freezer ----------------

const freezerVeg = build('freezer', 'Frozen vegetables', [
  ['Frozen peas', '🟢', 'g'], ['Frozen sweetcorn', '🌽', 'g'], ['Frozen mixed vegetables', '🥦', 'g'],
  ['Frozen spinach', '🥬', 'g'], ['Frozen broccoli', '🥦', 'g'],
]);

const freezerFruit = build('freezer', 'Frozen fruit', [
  ['Frozen berries', '🍓', 'g'], ['Frozen mango', '🥭', 'g'], ['Frozen banana', '🍌', 'g'],
]);

const freezerMeat = build('freezer', 'Meat', [
  ['Frozen chicken breast', '🍗', 'g'], ['Frozen minced beef', '🥩', 'g'], ['Frozen sausages', '🌭', 'pcs'],
]);

const freezerFish = build('freezer', 'Fish', [
  ['Frozen salmon', '🐟', 'pcs'], ['Frozen white fish', '🐟', 'pcs'], ['Frozen prawns', '🦐', 'g'],
]);

const freezerMeals = build('freezer', 'Frozen meals', [
  ['Frozen pizza', '🍕', 'pcs'], ['Frozen lasagne', '🍝', 'pcs'], ['Frozen fish fingers', '🐟', 'pcs'],
]);

const freezerBread = build('freezer', 'Bread', [
  ['Frozen bread', '🍞', 'loaf'], ['Frozen bread rolls', '🥖', 'pcs'], ['Frozen naan', '🫓', 'pcs'],
]);

const freezerOther = build('freezer', 'Other frozen foods', [
  ['Ice cream', '🍨', 'tub'], ['Frozen chips', '🍟', 'g'], ['Frozen dumplings', '🥟', 'pcs'],
]);

// ---------------- Pantry / Cupboard ----------------

const pantryPasta = build('pantry', 'Pasta', [
  ['Spaghetti', '🍝', 'g'], ['Penne', '🍝', 'g'], ['Fusilli', '🍝', 'g'],
  ['Lasagne sheets', '🍝', 'g'], ['Noodles', '🍜', 'g'],
]);

const pantryRice = build('pantry', 'Rice', [
  ['White rice', '🍚', 'g'], ['Basmati rice', '🍚', 'g'], ['Brown rice', '🍚', 'g'], ['Risotto rice', '🍚', 'g'],
]);

const pantryGrains = build('pantry', 'Grains', [
  ['Couscous', '🌾', 'g'], ['Quinoa', '🌾', 'g'], ['Bulgur wheat', '🌾', 'g'], ['Oats', '🌾', 'g'],
]);

const pantryFlour = build('pantry', 'Flour', [
  ['Plain flour', '🌾', 'g'], ['Self-raising flour', '🌾', 'g'], ['Bread flour', '🌾', 'g'],
]);

const pantryCanned = build('pantry', 'Canned food', [
  ['Chopped tomatoes', '🥫', 'tin'], ['Sweetcorn (tin)', '🥫', 'tin'], ['Tuna (tin)', '🥫', 'tin'],
  ['Coconut milk', '🥥', 'tin'], ['Chickpeas (tin)', '🥫', 'tin'],
]);

const pantryBeans = build('pantry', 'Beans and pulses', [
  ['Kidney beans', '🫘', 'tin'], ['Black beans', '🫘', 'tin'], ['Lentils', '🫘', 'g'],
  ['Butter beans', '🫘', 'tin'], ['Split peas', '🫘', 'g'],
]);

const pantryOils = build('pantry', 'Oils', [
  ['Olive oil', '🫒', 'ml'], ['Vegetable oil', '🛢️', 'ml'], ['Sesame oil', '🛢️', 'ml'],
]);

const pantrySauces = build('pantry', 'Sauces', [
  ['Passata', '🍅', 'jar'], ['Curry paste', '🥣', 'jar'], ['Stock cubes', '🧂', 'pcs'],
  ['Tomato puree', '🍅', 'tube'], ['Fish sauce', '🍶', 'ml'], ['Honey', '🍯', 'g'],
]);

const pantryHerbs = build('pantry', 'Herbs', [
  ['Basil', '🌿', 'g'], ['Coriander', '🌿', 'g'], ['Parsley', '🌿', 'g'], ['Mint', '🌿', 'g'],
]);

const pantrySpices = build('pantry', 'Spices', [
  ['Salt', '🧂', 'g'], ['Black pepper', '🧂', 'g'], ['Paprika', '🧂', 'g'], ['Cumin', '🧂', 'g'],
  ['Chilli flakes', '🌶️', 'g'], ['Turmeric', '🧂', 'g'], ['Garam masala', '🧂', 'g'], ['Cinnamon', '🧂', 'g'],
]);

const pantryBaking = build('pantry', 'Baking ingredients', [
  ['Sugar', '🧁', 'g'], ['Brown sugar', '🧁', 'g'], ['Baking powder', '🧁', 'g'],
  ['Vanilla extract', '🧁', 'ml'], ['Chocolate chips', '🍫', 'g'],
]);

const pantrySnacks = build('pantry', 'Snacks', [
  ['Crisps', '🥔', 'bag'], ['Crackers', '🍘', 'box'], ['Nuts', '🥜', 'g'],
  ['Raisins', '🍇', 'g'], ['Granola bars', '🍫', 'pcs'],
]);

const pantryStaples = build('pantry', 'Other staples', [
  ['Bread', '🍞', 'loaf'], ['Tortilla wraps', '🫓', 'pcs'], ['Pitta bread', '🫓', 'pcs'],
  ['Peanut butter', '🥜', 'g'], ['Jam', '🍓', 'g'],
]);

export const INGREDIENT_CATALOG: CatalogIngredient[] = [
  ...fridgeVegetables, ...fridgeFruit, ...fridgeDairy, ...fridgeEggs, ...fridgeMeat,
  ...fridgeFish, ...fridgeDeli, ...fridgeSauces, ...fridgeLeftovers,
  ...freezerVeg, ...freezerFruit, ...freezerMeat, ...freezerFish, ...freezerMeals, ...freezerBread, ...freezerOther,
  ...pantryPasta, ...pantryRice, ...pantryGrains, ...pantryFlour, ...pantryCanned, ...pantryBeans,
  ...pantryOils, ...pantrySauces, ...pantryHerbs, ...pantrySpices, ...pantryBaking, ...pantrySnacks, ...pantryStaples,
];

export const CATALOG_BY_ID: Record<string, CatalogIngredient> = Object.fromEntries(
  INGREDIENT_CATALOG.map((i) => [i.id, i])
);

export const SECTION_CATEGORIES: Record<StorageLocation, string[]> = {
  fridge: ['Vegetables', 'Fruit', 'Dairy', 'Eggs', 'Meat', 'Fish', 'Deli products', 'Sauces', 'Leftovers'],
  freezer: ['Frozen vegetables', 'Frozen fruit', 'Meat', 'Fish', 'Frozen meals', 'Bread', 'Other frozen foods'],
  pantry: [
    'Pasta', 'Rice', 'Grains', 'Flour', 'Canned food', 'Beans and pulses', 'Oils', 'Sauces',
    'Herbs', 'Spices', 'Baking ingredients', 'Snacks', 'Other staples',
  ],
};

export const SECTION_LABELS: Record<StorageLocation, string> = {
  fridge: 'Fridge',
  freezer: 'Freezer',
  pantry: 'Pantry / Cupboard',
};

/** Best-effort resolution of a free-text ingredient name to a catalog entry (used for custom items & recipe matching). */
export function findCatalogByName(name: string): CatalogIngredient | undefined {
  const n = name.trim().toLowerCase();
  return INGREDIENT_CATALOG.find((i) => i.name.toLowerCase() === n);
}
