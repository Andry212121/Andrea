// Italian translations of each recipe's name, description and step-by-step method.
// Keyed by recipe id (see src/data/recipes.ts). Ingredient names are translated separately
// via foodNames.ts, since they're shared with the pantry catalog.
export interface RecipeTextIt {
  name: string;
  description: string;
  steps: string[];
}

export const RECIPE_TEXT_IT: Record<string, RecipeTextIt> = {
  'chicken-tomato-pasta': {
    name: 'Pasta al pollo e pomodoro',
    description: 'Una pasta confortante per la settimana, con pollo rosolato in un ricco sugo di pomodoro.',
    steps: [
      'Porta a bollore una pentola grande di acqua salata e cuoci gli spaghetti al dente.',
      'Condisci e taglia a cubetti il petto di pollo; rosolalo in olio d\'oliva finché dorato e cotto, poi mettilo da parte.',
      'Nella stessa padella, fai appassire cipolla e aglio tritati per 3–4 minuti.',
      'Aggiungi i pomodori pelati, porta a ebollizione leggera e cuoci per 10 minuti.',
      'Rimetti il pollo nel sugo, unisci la pasta scolata e il basilico.',
      'Servi con parmigiano grattugiato.',
    ],
  },
  'creamy-mushroom-risotto': {
    name: 'Risotto cremoso ai funghi',
    description: 'Riso per risotto mantecato lentamente con funghi, parmigiano e un tocco di panna.',
    steps: [
      'Prepara 1 litro di brodo con i dadi e tienilo caldo.',
      'Fai appassire cipolla e aglio in burro e olio, poi aggiungi i funghi affettati e cuoci finché dorati.',
      'Tosta il riso per un minuto, poi aggiungi il brodo un mestolo alla volta, mescolando finché assorbito.',
      'Continua per 20–25 minuti finché il riso è cremoso e appena al dente.',
      'Manteca con il parmigiano e regola di sale.',
    ],
  },
  'margherita-flatbread-pizza': {
    name: 'Pizza margherita su piadina',
    description: 'Pizza fatta in casa e veloce su piadina, con pomodoro, mozzarella e basilico.',
    steps: [
      'Preriscalda il forno a 220°C (ventilato 200°C).',
      'Spalma la passata sulle piadine e completa con mozzarella a pezzi.',
      'Cuoci per 10–12 minuti finché bollente e dorata.',
      'Guarnisci con basilico fresco e un filo d\'olio prima di servire.',
    ],
  },
  'chicken-couscous-roasted-vegetables': {
    name: 'Pollo, couscous e verdure al forno',
    description: 'Couscous alle erbe con verdure mediterranee al forno e pollo grigliato.',
    steps: [
      'Preriscalda il forno a 200°C. Condisci zucchina e peperoni a pezzi con olio, cuoci al forno per 20 minuti.',
      'Condisci il petto di pollo e grigliaIo o cuocilo in padella finché cotto, poi affettalo.',
      'Prepara il couscous con acqua bollente o brodo, sgranalo con una forchetta.',
      'Unisci couscous, verdure e pollo, completa con succo di limone e prezzemolo.',
    ],
  },
  'greek-salad-with-grilled-halloumi': {
    name: 'Insalata greca con halloumi grigliato',
    description: 'Cetriolo croccante, pomodoro e olive con halloumi caldo e dorato.',
    steps: [
      'Affetta l\'halloumi e cuocilo in padella antiaderente per 2 minuti per lato finché dorato.',
      'Taglia cetriolo e pomodori, uniscili a olive e feta sbriciolata.',
      'Condisci con olio d\'oliva, completa con l\'halloumi caldo e servi.',
    ],
  },
  'falafel-hummus-bowl': {
    name: 'Bowl di falafel e hummus',
    description: 'Falafel al forno con hummus, insalata e pane pita caldo.',
    steps: [
      'Frulla ceci, aglio, coriandolo e cumino fino a ottenere un composto grezzo, forma delle piccole polpette.',
      'Cuoci in forno a 200°C per 18–20 minuti, girando a metà cottura, finché dorati e sodi.',
      'Scalda il pane pita, spalmalo con hummus e riempi con insalata e falafel.',
    ],
  },
  'classic-sunday-roast-chicken': {
    name: 'Classico pollo arrosto della domenica',
    description: 'Pollo arrosto con patate, verdure di stagione e salsa al fondo di cottura.',
    steps: [
      'Preriscalda il forno a 200°C. Condisci le patate con olio e cuoci al forno per 15 minuti.',
      'Aggiungi le cosce di pollo e le carote nella teglia, cuoci per altri 45–50 minuti finché cotto.',
      'Cuoci a vapore i fagiolini negli ultimi 5 minuti.',
      'Prepara una salsa veloce con il fondo di cottura e il brodo, e servi.',
    ],
  },
  'fish-chips-traybake': {
    name: 'Pesce e patatine al forno',
    description: 'Pesce impanato cotto al forno con patatine croccanti e piselli.',
    steps: [
      'Preriscalda il forno e cuoci patatine e pesce su teglie separate seguendo i tempi della confezione, circa 20–25 minuti.',
      'Fai bollire i piselli negli ultimi 5 minuti.',
      'Servi pesce e patatine con uno spicchio di limone e i piselli.',
    ],
  },
  'full-english-breakfast': {
    name: 'Colazione all\'inglese completa',
    description: 'Uova, pancetta, salsicce, fagioli e pomodoro grigliato — un inizio abbondante per il weekend.',
    steps: [
      'Griglia salsicce e pancetta finché cotte e dorate.',
      'Taglia a metà i pomodori e grigliali a fianco, scalda i fagioli in un pentolino.',
      'Cuoci le uova come preferisci (fritte o in camicia) e tosta il pane.',
      'Componi il piatto e servi caldo.',
    ],
  },
  'bangers-mash-with-onion-gravy': {
    name: 'Salsicce con purè e salsa di cipolle',
    description: 'Salsicce con purè di patate cremoso e ricca salsa di cipolle.',
    steps: [
      'Griglia o cuoci in padella le salsicce finché dorate e cotte.',
      'Fai bollire le patate finché tenere, poi schiacciale con burro e latte.',
      'Fai caramellare lentamente le cipolle affettate, poi aggiungi il brodo per creare una salsa.',
      'Servi le salsicce sul purè, completate con la salsa di cipolle.',
    ],
  },
  'chicken-fajitas': {
    name: 'Fajitas di pollo',
    description: 'Pollo speziato e sfrigolante con peperoni e tortillas calde.',
    steps: [
      'Taglia pollo e peperoni a listarelle.',
      'Cuoci il pollo con paprika e cumino quasi fino a cottura, poi aggiungi peperoni e cipolla e cuoci finché morbidi.',
      'Scalda le tortillas e servi il tutto con panna acida.',
    ],
  },
  'beef-black-bean-tacos': {
    name: 'Tacos di manzo e fagioli neri',
    description: 'Tacos di carne macinata speziata con fagioli neri e salsa fresca.',
    steps: [
      'Rosola la carne macinata con la paprika, poi aggiungi i fagioli neri scolati e scalda bene.',
      'Taglia a cubetti pomodori e cipolla per una salsa fresca veloce.',
      'Scalda le tortillas e riempile con il composto di manzo, la salsa e il formaggio grattugiato.',
    ],
  },
  'loaded-sweet-potato-nachos': {
    name: 'Nachos di patate dolci farciti',
    description: 'Rondelle di patata dolce al forno con fagioli, formaggio e salsa.',
    steps: [
      'Affetta sottilmente le patate dolci, condiscile con olio e cuoci al forno a 200°C per 20 minuti finché tenere.',
      'Completa con fagioli rossi e formaggio grattugiato, rimetti in forno finché fuso.',
      'Termina con pomodoro a cubetti e un cucchiaio di panna acida.',
    ],
  },
  'chicken-tikka-curry': {
    name: 'Curry di pollo tikka',
    description: 'Curry profumato a base di pomodoro e yogurt con pollo tenero.',
    steps: [
      'Marina il pollo a cubetti in yogurt e metà del garam masala per almeno 15 minuti.',
      'Fai soffriggere cipolla, aglio e zenzero finché morbidi, aggiungi la spezia rimanente e cuoci per un minuto.',
      'Aggiungi il pollo e cuoci finché sigillato, poi unisci i pomodori e cuoci a fuoco lento per 20 minuti.',
      'Servi con riso basmati al vapore.',
    ],
  },
  'vegetable-lentil-dahl': {
    name: 'Dahl di lenticchie e verdure',
    description: 'Dahl caldo di lenticchie rosse con spinaci — perfetto per usare le verdure avanzate.',
    steps: [
      'Fai appassire cipolla, aglio e zenzero, poi aggiungi le spezie e cuoci per un minuto.',
      'Aggiungi le lenticchie e acqua a coprire, cuoci a fuoco lento per 20 minuti finché morbide.',
      'Unisci gli spinaci e, se vuoi, il latte di cocco, finché appassiti.',
      'Regola di sale e servi con riso o naan.',
    ],
  },
  'prawn-coconut-curry': {
    name: 'Curry di gamberi al cocco',
    description: 'Curry di gamberi veloce e leggero in una salsa di cocco profumata.',
    steps: [
      'Fai appassire la cipolla, poi aggiungi la pasta di curry e cuoci per un minuto.',
      'Aggiungi il latte di cocco e cuoci a fuoco lento per 5 minuti.',
      'Aggiungi i gamberi e cuoci per 3–4 minuti finché rosa e cotti.',
      'Servi su riso basmati al vapore.',
    ],
  },
  'chicken-vegetable-rice-bowl': {
    name: 'Bowl di riso, pollo e verdure',
    description: 'Pollo e verdure saltati serviti su riso al vapore con glassa di soia.',
    steps: [
      'Cuoci il riso seguendo le istruzioni della confezione.',
      'Salta in padella il pollo affettato finché dorato, poi mettilo da parte.',
      'Salta broccoli e carote con lo zenzero per 3–4 minuti, poi rimetti il pollo.',
      'Aggiungi la salsa di soia, mescola tutto e servi sul riso.',
    ],
  },
  'beef-broccoli-stir-fry': {
    name: 'Manzo saltato con broccoli',
    description: 'Classiche striscioline di manzo tenero con broccoli in salsa di soia lucida.',
    steps: [
      'Cuoci i noodles seguendo le istruzioni della confezione.',
      'Affetta sottilmente il manzo e saltalo a fuoco alto per 2–3 minuti, poi mettilo da parte.',
      'Salta broccoli e aglio per 3 minuti, rimetti il manzo e aggiungi la salsa di soia.',
      'Unisci i noodles e servi.',
    ],
  },
  'vegetable-fried-rice': {
    name: 'Riso saltato alle verdure',
    description: 'Un ottimo modo per usare il riso avanzato e le verdure spaiate del frigo.',
    steps: [
      'Strapazza le uova in un wok caldo, poi toglile e mettile da parte.',
      'Salta il riso e i piselli finché ben caldi, sgranando eventuali grumi.',
      'Rimetti le uova, aggiungi la salsa di soia e i cipollotti tritati, mescola tutto.',
    ],
  },
  'salmon-teriyaki-with-rice': {
    name: 'Salmone teriyaki con riso',
    description: 'Filetti di salmone glassati con salsa teriyaki appiccicosa e riso al vapore.',
    steps: [
      'Cuoci il riso seguendo le istruzioni della confezione.',
      'Mescola salsa di soia e miele, spennella il salmone.',
      'Cuoci il salmone in padella o alla griglia per 4–5 minuti per lato, spennellando con altra glassa.',
      'Servi sul riso con broccoli al vapore.',
    ],
  },
  'miso-noodle-soup-bowl': {
    name: 'Zuppa di noodles in stile miso',
    description: 'Un brodo di noodles leggero e caldo con verdure e guarnizioni.',
    steps: [
      'Porta il brodo a bollore leggero con la salsa di soia.',
      'Aggiungi noodles e verdure, cuoci per 5–6 minuti finché i noodles sono teneri.',
      'Versa nelle ciotole e completa con cipollotto affettato.',
    ],
  },
  'thai-green-chicken-curry': {
    name: 'Curry verde thailandese di pollo',
    description: 'Curry al cocco aromatico con pollo, fagiolini e riso in stile jasmine.',
    steps: [
      'Cuoci il riso seguendo le istruzioni della confezione.',
      'Fai soffriggere la pasta di curry per un minuto, poi aggiungi il pollo affettato e cuoci finché sigillato.',
      'Versa il latte di cocco e cuoci a fuoco lento per 10 minuti.',
      'Aggiungi i fagiolini e la salsa di pesce, cuoci altri 5 minuti e servi con il riso.',
    ],
  },
  'thai-basil-beef-noodles': {
    name: 'Noodles al manzo e basilico thai',
    description: 'Carne macinata di manzo saltata e piccante con basilico su noodles di riso.',
    steps: [
      'Cuoci i noodles seguendo le istruzioni della confezione.',
      'Fai soffriggere aglio e peperoncino, aggiungi la carne macinata e cuoci finché dorata.',
      'Aggiungi la salsa di pesce e il basilico spezzettato, unisci ai noodles e servi.',
    ],
  },
  'lamb-chickpea-tagine': {
    name: 'Tajine di agnello e ceci',
    description: 'Agnello cotto lentamente con ceci, spezie calde e frutta secca.',
    steps: [
      'Rosola l\'agnello a più riprese, poi mettilo da parte.',
      'Fai appassire la cipolla, aggiungi le spezie e cuoci per un minuto, poi rimetti l\'agnello.',
      'Aggiungi pomodori e ceci, copri e cuoci a fuoco lento per 40 minuti.',
      'Servi su couscous soffice.',
    ],
  },
  'halloumi-vegetable-skewers': {
    name: 'Spiedini di halloumi e verdure',
    description: 'Spiedini grigliati di halloumi e verdure con salsa allo yogurt e erbe.',
    steps: [
      'Taglia a cubetti halloumi e verdure e infilzali sugli spiedini.',
      'Spennella con olio d\'oliva e griglia per 10–12 minuti, girando di tanto in tanto.',
      'Mescola lo yogurt con menta tritata per la salsa e servi a parte.',
    ],
  },
  'homemade-beef-burgers': {
    name: 'Hamburger di manzo fatti in casa',
    description: 'Hamburger di manzo succosi con formaggio fuso in un panino morbido.',
    steps: [
      'Forma la carne macinata in quattro polpette e condisci bene.',
      'Cuoci in padella o alla griglia per 4–5 minuti per lato, aggiungendo il formaggio nell\'ultimo minuto.',
      'Servi nei panini con lattuga, pomodoro e ketchup.',
    ],
  },
  'bbq-pulled-chicken-sandwiches': {
    name: 'Panini di pollo sfilacciato al BBQ',
    description: 'Pollo sfilacciato cotto lentamente in una salsa barbecue affumicata.',
    steps: [
      'Cuoci a fuoco lento le cosce di pollo con cipolla, ketchup e paprika in una pentola coperta per 30 minuti finché tenere.',
      'Sfilaccia il pollo con due forchette e rimescolalo nella salsa.',
      'Riempi i panini e servi.',
    ],
  },
  'loaded-veggie-chilli': {
    name: 'Chili vegetariano ricco',
    description: 'Chili sostanzioso ai tre fagioli, ottimo con riso o in un wrap.',
    steps: [
      'Fai appassire cipolla e peperone, aggiungi la paprika e cuoci per un minuto.',
      'Aggiungi entrambi i fagioli e i pomodori, cuoci a fuoco lento per 25 minuti.',
      'Servi con riso al vapore.',
    ],
  },
  'french-omelette-with-herbs': {
    name: 'Omelette francese alle erbe',
    description: 'Un\'omelette leggera e soffice con erbe fresche e formaggio fuso.',
    steps: [
      'Sbatti le uova con un pizzico di sale e pepe.',
      'Sciogli il burro in padella e versa le uova, mescolando delicatamente mentre rapprendono.',
      'Cospargi con formaggio ed erbe, piega e fai scivolare nel piatto.',
    ],
  },
  'french-onion-chicken-bake': {
    name: 'Pollo al forno con cipolle alla francese',
    description: 'Petti di pollo al forno con cipolle caramellate e formaggio fuso.',
    steps: [
      'Fai caramellare lentamente le cipolle affettate nel burro per 20 minuti finché ben dorate.',
      'Rosola i petti di pollo, poi copri con le cipolle caramellate e un po\' di brodo.',
      'Completa con formaggio e cuoci in forno a 190°C per 15 minuti finché bollente e cotto.',
    ],
  },
  'veggie-buddha-bowl': {
    name: 'Buddha bowl vegetariana',
    description: 'Una bowl colorata di quinoa, verdure al forno, avocado e salsa allo stile tahina.',
    steps: [
      'Cuoci la quinoa seguendo le istruzioni della confezione.',
      'Cuoci al forno patata dolce a cubetti e ceci con olio a 200°C per 20 minuti.',
      'Componi la bowl con quinoa, verdure al forno, spinaci e avocado a fette.',
    ],
  },
  'simple-vegetable-soup': {
    name: 'Semplice zuppa di verdure',
    description: 'Una zuppa economica e adatta al congelatore, per usare qualsiasi verdura tu abbia.',
    steps: [
      'Taglia tutte le verdure a pezzetti piccoli.',
      'Fai appassire cipolla e sedano, aggiungi le altre verdure e il brodo, copri con acqua.',
      'Cuoci a fuoco lento per 20 minuti finché tenere, poi frulla se preferisci una zuppa vellutata.',
    ],
  },
  'overnight-oats-with-berries': {
    name: 'Overnight oats ai frutti di bosco',
    description: 'Avena senza cottura messa in ammollo tutta la notte con latte, miele e frutti di bosco freschi.',
    steps: [
      'Unisci avena, latte e miele in un barattolo o una ciotola.',
      'Copri e metti in frigo per tutta la notte.',
      'Completa con frutti di bosco freschi prima di servire.',
    ],
  },
  'banana-pancakes': {
    name: 'Pancake alla banana',
    description: 'Pancake soffici resi ancora più speciali dalla banana schiacciata.',
    steps: [
      'Schiaccia le banane e sbattile con uova e latte.',
      'Incorpora la farina fino a ottenere un impasto liscio.',
      'Cuoci cucchiaiate di impasto in burro per 2 minuti per lato finché dorati.',
    ],
  },
  'greek-yoghurt-granola-pot': {
    name: 'Vasetto di yogurt greco e granola',
    description: 'Yogurt a strati, barrette ai cereali sbriciolate e frutta fresca — pronto in pochi minuti.',
    steps: [
      'Versa lo yogurt in una ciotola o un barattolo.',
      'Sbriciola sopra la barretta ai cereali e aggiungi la frutta.',
      'Completa con un filo di miele.',
    ],
  },
  'ham-cheese-toastie': {
    name: 'Toast al prosciutto e formaggio',
    description: 'Un classico panino grigliato con formaggio fuso e prosciutto.',
    steps: [
      'Imburra l\'esterno delle fette di pane.',
      'Farcisci con prosciutto e formaggio, poi tosta in padella o piastra per 3 minuti per lato.',
    ],
  },
  'tuna-pasta-salad': {
    name: 'Insalata di pasta al tonno',
    description: 'Un\'insalata di pasta fresca e proteica — perfetta da preparare in anticipo per il pranzo.',
    steps: [
      'Cuoci la pasta, scola e raffredda sotto acqua fredda.',
      'Mescola con tonno scolato, mais, pomodoro a cubetti e maionese.',
      'Tieni in frigo fino al momento di servire o portala per il pranzo.',
    ],
  },
  'chicken-caesar-wrap': {
    name: 'Wrap di pollo alla Caesar',
    description: 'Pollo grigliato, lattuga e parmigiano avvolti in una tortilla morbida.',
    steps: [
      'Condisci e cuoci il pollo in padella finché cotto, poi affettalo.',
      'Disponi lattuga, pollo, parmigiano e maionese sulle tortillas.',
      'Arrotola stretto e taglia a metà.',
    ],
  },
  'egg-fried-rice-with-prawns': {
    name: 'Riso saltato con uovo e gamberi',
    description: 'Una cena veloce in un\'unica padella con riso avanzato e gamberi.',
    steps: [
      'Strapazza le uova in un wok caldo e mettile da parte.',
      'Salta i gamberi finché rosa, poi aggiungi riso e piselli.',
      'Rimetti le uova, aggiungi la salsa di soia e mescola tutto.',
    ],
  },
  'mushroom-spinach-omelette': {
    name: 'Omelette con funghi e spinaci',
    description: 'Un\'omelette saporita e ricca di proteine, piena di verdure.',
    steps: [
      'Cuoci i funghi finché dorati, poi fai appassire gli spinaci.',
      'Sbatti le uova, versale sulle verdure in una padella imburrata.',
      'Cuoci delicatamente finché appena rapprese, piega e servi.',
    ],
  },
  'turkey-veg-meatballs': {
    name: 'Polpette di tacchino e verdure',
    description: 'Polpette magre di tacchino al forno con un semplice sugo di pomodoro.',
    steps: [
      'Mescola la carne di tacchino con carota grattugiata e uovo, forma piccole polpette.',
      'Cuoci in forno a 200°C per 15 minuti, oppure rosolale in padella.',
      'Cuoci a fuoco lento nella passata per 10 minuti, poi servi sugli spaghetti con parmigiano.',
    ],
  },
  'cod-pea-fish-cakes': {
    name: 'Polpette di merluzzo e piselli',
    description: 'Polpette di pesce croccanti fatte in casa con purè di patate e piselli.',
    steps: [
      'Fai bollire e schiaccia le patate; cuoci il merluzzo a vapore finché appena cotto e sfaldalo.',
      'Mescola purè, merluzzo sfaldato e piselli, forma delle polpette, infarinale e passale nell\'uovo sbattuto.',
      'Cuoci in padella per 4–5 minuti per lato finché dorate e calde.',
    ],
  },
  'chickpea-spinach-curry': {
    name: 'Curry di ceci e spinaci',
    description: 'Un curry veloce ed economico che usa ingredienti base della dispensa.',
    steps: [
      'Fai appassire la cipolla, aggiungi il garam masala e cuoci per un minuto.',
      'Aggiungi ceci e pomodori, cuoci a fuoco lento per 15 minuti.',
      'Unisci gli spinaci finché appassiti e servi con riso.',
    ],
  },
  'peanut-butter-banana-toast': {
    name: 'Toast al burro di arachidi e banana',
    description: 'Una colazione o merenda veloce e piena di energia.',
    steps: [
      'Tosta il pane.',
      'Spalma il burro di arachidi e completa con fette di banana.',
    ],
  },
  'roasted-vegetable-wrap': {
    name: 'Wrap di verdure al forno',
    description: 'Verdure calde al forno con hummus in una tortilla morbida.',
    steps: [
      'Cuoci al forno zucchina e peperone affettati con olio d\'oliva a 200°C per 18–20 minuti.',
      'Spalma l\'hummus sulle tortillas e riempi con le verdure al forno.',
      'Arrotola e servi caldo o freddo.',
    ],
  },
  'beef-stir-fry-with-noodles': {
    name: 'Manzo saltato con noodles',
    description: 'Un piatto saltato super veloce, pronto in 15 minuti, ideale per la settimana.',
    steps: [
      'Cuoci i noodles seguendo le istruzioni della confezione.',
      'Salta il manzo affettato a fuoco alto finché dorato, poi mettilo da parte.',
      'Salta i peperoni per 2–3 minuti, rimetti manzo e noodles, aggiungi la salsa di soia e mescola.',
    ],
  },
  'aubergine-chickpea-stew': {
    name: 'Stufato di melanzane e ceci',
    description: 'Uno stufato ricco e speziato che valorizza melanzana e ingredienti da dispensa.',
    steps: [
      'Fai appassire la cipolla, aggiungi la melanzana a cubetti e cuoci finché dorata.',
      'Aggiungi cumino, ceci e pomodori, cuoci a fuoco lento per 20 minuti.',
      'Servi con couscous.',
    ],
  },
  'kid-friendly-cheesy-pasta-bake': {
    name: 'Pasta al forno filante per bambini',
    description: 'Una pasta al forno amata da tutti, con una cremosa salsa al formaggio.',
    steps: [
      'Cuoci la pasta al dente.',
      'Sciogli il burro, aggiungi la farina, poi versa gradualmente il latte mescolando per una salsa liscia. Unisci gran parte del formaggio.',
      'Mescola con la pasta, completa con il formaggio rimasto e cuoci in forno a 200°C per 15 minuti finché dorata.',
    ],
  },
  'smoked-salmon-bagel': {
    name: 'Bagel al salmone affumicato',
    description: 'Una colazione o un pranzo leggero, veloce ed elegante.',
    steps: [
      'Tosta il bagel e spalmalo con il formaggio spalmabile.',
      'Completa con salmone affumicato e una spruzzata di limone.',
    ],
  },
  'chicken-sweetcorn-soup': {
    name: 'Zuppa di pollo e mais',
    description: 'Una zuppa delicata e sostanziosa, ottima per usare il pollo arrosto avanzato.',
    steps: [
      'Porta il brodo a bollore leggero e aggiungi mais e pollo sfilacciato.',
      'Versa a filo l\'uovo sbattuto mescolando per creare dei nastri.',
      'Cuoci a fuoco lento per 5 minuti e completa con cipollotto.',
    ],
  },
  'apple-cinnamon-porridge': {
    name: 'Porridge di mele e cannella',
    description: 'Una ciotola calda di avena con mela stufata e cannella.',
    steps: [
      'Cuoci l\'avena a fuoco lento con il latte per 5–6 minuti, mescolando di tanto in tanto.',
      'Grattugia o taglia a cubetti la mela e uniscila con la cannella.',
      'Dolcifica con il miele e servi.',
    ],
  },
};
