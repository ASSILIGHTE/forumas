import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadConfig, SiteConfig } from './config/siteConfig';
import { FloatingParticlesCanvas } from './components/ui/SpiderWebDecorations';
import { AudioPlayer } from './components/AudioPlayer';
import { OpeningScreen } from './components/sections/OpeningScreen';
import { HeroSection } from './components/sections/HeroSection';
import { MissionCountdown } from './components/sections/MissionCountdown';
import { OurStory } from './components/sections/OurStory';
import { SpiderArcade } from './components/sections/SpiderArcade';
import { YourSuperpowers } from './components/sections/YourSuperpowers';
import { InteractiveWeb } from './components/sections/InteractiveWeb';
import { FinalGift } from './components/sections/FinalGift';
import { BirthdayLetter } from './components/sections/BirthdayLetter';
import { FinalScene } from './components/sections/FinalScene';
import { CustomizerModal } from './components/CustomizerModal';

export function App() {
  const [config, setConfig] = useState<SiteConfig>(() => loadConfig());
  const [missionStarted, setMissionStarted] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleStartMission = () => {
    setMissionStarted(true);
    // Smooth scroll down to Hero Section
    setTimeout(() => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleUnlockFinalGift = () => {
    const giftEl = document.getElementById('final-gift');
    if (giftEl) {
      giftEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGiftOpened = () => {
    setTimeout(() => {
      const letterEl = document.getElementById('birthday-letter');
      if (letterEl) {
        letterEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1800);
  };

  return (
    <div className="relative min-h-screen bg-spider-darker text-slate-100 overflow-x-hidden selection:bg-spider-red selection:text-white">
      {/* Background Floating Embers / Spider Web Particles */}
      <FloatingParticlesCanvas />

      {/* Global Music & Audio Controls */}
      <AudioPlayer hideBanner={!missionStarted} />

      {/* Main Experience Flow */}
      {!missionStarted ? (
        <AnimatePresence>
          <motion.div
            key="opening"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
            transition={{ duration: 0.8 }}
          >
            <OpeningScreen onStartMission={handleStartMission} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* Section 1: Hero Section */}
          <HeroSection config={config} />

          {/* Section 2: Mission Countdown */}
          <MissionCountdown targetDateStr={config.birthdayDate} />

          {/* Section 3: Our Story */}
          <OurStory config={config} />

          {/* Section 4: Spider Arcade Minigames (Replaces photo memories) */}
          <SpiderArcade config={config} />

          {/* Section 5: Your Superpowers */}
          <YourSuperpowers config={config} />

          {/* Section 6: Interactive Web Heart Search */}
          <InteractiveWeb config={config} onUnlockFinalGift={handleUnlockFinalGift} />

          {/* Section 7: Final Gift */}
          <FinalGift config={config} onGiftOpened={handleGiftOpened} />

          {/* Section 8: Birthday Letter */}
          <BirthdayLetter config={config} />

          {/* Section 9: Final Scene & Rooftop Silhouette */}
          <FinalScene config={config} onOpenSettings={() => setIsSettingsOpen(true)} />
        </motion.div>
      )}

      {/* Data Customizer Modal */}
      <CustomizerModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSave={(newCfg) => setConfig(newCfg)}
      />
    </div>
  );
}

export default App;

