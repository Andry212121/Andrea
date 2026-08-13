import type { CuisineTag, DietTag, MealStyleTag, WorkLunchStyle } from '../types';

export const DIET_OPTIONS: { id: DietTag; label: string; emoji: string }[] = [
  { id: 'no-restrictions', label: 'No restrictions', emoji: '🍽️' },
  { id: 'vegetarian', label: 'Vegetarian', emoji: '🥦' },
  { id: 'vegan', label: 'Vegan', emoji: '🌱' },
  { id: 'pescatarian', label: 'Pescatarian', emoji: '🐟' },
  { id: 'gluten-free', label: 'Gluten-free', emoji: '🌾' },
  { id: 'dairy-free', label: 'Dairy-free', emoji: '🥛' },
  { id: 'low-carb', label: 'Low-carb', emoji: '🥩' },
  { id: 'high-protein', label: 'High-protein', emoji: '💪' },
  { id: 'mediterranean', label: 'Mediterranean', emoji: '🫒' },
];

export const COMMON_ALLERGIES = ['Nuts', 'Peanuts', 'Gluten', 'Dairy', 'Egg', 'Shellfish', 'Fish', 'Soy', 'Sesame'];

export const CUISINE_OPTIONS: { id: CuisineTag; emoji: string }[] = [
  { id: 'Italian', emoji: '🍝' }, { id: 'Mediterranean', emoji: '🥙' }, { id: 'British', emoji: '🍗' },
  { id: 'Mexican', emoji: '🌮' }, { id: 'Indian', emoji: '🍛' }, { id: 'Chinese', emoji: '🥢' },
  { id: 'Japanese', emoji: '🍣' }, { id: 'Thai', emoji: '🌶️' }, { id: 'Middle Eastern', emoji: '🧆' },
  { id: 'American', emoji: '🍔' }, { id: 'French', emoji: '🥐' }, { id: 'Greek', emoji: '🥗' },
  { id: 'International', emoji: '🌍' },
];

export const MEAL_STYLE_OPTIONS: { id: MealStyleTag; emoji: string }[] = [
  { id: 'Quick meal', emoji: '⚡' }, { id: 'Family meal', emoji: '👨‍👩‍👧‍👦' }, { id: 'Healthy meal', emoji: '🥗' },
  { id: 'Light meal', emoji: '🍃' }, { id: 'Comfort food', emoji: '🍲' }, { id: 'High-protein', emoji: '💪' },
  { id: 'Budget meal', emoji: '💰' }, { id: 'Meal prep', emoji: '📦' }, { id: 'Kid-friendly', emoji: '🧒' },
  { id: 'Use leftovers', emoji: '♻️' }, { id: 'Use ingredients expiring soon', emoji: '⏳' },
];

export const QUICK_COOK_TIMES = [10, 15, 20, 30];

export const WORK_LUNCH_STYLES: { id: WorkLunchStyle; emoji: string }[] = [
  { id: 'Quick lunch', emoji: '⚡' },
  { id: 'Healthy lunch', emoji: '🥗' },
  { id: 'High-protein lunch', emoji: '💪' },
  { id: 'Leftovers', emoji: '♻️' },
  { id: 'Meal-prep lunch', emoji: '📦' },
  { id: 'No-reheat lunch', emoji: '🧊' },
];

export const MEAL_TYPE_META: Record<string, { label: string; emoji: string }> = {
  breakfast: { label: 'Breakfast', emoji: '🍳' },
  lunch: { label: 'Lunch', emoji: '🥪' },
  dinner: { label: 'Dinner', emoji: '🍽️' },
  snack: { label: 'Snack', emoji: '🍎' },
};
