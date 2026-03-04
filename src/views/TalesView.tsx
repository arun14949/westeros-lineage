import { useState, useEffect, useCallback } from 'react';
import { NavigationState } from '../App';
import { characters, houses, type Character } from '../data';
import CharacterAvatar from '../components/CharacterAvatar';
import MobileHeader from '../components/MobileHeader';
import { playSound } from '../sounds';
import { useWebHaptics } from 'web-haptics/react';

interface TalesViewProps {
  onNavigateTo: (nav: NavigationState) => void;
  spoilerMode: boolean;
  setSpoilerMode: (mode: boolean) => void;
}

const houseTextColor: Record<string, string> = {
  stark: 'text-stark', targaryen: 'text-targaryen', lannister: 'text-lannister',
  baratheon: 'text-baratheon', greyjoy: 'text-greyjoy', tyrell: 'text-tyrell',
  martell: 'text-martell', arryn: 'text-arryn', tully: 'text-tully',
};

const houseBgColor: Record<string, string> = {
  stark: 'bg-stark', targaryen: 'bg-targaryen', lannister: 'bg-lannister',
  baratheon: 'bg-baratheon', greyjoy: 'bg-greyjoy', tyrell: 'bg-tyrell',
  martell: 'bg-martell', arryn: 'bg-arryn', tully: 'bg-tully',
};

const houseBorderColor: Record<string, string> = {
  stark: 'border-stark', targaryen: 'border-targaryen', lannister: 'border-lannister',
  baratheon: 'border-baratheon', greyjoy: 'border-greyjoy', tyrell: 'border-tyrell',
  martell: 'border-martell', arryn: 'border-arryn', tully: 'border-tully',
};

function shuffle(arr: Character[]): Character[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function TalesView({ onNavigateTo, spoilerMode, setSpoilerMode }: TalesViewProps) {
  const { trigger } = useWebHaptics();
  const [deck, setDeck] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [enterFrom, setEnterFrom] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Shuffle all characters on mount
  useEffect(() => {
    setDeck(shuffle(Object.values(characters)));
  }, []);

  const goToNext = useCallback(() => {
    if (currentIndex < deck.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setSlideDirection('left');
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
        setSlideDirection(null);
        setEnterFrom('right');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setEnterFrom(null);
            setTimeout(() => setIsAnimating(false), 200);
          });
        });
      }, 200);
    }
  }, [currentIndex, deck.length, isAnimating]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setSlideDirection('right');
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setIsFlipped(false);
        setSlideDirection(null);
        setEnterFrom('left');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setEnterFrom(null);
            setTimeout(() => setIsAnimating(false), 200);
          });
        });
      }, 200);
    }
  }, [currentIndex, isAnimating]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setTouchDelta(e.touches[0].clientX - touchStart);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta) > 80) {
      playSound('swipe');
      trigger([
        { duration: 40, intensity: 0.8 },
        { delay: 100, duration: 40, intensity: 0.6 },
      ]);
      setIsSwiping(true);
      if (touchDelta < 0) goToNext();
      else goToPrev();
      setTimeout(() => setIsSwiping(false), 50);
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  const handleCardClick = () => {
    if (!isSwiping && !isAnimating) {
      playSound('flip');
      setIsFlipped(prev => !prev);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      else if (e.key === 'ArrowRight') goToNext();
      else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const handleShuffle = () => {
    playSound('shuffle');
    setDeck(shuffle(Object.values(characters)));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (deck.length === 0) return null;

  const char = deck[currentIndex];
  const house = houses.find(h => h.id === char.house);
  const textColor = houseTextColor[char.house] || 'text-primary';
  const bgColor = houseBgColor[char.house] || 'bg-primary';
  const borderColor = houseBorderColor[char.house] || 'border-primary';
  const houseIcon = house?.icon || 'shield';

  // Compute card transform
  const dragging = touchStart !== null && Math.abs(touchDelta) > 5;
  const flipTransform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
  const dragTransform = dragging ? `translateX(${touchDelta}px)` : '';
  const dragRotation = dragging ? `rotate(${touchDelta * 0.05}deg)` : '';
  const exitTransform = slideDirection === 'left' ? 'translateX(-120%) rotate(-8deg)' : slideDirection === 'right' ? 'translateX(120%) rotate(8deg)' : '';
  const enterTransform = enterFrom === 'right' ? 'translateX(80%)' : enterFrom === 'left' ? 'translateX(-80%)' : '';
  const cardTransform = exitTransform || enterTransform || `${flipTransform} ${dragTransform} ${dragRotation}`;
  const cardOpacity = slideDirection ? 0 : enterFrom ? 0.5 : 1;

  return (
    <div className="flex-1 flex flex-col pb-20 lg:pb-6 xl:pb-4">
      <MobileHeader title="Tales" spoilerMode={spoilerMode} setSpoilerMode={setSpoilerMode} />
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-10 relative">
        {/* Card + Arrow Buttons */}
        <div className="flex items-center gap-4 w-full justify-center">
          {/* Left Arrow (desktop) */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-parchment border border-parchment-dark hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            <span className="material-symbols-outlined text-ink">chevron_left</span>
          </button>

          {/* The Card */}
          <div
            className="relative w-72 h-96 md:w-80 md:h-[28rem] cursor-pointer select-none"
            style={{ perspective: '1000px' }}
            onClick={handleCardClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Stacked card shadows */}
            <div className="absolute inset-0 bg-[#fffcf5] rounded-xl border-2 border-parchment-dark/50 rotate-2 scale-[0.97] translate-y-2 -z-10"></div>
            <div className="absolute inset-0 bg-[#fffcf5] rounded-xl border-2 border-parchment-dark/30 -rotate-1 scale-[0.94] translate-y-4 -z-20"></div>

            <div
              className={`relative w-full h-full ${!slideDirection && !enterFrom ? 'transition-transform duration-500' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                transform: cardTransform,
                opacity: cardOpacity,
                transition: slideDirection ? 'transform 200ms ease-in, opacity 150ms' : enterFrom ? undefined : 'transform 200ms ease-out, opacity 200ms ease-out',
              }}
            >
              {/* FRONT */}
              <div
                className="absolute inset-0 backface-hidden bg-[#fffcf5] rounded-xl border-2 border-parchment-dark shadow-scroll flex flex-col items-center justify-between p-6"
              >
                <div className="w-16 h-3 decoration-flourish"></div>

                <div className="flex flex-col items-center">
                  <CharacterAvatar character={char} size="xl" className={`mb-4 hand-drawn-circle border-[3px] ${borderColor}/30`} />

                  <h2 className="font-ornamental text-2xl text-ink text-center mb-1">{char.name}</h2>
                  {char.alias && (
                    <p className="text-sm font-body italic text-ink-light">"{char.alias}"</p>
                  )}
                  <p className="text-xs text-ink-light/70 mt-1 font-body text-center">{char.title.split(',')[0]}</p>

                  {house && (
                    <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${bgColor}/10 ${textColor} text-[11px] font-display font-semibold border ${borderColor}/20`}>
                      <span className="material-symbols-outlined text-[14px]">{houseIcon}</span>
                      {house.name}
                    </div>
                  )}
                </div>

                {spoilerMode && char.isDead && (
                  <div className="absolute top-4 right-4 w-7 h-7 bg-crimson rounded-full flex items-center justify-center wax-seal">
                    <span className="material-symbols-outlined text-white text-[14px]">skull</span>
                  </div>
                )}

                <p className="text-[10px] text-ink-light/40 font-display tracking-wider pt-2">Tap to reveal</p>
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 backface-hidden bg-[#fffcf5] rounded-xl border-2 border-parchment-dark shadow-scroll flex flex-col p-6 overflow-y-auto"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-parchment-dark/50">
                  <CharacterAvatar character={char} size="sm" />
                  <div>
                    <h3 className="font-display font-bold text-sm text-ink">{char.name}</h3>
                    <p className="text-[10px] text-ink-light">{house?.name}</p>
                  </div>
                </div>

                <p className="text-sm font-body text-ink leading-relaxed mb-4 flex-1">
                  {char.bio}
                </p>

                {char.quote && (
                  <blockquote className={`border-l-[3px] ${borderColor} pl-3 italic text-ink-light text-sm font-body mb-4`}>
                    "{char.quote}"
                  </blockquote>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateTo({ view: 'character', characterId: char.id });
                  }}
                  className="mt-auto self-center inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-xs font-display font-semibold rounded-full border border-primary/20 hover:bg-primary/15 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  View Full Chronicle
                </button>
              </div>
            </div>
          </div>

          {/* Right Arrow (desktop) */}
          <button
            onClick={goToNext}
            disabled={currentIndex >= deck.length - 1}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-parchment border border-parchment-dark hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            <span className="material-symbols-outlined text-ink">chevron_right</span>
          </button>
        </div>

        {/* Swipe hint (mobile) */}
        <p className="mt-4 text-[10px] text-ink-light/40 font-display tracking-wider md:hidden">
          Swipe left or right
        </p>

        {/* Shuffle button */}
        <button
          onClick={handleShuffle}
          className="mt-6 inline-flex items-center gap-2 text-xs font-display text-ink-light hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">shuffle</span>
          Shuffle Deck
        </button>
      </main>
    </div>
  );
}
