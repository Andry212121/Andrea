import { useEffect, useState } from 'react';
import { ACHIEVEMENTS } from '../achievements';

interface Props {
  achievementId: string | null;
  onDismiss: () => void;
}

export default function AchievementToast({ achievementId, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (achievementId) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [achievementId]);

  const def = achievementId ? ACHIEVEMENTS.find(a => a.id === achievementId) : null;
  if (!def) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 max-w-xs w-full px-4 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-yellow-300 p-4 flex items-center gap-3">
        <div className="text-4xl">{def.emoji}</div>
        <div className="flex-1">
          <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider">Achievement Unlocked!</p>
          <p className="font-black text-gray-800">{def.title}</p>
          <p className="text-xs text-gray-500">{def.description}</p>
        </div>
        <button onClick={onDismiss} className="text-gray-300 hover:text-gray-500 text-lg">✕</button>
      </div>
    </div>
  );
}
