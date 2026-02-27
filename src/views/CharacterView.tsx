import { ViewState, NavigationState } from '../App';
import { characters, houses, getCharacter } from '../data';
import CharacterAvatar from '../components/CharacterAvatar';

interface CharacterViewProps {
  characterId?: string;
  onNavigate: (view: ViewState) => void;
  onNavigateTo: (nav: NavigationState) => void;
  goBack: () => void;
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

export default function CharacterView({ characterId, onNavigate, onNavigateTo, goBack, spoilerMode, setSpoilerMode }: CharacterViewProps) {
  const char = characterId ? getCharacter(characterId) : undefined;

  if (!char) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div>
          <span className="material-symbols-outlined text-5xl text-ink-light/30 mb-4 block">person_off</span>
          <p className="font-display text-ink-light">Character not found</p>
          <button onClick={goBack} className="mt-4 text-primary font-display text-sm underline">Go back</button>
        </div>
      </div>
    );
  }

  const house = houses.find(h => h.id === char.house);
  const textColor = houseTextColor[char.house] || 'text-primary';
  const bgColor = houseBgColor[char.house] || 'bg-primary';
  const borderColor = houseBorderColor[char.house] || 'border-primary';

  // Find related characters (same house)
  const houseMembers = house
    ? house.memberIds.map(id => characters[id]).filter(m => m && m.id !== char.id).slice(0, 5)
    : [];

  // Icon for the house
  const houseIcon = house?.icon || 'shield';

  return (
    <div className="flex-1 flex flex-col pb-20 lg:pb-6 xl:pb-4">
      <header className="sticky top-0 z-20 bg-background-light/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-ink/5">
        <button onClick={goBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-ink/5 transition-colors text-ink">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-ink-light font-bold font-display">Chronicle</span>
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={spoilerMode} onChange={(e) => setSpoilerMode(e.target.checked)} />
            <div className={`block w-12 h-6 rounded-full transition-colors ${spoilerMode ? 'bg-gold' : 'bg-ink/20'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform flex items-center justify-center ${spoilerMode ? 'transform translate-x-6' : ''}`}>
              {spoilerMode && <span className="material-symbols-outlined text-[10px] text-gold">visibility</span>}
              {!spoilerMode && <span className="material-symbols-outlined text-[10px] text-ink/40">visibility_off</span>}
            </div>
          </div>
        </label>
      </header>

      <main className="flex-1 flex flex-col relative px-4 md:px-6 lg:px-10 xl:px-12 2xl:px-16 py-4">
        <div className="relative z-10 flex flex-col items-center max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto w-full">
          {/* Portrait */}
          <div className="relative mt-2 mb-6">
            <CharacterAvatar character={char} size="xl" className={`hand-drawn-circle border-[3px] ${borderColor}/80 relative z-10`} />
            <div className="absolute -top-2 -right-2 w-8 h-8 opacity-80 rotate-12">
              <span className={`material-symbols-outlined ${textColor} text-3xl`}>{houseIcon}</span>
            </div>
            {char.isDead && spoilerMode && (
              <div className="absolute -bottom-1 -left-2 w-8 h-8 bg-crimson rounded-full flex items-center justify-center wax-seal z-20">
                <span className="material-symbols-outlined text-white text-[16px]">skull</span>
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-ornamental text-ink mb-1 drop-shadow-ink">{char.name}</h1>
            {char.alias && (
              <p className="text-sm font-bold text-ink-light italic tracking-wide font-body">"{char.alias}"</p>
            )}
            <p className="text-xs text-ink-light/70 mt-1 font-body">{char.title}</p>
            {house && (
              <button
                onClick={() => onNavigateTo({ view: 'tree', houseId: house.id })}
                className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${bgColor}/10 ${textColor} text-[11px] font-display font-semibold border ${borderColor}/20 hover:${borderColor}/40 transition-colors`}
              >
                <span className="material-symbols-outlined text-[14px]">{houseIcon}</span>
                {house.name}
              </button>
            )}
          </div>

          {/* Bio */}
          <article className="prose prose-stone prose-p:text-justify prose-p:text-ink prose-p:font-medium prose-p:leading-relaxed max-w-none w-full font-body">
            <p className="mb-4">
              <span className="drop-cap">{char.bio.charAt(0)}</span>{char.bio.slice(1)}
            </p>

            {/* Spoiler Section */}
            {char.spoilerBio && (
              <div className="relative">
                {!spoilerMode && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-md bg-background-light/40 rounded-lg gap-2">
                    <span className="font-ornamental text-3xl text-ink/80 tracking-widest drop-shadow-md">Spoiler</span>
                    <button
                      onClick={() => setSpoilerMode(true)}
                      className="text-[11px] text-primary font-display font-semibold underline hover:text-primary-dark transition-colors"
                    >
                      Reveal
                    </button>
                  </div>
                )}
                <div className={!spoilerMode ? 'opacity-30 select-none blur-sm' : ''}>
                  <p className="mb-4">{char.spoilerBio}</p>
                  {char.quote && (
                    <blockquote className={`border-l-4 ${borderColor} pl-4 italic text-ink-light my-6 text-lg`}>
                      "{char.quote}"
                    </blockquote>
                  )}
                </div>
              </div>
            )}

            <div className="ink-divider"></div>
          </article>

          {/* Dual Identity (Jon Snow) */}
          {char.raisedAs && char.trueLineage && (
            <div className={`w-full bg-parchment p-4 rounded-lg border border-ink/10 shadow-inner-glow mb-8 flex items-center justify-between relative overflow-hidden group transition-all duration-500 ${!spoilerMode ? 'opacity-0 h-0 p-0 mb-0 border-none' : 'opacity-100'}`}>
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-6xl">verified</span>
              </div>
              <div className="flex-1 text-center border-r border-ink/10 pr-2">
                <div className={`text-[10px] uppercase tracking-widest ${houseTextColor[char.raisedAs.house.toLowerCase()] || 'text-ink-light'} font-bold mb-1 font-display`}>Raised As</div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-ink font-ornamental">{char.raisedAs.house}</span>
                  <span className="text-[10px] text-ink-light italic font-body">{char.raisedAs.title}</span>
                </div>
              </div>
              <div className="px-3 flex flex-col items-center justify-center relative">
                <div className="h-px w-8 bg-ink/20 mb-1"></div>
                <span className="text-[10px] italic text-ink/60 font-body">revealed</span>
                <div className="h-px w-8 bg-ink/20 mt-1"></div>
              </div>
              <div className="flex-1 text-center pl-2 relative">
                <div className={`text-[10px] uppercase tracking-widest ${houseTextColor[char.trueLineage.house.toLowerCase()] || 'text-ink-light'} font-bold mb-1 font-display`}>True Lineage</div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-ink font-ornamental">{char.trueLineage.house}</span>
                  <span className="text-[10px] text-ink-light italic font-body">{char.trueLineage.title}</span>
                </div>
                <div className={`absolute -top-3 -right-2 w-6 h-6 rounded-full ${houseBgColor[char.trueLineage.house.toLowerCase()] || 'bg-primary'} wax-seal flex items-center justify-center shadow-sm`}>
                  <span className="material-symbols-outlined text-white/90 text-[14px]">local_fire_department</span>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {char.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-parchment text-ink-light text-[10px] font-display uppercase tracking-wider rounded-full border border-parchment-dark">
                {tag}
              </span>
            ))}
          </div>

          {/* Related Characters */}
          {houseMembers.length > 0 && (
            <div className="w-full mb-6">
              <h3 className="font-display text-center text-sm uppercase tracking-[0.2em] text-primary/70 mb-4 font-bold flex items-center justify-center gap-4">
                <span className="h-px w-8 bg-primary/20"></span>
                House Members
                <span className="h-px w-8 bg-primary/20"></span>
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 justify-items-center">
                {houseMembers.map(member => (
                  <button
                    key={member.id}
                    className="flex flex-col items-center gap-1.5 group shrink-0 p-1"
                    onClick={() => onNavigateTo({ view: 'character', characterId: member.id })}
                  >
                    <div className="relative">
                      <CharacterAvatar character={member} size="md" className="group-hover:ring-2 group-hover:ring-primary/50 transition-all group-hover:scale-105" />
                      {spoilerMode && member.isDead && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-crimson rounded-full flex items-center justify-center border border-white">
                          <span className="material-symbols-outlined text-white text-[8px]">skull</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-display font-semibold text-ink-light group-hover:text-primary transition-colors text-center leading-tight max-w-[56px]">
                      {member.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-2 mb-4">
            <span className="material-symbols-outlined text-ink/30 text-2xl">history_edu</span>
          </div>

          <div className="h-20"></div>
        </div>
      </main>
    </div>
  );
}
