import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Settings } from 'lucide-react';
import { SiteConfig } from '../../config/siteConfig';

interface FinalSceneProps {
  config: SiteConfig;
  onOpenSettings: () => void;
}

export const FinalScene: React.FC<FinalSceneProps> = ({ config, onOpenSettings }) => {
  return (
    <section id="final-scene" className="relative w-full min-h-screen py-24 px-4 sm:px-6 bg-spider-darker flex flex-col items-center justify-between border-t-4 border-black overflow-hidden">
      {/* Night City Backdrop Image */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom opacity-30 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1600&auto=format&fit=crop")`
        }}
      />

      {/* Spider Web Pattern */}
      <div className="absolute inset-0 spider-web-bg opacity-60 pointer-events-none" />

      {/* Glowing Star particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-spider-red/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full text-center my-auto space-y-8">
        {/* Quote 1 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-4xl font-comic text-slate-300 tracking-wider uppercase"
        >
          "{config.finalRooftopQuote1 || "Every hero needs someone to come home to."}"
        </motion.h2>

        {/* Quote 2 Highlight */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-7xl font-comic text-white uppercase text-glow-red tracking-wider"
        >
          "{config.finalRooftopQuote2 || "And you're my home. ❤️"}"
        </motion.h1>

        {/* Rooftop Silhouette SVG Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative w-full max-w-md mx-auto aspect-[2.2/1] my-8 flex items-end justify-center"
        >
          {/* Couple Silhouette Graphic */}
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Rooftop Edge */}
            <rect x="50" y="160" width="300" height="40" fill="#0B0C10" stroke="#E50914" strokeWidth="2" />
            <line x1="40" y1="160" x2="360" y2="160" stroke="#0055FF" strokeWidth="3" />

            {/* Silhouette 1 (Spidey with suit ears/mask) */}
            <path d="M170 160 Q170 120 180 110 Q190 120 190 160" fill="#E50914" />
            <circle cx="180" cy="100" r="12" fill="#E50914" />

            {/* Silhouette 2 (Partner leaning on shoulder) */}
            <path d="M190 160 Q195 125 210 120 Q220 125 220 160" fill="#0055FF" />
            <circle cx="205" cy="105" r="11" fill="#0055FF" />

            {/* Glowing Heart above them */}
            <path d="M192 75 C192 70 185 65 180 72 C175 65 168 70 168 75 C168 85 180 93 180 93 C180 93 192 85 192 75 Z" fill="#FFCC00" className="animate-pulse" />
          </svg>
        </motion.div>

        {/* Happy Birthday Name & Date */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="space-y-2"
        >
          <p className="text-2xl sm:text-4xl font-comic text-spider-accent uppercase tracking-wider">
            HAPPY BOYFRIEND DAY, {config.partnerName}
          </p>
          <p className="text-base sm:text-xl font-comic text-slate-400 tracking-widest">
            {config.birthdayDate ? new Date(config.birthdayDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '3 OKTOBER 2026'}
          </p>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="pt-6 border-t border-slate-800 inline-block"
        >
          <p className="font-handwritten text-3xl sm:text-4xl text-spider-red font-bold">
            Selalu untukmu,
          </p>
          <p className="font-comic text-2xl sm:text-3xl text-white tracking-wider uppercase mt-1">
            {config.yourName} 🕷️❤️
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl flex items-center justify-center pt-12 border-t border-slate-900 text-xs font-comic text-slate-500">
        <div>
          <span>🕷️ A BOYFRIEND DAY SURPRISE FOR MY AMAZING PERSON</span>
        </div>
      </footer>
    </section>
  );
};
