import { useEffect, useState } from 'react';
import type {
  HouseholdPreferences, PantryItem, WeekPlan, MealSlot, MealSlotType, Day, SlotPeople,
  MealStyleTag, ShoppingItem, PackedLunch, WorkLunchStyle, CatalogIngredient, StorageLocation,
} from './types';
import { DAYS } from './types';
import { RECIPES, RECIPES_BY_ID } from './data/recipes';
import { getMondayISO, todayDay } from './utils/date';
import {
  computeAvailability, generateMealOptions, matchRecipe, getExpiringIngredientIds,
  type GenContext, type GeneratedOption,
} from './utils/mealGenerator';
import { generateSchoolWeek, generateWorkWeek, generateSchoolLunch, generateWorkLunch } from './utils/lunchGenerator';
import { buildAutoShoppingItems } from './utils/shoppingList';
import { t, type Lang, type StringKey } from './i18n';

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}

const DEFAULT_PREFS: HouseholdPreferences = {
  onboarded: false,
  adults: 2,
  children: [],
  diets: [],
  allergies: [],
  dislikes: [],
  cuisines: [],
  mealStyles: [],
  defaultServings: 2,
};

export const MEAL_TYPES: MealSlotType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export function slotKey(day: Day, type: MealSlotType): string {
  return `${day}-${type}`;
}

function buildDefaultWeek(prefs: HouseholdPreferences): WeekPlan {
  const slots: Record<string, MealSlot> = {};
  for (const day of DAYS) {
    for (const type of MEAL_TYPES) {
      slots[slotKey(day, type)] = {
        day,
        type,
        enabled: type === 'dinner',
        people: { adults: prefs.adults, children: prefs.children.length },
        styleFilters: [],
      };
    }
  }
  return { weekStart: getMondayISO(), slots };
}

export function useAppStore() {
  const [prefs, setPrefsState] = useLocalStorage<HouseholdPreferences>('pp_prefs', DEFAULT_PREFS);
  const [pantry, setPantry] = useLocalStorage<PantryItem[]>('pp_pantry', []);
  const [weekPlan, setWeekPlan] = useLocalStorage<WeekPlan>('pp_week', buildDefaultWeek(DEFAULT_PREFS));
  const [schoolLunches, setSchoolLunches] = useLocalStorage<PackedLunch[]>('pp_school_lunches', []);
  const [workLunches, setWorkLunches] = useLocalStorage<PackedLunch[]>('pp_work_lunches', []);
  const [shoppingItems, setShoppingItems] = useLocalStorage<ShoppingItem[]>('pp_shopping', []);
  const [language, setLanguage] = useLocalStorage<Lang>('pp_language', 'en');

  // Roll over to a fresh (empty) week automatically once Monday passes.
  // Intentionally runs once on mount only — this is a startup check, not a live sync.
  useEffect(() => {
    const currentMonday = getMondayISO();
    if (weekPlan.weekStart !== currentMonday) {
      setWeekPlan(buildDefaultWeek(prefs));
    }
  }, []);

  // ---------- Preferences ----------

  const setPrefs = (partial: Partial<HouseholdPreferences>) => {
    setPrefsState((prev) => ({ ...prev, ...partial }));
  };

  const completeOnboarding = (finalPrefs: Omit<HouseholdPreferences, 'onboarded'>) => {
    const full = { ...finalPrefs, onboarded: true };
    setPrefsState(full);
    setWeekPlan(buildDefaultWeek(full));
  };

  // ---------- Pantry ----------

  const pantryByIngredient = new Map(pantry.map((p) => [p.ingredientId, p]));

  const toggleCatalogItem = (catalogItem: CatalogIngredient) => {
    const existing = pantryByIngredient.get(catalogItem.id);
    if (existing) {
      setPantry((prev) => prev.filter((p) => p.id !== existing.id));
    } else {
      const item: PantryItem = {
        id: crypto.randomUUID(),
        ingredientId: catalogItem.id,
        name: catalogItem.name,
        emoji: catalogItem.emoji,
        section: catalogItem.section,
        category: catalogItem.category,
        have: true,
        unit: catalogItem.defaultUnit,
        addedAt: new Date().toISOString(),
      };
      setPantry((prev) => [...prev, item]);
    }
  };

  const addCustomItem = (input: { name: string; section: StorageLocation; category: string; emoji?: string }) => {
    const id = crypto.randomUUID();
    const item: PantryItem = {
      id,
      ingredientId: `custom-${input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${id.slice(0, 6)}`,
      name: input.name,
      emoji: input.emoji || '🍽️',
      section: input.section,
      category: input.category,
      have: true,
      custom: true,
      addedAt: new Date().toISOString(),
    };
    setPantry((prev) => [...prev, item]);
    return item;
  };

  const updatePantryItem = (id: string, patch: Partial<PantryItem>) => {
    setPantry((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const removePantryItem = (id: string) => {
    setPantry((prev) => prev.filter((p) => p.id !== id));
  };

  const expiringIngredientIds = getExpiringIngredientIds(pantry);
  const expiringItems = pantry.filter((p) => p.have && expiringIngredientIds.has(p.ingredientId));

  // ---------- Meal planning ----------

  const updateSlot = (day: Day, type: MealSlotType, patch: Partial<MealSlot>) => {
    setWeekPlan((prev) => ({
      ...prev,
      slots: { ...prev.slots, [slotKey(day, type)]: { ...prev.slots[slotKey(day, type)], ...patch } },
    }));
  };

  const toggleSlotEnabled = (day: Day, type: MealSlotType) => {
    const s = weekPlan.slots[slotKey(day, type)];
    updateSlot(day, type, { enabled: !s.enabled });
  };

  const setSlotPeople = (day: Day, type: MealSlotType, people: SlotPeople) => updateSlot(day, type, { people });
  const setSlotStyleFilters = (day: Day, type: MealSlotType, styleFilters: MealStyleTag[]) =>
    updateSlot(day, type, { styleFilters });
  const setSlotMaxCookTime = (day: Day, type: MealSlotType, maxCookTime: number | undefined) =>
    updateSlot(day, type, { maxCookTime });

  const genContextFor = (day: Day, type: MealSlotType): GenContext => {
    const s = weekPlan.slots[slotKey(day, type)];
    return {
      prefs,
      mealType: type,
      people: s.people,
      styleFilters: s.styleFilters,
      maxCookTime: s.maxCookTime,
      expiringIngredientIds,
    };
  };

  const getOptionsForSlot = (day: Day, type: MealSlotType, count = 3, excludeIds: string[] = []): GeneratedOption[] => {
    const availability = computeAvailability(pantry, weekPlan, slotKey(day, type));
    const pool = excludeIds.length ? RECIPES.filter((r) => !excludeIds.includes(r.id)) : RECIPES;
    return generateMealOptions(genContextFor(day, type), availability, count, pool);
  };

  const activeMealTypes = MEAL_TYPES.filter((t) => DAYS.some((d) => weekPlan.slots[slotKey(d, t)]?.enabled));

  const toggleMealTypeActive = (type: MealSlotType) => {
    const isActive = DAYS.some((d) => weekPlan.slots[slotKey(d, type)]?.enabled);
    setWeekPlan((prev) => {
      const slots = { ...prev.slots };
      for (const d of DAYS) {
        slots[slotKey(d, type)] = { ...slots[slotKey(d, type)], enabled: !isActive };
      }
      return { ...prev, slots };
    });
  };

  const selectMealForSlot = (day: Day, type: MealSlotType, recipeId: string) => {
    const recipe = RECIPES_BY_ID[recipeId];
    if (!recipe) return;
    const s = weekPlan.slots[slotKey(day, type)];
    const servings = Math.max(1, s.people.adults + s.people.children);
    const availability = computeAvailability(pantry, weekPlan, slotKey(day, type));
    const match = matchRecipe(recipe, servings, availability);
    updateSlot(day, type, {
      meal: { recipeId, servings, allocatedIngredientIds: match.allocatedIngredientIds },
    });
  };

  const changeServings = (day: Day, type: MealSlotType, servings: number) => {
    const s = weekPlan.slots[slotKey(day, type)];
    if (!s.meal) return;
    const recipe = RECIPES_BY_ID[s.meal.recipeId];
    const availability = computeAvailability(pantry, weekPlan, slotKey(day, type));
    const match = recipe ? matchRecipe(recipe, Math.max(1, servings), availability) : null;
    updateSlot(day, type, {
      meal: { ...s.meal, servings: Math.max(1, servings), allocatedIngredientIds: match?.allocatedIngredientIds ?? s.meal.allocatedIngredientIds },
    });
  };

  const removeMealFromSlot = (day: Day, type: MealSlotType) => {
    updateSlot(day, type, { meal: undefined });
  };

  const cookMeal = (day: Day, type: MealSlotType) => {
    const s = weekPlan.slots[slotKey(day, type)];
    if (!s.meal) return;
    const recipe = RECIPES_BY_ID[s.meal.recipeId];
    if (!recipe) return;
    const scale = s.meal.servings / recipe.baseServings;

    setPantry((prev) =>
      prev.map((item) => {
        const used = recipe.ingredients.find((i) => i.ingredientId === item.ingredientId && !i.optional);
        if (!used || !item.have) return item;
        if (item.quantity !== undefined) {
          const remaining = Math.max(0, item.quantity - used.qty * scale);
          return { ...item, quantity: remaining, have: remaining > 0 };
        }
        // No tracked quantity: perishable single-use categories are treated as consumed.
        const limited = ['Meat', 'Fish', 'Dairy', 'Eggs', 'Deli products', 'Leftovers', 'Frozen meals', 'Bread'].includes(item.category);
        return limited ? { ...item, have: false } : item;
      })
    );

    updateSlot(day, type, { meal: { ...s.meal, cookedAt: new Date().toISOString() } });
  };

  // ---------- Pack lunches ----------

  const schoolDays: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const generateSchoolLunchWeek = (childId: string) => {
    const generated = generateSchoolWeek(childId, prefs, schoolDays);
    setSchoolLunches((prev) => [...prev.filter((l) => l.ownerId !== childId), ...generated]);
  };

  const regenerateSchoolDay = (childId: string, day: Day) => {
    const usedMains = new Set(schoolLunches.filter((l) => l.ownerId === childId && l.day !== day).map((l) => l.items.find((i) => i.slot === 'main')?.name ?? ''));
    const usedSnacks = new Set(schoolLunches.filter((l) => l.ownerId === childId && l.day !== day).map((l) => l.items.find((i) => i.slot === 'snack')?.name ?? ''));
    const lunch = generateSchoolLunch(day, childId, prefs, { mains: usedMains, snacks: usedSnacks });
    setSchoolLunches((prev) => [...prev.filter((l) => !(l.ownerId === childId && l.day === day)), lunch]);
  };

  const generateWorkLunchWeek = (style: WorkLunchStyle) => {
    const generated = generateWorkWeek(style, prefs, pantry, weekPlan, schoolDays);
    setWorkLunches(generated);
  };

  const regenerateWorkDay = (day: Day, style: WorkLunchStyle) => {
    const used = new Set(workLunches.filter((l) => l.day !== day && l.recipeId).map((l) => l.recipeId!));
    const lunch = generateWorkLunch(day, style, prefs, pantry, weekPlan, used);
    if (lunch) setWorkLunches((prev) => [...prev.filter((l) => l.day !== day), lunch]);
  };

  // ---------- Shopping list ----------

  const refreshShoppingList = () => {
    const auto = buildAutoShoppingItems(weekPlan, pantry);
    setShoppingItems((prev) => [...prev.filter((i) => i.source === 'manual'), ...auto]);
  };

  const addManualShoppingItem = (name: string, category: ShoppingItem['category']) => {
    setShoppingItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, category, checked: false, source: 'manual' },
    ]);
  };

  const removeShoppingItem = (id: string) => setShoppingItems((prev) => prev.filter((i) => i.id !== id));

  const toggleShoppingChecked = (id: string) =>
    setShoppingItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));

  const addCheckedToMyFood = () => {
    const checked = shoppingItems.filter((i) => i.checked);
    for (const item of checked) {
      const already = item.ingredientId && pantryByIngredient.get(item.ingredientId);
      if (already) {
        updatePantryItem(already.id, { have: true });
      } else {
        addCustomItem({
          name: item.name,
          section: item.category === 'Frozen' ? 'freezer' : 'pantry',
          category: item.category,
        });
      }
    }
    setShoppingItems((prev) => prev.filter((i) => !i.checked));
  };

  const tt = (key: StringKey, vars?: Record<string, string | number>) => t(language, key, vars);

  return {
    language, setLanguage, t: tt,
    prefs, setPrefs, completeOnboarding,
    pantry, pantryByIngredient, toggleCatalogItem, addCustomItem, updatePantryItem, removePantryItem,
    expiringItems, expiringIngredientIds,
    weekPlan, toggleSlotEnabled, setSlotPeople, setSlotStyleFilters, setSlotMaxCookTime,
    activeMealTypes, toggleMealTypeActive,
    getOptionsForSlot, selectMealForSlot, changeServings, removeMealFromSlot, cookMeal,
    schoolLunches, generateSchoolLunchWeek, regenerateSchoolDay,
    workLunches, generateWorkLunchWeek, regenerateWorkDay,
    shoppingItems, refreshShoppingList, addManualShoppingItem, removeShoppingItem, toggleShoppingChecked, addCheckedToMyFood,
    todayDay: todayDay(),
  };
}

export type AppStore = ReturnType<typeof useAppStore>;
