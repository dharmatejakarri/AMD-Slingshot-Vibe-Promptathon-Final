import { Camera, Plus, Minus, Move, Dumbbell, Activity, CheckCircle2, ChevronRight, BarChartHorizontal, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { analyzeMeal, MealAnalysis } from '../services/geminiService';
import { Language, translations } from '../lib/translations';

interface LogMealProps {
  onAnalyze: (result: MealAnalysis) => void;
  language: Language;
}

export default function LogMeal({ onAnalyze, language }: LogMealProps) {
  const t = translations[language];
  const [quantities, setQuantities] = useState({ rice: 1.5, dal: 1 });
  const [activity, setActivity] = useState<'run' | 'walk' | 'gym'>('walk');
  const [mealText, setMealText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateQty = (key: 'rice' | 'dal', delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [key]: Math.max(0, parseFloat((prev[key] + delta).toFixed(1)))
    }));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const textForAI = mealText || `Meal with ${quantities.rice} portion of rice and ${quantities.dal} portion of dal. User just finished ${activity}.`;
      const result = await analyzeMeal(textForAI);
      onAnalyze(result);
    } catch (err) {
      console.error(err);
      // Fallback result for demo if AI fails
      onAnalyze({
        title: "Balanced Indian Thali",
        calories: 680,
        score: 82,
        nutrients: [{label: 'Carbs', val: '50%', color: 'bg-primary'}, {label: 'Protein', val: '25%', color: 'bg-tertiary'}],
        activityInsight: "Perfect post-workout fuel.",
        swaps: []
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const ingredients = ['Idli', 'Dosa', 'Sambar', 'Coconut Chutney', 'Paneer Tikka'];

  return (
    <div className="pt-20 pb-40 px-5 max-w-2xl mx-auto space-y-6">
      {/* Log Meal Card */}
      <motion.section 
        className="bg-surface-container rounded-3xl p-6 space-y-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header>
          <h2 className="font-headline font-bold text-2xl tracking-tight text-on-surface">{t.logMealTitle}</h2>
          <p className="text-on-surface-variant text-sm mt-1">{t.logMealSub}</p>
        </header>

        {/* Text Input for Demo */}
        <div className="space-y-1.5">
          <label className="font-label text-[9px] font-bold uppercase tracking-[0.1em] text-on-surface-variant block ml-1 text-center">{t.whatAreYouEating}</label>
          <input 
            type="text" 
            placeholder={t.mealPlaceholder}
            value={mealText}
            onChange={(e) => setMealText(e.target.value)}
            className="w-full h-12 px-5 bg-white rounded-2xl outline-none border border-on-surface/5 focus:border-primary/20 transition-all font-body text-on-surface text-sm shadow-sm"
          />
        </div>

        {/* Upload Area */}
        <div className="relative group cursor-pointer aspect-[16/9] rounded-2xl overflow-hidden atelier-glass border-2 border-dashed border-on-surface-variant/20 flex flex-col items-center justify-center transition-all hover:bg-white/50">
          <div className="absolute inset-0 z-0 opacity-10">
            <img 
              className="w-full h-full object-cover blur-[2px]" 
              src="https://picsum.photos/seed/thali-meal/800/500" 
              alt="Meal shadow"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center p-4 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 transition-transform group-hover:scale-110">
              <Camera className="text-primary w-7 h-7" />
            </div>
            <p className="font-headline font-bold text-base text-primary">{t.uploadPhoto}</p>
            <p className="text-on-surface-variant text-[11px] mt-0.5">{t.uploadSub}</p>
          </div>
        </div>

        {/* Quick Add Chips */}
        <div className="space-y-3">
          <p className="font-body text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">{t.commonIngredients}</p>
          <div className="flex flex-wrap gap-1.5">
            {ingredients.map(item => (
              <button 
                key={item} 
                className="px-4 py-2 rounded-full bg-surface text-on-surface hover:bg-primary hover:text-white transition-all text-xs font-semibold border border-on-surface/5"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selectors */}
        <div className="space-y-3">
          <p className="font-body text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">{t.volumeTitle}</p>
          <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm border border-on-surface/5">
            <div className="flex items-center justify-between">
              <span className="font-headline font-bold text-sm text-on-surface">Rice Portion</span>
              <div className="flex items-center bg-surface-container rounded-xl p-1 gap-1 scale-90 origin-right">
                <button 
                  onClick={() => updateQty('rice', -0.5)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-surface-container-high text-on-surface active:scale-90 transition-transform"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm">{quantities.rice}</span>
                <button 
                   onClick={() => updateQty('rice', 0.5)}
                   className="w-9 h-9 rounded-lg flex items-center justify-center saffron-gradient text-white active:scale-90 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-headline font-bold text-sm text-on-surface">Dal/Lentils</span>
              <div className="flex items-center bg-surface-container rounded-xl p-1 gap-1 scale-90 origin-right">
                <button 
                  onClick={() => updateQty('dal', -0.5)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-surface-container-high text-on-surface active:scale-90 transition-transform"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm">{quantities.dal}</span>
                <button 
                  onClick={() => updateQty('dal', 0.5)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center saffron-gradient text-white active:scale-90 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Movement Section */}
      <motion.section 
        className="bg-surface-container-high rounded-3xl p-6 space-y-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <header>
          <h2 className="font-headline font-bold text-2xl tracking-tight text-on-surface">{t.movementTitle}</h2>
          <p className="text-on-surface-variant text-sm mt-1">{t.movementSub}</p>
        </header>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'run', label: 'Run', icon: Move },
            { id: 'walk', label: 'Walk', icon: Activity },
            { id: 'gym', label: 'Gym', icon: Dumbbell },
          ].map((act) => (
            <button 
              key={act.id}
              onClick={() => setActivity(act.id as any)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 border-2 ${
                activity === act.id ? 'border-primary bg-white shadow-sm' : 'border-transparent bg-white/40'
              }`}
            >
              <act.icon className={`w-7 h-7 ${activity === act.id ? 'text-primary' : 'text-on-surface-variant'}`} />
              <span className={`font-label text-[9px] font-bold uppercase tracking-widest ${activity === act.id ? 'text-primary' : 'text-on-surface-variant'}`}>{act.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="flex-1 space-y-1.5">
            <label className="font-label text-[9px] font-bold uppercase tracking-[0.1em] text-on-surface-variant block ml-1 text-center">Min</label>
            <div className="bg-white rounded-xl p-3 font-headline font-bold text-base text-on-surface text-center shadow-inner">45</div>
          </div>
          <div className="flex-1 space-y-1.5">
            <label className="font-label text-[9px] font-bold uppercase tracking-[0.1em] text-on-surface-variant block ml-1 text-center">Intensity</label>
            <div className="bg-white rounded-xl p-3 font-headline font-bold text-base text-on-surface text-center shadow-inner">Avg</div>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <div className="pt-2 pb-10">
        <motion.button 
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className={`w-full h-16 saffron-gradient rounded-2xl shadow-[0_15px_30px_-5px_rgba(114,54,0,0.2)] flex items-center justify-center gap-3 transition-transform active:scale-[0.98] hover:scale-[1.01] ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
          whileHover={{ y: -4 }}
        >
          {isAnalyzing ? <Loader2 className="text-white w-5 h-5 animate-spin" /> : <BarChartHorizontal className="text-white w-5 h-5" />}
          <span className="text-white font-bold text-lg font-headline tracking-tight">
            {isAnalyzing ? t.analyzing : t.analyzeBtn}
          </span>
        </motion.button>
        <p className="text-center text-on-surface-variant text-[11px] mt-4 flex items-center justify-center gap-1.5 opacity-60">
          <CheckCircle2 className="text-tertiary w-3.5 h-3.5 fill-current" />
          <span className="font-medium">Nutrient-Scan 4.0 Deep Intelligence</span>
        </p>
      </div>
    </div>
  );
}
