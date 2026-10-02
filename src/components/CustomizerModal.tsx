import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw, Sparkles } from 'lucide-react';
import { SiteConfig, defaultConfig, saveConfig } from '../config/siteConfig';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSave: (newConfig: SiteConfig) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<SiteConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<'basic' | 'letter' | 'photos'>('basic');

  if (!isOpen) return null;

  const handleSave = () => {
    saveConfig(formData);
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm("Reset configuration back to Spider-Man defaults?")) {
      saveConfig(defaultConfig);
      onSave(defaultConfig);
      setFormData(defaultConfig);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-2xl w-full bg-spider-card rounded-3xl border-4 border-black p-6 shadow-comic shadow-spider-red text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2 font-comic text-2xl text-spider-accent uppercase tracking-wider">
              <Sparkles className="w-6 h-6 text-spider-red" />
              <span>CUSTOMIZE SURPRISE DATA ⚙️</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-4 py-2 rounded-xl font-comic text-sm uppercase tracking-wider transition-colors ${
                activeTab === 'basic'
                  ? 'bg-spider-red text-white border border-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Basic Info 🕷️
            </button>
            <button
              onClick={() => setActiveTab('letter')}
              className={`px-4 py-2 rounded-xl font-comic text-sm uppercase tracking-wider transition-colors ${
                activeTab === 'letter'
                  ? 'bg-spider-red text-white border border-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Love Letter 💌
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-2 rounded-xl font-comic text-sm uppercase tracking-wider transition-colors ${
                activeTab === 'photos'
                  ? 'bg-spider-red text-white border border-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Arcade & Photo Settings 🎮
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 font-body">
            {activeTab === 'basic' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-comic text-slate-400 uppercase mb-1">
                      YOUR NAME (YOUR_NAME)
                    </label>
                    <input
                      type="text"
                      value={formData.yourName}
                      onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-spider-red focus:outline-none font-comic text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-comic text-slate-400 uppercase mb-1">
                      PARTNER NAME (PARTNER_NAME)
                    </label>
                    <input
                      type="text"
                      value={formData.partnerName}
                      onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-spider-red focus:outline-none font-comic text-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-comic text-slate-400 uppercase mb-1">
                      BIRTHDAY DATE (BIRTHDAY_DATE)
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.birthdayDate.slice(0, 16)}
                      onChange={(e) => setFormData({ ...formData, birthdayDate: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-spider-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-comic text-slate-400 uppercase mb-1">
                      ANNIVERSARY DATE (ANNIVERSARY_DATE)
                    </label>
                    <input
                      type="date"
                      value={formData.anniversaryDate}
                      onChange={(e) => setFormData({ ...formData, anniversaryDate: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-spider-red focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-comic text-slate-400 uppercase mb-1">
                    HERO HEADLINE
                  </label>
                  <input
                    type="text"
                    value={formData.heroHeadline}
                    onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-comic text-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-comic text-slate-400 uppercase mb-1">
                    HERO SUBHEADLINE
                  </label>
                  <textarea
                    rows={2}
                    value={formData.heroSubheadline}
                    onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                  />
                </div>
              </>
            )}

            {activeTab === 'letter' && (
              <div>
                <label className="block text-xs font-comic text-slate-400 uppercase mb-2">
                  LOVE LETTER CONTENT (Each paragraph on a new line)
                </label>
                <textarea
                  rows={10}
                  value={formData.letterContent.join("\n\n")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      letterContent: e.target.value.split("\n\n").filter(Boolean)
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-body text-base leading-relaxed"
                />
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Secara default, aplikasi menggunakan <strong>Spider-Man Interactive Minigames Hub 🎮</strong> tanpa memerlukan foto. Namun jika nanti punya foto, kamu bisa memasukkan URL foto di sini (Opsional):
                </p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <label className="block text-xs font-comic text-spider-accent uppercase">HERO MAIN IMAGE (OPSIONAL)</label>
                  <input
                    type="text"
                    value={formData.heroImage}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    placeholder="Cosplay / Photo URL"
                    className="w-full bg-black border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between border-t-2 border-slate-800 pt-4 mt-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 font-comic text-xs uppercase"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Defaults
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-spider-red text-white font-comic text-lg uppercase border border-black shadow-comic shadow-spider-red hover:bg-spider-red-dark transition-all"
            >
              <Save className="w-5 h-5" />
              Save Surprise Data ❤️
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
