import { ViewState } from '../App';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const navItems: { view: ViewState; icon: string; label: string }[] = [
  { view: 'landing', icon: 'home', label: 'Home' },
  { view: 'houses', icon: 'shield', label: 'Houses' },
  { view: 'tree', icon: 'account_tree', label: 'Tree' },
  { view: 'character', icon: 'menu_book', label: 'Tales' },
];

export default function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  return (
    <nav className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-md border-t border-primary/10 pb-6 pt-2 px-4 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around">
        {navItems.map(({ view, icon, label }) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className="flex flex-col items-center justify-center gap-1 group w-16"
          >
            <div className={`p-1.5 rounded-full transition-all duration-300 group-hover:scale-110 ${currentView === view ? 'bg-primary/10 text-primary' : 'text-ink-light hover:bg-primary/5 hover:text-primary'}`}>
              <span className="material-symbols-outlined text-[24px]">{icon}</span>
            </div>
            <span className={`text-[10px] ${currentView === view ? 'font-semibold text-primary tracking-wide' : 'font-medium text-ink-light group-hover:text-primary'}`}>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
