import { useState } from 'react';
import type { Goal } from '../types';

const GOAL_EMOJIS = ['🎮', '🚲', '📱', '✈️', '🎸', '👟', '📷', '🏆', '🌍', '🎓', '💻', '⭐'];

interface GoalsProps {
  goals: Goal[];
  addGoal: (g: Omit<Goal, 'id' | 'completed' | 'currentAmount'>) => void;
  contributeToGoal: (id: string, amount: number) => void;
  deleteGoal: (id: string) => void;
  totalBalance: number;
}

export default function Goals({ goals, addGoal, contributeToGoal, deleteGoal, totalBalance }: GoalsProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [emoji, setEmoji] = useState('🏆');
  const [deadline, setDeadline] = useState('');
  const [contributeId, setContributeId] = useState<string | null>(null);
  const [contributeAmt, setContributeAmt] = useState('');

  const submitGoal = () => {
    if (!title.trim() || !targetAmount) return;
    addGoal({ title: title.trim(), targetAmount: parseFloat(targetAmount), emoji, deadline });
    setTitle('');
    setTargetAmount('');
    setEmoji('🏆');
    setDeadline('');
    setShowForm(false);
  };

  const submitContribution = (goalId: string) => {
    const amt = parseFloat(contributeAmt);
    if (!amt || amt <= 0) return;
    contributeToGoal(goalId, amt);
    setContributeId(null);
    setContributeAmt('');
  };

  const active = goals.filter(g => !g.completed);
  const completed = goals.filter(g => g.completed);

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-black text-gray-800">My Goals 🎯</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-400 hover:bg-purple-500 text-white font-black px-4 py-2 rounded-2xl shadow transition-all hover:scale-105"
        >
          + Goal
        </button>
      </div>

      {/* Balance reminder */}
      <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-3 mb-4 flex items-center gap-2">
        <span className="text-2xl">💰</span>
        <p className="text-blue-700 font-semibold text-sm">
          Available balance: <span className="font-black text-blue-800">${Math.max(totalBalance, 0).toFixed(2)}</span>
        </p>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <div className="bg-white rounded-3xl p-5 mb-4 shadow-lg border-2 border-purple-200">
          <h2 className="font-black text-gray-700 text-lg mb-4">🌟 New Goal</h2>

          <label className="block text-sm font-bold text-gray-600 mb-1">What are you saving for? *</label>
          <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-3 focus:border-purple-400 outline-none"
            placeholder="e.g. New bicycle, Video game..."
          />

          <label className="block text-sm font-bold text-gray-600 mb-1">Target Amount ($) *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={targetAmount}
            onChange={e => setTargetAmount(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-3 focus:border-purple-400 outline-none"
            placeholder="50.00"
          />

          <label className="block text-sm font-bold text-gray-600 mb-2">Pick an emoji</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {GOAL_EMOJIS.map(e => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className={`text-2xl p-1.5 rounded-xl transition-all ${emoji === e ? 'bg-purple-200 scale-125' : 'hover:bg-gray-100'}`}
              >
                {e}
              </button>
            ))}
          </div>

          <label className="block text-sm font-bold text-gray-600 mb-1">Goal deadline (optional)</label>
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-4 focus:border-purple-400 outline-none"
          />

          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-xl border-2 border-gray-200 font-bold text-gray-500">Cancel</button>
            <button
              onClick={submitGoal}
              disabled={!title.trim() || !targetAmount}
              className="flex-1 py-2 rounded-xl bg-purple-400 hover:bg-purple-500 font-black text-white disabled:opacity-40"
            >
              Set Goal! 🎯
            </button>
          </div>
        </div>
      )}

      {/* Active Goals */}
      {active.length > 0 && (
        <div className="mb-4">
          <h2 className="font-black text-gray-600 mb-2 text-sm uppercase tracking-wider">In Progress</h2>
          <div className="space-y-3">
            {active.map(goal => {
              const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
              return (
                <div key={goal.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{goal.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-black text-gray-800">{goal.title}</h3>
                      {goal.deadline && (
                        <p className="text-xs text-gray-400">By {new Date(goal.deadline).toLocaleDateString()}</p>
                      )}
                    </div>
                    <button onClick={() => deleteGoal(goal.id)} className="text-xs text-red-400 hover:text-red-600">✕</button>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-600">${goal.currentAmount.toFixed(2)} saved</span>
                      <span className="font-bold text-purple-600">${goal.targetAmount.toFixed(2)} goal</span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-right text-xs text-gray-400 mt-0.5">{Math.round(pct)}%</p>
                  </div>

                  {contributeId === goal.id ? (
                    <div className="flex gap-2 mt-2">
                      <input
                        autoFocus
                        type="number"
                        min="0"
                        step="0.01"
                        value={contributeAmt}
                        onChange={e => setContributeAmt(e.target.value)}
                        className="flex-1 border-2 border-purple-200 rounded-xl px-3 py-1.5 text-sm focus:border-purple-400 outline-none"
                        placeholder="Amount..."
                      />
                      <button
                        onClick={() => submitContribution(goal.id)}
                        className="bg-purple-400 text-white font-bold px-3 py-1.5 rounded-xl text-sm"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setContributeId(null)}
                        className="text-gray-400 px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setContributeId(goal.id); setContributeAmt(''); }}
                      className="w-full mt-1 py-2 bg-purple-50 hover:bg-purple-100 text-purple-600 font-bold rounded-xl text-sm transition-colors"
                    >
                      + Add Money
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Goals */}
      {completed.length > 0 && (
        <div>
          <h2 className="font-black text-gray-600 mb-2 text-sm uppercase tracking-wider">🎉 Achieved!</h2>
          <div className="space-y-2">
            {completed.map(goal => (
              <div key={goal.id} className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-3xl">{goal.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-black text-green-800">{goal.title}</h3>
                  <p className="text-green-600 text-sm">✅ ${goal.targetAmount.toFixed(2)} achieved!</p>
                </div>
                <button onClick={() => deleteGoal(goal.id)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {goals.length === 0 && !showForm && (
        <div className="text-center py-12">
          <span className="text-6xl">🎯</span>
          <p className="text-gray-500 mt-3 font-semibold">No goals yet!</p>
          <p className="text-gray-400 text-sm">What are you saving up for?</p>
        </div>
      )}
    </div>
  );
}
