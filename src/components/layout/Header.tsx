import { Menu, Utensils, LogOut } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

interface HeaderProps {
  showMenu?: boolean;
  appTitle?: string;
}

export default function Header({ showMenu = true, appTitle = "ThaliCheck AI" }: HeaderProps) {
  const handleLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      signOut(auth);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-surface/80 backdrop-blur-xl border-b border-on-surface/5">
      <div className="flex items-center gap-3">
        {showMenu && (
          <button aria-label="Open menu" className="p-1 hover:bg-on-surface/5 rounded-lg transition-colors">
            <Menu className="text-brand-brown cursor-pointer w-6 h-6" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 saffron-gradient rounded-lg flex items-center justify-center text-white">
            <Utensils className="w-5 h-5" />
          </div>
          <span className="font-headline font-extrabold text-brand-brown tracking-tighter text-xl">{appTitle}</span>
        </div>
      </div>
      <button 
        onClick={handleLogout}
        className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-on-surface/5 hover:border-primary/30 transition-all group relative"
      >
        <img 
          alt="Profile" 
          src={auth.currentUser?.photoURL || "https://picsum.photos/seed/indian-boy/200/200"} 
          className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <LogOut className="absolute opacity-0 group-hover:opacity-100 text-primary w-4 h-4 transition-opacity" />
      </button>
    </header>
  );
}
