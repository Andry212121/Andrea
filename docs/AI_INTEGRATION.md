# Connecting PantryPal to a Real AI

Right now every recipe PantryPal suggests comes from a fixed list of 51
hand-written recipes (`src/data/recipes.ts`). The matching/scoring logic
around them is real and works well, but the recipes themselves are
static — the same 51 no matter how many times you regenerate. This
document is the complete, no-steps-skipped path to replacing that static
list with recipes an AI generates on demand, so suggestions stop
repeating and can respond to literally anything in someone's pantry.

## The one fact that determines everything else

**An API key can never live in the app's client-side code.** PantryPal
today is a static site — HTML/CSS/JS served directly to the browser, no
server in between. Anyone can open dev tools and read every line of that
JS. If an Anthropic (or any) API key were embedded in it, it would be
public within minutes, and whoever found it would run up your bill.

So step zero, non-negotiable: **you need a small server-side piece.**
Not a full backend rewrite — literally one endpoint — but *something*
that isn't shipped to the browser. Everything below is built around
adding the smallest possible version of that.

## Architecture: before and after

**Today:**
```
Browser  →  static RECIPES array (bundled into the JS)
```

**After:**
```
Browser  →  your new API endpoint  →  Claude API  →  structured recipe JSON  →  Browser
                    ↑
              API key lives ONLY here, as a server-side secret
```

The frontend keeps working almost exactly as it does now — it just gets
its recipe pool from a network call instead of an import.

## Where to put that one endpoint

You don't need a full server for this. Pick one:

| Option | Why you'd pick it | Cost |
|---|---|---|
| **Cloudflare Workers** (recommended) | Free tier is generous, deploys in minutes, no server to manage, pairs naturally with the app's "no backend to babysit" philosophy | Free for this volume |
| **Supabase Edge Functions** | Same simplicity, but if you're *also* planning the "real accounts + cloud sync" roadmap item, this gets you a database and auth in the same platform — two roadmap items solved by one decision | Free tier available |
| **Vercel/Netlify Functions** | Simplest if you end up hosting the whole app there instead of GitHub Pages | Free tier available |
| **A small Node/Express server** | Most flexible, most future-proof, but now you're paying for and maintaining a server 24/7 | ~$5–7/mo (Render/Railway/Fly.io) |

**My recommendation: Cloudflare Workers to start.** Lowest cost, lowest
new-thing-to-learn, and you can always migrate later — the frontend
doesn't care what's behind the URL it calls.

## Getting an API key

1. Create an account at [console.anthropic.com](https://console.anthropic.com)
2. Add billing (pay-as-you-go — there's no free tier for API usage, unlike claude.ai's chat product)
3. Generate an API key
4. Store it as a **secret** in whichever platform you picked above (e.g. `wrangler secret put ANTHROPIC_API_KEY` for Cloudflare Workers) — never in a `.env` file that gets committed, never anywhere that ships to the browser

**Cost reality check:** using Claude Haiku (cheapest, plenty capable for
this) with compact prompts, generating 3 recipes costs a small fraction
of a cent. Even at real usage volumes this is a "few dollars a month,"
not a line item that changes the product's economics — but it is not
zero, and it does mean the app now has an ongoing cost tied to usage,
which it doesn't today.

## The design decision that makes this easy instead of hard

Your existing `Recipe` type (`src/types.ts`) is the contract every other
part of the app already trusts — the matching engine, the recipe detail
screen, the shopping list builder, the i18n layer. **If the AI's only job
is to produce more objects in that exact shape, nothing else in the app
has to change.** That's the whole trick. Don't design a new "AI recipe"
concept that lives alongside the old one — make the AI a second *source*
of the same shape.

```ts
// The target shape the AI must fill in — this already exists in src/types.ts
interface Recipe {
  name: string;
  description: string;
  cuisine: CuisineTag;
  mealTypes: MealSlotType[];
  tags: MealStyleTag[];
  diets: DietTag[];
  allergens: string[];
  prepTime: number;
  cookTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  baseServings: number;
  ingredients: { name: string; qty: number; unit: string; optional?: boolean }[];
  steps: string[];
  nutrition: { calories: number; protein: number; carbs: number; fat: number };
  emoji: string;
}
```

## The critical constraint: make the AI use your ingredient vocabulary

Your pantry-matching logic works by comparing ingredient *names* (via
`slugify()`) against your ~200-item catalog (`src/data/ingredients.ts`).
If the AI is free to invent ingredient names ("heirloom cherry
tomatoes," "good olive oil"), that matching breaks immediately.

**Fix: pass your actual catalog into the prompt and instruct the model to
only use ingredient names from that list.** This is the single most
important prompt-engineering decision in this whole project — get it
right and "have vs. need to buy" keeps working exactly as it does today.

## Step-by-step build order

1. **Stand up the endpoint.** `POST /api/generate-recipes`, accepting:
   pantry item names (from the request, not trusted client state),
   diets, allergies, dislikes, cuisine preferences, meal type, style
   filters, max cook time, and count (2–3).

2. **Write the system prompt.** Something like:
   > You are a recipe generator for a meal-planning app. Given a list of
   > ingredients the user has, generate {count} distinct recipes for
   > {mealType} that prioritize using those ingredients. Only use
   > ingredient names from this exact list: {catalog names}. Never
   > include an ingredient matching these allergens: {allergies}. Only
   > generate recipes compatible with these diets: {diets}. Respond with
   > only a JSON array matching this schema, no prose: {schema}

3. **Use structured output.** Claude's tool-use feature (define a
   `submit_recipes` tool with a JSON schema matching the shape above) is
   far more reliable than asking for "JSON only" in prose and hoping —
   use it if your SDK/setup supports it.

4. **Validate server-side before returning anything.** Check the
   response actually matches the schema, ingredient names actually exist
   in your catalog, required fields aren't missing. Reject and retry
   once on failure; never pass unvalidated model output straight to the
   frontend.

5. **Wire the frontend to call it.** `src/utils/mealGenerator.ts`'s
   `generateMealOptions()` is a synchronous function today. It becomes
   async (a `fetch()` call). That touches every call site — `Home.tsx`,
   `MealPlan.tsx`'s `SlotOptions`, and the work-lunch generator in
   `lunchGenerator.ts` — each needs a loading state while the network
   call is in flight (a spinner in the options sheet is enough).

6. **Keep the static 51 recipes as a fallback, don't delete them.** If
   the API call fails, times out, or the user is offline (this is a
   PWA — offline use is a real feature you'd otherwise lose), fall back
   to the existing static engine. This also means the app never fully
   breaks because of an API outage or a spent budget cap.

7. **Language:** don't ask the model to also handle translation — keep
   using your existing `foodName()`/`recipeName()` i18n layer for
   *display*, but note it now needs a fallback path for AI-generated
   recipes that don't have hand-written Italian translations in
   `recipeText.ts`. Simplest approach: for AI-generated recipes, just
   display in whatever language the model was prompted in (tell it the
   user's `store.language` and have it write the name/description/steps
   directly in that language) — since these recipes aren't pre-translated
   the way the static 51 are, ingredient names still route through your
   existing dictionary (they're constrained to the catalog either way).

8. **Cache generated results.** Key the cache on a hash of
   (available-ingredients + filters + meal type). Two requests with the
   same pantry and filters shouldn't both hit the API — this is the
   single biggest cost lever you have.

9. **Rate-limit per user/IP** once this is live for real, so one person
   (or one bug in the frontend) can't generate an unbounded bill.

## What this does to the "sellable template" story

This is a meaningfully bigger, ongoing-cost product tier — the buyer now
needs their own Anthropic API key and a deployed backend, not just a
static site. I'd package it as a separate **"PantryPal AI"** add-on or
upgrade path rather than folding it into the base template — update
`docs/LISTING.md` and the README's roadmap section once it's built, and
price it accordingly (this is now closer to "buying a working product"
than "buying a UI template").

## What I'd need from you to actually build this

Directions only get you so far — to build it for real I'd need:

1. **A yes/no on scope** — build it now, in this repo, as a real working
   feature?
2. **An Anthropic API key** (or a different provider if you'd rather)
3. **A platform choice** for the endpoint — I'd default to Cloudflare
   Workers unless you want something else
4. **A call on branch/versioning** — same app with a toggle, or a
   separate "Pro" branch, so the free static-only version still exists
   for the template-buyer audience

Say the word on any of those and I'll start building instead of just
describing it.
