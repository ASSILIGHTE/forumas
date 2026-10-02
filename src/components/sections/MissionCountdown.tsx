import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Clock, CheckCircle2, PartyPopper } from 'lucide-react';
import { sfx } from '../../utils/soundEffects';

interface MissionCountdownProps {
  targetDateStr: string;
}

export const MissionCountdown: React.FC<MissionCountdownProps> = ({ targetDateStr }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isCompleted: boolean;
  }>({ days: 0, hours: 12, minutes: 34, seconds: 56, isCompleted: false });

  const [forceComplete, setForceComplete] = useState<boolean>(false);

  const fireConfetti = () => {
    sfx.playCelebration();
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#E50914', '#0055FF', '#FFCC00']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#E50914', '#FFFFFF', '#FFCC00']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#E50914', '#0055FF']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    const calculateTime = () => {
      let target: Date;
      try {
        target = new Date(targetDateStr);
        if (isNaN(target.getTime())) {
          // Fallback date 2 hours from now if invalid string
          target = new Date(Date.now() + 2 * 60 * 60 * 1000);
        }
      } catch {
        target = new Date(Date.now() + 2 * 60 * 60 * 1000);
      }

      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0 || forceComplete) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr, forceComplete]);

  // Trigger celebration effect when mission is completed
  useEffect(() => {
    if (timeLeft.isCompleted) {
      fireConfetti();
    }
  }, [timeLeft.isCompleted]);

  return (
    <section id="countdown" className="relative w-full py-20 px-4 sm:px-6 bg-spider-dark border-y-4 border-black relative overflow-hidden">
      {/* Spider Web Center SVG Graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" className="w-[600px] h-[600px]">
          <path d="M250 0 L250 500 M0 250 L500 250 M70 70 L430 430 M70 430 L430 70" stroke="#E50914" strokeWidth="2" />
          <circle cx="250" cy="250" r="50" fill="none" stroke="#E50914" strokeWidth="2" />
          <circle cx="250" cy="250" r="100" fill="none" stroke="#E50914" strokeWidth="2" />
          <circle cx="250" cy="250" r="160" fill="none" stroke="#E50914" strokeWidth="2" />
          <circle cx="250" cy="250" r="220" fill="none" stroke="#E50914" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-spider-card border-2 border-spider-red text-white font-comic text-xl sm:text-2xl tracking-widest uppercase mb-8 shadow-comic"
        >
          <Clock className="w-6 h-6 text-spider-red animate-spin-slow" />
          <span>MISSION COUNTDOWN</span>
        </motion.div>

        {/* Countdown Box or Complete Status */}
        {timeLeft.isCompleted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-spider-red via-red-600 to-spider-blue border-4 border-black shadow-comic shadow-spider-red text-center"
          >
            <div className="flex justify-center mb-4">
              <PartyPopper className="w-16 h-16 text-spider-accent animate-bounce" />
            </div>
            <h3 className="text-4xl sm:text-7xl font-comic text-white tracking-wider uppercase drop-shadow-md mb-4">
              MISSION COMPLETE! 🎉
            </h3>
            <p className="text-xl sm:text-2xl text-slate-100 font-comic">
              Happy Boyfriend Day! Momen spesial khusus buat kamu dimulai sekarang! 🎉
            </p>
            <button
              onClick={fireConfetti}
              className="mt-6 px-6 py-3 bg-spider-accent text-black font-comic text-xl rounded-xl border-2 border-black shadow hover:scale-105 transition-transform"
            >
              SPIDER CONFETTI RE-TRIGGER 🕷️✨
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {/* Days */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-spider-card p-4 sm:p-6 rounded-2xl border-3 border-black shadow-comic shadow-spider-red flex flex-col items-center"
            >
              <span className="text-4xl sm:text-6xl font-comic text-spider-red tracking-wide drop-shadow">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-sm sm:text-base font-comic text-slate-400 tracking-wider uppercase mt-1">
                DAYS
              </span>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-spider-card p-4 sm:p-6 rounded-2xl border-3 border-black shadow-comic shadow-spider-blue flex flex-col items-center"
            >
              <span className="text-4xl sm:text-6xl font-comic text-spider-blue-glow tracking-wide drop-shadow">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-sm sm:text-base font-comic text-slate-400 tracking-wider uppercase mt-1">
                HOURS
              </span>
            </motion.div>

            {/* Minutes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-spider-card p-4 sm:p-6 rounded-2xl border-3 border-black shadow-comic shadow-spider-red flex flex-col items-center"
            >
              <span className="text-4xl sm:text-6xl font-comic text-spider-red tracking-wide drop-shadow">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-sm sm:text-base font-comic text-slate-400 tracking-wider uppercase mt-1">
                MINUTES
              </span>
            </motion.div>

            {/* Seconds */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-spider-card p-4 sm:p-6 rounded-2xl border-3 border-black shadow-comic shadow-spider-accent flex flex-col items-center"
            >
              <span className="text-4xl sm:text-6xl font-comic text-spider-accent tracking-wide drop-shadow animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-sm sm:text-base font-comic text-slate-400 tracking-wider uppercase mt-1">
                SECONDS
              </span>
            </motion.div>
          </div>
        )}

        {/* Optional Test Complete Trigger */}
        <div className="mt-8">
          <button
            onClick={() => {
              setForceComplete(!forceComplete);
              if (!forceComplete) fireConfetti();
            }}
            className="text-xs text-slate-400 hover:text-spider-accent underline tracking-wider font-comic"
          >
            {forceComplete ? "⚡ Reset Countdown Timer" : "⚡ Instant Celebration Preview (Trigger Countdown 0)"}
          </button>
        </div>
      </div>
    </section>
  );
};
