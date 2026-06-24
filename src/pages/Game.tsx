import { useEffect, useRef, useState, useCallback } from 'react';
import { useAppStore } from '../store';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  value: number;
  speed: number;
  emoji: string;
  size: number;
}

type GameState = 'idle' | 'playing' | 'gameover';

const W = 360;
const H = 540;
const BASKET_W = 72;
const BASKET_H = 38;
const BASKET_Y = H - 70;

const COIN_TYPES = [
  { value: 1,  emoji: '🪙', size: 20, weight: 6 },
  { value: 5,  emoji: '🥈', size: 22, weight: 3 },
  { value: 10, emoji: '🥇', size: 26, weight: 2 },
  { value: -5, emoji: '💣', size: 24, weight: 2 },
];

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>('idle');
  const itemsRef = useRef<FallingItem[]>([]);
  const basketXRef = useRef(W / 2 - BASKET_W / 2);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const timeRef = useRef(60);
  const rafRef = useRef(0);
  const lastTRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const idRef = useRef(0);
  const keys = useRef({ left: false, right: false });
  const touchStartX = useRef(0);

  const [displayScore, setDisplayScore] = useState(0);
  const [displayLives, setDisplayLives] = useState(3);
  const [displayTime, setDisplayTime] = useState(60);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [finalScore, setFinalScore] = useState(0);
  const [addedToBalance, setAddedToBalance] = useState(false);

  const { businesses, addTransaction } = useAppStore();

  const drawScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sky background
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#7EC8E3');
    sky.addColorStop(1, '#C8E6F5');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Clouds (static decoration)
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    for (const [cx, cy, cr] of [[60, 60, 30], [160, 40, 25], [280, 70, 28]] as [number, number, number][]) {
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 22, cy + 5, cr * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx - 18, cy + 5, cr * 0.65, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ground
    ctx.fillStyle = '#5AAA2B';
    ctx.fillRect(0, H - 24, W, 24);
    ctx.fillStyle = '#6DC435';
    ctx.fillRect(0, H - 24, W, 6);

    // Falling items (emoji)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const item of itemsRef.current) {
      ctx.font = `${item.size * 1.8}px serif`;
      ctx.fillText(item.emoji, item.x, item.y);
    }

    // Basket body
    const bx = basketXRef.current;
    ctx.fillStyle = '#A0522D';
    ctx.beginPath();
    ctx.moveTo(bx + 4, BASKET_Y);
    ctx.lineTo(bx + BASKET_W - 4, BASKET_Y);
    ctx.lineTo(bx + BASKET_W - 12, BASKET_Y + BASKET_H);
    ctx.lineTo(bx + 12, BASKET_Y + BASKET_H);
    ctx.closePath();
    ctx.fill();

    // Basket weave lines
    ctx.strokeStyle = '#7A3B1E';
    ctx.lineWidth = 1.5;
    for (let i = 1; i <= 3; i++) {
      const t = i / 4;
      const y = BASKET_Y + BASKET_H * t;
      const xInset = (12 - 4) * t + 4;
      ctx.beginPath();
      ctx.moveTo(bx + xInset, y);
      ctx.lineTo(bx + BASKET_W - xInset, y);
      ctx.stroke();
    }

    // Basket rim
    ctx.strokeStyle = '#5C2A0E';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(bx, BASKET_Y);
    ctx.lineTo(bx + BASKET_W, BASKET_Y);
    ctx.stroke();

    // Handle
    ctx.strokeStyle = '#A0522D';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(bx + BASKET_W / 2, BASKET_Y - 6, 16, Math.PI, 0);
    ctx.stroke();
  }, []);

  const endGame = useCallback(() => {
    gameStateRef.current = 'gameover';
    cancelAnimationFrame(rafRef.current);
    const score = Math.max(0, scoreRef.current);
    setFinalScore(score);
    setGameState('gameover');
  }, []);

  const loop = useCallback((now: number) => {
    if (gameStateRef.current !== 'playing') return;

    const dt = Math.min((now - lastTRef.current) / 1000, 0.05);
    lastTRef.current = now;

    // Countdown
    timeRef.current -= dt;
    if (timeRef.current <= 0) { timeRef.current = 0; endGame(); return; }

    const elapsed = 60 - timeRef.current;
    const level = Math.floor(elapsed / 12); // 0-4

    // Spawn
    spawnTimerRef.current -= dt;
    if (spawnTimerRef.current <= 0) {
      const pool = COIN_TYPES.flatMap(t => Array<typeof t>(t.weight).fill(t));
      const type = pool[Math.floor(Math.random() * pool.length)];
      itemsRef.current.push({
        id: idRef.current++,
        x: type.size + Math.random() * (W - type.size * 2),
        y: -30,
        value: type.value,
        speed: (1.8 + level * 0.5) * (0.8 + Math.random() * 0.4),
        emoji: type.emoji,
        size: type.size,
      });
      spawnTimerRef.current = Math.max(0.35, 1.1 - level * 0.15);
    }

    // Move basket
    if (keys.current.left)  basketXRef.current = Math.max(0, basketXRef.current - 6);
    if (keys.current.right) basketXRef.current = Math.min(W - BASKET_W, basketXRef.current + 6);

    // Update items + collision
    const bx = basketXRef.current;
    const next: FallingItem[] = [];
    for (const item of itemsRef.current) {
      item.y += item.speed;

      // Basket collision: item centre must land inside basket trapezoid
      if (item.y + item.size >= BASKET_Y && item.y - item.size <= BASKET_Y + BASKET_H) {
        const t = Math.max(0, Math.min(1, (item.y - BASKET_Y) / BASKET_H));
        const leftEdge  = bx + 4 + (12 - 4) * t;
        const rightEdge = bx + BASKET_W - 4 - (12 - 4) * t;
        if (item.x >= leftEdge && item.x <= rightEdge) {
          scoreRef.current = Math.max(0, scoreRef.current + item.value);
          setDisplayScore(scoreRef.current);
          continue; // consumed
        }
      }

      // Hit ground
      if (item.y > H - 20) {
        if (item.value > 0) {
          // missed a good coin → lose a life
          livesRef.current--;
          setDisplayLives(livesRef.current);
          if (livesRef.current <= 0) { endGame(); return; }
        }
        continue; // remove from scene
      }

      next.push(item);
    }
    itemsRef.current = next;

    setDisplayTime(Math.ceil(timeRef.current));
    drawScene();

    rafRef.current = requestAnimationFrame(loop);
  }, [drawScene, endGame]);

  const startGame = useCallback(() => {
    itemsRef.current = [];
    basketXRef.current = W / 2 - BASKET_W / 2;
    scoreRef.current = 0;
    livesRef.current = 3;
    timeRef.current = 60;
    spawnTimerRef.current = 0;
    setDisplayScore(0);
    setDisplayLives(3);
    setDisplayTime(60);
    setGameState('playing');
    setAddedToBalance(false);
    gameStateRef.current = 'playing';
    cancelAnimationFrame(rafRef.current);
    lastTRef.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const saveToBalance = useCallback(() => {
    if (finalScore <= 0 || businesses.length === 0) return;
    addTransaction({
      businessId: businesses[0].id,
      type: 'income',
      amount: finalScore,
      description: 'Coin Catcher game winnings',
      date: new Date().toISOString().split('T')[0],
    });
    setAddedToBalance(true);
  }, [finalScore, businesses, addTransaction]);

  // Keyboard
  useEffect(() => {
    const dn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { keys.current.left  = true; e.preventDefault(); }
      if (e.key === 'ArrowRight') { keys.current.right = true; e.preventDefault(); }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  keys.current.left  = false;
      if (e.key === 'ArrowRight') keys.current.right = false;
    };
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', dn);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // Draw idle screen once
  useEffect(() => {
    if (gameState === 'idle') drawScene();
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameState, drawScene]);

  const hearts = ['❤️', '❤️', '❤️'].map((h, i) => (i < displayLives ? h : '🖤'));

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-100 pb-24">
      <div className="max-w-md mx-auto px-4 pt-5">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-1">🎮 Coin Catcher</h1>
        <p className="text-center text-blue-500 text-sm mb-3">Catch coins to earn money!</p>

        {/* HUD */}
        {gameState === 'playing' && (
          <div className="flex justify-between items-center bg-white rounded-2xl px-4 py-2 mb-3 shadow-md">
            <span className="text-base font-bold text-yellow-600">💰 {displayScore}p</span>
            <span className="text-base tracking-widest">{hearts.join('')}</span>
            <span className="text-base font-bold text-blue-600">⏱ {displayTime}s</span>
          </div>
        )}

        {/* Canvas */}
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="rounded-2xl shadow-xl border-4 border-blue-200 touch-none select-none"
            style={{ maxWidth: '100%' }}
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
            onTouchMove={e => {
              const rect = canvasRef.current!.getBoundingClientRect();
              const scale = W / rect.width;
              const dx = (e.touches[0].clientX - touchStartX.current) * scale;
              touchStartX.current = e.touches[0].clientX;
              basketXRef.current = Math.max(0, Math.min(W - BASKET_W, basketXRef.current + dx));
            }}
          />
        </div>

        {/* Idle */}
        {gameState === 'idle' && (
          <div className="mt-4 bg-white rounded-2xl p-5 shadow-lg text-center">
            <div className="text-4xl mb-2">🪙🥈🥇</div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">How to Play</h2>
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>← → keys or swipe to move the basket</p>
              <p>🪙 Penny = <b>1p</b> · 🥈 Silver = <b>5p</b> · 🥇 Gold = <b>10p</b></p>
              <p>💣 Bombs cost <b>5p</b> · Miss a coin = lose a ❤️</p>
              <p>60 seconds on the clock — catch as much as you can!</p>
            </div>
            <button
              onClick={startGame}
              className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-yellow-900 font-bold py-3 px-10 rounded-full text-lg shadow transition-all"
            >
              Start!
            </button>
          </div>
        )}

        {/* Game Over */}
        {gameState === 'gameover' && (
          <div className="mt-4 bg-white rounded-2xl p-5 shadow-lg text-center">
            <div className="text-5xl mb-2">
              {finalScore >= 80 ? '🏆' : finalScore >= 40 ? '⭐' : '🎮'}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Game Over!</h2>
            <p className="text-3xl font-bold text-yellow-500 mb-4">
              {finalScore}p earned!
            </p>

            {businesses.length > 0 && !addedToBalance && finalScore > 0 && (
              <button
                onClick={saveToBalance}
                className="bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold py-2.5 px-6 rounded-full w-full mb-3 shadow transition-all"
              >
                💰 Add to My Balance
              </button>
            )}
            {addedToBalance && (
              <p className="text-green-600 font-semibold mb-3">✅ Added {finalScore}p to your balance!</p>
            )}
            {businesses.length === 0 && finalScore > 0 && (
              <p className="text-gray-400 text-xs mb-3">
                Create a business in the Biz tab to save your earnings!
              </p>
            )}

            <button
              onClick={startGame}
              className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-yellow-900 font-bold py-2.5 px-6 rounded-full w-full shadow transition-all"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
