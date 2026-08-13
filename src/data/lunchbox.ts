export interface LunchboxOption {
  name: string;
  emoji: string;
  allergens: string[];
}

// Curated packed-lunch building blocks. Kept separate from the main recipe database because
// lunchbox items are often simple combinations rather than full cooked recipes.

export const LUNCH_MAINS: LunchboxOption[] = [
  { name: 'Cheese & ham sandwich', emoji: '🥪', allergens: ['gluten', 'dairy'] },
  { name: 'Chicken wrap', emoji: '🌯', allergens: ['gluten'] },
  { name: 'Pasta salad', emoji: '🍝', allergens: ['gluten'] },
  { name: 'Hummus & veggie pitta', emoji: '🧆', allergens: ['gluten'] },
  { name: 'Egg & cress sandwich', emoji: '🥪', allergens: ['gluten', 'egg'] },
  { name: 'Tuna pasta pot', emoji: '🥗', allergens: ['gluten', 'fish'] },
  { name: 'Mini quiche', emoji: '🥧', allergens: ['gluten', 'egg', 'dairy'] },
  { name: 'Peanut butter sandwich', emoji: '🥪', allergens: ['gluten', 'nuts'] },
  { name: 'Cold pizza slice', emoji: '🍕', allergens: ['gluten', 'dairy'] },
  { name: 'Falafel & salad wrap', emoji: '🌯', allergens: ['gluten'] },
  { name: 'Cheese & crackers box', emoji: '🧀', allergens: ['gluten', 'dairy'] },
  { name: 'Rice & vegetable pot', emoji: '🍚', allergens: [] },
];

export const LUNCH_FRUIT: LunchboxOption[] = [
  { name: 'Apple slices', emoji: '🍎', allergens: [] },
  { name: 'Banana', emoji: '🍌', allergens: [] },
  { name: 'Grapes', emoji: '🍇', allergens: [] },
  { name: 'Satsuma', emoji: '🍊', allergens: [] },
  { name: 'Berries pot', emoji: '🍓', allergens: [] },
  { name: 'Pear', emoji: '🍐', allergens: [] },
  { name: 'Melon chunks', emoji: '🍈', allergens: [] },
  { name: 'Pineapple chunks', emoji: '🍍', allergens: [] },
];

export const LUNCH_VEG: LunchboxOption[] = [
  { name: 'Carrot sticks', emoji: '🥕', allergens: [] },
  { name: 'Cucumber sticks', emoji: '🥒', allergens: [] },
  { name: 'Cherry tomatoes', emoji: '🍅', allergens: [] },
  { name: 'Pepper strips', emoji: '🫑', allergens: [] },
  { name: 'Sugar snap peas', emoji: '🫛', allergens: [] },
  { name: 'Mini corn on the cob', emoji: '🌽', allergens: [] },
];

export const LUNCH_SNACK: LunchboxOption[] = [
  { name: 'Granola bar', emoji: '🍫', allergens: ['nuts', 'gluten'] },
  { name: 'Rice cakes', emoji: '🍘', allergens: [] },
  { name: 'Breadsticks', emoji: '🥖', allergens: ['gluten'] },
  { name: 'Popcorn', emoji: '🍿', allergens: [] },
  { name: 'Crackers', emoji: '🍘', allergens: ['gluten'] },
  { name: 'Trail mix', emoji: '🥜', allergens: ['nuts'] },
  { name: 'Mini muffin', emoji: '🧁', allergens: ['gluten', 'egg', 'dairy'] },
];

export const LUNCH_DAIRY: LunchboxOption[] = [
  { name: 'Yoghurt pot', emoji: '🥣', allergens: ['dairy'] },
  { name: 'Cheese string', emoji: '🧀', allergens: ['dairy'] },
  { name: 'Fromage frais', emoji: '🥣', allergens: ['dairy'] },
  { name: 'Milk carton', emoji: '🥛', allergens: ['dairy'] },
  { name: 'Dairy-free yoghurt', emoji: '🥣', allergens: [] },
];

export const LUNCH_DRINK: LunchboxOption[] = [
  { name: 'Water bottle', emoji: '💧', allergens: [] },
  { name: 'Diluted juice', emoji: '🧃', allergens: [] },
  { name: 'Milk', emoji: '🥛', allergens: ['dairy'] },
  { name: 'Smoothie', emoji: '🥤', allergens: [] },
];
