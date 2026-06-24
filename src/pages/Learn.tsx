import { useState } from 'react';

const lessons = [
  {
    id: 1,
    emoji: '💡',
    title: 'What is Entrepreneurship?',
    color: 'bg-yellow-100 border-yellow-300',
    content: [
      { type: 'text', value: 'An entrepreneur is someone who starts and runs their own business! 🚀' },
      { type: 'text', value: 'Entrepreneurs solve problems for people. They see something that\'s missing and create it!' },
      { type: 'tip', value: 'Think of something that bothers you or your friends. Could you create a solution for it?' },
    ],
    quiz: {
      question: 'What does an entrepreneur do?',
      options: ['Only works for other people', 'Starts and runs their own business', 'Never takes risks'],
      answer: 1,
    },
  },
  {
    id: 2,
    emoji: '💰',
    title: 'Profit & Revenue',
    color: 'bg-green-100 border-green-300',
    content: [
      { type: 'text', value: 'Revenue is all the money your business makes from selling things.' },
      { type: 'text', value: 'Expenses are the costs to run your business (supplies, tools, etc.).' },
      { type: 'formula', value: 'Profit = Revenue − Expenses' },
      { type: 'example', value: 'You sell cookies for £10 (revenue). Ingredients cost £4 (expenses). Profit = £6! 🍪' },
    ],
    quiz: {
      question: 'You earn £20 and spend £8 on supplies. What\'s your profit?',
      options: ['£8', '£20', '£12'],
      answer: 2,
    },
  },
  {
    id: 3,
    emoji: '🤝',
    title: 'Customer Service',
    color: 'bg-blue-100 border-blue-300',
    content: [
      { type: 'text', value: 'Your customers are the most important part of your business!' },
      { type: 'text', value: 'Happy customers come back AND tell their friends. That\'s free advertising!' },
      { type: 'tip', value: 'Always say thank you, deliver what you promised, and fix mistakes quickly.' },
      { type: 'text', value: 'One unhappy customer can tell 10 people. One happy customer can too! 😊' },
    ],
    quiz: {
      question: 'What\'s the BEST way to handle an unhappy customer?',
      options: ['Ignore them', 'Fix the problem quickly and apologize', 'Argue that you were right'],
      answer: 1,
    },
  },
  {
    id: 4,
    emoji: '📢',
    title: 'Marketing Your Business',
    color: 'bg-pink-100 border-pink-300',
    content: [
      { type: 'text', value: 'Marketing means letting people know about your business!' },
      { type: 'text', value: 'Ways to market your business:' },
      { type: 'list', value: ['Tell friends and family', 'Make a poster or flyer', 'Social media (with parent\'s help)', 'Word of mouth — ask happy customers to share!'] },
      { type: 'tip', value: 'Your "brand" is your business\'s personality. Make it memorable!' },
    ],
    quiz: {
      question: 'Which is a FREE way to market your business?',
      options: ['Buy a TV ad', 'Ask happy customers to tell friends', 'Open a store in a mall'],
      answer: 1,
    },
  },
  {
    id: 5,
    emoji: '💪',
    title: 'Dealing with Failure',
    color: 'bg-purple-100 border-purple-300',
    content: [
      { type: 'text', value: 'Every successful entrepreneur has failed... many times! Failure is how we learn.' },
      { type: 'text', value: 'Famous failures:' },
      { type: 'list', value: ['Walt Disney was fired and told he "lacked imagination"', 'Steve Jobs was kicked out of Apple (his own company!)', 'J.K. Rowling was rejected by 12 publishers'] },
      { type: 'tip', value: 'When something doesn\'t work, ask yourself: "What can I learn from this?" Then try again!' },
    ],
    quiz: {
      question: 'When you fail at something, you should:',
      options: ['Give up immediately', 'Learn from it and try again', 'Blame other people'],
      answer: 1,
    },
  },
  {
    id: 6,
    emoji: '📊',
    title: 'Budgeting & Saving',
    color: 'bg-orange-100 border-orange-300',
    content: [
      { type: 'text', value: 'A budget is a plan for how to spend your money.' },
      { type: 'formula', value: 'The 50/30/20 Rule:' },
      { type: 'list', value: ['50% — Business expenses (supplies, tools)', '30% — Save for goals', '20% — Fun money for yourself!'] },
      { type: 'tip', value: 'Track every pound in and out. Knowing your numbers = power! 💪' },
    ],
    quiz: {
      question: 'If you earn £10, how much should you save for goals (30%)?',
      options: ['£1', '£3', '£5'],
      answer: 1,
    },
  },
];

export default function Learn() {
  const [openLesson, setOpenLesson] = useState<number | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(() => {
    try {
      const s = localStorage.getItem('ke_learn_completed');
      return s ? new Set(JSON.parse(s)) : new Set();
    } catch { return new Set(); }
  });

  const markComplete = (id: number) => {
    setCompleted(prev => {
      const next = new Set(prev).add(id);
      localStorage.setItem('ke_learn_completed', JSON.stringify([...next]));
      return next;
    });
  };

  const lesson = openLesson !== null ? lessons.find(l => l.id === openLesson) : null;

  if (lesson) {
    const isCorrect = quizAnswer === lesson.quiz.answer;
    return (
      <div className="p-4 pb-24 max-w-lg mx-auto">
        <button onClick={() => { setOpenLesson(null); setQuizAnswer(null); }} className="text-gray-500 font-bold mb-4 flex items-center gap-1 hover:text-gray-700">
          ← Back to lessons
        </button>
        <div className={`rounded-3xl p-5 border-2 mb-4 ${lesson.color}`}>
          <div className="text-5xl mb-2">{lesson.emoji}</div>
          <h1 className="text-2xl font-black text-gray-800 mb-4">{lesson.title}</h1>
          <div className="space-y-3">
            {lesson.content.map((block, i) => {
              if (block.type === 'text') return <p key={i} className="text-gray-700">{block.value}</p>;
              if (block.type === 'tip') return (
                <div key={i} className="bg-yellow-200 rounded-2xl p-3 flex gap-2">
                  <span>💡</span>
                  <p className="text-yellow-900 font-semibold text-sm">{block.value}</p>
                </div>
              );
              if (block.type === 'formula') return (
                <div key={i} className="bg-white rounded-2xl p-3 text-center">
                  <p className="font-black text-gray-800 text-lg">{block.value}</p>
                </div>
              );
              if (block.type === 'example') return (
                <div key={i} className="bg-white rounded-2xl p-3">
                  <p className="text-gray-700 text-sm">{block.value}</p>
                </div>
              );
              if (block.type === 'list' && Array.isArray(block.value)) return (
                <ul key={i} className="space-y-1">
                  {(block.value as string[]).map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
              return null;
            })}
          </div>
        </div>

        {/* Quiz */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
          <h2 className="font-black text-gray-700 mb-3">🧠 Quick Quiz</h2>
          <p className="text-gray-700 font-semibold mb-3">{lesson.quiz.question}</p>
          <div className="space-y-2">
            {lesson.quiz.options.map((opt, i) => {
              let style = 'bg-gray-50 border-gray-200 text-gray-700';
              if (quizAnswer !== null) {
                if (i === lesson.quiz.answer) style = 'bg-green-100 border-green-400 text-green-800';
                else if (i === quizAnswer) style = 'bg-red-100 border-red-400 text-red-800';
              }
              return (
                <button
                  key={i}
                  onClick={() => { if (quizAnswer === null) setQuizAnswer(i); }}
                  className={`w-full text-left px-4 py-3 rounded-2xl border-2 font-semibold transition-all ${style} ${quizAnswer === null ? 'hover:border-purple-300 hover:bg-purple-50' : ''}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {quizAnswer !== null && (
            <div className={`mt-3 p-3 rounded-2xl ${isCorrect ? 'bg-green-100' : 'bg-red-50'}`}>
              <p className={`font-black ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? '🎉 Correct! Great job!' : '🤔 Not quite — the correct answer is highlighted above.'}
              </p>
            </div>
          )}
          {quizAnswer !== null && (
            <button
              onClick={() => { markComplete(lesson.id); setOpenLesson(null); setQuizAnswer(null); }}
              className="w-full mt-3 py-3 bg-purple-400 hover:bg-purple-500 text-white font-black rounded-2xl transition-all"
            >
              Mark as Done ✅
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <h1 className="text-2xl font-black text-gray-800 mb-1">Learn 📚</h1>
      <p className="text-gray-500 text-sm mb-4">{completed.size}/{lessons.length} lessons completed</p>

      <div className="h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all"
          style={{ width: `${(completed.size / lessons.length) * 100}%` }}
        />
      </div>

      <div className="space-y-3">
        {lessons.map(lesson => (
          <button
            key={lesson.id}
            onClick={() => { setOpenLesson(lesson.id); setQuizAnswer(null); }}
            className={`w-full text-left rounded-2xl p-4 border-2 transition-all hover:scale-[1.01] shadow-sm ${lesson.color}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{lesson.emoji}</span>
              <div className="flex-1">
                <h3 className="font-black text-gray-800">{lesson.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">Tap to learn • Quiz included</p>
              </div>
              {completed.has(lesson.id) ? (
                <span className="text-2xl">✅</span>
              ) : (
                <span className="text-gray-400 font-bold">→</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
