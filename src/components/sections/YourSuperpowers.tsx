import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, RotateCw } from 'lucide-react';
import { SiteConfig, SuperpowerCard } from '../../config/siteConfig';
import { sfx } from '../../utils/soundEffects';

interface YourSuperpowersProps {
  config: SiteConfig;
}

export const YourSuperpowers: React.FC<YourSuperpowersProps> = ({ config }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleCardClick = (id: string) => {
    sfx.playCardFlip();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="superpowers" className="relative w-full py-20 px-4 sm:px-6 bg-spider-darker border-t-4 border-black overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-spider-accent/20 border border-spider-accent text-spider-accent font-comic tracking-widest text-lg uppercase mb-3"
          >
            <Shield className="w-5 h-5" />
            <span>HERO ABILITY INDEX</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-comic text-white tracking-wider uppercase text-glow-gold"
          >
            YOUR SUPERPOWERS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-body max-w-xl mx-auto text-base sm:text-lg mt-2"
          >
            Tap or hover any hero card to flip and analyze your legendary abilities!
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {config.superpowers.map((card, idx) => {
            const isFlipped = !!flippedCards[card.id];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-96 w-full perspective-1000 cursor-pointer"
                onClick={() => handleCardClick(card.id)}
              >
                <div
                  className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT CARD */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-spider-card border-4 border-black p-6 shadow-comic shadow-spider-red backface-hidden flex flex-col justify-between items-center text-center group hover:border-spider-accent transition-colors">
                    {/* Top Level Bar */}
                    <div className="w-full flex justify-between items-center text-xs font-comic text-slate-400">
                      <span>POWER STATS</span>
                      <span className="text-spider-accent">LEVEL MAX ⚡</span>
                    </div>

                    {/* Big Icon */}
                    <div className="my-auto flex flex-col items-center">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-spider-red/20 to-spider-blue/20 border-2 border-black flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform shadow-inner">
                        {card.icon}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-comic text-white uppercase tracking-wide">
                        {card.title}
                      </h3>
                      <p className="text-sm font-comic text-spider-accent uppercase tracking-widest mt-1">
                        {card.powerName}
                      </p>
                    </div>

                    {/* Bottom Prompt */}
                    <div className="w-full pt-3 border-t border-slate-800 flex items-center justify-center gap-1 text-xs font-comic text-slate-400">
                      <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                      <span>TAP TO REVEAL STATS</span>
                    </div>
                  </div>

                    {/* BACK CARD */}
                    <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-b from-spider-red-dark via-spider-card to-spider-dark border-4 border-black p-6 shadow-comic shadow-spider-accent backface-hidden rotate-y-180 flex flex-col justify-between text-center">
                      <div className="flex items-center justify-between text-xs font-comic text-spider-accent border-b border-white/10 pb-2">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> ANALYSIS LOG
                        </span>
                        <span>{card.icon}</span>
                      </div>

                      <div className="my-auto space-y-4">
                        <h4 className="text-2xl sm:text-3xl font-comic text-spider-accent uppercase">
                          {card.title}
                        </h4>
                        <p className="font-body text-slate-100 text-lg sm:text-xl leading-relaxed">
                          "{card.description}"
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10 text-xs font-comic text-slate-400">
                        ❤️ CERTIFIED SUPERHERO POWER
                      </div>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
