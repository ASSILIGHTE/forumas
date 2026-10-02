import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Zap } from 'lucide-react';
import { SiteConfig } from '../../config/siteConfig';
import { SpiderHeroCard } from '../ui/SpiderHeroCard';

interface HeroSectionProps {
  config: SiteConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 bg-gradient-to-b from-spider-darker via-spider-dark to-spider-darker overflow-hidden">
      {/* Background Subtle Halftone & Grid */}
      <div className="absolute inset-0 bg-halftone opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-48 h-48 bg-spider-red/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-spider-blue/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Comic Embellishments */}
      <motion.div 
        animate={{ y: [-10, 10, -10], rotate: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-6 sm:left-16 z-10 hidden sm:flex items-center gap-1 px-3 py-1.5 bg-spider-accent text-black font-comic text-lg uppercase rounded-lg border-2 border-black shadow-comic"
      >
        <Zap className="w-5 h-5 fill-current" />
        <span>KAPOW!</span>
      </motion.div>

      <motion.div 
        animate={{ y: [10, -10, 10], rotate: [4, -4, 4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 right-6 sm:right-16 z-10 hidden sm:flex items-center gap-1 px-3 py-1.5 bg-spider-red text-white font-comic text-lg uppercase rounded-lg border-2 border-black shadow-comic"
      >
        <Heart className="w-5 h-5 fill-current text-white" />
        <span>MY HERO!</span>
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-4"
        >
          <span className="inline-block text-spider-accent font-comic tracking-widest text-lg sm:text-xl uppercase bg-black/60 px-4 py-1 rounded-full border border-spider-accent/50 mb-3 shadow-sm">
            🕷️ ISSUE #1 SPECIAL EDITION 🕷️
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-comic text-white uppercase text-glow-red leading-tight">
            {config.heroHeadline || "HAPPY BOYFRIEND DAY, MY HERO ❤️"}
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-300 max-w-2xl font-body leading-relaxed mb-8 px-2 font-medium"
        >
          {config.heroSubheadline}
        </motion.p>

        {/* Partner Name Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <div className="relative inline-block px-8 py-3 bg-gradient-to-r from-spider-red to-spider-red-dark border-4 border-black rounded-2xl shadow-comic shadow-spider-red transform -rotate-1">
            <span className="text-3xl sm:text-5xl font-comic text-white tracking-wider uppercase drop-shadow-md">
              {config.partnerName}
            </span>
            <div className="absolute -top-3 -right-3 bg-spider-accent text-black font-comic text-sm px-2 py-0.5 rounded border border-black shadow">
              THE ONE & ONLY ❤️
            </div>
          </div>
        </motion.div>

        {/* Comic Panel Frame with Vector Spider Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative group max-w-md w-full"
        >
          {/* Outer Comic Frame */}
          <div className="relative bg-white p-4 sm:p-5 rounded-2xl border-4 border-black shadow-comic shadow-spider-red group-hover:shadow-spider-glow transition-all duration-500">
            {/* Top Comic Bar */}
            <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3 font-comic text-sm text-black">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-spider-red text-spider-red" />
                HERO PROFILE PANEL
              </span>
              <span className="bg-black text-white px-2 py-0.5 rounded text-xs">NO. 1 IN MY HEART</span>
            </div>

            {/* Interactive Spider Hero Card (Vector Illustration & Suit Changer) */}
            <SpiderHeroCard partnerName={config.partnerName} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};


