import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { SiteConfig } from '../../config/siteConfig';
import { sfx } from '../../utils/soundEffects';

interface FinalGiftProps {
  config: SiteConfig;
  onGiftOpened: () => void;
}

export const FinalGift: React.FC<FinalGiftProps> = ({ config, onGiftOpened }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);

  const triggerOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    sfx.playWebShot();

    // Cinematic delay with dark transition & sound
    setTimeout(() => {
      sfx.playCelebration();
      setIsOpen(true);
      setIsOpening(false);
      onGiftOpened();

      // Confetti burst
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E50914', '#0055FF', '#FFCC00', '#FFFFFF']
      });
    }, 1200);
  };

  return (
    <section id="final-gift" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-gradient-to-b from-spider-darker via-spider-dark to-spider-darker flex flex-col items-center justify-center border-t-4 border-black overflow-hidden">
      {/* Dark Overlay Flash during Opening */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 2], rotate: [0, 180, 360] }}
              transition={{ duration: 1.2 }}
              className="text-8xl mb-6"
            >
              🕷️
            </motion.div>
            <h2 className="text-4xl sm:text-6xl font-comic text-spider-red uppercase text-glow-red">
              OPENING THE SPIDER SURPRISE...
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-spider-red/20 border-2 border-spider-red text-spider-red-glow font-comic text-xl tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-6 h-6 text-spider-accent animate-spin-slow" />
          <span>ONE LAST SURPRISE…</span>
        </motion.div>

        {!isOpen ? (
          /* Gift Box Locked View */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Gift Box Graphic with Spider Web */}
            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 my-8 cursor-pointer group"
              onClick={triggerOpen}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-spider-red to-spider-red-dark rounded-3xl border-4 border-black shadow-comic shadow-spider-red flex items-center justify-center group-hover:shadow-spider-glow transition-all duration-300">
                {/* Ribbon Overlay */}
                <div className="absolute inset-y-0 w-16 bg-spider-accent border-x-2 border-black" />
                <div className="absolute inset-x-0 h-16 bg-spider-accent border-y-2 border-black" />

                {/* Center Web Badge */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-black border-4 border-spider-accent flex items-center justify-center text-5xl shadow-lg">
                  🎁
                </div>
              </div>

              {/* Spider Web corners on gift box */}
              <div className="absolute -top-4 -left-4 text-4xl">🕸️</div>
              <div className="absolute -bottom-4 -right-4 text-4xl">🕷️</div>
            </motion.div>

            {/* Open CTA Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerOpen}
              className="mt-6 px-10 py-5 bg-gradient-to-r from-spider-red via-red-600 to-spider-red-dark text-white font-comic text-3xl sm:text-4xl tracking-wider uppercase rounded-2xl border-4 border-black shadow-comic shadow-spider-red hover:shadow-spider-glow transition-all cursor-pointer"
            >
              OPEN THE GIFT 🕷️
            </motion.button>
          </motion.div>
        ) : (
          /* Opened Gift Revealed View */
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="bg-spider-card p-8 sm:p-12 rounded-3xl border-4 border-black shadow-comic shadow-spider-red flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-spider-red/20 border-2 border-spider-red flex items-center justify-center text-4xl mb-4">
              <Heart className="w-10 h-10 text-spider-red fill-spider-red animate-pulse" />
            </div>

            <h1 className="text-4xl sm:text-7xl font-comic text-white uppercase text-glow-red tracking-wider mb-4 leading-tight">
              HAPPY BOYFRIEND DAY, {config.partnerName} ❤️
            </h1>

            <p className="text-xl sm:text-3xl text-spider-accent font-comic tracking-wide max-w-2xl leading-relaxed">
              "Kamu bukan cuma pacar favoritku, tapi juga bagian paling bikin bahagia di setiap hariku."
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
