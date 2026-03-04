import SpoilerToggle from './SpoilerToggle';

interface MobileHeaderProps {
  title: string;
  canGoBack?: boolean;
  goBack?: () => void;
  spoilerMode: boolean;
  setSpoilerMode: (mode: boolean) => void;
}

export default function MobileHeader({ title, canGoBack, goBack, spoilerMode, setSpoilerMode }: MobileHeaderProps) {
  return (
    <div className="flex items-center px-4 py-3 border-b border-parchment-dark/30 bg-parchment/50 lg:hidden gap-2">
      {/* Left: back button */}
      {canGoBack && goBack && (
        <button onClick={goBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-ink/5 transition-colors text-ink shrink-0">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
      )}

      {/* Title — left aligned */}
      <h1 className="font-display font-bold text-sm text-ink tracking-wide truncate flex-1">{title}</h1>

      {/* Right: spoiler toggle */}
      <div className="shrink-0">
        <SpoilerToggle spoilerMode={spoilerMode} setSpoilerMode={setSpoilerMode} variant="compact" />
      </div>
    </div>
  );
}
