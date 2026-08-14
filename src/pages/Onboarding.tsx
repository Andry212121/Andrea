import { useState } from 'react';
import type { CuisineTag, DietTag, HouseholdPreferences, MealStyleTag } from '../types';
import Chip from '../components/Chip';
import Stepper from '../components/Stepper';
import ProgressDots from '../components/ProgressDots';
import { DIET_OPTIONS, COMMON_ALLERGIES, CUISINE_OPTIONS, MEAL_STYLE_OPTIONS } from '../data/options';
import { t, dietLabel, cuisineLabel, mealStyleLabel, allergyLabel, type Lang } from '../i18n';

interface OnboardingProps {
  onComplete: (prefs: Omit<HouseholdPreferences, 'onboarded'>) => void;
  language: Lang;
  setLanguage: (l: Lang) => void;
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export default function Onboarding({ onComplete, language, setLanguage }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState<{ id: string; age: number }[]>([]);
  const [diets, setDiets] = useState<DietTag[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState('');
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [customDislike, setCustomDislike] = useState('');
  const [cuisines, setCuisines] = useState<CuisineTag[]>([]);
  const [mealStyles, setMealStyles] = useState<MealStyleTag[]>([]);
  const [defaultServings, setDefaultServings] = useState(2);

  const STEPS = [
    t(language, 'onboarding.stepLanguage'), t(language, 'onboarding.stepHousehold'), t(language, 'onboarding.stepDiet'),
    t(language, 'onboarding.stepAllergies'), t(language, 'onboarding.stepDislikes'), t(language, 'onboarding.stepCuisines'),
    t(language, 'onboarding.stepStyles'), t(language, 'onboarding.stepServings'),
  ];

  const addChild = () => setChildren((c) => [...c, { id: crypto.randomUUID(), age: 6 }]);
  const removeChild = (id: string) => setChildren((c) => c.filter((x) => x.id !== id));
  const setChildAge = (id: string, age: number) => setChildren((c) => c.map((x) => (x.id === id ? { ...x, age } : x)));

  const toggleDiet = (d: DietTag) => {
    if (d === 'no-restrictions') {
      setDiets(diets.includes('no-restrictions') ? [] : ['no-restrictions']);
    } else {
      setDiets(toggle(diets.filter((x) => x !== 'no-restrictions'), d));
    }
  };

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    onComplete({
      adults, children, diets, allergies, dislikes, cuisines, mealStyles, defaultServings,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
      <div className="px-5 pt-8 pb-4 flex items-center justify-between">
        {step > 0 ? (
          <button onClick={back} className="text-emerald-700 font-semibold text-sm">{t(language, 'onboarding.back')}</button>
        ) : (
          <span />
        )}
        <ProgressDots total={STEPS.length} current={step} />
        <span className="text-xs text-gray-400 font-semibold">{step + 1}/{STEPS.length}</span>
      </div>

      <div className="flex-1 px-5 overflow-y-auto pb-28">
        {step === 0 && (
          <div>
            <Header emoji="🌐" title={t(language, 'onboarding.languageTitle')} subtitle={t(language, 'onboarding.languageSubtitle')} />
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLanguage('en')}
                className={`rounded-2xl p-5 text-center border-2 transition-colors ${language === 'en' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-100 bg-white'}`}
              >
                <div className="text-3xl mb-2">🇬🇧</div>
                <div className="font-bold text-gray-900">English</div>
              </button>
              <button
                onClick={() => setLanguage('it')}
                className={`rounded-2xl p-5 text-center border-2 transition-colors ${language === 'it' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-100 bg-white'}`}
              >
                <div className="text-3xl mb-2">🇮🇹</div>
                <div className="font-bold text-gray-900">Italiano</div>
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <Header emoji="🏡" title={t(language, 'onboarding.householdTitle')} subtitle={t(language, 'onboarding.householdSubtitle')} />
            <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
              <Stepper label={t(language, 'onboarding.adults')} value={adults} onChange={setAdults} min={1} max={10} />
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">{t(language, 'onboarding.children')}</span>
                <button onClick={addChild} className="text-sm font-bold text-emerald-600">{t(language, 'onboarding.addChild')}</button>
              </div>
              {children.length === 0 && <p className="text-xs text-gray-400">{t(language, 'onboarding.noChildren')}</p>}
              <div className="space-y-2">
                {children.map((c, i) => (
                  <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                    <span className="text-sm text-gray-600">{t(language, 'onboarding.child')} {i + 1}</span>
                    <div className="flex items-center gap-3">
                      <Stepper value={c.age} onChange={(v) => setChildAge(c.id, v)} min={0} max={18} label={t(language, 'onboarding.age')} />
                      <button onClick={() => removeChild(c.id)} className="text-gray-400 text-sm">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <Header emoji="🥗" title={t(language, 'onboarding.dietTitle')} subtitle={t(language, 'onboarding.dietSubtitle')} />
            <div className="flex flex-wrap gap-2">
              {DIET_OPTIONS.map((d) => (
                <Chip key={d.id} label={dietLabel(d.id, language)} emoji={d.emoji} selected={diets.includes(d.id)} onClick={() => toggleDiet(d.id)} />
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <Header emoji="⚠️" title={t(language, 'onboarding.allergiesTitle')} subtitle={t(language, 'onboarding.allergiesSubtitle')} />
            <div className="flex flex-wrap gap-2 mb-4">
              {COMMON_ALLERGIES.map((a) => (
                <Chip key={a} label={allergyLabel(a, language)} selected={allergies.includes(a)} onClick={() => setAllergies(toggle(allergies, a))} />
              ))}
            </div>
            <CustomAdder
              placeholder={t(language, 'onboarding.addAllergy')}
              value={customAllergy}
              onChange={setCustomAllergy}
              onAdd={() => {
                if (customAllergy.trim()) setAllergies((a) => [...a, customAllergy.trim()]);
                setCustomAllergy('');
              }}
            />
            {allergies.filter((a) => !COMMON_ALLERGIES.includes(a)).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {allergies.filter((a) => !COMMON_ALLERGIES.includes(a)).map((a) => (
                  <Chip key={a} label={a} selected onClick={() => setAllergies(toggle(allergies, a))} />
                ))}
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <Header emoji="🙅" title={t(language, 'onboarding.dislikesTitle')} subtitle={t(language, 'onboarding.dislikesSubtitle')} />
            <CustomAdder
              placeholder={t(language, 'onboarding.dislikesPlaceholder')}
              value={customDislike}
              onChange={setCustomDislike}
              onAdd={() => {
                if (customDislike.trim()) setDislikes((d) => [...d, customDislike.trim()]);
                setCustomDislike('');
              }}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {dislikes.map((d) => (
                <Chip key={d} label={d} selected onClick={() => setDislikes(toggle(dislikes, d))} />
              ))}
            </div>
            {dislikes.length === 0 && <p className="text-xs text-gray-400 mt-3">{t(language, 'onboarding.noDislikes')}</p>}
          </div>
        )}

        {step === 5 && (
          <div>
            <Header emoji="🌍" title={t(language, 'onboarding.cuisinesTitle')} subtitle={t(language, 'onboarding.cuisinesSubtitle')} />
            <div className="flex flex-wrap gap-2">
              {CUISINE_OPTIONS.map((c) => (
                <Chip key={c.id} label={cuisineLabel(c.id, language)} emoji={c.emoji} selected={cuisines.includes(c.id)} onClick={() => setCuisines(toggle(cuisines, c.id))} />
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <Header emoji="🍽️" title={t(language, 'onboarding.stylesTitle')} subtitle={t(language, 'onboarding.stylesSubtitle')} />
            <div className="flex flex-wrap gap-2">
              {MEAL_STYLE_OPTIONS.map((m) => (
                <Chip key={m.id} label={mealStyleLabel(m.id, language)} emoji={m.emoji} selected={mealStyles.includes(m.id)} onClick={() => setMealStyles(toggle(mealStyles, m.id))} />
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <Header emoji="🍴" title={t(language, 'onboarding.servingsTitle')} subtitle={t(language, 'onboarding.servingsSubtitle')} />
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <Stepper label={t(language, 'onboarding.peoplePerMeal')} value={defaultServings} onChange={setDefaultServings} min={1} max={12} />
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom">
        <div className="max-w-lg mx-auto">
          {step < STEPS.length - 1 ? (
            <button onClick={next} className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-2xl shadow-sm">
              {t(language, 'onboarding.continue')}
            </button>
          ) : (
            <button onClick={finish} className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-2xl shadow-sm">
              {t(language, 'onboarding.finish')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Header({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <div className="text-4xl mb-2">{emoji}</div>
      <h1 className="text-xl font-extrabold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function CustomAdder({ value, onChange, onAdd, placeholder }: { value: string; onChange: (v: string) => void; onAdd: () => void; placeholder: string }) {
  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onAdd()}
        placeholder={placeholder}
        className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
      />
      <button onClick={onAdd} className="bg-emerald-600 text-white font-bold w-11 h-11 rounded-full shrink-0">+</button>
    </div>
  );
}
