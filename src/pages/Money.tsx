import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Business, Transaction } from '../types';

interface MoneyProps {
  businesses: Business[];
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  totalBalance: number;
}

type Tab = 'transactions' | 'charts';

function getMonthlyData(transactions: Transaction[]) {
  const map: Record<string, { month: string; income: number; expenses: number }> = {};
  for (const t of transactions) {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    if (!map[key]) map[key] = { month: label, income: 0, expenses: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expenses += t.amount;
  }
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).map(([, v]) => v).slice(-6);
}

function getBusinessBreakdown(businesses: Business[], transactions: Transaction[]) {
  return businesses.map(b => {
    const income = transactions.filter(t => t.businessId === b.id && t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.businessId === b.id && t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { name: `${b.emoji} ${b.name}`, income, expenses, profit: income - expenses };
  }).filter(b => b.income > 0 || b.expenses > 0);
}

export default function Money({ businesses, transactions, addTransaction, totalBalance }: MoneyProps) {
  const [tab, setTab] = useState<Tab>('transactions');
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [businessId, setBusinessId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const submit = () => {
    if (!amount || !description || !businessId) return;
    addTransaction({ type, amount: parseFloat(amount), description, businessId, date });
    setAmount('');
    setDescription('');
    setShowForm(false);
  };

  const sorted = useMemo(() => [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [transactions]);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const bizBreakdown = useMemo(() => getBusinessBreakdown(businesses, transactions), [businesses, transactions]);

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-black text-gray-800">Money 💰</h1>
        <button
          onClick={() => setShowForm(true)}
          disabled={businesses.length === 0}
          className="bg-green-400 hover:bg-green-500 text-green-900 font-black px-4 py-2 rounded-2xl shadow transition-all hover:scale-105 disabled:opacity-40"
        >
          + Add
        </button>
      </div>

      {businesses.length === 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-4 text-center">
          <p className="text-yellow-700 font-semibold">Create a business first to track money! 🏪</p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-green-100 rounded-2xl p-3 text-center">
          <p className="text-xs text-green-700 font-bold uppercase">Earned</p>
          <p className="text-lg font-black text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 rounded-2xl p-3 text-center">
          <p className="text-xs text-red-700 font-bold uppercase">Spent</p>
          <p className="text-lg font-black text-red-500">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className={`${totalBalance >= 0 ? 'bg-blue-100' : 'bg-red-50'} rounded-2xl p-3 text-center`}>
          <p className="text-xs text-blue-700 font-bold uppercase">Balance</p>
          <p className={`text-lg font-black ${totalBalance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
            ${totalBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      {transactions.length > 0 && (
        <div className="flex gap-2 mb-4">
          {(['transactions', 'charts'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${tab === t ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {t === 'transactions' ? '📋 Transactions' : '📊 Charts'}
            </button>
          ))}
        </div>
      )}

      {/* Add Transaction Form */}
      {showForm && (
        <div className="bg-white rounded-3xl p-5 mb-4 shadow-lg border-2 border-green-200">
          <h2 className="font-black text-gray-700 text-lg mb-4">💸 Add Transaction</h2>

          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setType('income')}
              className={`flex-1 py-2 rounded-xl font-black transition-all ${type === 'income' ? 'bg-green-400 text-green-900' : 'bg-gray-100 text-gray-500'}`}
            >
              + Income
            </button>
            <button
              onClick={() => setType('expense')}
              className={`flex-1 py-2 rounded-xl font-black transition-all ${type === 'expense' ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              - Expense
            </button>
          </div>

          <label className="block text-sm font-bold text-gray-600 mb-1">Business</label>
          <select
            value={businessId}
            onChange={e => setBusinessId(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-3 focus:border-green-400 outline-none"
          >
            <option value="">Select business...</option>
            {businesses.map(b => (
              <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>
            ))}
          </select>

          <label className="block text-sm font-bold text-gray-600 mb-1">Amount ($)</label>
          <input
            type="number" min="0" step="0.01" value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-3 focus:border-green-400 outline-none"
            placeholder="0.00"
          />

          <label className="block text-sm font-bold text-gray-600 mb-1">Description</label>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-3 focus:border-green-400 outline-none"
            placeholder="What was this for?"
          />

          <label className="block text-sm font-bold text-gray-600 mb-1">Date</label>
          <input
            type="date" value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 mb-4 focus:border-green-400 outline-none"
          />

          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-xl border-2 border-gray-200 font-bold text-gray-500">Cancel</button>
            <button
              onClick={submit}
              disabled={!amount || !description || !businessId}
              className="flex-1 py-2 rounded-xl bg-green-400 hover:bg-green-500 font-black text-green-900 disabled:opacity-40"
            >
              Save! 💾
            </button>
          </div>
        </div>
      )}

      {/* Charts Tab */}
      {tab === 'charts' && transactions.length > 0 && (
        <div className="space-y-4">
          {monthlyData.length >= 2 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-black text-gray-700 mb-3">Monthly Income vs Expenses</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#4ade80" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {bizBreakdown.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-black text-gray-700 mb-3">Profit by Business</h3>
              <ResponsiveContainer width="100%" height={Math.max(160, bizBreakdown.length * 50)}>
                <BarChart data={bizBreakdown} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={90} />
                  <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                  <Bar dataKey="profit" name="Profit" fill="#a78bfa" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Per-business income breakdown */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-black text-gray-700 mb-3">Business Summary</h3>
            <div className="space-y-2">
              {bizBreakdown.map(b => (
                <div key={b.name} className="flex items-center gap-2">
                  <p className="text-sm text-gray-700 flex-1 truncate">{b.name}</p>
                  <div className="flex gap-3 text-sm">
                    <span className="text-green-600 font-bold">+${b.income.toFixed(2)}</span>
                    <span className="text-red-500">-${b.expenses.toFixed(2)}</span>
                    <span className={`font-black ${b.profit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>${b.profit.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {tab === 'transactions' && (
        sorted.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl">💸</span>
            <p className="text-gray-500 mt-3 font-semibold">No transactions yet!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map(t => {
              const biz = businesses.find(b => b.id === t.businessId);
              return (
                <div key={t.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                    {t.type === 'income' ? '+' : '-'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm truncate">{t.description}</p>
                    <p className="text-xs text-gray-400">{biz?.emoji} {biz?.name} • {new Date(t.date).toLocaleDateString()}</p>
                  </div>
                  <p className={`font-black text-lg shrink-0 ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
