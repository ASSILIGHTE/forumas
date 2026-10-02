import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Zap, Heart, Star, Shield, Award } from 'lucide-react';
import { SiteConfig } from '../../config/siteConfig';
import { sfx } from '../../utils/soundEffects';

interface OurStoryProps {
  config: SiteConfig;
}

const COMIC_SOUND_EFFECTS = [
  { text: "THWIP! 🕸️", bg: "bg-spider-red text-white" },
  { text: "KAPOW! ⚡", bg: "bg-spider-accent text-black" },
  { text: "BAM! 💥", bg: "bg-spider-blue text-white" },
  { text: "LOVE! ❤️", bg: "bg-pink-600 text-white" },
];

export const OurStory: React.FC<OurStoryProps> = ({ config }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number | null>(null);

  const handleChapterClick = (idx: number) => {
    sfx.playWebShot();
    setActiveChapterIndex(activeChapterIndex === idx ? null : idx);
  };

  return (
    <section id="our-story" className="relative w-full py-20 px-4 sm:px-6 bg-spider-darker overflow-hidden border-t-4 border-black">
      {/* Spider-Man Comic Grid Background */}
      <div className="absolute inset-0 bg-halftone-dark opacity-35 pointer-events-none" />

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-spider-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-spider-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-spider-red/20 border border-spider-red text-spider-red-glow font-comic tracking-widest text-lg uppercase mb-3"
          >
            <BookOpen className="w-5 h-5 text-spider-red" />
            <span>ORIGIN CHRONICLES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-comic text-white tracking-wider uppercase text-glow-red"
          >
            OUR SPIDER STORY 📖
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 font-body max-w-xl mx-auto text-base sm:text-lg mt-2"
          >
            Setiap pahlawan punya cerita asal-usul legendaris. Klik panel komik di bawah untuk mendengar efek Spider-Sense! 🕸️
          </motion.p>
        </div>

        {/* Comic Timeline Panels */}
        <div className="relative border-l-4 border-spider-red/50 ml-4 sm:ml-12 pl-6 sm:pl-10 space-y-10 sm:space-y-12">
          {config.chapters.map((chapter, idx) => {
            const sfxTag = COMIC_SOUND_EFFECTS[idx % COMIC_SOUND_EFFECTS.length];
            const isSelected = activeChapterIndex === idx;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                onClick={() => handleChapterClick(idx)}
                className="relative group cursor-pointer"
              >
                {/* Spider Icon Node on Timeline */}
                <div className="absolute -left-[43px] sm:-left-[59px] top-6 w-10 h-10 sm:w-12 sm:h-12 bg-spider-card border-3 border-spider-red rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-comic shadow-spider-red group-hover:scale-125 transition-transform z-20">
                  {chapter.icon || '🕷️'}
                </div>

                {/* Comic Panel Box */}
                <div
                  className={`bg-spider-card rounded-3xl border-4 border-black p-6 sm:p-8 shadow-comic transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? 'shadow-spider-glow border-spider-accent scale-[1.02]'
                      : 'shadow-spider-red hover:shadow-blue-glow hover:-translate-y-1'
                  }`}
                >
                  {/* Top Bar strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-spider-red text-white font-comic text-xs uppercase rounded tracking-wider border border-black shadow-sm">
                        {chapter.chapterNum}
                      </span>
                      <span className="text-spider-accent font-comic text-sm tracking-wider uppercase flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        {chapter.subtitle}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 font-comic text-xs uppercase rounded border border-black shadow ${sfxTag.bg}`}>
                      {sfxTag.text}
                    </span>
                  </div>

                  {/* Main Comic Panel Grid (Pure Visual Comic Panel layout, no photo) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Left: Chapter Title & Quote */}
                    <div className="md:col-span-8 space-y-3">
                      <h3 className="text-2xl sm:text-4xl font-comic text-white tracking-wide uppercase drop-shadow">
                        {chapter.title}
                      </h3>
                      <div className="relative bg-black/70 p-4 sm:p-5 rounded-2xl border-2 border-black shadow-inner">
                        {/* Little comic tail */}
                        <div className="absolute -top-2 left-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black" />
                        <p className="text-lg sm:text-xl font-handwritten text-slate-100 leading-relaxed italic">
                          "{chapter.quote}"
                        </p>
                      </div>
                    </div>

                    {/* Right: Superhero Emblem Badge Panel */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-black via-slate-900 to-spider-card rounded-2xl border-3 border-black shadow-comic text-center group-hover:scale-105 transition-transform relative">
                      <div className="text-6xl sm:text-7xl mb-2 animate-bounce">
                        {chapter.icon || '🕷️'}
                      </div>
                      <span className="font-comic text-xs text-spider-accent uppercase tracking-widest bg-black/80 px-3 py-1 rounded-full border border-spider-accent/50">
                        SPIDEY ARCHIVE #{idx + 1}
                      </span>
                      <p className="font-comic text-[11px] text-slate-400 mt-2 uppercase">
                        TAP FOR SPIDER-SENSE 🕸️
                      </p>
                    </div>
                  </div>

                  {/* Corner Comic Stamp */}
                  <div className="absolute bottom-2 right-3 text-xs font-comic text-slate-500 uppercase tracking-widest pointer-events-none">
                    PAGE 0{idx + 1} • SPIDER-VERSE LOG
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

export default OurStory;
