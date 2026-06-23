import { ACHIEVEMENTS } from '../achievements';
import type { Achievement } from '../types';

interface Props {
  unlocked: Achievement[];
  onClose: () => void;
}

export default function AchievementsSheet({ unlocked, onClose }: Props) {
  const unlockedIds = new Set(unlocked.map(a => a.id));
  const unlockedCount = unlockedIds.size;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative mt-auto bg-white rounded-t-3xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-black text-gray-800">Achievements 🏅</h2>
            <p className="text-sm text-gray-500">{unlockedCount}/{ACHIEVEMENTS.length} unlocked</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center">✕</button>
        </div>

        {/* Progress bar */}
        <div className="px-4 pt-3 pb-1">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all"
              style={{ width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="overflow-y-auto p-4 grid grid-cols-2 gap-3">
          {ACHIEVEMENTS.map(def => {
            const isUnlocked = unlockedIds.has(def.id);
            const unlockedAt = unlocked.find(a => a.id === def.id)?.unlockedAt;
            return (
              <div
                key={def.id}
                className={`rounded-2xl p-3 border-2 transition-all ${
                  isUnlocked ? def.color : 'bg-gray-50 border-gray-200 opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl mb-1">{def.emoji}</div>
                <p className="font-black text-gray-800 text-sm leading-tight">{def.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{def.description}</p>
                {isUnlocked && unlockedAt && (
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(unlockedAt).toLocaleDateString()}
                  </p>
                )}
                {!isUnlocked && (
                  <p className="text-xs text-gray-400 mt-1">🔒 Locked</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
