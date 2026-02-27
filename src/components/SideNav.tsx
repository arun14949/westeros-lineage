import { ViewState } from '../App';

interface SideNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const navItems: { view: ViewState; icon: string; label: string }[] = [
  { view: 'landing', icon: 'home', label: 'Home' },
  { view: 'houses', icon: 'shield', label: 'Houses' },
  { view: 'tree', icon: 'account_tree', label: 'Lineage' },
  { view: 'character', icon: 'menu_book', label: 'Chronicles' },
];

export default function SideNav({ currentView, onNavigate }: SideNavProps) {
  return (
    <nav className="hidden lg:flex fixed left-0 top-0 h-full w-64 xl:w-72 bg-parchment/95 backdrop-blur-sm border-r-2 border-primary/20 flex-col z-30 shadow-scroll">
      {/* Logo Section */}
      <div className="p-6 border-b border-primary/10">
        <div className="text-center">
          <h1 className="font-header text-lg font-bold text-ink tracking-wide">Westeros</h1>
          <span className="text-[9px] uppercase tracking-[0.2em] text-primary">Lineage</span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6">
        {navItems.map(({ view, icon, label }) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className={`w-full flex items-center gap-4 px-6 py-3 transition-all cursor-pointer ${
              currentView === view
                ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                : 'text-ink-light hover:bg-primary/5 hover:text-primary hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">{icon}</span>
            <span className="font-display text-sm">{label}</span>
          </button>
        ))}
      </div>

      {/* Version Footer */}
      <div className="p-4 border-t border-primary/10 text-center">
        <p className="text-[10px] text-ink-light/40 font-display tracking-wider">Version 1.0.0</p>
      </div>
    </nav>
  );
}
