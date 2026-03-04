import { playSound } from '../sounds';

interface SpoilerToggleProps {
  spoilerMode: boolean;
  setSpoilerMode: (mode: boolean) => void;
  variant?: 'compact' | 'full';
}

export default function SpoilerToggle({ spoilerMode, setSpoilerMode, variant = 'compact' }: SpoilerToggleProps) {
  const toggle = (
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={spoilerMode} onChange={(e) => { playSound('toggle'); setSpoilerMode(e.target.checked); }} />
      <div className={`block w-11 h-6 rounded-full transition-colors ${spoilerMode ? 'bg-gold' : 'bg-ink/20'}`}></div>
      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform flex items-center justify-center ${spoilerMode ? 'transform translate-x-5' : ''}`}>
        {spoilerMode && <span className="material-symbols-outlined text-[10px] text-gold">visibility</span>}
        {!spoilerMode && <span className="material-symbols-outlined text-[10px] text-ink/40">visibility_off</span>}
      </div>
    </div>
  );

  if (variant === 'compact') {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <span className="text-[10px] font-display font-semibold text-ink-light uppercase tracking-wider">Spoilers</span>
        {toggle}
      </label>
    );
  }

  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div>
        <span className="font-display text-sm font-semibold text-ink">Spoilers</span>
        <p className="text-[10px] text-ink-light/60 mt-0.5">Show deaths &amp; secrets</p>
      </div>
      {toggle}
    </label>
  );
}
