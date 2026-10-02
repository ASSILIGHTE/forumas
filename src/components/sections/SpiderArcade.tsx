import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Award, RefreshCw, Zap, Flame, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SiteConfig } from '../../config/siteConfig';
import { sfx } from '../../utils/soundEffects';

interface SpiderArcadeProps {
  config: SiteConfig;
}

// Memory Match Cards
interface MemoryCard {
  id: number;
  icon: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ROMANTIC_CARD_PAIRS = [
  { icon: '🕷️', label: 'Spidey Mask' },
  { icon: '💌', label: 'Surat Cinta' },
  { icon: '☕', label: 'Ngedate Ngopi' },
  { icon: '✈️', label: 'Masa LDR' },
  { icon: '🌃', label: 'Sunset Rooftop' },
  { icon: '🤍', label: 'Cinta untuk Mas' },
];

const WEB_WHEEL_SLOTS = [
  {
    id: 1,
    title: "Momen Kangen",
    quote: "Padahal awalnya aku cuek banget ya, Mas? Eh tapi sekarang kok aku yang kangen terus? 😭🤍",
    icon: "🙈",
    color: "#E50914"
  },
  {
    id: 2,
    title: "Efek 1 Chat",
    quote: "Sampai hari ini, Mas masih jadi orang yang bikin aku senyum sendiri cuma gara-gara 1 chat! 😭✨",
    icon: "💬",
    color: "#00E5FF"
  },
  {
    id: 3,
    title: "Terima Kasih Kesabaran",
    quote: "Terima kasih ya, Mas, sudah sabar menghadapi aku yang kadang manja, diem, & overthinking 🤍",
    icon: "🛡️",
    color: "#FFCC00"
  },
  {
    id: 4,
    title: "Rasa Aman",
    quote: "Terima kasih juga karena Mas selalu berusaha membuat aku merasa aman. 🏠🤍",
    icon: "🏠",
    color: "#FF0055"
  },
  {
    id: 5,
    title: "Banyak Hari Bersama",
    quote: "Aku nggak cuma mau punya Mas untuk hari ini. Aku mau punya banyak 'hari' bersama Mas! ✨",
    icon: "✨",
    color: "#990000"
  },
  {
    id: 6,
    title: "Impian LDR Kita",
    quote: "Semoga hal kecil ini jadi bukti kalau kita berhasil melewati LDR dan sampai di satu tempat yang sama 🤍",
    icon: "✈️",
    color: "#FF66B2"
  }
];

export const SpiderArcade: React.FC<SpiderArcadeProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState<'wheel' | 'memory' | 'meter'>('wheel');

  // ==========================================
  // GAME 1: RODA CINTA SPIDER-MAN (SPIN WHEEL)
  // ==========================================
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationDegree, setRotationDegree] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<typeof WEB_WHEEL_SLOTS[0] | null>(null);
  const [collectedSlotIds, setCollectedSlotIds] = useState<number[]>([]);

  const handleSpinWheel = () => {
    if (isSpinning) return;

    sfx.playWebShot();
    setIsSpinning(true);
    setSelectedSlot(null);

    // Random target slot index (0 to 5)
    const randomIndex = Math.floor(Math.random() * WEB_WHEEL_SLOTS.length);
    const targetSlot = WEB_WHEEL_SLOTS[randomIndex];

    // Calculate rotation angle (each segment is 60 degrees)
    const segmentAngle = 360 / WEB_WHEEL_SLOTS.length;
    const extraSpins = (Math.floor(Math.random() * 3) + 4) * 360; // 4 to 6 full spins
    const targetAngle = extraSpins + (360 - randomIndex * segmentAngle);

    setRotationDegree((prev) => prev + targetAngle);

    // Sound effect tick simulation
    let soundInterval = setInterval(() => {
      sfx.playCardFlip();
    }, 120);

    setTimeout(() => {
      clearInterval(soundInterval);
      setIsSpinning(false);
      setSelectedSlot(targetSlot);
      sfx.playCelebration();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      if (!collectedSlotIds.includes(targetSlot.id)) {
        setCollectedSlotIds((prev) => [...prev, targetSlot.id]);
      }
    }, 3200);
  };

  // ==========================================
  // GAME 2: ROMANTIC MEMORY MATCH
  // ==========================================
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [memoryVictory, setMemoryVictory] = useState<boolean>(false);

  const initMemoryGame = () => {
    const duplicated = [...ROMANTIC_CARD_PAIRS, ...ROMANTIC_CARD_PAIRS];
    const shuffled = duplicated
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        icon: item.icon,
        label: item.label,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMemoryVictory(false);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    sfx.playCardFlip();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;

      if (cards[firstIdx].icon === cards[secondIdx].icon) {
        sfx.playHeartCollect();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, i) =>
              i === firstIdx || i === secondIdx ? { ...card, isMatched: true } : card
            )
          );
          setFlippedCards([]);

          const allMatched = cards.every((c, i) =>
            i === firstIdx || i === secondIdx ? true : c.isMatched
          );
          if (allMatched) {
            setMemoryVictory(true);
            sfx.playCelebration();
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
          }
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, i) =>
              i === firstIdx || i === secondIdx ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // ==========================================
  // GAME 3: SPIDER LOVE METER (Charger)
  // ==========================================
  const [lovePower, setLovePower] = useState<number>(0);
  const [isMaxPower, setIsMaxPower] = useState<boolean>(false);

  const handleChargeLove = () => {
    sfx.playHeartCollect();
    if (lovePower < 1000) {
      const nextPower = Math.min(lovePower + 100, 1000);
      setLovePower(nextPower);
      if (nextPower === 1000) {
        setIsMaxPower(true);
        sfx.playCelebration();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
      }
    }
  };

  const resetLovePower = () => {
    sfx.playCardFlip();
    setLovePower(0);
    setIsMaxPower(false);
  };

  return (
    <section id="memories" className="relative w-full py-20 px-4 sm:px-6 bg-spider-dark border-t-4 border-black overflow-hidden">
      {/* Halftone Overlay */}
      <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none" />

      {/* Red & Blue Glows */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-spider-red/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-spider-blue/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-spider-red/20 border border-spider-red text-spider-red-glow font-comic tracking-widest text-lg uppercase mb-3"
          >
            <Heart className="w-5 h-5 text-spider-red animate-pulse" />
            <span>SPIDER-SENSE LOVE ZONE 🤍</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-comic text-white tracking-wider uppercase text-glow-red"
          >
            GAME UNTUK MAS 🎮🤍
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 font-body max-w-xl mx-auto text-base sm:text-lg mt-2"
          >
            Minigame nyaman, santai, dan romantis khusus merayakan Boyfriend Day buat Mas favoritku! 🕷️
          </motion.p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => {
              sfx.playCardFlip();
              setActiveTab('wheel');
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-comic text-lg uppercase tracking-wider transition-all border-3 border-black shadow-comic ${
              activeTab === 'wheel'
                ? 'bg-spider-red text-white shadow-spider-red scale-105'
                : 'bg-spider-card text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <RotateCw className="w-5 h-5" />
            <span>Roda Cinta Spider-Man 🕸️🎡</span>
          </button>

          <button
            onClick={() => {
              sfx.playCardFlip();
              setActiveTab('memory');
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-comic text-lg uppercase tracking-wider transition-all border-3 border-black shadow-comic ${
              activeTab === 'memory'
                ? 'bg-spider-blue text-white shadow-spider-blue scale-105'
                : 'bg-spider-card text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-5 h-5" />
            <span>Memory Match 🃏🤍</span>
          </button>

          <button
            onClick={() => {
              sfx.playCardFlip();
              setActiveTab('meter');
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-comic text-lg uppercase tracking-wider transition-all border-3 border-black shadow-comic ${
              activeTab === 'meter'
                ? 'bg-spider-accent text-black shadow-comic scale-105'
                : 'bg-spider-card text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Zap className="w-5 h-5" />
            <span>Spider-Love Meter ⚡</span>
          </button>
        </div>

        {/* ========================================== */}
        {/* TAB 1: RODA CINTA SPIDER-MAN (SPIN WHEEL) */}
        {/* ========================================== */}
        {activeTab === 'wheel' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-spider-card rounded-3xl border-4 border-black p-6 sm:p-8 shadow-comic shadow-spider-red relative flex flex-col items-center"
          >
            <div className="w-full flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-800 pb-4 mb-6 font-comic">
              <div className="flex items-center gap-2 text-2xl text-white uppercase">
                <RotateCw className="w-6 h-6 text-spider-red" />
                <span>RODA UNGKAPAN CINTA UNTUK MAS 🎡</span>
              </div>
              <div className="bg-black px-4 py-2 rounded-xl border border-spider-red flex items-center gap-2">
                <span className="text-slate-400 text-xs uppercase">PESAN DISIMPANKAN:</span>
                <span className="text-2xl text-spider-accent font-bold">{collectedSlotIds.length} / 6 🤍</span>
              </div>
            </div>

            {/* Wheel Canvas / Graphic Display */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 my-4 flex items-center justify-center">
              {/* Pointer Arrow at Top */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 text-4xl font-comic text-spider-accent drop-shadow">
                ▼
              </div>

              {/* Rotating Spider-Web Wheel */}
              <motion.div
                className="w-full h-full rounded-full border-6 border-black shadow-comic shadow-spider-red relative overflow-hidden bg-slate-950 flex items-center justify-center"
                animate={{ rotate: rotationDegree }}
                transition={{ duration: 3.2, ease: "easeOut" }}
              >
                {/* SVG Wheel Segments */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {WEB_WHEEL_SLOTS.map((slot, index) => {
                    const angle = (360 / WEB_WHEEL_SLOTS.length) * index;
                    const nextAngle = (360 / WEB_WHEEL_SLOTS.length) * (index + 1);

                    const x1 = 100 + 95 * Math.cos((Math.PI * angle) / 180);
                    const y1 = 100 + 95 * Math.sin((Math.PI * angle) / 180);
                    const x2 = 100 + 95 * Math.cos((Math.PI * nextAngle) / 180);
                    const y2 = 100 + 95 * Math.sin((Math.PI * nextAngle) / 180);

                    const d = `M100,100 L${x1},${y1} A95,95 0 0,1 ${x2},${y2} Z`;

                    return (
                      <g key={slot.id}>
                        <path d={d} fill={slot.color} opacity="0.85" stroke="#000000" strokeWidth="2" />
                      </g>
                    );
                  })}

                  {/* Web Pattern overlay lines */}
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <circle cx="100" cy="100" r="30" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
                </svg>

                {/* Slot Icons positioned radially */}
                {WEB_WHEEL_SLOTS.map((slot, index) => {
                  const angle = (360 / WEB_WHEEL_SLOTS.length) * index + 30; // mid segment
                  const rad = (Math.PI * angle) / 180;
                  const x = 50 + 34 * Math.cos(rad);
                  const y = 50 + 34 * Math.sin(rad);

                  return (
                    <div
                      key={slot.id}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl pointer-events-none drop-shadow"
                    >
                      {slot.icon}
                    </div>
                  );
                })}

                {/* Center Spidey Seal Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black border-4 border-spider-accent flex items-center justify-center text-3xl shadow-lg z-20">
                  🕷️
                </div>
              </motion.div>
            </div>

            {/* Spin CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSpinning}
              onClick={handleSpinWheel}
              className={`mt-4 px-8 py-4 font-comic text-2xl uppercase rounded-2xl border-4 border-black shadow-comic transition-all flex items-center gap-3 cursor-pointer ${
                isSpinning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-spider-accent text-black hover:bg-yellow-300 scale-105'
              }`}
            >
              <RotateCw className={`w-7 h-7 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'SPINNING RODA… 🎡' : 'PUTAR RODA CINTA UNTUK MAS 🎡'}</span>
            </motion.button>

            {/* Result Popover Box */}
            <AnimatePresence>
              {selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="mt-6 max-w-lg w-full bg-black/90 backdrop-blur-md p-6 rounded-2xl border-3 border-spider-accent text-center shadow-comic"
                >
                  <div className="text-4xl mb-2">{selectedSlot.icon}</div>
                  <span className="font-comic text-xs text-spider-accent uppercase tracking-widest bg-spider-accent/20 px-3 py-1 rounded border border-spider-accent/50 mb-2 inline-block">
                    {selectedSlot.title}
                  </span>
                  <p className="font-comic text-xl sm:text-2xl text-white tracking-wide leading-relaxed uppercase mt-2">
                    "{selectedSlot.quote}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ========================================== */}
        {/* TAB 2: ROMANTIC MEMORY MATCH */}
        {/* ========================================== */}
        {activeTab === 'memory' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-spider-card rounded-3xl border-4 border-black p-6 sm:p-8 shadow-comic shadow-spider-blue relative"
          >
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4 mb-6 font-comic">
              <div className="flex items-center gap-2 text-2xl text-white uppercase">
                <Award className="w-6 h-6 text-spider-blue" />
                <span>SPIDER LOVE MATCH UNTUK MAS</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm">MOVES: <strong className="text-white text-xl">{moves}</strong></span>
                <button
                  onClick={initMemoryGame}
                  className="p-2 bg-slate-800 rounded-xl border border-slate-700 hover:text-white text-slate-300"
                  title="Reset Game"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {memoryVictory ? (
              <div className="text-center p-8 bg-black/90 rounded-2xl border-3 border-spider-accent max-w-lg mx-auto">
                <div className="text-7xl mb-3">🎉🕷️🤍</div>
                <h3 className="text-4xl font-comic text-spider-accent uppercase mb-2">SELESAI DENGAN SEMPURNA!</h3>
                <p className="font-comic text-slate-200 text-lg mb-4">
                  Semua pasangan momen romantis berhasil dicocokkan dalam <strong>{moves} moves</strong>!
                </p>
                <div className="p-4 bg-spider-accent/20 rounded-xl border border-spider-accent font-handwritten text-2xl text-spider-accent mb-6">
                  "Mas itu pasangan paling pas di seluruh Multiverse! 🤍"
                </div>
                <button
                  onClick={initMemoryGame}
                  className="px-6 py-3 bg-spider-blue text-white font-comic text-xl uppercase rounded-xl border-3 border-black shadow-comic hover:bg-blue-600 transition-all cursor-pointer"
                >
                  MAIN LAGI 🔄
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
                {cards.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(idx)}
                    className={`aspect-square rounded-2xl border-3 border-black flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-comic ${
                      card.isFlipped || card.isMatched
                        ? 'bg-slate-900 border-spider-accent shadow-spider-blue'
                        : 'bg-gradient-to-br from-spider-red to-spider-red-dark hover:brightness-110'
                    }`}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <span className="text-3xl sm:text-5xl">{card.icon}</span>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="text-2xl sm:text-3xl">🕷️</span>
                        <span className="font-comic text-[10px] text-white/80 uppercase mt-1">MAS 🤍</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ========================================== */}
        {/* TAB 3: SPIDER-LOVE METER */}
        {/* ========================================== */}
        {activeTab === 'meter' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-spider-card rounded-3xl border-4 border-black p-6 sm:p-8 shadow-comic shadow-spider-red text-center relative overflow-hidden"
          >
            <h3 className="text-3xl font-comic text-white uppercase mb-2">
              SPIDER-SENSE LOVE METER FOR MAS ⚡🤍
            </h3>
            <p className="text-slate-400 font-body text-sm max-w-md mx-auto mb-8">
              Tekan tombol heart di bawah untuk mengisi energi cinta sampai 1000% MAX!
            </p>

            {/* Love Power Gauge */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between font-comic text-sm text-slate-300 mb-2">
                <span>POWER LEVEL:</span>
                <span className="text-spider-accent font-bold text-xl">{lovePower}% / 1000%</span>
              </div>
              <div className="w-full h-6 bg-slate-950 rounded-full border-3 border-black p-1 shadow-inner overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-spider-red via-spider-accent to-pink-500 rounded-full"
                  style={{ width: `${(lovePower / 1000) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
            </div>

            {/* Big Interactive Heart Button */}
            {!isMaxPower ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleChargeLove}
                className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full bg-gradient-to-tr from-spider-red via-red-600 to-pink-600 border-6 border-black shadow-comic shadow-spider-red flex flex-col items-center justify-center cursor-pointer group"
              >
                <Heart className="w-16 h-16 text-white fill-white animate-pulse group-hover:scale-125 transition-transform" />
                <span className="font-comic text-xs text-spider-accent uppercase mt-2">TAP TO CHARGE ⚡</span>
              </motion.button>
            ) : (
              /* MAX POWER VICTORY CERTIFICATE */
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-xl mx-auto bg-white text-black p-6 sm:p-8 rounded-3xl border-4 border-black shadow-comic shadow-spider-red"
              >
                <div className="text-5xl mb-2">📜🕷️🤍</div>
                <h4 className="text-3xl font-comic uppercase border-b-3 border-black pb-2 mb-3">
                  SPIDER-LOVE CERTIFICATE
                </h4>
                <p className="font-comic text-xl text-spider-red uppercase mb-3">
                  MAS ADALAH PACAR FAVORIT 1000% 🤍
                </p>
                <p className="font-handwritten text-xl text-slate-800 leading-relaxed italic mb-6">
                  "Semoga nanti ada waktunya hal kecil ini bukan cuma jadi kenangan tentang masa LDR kita, tapi jadi bukti kalau kita pernah sejauh ini… dan akhirnya berhasil sampai di satu tempat yang sama. 🤍"
                </p>
                <button
                  onClick={resetLovePower}
                  className="px-6 py-2.5 bg-spider-red text-white font-comic text-lg uppercase rounded-xl border-2 border-black shadow-comic hover:bg-spider-red-dark transition-all cursor-pointer"
                >
                  RECHARGE AGAIN ⚡
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SpiderArcade;
