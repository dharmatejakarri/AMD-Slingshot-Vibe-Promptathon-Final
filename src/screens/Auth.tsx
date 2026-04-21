import { motion } from 'motion/react';
import { LogIn, Utensils, ShieldCheck, Zap } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Language, translations } from '../lib/translations';
import { useState } from 'react';

interface AuthProps {
  language: Language;
}

export default function Auth({ language }: AuthProps) {
  const t = translations[language];
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-surface py-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-xl border border-on-surface/5 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 saffron-gradient rounded-3xl flex items-center justify-center text-white shadow-lg mb-6 rotate-3">
            <Utensils className="w-10 h-10" />
          </div>
          <h2 className="font-headline font-extrabold text-3xl text-on-surface tracking-tight mb-2">ThaliCheck AI</h2>
          <p className="text-on-surface-variant font-medium opacity-70">
            {language === 'hi' ? 'अपने पोषण का विश्लेषण शुरू करने के लिए साइन इन करें' : 'Sign in to start your nutritional journey.'}
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 mb-10">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low border border-on-surface/5">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface">Secure Accounts</h4>
                <p className="text-xs text-on-surface-variant opacity-70">Your data is synced across devices safely.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low border border-on-surface/5">
              <Zap className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface">AI Powered Insights</h4>
                <p className="text-xs text-on-surface-variant opacity-70">Get personalized feedback on every meal.</p>
              </div>
            </div>
          </div>

          <motion.button
            onClick={handleGoogleLogin}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-16 bg-white border-2 border-on-surface/10 rounded-2xl flex items-center justify-center gap-4 text-on-surface font-headline font-bold text-lg hover:bg-surface transition-all shadow-sm"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
                {language === 'hi' ? 'गूगल के साथ जुड़ें' : 'Continue with Google'}
              </>
            )}
          </motion.button>

          <p className="text-center text-[10px] text-on-surface-variant/50 font-medium px-4">
            By continuing, you agree to ThaliCheck AI's Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
