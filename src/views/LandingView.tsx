import { useState, useRef, useEffect } from 'react';
import { ViewState, NavigationState } from '../App';
import { houses, searchAll, characters, type Character, type House } from '../data';
import CharacterAvatar from '../components/CharacterAvatar';

interface LandingViewProps {
  onNavigate: (view: ViewState) => void;
  onNavigateTo: (nav: NavigationState) => void;
}

const FEATURED_HOUSES = ['stark', 'targaryen', 'lannister', 'baratheon'];

const houseColorMap: Record<string, string> = {
  stark: 'text-stark',
  targaryen: 'text-targaryen',
  lannister: 'text-lannister',
  baratheon: 'text-baratheon',
  greyjoy: 'text-greyjoy',
  tyrell: 'text-tyrell',
  martell: 'text-martell',
  arryn: 'text-arryn',
  tully: 'text-tully',
};

const houseBorderMap: Record<string, string> = {
  stark: 'border-stark/20 hover:border-stark/50',
  targaryen: 'border-targaryen/20 hover:border-targaryen/50',
  lannister: 'border-lannister/20 hover:border-lannister/50',
  baratheon: 'border-baratheon/20 hover:border-baratheon/50',
  greyjoy: 'border-greyjoy/20 hover:border-greyjoy/50',
  tyrell: 'border-tyrell/20 hover:border-tyrell/50',
  martell: 'border-martell/20 hover:border-martell/50',
  arryn: 'border-arryn/20 hover:border-arryn/50',
  tully: 'border-tully/20 hover:border-tully/50',
};

export default function LandingView({ onNavigate, onNavigateTo }: LandingViewProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const results = query.length >= 2 ? searchAll(query) : { characters: [], houses: [] };
  const hasResults = results.characters.length > 0 || results.houses.length > 0;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const featured = houses.filter(h => FEATURED_HOUSES.includes(h.id));

  return (
    <div className="flex-1 flex flex-col pb-20 lg:pb-8">
      <header className="sticky top-0 z-20 bg-background-light/95 backdrop-blur-sm border-b border-primary/20 px-4 py-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="font-header text-sm font-bold text-ink tracking-wide">Westeros</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-primary">Lineage</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-6 lg:p-10 relative">
        <div className="relative z-10 flex flex-col items-center w-full h-full justify-center mt-4 mb-12">
          <div className="text-center mb-8 w-full">
            <div className="w-24 h-4 mx-auto mb-4 decoration-flourish"></div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight leading-tight mb-2">
              Westeros<br />Lineage
            </h1>
            <p className="font-body italic text-ink-light text-lg">
              The Great Houses of the Seven Kingdoms
            </p>
          </div>

          {/* Search */}
          <div className="w-full max-w-xs mb-10 relative" ref={searchRef}>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-gold/20 to-primary/10 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative ink-border bg-white flex items-center px-4 py-3 shadow-ink transition-transform hover:scale-[1.02]">
              <span className="material-symbols-outlined text-primary/60 text-2xl mr-3">search</span>
              <input
                className="w-full bg-transparent border-none p-0 text-ink placeholder:text-ink-light/50 placeholder:italic font-body text-lg focus:ring-0 outline-none"
                placeholder="Search for a lord or lady..."
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
              />
              {query && (
                <button onClick={() => { setQuery(''); setShowResults(false); }} className="text-ink-light/50 hover:text-ink transition-colors">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && query.length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-parchment-dark rounded-lg shadow-scroll max-h-72 overflow-y-auto z-50">
                {!hasResults && (
                  <div className="px-4 py-6 text-center text-ink-light italic font-body text-sm">
                    No lords or ladies found for "{query}"
                  </div>
                )}
                {results.houses.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-primary font-display font-bold border-b border-parchment-dark bg-parchment/50">Houses</div>
                    {results.houses.map(house => (
                      <button
                        key={house.id}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-parchment/50 transition-colors text-left border-b border-parchment-dark/50 last:border-none"
                        onClick={() => {
                          onNavigateTo({ view: 'tree', houseId: house.id });
                          setShowResults(false);
                          setQuery('');
                        }}
                      >
                        <span className={`material-symbols-outlined text-[20px] ${houseColorMap[house.color] || 'text-ink-light'}`}>{house.icon}</span>
                        <div>
                          <div className="font-display font-bold text-sm text-ink">{house.name}</div>
                          <div className="text-[11px] text-ink-light italic font-body">"{house.motto}"</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {results.characters.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-primary font-display font-bold border-b border-parchment-dark bg-parchment/50">Characters</div>
                    {results.characters.slice(0, 8).map(char => (
                      <button
                        key={char.id}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-parchment/50 transition-colors text-left border-b border-parchment-dark/50 last:border-none"
                        onClick={() => {
                          onNavigateTo({ view: 'character', characterId: char.id });
                          setShowResults(false);
                          setQuery('');
                        }}
                      >
                        <CharacterAvatar character={char} size="sm" className="shrink-0" />
                        <div className="min-w-0">
                          <div className="font-display font-bold text-sm text-ink truncate">{char.name}</div>
                          <div className="text-[11px] text-ink-light font-body truncate">{char.title}</div>
                        </div>
                        {char.isDead && (
                          <span className="ml-auto material-symbols-outlined text-crimson/40 text-[14px] shrink-0">skull</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Featured Houses */}
          <div className="w-full">
            <h3 className="font-display text-center text-sm uppercase tracking-[0.2em] text-primary/70 mb-6 font-bold flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-primary/20"></span>
              Great Houses
              <span className="h-px w-8 bg-primary/20"></span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {featured.map(house => (
                <HouseCard
                  key={house.id}
                  house={house}
                  colorClass={houseColorMap[house.color] || 'text-ink-light'}
                  borderClass={houseBorderMap[house.color] || 'border-ink/20'}
                  onClick={() => onNavigateTo({ view: 'tree', houseId: house.id })}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => onNavigate('houses')}
                className="inline-flex items-center gap-2 font-display text-primary hover:text-primary-dark transition-colors font-semibold text-sm border-b border-primary/30 pb-0.5 hover:border-primary"
              >
                <span>Explore All {houses.length} Great Houses</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Quick Character Access */}
          <div className="w-full mt-10">
            <h3 className="font-display text-center text-sm uppercase tracking-[0.2em] text-primary/70 mb-5 font-bold flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-primary/20"></span>
              Notable Figures
              <span className="h-px w-8 bg-primary/20"></span>
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2 px-2 no-scrollbar justify-center flex-wrap">
              {['jon-snow', 'daenerys-targaryen', 'tyrion-lannister', 'arya-stark', 'cersei-lannister'].map(id => {
                const char = characters[id];
                if (!char) return null;
                return (
                  <button
                    key={id}
                    className="flex flex-col items-center gap-2 group shrink-0 p-1"
                    onClick={() => onNavigateTo({ view: 'character', characterId: id })}
                  >
                    <div className="relative">
                      <CharacterAvatar character={char} size="lg" className="group-hover:ring-2 group-hover:ring-primary/50 transition-all group-hover:scale-105" />
                      {char.isDead && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-crimson rounded-full flex items-center justify-center border border-white">
                          <span className="material-symbols-outlined text-white text-[8px]">skull</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] font-display font-semibold text-ink-light group-hover:text-primary transition-colors text-center leading-tight max-w-[60px]">
                      {char.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Version Footer */}
          <div className="mt-16 mb-4 text-center">
            <p className="text-[10px] text-ink-light/40 font-display tracking-wider">
              Version 1.0.0
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function HouseCard(props: { house: House; colorClass: string; borderClass: string; onClick: () => void }) {
  const { house, colorClass, borderClass, onClick } = props;
  return (
    <div className="group relative cursor-pointer" onClick={onClick}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-black/5 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className={`relative flex items-center p-4 bg-parchment rounded-xl organic-border border ${borderClass} transition-all shadow-sm hover:shadow-md`}>
        <div className="w-16 h-16 shrink-0 relative mr-5">
          <div className="absolute inset-0 bg-black/5 rounded-full blur-md"></div>
          <div className="w-full h-full rounded-full bg-white border-2 border-black/10 overflow-hidden flex items-center justify-center relative z-10">
            <div className="w-full h-full absolute inset-0 bg-black/5 mix-blend-multiply filter blur-[0.5px]"></div>
            <span className={`material-symbols-outlined text-[36px] ${colorClass} z-10 opacity-80`} style={{ fontVariationSettings: "'FILL' 1" }}>{house.icon}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-bold text-xl text-ink">{house.name}</h4>
          <p className={`font-body italic text-sm ${colorClass}`}>"{house.motto}"</p>
          <p className="text-[11px] text-ink-light mt-1">{house.region} &middot; {house.memberIds.length} members</p>
        </div>
        <span className={`material-symbols-outlined ${colorClass} opacity-40 group-hover:translate-x-1 transition-transform shrink-0`}>chevron_right</span>
      </div>
    </div>
  );
}
