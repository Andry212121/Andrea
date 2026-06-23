import { useState } from 'react';
import type { Business, Goal, Achievement } from '../types';
import { ACHIEVEMENTS } from '../achievements';
import AchievementsSheet from '../components/AchievementsSheet';

interface DashboardProps {
  kidName: string;
  setKidName: (n: string) => void;
  totalBalance: number;
  totalIncome: number;
  businesses: Business[];
  goals: Goal[];
  unlockedAchievements: Achievement[];
  onNavigate: (p: string) => void;
}

export default function Dashboard({
  kidName, setKidName, totalBalance, totalIncome,
  businesses, goals, unlockedAchievements, onNavigate,
}: DashboardProps) {
  const [editing, setEditing] = useState(!kidName);
  const [nameInput, setNameInput] = useState(kidName);
  const [showAchievements, setShowAchievements] = useState(false);

  const saveName = () => {
    if (nameInput.trim()) {
      setKidName(nameInput.trim());
      setEditing(false);
    }
  };

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed).length;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const recentAchievements = [...unlockedAchievements]
    .sort((a, b) => new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime())
    .slice(0, 4);

  return (
    <>
      <div className="p-4 pb-24 max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-6 mb-4 shadow-lg">
          {editing ? (
            <div className="text-center">
              <p className="text-white text-lg font-bold mb-3">What's your name? 👋</p>
              <input
                autoFocus
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                className="w-full rounded-xl px-4 py-2 text-lg text-center font-semibold outline-none"
                placeholder="Your name..."
              />
              <button
                onClick={saveName}
                className="mt-3 bg-white text-orange-500 font-bold px-6 py-2 rounded-xl shadow hover:scale-105 transition-transform"
              >
                Let's Go! 🚀
              </button>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div className="text-white">
                <p className="text-lg opacity-80">{greeting},</p>
                <h1 className="text-3xl font-black mb-1">{kidName}! 👋</h1>
                <button onClick={() => setEditing(true)} className="text-xs opacity-60 underline">
                  change name
                </button>
              </div>
              <button
                onClick={() => setShowAchievements(true)}
                className="bg-white/20 hover:bg-white/30 text-white rounded-2xl px-3 py-2 text-center transition-all"
              >
                <div className="text-xl">🏅</div>
                <div className="text-xs font-bold">{unlockedAchievements.length}/{ACHIEVEMENTS.length}</div>
              </button>
            </div>
          )}
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-5 mb-4 shadow-md border-2 border-green-100">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Balance</p>
          <p className={`text-4xl font-black mt-1 ${totalBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${totalBalance.toFixed(2)}
          </p>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-xs text-gray-400">Total Earned</p>
              <p className="text-sm font-black text-green-500">${totalIncome.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Businesses</p>
              <p className="text-sm font-black text-gray-700">{businesses.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Goals Done</p>
              <p className="text-sm font-black text-purple-600">{completedGoals}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => onNavigate('businesses')}
            className="bg-purple-100 hover:bg-purple-200 rounded-2xl p-4 text-left transition-colors"
          >
            <span className="text-3xl">🏪</span>
            <p className="text-2xl font-black text-purple-700 mt-1">{businesses.length}</p>
            <p className="text-purple-600 text-sm font-semibold">Businesses</p>
          </button>
          <button
            onClick={() => onNavigate('goals')}
            className="bg-blue-100 hover:bg-blue-200 rounded-2xl p-4 text-left transition-colors"
          >
            <span className="text-3xl">🎯</span>
            <p className="text-2xl font-black text-blue-700 mt-1">{activeGoals.length}</p>
            <p className="text-blue-600 text-sm font-semibold">Active Goals</p>
          </button>
        </div>

        {/* Recent Achievements */}
        {recentAchievements.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-black text-gray-700 text-lg">🏅 Achievements</h2>
              <button
                onClick={() => setShowAchievements(true)}
                className="text-sm text-yellow-600 font-bold hover:text-yellow-700"
              >
                See all →
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {recentAchievements.map(ua => {
                const def = ACHIEVEMENTS.find(a => a.id === ua.id);
                if (!def) return null;
                return (
                  <div key={ua.id} className={`rounded-2xl p-2 border-2 text-center ${def.color}`}>
                    <div className="text-2xl">{def.emoji}</div>
                    <p className="text-xs font-bold text-gray-700 mt-0.5 leading-tight">{def.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="mb-4">
            <h2 className="font-black text-gray-700 text-lg mb-2">🎯 My Goals</h2>
            <div className="space-y-3">
              {activeGoals.slice(0, 3).map(goal => {
                const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                return (
                  <div key={goal.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{goal.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{goal.title}</p>
                        <p className="text-xs text-gray-500">${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}</p>
                      </div>
                      <span className="text-sm font-bold text-indigo-600">{Math.round(pct)}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* My Businesses */}
        {businesses.length > 0 && (
          <div className="mb-4">
            <h2 className="font-black text-gray-700 text-lg mb-2">🏪 My Businesses</h2>
            <div className="space-y-2">
              {businesses.slice(0, 3).map(b => (
                <div key={b.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${b.color}`}>
                    {b.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{b.name}</p>
                    <p className="text-xs text-gray-500">{b.description}</p>
                  </div>
                  <p className={`font-black text-lg ${b.totalEarned >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${b.totalEarned.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {businesses.length === 0 && !editing && (
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100">
            <span className="text-6xl">🚀</span>
            <h2 className="text-xl font-black text-gray-700 mt-3 mb-2">Start Your Journey!</h2>
            <p className="text-gray-500 mb-4">Create your first business idea and start tracking your earnings.</p>
            <button
              onClick={() => onNavigate('businesses')}
              className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black px-6 py-3 rounded-2xl shadow transition-all hover:scale-105"
            >
              Create My First Business 🏪
            </button>
          </div>
        )}
      </div>

      {showAchievements && (
        <AchievementsSheet unlocked={unlockedAchievements} onClose={() => setShowAchievements(false)} />
      )}
    </>
  );
}
