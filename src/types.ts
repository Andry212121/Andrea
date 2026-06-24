export interface Business {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  createdAt: string;
  totalEarned: number;
}

export interface Transaction {
  id: string;
  businessId: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  emoji: string;
  deadline: string;
  completed: boolean;
}

export interface BusinessPlan {
  id: string;
  businessId: string;
  problem: string;
  customers: string;
  product: string;
  price: string;
  startupCosts: string;
  marketing: string;
  monthGoal: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  unlockedAt: string;
}

export type Page = 'dashboard' | 'businesses' | 'money' | 'goals' | 'learn' | 'story';
