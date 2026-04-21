import { TrendingUp, Lightbulb, AlertTriangle, Moon, ArrowRight, Leaf, Droplets, Utensils, Pill, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Language, translations } from '../lib/translations';

interface InsightData {
  vitalityScore: number;
  patterns: string[];
}

interface InsightsProps {
  language: Language;
}

export default function Insights({ language }: InsightsProps) {
  const t = translations[language];
  const [data, setData] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/insights')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const suggestions = [
    { label: 'Increase leafy greens', icon: Leaf, color: 'text-tertiary' },
    { label: 'Hydration target: 500ml', icon: Droplets, color: 'text-secondary' },
    { label: 'Swap white rice for millet', icon: Utensils, color: 'text-primary' },
    { label: 'Daily Vitamin D check', icon: Pill, color: 'text-primary' },
  ];

  const [planning, setPlanning] = useState(false);

  const handleHelpPlan = () => {
    setPlanning(true);
    setTimeout(() => setPlanning(false), 2500);
  };

  if (loading) return null;

  return (
    <div className="pt-20 pb-40 px-5 max-w-7xl mx-auto overflow-x-hidden">
      {/* Header */}
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="font-headline font-extrabold text-4xl tracking-tight text-primary mb-1">{t.insightsTitle}</h2>
        <p className="text-on-surface-variant font-semibold text-base">{t.insightsSub}</p>
      </motion.section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Weekly Snapshot Card */}
        <motion.div 
          className="md:col-span-8 lg:col-span-7 bg-white rounded-[2rem] p-7 flex flex-col justify-between shadow-xl border border-on-surface/5 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex gap-3 relative z-10">
            <div className="w-1 h-12 saffron-gradient rounded-full"></div>
            <div>
              <span className="text-[9px] font-label uppercase tracking-[0.2em] text-on-surface-variant font-extrabold">{t.snapshot}</span>
              <h3 className="font-headline font-bold text-2xl text-on-surface mt-0.5">{t.holistic}</h3>
            </div>
          </div>

          <div className="relative flex items-center justify-center py-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle className="text-surface-container" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="8"></circle>
                <circle 
                  cx="50" cy="50" fill="none" r="45" 
                  stroke="url(#snapGrad)" 
                  strokeWidth="8" 
                  strokeDasharray="210 282" 
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                ></circle>
                <defs>
                  <linearGradient id="snapGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#964900' }}></stop>
                    <stop offset="100%" style={{ stopColor: '#723600' }}></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-headline font-extrabold text-6xl text-primary tracking-tighter">{data?.vitalityScore}</span>
                <span className="font-label uppercase tracking-[0.3em] text-on-surface-variant font-extrabold text-[8px]">Optimal</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 relative z-10">
            <span className="px-4 py-2 bg-tertiary text-white rounded-full font-label text-[8px] font-bold uppercase tracking-widest">High Vitality</span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-label text-[8px] font-bold uppercase tracking-widest border border-primary/20">Balanced Protein</span>
          </div>
        </motion.div>

        {/* Vitality Metrics */}
        <div className="md:col-span-4 lg:col-span-5 flex flex-col gap-6">
           <motion.div 
            className="bg-surface-container-low p-8 rounded-[2rem] flex-1 shadow-sm border border-on-surface/5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-headline font-extrabold text-xl mb-6">Vitality Metrics</h4>
            <div className="space-y-8">
              {[
                { label: 'Energy Vitality', val: '72%', color: 'saffron-gradient', width: '72%' },
                { label: 'Caloric Intake', val: '1,420', sub: '/ 2,1k', color: 'bg-secondary', width: '65%' },
                { label: 'Metabolic Pace', val: 'Steady', color: 'bg-tertiary', width: '90%' },
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-label font-extrabold text-on-surface-variant uppercase tracking-[0.2em] text-[8px]">{m.label}</span>
                    <span className="font-headline font-extrabold text-2xl text-on-surface">
                      {m.val} {m.sub && <span className="text-xs font-normal opacity-40">{m.sub}</span>}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${m.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: m.width }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Saffron Logic Pill */}
          <motion.div 
            className="saffron-gradient text-white p-6 rounded-[2rem] shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 shrink-0" />
              <div>
                <h4 className="font-headline font-bold text-lg mb-1 italic">Afternoon Insight</h4>
                <p className="font-body text-white/80 leading-relaxed text-xs">Add probiotic curd to increase score by +8 points.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <section className="mb-16">
        <h4 className="font-headline font-extrabold text-3xl text-on-surface mb-6 tracking-tight">{t.patternTitle}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-surface-container-high rounded-[2rem] p-8 flex flex-col gap-6 shadow-sm"
            whileHover={{ y: -3 }}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-[8px] font-label uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">Observation</span>
            </div>
            <div>
              <h5 className="font-headline font-extrabold text-2xl mb-2 leading-tight">Protein Deficit</h5>
              <p className="text-on-surface-variant text-base leading-relaxed">Your lunches lack primary protein, correlating with 4:00 PM energy dips.</p>
            </div>
            <div className="pt-4 border-t border-on-surface/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[11px] font-bold text-on-surface opacity-80">Try 100g of paneer or sprouts.</span>
            </div>
          </motion.div>

          <motion.div 
            className="bg-surface-container-low rounded-[2rem] p-8 flex flex-col gap-6 shadow-sm md:translate-y-4"
            whileHover={{ y: -3 }}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Moon className="w-6 h-6" />
              </div>
              <span className="text-[8px] font-label uppercase font-extrabold tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">Sleep</span>
            </div>
            <div>
              <h5 className="font-headline font-extrabold text-2xl mb-2 leading-tight">Late Evening Load</h5>
              <p className="text-on-surface-variant text-base leading-relaxed">Dinner density is 40% higher than average. Lowering it improves morning clarity.</p>
            </div>
            <div className="h-1.5 w-full bg-on-surface/5 rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-3/4 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Action */}
      <motion.section 
        className="mt-16 mb-8 relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-xl group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <img 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          src="https://picsum.photos/seed/fresh-vegetables/1600/600" 
          alt="Recalibrate"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/40 to-transparent"></div>
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-headline font-extrabold text-3xl md:text-4xl text-white mb-4 leading-tight">{t.recalibrateTitle}</h3>
            <p className="text-white/80 text-base font-medium leading-relaxed">{t.recalibrateSub}</p>
          </div>
          <button 
            onClick={handleHelpPlan}
            disabled={planning}
            className="h-14 px-8 saffron-gradient text-white rounded-2xl font-extrabold font-label uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2.5 shrink-0 whitespace-nowrap min-w-[200px]"
          >
            {planning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t.analyzing}
              </>
            ) : (
              <>
                {t.planBtn}
                <ArrowRight className="w-5 h-5 border-2 border-white/20 rounded-full p-0.5" />
              </>
            )}
          </button>
        </div>
      </motion.section>

      {/* Suggestions */}
      <section className="mb-20">
        <h4 className="font-label font-extrabold text-on-surface-variant uppercase tracking-[0.2em] text-[8px] mb-6">Top Suggestions</h4>
        <div className="flex flex-wrap gap-3">
          {suggestions.map((s, i) => (
            <motion.button 
              key={i}
              className="group flex items-center gap-3 bg-surface-container-high px-6 py-4 rounded-full transition-all hover:bg-white active:scale-95 shadow-sm hover:shadow-md border border-on-surface/5"
              whileHover={{ scale: 1.02 }}
            >
              <s.icon className={`${s.color} w-5 h-5 group-hover:scale-110 transition-transform`} />
              <span className="font-body font-bold text-on-surface text-sm">{s.label}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
