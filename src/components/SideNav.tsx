import { ViewState } from '../App';

interface SideNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  spoilerMode: boolean;
  setSpoilerMode: (mode: boolean) => void;
}

const navItems: { view: ViewState; icon: string; label: string }[] = [
  { view: 'landing', icon: 'home', label: 'Home' },
  { view: 'houses', icon: 'shield', label: 'Houses' },
  { view: 'tree', icon: 'account_tree', label: 'Lineage' },
  { view: 'character', icon: 'menu_book', label: 'Chronicles' },
];

export default function SideNav({ currentView, onNavigate, spoilerMode, setSpoilerMode }: SideNavProps) {
  return (
    <nav className="hidden lg:flex fixed left-0 top-0 h-full w-64 xl:w-72 bg-parchment/95 backdrop-blur-sm border-r-2 border-primary/20 flex-col z-30 shadow-scroll">
      {/* Logo Section */}
      <div className="p-6 border-b border-primary/10">
        <div className="text-center">
          <h1 className="font-header text-base font-bold text-ink tracking-wide leading-tight">House of</h1>
          <span className="text-sm font-header font-bold text-primary tracking-wide">Westeros</span>
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

      {/* Spoiler Toggle */}
      <div className="px-6 py-4 border-t border-primary/10">
        <label className="flex items-center justify-between cursor-pointer group">
          <div>
            <span className="font-display text-sm font-semibold text-ink">Spoilers</span>
            <p className="text-[10px] text-ink-light/60 mt-0.5">Show deaths &amp; secrets</p>
          </div>
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={spoilerMode} onChange={(e) => setSpoilerMode(e.target.checked)} />
            <div className={`block w-11 h-6 rounded-full transition-colors ${spoilerMode ? 'bg-gold' : 'bg-ink/20'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform flex items-center justify-center ${spoilerMode ? 'transform translate-x-5' : ''}`}>
              {spoilerMode && <span className="material-symbols-outlined text-[10px] text-gold">visibility</span>}
              {!spoilerMode && <span className="material-symbols-outlined text-[10px] text-ink/40">visibility_off</span>}
            </div>
          </div>
        </label>
      </div>

      {/* Version Footer */}
      <div className="p-4 border-t border-primary/10 text-center">
        <p className="text-[10px] text-ink-light/40 font-display tracking-wider">Version 1.1.0</p>
      </div>
    </nav>
  );
}
