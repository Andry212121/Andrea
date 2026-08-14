# Changelog

All notable changes to this template are documented here.

## 1.0.0 — Initial release

**Core app**
- Onboarding flow (household, diet, allergies, dislikes, cuisines, meal styles, servings)
- Preferences screen — every onboarding choice editable afterward
- My Food: ~150-item categorised pantry/fridge/freezer catalog with custom items, quantity and expiry tracking
- Meal Plan: Monday–Sunday planner with per-slot people count, meal-style and cook-time filters, 2–3 ranked recipe options per slot
- Recipe engine: dynamic diet/allergen/dislike filtering, cuisine and expiring-ingredient scoring, ingredient availability matching — 51 recipes across 13 cuisines
- Recipe detail screen: scaled ingredients, have-vs-need list, steps, nutrition, allergens, substitutions, "Cook this meal" inventory deduction
- Pack Lunch: school (Mon–Fri, varied per day) and work (6 lunch styles) planners
- Shopping List: auto-generated from the week's plan, category-grouped, manual add/remove, "add checked items to My Food"
- Home dashboard: today's meals, "What can I cook?", expiring-soon ingredients, quick links
- PWA support (installable, offline-capable)

**Internationalization**
- Full English and Italian translations: all UI copy, all 51 recipes, ~200-item food name dictionary, all enum labels (diets, cuisines, allergens, meal styles, units, days, categories)
- Language switchable anytime from Preferences, persisted per device

**Engineering**
- React 19 + TypeScript (strict), Vite 8, Tailwind CSS v4
- Zero backend/API-key dependency — fully static, deployable anywhere
- `oxlint` clean, `tsc --noEmit` clean, verified end-to-end with automated browser walkthroughs in both languages
