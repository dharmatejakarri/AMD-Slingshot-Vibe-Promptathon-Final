import { Leaf, Zap, PiggyBank, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';

interface OnboardingProps {
  onNext: () => void;
  language: Language;
}

export default function Onboarding({ onNext, language }: OnboardingProps) {
  const t = translations[language];
  const goals = [
    {
      title: language === 'hi' ? 'स्वस्थ भोजन' : language === 'te' ? 'ఆరోగ్యకరమైన ఆహారం' : 'Eat Healthier',
      tag: 'Vitality',
      desc: language === 'hi' ? 'हर निवाले के पीछे के पोषक तत्वों की खोज करें।' : language === 'te' ? 'ప్రతి ముద్ద వెనుక ఉన్న పోషకాలను కనుగొనండి.' : 'Discover the nutrients behind every bite.',
      icon: Leaf,
      color: 'text-tertiary',
      bgColor: 'bg-tertiary/10',
      image: 'https://picsum.photos/seed/healthy/800/600',
      span: 'md:col-span-7',
    },
    {
      title: language === 'hi' ? 'ऊर्जा प्राप्त करें' : language === 'te' ? 'శక్తిని పొందండి' : 'Gain Energy',
      tag: 'Fuel',
      desc: language === 'hi' ? 'दोपहर की सुस्ती से बचें।' : language === 'te' ? 'మధ్యాహ్నం అలసటను నివారించండి.' : 'Avoid the afternoon slump.',
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      image: 'https://picsum.photos/seed/energy/800/600',
      span: 'md:col-span-5',
    },
    {
      title: language === 'hi' ? 'पैसे बचाएं' : language === 'te' ? 'డబ్బు ఆదా చేయండి' : 'Save Money',
      tag: 'Economy',
      desc: language === 'hi' ? 'बजट के अनुकूल खाना पकाने में महारत हासिल करें।' : language === 'te' ? 'బడ్జెట్ ఫ్రెండ్లీ వంటలో ప్రావీణ్యం పొందండి.' : 'Master budget-friendly cooking.',
      icon: PiggyBank,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      image: 'https://picsum.photos/seed/market/1200/400',
      span: 'md:col-span-12',
      horizontal: true,
    },
  ];

  return (
    <div className="pt-24 pb-40 px-5 md:px-12 max-w-7xl mx-auto">
      <motion.section 
        className="mb-10 md:mb-16 flex flex-col md:flex-row items-baseline gap-3 md:gap-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight text-on-surface leading-tight">
          {t.goalTitle.split('?')[0]}? <br/><span className="text-primary italic">{t.goalTitle.split(' ').pop()}</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-lg max-w-sm leading-relaxed">
          {t.goalSub}
        </p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 auto-rows-min">
        {goals.map((goal, idx) => {
          const Icon = goal.icon;
          return (
            <motion.button 
              key={idx}
              onClick={onNext}
              className={`${goal.span} group relative overflow-hidden rounded-[2rem] bg-surface-container-low text-left transition-transform duration-300 active:scale-[0.98] outline-none shadow-sm hover:shadow-md`}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {goal.horizontal ? (
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="w-full md:w-1/2 p-6 md:p-12 relative z-10 flex flex-col justify-center">
                     <div className="mb-3 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${goal.bgColor} flex items-center justify-center ${goal.color}`}>
                        <Icon className="w-5 h-5 fill-current" />
                      </div>
                      <span className={`${goal.bgColor} ${goal.color} text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full`}>{goal.tag}</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-headline font-bold text-on-surface mb-2">{goal.title}</h3>
                    <p className="text-on-surface-variant text-base max-w-lg">{goal.desc}</p>
                  </div>
                  <div className="w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={goal.image} alt={goal.title} referrerPolicy="no-referrer" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700 scale-105 group-hover:scale-110" src={goal.image} alt={goal.title} referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/20 to-transparent"></div>
                  </div>
                  <div className="relative z-10 p-6 md:p-10 h-full min-h-[280px] flex flex-col justify-end">
                    <div className="mb-3 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${goal.bgColor} flex items-center justify-center ${goal.color}`}>
                        <Icon className="w-5 h-5 fill-current" />
                      </div>
                      <span className={`${goal.bgColor} ${goal.color} text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full`}>{goal.tag}</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-headline font-bold text-on-surface mb-2">{goal.title}</h3>
                    <p className="text-on-surface-variant text-base">{goal.desc}</p>
                  </div>
                </>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 w-full p-6 flex justify-center pointer-events-none z-40">
        <div className="w-full max-w-md pointer-events-auto">
          <motion.button 
            onClick={onNext}
            className="saffron-gradient w-full h-14 rounded-2xl flex items-center justify-center gap-2.5 shadow-lg hover:scale-[1.02] active:scale-95 transition-all group"
            whileHover={{ y: -5 }}
          >
            <span className="text-white font-body font-bold text-base tracking-wide uppercase">Continue Journey</span>
            <ArrowRight className="text-white w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
