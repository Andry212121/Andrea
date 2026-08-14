import { useMemo, useState } from 'react';
import type { AppStore } from '../store';
import type { StorageLocation, CatalogIngredient, PantryItem } from '../types';
import { INGREDIENT_CATALOG, SECTION_CATEGORIES } from '../data/ingredients';
import SearchBar from '../components/SearchBar';
import Chip from '../components/Chip';
import Sheet from '../components/Sheet';
import { daysUntil } from '../utils/date';
import { t, foodName, categoryLabel, sectionLabel, sectionShortLabel, type Lang } from '../i18n';

interface MyFoodProps {
  store: AppStore;
}

const SECTIONS: StorageLocation[] = ['fridge', 'freezer', 'pantry'];
const SECTION_EMOJI: Record<StorageLocation, string> = { fridge: '🧊', freezer: '❄️', pantry: '🗄️' };

export default function MyFood({ store }: MyFoodProps) {
  const lang = store.language;
  const [section, setSection] = useState<StorageLocation>('fridge');
  const [query, setQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const havCount = store.pantry.filter((p) => p.have && p.section === section).length;

  const customItems = store.pantry.filter((p) => p.custom && p.section === section);

  const categories = SECTION_CATEGORIES[section];

  const isOpen = (cat: string) => query.trim() !== '' || openCategories.has(cat);
  const toggleCategory = (cat: string) =>
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });

  const q = query.trim().toLowerCase();
  const matches = (name: string) => name.toLowerCase().includes(q) || foodName(name, lang).toLowerCase().includes(q);

  return (
    <div className="pb-28">
      <div className="px-5 pt-8 pb-3 sticky top-0 bg-[#f7faf5] z-10">
        <h1 className="text-xl font-extrabold text-gray-900">{t(lang, 'myfood.title')}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t(lang, 'myfood.subtitle')}</p>

        <div className="flex gap-2 mt-4">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                section === s ? 'bg-emerald-600 text-white' : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              <span>{SECTION_EMOJI[s]}</span> {sectionShortLabel(s, lang)}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <SearchBar value={query} onChange={setQuery} placeholder={t(lang, 'myfood.searchPlaceholder', { section: sectionShortLabel(section, lang).toLowerCase() })} />
        </div>

        <div className="text-xs text-gray-400 font-semibold mt-2">{havCount} {t(lang, 'myfood.itemsIn')} {sectionLabel(section, lang).toLowerCase()}</div>
      </div>

      <div className="px-5 space-y-2 mt-2">
        {categories.map((cat) => {
          const catalogInCat = INGREDIENT_CATALOG.filter((i) => i.section === section && i.category === cat && matches(i.name));
          const customInCat = customItems.filter((i) => i.category === cat && matches(i.name));
          if (query.trim() && catalogInCat.length === 0 && customInCat.length === 0) return null;
          const haveInCat = catalogInCat.filter((i) => !!store.pantryByIngredient.get(i.id)?.have).length + customInCat.length;

          return (
            <div key={cat} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button onClick={() => toggleCategory(cat)} className="w-full flex items-center justify-between px-4 py-3">
                <span className="font-bold text-gray-800 text-sm">{categoryLabel(cat, lang)}</span>
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  {haveInCat > 0 && <span className="text-emerald-600 font-bold">{haveInCat} {t(lang, 'myfood.haveShort')}</span>}
                  <span className={`transition-transform ${isOpen(cat) ? 'rotate-180' : ''}`}>▾</span>
                </span>
              </button>
              {isOpen(cat) && (
                <div className="border-t border-gray-100 divide-y divide-gray-50">
                  {catalogInCat.map((ci) => (
                    <CatalogRow
                      key={ci.id}
                      catalogItem={ci}
                      pantryItem={store.pantryByIngredient.get(ci.id)}
                      store={store}
                      lang={lang}
                      expanded={expandedItem === ci.id}
                      onExpandToggle={() => setExpandedItem(expandedItem === ci.id ? null : ci.id)}
                    />
                  ))}
                  {customInCat.map((item) => (
                    <CustomRow key={item.id} item={item} store={store} lang={lang} expanded={expandedItem === item.id} onExpandToggle={() => setExpandedItem(expandedItem === item.id ? null : item.id)} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-20 right-5 z-30">
        <button
          onClick={() => setAddOpen(true)}
          className="bg-emerald-600 text-white font-bold w-14 h-14 rounded-full shadow-lg text-2xl flex items-center justify-center"
        >
          +
        </button>
      </div>

      <AddCustomSheet open={addOpen} onClose={() => setAddOpen(false)} section={section} store={store} lang={lang} />
    </div>
  );
}

function CatalogRow({
  catalogItem, pantryItem, store, lang, expanded, onExpandToggle,
}: {
  catalogItem: CatalogIngredient; pantryItem?: PantryItem; store: AppStore; lang: Lang; expanded: boolean; onExpandToggle: () => void;
}) {
  const have = !!pantryItem?.have;
  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-2.5">
        <span className="text-xl">{catalogItem.emoji}</span>
        <button
          onClick={have ? onExpandToggle : undefined}
          disabled={!have}
          className="flex-1 text-left text-sm text-gray-700 font-medium disabled:text-gray-700"
        >
          {foodName(catalogItem.name, lang)}
        </button>
        {have && (
          <button onClick={onExpandToggle} className="text-gray-300 text-xs px-1">
            {expanded ? '▴' : '▾'}
          </button>
        )}
        <button
          onClick={() => store.toggleCatalogItem(catalogItem)}
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
            have ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'
          }`}
        >
          {have && '✓'}
        </button>
      </div>
      {have && expanded && pantryItem && <ItemDetails item={pantryItem} store={store} lang={lang} />}
    </div>
  );
}

function CustomRow({ item, store, lang, expanded, onExpandToggle }: { item: PantryItem; store: AppStore; lang: Lang; expanded: boolean; onExpandToggle: () => void }) {
  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-2.5">
        <span className="text-xl">{item.emoji}</span>
        <button onClick={onExpandToggle} className="flex-1 text-left text-sm text-gray-700 font-medium">
          {item.name} <span className="text-[10px] text-gray-400">{t(lang, 'myfood.custom')}</span>
        </button>
        <button onClick={onExpandToggle} className="text-gray-300 text-xs px-1">{expanded ? '▴' : '▾'}</button>
        <button onClick={() => store.removePantryItem(item.id)} className="text-rose-400 text-sm">🗑</button>
      </div>
      {expanded && <ItemDetails item={item} store={store} lang={lang} />}
    </div>
  );
}

function ItemDetails({ item, store, lang }: { item: PantryItem; store: AppStore; lang: Lang }) {
  const expiringSoon = item.expiry && daysUntil(item.expiry) <= 4;
  return (
    <div className="bg-gray-50 px-4 py-3 space-y-3">
      <div className="flex gap-3">
        <label className="flex-1">
          <span className="text-[11px] font-semibold text-gray-500">{t(lang, 'myfood.quantity')}</span>
          <input
            type="number"
            min={0}
            value={item.quantity ?? ''}
            onChange={(e) => store.updatePantryItem(item.id, { quantity: e.target.value === '' ? undefined : Number(e.target.value) })}
            placeholder={t(lang, 'myfood.optional')}
            className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm"
          />
        </label>
        <label className="flex-1">
          <span className="text-[11px] font-semibold text-gray-500">{t(lang, 'myfood.unit')}</span>
          <input
            value={item.unit ?? ''}
            onChange={(e) => store.updatePantryItem(item.id, { unit: e.target.value })}
            placeholder="g, pz..."
            className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-[11px] font-semibold text-gray-500">{t(lang, 'myfood.expiry')}</span>
        <input
          type="date"
          value={item.expiry ?? ''}
          onChange={(e) => store.updatePantryItem(item.id, { expiry: e.target.value || undefined })}
          className={`w-full mt-1 bg-white border rounded-lg px-2.5 py-1.5 text-sm ${expiringSoon ? 'border-amber-400 text-amber-700' : 'border-gray-200'}`}
        />
      </label>
      <div className="flex gap-2">
        <span className="text-[11px] font-semibold text-gray-500 pt-2">{t(lang, 'myfood.location')}</span>
        {(['fridge', 'freezer', 'pantry'] as StorageLocation[]).map((loc) => (
          <Chip key={loc} size="sm" label={sectionShortLabel(loc, lang)} selected={item.section === loc} onClick={() => store.updatePantryItem(item.id, { section: loc })} />
        ))}
      </div>
    </div>
  );
}

function AddCustomSheet({ open, onClose, section, store, lang }: { open: boolean; onClose: () => void; section: StorageLocation; store: AppStore; lang: Lang }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(SECTION_CATEGORIES[section][0]);
  const cats = useMemo(() => SECTION_CATEGORIES[section], [section]);

  const submit = () => {
    if (!name.trim()) return;
    store.addCustomItem({ name: name.trim(), section, category });
    setName('');
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} title={t(lang, 'myfood.addCustom')}>
      <div className="px-5 py-4 space-y-4">
        <label className="block">
          <span className="text-xs font-semibold text-gray-500">{t(lang, 'myfood.ingredientName')}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t(lang, 'myfood.ingredientPlaceholder')}
            autoFocus
            className="w-full mt-1 bg-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </label>
        <div>
          <span className="text-xs font-semibold text-gray-500">{t(lang, 'myfood.category')} ({sectionLabel(section, lang)})</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {cats.map((c) => (
              <Chip key={c} size="sm" label={categoryLabel(c, lang)} selected={category === c} onClick={() => setCategory(c)} />
            ))}
          </div>
        </div>
        <button onClick={submit} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl mt-2">
          {t(lang, 'myfood.addToMyFood')}
        </button>
      </div>
    </Sheet>
  );
}
