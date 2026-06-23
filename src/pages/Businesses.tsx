import { useState } from 'react';
import type { Business, BusinessPlan } from '../types';

const EMOJIS = ['🛍️', '🍪', '🌸', '🎨', '🐶', '🚗', '📚', '🎵', '🌱', '⭐', '🧁', '🎯'];
const COLORS = [
  'bg-yellow-100', 'bg-pink-100', 'bg-purple-100', 'bg-blue-100',
  'bg-green-100', 'bg-orange-100', 'bg-red-100', 'bg-indigo-100',
];

type SubPage = 'list' | 'plan' | 'price';

interface BusinessesProps {
  businesses: Business[];
  businessPlans: BusinessPlan[];
  addBusiness: (b: Omit<Business, 'id' | 'createdAt' | 'totalEarned'>) => void;
  deleteBusiness: (id: string) => void;
  saveBusinessPlan: (plan: Omit<BusinessPlan, 'id' | 'createdAt'>) => void;
}

// ── Pricing Calculator ────────────────────────────────────────────────
function PricingCalculator({ onBack }: { onBack: () => void }) {
  const [materials, setMaterials] = useState('');
  const [hours, setHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('10');
  const [margin, setMargin] = useState('30');

  const cost = (parseFloat(materials) || 0) + (parseFloat(hours) || 0) * (parseFloat(hourlyRate) || 0);
  const minPrice = cost;
  const suggestedPrice = cost / (1 - (parseFloat(margin) || 30) / 100);
  const hasResult = cost > 0;

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <button onClick={onBack} className="text-gray-500 font-bold mb-4 flex items-center gap-1 hover:text-gray-700">
        ← Back
      </button>
      <h1 className="text-2xl font-black text-gray-800 mb-1">Pricing Calculator 🧮</h1>
      <p className="text-gray-500 text-sm mb-4">Figure out what to charge for your product or service.</p>

      <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Cost of materials / supplies ($)</label>
          <input
            type="number" min="0" step="0.01" value={materials}
            onChange={e => setMaterials(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:border-orange-400 outline-none"
            placeholder="e.g. 2.50 for cookie ingredients"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Time to make / do (hours)</label>
          <input
            type="number" min="0" step="0.25" value={hours}
            onChange={e => setHours(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:border-orange-400 outline-none"
            placeholder="e.g. 0.5 for 30 minutes"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">
            Your hourly rate ($) <span className="text-gray-400 font-normal">— what is your time worth?</span>
          </label>
          <input
            type="number" min="0" step="1" value={hourlyRate}
            onChange={e => setHourlyRate(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:border-orange-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">
            Profit margin: <span className="text-orange-600 font-black">{margin}%</span>
          </label>
          <input
            type="range" min="5" max="80" step="5" value={margin}
            onChange={e => setMargin(e.target.value)}
            className="w-full accent-orange-400"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>5% (low)</span><span>40% (good)</span><span>80% (high)</span>
          </div>
        </div>
      </div>

      {hasResult && (
        <div className="space-y-3">
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
            <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Total Cost</p>
            <p className="text-3xl font-black text-orange-500">${cost.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">materials + your time</p>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
            <p className="text-xs text-red-600 font-bold uppercase tracking-wider">Minimum Price</p>
            <p className="text-3xl font-black text-red-500">${minPrice.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">You'd break even — no profit!</p>
          </div>

          <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-4">
            <p className="text-xs text-green-700 font-bold uppercase tracking-wider">⭐ Suggested Price</p>
            <p className="text-4xl font-black text-green-600">${suggestedPrice.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">
              With {margin}% margin = ${(suggestedPrice - cost).toFixed(2)} profit per unit
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="font-black text-gray-700 mb-2">💡 Pricing Tips</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>✓ Check what competitors charge</li>
              <li>✓ Start slightly lower to get first customers</li>
              <li>✓ Raise prices as your reputation grows</li>
              <li>✓ Offer bundles (3 for $X) to sell more</li>
            </ul>
          </div>
        </div>
      )}

      {!hasResult && (
        <div className="text-center py-8 text-gray-400">
          <span className="text-5xl">🧮</span>
          <p className="mt-2 font-semibold">Fill in your costs above to see suggested pricing</p>
        </div>
      )}
    </div>
  );
}

// ── Business Plan Wizard ──────────────────────────────────────────────
const PLAN_STEPS = [
  { key: 'problem', label: 'What problem do you solve?', placeholder: 'e.g. People want fresh cookies but don\'t have time to bake', emoji: '🤔' },
  { key: 'customers', label: 'Who are your customers?', placeholder: 'e.g. Neighbors, classmates, parents at school events', emoji: '👥' },
  { key: 'product', label: 'What do you sell or do?', placeholder: 'e.g. Homemade chocolate chip cookies in bags of 6', emoji: '🛍️' },
  { key: 'price', label: 'How much will you charge?', placeholder: 'e.g. $3 per bag, $5 for a dozen', emoji: '💵' },
  { key: 'startupCosts', label: 'What do you need to start?', placeholder: 'e.g. $10 for ingredients, mixing bowls, bags', emoji: '🛒' },
  { key: 'marketing', label: 'How will you find customers?', placeholder: 'e.g. Tell neighbors, make flyers, post in family group chat', emoji: '📢' },
  { key: 'monthGoal', label: 'What\'s your goal for the first month?', placeholder: 'e.g. Sell 20 bags and earn $60', emoji: '🎯' },
] as const;

type PlanKey = typeof PLAN_STEPS[number]['key'];

function BusinessPlanWizard({
  business,
  existingPlan,
  onSave,
  onBack,
}: {
  business: Business;
  existingPlan?: BusinessPlan;
  onSave: (plan: Omit<BusinessPlan, 'id' | 'createdAt'>) => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<PlanKey, string>>({
    problem: existingPlan?.problem ?? '',
    customers: existingPlan?.customers ?? '',
    product: existingPlan?.product ?? '',
    price: existingPlan?.price ?? '',
    startupCosts: existingPlan?.startupCosts ?? '',
    marketing: existingPlan?.marketing ?? '',
    monthGoal: existingPlan?.monthGoal ?? '',
  });
  const [done, setDone] = useState(false);

  const current = PLAN_STEPS[step];
  const isLast = step === PLAN_STEPS.length - 1;

  const next = () => {
    if (isLast) {
      onSave({ businessId: business.id, ...values });
      setDone(true);
    } else {
      setStep(s => s + 1);
    }
  };

  if (done) {
    return (
      <div className="p-4 pb-24 max-w-lg mx-auto">
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 mb-4">
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">🎉</div>
            <h2 className="text-2xl font-black text-gray-800">Business Plan Ready!</h2>
            <p className="text-gray-500 mt-1">You're a real entrepreneur now!</p>
          </div>

          <div className={`${business.color} rounded-2xl p-3 flex items-center gap-3 mb-4`}>
            <span className="text-3xl">{business.emoji}</span>
            <div>
              <p className="font-black text-gray-800">{business.name}</p>
              <p className="text-sm text-gray-600">Business Plan</p>
            </div>
          </div>

          <div className="space-y-3">
            {PLAN_STEPS.map(s => values[s.key] && (
              <div key={s.key}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{s.emoji} {s.label}</p>
                <p className="text-gray-700 font-semibold mt-0.5">{values[s.key]}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onBack}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 font-black text-yellow-900 rounded-2xl"
        >
          Back to Businesses 🏪
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <button onClick={onBack} className="text-gray-500 font-bold mb-4 flex items-center gap-1 hover:text-gray-700">
        ← Back
      </button>

      <div className={`${business.color} rounded-2xl p-3 flex items-center gap-2 mb-4`}>
        <span className="text-2xl">{business.emoji}</span>
        <p className="font-black text-gray-800">{business.name} — Business Plan</p>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {PLAN_STEPS.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full ${i <= step ? 'bg-yellow-400' : 'bg-gray-200'}`} />
        ))}
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
        <div className="text-4xl mb-3">{current.emoji}</div>
        <h2 className="text-xl font-black text-gray-800 mb-1">{current.label}</h2>
        <p className="text-sm text-gray-400 mb-4">Step {step + 1} of {PLAN_STEPS.length}</p>

        <textarea
          autoFocus
          value={values[current.key]}
          onChange={e => setValues(v => ({ ...v, [current.key]: e.target.value }))}
          className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:border-yellow-400 outline-none resize-none h-28"
          placeholder={current.placeholder}
        />
      </div>

      <div className="flex gap-2 mt-4">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="px-6 py-3 border-2 border-gray-200 font-bold text-gray-500 rounded-2xl">
            ← Back
          </button>
        )}
        <button
          onClick={next}
          className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-500 font-black text-yellow-900 rounded-2xl transition-all"
        >
          {isLast ? 'Finish Plan! 🎉' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

// ── Main Businesses Page ──────────────────────────────────────────────
export default function Businesses({ businesses, businessPlans, addBusiness, deleteBusiness, saveBusinessPlan }: BusinessesProps) {
  const [subPage, setSubPage] = useState<SubPage>('list');
  const [planBusinessId, setPlanBusinessId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('🛍️');
  const [color, setColor] = useState('bg-yellow-100');

  const submit = () => {
    if (!name.trim()) return;
    addBusiness({ name: name.trim(), description: description.trim(), emoji, color });
    setName(''); setDescription(''); setEmoji('🛍️'); setColor('bg-yellow-100');
    setShowForm(false);
  };

  if (subPage === 'price') return <PricingCalculator onBack={() => setSubPage('list')} />;

  if (subPage === 'plan' && planBusinessId) {
    const biz = businesses.find(b => b.id === planBusinessId)!;
    const plan = businessPlans.find(p => p.businessId === planBusinessId);
    return (
      <BusinessPlanWizard
        business={biz}
        existingPlan={plan}
        onSave={saveBusinessPlan}
        onBack={() => { setSubPage('list'); setPlanBusinessId(null); }}
      />
    );
  }

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-black text-gray-800">Businesses 🏪</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black px-4 py-2 rounded-2xl shadow transition-all hover:scale-105"
        >
          + New
        </button>
      </div>

      {/* Tools row */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSubPage('price')}
          className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold py-2 px-3 rounded-2xl text-sm transition-colors flex items-center justify-center gap-1"
        >
          🧮 Pricing Calculator
        </button>
      </div>

      {/* New Business Form */}
      {showForm && (
        <div className="bg-white rounded-3xl p-5 mb-4 shadow-lg border-2 border-yellow-300">
          <h2 className="font-black text-gray-700 text-lg mb-4">🌟 New Business Idea</h2>

          <label className="block text-sm font-bold text-gray-600 mb-1">Business Name *</label>
          <input
            autoFocus value={name} onChange={e => setName(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-3 focus:border-yellow-400 outline-none"
            placeholder="e.g. Cookie Stand, Dog Walking..."
          />

          <label className="block text-sm font-bold text-gray-600 mb-1">What do you sell / do?</label>
          <input
            value={description} onChange={e => setDescription(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-3 focus:border-yellow-400 outline-none"
            placeholder="Describe your business..."
          />

          <label className="block text-sm font-bold text-gray-600 mb-2">Pick an emoji</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setEmoji(e)}
                className={`text-2xl p-1.5 rounded-xl transition-all ${emoji === e ? 'bg-yellow-200 scale-125' : 'hover:bg-gray-100'}`}>
                {e}
              </button>
            ))}
          </div>

          <label className="block text-sm font-bold text-gray-600 mb-2">Pick a color</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full ${c} border-2 transition-all ${color === c ? 'border-gray-600 scale-125' : 'border-transparent'}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-xl border-2 border-gray-200 font-bold text-gray-500">Cancel</button>
            <button onClick={submit} disabled={!name.trim()}
              className="flex-1 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 font-black text-yellow-900 disabled:opacity-40 transition-all">
              Create! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Business List */}
      {businesses.length === 0 && !showForm ? (
        <div className="text-center py-12">
          <span className="text-6xl">🏪</span>
          <p className="text-gray-500 mt-3 font-semibold">No businesses yet!</p>
          <p className="text-gray-400 text-sm">Tap "+ New" to create your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {businesses.map(b => {
            const hasPlan = businessPlans.some(p => p.businessId === b.id);
            return (
              <div key={b.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${b.color}`}>
                    {b.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-800 text-lg">{b.name}</h3>
                    <p className="text-gray-500 text-sm">{b.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Since {new Date(b.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-black ${b.totalEarned >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${b.totalEarned.toFixed(2)}
                    </p>
                    <button onClick={() => { if (confirm(`Delete "${b.name}"?`)) deleteBusiness(b.id); }}
                      className="text-xs text-red-400 hover:text-red-600 mt-1">delete</button>
                  </div>
                </div>

                <button
                  onClick={() => { setPlanBusinessId(b.id); setSubPage('plan'); }}
                  className={`w-full py-2 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-1 ${
                    hasPlan
                      ? 'bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200'
                      : 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}
                >
                  {hasPlan ? '📝 View / Edit Business Plan' : '📝 Write Business Plan'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
