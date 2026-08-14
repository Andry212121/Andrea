import type {
  CuisineTag, Day, DietTag, Difficulty, LunchItemSlot, MealSlotType, MealStyleTag,
  ShoppingCategory, StorageLocation, WorkLunchStyle,
} from '../types';

type Lang = 'en' | 'it';

function pick<T extends string>(en: T, it: string, lang: Lang): string {
  return lang === 'en' ? en : it;
}

// ---------- Diet ----------
const DIET_IT: Record<DietTag, string> = {
  'no-restrictions': 'Nessuna restrizione', vegetarian: 'Vegetariano', vegan: 'Vegano',
  pescatarian: 'Pescetariano', 'gluten-free': 'Senza glutine', 'dairy-free': 'Senza lattosio',
  'low-carb': 'Pochi carboidrati', 'high-protein': 'Ricco di proteine', mediterranean: 'Mediterraneo',
};
export function dietLabel(d: DietTag, lang: Lang): string {
  return pick(d, DIET_IT[d], lang);
}

// ---------- Cuisine ----------
const CUISINE_IT: Record<CuisineTag, string> = {
  Italian: 'Italiana', Mediterranean: 'Mediterranea', British: 'Britannica', Mexican: 'Messicana',
  Indian: 'Indiana', Chinese: 'Cinese', Japanese: 'Giapponese', Thai: 'Thailandese',
  'Middle Eastern': 'Mediorientale', American: 'Americana', French: 'Francese', Greek: 'Greca',
  International: 'Internazionale',
};
export function cuisineLabel(c: CuisineTag, lang: Lang): string {
  return pick(c, CUISINE_IT[c], lang);
}

// ---------- Meal style ----------
const MEAL_STYLE_IT: Record<MealStyleTag, string> = {
  'Quick meal': 'Pasto veloce', 'Family meal': 'Pasto in famiglia', 'Healthy meal': 'Pasto sano',
  'Light meal': 'Pasto leggero', 'Comfort food': 'Cibo confortante', 'High-protein': 'Ricco di proteine',
  'Budget meal': 'Pasto economico', 'Meal prep': 'Meal prep', 'Kid-friendly': 'Adatto ai bambini',
  'Use leftovers': 'Usa gli avanzi', 'Use ingredients expiring soon': 'Usa ingredienti in scadenza',
};
export function mealStyleLabel(s: MealStyleTag, lang: Lang): string {
  return pick(s, MEAL_STYLE_IT[s], lang);
}

// ---------- Work lunch style ----------
const WORK_LUNCH_IT: Record<WorkLunchStyle, string> = {
  'Quick lunch': 'Pranzo veloce', 'Healthy lunch': 'Pranzo sano', 'High-protein lunch': 'Pranzo proteico',
  Leftovers: 'Avanzi', 'Meal-prep lunch': 'Pranzo meal-prep', 'No-reheat lunch': 'Pranzo senza riscaldare',
};
export function workLunchStyleLabel(s: WorkLunchStyle, lang: Lang): string {
  return pick(s, WORK_LUNCH_IT[s], lang);
}

// ---------- Allergies (common list shown as chips) ----------
const ALLERGY_IT: Record<string, string> = {
  Nuts: 'Frutta a guscio', Peanuts: 'Arachidi', Gluten: 'Glutine', Dairy: 'Latticini', Egg: 'Uovo',
  Shellfish: 'Crostacei', Fish: 'Pesce', Soy: 'Soia', Sesame: 'Sesamo',
};
export function allergyLabel(a: string, lang: Lang): string {
  if (lang === 'en') return a;
  return ALLERGY_IT[a] ?? a;
}
const ALLERGEN_TAG_IT: Record<string, string> = {
  gluten: 'glutine', dairy: 'latticini', egg: 'uovo', fish: 'pesce', shellfish: 'crostacei',
  nuts: 'frutta a guscio', soy: 'soia', sesame: 'sesamo',
};
export function allergenTagLabel(a: string, lang: Lang): string {
  if (lang === 'en') return a;
  return ALLERGEN_TAG_IT[a.toLowerCase()] ?? a;
}

// ---------- Days ----------
const DAY_IT: Record<Day, string> = {
  Mon: 'Lun', Tue: 'Mar', Wed: 'Mer', Thu: 'Gio', Fri: 'Ven', Sat: 'Sab', Sun: 'Dom',
};
const DAY_IT_FULL: Record<Day, string> = {
  Mon: 'Lunedì', Tue: 'Martedì', Wed: 'Mercoledì', Thu: 'Giovedì', Fri: 'Venerdì', Sat: 'Sabato', Sun: 'Domenica',
};
export function dayLabel(d: Day, lang: Lang): string {
  return pick(d, DAY_IT[d], lang);
}
export function dayLabelFull(d: Day, lang: Lang): string {
  return pick(d, DAY_IT_FULL[d], lang);
}

// ---------- Meal type ----------
const MEAL_TYPE_IT: Record<MealSlotType, string> = {
  breakfast: 'Colazione', lunch: 'Pranzo', dinner: 'Cena', snack: 'Spuntino',
};
export function mealTypeLabel(t: MealSlotType, lang: Lang): string {
  return pick(t, MEAL_TYPE_IT[t], lang);
}

// ---------- Storage location / category ----------
const SECTION_IT: Record<StorageLocation, string> = { fridge: 'Frigo', freezer: 'Freezer', pantry: 'Dispensa' };
const SECTION_SHORT_IT: Record<StorageLocation, string> = { fridge: 'Frigo', freezer: 'Freezer', pantry: 'Dispensa' };
export function sectionLabel(s: StorageLocation, lang: Lang): string {
  return pick(s === 'fridge' ? 'Fridge' : s === 'freezer' ? 'Freezer' : 'Pantry / Cupboard', SECTION_IT[s], lang);
}
export function sectionShortLabel(s: StorageLocation, lang: Lang): string {
  return pick(s === 'fridge' ? 'Fridge' : s === 'freezer' ? 'Freezer' : 'Pantry', SECTION_SHORT_IT[s], lang);
}

const CATEGORY_IT: Record<string, string> = {
  Vegetables: 'Verdure', Fruit: 'Frutta', Dairy: 'Latticini', Eggs: 'Uova', Meat: 'Carne', Fish: 'Pesce',
  'Deli products': 'Salumeria', Sauces: 'Salse', Leftovers: 'Avanzi',
  'Frozen vegetables': 'Verdure surgelate', 'Frozen fruit': 'Frutta surgelata',
  'Frozen meals': 'Piatti pronti surgelati', Bread: 'Pane', 'Other frozen foods': 'Altri surgelati',
  Pasta: 'Pasta', Rice: 'Riso', Grains: 'Cereali', Flour: 'Farine', 'Canned food': 'Cibo in scatola',
  'Beans and pulses': 'Legumi', Oils: 'Oli', Herbs: 'Erbe aromatiche', Spices: 'Spezie',
  'Baking ingredients': 'Ingredienti da forno', Snacks: 'Snack', 'Other staples': 'Altri alimenti base',
};
export function categoryLabel(c: string, lang: Lang): string {
  if (lang === 'en') return c;
  return CATEGORY_IT[c] ?? c;
}

// ---------- Shopping categories ----------
const SHOPPING_CATEGORY_IT: Record<ShoppingCategory, string> = {
  'Fruit & vegetables': 'Frutta e verdura', 'Meat & fish': 'Carne e pesce', Dairy: 'Latticini',
  Bakery: 'Panetteria', Pantry: 'Dispensa', Frozen: 'Surgelati', Other: 'Altro',
};
export function shoppingCategoryLabel(c: ShoppingCategory, lang: Lang): string {
  return pick(c, SHOPPING_CATEGORY_IT[c], lang);
}

// ---------- Lunchbox item slots ----------
const LUNCH_SLOT_IT: Record<LunchItemSlot, string> = {
  main: 'Principale', fruit: 'Frutta', veg: 'Verdura', snack: 'Snack', dairy: 'Latticini', drink: 'Bevanda',
};
export function lunchSlotLabel(s: LunchItemSlot, lang: Lang): string {
  return pick(
    s === 'main' ? 'Main' : s === 'fruit' ? 'Fruit' : s === 'veg' ? 'Veg' : s === 'snack' ? 'Snack' : s === 'dairy' ? 'Dairy' : 'Drink',
    LUNCH_SLOT_IT[s],
    lang
  );
}

// ---------- Ingredient units ----------
const UNIT_IT: Record<string, string> = {
  bag: 'sacchetto', bagel: 'bagel', box: 'confezione', bunch: 'mazzo', cloves: 'spicchi', g: 'g',
  head: 'cespo', jar: 'vasetto', loaf: 'pagnotta', ml: 'ml', pcs: 'pz', punnet: 'cestino',
  rashers: 'fette', rolls: 'panini', slices: 'fette', sticks: 'gambi', tbsp: 'cucchiaio',
  tin: 'lattina', tsp: 'cucchiaino', tub: 'vaschetta', tube: 'tubetto',
};
export function unitLabel(unit: string, lang: Lang): string {
  if (lang === 'en') return unit;
  return UNIT_IT[unit] ?? unit;
}

// ---------- Difficulty ----------
const DIFFICULTY_IT: Record<Difficulty, string> = { Easy: 'Facile', Medium: 'Media', Hard: 'Difficile' };
export function difficultyLabel(d: Difficulty, lang: Lang): string {
  return pick(d, DIFFICULTY_IT[d], lang);
}
