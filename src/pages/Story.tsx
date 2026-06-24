import { useState, useEffect, useRef } from 'react';

type Tab = 'watch' | 'image' | 'video' | 'voice' | 'ai';

const hasTTS = typeof window !== 'undefined' && 'speechSynthesis' in window;

const scenes = [
  {
    id: 1,
    title: 'Title Card',
    bar: '#FF8C28',
    bg: 'from-orange-400 to-orange-500',
    textColor: 'text-white',
    elements: ['💰', '🪙', '⭐'],
    heading: 'Smart With Money!',
    sub: 'Learn to save, spend & invest',
    voice: 'Hey there, friends! Today we\'re going to learn something really important... how to be SMART with your money!',
  },
  {
    id: 2,
    title: 'Meet Max & Lily',
    bar: '#FFD228',
    bg: 'from-yellow-300 to-yellow-400',
    textColor: 'text-yellow-900',
    elements: ['👦', '👧'],
    heading: 'Meet Max & Lily!',
    sub: 'They each have 5 coins 🪙🪙🪙🪙🪙',
    voice: 'Meet Max and Lily! They\'re both kids just like you. And they each have five shiny coins. But they\'re about to do very different things with them.',
  },
  {
    id: 3,
    title: 'Max Spends',
    bar: '#EB4B4B',
    bg: 'from-red-400 to-red-500',
    textColor: 'text-white',
    elements: ['🧸', '🎮', '🍭'],
    heading: 'Max spends it ALL!',
    sub: 'Toy bear · Video game · Candy',
    voice: 'Max loves toys! He sees a teddy bear... a video game... and some candy. So he spends — every — single — coin.',
  },
  {
    id: 4,
    title: 'Max Has Nothing',
    bar: '#c0392b',
    bg: 'from-red-600 to-red-700',
    textColor: 'text-white',
    elements: ['😢', '💸'],
    heading: 'All gone! 0 coins left',
    sub: 'Spending makes money disappear',
    voice: 'And just like that... Max has nothing left. When you spend your money, it\'s gone.',
  },
  {
    id: 5,
    title: 'Lily Saves',
    bar: '#20B28C',
    bg: 'from-teal-400 to-teal-500',
    textColor: 'text-white',
    elements: ['👧', '🐷'],
    heading: 'Lily saves 5 coins!',
    sub: 'Saving keeps your money safe',
    voice: 'But Lily? She does something different. She saves her coins... one by one... in her piggy bank. Saving keeps your money safe until you need it.',
  },
  {
    id: 6,
    title: "Lily's Big Idea",
    bar: '#FFD228',
    bg: 'from-yellow-400 to-amber-400',
    textColor: 'text-yellow-900',
    elements: ['💡'],
    heading: '"I\'ll start a lemonade stand!"',
    sub: 'A great idea is worth its weight in gold!',
    voice: 'Then one day, Lily has a GREAT idea. She says: "I\'m going to start a lemonade stand!"',
  },
  {
    id: 7,
    title: 'Lily Invests',
    bar: '#FF8C28',
    bg: 'from-orange-400 to-orange-500',
    textColor: 'text-white',
    elements: ['🍋', '🥤'],
    heading: 'She uses 2 coins to invest!',
    sub: 'Investing = money making MORE money',
    voice: 'She uses just two of her saved coins to buy lemons and cups. That\'s called investing — using money to make more money!',
  },
  {
    id: 8,
    title: 'Customers Arrive',
    bar: '#27ae60',
    bg: 'from-green-400 to-green-500',
    textColor: 'text-white',
    elements: ['🙋', '🙋‍♂️', '🙋‍♀️'],
    heading: 'People LOVE her lemonade!',
    sub: '2 coins in → 8 coins back! 🤑',
    voice: 'And people LOVE her lemonade! One customer... two... three... Now Lily has EIGHT coins — more than she started with!',
  },
  {
    id: 9,
    title: 'The Comparison',
    bar: '#555',
    bg: 'from-gray-600 to-gray-700',
    textColor: 'text-white',
    elements: ['😢', '⚖️', '🎉'],
    heading: 'Same start. Different choices.',
    sub: 'Max: 1 coin  vs  Lily: 8 coins',
    voice: 'Max has one coin left. Lily has eight. Same start. Very different choices.',
  },
  {
    id: 10,
    title: '3 Big Lessons',
    bar: '#8250DC',
    bg: 'from-purple-500 to-purple-600',
    textColor: 'text-white',
    elements: ['💸', '🏦', '📈'],
    heading: 'Your 3 Money Lessons!',
    sub: 'Spending · Saving · Investing',
    voice: 'Here are your three money lessons: One — spending makes money disappear. Two — saving keeps it safe. Three — investing grows it!',
  },
  {
    id: 11,
    title: 'You Can Do It!',
    bar: '#27ae60',
    bg: 'from-green-400 to-emerald-500',
    textColor: 'text-white',
    elements: ['🏆', '👦', '👧'],
    heading: 'YOU\'ve got this! ⭐',
    sub: 'Save · Think · Invest',
    voice: 'And YOU can do this too! Save a little every day. Think before you spend. And find ways to make your money work for you. You\'ve got this! ⭐',
  },
];

const lessonCards = [
  { icon: '💸', color: 'bg-red-100 border-red-300 text-red-800', label: 'Spending', desc: 'Makes money disappear forever' },
  { icon: '🏦', color: 'bg-teal-100 border-teal-300 text-teal-800', label: 'Saving', desc: 'Keeps your money safe & ready' },
  { icon: '📈', color: 'bg-green-100 border-green-300 text-green-800', label: 'Investing', desc: 'Turns money into MORE money' },
];

const imageBasePrompt = `Flat 2D illustration, educational YouTube explainer style, clean white background, bold thick outlines, no gradients, no shading. Two cartoon kids: Max (boy, red shirt, brown spiky hair, round face, big expressive eyes) and Lily (girl, purple dress, yellow bow, warm skin tone). Bright saturated accent colours — orange, teal, yellow, green, red. Poppins-style bold sans-serif labels. Chunky coin icons in gold yellow. Style reference: Kurzgesagt meets motion-graphics explainer. No text in image. Child-safe, ages 5–9, friendly and fun mood.\n\nScene: [INSERT ONE OF THE BELOW]`;

const imageDropIns = [
  'Max standing in a toy shop looking excited, surrounded by a teddy bear, video game controller, and lollipop, five gold coins floating beside him',
  'Five gold coins flying off screen leaving an empty space, Max looking sad with empty pockets and a disappointed expression',
  'Lily dropping a gold coin into a smiling pink piggy bank, three coins already saved inside visible through a glass window, piggy bank sitting on a wooden shelf',
  'Lily standing behind a bright lemonade stand with a yellow banner reading LEMONADE, pitcher of lemonade on the counter, sun shining overhead',
  'Side-by-side split panel: left side shows Max with 1 coin looking sad (red tones), right side shows Lily with 8 coins smiling (green tones), bold dividing line in the centre',
  'Three floating lesson cards on white background: card 1 red with a flying coin, card 2 teal with a piggy bank, card 3 green with a sprouting money plant',
];

const videoStylePrompt = `Animation style: flat 2D motion graphics, educational YouTube explainer video, clean white background, bold saturated colours (orange #FF8C28, teal #20B28C, yellow #FFD228, red #EB4B4B, purple #8250DC). Characters are simple flat cartoon kids with thick black outlines, no shading, no gradients. Camera is locked-off, no camera movement unless specified. Text elements use bold Poppins-style sans-serif. Motion is bouncy and snappy with ease-out curves — elements pop in and slide in from edges. Duration: 4–5 seconds per scene. No voiceover, no music, no sound.`;

const videoScenePrompts = [
  { label: 'Scene 1 — Title Card', text: 'Bold orange top bar slides down from above. The title "Smart With Money!" bounces into frame from small to full size using a springy scale animation. An orange underline draws itself left to right under the title. Three gold coin icons pop in one by one below, each with a small bounce. White background throughout. 4 seconds.' },
  { label: 'Scene 2 — Meet the Characters', text: 'White background. Max (boy, red shirt) slides in from the left. Lily (girl, purple dress, yellow bow) slides in from the right. Both cartoon kids have a bouncy arrival. Red name pill pops in under Max. Purple name pill pops in under Lily. Five small gold coins appear below each character simultaneously with a bounce. 4.5 seconds.' },
  { label: 'Scene 3 — Max Spends', text: 'White background. Max stands left, looking excited. Three yellow rounded rectangles slide in from the right one by one, each labelled: "🧸 Toy bear", "🎮 Video game", "🍭 Candy". Five gold coins fly upward off-screen from the bottom one at a time, each coin spinning as it exits. Bold red text "All gone!" scales up in the centre at the end. 4.5 seconds.' },
  { label: 'Scene 4 — Max is Sad', text: 'White background, slightly grey tinted header. Max stands centre with a sad face, slouched posture, empty hands turned outward. A red label reading "0 coins 😢" fades in below him. A red lesson banner slides up from the bottom reading "💸 Spending money makes it disappear forever" in white text on red. 4.5 seconds.' },
  { label: 'Scene 5 — Lily Saves', text: 'White background, teal top bar. Lily stands left. A pink smiling piggy bank sits right. Gold coins fly one by one in a curved arc from Lily\'s hands into the coin slot on top of the piggy bank. The piggy bank wiggles with satisfaction after each coin. A teal pill label reads "Saved: 5 coins!" Teal lesson banner slides up: "🏦 Saving keeps your money safe & ready". 4.5 seconds.' },
  { label: "Scene 6 — Lily's Idea", text: 'White background, yellow top bar. Lily stands left looking thoughtful. A large yellow lightbulb icon pops in on the right growing from a dot to full size with a bounce. Orange rays animate outward from the bulb rotating slowly. A purple speech bubble slides up from Lily saying "I\'ll start a lemonade stand!" in white text. 4.5 seconds.' },
  { label: 'Scene 7 — The Stand Opens', text: 'White background, orange top bar. A lemonade stand scales up from small to full size in the centre-right — yellow sign, orange text "LEMONADE STAND", glass pitcher. Lily stands behind the counter smiling. Two gold coins arc from Lily\'s side into the stand\'s cash box. Orange pill label: "Used 2 coins to invest!" 4.5 seconds.' },
  { label: 'Scene 8 — Customers Arrive', text: 'White background, green top bar. The lemonade stand is on the right. Three simple cartoon figures walk in from the left one by one, each stopping to hand over a coin. A yellow counter box in the top right counts up: +1, +2... +8, each number popping in with a quick scale bounce. Eight gold coins appear in a row at the bottom. 4.5 seconds.' },
  { label: 'Scene 9 — Side-by-Side', text: 'White background, dark top bar. A vertical line draws itself down the centre dividing the screen. Left side: Max slides in looking sad, 1 coin below him, red text "1 coin left 😢". Right side: Lily slides in smiling, 8 coins below her, green text "8 coins! 🎉". Both sides reveal simultaneously with a scale-in animation. 4.5 seconds.' },
  { label: 'Scene 10 — 3 Lessons', text: 'White background, orange top bar. Three wide rounded rectangles slide in from the left one after another, staggered by 0.4 seconds. Card 1 (red): "💸 Spending — makes money disappear". Card 2 (teal): "🏦 Saving — keeps money safe & ready". Card 3 (green): "💡 Investing — turns money into MORE money". Each card has an icon circle on the left and bold white text. 5 seconds.' },
  { label: 'Scene 11 — Ending', text: 'White background, green top bar. Max and Lily both bounce into frame from opposite sides, smiling, standing together. A gold trophy icon drops from above and bounces to rest between them. Three lines of dark text fade in below one by one: "✔ Save a little every day" / "✔ Think before you spend" / "✔ Invest money to make it grow". 4.5 seconds.' },
];

const voiceoverScript = `[SCENE 1 — TITLE]
Hey there, friends! Today we're going to learn something really important...
how to be SMART with your money!

[SCENE 2 — MEET]
Meet Max and Lily! They're both kids just like you.
And they each have five shiny coins.
But they're about to do very different things with them.

[SCENE 3 — MAX SPENDS]
Max loves toys! He sees a teddy bear... a video game... and some candy.
So he spends — every — single — coin.

[SCENE 4 — EMPTY]
And just like that... Max has nothing left.
When you spend your money, it's gone.

[SCENE 5 — LILY SAVES]
But Lily? She does something different.
She saves her coins... one by one... in her piggy bank.
Saving keeps your money safe until you need it.

[SCENE 6 — IDEA]
Then one day, Lily has a GREAT idea.
She says: "I'm going to start a lemonade stand!"

[SCENE 7 — STAND]
She uses just two of her saved coins to buy lemons and cups.
That's called investing — using money to make more money!

[SCENE 8 — CUSTOMERS]
And people LOVE her lemonade!
One customer... two... three...
Now Lily has EIGHT coins — more than she started with!

[SCENE 9 — COMPARE]
Max has one coin left. Lily has eight.
Same start. Very different choices.

[SCENE 10 — LESSONS]
Here are your three money lessons:
One — spending makes money disappear.
Two — saving keeps it safe.
Three — investing grows it!

[SCENE 11 — ENDING]
And YOU can do this too!
Save a little every day.
Think before you spend.
And find ways to make your money work for you.
You've got this! ⭐`;

const aiSystemPrompt = `You are an expert children's educational content creator specialising in financial literacy for ages 5–9. You write animated video stories in the style of the YouTube channel "LITTLE BIT BETTER" — clean, flat 2D motion-graphics aesthetic with bold Poppins text, white backgrounds, and bright accent colours.

Every story you create must follow this structure:

STORY STRUCTURE (11 scenes, ~50 seconds total):
1. Title card — bold hook, introduce the topic
2. Meet the characters — always two kids with contrasting approaches
3. Character A's bad choice — show the consequence visually
4. Character A's consequence — they lose out or feel sad
5. Character B's smart choice — saving, thinking, planning
6. Character B has an idea — a lightbulb moment
7. Character B takes action — investing or using money wisely
8. Success! — customers, growth, reward
9. Side-by-side comparison — clear visual contrast
10. The 3 lessons — one per card, icon + bold word + explanation
11. Encouraging ending — direct address to the child viewer

VISUAL STYLE RULES:
- White or off-white background always
- Bold colour header bar per scene (pick from: orange, teal, green, red, purple, yellow)
- Flat 2D cartoon characters, thick outlines, no shading
- Poppins Bold font for all headings
- Gold coin icons throughout
- Lesson callout banners slide up from the bottom
- Elements bounce in with ease-out spring animation
- Progress bar along the bottom

CHARACTER RULES:
- Always two kids — one spender, one saver/investor
- Give them simple names (one syllable works best for kids)
- Contrasting colours: warm colours for the spender, cool/green for the saver
- Both should be relatable, never mean — the spender learns and grows

TONE & LANGUAGE:
- Short sentences. Max 10 words per line.
- No jargon. If you use a financial word, define it immediately.
- Warm, encouraging, never preachy
- End every scene on an action or emotion — never just information
- Voiceover reads at ~130 words per minute, target 110–120 words total

FINANCIAL CONCEPTS (rotate through these):
- Spending vs saving
- Earning money through work
- Starting a small business
- Needs vs wants
- Giving and sharing
- How banks work
- What interest means
- Budgeting a weekly allowance
- Saving for a goal
- What investing means (simple: "money that makes more money")

OUTPUT FORMAT:
When asked to create a story, produce:
1. Story title and one-line hook
2. Scene-by-scene visual description
3. Voiceover script (timed to each scene)
4. The 3 lesson cards (icon, bold word, one-sentence explanation)
5. Image generator prompt for the thumbnail

Always end with: "Want me to turn this into a video, slideshow, or image prompts?"`;

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000); }}
      className="text-xs font-bold px-3 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all border border-white/30"
    >
      {ok ? '✅ Copied' : '📋 Copy'}
    </button>
  );
}

function CopyBtnDark({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000); }}
      className="text-xs font-bold px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all border border-gray-200"
    >
      {ok ? '✅ Copied' : '📋 Copy'}
    </button>
  );
}

export default function Story() {
  const [tab, setTab] = useState<Tab>('watch');
  const [sceneIdx, setSceneIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoSceneIdx, setVideoSceneIdx] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const scene = scenes[sceneIdx];

  const clearProgress = () => {
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const cancelSpeech = () => {
    if (hasTTS) window.speechSynthesis.cancel();
    utteranceRef.current = null;
  };

  useEffect(() => {
    if (!playing) {
      clearProgress();
      cancelSpeech();
      return;
    }

    setProgress(0);
    const wordCount = scene.voice.split(' ').length;
    const estMs = Math.max(5000, (wordCount / 1.8) * 1000);
    const tick = 100;
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(97, p + (tick / estMs) * 100));
    }, tick);

    if (hasTTS) {
      const u = new SpeechSynthesisUtterance(scene.voice);
      u.rate = 0.88;
      u.pitch = 1.1;
      u.volume = 1;
      const applyVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const v = voices.find(v => v.lang === 'en-GB' && v.localService)
          || voices.find(v => v.lang === 'en-US' && v.localService)
          || voices.find(v => v.lang.startsWith('en'));
        if (v) u.voice = v;
      };
      applyVoice();
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = applyVoice;
      }
      u.onend = () => {
        clearProgress();
        setProgress(100);
        setTimeout(() => {
          setSceneIdx(i => {
            const next = i + 1;
            if (next >= scenes.length) { setPlaying(false); return i; }
            return next;
          });
        }, 700);
      };
      utteranceRef.current = u;
      window.speechSynthesis.speak(u);
    } else {
      // Fallback: fixed 8s timer if TTS unavailable
      const t = setTimeout(() => {
        setSceneIdx(i => {
          const next = i + 1;
          if (next >= scenes.length) { setPlaying(false); return i; }
          return next;
        });
      }, estMs);
      return () => { clearProgress(); clearTimeout(t); };
    }

    return clearProgress;
  }, [playing, sceneIdx]);

  const goTo = (i: number) => {
    clearProgress();
    cancelSpeech();
    setPlaying(false);
    setProgress(0);
    setSceneIdx(i);
  };

  const togglePlay = () => {
    if (sceneIdx === scenes.length - 1 && !playing) {
      cancelSpeech();
      setSceneIdx(0);
      setProgress(0);
    }
    setPlaying(p => !p);
  };

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: 'watch', label: 'Watch', emoji: '▶️' },
    { id: 'image', label: 'Images', emoji: '🎨' },
    { id: 'video', label: 'Video AI', emoji: '🎬' },
    { id: 'voice', label: 'Voice', emoji: '🎙️' },
    { id: 'ai', label: 'AI Prompt', emoji: '🤖' },
  ];

  return (
    <div className="pb-24 max-w-lg mx-auto">
      {/* Channel header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-400 px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-2xl">💰</span>
          <span className="text-white font-black text-lg tracking-tight">Smart With Money!</span>
        </div>
        <p className="text-orange-100 text-xs">Educational story • Ages 5–9 • 11 scenes • ~50 sec</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 flex overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-shrink-0 flex items-center gap-1 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
              tab === t.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ──── WATCH TAB ──── */}
      {tab === 'watch' && (
        <div>
          {/* Video player */}
          <div className={`relative bg-gradient-to-br ${scene.bg} aspect-video flex flex-col items-center justify-center overflow-hidden`}>
            {/* Scene number badge */}
            <div className="absolute top-3 left-3 bg-black/40 text-white text-xs font-black px-2 py-1 rounded-lg">
              {sceneIdx + 1} / {scenes.length}
            </div>

            {/* Elements */}
            <div className="flex gap-3 text-5xl mb-3 animate-bounce">
              {scene.elements.map((e, i) => (
                <span key={i} style={{ animationDelay: `${i * 150}ms` }}>{e}</span>
              ))}
            </div>

            {/* Heading */}
            <h2 className={`font-black text-center px-4 text-xl leading-tight ${scene.textColor} drop-shadow`}>
              {scene.heading}
            </h2>
            <p className={`text-sm font-semibold mt-1.5 px-6 text-center ${scene.textColor} opacity-90`}>
              {scene.sub}
            </p>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
              <div
                className="h-full bg-white transition-none"
                style={{ width: `${playing ? progress : ((sceneIdx) / scenes.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Controls bar */}
          <div className="bg-gray-900 px-4 py-3 flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="text-white text-2xl w-10 h-10 flex items-center justify-center hover:text-orange-400 transition-colors"
            >
              {playing ? '⏸' : '▶'}
            </button>
            <button
              onClick={() => goTo(Math.max(0, sceneIdx - 1))}
              disabled={sceneIdx === 0}
              className="text-gray-400 hover:text-white disabled:opacity-30 text-lg transition-colors"
            >
              ⏮
            </button>
            <button
              onClick={() => { if (sceneIdx < scenes.length - 1) goTo(sceneIdx + 1); }}
              disabled={sceneIdx === scenes.length - 1}
              className="text-gray-400 hover:text-white disabled:opacity-30 text-lg transition-colors"
            >
              ⏭
            </button>

            {/* Scrubber */}
            <div className="flex-1 h-1.5 bg-gray-600 rounded-full relative cursor-pointer"
              onClick={e => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                goTo(Math.floor(pct * scenes.length));
              }}
            >
              <div
                className="absolute top-0 left-0 h-full bg-orange-500 rounded-full transition-all"
                style={{ width: `${((sceneIdx + (playing ? progress / 100 : 0)) / scenes.length) * 100}%` }}
              />
              {scenes.map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-gray-400 rounded-full"
                  style={{ left: `${(i / scenes.length) * 100}%` }}
                />
              ))}
            </div>

            <span className="text-gray-400 text-xs font-mono whitespace-nowrap">
              {sceneIdx + 1} / {scenes.length}
            </span>
          </div>

          {/* Scene info */}
          <div className="px-4 py-3 bg-white border-b border-gray-100">
            <h3 className="font-black text-gray-800 text-base">{scene.title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">Scene {scene.id} of {scenes.length} • Smart With Money!</p>
          </div>

          {/* Narrator script */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-wide mb-1">Narrator</p>
            <p className="text-sm text-gray-700 italic leading-relaxed">"{scene.voice}"</p>
          </div>

          {/* 3 Lesson cards — show on last 2 scenes */}
          {sceneIdx >= 9 && (
            <div className="px-4 py-3 space-y-2">
              <p className="text-xs font-black text-gray-500 uppercase tracking-wide">3 Big Lessons</p>
              {lessonCards.map(c => (
                <div key={c.label} className={`flex items-center gap-3 rounded-2xl p-3 border-2 ${c.color}`}>
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="font-black text-sm">{c.label}</p>
                    <p className="text-xs opacity-80">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chapters */}
          <div className="px-4 pt-2 pb-2">
            <p className="text-xs font-black text-gray-500 uppercase tracking-wide mb-2">Chapters</p>
            <div className="space-y-1">
              {scenes.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                    i === sceneIdx ? 'bg-orange-100 border-2 border-orange-300' : 'hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-gradient-to-br ${s.bg} flex-shrink-0`}>
                    <span className="text-base">{s.elements[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${i === sceneIdx ? 'text-orange-700' : 'text-gray-700'}`}>{s.title}</p>
                    <p className="text-xs text-gray-400">Scene {s.id}</p>
                  </div>
                  {i === sceneIdx && <span className="text-orange-500 text-xs font-black">▶ NOW</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ──── IMAGE PROMPTS TAB ──── */}
      {tab === 'image' && (
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-black text-white">Base Style Prompt</h3>
                <p className="text-orange-100 text-xs mt-0.5">For Midjourney · DALL-E 3 · Firefly · Stable Diffusion</p>
              </div>
              <CopyBtn text={imageBasePrompt} />
            </div>
            <pre className="text-xs text-orange-50 whitespace-pre-wrap font-mono bg-black/20 rounded-xl p-3 mt-2">{imageBasePrompt}</pre>
          </div>

          <p className="text-xs font-black text-gray-500 uppercase tracking-wide">Drop-in Scene Descriptions</p>
          {imageDropIns.map((desc, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border-2 border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg">Scene {i + 1}</span>
                <CopyBtnDark text={desc} />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* ──── VIDEO AI TAB ──── */}
      {tab === 'video' && (
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-black text-white">Style Reference Prompt</h3>
                <p className="text-purple-100 text-xs mt-0.5">Paste at start of every generation</p>
              </div>
              <CopyBtn text={videoStylePrompt} />
            </div>
            <pre className="text-xs text-purple-50 whitespace-pre-wrap font-mono bg-black/20 rounded-xl p-3 mt-2">{videoStylePrompt}</pre>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs font-black text-gray-500 uppercase tracking-wide">Scene Prompts</p>
            <span className="text-xs text-gray-400">{videoSceneIdx + 1}/{videoScenePrompts.length}</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border-2 border-purple-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="font-black text-gray-800 text-sm">{videoScenePrompts[videoSceneIdx].label}</span>
              <CopyBtnDark text={videoScenePrompts[videoSceneIdx].text} />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{videoScenePrompts[videoSceneIdx].text}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setVideoSceneIdx(i => Math.max(0, i - 1))} disabled={videoSceneIdx === 0}
              className="flex-1 py-2.5 rounded-2xl font-black border-2 border-gray-200 text-gray-600 disabled:opacity-30 hover:border-purple-300 transition-all text-sm">
              ← Prev
            </button>
            <button onClick={() => setVideoSceneIdx(i => Math.min(videoScenePrompts.length - 1, i + 1))} disabled={videoSceneIdx === videoScenePrompts.length - 1}
              className="flex-1 py-2.5 rounded-2xl font-black bg-purple-500 text-white disabled:opacity-30 hover:bg-purple-600 transition-all text-sm">
              Next →
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {videoScenePrompts.map((_, i) => (
              <button key={i} onClick={() => setVideoSceneIdx(i)}
                className={`w-9 h-9 rounded-xl text-sm font-black transition-all ${i === videoSceneIdx ? 'bg-purple-500 text-white shadow scale-110' : 'bg-gray-100 text-gray-500 hover:bg-purple-100'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ──── VOICEOVER TAB ──── */}
      {tab === 'voice' && (
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl p-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-black text-white">Full Voiceover Script</h3>
                <p className="text-teal-100 text-xs mt-0.5">Warm narrator · ~50 sec · Ages 5–9</p>
              </div>
              <CopyBtn text={voiceoverScript} />
            </div>
          </div>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white rounded-2xl p-4 border-2 border-gray-100 shadow-sm leading-relaxed">{voiceoverScript}</pre>
          <div className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200">
            <p className="text-xs font-black text-yellow-700 mb-1">💡 Pacing tip</p>
            <p className="text-xs text-yellow-800">Target ~130 words per minute. Use pauses at "..." for dramatic effect. Total ~115 words.</p>
          </div>
        </div>
      )}

      {/* ──── AI PROMPT TAB ──── */}
      {tab === 'ai' && (
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-black text-white">Story Generator System Prompt</h3>
                <p className="text-green-100 text-xs mt-0.5">Paste into Claude or ChatGPT to generate more stories</p>
              </div>
              <CopyBtn text={aiSystemPrompt} />
            </div>
          </div>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono bg-white rounded-2xl p-4 border-2 border-gray-100 shadow-sm leading-relaxed">{aiSystemPrompt}</pre>
          <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
            <p className="text-xs font-black text-green-700 mb-2">Concepts to generate stories about:</p>
            <div className="flex flex-wrap gap-1.5">
              {['Spending vs saving', 'Earning money', 'Starting a business', 'Needs vs wants', 'Giving & sharing', 'How banks work', 'What is interest?', 'Weekly budget', 'Saving for a goal', 'What is investing?'].map(c => (
                <span key={c} className="bg-white text-green-800 text-xs font-semibold px-2 py-1 rounded-lg border border-green-200">{c}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
