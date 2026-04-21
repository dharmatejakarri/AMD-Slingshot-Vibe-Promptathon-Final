import { Search, ArrowRight, Zap, Leaf, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Language, translations } from '../lib/translations';

interface HistoryItem {
  title: string;
  date: string;
  calories: number;
  score: number;
  img: string;
}

interface HistoryProps {
  language: Language;
}

export default function History({ language }: HistoryProps) {
  const t = translations[language];
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/history')
      .then(res => res.json())
      .then(data => {
        setHistoryItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // For UI variety in the demo, we generate groups
  const historyGroups = historyItems.length > 0 ? [
    {
      group: t.historyTitle,
      date: t.historySub,
      meals: historyItems.map(item => ({
        title: item.title,
        time: 'Logged',
        img: item.img,
        tags: [
          { label: 'Nutrient Rich', color: 'bg-tertiary/10 text-tertiary', icon: Leaf },
          { label: `${item.calories} kcal`, color: 'bg-primary/10 text-primary', icon: Zap }
        ],
        ingredients: 'Analyzed by AI'
      }))
    }
  ] : [];

  if (loading) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="font-headline font-bold text-on-surface-variant opacity-60">Loading History...</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-40 px-5 max-w-3xl mx-auto overflow-x-hidden">
      {/* Search Bar */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4 pointer-events-none" />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            className="w-full h-12 pl-11 pr-4 bg-surface-container-high rounded-2xl outline-none border border-transparent focus:bg-white focus:border-primary/20 transition-all font-body text-xs text-on-surface shadow-sm"
          />
        </div>
      </motion.div>

      {/* History timeline */}
      <div className="space-y-12">
        {historyGroups.length > 0 ? (
          historyGroups.map((section, sIdx) => (
            <section key={sIdx}>
              <div className="mb-6 ml-2">
                <h2 className="font-headline font-extrabold text-2xl tracking-tight text-primary">{section.group}</h2>
                <p className="font-body text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-widest mt-0.5">{section.date}</p>
              </div>

              <div className="space-y-6">
                {section.meals.map((meal, mIdx) => (
                  <motion.div 
                    key={mIdx}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-sm flex flex-col sm:flex-row group cursor-pointer border border-on-surface/5"
                    whileHover={{ y: -3 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: mIdx * 0.1 + sIdx * 0.2 }}
                  >
                    <div className="w-full sm:w-40 aspect-[16/9] sm:aspect-square relative overflow-hidden">
                      <img 
                        src={meal.img} 
                        alt={meal.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors leading-tight">{meal.title}</h3>
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-40">{meal.time}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {meal.tags.map((tag, tIdx) => {
                            const Icon = tag.icon;
                            return (
                              <span key={tIdx} className={`px-3 py-1 rounded-full ${tag.color} text-[9px] font-bold uppercase tracking-wider flex items-center gap-1`}>
                                <Icon className="w-3 h-3" />
                                {tag.label}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-on-surface/5 pt-3">
                        <span className="font-body text-[11px] text-on-surface-variant italic font-medium opacity-60 truncate max-w-[140px]">{meal.ingredients}</span>
                        <button className="text-primary font-bold flex items-center gap-1.5 group/btn">
                          <span className="text-[10px] uppercase tracking-widest leading-none">Insights</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="flex flex-col items-center py-20 text-center opacity-40">
            <Leaf className="w-12 h-12 mb-4" />
            <p className="font-headline font-bold text-lg">No history found</p>
            <p className="text-xs">Log your first meal to see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
