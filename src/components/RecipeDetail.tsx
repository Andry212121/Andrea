import type { ReactNode } from 'react';
import type { Recipe } from '../types';
import RecipeMedia from './RecipeMedia';
import Stepper from './Stepper';
import type { RecipeMatch } from '../utils/mealGenerator';

interface RecipeDetailProps {
  recipe: Recipe;
  servings: number;
  match: RecipeMatch;
  onServingsChange?: (n: number) => void;
  cooked?: boolean;
  footer?: ReactNode;
}

const DIET_LABELS: Record<string, string> = {
  vegetarian: 'Vegetarian', vegan: 'Vegan', pescatarian: 'Pescatarian', 'gluten-free': 'Gluten-free',
  'dairy-free': 'Dairy-free', 'low-carb': 'Low-carb', 'high-protein': 'High-protein', mediterranean: 'Mediterranean',
};

export default function RecipeDetail({ recipe, servings, match, onServingsChange, cooked, footer }: RecipeDetailProps) {
  const scale = servings / recipe.baseServings;

  return (
    <div className="pb-6">
      <RecipeMedia emoji={recipe.emoji} gradient={recipe.gradient} size="lg" className="w-full h-48" />

      <div className="px-5 pt-4">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-xl font-extrabold text-gray-900 leading-tight">{recipe.name}</h1>
          {cooked && (
            <span className="shrink-0 text-xs font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">✓ Cooked</span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">{recipe.description}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs font-semibold bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full">{recipe.cuisine}</span>
          <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{recipe.difficulty}</span>
          {recipe.diets.map((d) => (
            <span key={d} className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
              {DIET_LABELS[d] ?? d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4 text-center">
          <Stat label="Prep" value={`${recipe.prepTime}m`} />
          <Stat label="Cook" value={`${recipe.cookTime}m`} />
          <Stat label="Serves" value={`${servings}`} />
          <Stat label="Kcal/serv" value={`${recipe.nutrition.calories}`} />
        </div>

        {onServingsChange && (
          <div className="mt-4 bg-gray-50 rounded-2xl px-4 py-3">
            <Stepper label="Servings" value={servings} onChange={onServingsChange} min={1} max={12} />
          </div>
        )}

        <Section title={`Ingredients you have (${match.have.length}/${recipe.ingredients.length})`}>
          <ul className="space-y-1.5">
            {match.have.map((m) => (
              <IngredientRow key={m.ingredient.ingredientId} name={m.ingredient.name} qty={m.scaledQty} unit={m.ingredient.unit} have />
            ))}
          </ul>
        </Section>

        {match.need.length > 0 && (
          <Section title={`Need to buy (${match.need.length})`}>
            <ul className="space-y-1.5">
              {match.need.map((m) => (
                <IngredientRow key={m.ingredient.ingredientId} name={m.ingredient.name} qty={m.scaledQty} unit={m.ingredient.unit} have={false} optional={m.ingredient.optional} />
              ))}
            </ul>
          </Section>
        )}

        {recipe.substitutions && recipe.substitutions.length > 0 && (
          <Section title="Substitutions">
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
              {recipe.substitutions.map((s, i) => <li key={i}>{s.alt}</li>)}
            </ul>
          </Section>
        )}

        <Section title="Step-by-step">
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Nutrition (per serving)">
          <div className="grid grid-cols-4 gap-2 text-center">
            <Stat label="Kcal" value={`${recipe.nutrition.calories}`} />
            <Stat label="Protein" value={`${recipe.nutrition.protein}g`} />
            <Stat label="Carbs" value={`${recipe.nutrition.carbs}g`} />
            <Stat label="Fat" value={`${recipe.nutrition.fat}g`} />
          </div>
        </Section>

        {recipe.allergens.length > 0 && (
          <Section title="Allergens">
            <div className="flex flex-wrap gap-2">
              {recipe.allergens.map((a) => (
                <span key={a} className="text-xs font-semibold bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full capitalize">
                  ⚠️ {a}
                </span>
              ))}
            </div>
          </Section>
        )}

        {footer && <div className="mt-6">{footer}</div>}
      </div>
      <div className="text-[11px] text-gray-400 px-5 mt-2">Ingredient quantities are scaled automatically for {servings} {servings === 1 ? 'person' : 'people'} (scale ×{scale.toFixed(2)}).</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl py-2">
      <div className="text-sm font-bold text-gray-800">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">{label}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function IngredientRow({ name, qty, unit, have, optional }: { name: string; qty: number; unit: string; have: boolean; optional?: boolean }) {
  return (
    <li className="flex items-center justify-between text-sm bg-white border border-gray-100 rounded-xl px-3 py-2">
      <span className="flex items-center gap-2 text-gray-700">
        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${have ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-700'}`}>
          {have ? '✓' : '+'}
        </span>
        {name}
        {optional && <span className="text-[10px] text-gray-400">(optional)</span>}
      </span>
      <span className="text-gray-400 text-xs tabular-nums">{qty} {unit}</span>
    </li>
  );
}
