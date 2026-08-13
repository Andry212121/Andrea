# PantryPal — Smart Pantry & Meal Planning App

A mobile-first web app that plans meals around the food you already have at
home — reducing food waste, simplifying weekly planning, and answering the
daily question: **"What can I cook with what I already have?"**

## Core idea

> The meal plan adapts to your kitchen, rather than requiring you to shop for
> an entirely new meal plan.

Flow: **Tell us what food you have → Set household & dietary preferences →
Generate meals → Choose meals → Reserve ingredients → Generate a
missing-item shopping list → Cook → Update inventory.**

## Features

- **Onboarding** — household size, children (with ages), dietary
  preferences, allergies, disliked ingredients, cuisine preferences, meal
  styles, and typical servings.
- **My Food** — a searchable pantry/fridge/freezer inventory with
  categorised, tickable ingredient lists, custom items, quantities and
  expiry dates.
- **Meal Plan** — a Monday–Sunday planner. Choose which meals to plan
  (breakfast/lunch/dinner/snack), how many people are eating, and the meal
  style (quick, family, healthy, budget, use leftovers, use ingredients
  expiring soon, etc). Every slot gets 2–3 recipe suggestions, prioritising
  what's already in your kitchen and clearly splitting **already have** vs
  **need to buy** ingredients.
- **Recipe screen** — large image, description, scaled ingredient
  quantities, step-by-step method, nutrition, allergens, substitutions, and
  a **"Cook this meal"** action that deducts tracked quantities from your
  inventory.
- **Pack Lunch** — Monday–Friday packed lunches for kids (main, fruit, veg,
  snack, dairy, drink, varied across the week) and portable lunches for
  work (quick / healthy / high-protein / leftovers / meal-prep / no-reheat).
- **Shopping List** — automatically built from your weekly plan, grouped by
  category, showing only what's missing. Manual add/remove, check off
  purchases, and add checked items straight back into My Food.
- **Home dashboard** — today's meals, instant "What can I cook?"
  suggestions, ingredients expiring soon, and quick links to every section.

## Tech

React 19 + TypeScript + Vite + Tailwind CSS v4, installable as a PWA. All
app data (preferences, pantry, meal plan, shopping list) is persisted to
`localStorage` via a small store hook (`src/store.ts`), with a mock recipe
and ingredient database designed to be swapped for a real backend later —
the data model is intentionally set up to support user accounts, cloud
sync, nutrition tracking, barcode/receipt scanning, AI photo recognition,
and grocery delivery integrations.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run lint      # oxlint
```
