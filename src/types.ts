// ---------- Core enums / string unions ----------

export type StorageLocation = 'fridge' | 'freezer' | 'pantry';

export type DietTag =
  | 'no-restrictions'
  | 'vegetarian'
  | 'vegan'
  | 'pescatarian'
  | 'gluten-free'
  | 'dairy-free'
  | 'low-carb'
  | 'high-protein'
  | 'mediterranean';

export type CuisineTag =
  | 'Italian'
  | 'Mediterranean'
  | 'British'
  | 'Mexican'
  | 'Indian'
  | 'Chinese'
  | 'Japanese'
  | 'Thai'
  | 'Middle Eastern'
  | 'American'
  | 'French'
  | 'Greek'
  | 'International';

export type MealStyleTag =
  | 'Quick meal'
  | 'Family meal'
  | 'Healthy meal'
  | 'Light meal'
  | 'Comfort food'
  | 'High-protein'
  | 'Budget meal'
  | 'Meal prep'
  | 'Kid-friendly'
  | 'Use leftovers'
  | 'Use ingredients expiring soon';

export type MealSlotType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = (typeof DAYS)[number];

// ---------- Household / onboarding ----------

export interface Child {
  id: string;
  age: number;
}

export interface HouseholdPreferences {
  onboarded: boolean;
  adults: number;
  children: Child[];
  diets: DietTag[];
  allergies: string[];
  dislikes: string[];
  cuisines: CuisineTag[];
  mealStyles: MealStyleTag[];
  defaultServings: number;
}

// ---------- Ingredients / pantry ----------

export interface CatalogIngredient {
  id: string;
  name: string;
  emoji: string;
  section: StorageLocation;
  category: string;
  defaultUnit: string;
}

export interface PantryItem {
  id: string;
  ingredientId: string;
  name: string;
  emoji: string;
  section: StorageLocation;
  category: string;
  have: boolean;
  quantity?: number;
  unit?: string;
  expiry?: string; // ISO date
  custom?: boolean;
  addedAt: string;
}

// ---------- Recipes ----------

export interface RecipeIngredient {
  ingredientId: string;
  name: string;
  qty: number;
  unit: string;
  optional?: boolean;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  cuisine: CuisineTag;
  mealTypes: MealSlotType[];
  tags: MealStyleTag[];
  diets: DietTag[];
  allergens: string[];
  prepTime: number;
  cookTime: number;
  difficulty: Difficulty;
  baseServings: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  nutrition: Nutrition;
  emoji: string;
  gradient: string;
  substitutions?: { ingredientId: string; alt: string }[];
  lunchbox?: boolean; // suitable for packed lunches
  noReheat?: boolean;
}

// ---------- Meal plan ----------

export interface SlotPeople {
  adults: number;
  children: number;
}

export interface PlannedMeal {
  recipeId: string;
  servings: number;
  cookedAt?: string;
  allocatedIngredientIds: string[];
}

export interface MealSlot {
  day: Day;
  type: MealSlotType;
  enabled: boolean;
  people: SlotPeople;
  styleFilters: MealStyleTag[];
  maxCookTime?: number;
  meal?: PlannedMeal;
}

export type SlotKey = `${Day}-${MealSlotType}`;

export interface WeekPlan {
  weekStart: string;
  slots: Record<string, MealSlot>;
}

// ---------- Pack lunch ----------

export type LunchItemSlot = 'main' | 'fruit' | 'veg' | 'snack' | 'dairy' | 'drink';

export interface LunchItem {
  slot: LunchItemSlot;
  name: string;
  emoji: string;
}

export interface PackedLunch {
  day: Day;
  ownerId: string; // child id or 'adult'
  items: LunchItem[];
  recipeId?: string;
}

export type WorkLunchStyle =
  | 'Quick lunch'
  | 'Healthy lunch'
  | 'High-protein lunch'
  | 'Leftovers'
  | 'Meal-prep lunch'
  | 'No-reheat lunch';

// ---------- Shopping list ----------

export type ShoppingCategory =
  | 'Fruit & vegetables'
  | 'Meat & fish'
  | 'Dairy'
  | 'Bakery'
  | 'Pantry'
  | 'Frozen'
  | 'Other';

export interface ShoppingItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  qty?: number;
  unit?: string;
  checked: boolean;
  source: 'auto' | 'manual';
  ingredientId?: string;
}

export type Page = 'home' | 'mealplan' | 'myfood' | 'packlunch' | 'shopping' | 'settings';
