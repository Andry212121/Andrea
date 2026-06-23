export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  check: (state: AchievementState) => boolean;
}

export interface AchievementState {
  businessCount: number;
  totalIncome: number;
  transactionCount: number;
  completedGoals: number;
  goalCount: number;
  lessonsCompleted: number;
  totalLessons: number;
  businessPlanCount: number;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first_business',
    title: 'Open for Business!',
    description: 'Created your first business',
    emoji: '🏪',
    color: 'bg-yellow-100 border-yellow-400',
    check: s => s.businessCount >= 1,
  },
  {
    id: 'three_businesses',
    title: 'Entrepreneur!',
    description: 'Running 3 businesses at once',
    emoji: '🚀',
    color: 'bg-orange-100 border-orange-400',
    check: s => s.businessCount >= 3,
  },
  {
    id: 'first_dollar',
    title: 'First Dollar!',
    description: 'Earned your first $1',
    emoji: '💵',
    color: 'bg-green-100 border-green-400',
    check: s => s.totalIncome >= 1,
  },
  {
    id: 'ten_dollars',
    title: 'Ten Bucks!',
    description: 'Earned $10 total',
    emoji: '💰',
    color: 'bg-green-100 border-green-400',
    check: s => s.totalIncome >= 10,
  },
  {
    id: 'fifty_dollars',
    title: 'Money Maker!',
    description: 'Earned $50 total',
    emoji: '💸',
    color: 'bg-emerald-100 border-emerald-400',
    check: s => s.totalIncome >= 50,
  },
  {
    id: 'hundred_dollars',
    title: 'Century Club!',
    description: 'Earned $100 total',
    emoji: '🏆',
    color: 'bg-amber-100 border-amber-400',
    check: s => s.totalIncome >= 100,
  },
  {
    id: 'first_transaction',
    title: 'Bookkeeper!',
    description: 'Logged your first transaction',
    emoji: '📒',
    color: 'bg-blue-100 border-blue-400',
    check: s => s.transactionCount >= 1,
  },
  {
    id: 'ten_transactions',
    title: 'Record Keeper!',
    description: 'Logged 10 transactions',
    emoji: '📊',
    color: 'bg-blue-100 border-blue-400',
    check: s => s.transactionCount >= 10,
  },
  {
    id: 'first_goal',
    title: 'Dreamer!',
    description: 'Set your first savings goal',
    emoji: '🎯',
    color: 'bg-purple-100 border-purple-400',
    check: s => s.goalCount >= 1,
  },
  {
    id: 'goal_complete',
    title: 'Goal Getter!',
    description: 'Completed a savings goal',
    emoji: '🎉',
    color: 'bg-pink-100 border-pink-400',
    check: s => s.completedGoals >= 1,
  },
  {
    id: 'three_goals',
    title: 'Super Saver!',
    description: 'Completed 3 savings goals',
    emoji: '⭐',
    color: 'bg-pink-100 border-pink-400',
    check: s => s.completedGoals >= 3,
  },
  {
    id: 'first_lesson',
    title: 'Student!',
    description: 'Completed your first lesson',
    emoji: '📚',
    color: 'bg-indigo-100 border-indigo-400',
    check: s => s.lessonsCompleted >= 1,
  },
  {
    id: 'all_lessons',
    title: 'Scholar!',
    description: 'Completed all lessons',
    emoji: '🎓',
    color: 'bg-indigo-100 border-indigo-400',
    check: s => s.lessonsCompleted >= s.totalLessons && s.totalLessons > 0,
  },
  {
    id: 'business_plan',
    title: 'Planner!',
    description: 'Wrote a business plan',
    emoji: '📝',
    color: 'bg-teal-100 border-teal-400',
    check: s => s.businessPlanCount >= 1,
  },
];
