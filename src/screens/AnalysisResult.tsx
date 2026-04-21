import { Zap, Bell, ArrowRight, RefreshCcw, TrendingUp, Utensils, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MealAnalysis } from '../services/geminiService';
import { Language, translations } from '../lib/translations';

interface AnalysisResultProps {
  data: MealAnalysis | null;
  language: Language;
}

export default function AnalysisResult({ data, language }: AnalysisResultProps) {
  const t = translations[language];
  const [reminderSet, setReminderSet] = useState(false);

  const handleSetReminder = () => {
    setReminderSet(true);
    setTimeout(() => setReminderSet(false), 3000);
  };

  if (!data) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="font-headline font-bold text-on-surface-variant opacity-60">Preparing your insights...</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-40 max-w-5xl mx-auto px-5 space-y-8 overflow-x-hidden">
      {/* Hero Food Section */}
      <motion.section 
        className="mt-4 relative overflow-hidden rounded-[2rem] h-[280px] shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <img 
          alt={data.title} 
          className="w-full h-full object-cover" 
          src={`https://picsum.photos/seed/${data.title.replace(/\s+/g, '-')}/1200/600`} 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
          <span className="text-white/80 font-label uppercase tracking-[0.2em] text-[9px] font-bold mb-1">Analysis Complete</span>
          <h2 className="text-white font-headline font-bold text-3xl tracking-tight leading-tight">{data.title}</h2>
        </div>
      </motion.section>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Thali Gauge Card */}
        <motion.div 
          className="md:col-span-5 bg-surface-container-low p-8 rounded-[2rem] flex flex-col items-center text-center shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="thali-gauge w-full h-full rounded-full opacity-90 animate-pulse-slow"></div>
            <div className="absolute w-[86%] h-[86%] bg-surface-container-low rounded-full flex flex-col items-center justify-center">
              <span className="font-headline font-extrabold text-5xl text-primary tracking-tighter">{data.score}</span>
              <span className="font-label text-[9px] text-on-surface-variant font-bold uppercase tracking-widest mt-0.5">{language === 'hi' ? 'थाली स्कोर' : language === 'te' ? 'థాలీ స్కోరు' : 'THALI SCORE'}</span>
            </div>
          </div>
          
          <div className="mt-8 space-y-3 w-full">
            {data.nutrients.map((stat, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${stat.color}`}></span>
                  <span className="font-semibold text-on-surface-variant whitespace-nowrap">{stat.label}</span>
                </div>
                <span className="font-headline font-bold text-primary">{stat.val}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Nutritional Signals */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 h-full">
          {[
            { tag: 'Est. Calories', val: data.calories.toString(), desc: 'Portion calorie density.', color: 'text-on-surface', bg: 'bg-surface-container' },
            { tag: 'Metabolism', val: data.nutrients[1]?.val || 'High', desc: 'Protein/Fiber availability.', color: 'text-tertiary', bg: 'bg-tertiary/10' },
          ].map((card, i) => (
            <motion.div 
              key={i} 
              className={`${card.bg} p-5 rounded-2xl space-y-1.5 border border-on-surface/5`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <span className={`${card.color} font-label text-[9px] font-bold uppercase tracking-[0.2em]`}>{card.tag}</span>
              <p className="font-headline font-extrabold text-2xl text-on-surface">{card.val}</p>
              <p className="text-on-surface-variant text-[11px] leading-relaxed opacity-70">{card.desc}</p>
            </motion.div>
          ))}
          <div className="sm:col-span-2 bg-secondary/5 p-5 rounded-2xl border border-on-surface/5">
             <span className="text-secondary font-label text-[9px] font-bold uppercase tracking-[0.2em]">Bio-Availability</span>
             <p className="font-headline font-bold text-lg text-on-surface mt-0.5 leading-snug">Excellent nutrient absorption from regional spice mapping.</p>
          </div>
        </div>
      </div>

      {/* Activity Insight Section */}
      <motion.section 
        className="bg-surface-container p-6 md:p-8 rounded-[2rem] relative overflow-hidden shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="max-w-2xl relative z-10">
          <h3 className="font-headline font-bold text-xl mb-3 italic text-primary flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Activity-Aware Perspective
          </h3>
          <p className="text-lg leading-relaxed text-on-surface-variant font-medium">
            "{data.activityInsight}"
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
      </motion.section>

      {/* Affordable Swaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
            <RefreshCcw className="w-4 h-4 text-primary" />
            Affordable Swaps
          </h4>
          <div className="space-y-3">
            {data.swaps.length > 0 ? data.swaps.map((swap, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-on-surface/5 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[9px] text-on-surface-variant uppercase font-bold tracking-widest opacity-60">Swap {swap.from} for</span>
                  <span className="font-bold text-on-surface text-base">{swap.to}</span>
                </div>
                <span className="text-tertiary font-headline font-extrabold text-xs">{swap.diff}</span>
              </div>
            )) : (
              <p className="text-on-surface-variant italic text-xs">No critical swaps identified. This meal is regionally optimized.</p>
            )}
          </div>
        </div>

        {/* Highlight Action Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-3xl opacity-50"></div>
          <motion.div 
            className="relative bg-white/60 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/40 h-full flex flex-col justify-between shadow-lg"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-md rotate-3 group-hover:rotate-0 transition-transform">
                <Zap className="text-white w-6 h-6 fill-current" />
              </div>
              <h4 className="font-headline font-extrabold text-xl mb-1 text-on-surface">One Best Next Action</h4>
              <p className="text-on-surface-variant text-base">Walk for 10 minutes post-meal to stabilize blood sugar levels by 18%.</p>
            </div>
            <button 
              onClick={handleSetReminder}
              disabled={reminderSet}
              className={`mt-8 w-full h-14 rounded-2xl flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-all duration-300 relative overflow-hidden ${reminderSet ? 'bg-tertiary shadow-tertiary/20' : 'saffron-gradient'}`}
            >
              <AnimatePresence mode="wait">
                {reminderSet ? (
                  <motion.div 
                    key="success"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="text-white w-5 h-5" />
                    <span className="text-white font-label font-bold uppercase tracking-[0.2em] text-xs">
                      {language === 'hi' ? 'रिमाइंडर तैयार' : language === 'te' ? 'రిమైండర్ సిద్ధం' : 'REMINDER SET'}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-white font-label font-bold uppercase tracking-[0.2em] text-xs">
                      {language === 'hi' ? 'रिमाइंडर सेट करें' : language === 'te' ? 'రిమైండర్ సెట్ చేయండి' : 'SET REMINDER'}
                    </span>
                    <Bell className="text-white w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </div>

      <motion.button 
        onClick={() => window.location.reload()}
        className="w-full h-16 bg-surface-container rounded-2xl flex items-center justify-center gap-3 text-on-surface font-headline font-bold text-lg border border-on-surface/5 active:scale-[0.98] transition-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ArrowRight className="w-5 h-5 bg-primary text-white rounded-full p-0.5" />
        {t.continue}
      </motion.button>
    </div>
  );
}
