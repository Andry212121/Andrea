import { useState } from 'react';
import type { Page } from './types';
import { useAppStore } from './store';
import Nav from './components/Nav';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import MealPlan from './pages/MealPlan';
import MyFood from './pages/MyFood';
import PackLunch from './pages/PackLunch';
import Shopping from './pages/Shopping';
import Settings from './pages/Settings';
import './index.css';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const store = useAppStore();

  if (!store.prefs.onboarded) {
    return (
      <Onboarding
        onComplete={store.completeOnboarding}
        language={store.language}
        setLanguage={store.setLanguage}
      />
    );
  }

  const uncheckedShopping = store.shoppingItems.filter((i) => !i.checked).length;

  return (
    <div className="min-h-screen bg-[#f7faf5]">
      {page === 'home' && <Home store={store} onNavigate={setPage} />}
      {page === 'mealplan' && <MealPlan store={store} onNavigate={setPage} />}
      {page === 'myfood' && <MyFood store={store} />}
      {page === 'packlunch' && <PackLunch store={store} />}
      {page === 'shopping' && <Shopping store={store} />}
      {page === 'settings' && <Settings store={store} onNavigate={setPage} />}

      <Nav current={page} onNavigate={setPage} shoppingCount={uncheckedShopping} lang={store.language} />
    </div>
  );
}
