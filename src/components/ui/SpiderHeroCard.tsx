import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, Zap, Heart, Flame } from 'lucide-react';
import { sfx } from '../../utils/soundEffects';

interface SpiderHeroCardProps {
  partnerName: string;
}

interface SuitTheme {
  id: string;
  name: string;
  badge: string;
  primaryColor: string;
  glowColor: string;
  bgGradient: string;
  maskFill: string;
  eyeGlow: string;
  quote: string;
  statColor: string;
}

const SUIT_THEMES: SuitTheme[] = [
  {
    id: 'classic',
    name: 'CLASSIC SPIDEY 🔴',
    badge: 'PETER PARKER VIBES',
    primaryColor: '#E50914',
    glowColor: 'rgba(229, 9, 20, 0.4)',
    bgGradient: 'from-red-950 via-slate-950 to-blue-950',
    maskFill: '#E50914',
    eyeGlow: '#FFFFFF',
    quote: '"With great patience comes the best boyfriend ever!"',
    statColor: 'bg-spider-red',
  },
  {
    id: 'miles',
    name: 'MILES MORALES ⬛',
    badge: 'STEALTH & SWAG',
    primaryColor: '#FF0055',
    glowColor: 'rgba(255, 0, 85, 0.5)',
    bgGradient: 'from-slate-950 via-black to-red-950',
    maskFill: '#121316',
    eyeGlow: '#00E5FF',
    quote: '"What’s up, danger? You’re my favorite person in the Multiverse!"',
    statColor: 'bg-red-600',
  },
  {
    id: 'iron',
    name: 'IRON-SPIDER 🟡',
    badge: 'STARK TECH SUIT',
    primaryColor: '#FFCC00',
    glowColor: 'rgba(255, 204, 0, 0.5)',
    bgGradient: 'from-yellow-950 via-red-950 to-black',
    maskFill: '#990000',
    eyeGlow: '#FFCC00',
    quote: '"Enhanced with 1000% Love & Tech Power!"',
    statColor: 'bg-yellow-500',
  },
  {
    id: 'gwen',
    name: 'GHOST-SPIDER 🩷',
    badge: 'GWEN STACY VIBES',
    primaryColor: '#FF66B2',
    glowColor: 'rgba(255, 102, 178, 0.5)',
    bgGradient: 'from-purple-950 via-slate-950 to-pink-950',
    maskFill: '#F8FAFC',
    eyeGlow: '#00E5FF',
    quote: '"In every universe, I fall for you!"',
    statColor: 'bg-pink-500',
  }
];

export const SpiderHeroCard: React.FC<SpiderHeroCardProps> = ({ partnerName }) => {
  const [activeSuitId, setActiveSuitId] = useState<string>('classic');

  const currentTheme = SUIT_THEMES.find((s) => s.id === activeSuitId) || SUIT_THEMES[0];

  const handleSuitChange = (suitId: string) => {
    sfx.playWebShot();
    setActiveSuitId(suitId);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Interactive Suit Selector Bar */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-4 z-20">
        {SUIT_THEMES.map((suit) => (
          <button
            key={suit.id}
            onClick={() => handleSuitChange(suit.id)}
            className={`px-3 py-1.5 rounded-xl font-comic text-xs uppercase tracking-wider transition-all border-2 border-black ${
              activeSuitId === suit.id
                ? 'bg-spider-accent text-black font-bold scale-105 shadow-comic'
                : 'bg-black/70 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {suit.name}
          </button>
        ))}
      </div>

      {/* Main Comic Card Panel Container */}
      <div className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-4 border-black bg-gradient-to-b ${currentTheme.bgGradient} p-4 flex flex-col items-center justify-between shadow-comic transition-all duration-700`}>
        {/* Background Web Rays & Halftone */}
        <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
            <polygon points="100,10 190,100 100,190 10,100" fill="none" stroke={currentTheme.primaryColor} strokeWidth="1.5" />
            <polygon points="100,30 170,100 100,170 30,100" fill="none" stroke={currentTheme.primaryColor} strokeWidth="1" />
            <line x1="100" y1="0" x2="100" y2="200" stroke={currentTheme.primaryColor} strokeWidth="1" />
            <line x1="0" y1="100" x2="200" y2="100" stroke={currentTheme.primaryColor} strokeWidth="1" />
          </svg>
        </div>

        {/* Top Badge Tag */}
        <div className="relative z-10 w-full flex items-center justify-between font-comic text-xs">
          <span className="px-2.5 py-1 bg-black/80 text-spider-accent rounded-lg border border-spider-accent/50 uppercase tracking-widest flex items-center gap-1 shadow">
            <Zap className="w-3.5 h-3.5 text-spider-accent" />
            {currentTheme.badge}
          </span>
          <span className="px-2 py-0.5 bg-spider-red text-white rounded border border-black uppercase">
            100% LEGENDARY
          </span>
        </div>

        {/* Center Vector Spider-Man Mask Illustration */}
        <motion.div
          key={currentTheme.id}
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative w-44 h-44 sm:w-52 sm:h-52 my-auto flex items-center justify-center cursor-pointer group"
          onClick={() => sfx.playWebShot()}
        >
          {/* Glowing Aura Rings */}
          <div
            className="absolute inset-0 rounded-full blur-2xl transition-all duration-500 animate-pulse scale-90"
            style={{ backgroundColor: currentTheme.glowColor }}
          />

          {/* Precise Vector SVG Spider Mask */}
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl z-10">
            {/* Outer Head Contour */}
            <path
              d="M100 15 Q165 20 175 110 Q180 180 100 230 Q20 180 25 110 Q35 20 100 15 Z"
              fill={currentTheme.maskFill}
              stroke="#000000"
              strokeWidth="6"
            />

            {/* Web Lines on Mask */}
            <path d="M100 15 L100 230" stroke="#000000" strokeWidth="2.5" opacity="0.6" />
            <path d="M25 110 L175 110" stroke="#000000" strokeWidth="2.5" opacity="0.6" />
            <path d="M40 55 L160 165" stroke="#000000" strokeWidth="2" opacity="0.5" />
            <path d="M160 55 L40 165" stroke="#000000" strokeWidth="2" opacity="0.5" />

            {/* Concentric Web Arcs */}
            <path d="M70 70 Q100 85 130 70" fill="none" stroke="#000000" strokeWidth="2" opacity="0.6" />
            <path d="M50 110 Q100 135 150 110" fill="none" stroke="#000000" strokeWidth="2" opacity="0.6" />
            <path d="M60 160 Q100 180 140 160" fill="none" stroke="#000000" strokeWidth="2" opacity="0.6" />

            {/* Spider Eye Left (Black Border) */}
            <path
              d="M42 85 Q75 75 90 105 Q78 140 45 125 Q32 105 42 85 Z"
              fill="#000000"
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Spider Eye Left Inner (White Glowing Lens) */}
            <path
              d="M48 90 Q73 82 84 105 Q74 132 49 120 Q39 105 48 90 Z"
              fill={currentTheme.eyeGlow}
            />

            {/* Spider Eye Right (Black Border) */}
            <path
              d="M158 85 Q125 75 110 105 Q122 140 155 125 Q168 105 158 85 Z"
              fill="#000000"
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Spider Eye Right Inner (White Glowing Lens) */}
            <path
              d="M152 90 Q127 82 116 105 Q126 132 151 120 Q161 105 152 90 Z"
              fill={currentTheme.eyeGlow}
            />

            {/* Subtle Eye Reflection Lines */}
            <path d="M55 95 L75 90" stroke="#00E5FF" strokeWidth="2" opacity="0.8" />
            <path d="M145 95 L125 90" stroke="#00E5FF" strokeWidth="2" opacity="0.8" />
          </svg>

          {/* Spider-Sense Radar Pulse Indicator */}
          <div className="absolute -top-3 text-xl animate-bounce pointer-events-none z-20">
            ⚡
          </div>
        </motion.div>

        {/* Hero Dossier Mini Stat Bars */}
        <div className="relative z-10 w-full space-y-1.5 bg-black/75 p-2.5 rounded-xl border border-slate-800 font-comic text-[11px] text-slate-200">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-spider-red fill-spider-red" />
              BOYFRIEND POWER
            </span>
            <span className="text-spider-accent font-bold">1000% (MAX)</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
            <div className={`h-full ${currentTheme.statColor} w-full animate-pulse`} />
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
              SPIDER-SENSE PEKA
            </span>
            <span className="text-spider-accent font-bold">999% (S-TIER)</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
            <div className="h-full bg-spider-blue w-[98%]" />
          </div>
        </div>

        {/* Dynamic Speech Bubble Quote */}
        <motion.div
          key={currentTheme.quote}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full mt-2 bg-black/90 backdrop-blur-md p-2.5 rounded-xl border-2 border-spider-accent text-center shadow-comic"
        >
          <p className="font-comic text-xs sm:text-sm text-spider-accent tracking-wide uppercase leading-snug">
            {currentTheme.quote}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SpiderHeroCard;
