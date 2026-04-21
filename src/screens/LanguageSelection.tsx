import { Languages, Globe, BookOpen, Bolt, Zap, Utensils } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../lib/translations';

interface LanguageSelectionProps {
  onSelect: (lang: Language) => void;
}

export default function LanguageSelection({ onSelect }: LanguageSelectionProps) {
  return (
    <div className="pt-8 pb-12 min-h-screen flex flex-col items-center px-6 bg-surface">
      {/* Header Logo Area */}
      <div className="w-full max-w-xl flex items-center gap-3 mb-16">
        <div className="w-10 h-10 saffron-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
          <Utensils className="w-6 h-6" />
        </div>
        <span className="font-headline font-extrabold text-brand-brown tracking-tighter text-2xl">ThaliCheck AI</span>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="max-w-xl w-full mb-12 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-label uppercase tracking-[0.2em] text-secondary text-[11px] font-bold text-center">Welcome to your Modern Thali</p>
        <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tight leading-[1.1] text-center">
          Choose your <br/>
          <span className="text-primary italic font-semibold">culinary</span> voice.
        </h1>
        <p className="font-body text-base text-on-surface-variant max-w-xl leading-relaxed text-center opacity-80">
          ThaliCheck AI curates your nutritional journey with seasonal precision. Select a language to begin your personalized experience.
        </p>
      </motion.section>

      <div className="max-w-xl w-full space-y-3">
        {/* Main Featured English Card */}
        <motion.button 
          onClick={() => onSelect('en')}
          className="w-full group relative overflow-hidden rounded-3xl bg-surface-container-low text-left transition-all duration-500 hover:shadow-xl active:scale-[0.98] h-[280px]"
          whileHover={{ y: -5 }}
        >
          <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700">
            <img 
              className="w-full h-full object-cover" 
              src="https://picsum.photos/seed/grains-spices/800/600" 
              alt="English Grains"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface-container-low via-surface-container-low/80 to-transparent"></div>
          
          <div className="relative h-full flex flex-col justify-start p-8 z-10">
            <div className="mb-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-on-secondary-container shadow-lg">
              <Languages className="w-6 h-6" />
            </div>
            <div className="mt-auto">
              <h2 className="font-headline text-3xl font-bold mb-1 text-on-surface">English</h2>
              <p className="text-on-surface-variant text-xs font-medium leading-relaxed max-w-[200px]">
                Standard global curation for all recipes and insights.
              </p>
            </div>
          </div>
        </motion.button>

        {/* Hindi Card */}
        <motion.button 
          onClick={() => onSelect('hi')}
          className="w-full flex items-center justify-between p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all group border border-on-surface/5"
          whileHover={{ x: 4 }}
        >
          <div className="flex flex-col text-left">
            <span className="font-headline text-xl font-bold">हिन्दी</span>
            <span className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant/40 mt-0.5">Hindi</span>
          </div>
          <Globe className="text-on-surface-variant/20 group-hover:text-secondary group-hover:rotate-12 transition-all w-5 h-5" />
        </motion.button>

        {/* Telugu Card */}
        <motion.button 
          onClick={() => onSelect('te')}
          className="w-full flex items-center justify-between p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all group border border-on-surface/5"
          whileHover={{ x: 4 }}
        >
          <div className="flex flex-col text-left">
            <span className="font-headline text-xl font-bold">తెలుగు</span>
            <span className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant/40 mt-0.5">Telugu</span>
          </div>
          <BookOpen className="text-on-surface-variant/20 group-hover:text-secondary group-hover:rotate-12 transition-all w-5 h-5" />
        </motion.button>

        {/* Instant Voice Card */}
        <div className="bg-secondary text-white rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative shadow-lg min-h-[180px]">
          <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12">
            <Zap className="w-40 h-40 fill-current" />
          </div>
          <div className="relative z-10 space-y-3">
            <Bolt className="text-white w-7 h-7 fill-current" />
            <div>
              <h3 className="font-headline text-xl font-bold leading-tight">Instant Voice Detection</h3>
              <p className="mt-2 text-white/80 text-xs leading-relaxed max-w-xs">Our AI understands your local culinary terms automatically.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 max-w-md text-center space-y-8 pb-10">
        <div className="h-px w-24 bg-on-surface/5 mx-auto"></div>
        <p className="font-body text-[11px] text-on-surface-variant/60 leading-relaxed font-medium">
          By choosing a language, you are enabling ThaliCheck AI to better understand your regional preferences and dietary nuances. All translations are managed by our proprietary sensory-mapped AI models.
        </p>
      </footer>
    </div>
  );
}
