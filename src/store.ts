import { useState, useEffect } from 'react';
import type { Business, Transaction, Goal } from './types';

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
  const [kidName, setKidName] = useLocalStorage<string>('ke_name', '');

  const addBusiness = (b: Omit<Business, 'id' | 'createdAt' | 'totalEarned'>) => {
    const newB: Business = {
      ...b,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      totalEarned: 0,
    };
    setBusinesses(prev => [...prev, newB]);
    return newB;
  };

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newT: Transaction = { ...t, id: crypto.randomUUID() };
    setTransactions(prev => [...prev, newT]);
    setBusinesses(prev =>
      prev.map(b =>
        b.id === t.businessId
          ? { ...b, totalEarned: b.totalEarned + (t.type === 'income' ? t.amount : -t.amount) }
          : b
      )
    );
  };

  const addGoal = (g: Omit<Goal, 'id' | 'completed' | 'currentAmount'>) => {
    const newG: Goal = { ...g, id: crypto.randomUUID(), completed: false, currentAmount: 0 };
    setGoals(prev => [...prev, newG]);
  };

  const contributeToGoal = (goalId: string, amount: number) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === goalId
          ? { ...g, currentAmount: Math.min(g.currentAmount + amount, g.targetAmount), completed: g.currentAmount + amount >= g.targetAmount }
          : g
      )
    );
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(g => g.id !== goalId));
  };

  const deleteBusiness = (businessId: string) => {
    setBusinesses(prev => prev.filter(b => b.id !== businessId));
    setTransactions(prev => prev.filter(t => t.businessId !== businessId));
  };

  const totalBalance = transactions.reduce(
    (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount),
    0
  );

  return {
    businesses, transactions, goals, kidName,
    setKidName, addBusiness, addTransaction, addGoal,
    contributeToGoal, deleteGoal, deleteBusiness, totalBalance,
  };
}
