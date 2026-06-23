import { useState, useEffect, useRef } from 'react';
import type { Business, Transaction, Goal, BusinessPlan, Achievement } from './types';
import { ACHIEVEMENTS } from './achievements';

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export function useAppStore() {
  const [businesses, setBusinesses] = useLocalStorage<Business[]>('ke_businesses', []);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('ke_transactions', []);
  const [goals, setGoals] = useLocalStorage<Goal[]>('ke_goals', []);
  const [businessPlans, setBusinessPlans] = useLocalStorage<BusinessPlan[]>('ke_plans', []);
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage<Achievement[]>('ke_achievements', []);
  const [kidName, setKidName] = useLocalStorage<string>('ke_name', '');
  const [newAchievement, setNewAchievement] = useState<string | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lessonsCompleted = (() => {
    try {
      const s = localStorage.getItem('ke_learn_completed');
      return s ? JSON.parse(s).length : 0;
    } catch { return 0; }
  })();

  const checkAchievements = (
    biz: Business[],
    txs: Transaction[],
    gls: Goal[],
    plans: BusinessPlan[],
    currentUnlocked: Achievement[]
  ) => {
    const totalIncome = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const state = {
      businessCount: biz.length,
      totalIncome,
      transactionCount: txs.length,
      completedGoals: gls.filter(g => g.completed).length,
      goalCount: gls.length,
      lessonsCompleted,
      totalLessons: 6,
      businessPlanCount: plans.length,
    };

    const unlockedIds = new Set(currentUnlocked.map(a => a.id));
    const newOnes: Achievement[] = [];

    for (const def of ACHIEVEMENTS) {
      if (!unlockedIds.has(def.id) && def.check(state)) {
        newOnes.push({ id: def.id, unlockedAt: new Date().toISOString() });
      }
    }

    if (newOnes.length > 0) {
      const updated = [...currentUnlocked, ...newOnes];
      setUnlockedAchievements(updated);
      setNewAchievement(newOnes[newOnes.length - 1].id);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      dismissTimer.current = setTimeout(() => setNewAchievement(null), 4000);
    }
  };

  const addBusiness = (b: Omit<Business, 'id' | 'createdAt' | 'totalEarned'>) => {
    const newB: Business = {
      ...b,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      totalEarned: 0,
    };
    const updated = [...businesses, newB];
    setBusinesses(updated);
    checkAchievements(updated, transactions, goals, businessPlans, unlockedAchievements);
    return newB;
  };

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newT: Transaction = { ...t, id: crypto.randomUUID() };
    const updatedTxs = [...transactions, newT];
    setTransactions(updatedTxs);
    const updatedBiz = businesses.map(b =>
      b.id === t.businessId
        ? { ...b, totalEarned: b.totalEarned + (t.type === 'income' ? t.amount : -t.amount) }
        : b
    );
    setBusinesses(updatedBiz);
    checkAchievements(updatedBiz, updatedTxs, goals, businessPlans, unlockedAchievements);
  };

  const addGoal = (g: Omit<Goal, 'id' | 'completed' | 'currentAmount'>) => {
    const newG: Goal = { ...g, id: crypto.randomUUID(), completed: false, currentAmount: 0 };
    const updated = [...goals, newG];
    setGoals(updated);
    checkAchievements(businesses, transactions, updated, businessPlans, unlockedAchievements);
  };

  const contributeToGoal = (goalId: string, amount: number) => {
    const updated = goals.map(g =>
      g.id === goalId
        ? {
            ...g,
            currentAmount: Math.min(g.currentAmount + amount, g.targetAmount),
            completed: g.currentAmount + amount >= g.targetAmount,
          }
        : g
    );
    setGoals(updated);
    checkAchievements(businesses, transactions, updated, businessPlans, unlockedAchievements);
  };

  const saveBusinessPlan = (plan: Omit<BusinessPlan, 'id' | 'createdAt'>) => {
    const existing = businessPlans.find(p => p.businessId === plan.businessId);
    let updated: BusinessPlan[];
    if (existing) {
      updated = businessPlans.map(p =>
        p.businessId === plan.businessId ? { ...p, ...plan } : p
      );
    } else {
      updated = [...businessPlans, { ...plan, id: crypto.randomUUID(), createdAt: new Date().toISOString() }];
    }
    setBusinessPlans(updated);
    checkAchievements(businesses, transactions, goals, updated, unlockedAchievements);
  };

  const deleteGoal = (goalId: string) => setGoals(prev => prev.filter(g => g.id !== goalId));

  const deleteBusiness = (businessId: string) => {
    setBusinesses(prev => prev.filter(b => b.id !== businessId));
    setTransactions(prev => prev.filter(t => t.businessId !== businessId));
    setBusinessPlans(prev => prev.filter(p => p.businessId !== businessId));
  };

  const totalBalance = transactions.reduce(
    (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount),
    0
  );

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

  return {
    businesses, transactions, goals, businessPlans,
    unlockedAchievements, kidName, newAchievement,
    setKidName, addBusiness, addTransaction, addGoal,
    contributeToGoal, deleteGoal, deleteBusiness,
    saveBusinessPlan, totalBalance, totalIncome,
    dismissAchievement: () => setNewAchievement(null),
  };
}
