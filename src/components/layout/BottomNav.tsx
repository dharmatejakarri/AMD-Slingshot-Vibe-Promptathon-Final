import { Home, History, Scan, BarChart3 } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

export type ScreenType = 'Language' | 'Onboarding' | 'Analyze' | 'Result' | 'History' | 'Insights';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  language: Language;
}

export default function BottomNav({ currentScreen, onNavigate, language }: BottomNavProps) {
  const t = translations[language];
  const tabs = [
    { id: 'Insights' as const, label: t.insightsTitle, icon: Home },
    { id: 'History' as const, label: t.historyTitle, icon: History },
    { id: 'Analyze' as const, label: t.logMealTitle, icon: Scan, primary: true },
    { id: 'Insights' as const, label: t.insightsTitle, icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-surface/80 backdrop-blur-xl rounded-t-[2.5rem] shadow-[0_-20px_40px_-10px_rgba(85,67,56,0.08)] border-t border-on-surface/5">
      {tabs.map((tab, idx) => {
        const isActive = currentScreen === tab.id || (tab.label === 'Home' && currentScreen === 'Insights');
        const Icon = tab.icon;

        if (tab.primary) {
          return (
            <button
              key={idx}
              onClick={() => onNavigate(tab.id)}
              aria-label={tab.label}
              className="flex flex-col items-center justify-center saffron-gradient text-white rounded-2xl px-5 py-2.5 active:scale-90 transition-all duration-200 cursor-pointer shadow-lg"
            >
              <Icon className="w-6 h-6" />
              <span className="font-body text-[10px] font-bold uppercase tracking-wider mt-1">{tab.label}</span>
            </button>
          );
        }

        return (
          <button
            key={idx}
            onClick={() => onNavigate(tab.id)}
            aria-label={tab.label}
            className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
              isActive ? 'text-primary opacity-100' : 'text-on-surface-variant opacity-60'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
            <span className="font-body text-[10px] font-bold uppercase tracking-wider mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
