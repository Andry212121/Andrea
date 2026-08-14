export type Lang = 'en' | 'it';

// Flat dictionary of every static UI string in the app, grouped by page/area for sanity.
// Access via t(lang, 'key.path').
const STRINGS = {
  en: {
    'nav.home': 'Home', 'nav.mealplan': 'Meal Plan', 'nav.myfood': 'My Food',
    'nav.packlunch': 'Pack Lunch', 'nav.shopping': 'Shopping',

    'onboarding.stepLanguage': 'Language', 'onboarding.stepHousehold': 'Household',
    'onboarding.stepDiet': 'Diet', 'onboarding.stepAllergies': 'Allergies',
    'onboarding.stepDislikes': 'Dislikes', 'onboarding.stepCuisines': 'Cuisines',
    'onboarding.stepStyles': 'Styles', 'onboarding.stepServings': 'Servings',
    'onboarding.languageTitle': 'Choose your language', 'onboarding.languageSubtitle': 'You can change this anytime in Preferences.',
    'onboarding.householdTitle': 'Tell us about your household', 'onboarding.householdSubtitle': 'This helps us plan the right amount of food.',
    'onboarding.adults': 'Adults', 'onboarding.children': 'Children', 'onboarding.addChild': '+ Add child',
    'onboarding.noChildren': 'No children added.', 'onboarding.child': 'Child', 'onboarding.age': 'age',
    'onboarding.dietTitle': 'Dietary preferences', 'onboarding.dietSubtitle': 'Select any that apply. You can change these anytime.',
    'onboarding.allergiesTitle': 'Any allergies?', 'onboarding.allergiesSubtitle': "We'll make sure meal suggestions avoid these.",
    'onboarding.addAllergy': 'Add another allergy...',
    'onboarding.dislikesTitle': "Foods you'd rather avoid", 'onboarding.dislikesSubtitle': "We won't suggest meals with these ingredients.",
    'onboarding.dislikesPlaceholder': 'e.g. mushrooms, olives...', 'onboarding.noDislikes': 'No disliked ingredients added yet.',
    'onboarding.cuisinesTitle': 'Favourite cuisines', 'onboarding.cuisinesSubtitle': "Pick as many as you like — we'll prioritise these.",
    'onboarding.stylesTitle': 'Preferred meal styles', 'onboarding.stylesSubtitle': "We'll lean towards these when suggesting meals.",
    'onboarding.servingsTitle': 'Typical serving size', 'onboarding.servingsSubtitle': 'How many people usually eat a meal together? You can adjust this per meal later.',
    'onboarding.peoplePerMeal': 'People per meal', 'onboarding.continue': 'Continue', 'onboarding.back': '← Back',
    'onboarding.finish': 'Start planning 🎉',

    'settings.title': 'Preferences', 'settings.subtitle': 'Changes save instantly and shape every suggestion.',
    'settings.language': 'Language', 'settings.household': 'Household', 'settings.servings': 'Typical serving size',
    'settings.diet': 'Dietary preferences', 'settings.allergies': 'Allergies', 'settings.dislikes': "Foods you'd rather avoid",
    'settings.cuisines': 'Favourite cuisines', 'settings.styles': 'Preferred meal styles',

    'home.greeting': 'Hey there 👋', 'home.headline': "What's cooking today?",
    'home.expiringSoon': 'ingredient(s) should be used soon', 'home.useInMeal': 'Use them in a meal →',
    'home.thisWeek': 'This week', 'home.viewAll': 'View all →',
    'home.plannedMealsChosen': '{count} of {total} planned meals chosen', 'home.noMealsToday': 'No meals planned for today yet.',
    'home.whatCanICook': 'What can I cook?', 'home.usingWhatYouHave': "Using what's already in your kitchen",
    'home.addIngredients': 'Add some ingredients', 'home.addIngredientsSub': 'Tick off what you have in My Food to get instant suggestions.',
    'home.have': 'have', 'home.myFood': 'My Food', 'home.items': 'items', 'home.packLunch': 'Pack Lunch',
    'home.planned': 'planned', 'home.shoppingList': 'Shopping List', 'home.itemsNeeded': 'items needed',
    'home.mealPlan': 'Meal Plan', 'home.mealsSet': 'meals set', 'home.addToTodaysDinner': "Add to today's dinner",

    'myfood.title': 'My Food', 'myfood.subtitle': 'Tell us what you have — tick the boxes.',
    'myfood.searchPlaceholder': 'Search {section}...', 'myfood.itemsIn': 'item(s) in your',
    'myfood.haveShort': 'have', 'myfood.custom': '(custom)', 'myfood.quantity': 'Quantity', 'myfood.unit': 'Unit',
    'myfood.optional': 'Optional', 'myfood.expiry': 'Use-by / expiry date', 'myfood.location': 'Location',
    'myfood.addCustom': 'Add custom ingredient', 'myfood.ingredientName': 'Ingredient name',
    'myfood.ingredientPlaceholder': 'e.g. Kimchi', 'myfood.category': 'Category', 'myfood.addToMyFood': 'Add to My Food',

    'mealplan.title': 'Meal Plan', 'mealplan.subtitle': 'Monday – Sunday', 'mealplan.today': 'TODAY',
    'mealplan.planThisMeal': '+ Plan this meal', 'mealplan.noMealTypes': 'No meals selected — tap ⚙️ to choose which meals to plan.',
    'mealplan.mealsToPlan': 'Meals to plan', 'mealplan.mealsToPlanSub': "Choose which meals you'd like planned every day. You can still leave individual days empty.",
    'mealplan.editPreferences': '🥗 Edit diet, allergies & cuisine preferences →',
    'mealplan.generateOptions': 'Generate meal options ✨', 'mealplan.adultsEating': 'Adults eating',
    'mealplan.childrenEating': 'Children eating', 'mealplan.mealType': 'Meal type', 'mealplan.maxCookTime': 'Max cooking time',
    'mealplan.topMatches': "Here are your top matches based on what's in your kitchen.",
    'mealplan.mealOptions': 'Meal options', 'mealplan.viewRecipe': '📖 View recipe', 'mealplan.swapMeal': '🔄 Swap meal',
    'mealplan.regenerate': '✨ Regenerate alternatives', 'mealplan.changeServings': '👥 Change servings',
    'mealplan.changeServingsTitle': 'Change servings',
    'mealplan.removeMeal': '🗑 Remove meal', 'mealplan.recipe': 'Recipe', 'mealplan.servings': 'Servings',
    'mealplan.noMatches': 'No matching recipes',
    'mealplan.noMatchesSub': "Nothing in our recipe book fits every filter you've set — diet, allergies, cuisine, cooking time and dislikes all narrow the list down.",
    'mealplan.clearFilters': "Clear this meal's style & time filters", 'mealplan.editPrefsBtn': '🥗 Edit diet, allergy & cuisine preferences',

    'recipe.have': 'Ingredients you have', 'recipe.needToBuy': 'Need to buy', 'recipe.substitutions': 'Substitutions',
    'recipe.steps': 'Step-by-step', 'recipe.nutrition': 'Nutrition (per serving)', 'recipe.allergens': 'Allergens',
    'recipe.prep': 'Prep', 'recipe.cook': 'Cook', 'recipe.serves': 'Serves', 'recipe.kcalServ': 'Kcal/serv',
    'recipe.kcal': 'Kcal', 'recipe.protein': 'Protein', 'recipe.carbs': 'Carbs', 'recipe.fat': 'Fat',
    'recipe.cooked': '✓ Cooked', 'recipe.cookThisMeal': 'Cook this meal 👩‍🍳', 'recipe.inventoryUpdated': 'Inventory updated ✓',
    'recipe.chooseThisOption': 'Choose this option', 'recipe.scaledNote': 'Ingredient quantities are scaled automatically for {servings} {peopleWord} (scale ×{scale}).',
    'recipe.person': 'person', 'recipe.people': 'people', 'recipe.optionalTag': '(optional)',
    'recipe.viewRecipe': 'View recipe', 'recipe.chooseThis': 'Choose this', 'recipe.haveCount': 'have', 'recipe.toBuy': 'to buy',

    'packlunch.title': 'Pack Lunch', 'packlunch.subtitle': 'Balanced, varied packed lunches — Monday to Friday.',
    'packlunch.school': '🎒 School', 'packlunch.work': '💼 Work', 'packlunch.noChildren': 'No children added yet',
    'packlunch.noChildrenSub': 'Add children in onboarding preferences to plan their school lunches.',
    'packlunch.childLabel': 'Child', 'packlunch.regenerateWeek': 'Regenerate whole week', 'packlunch.generateWeek': 'Generate this week ✨',
    'packlunch.regenerateDay': '🔄 Regenerate day', 'packlunch.notGenerated': 'Not generated yet.',
    'packlunch.lunchStyle': 'Lunch style',

    'shopping.title': 'Shopping List', 'shopping.subtitle': "Only what's missing from your kitchen.",
    'shopping.updateFromPlan': '🔄 Update from meal plan', 'shopping.addItem': 'Add an item...',
    'shopping.empty': 'Your list is empty', 'shopping.emptySub': "Plan some meals, then tap 'Update from meal plan' to pull in missing ingredients.",
    'shopping.auto': 'auto', 'shopping.addChecked': '✅ Add {count} checked item(s) to My Food',

    'common.close': 'Close',
  },
  it: {
    'nav.home': 'Home', 'nav.mealplan': 'Piano pasti', 'nav.myfood': 'La mia dispensa',
    'nav.packlunch': 'Pranzo al sacco', 'nav.shopping': 'Spesa',

    'onboarding.stepLanguage': 'Lingua', 'onboarding.stepHousehold': 'Famiglia',
    'onboarding.stepDiet': 'Dieta', 'onboarding.stepAllergies': 'Allergie',
    'onboarding.stepDislikes': 'Antipatie', 'onboarding.stepCuisines': 'Cucine',
    'onboarding.stepStyles': 'Stili', 'onboarding.stepServings': 'Porzioni',
    'onboarding.languageTitle': 'Scegli la lingua', 'onboarding.languageSubtitle': 'Puoi cambiarla in qualsiasi momento nelle Preferenze.',
    'onboarding.householdTitle': 'Parlaci della tua famiglia', 'onboarding.householdSubtitle': 'Ci aiuta a calcolare la quantità di cibo giusta.',
    'onboarding.adults': 'Adulti', 'onboarding.children': 'Bambini', 'onboarding.addChild': '+ Aggiungi bambino',
    'onboarding.noChildren': 'Nessun bambino aggiunto.', 'onboarding.child': 'Bambino', 'onboarding.age': 'età',
    'onboarding.dietTitle': 'Preferenze alimentari', 'onboarding.dietSubtitle': 'Seleziona quelle che ti interessano. Puoi modificarle in ogni momento.',
    'onboarding.allergiesTitle': 'Allergie?', 'onboarding.allergiesSubtitle': 'Ci assicureremo di evitarle nei suggerimenti dei pasti.',
    'onboarding.addAllergy': 'Aggiungi un\'altra allergia...',
    'onboarding.dislikesTitle': 'Cibi da evitare', 'onboarding.dislikesSubtitle': 'Non suggeriremo pasti con questi ingredienti.',
    'onboarding.dislikesPlaceholder': 'es. funghi, olive...', 'onboarding.noDislikes': 'Nessun ingrediente indesiderato aggiunto.',
    'onboarding.cuisinesTitle': 'Cucine preferite', 'onboarding.cuisinesSubtitle': 'Scegline quante vuoi — daremo priorità a queste.',
    'onboarding.stylesTitle': 'Stili di pasto preferiti', 'onboarding.stylesSubtitle': 'Li terremo in considerazione nei suggerimenti.',
    'onboarding.servingsTitle': 'Porzione tipica', 'onboarding.servingsSubtitle': 'Quante persone mangiano di solito insieme? Potrai modificarlo per ogni pasto in seguito.',
    'onboarding.peoplePerMeal': 'Persone per pasto', 'onboarding.continue': 'Continua', 'onboarding.back': '← Indietro',
    'onboarding.finish': 'Inizia a pianificare 🎉',

    'settings.title': 'Preferenze', 'settings.subtitle': 'Le modifiche si salvano subito e guidano ogni suggerimento.',
    'settings.language': 'Lingua', 'settings.household': 'Famiglia', 'settings.servings': 'Porzione tipica',
    'settings.diet': 'Preferenze alimentari', 'settings.allergies': 'Allergie', 'settings.dislikes': 'Cibi da evitare',
    'settings.cuisines': 'Cucine preferite', 'settings.styles': 'Stili di pasto preferiti',

    'home.greeting': 'Ciao 👋', 'home.headline': 'Cosa cuciniamo oggi?',
    'home.expiringSoon': 'ingredient(i) da consumare presto', 'home.useInMeal': 'Usali in un pasto →',
    'home.thisWeek': 'Questa settimana', 'home.viewAll': 'Vedi tutto →',
    'home.plannedMealsChosen': '{count} di {total} pasti pianificati scelti', 'home.noMealsToday': 'Nessun pasto pianificato per oggi.',
    'home.whatCanICook': 'Cosa posso cucinare?', 'home.usingWhatYouHave': 'Con quello che hai già in cucina',
    'home.addIngredients': 'Aggiungi qualche ingrediente', 'home.addIngredientsSub': 'Spunta cosa hai in La mia dispensa per ricevere suggerimenti immediati.',
    'home.have': 'hai', 'home.myFood': 'La mia dispensa', 'home.items': 'articoli', 'home.packLunch': 'Pranzo al sacco',
    'home.planned': 'pianificati', 'home.shoppingList': 'Lista della spesa', 'home.itemsNeeded': 'articoli da comprare',
    'home.mealPlan': 'Piano pasti', 'home.mealsSet': 'pasti impostati', 'home.addToTodaysDinner': 'Aggiungi alla cena di oggi',

    'myfood.title': 'La mia dispensa', 'myfood.subtitle': 'Dicci cosa hai — spunta le caselle.',
    'myfood.searchPlaceholder': 'Cerca in {section}...', 'myfood.itemsIn': 'articoli in',
    'myfood.haveShort': 'hai', 'myfood.custom': '(personalizzato)', 'myfood.quantity': 'Quantità', 'myfood.unit': 'Unità',
    'myfood.optional': 'Facoltativo', 'myfood.expiry': 'Scadenza / da consumare entro', 'myfood.location': 'Posizione',
    'myfood.addCustom': 'Aggiungi ingrediente personalizzato', 'myfood.ingredientName': 'Nome ingrediente',
    'myfood.ingredientPlaceholder': 'es. Kimchi', 'myfood.category': 'Categoria', 'myfood.addToMyFood': 'Aggiungi a La mia dispensa',

    'mealplan.title': 'Piano pasti', 'mealplan.subtitle': 'Lunedì – Domenica', 'mealplan.today': 'OGGI',
    'mealplan.planThisMeal': '+ Pianifica questo pasto', 'mealplan.noMealTypes': 'Nessun pasto selezionato — tocca ⚙️ per scegliere quali pianificare.',
    'mealplan.mealsToPlan': 'Pasti da pianificare', 'mealplan.mealsToPlanSub': 'Scegli quali pasti vuoi pianificare ogni giorno. Puoi comunque lasciare vuoti alcuni giorni.',
    'mealplan.editPreferences': '🥗 Modifica dieta, allergie e cucine preferite →',
    'mealplan.generateOptions': 'Genera opzioni di pasto ✨', 'mealplan.adultsEating': 'Adulti a tavola',
    'mealplan.childrenEating': 'Bambini a tavola', 'mealplan.mealType': 'Tipo di pasto', 'mealplan.maxCookTime': 'Tempo massimo di cottura',
    'mealplan.topMatches': "Ecco i migliori abbinamenti in base a cosa hai in cucina.",
    'mealplan.mealOptions': 'Opzioni pasto', 'mealplan.viewRecipe': '📖 Vedi ricetta', 'mealplan.swapMeal': '🔄 Cambia pasto',
    'mealplan.regenerate': '✨ Rigenera alternative', 'mealplan.changeServings': '👥 Cambia porzioni',
    'mealplan.changeServingsTitle': 'Cambia porzioni',
    'mealplan.removeMeal': '🗑 Rimuovi pasto', 'mealplan.recipe': 'Ricetta', 'mealplan.servings': 'Porzioni',
    'mealplan.noMatches': 'Nessuna ricetta corrispondente',
    'mealplan.noMatchesSub': 'Nessuna ricetta soddisfa tutti i filtri impostati — dieta, allergie, cucina, tempo di cottura e antipatie restringono la lista.',
    'mealplan.clearFilters': 'Rimuovi i filtri di stile e tempo per questo pasto', 'mealplan.editPrefsBtn': '🥗 Modifica dieta, allergie e cucine preferite',

    'recipe.have': 'Ingredienti che hai', 'recipe.needToBuy': 'Da comprare', 'recipe.substitutions': 'Sostituzioni',
    'recipe.steps': 'Procedimento', 'recipe.nutrition': 'Valori nutrizionali (a porzione)', 'recipe.allergens': 'Allergeni',
    'recipe.prep': 'Prep.', 'recipe.cook': 'Cottura', 'recipe.serves': 'Porzioni', 'recipe.kcalServ': 'Kcal/porz.',
    'recipe.kcal': 'Kcal', 'recipe.protein': 'Proteine', 'recipe.carbs': 'Carboidrati', 'recipe.fat': 'Grassi',
    'recipe.cooked': '✓ Cucinato', 'recipe.cookThisMeal': 'Cucina questo pasto 👩‍🍳', 'recipe.inventoryUpdated': 'Dispensa aggiornata ✓',
    'recipe.chooseThisOption': 'Scegli questa opzione', 'recipe.scaledNote': 'Le quantità sono calcolate automaticamente per {servings} {peopleWord} (fattore ×{scale}).',
    'recipe.person': 'persona', 'recipe.people': 'persone', 'recipe.optionalTag': '(facoltativo)',
    'recipe.viewRecipe': 'Vedi ricetta', 'recipe.chooseThis': 'Scegli questa', 'recipe.haveCount': 'hai', 'recipe.toBuy': 'da comprare',

    'packlunch.title': 'Pranzo al sacco', 'packlunch.subtitle': 'Pranzi al sacco bilanciati e vari — dal lunedì al venerdì.',
    'packlunch.school': '🎒 Scuola', 'packlunch.work': '💼 Lavoro', 'packlunch.noChildren': 'Nessun bambino ancora aggiunto',
    'packlunch.noChildrenSub': 'Aggiungi i bambini nelle preferenze per pianificare i loro pranzi scolastici.',
    'packlunch.childLabel': 'Bambino', 'packlunch.regenerateWeek': 'Rigenera tutta la settimana', 'packlunch.generateWeek': 'Genera questa settimana ✨',
    'packlunch.regenerateDay': '🔄 Rigenera giorno', 'packlunch.notGenerated': 'Non ancora generato.',
    'packlunch.lunchStyle': 'Stile di pranzo',

    'shopping.title': 'Lista della spesa', 'shopping.subtitle': 'Solo ciò che manca in cucina.',
    'shopping.updateFromPlan': '🔄 Aggiorna dal piano pasti', 'shopping.addItem': 'Aggiungi un articolo...',
    'shopping.empty': 'La lista è vuota', 'shopping.emptySub': "Pianifica qualche pasto, poi tocca 'Aggiorna dal piano pasti' per importare gli ingredienti mancanti.",
    'shopping.auto': 'auto', 'shopping.addChecked': '✅ Aggiungi {count} articolo/i spuntato/i a La mia dispensa',

    'common.close': 'Chiudi',
  },
} as const;

type Dict = typeof STRINGS.en;
export type StringKey = keyof Dict;

export function t(lang: Lang, key: StringKey, vars?: Record<string, string | number>): string {
  let str: string = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, String(v));
    }
  }
  return str;
}
