/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { auth } from './lib/firebase.ts';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from './components/layout/Header.tsx';
import BottomNav, { ScreenType } from './components/layout/BottomNav.tsx';
import LanguageSelection from './screens/LanguageSelection.tsx';
import Onboarding from './screens/Onboarding.tsx';
import LogMeal from './screens/LogMeal.tsx';
import AnalysisResult from './screens/AnalysisResult.tsx';
import History from './screens/History.tsx';
import Insights from './screens/Insights.tsx';
import Auth from './screens/Auth.tsx';
import { MealAnalysis } from './services/geminiService.ts';
import { Language, translations } from './lib/translations.ts';

export default function App() {
  const [user, authLoading] = useAuthState(auth);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('Language');
  const [lastAnalysis, setLastAnalysis] = useState<MealAnalysis | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  // If user changes, and we were on language select, we might want to stay or progress
  // For this flow, let's keep it simple: Gate the whole app with Auth first, or Language first?
  // Let's do Auth first as requested "login page".

  const t = translations[language];

  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    navigateTo('Onboarding');
  };

  const handleAnalyze = (result: MealAnalysis) => {
    setLastAnalysis(result);
    navigateTo('Result');
  };

  const renderScreen = () => {
    if (authLoading) {
      return (
        <div className="pt-40 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="font-headline font-bold text-on-surface-variant opacity-60">ThaliCheck AI...</p>
        </div>
      );
    }

    if (!user) {
      return <Auth language={language} />;
    }

    switch (currentScreen) {
      case 'Language':
        return <LanguageSelection onSelect={handleLanguageSelect} />;
      case 'Onboarding':
        return <Onboarding onNext={() => navigateTo('Analyze')} language={language} />;
      case 'Analyze':
        return <LogMeal onAnalyze={handleAnalyze} language={language} />;
      case 'Result':
        return <AnalysisResult data={lastAnalysis} language={language} />;
      case 'History':
        return <History language={language} />;
      case 'Insights':
        return <Insights language={language} />;
      default:
        return <LanguageSelection onSelect={handleLanguageSelect} />;
    }
  };

  const showHeader = currentScreen !== 'Language' && !!user;
  const showBottomNav = !['Language', 'Onboarding'].includes(currentScreen) && !!user;

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      {showHeader && <Header showMenu={currentScreen !== 'Onboarding'} appTitle={t.appTitle} />}
      
      <main className={`${showHeader ? 'pt-0' : ''} ${showBottomNav ? 'pb-20' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {showBottomNav && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={navigateTo} 
          language={language}
        />
      )}

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
      </div>
    </div>
  );
}
