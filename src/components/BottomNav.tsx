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
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-parchment/95 backdrop-blur-md pb-5 pt-1 shadow-[0_-1px_12px_-2px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(({ view, icon, label }) => {
          const active = currentView === view;
          return (
            <button
              key={view}
              onClick={() => onNavigate(view)}
              className="flex flex-col items-center justify-center gap-0.5 py-1 min-w-[4rem] group"
            >
              <div className={`flex items-center justify-center w-16 h-8 rounded-2xl transition-all duration-200 ${active ? 'bg-primary/12' : 'group-hover:bg-primary/5'}`}>
                <span
                  className={`material-symbols-outlined text-[24px] transition-colors ${active ? 'text-primary' : 'text-ink-light group-hover:text-primary'}`}
                  style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {icon}
                </span>
              </div>
              <span className={`text-[11px] leading-tight transition-colors ${active ? 'font-semibold text-primary' : 'font-medium text-ink-light group-hover:text-primary'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
