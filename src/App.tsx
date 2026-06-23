import { useState } from 'react';
import type { Page } from './types';
import { useAppStore } from './store';
import Nav from './components/Nav';
import AchievementToast from './components/AchievementToast';
import Dashboard from './pages/Dashboard';
import Businesses from './pages/Businesses';
import Money from './pages/Money';
import Goals from './pages/Goals';
import Learn from './pages/Learn';
import './index.css';

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const store = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
      <AchievementToast
        achievementId={store.newAchievement}
        onDismiss={store.dismissAchievement}
      />

      {page === 'dashboard' && (
        <Dashboard
          kidName={store.kidName}
          setKidName={store.setKidName}
          totalBalance={store.totalBalance}
          totalIncome={store.totalIncome}
          businesses={store.businesses}
          goals={store.goals}
          unlockedAchievements={store.unlockedAchievements}
          onNavigate={(p) => setPage(p as Page)}
        />
      )}
      {page === 'businesses' && (
        <Businesses
          businesses={store.businesses}
          businessPlans={store.businessPlans}
          addBusiness={store.addBusiness}
          deleteBusiness={store.deleteBusiness}
          saveBusinessPlan={store.saveBusinessPlan}
        />
      )}
      {page === 'money' && (
        <Money
          businesses={store.businesses}
          transactions={store.transactions}
          addTransaction={store.addTransaction}
          totalBalance={store.totalBalance}
        />
      )}
      {page === 'goals' && (
        <Goals
          goals={store.goals}
          addGoal={store.addGoal}
          contributeToGoal={store.contributeToGoal}
          deleteGoal={store.deleteGoal}
          totalBalance={store.totalBalance}
        />
      )}
      {page === 'learn' && <Learn />}

      <Nav current={page} onNavigate={setPage} />
    </div>
  );
}
