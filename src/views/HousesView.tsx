import { useState } from 'react';
import { ViewState, NavigationState } from '../App';
import { houses, characters, type House } from '../data';
import CharacterAvatar from '../components/CharacterAvatar';

interface HousesViewProps {
  onNavigate: (view: ViewState) => void;
  onNavigateTo: (nav: NavigationState) => void;
  goBack: () => void;
}

const colorMap: Record<string, { text: string; bg: string; bgBlur: string; border: string; borderHover: string; gradient: string; bgPill: string; groupHoverText: string }> = {
  targaryen: { text: 'text-targaryen', bg: 'bg-targaryen/10', bgBlur: 'bg-targaryen/20', border: 'border-targaryen/20', borderHover: 'hover:border-targaryen/30', gradient: 'from-targaryen/40', bgPill: 'bg-targaryen/10', groupHoverText: 'group-hover:text-targaryen' },
  stark: { text: 'text-stark', bg: 'bg-stark/10', bgBlur: 'bg-stark/20', border: 'border-stark/20', borderHover: 'hover:border-stark/30', gradient: 'from-stark/40', bgPill: 'bg-stark/10', groupHoverText: 'group-hover:text-stark' },
  lannister: { text: 'text-lannister', bg: 'bg-lannister/10', bgBlur: 'bg-lannister/20', border: 'border-lannister/20', borderHover: 'hover:border-lannister/30', gradient: 'from-lannister/40', bgPill: 'bg-lannister/10', groupHoverText: 'group-hover:text-lannister' },
  baratheon: { text: 'text-baratheon', bg: 'bg-baratheon/10', bgBlur: 'bg-baratheon/20', border: 'border-baratheon/20', borderHover: 'hover:border-baratheon/30', gradient: 'from-baratheon/40', bgPill: 'bg-baratheon/10', groupHoverText: 'group-hover:text-baratheon' },
  greyjoy: { text: 'text-greyjoy', bg: 'bg-greyjoy/10', bgBlur: 'bg-greyjoy/20', border: 'border-greyjoy/20', borderHover: 'hover:border-greyjoy/30', gradient: 'from-greyjoy/40', bgPill: 'bg-greyjoy/10', groupHoverText: 'group-hover:text-greyjoy' },
  tyrell: { text: 'text-tyrell', bg: 'bg-tyrell/10', bgBlur: 'bg-tyrell/20', border: 'border-tyrell/20', borderHover: 'hover:border-tyrell/30', gradient: 'from-tyrell/40', bgPill: 'bg-tyrell/10', groupHoverText: 'group-hover:text-tyrell' },
  martell: { text: 'text-martell', bg: 'bg-martell/10', bgBlur: 'bg-martell/20', border: 'border-martell/20', borderHover: 'hover:border-martell/30', gradient: 'from-martell/40', bgPill: 'bg-martell/10', groupHoverText: 'group-hover:text-martell' },
  arryn: { text: 'text-arryn', bg: 'bg-arryn/10', bgBlur: 'bg-arryn/20', border: 'border-arryn/20', borderHover: 'hover:border-arryn/30', gradient: 'from-arryn/40', bgPill: 'bg-arryn/10', groupHoverText: 'group-hover:text-arryn' },
  tully: { text: 'text-tully', bg: 'bg-tully/10', bgBlur: 'bg-tully/20', border: 'border-tully/20', borderHover: 'hover:border-tully/30', gradient: 'from-tully/40', bgPill: 'bg-tully/10', groupHoverText: 'group-hover:text-tully' },
  velaryon: { text: 'text-velaryon', bg: 'bg-velaryon/10', bgBlur: 'bg-velaryon/20', border: 'border-velaryon/20', borderHover: 'hover:border-velaryon/30', gradient: 'from-velaryon/40', bgPill: 'bg-velaryon/10', groupHoverText: 'group-hover:text-velaryon' },
  hightower: { text: 'text-hightower', bg: 'bg-hightower/10', bgBlur: 'bg-hightower/20', border: 'border-hightower/20', borderHover: 'hover:border-hightower/30', gradient: 'from-hightower/40', bgPill: 'bg-hightower/10', groupHoverText: 'group-hover:text-hightower' },
};

const defaultColors = colorMap.stark;

type FilterType = 'all' | 'westeros' | 'royal' | 'alive';

export default function HousesView({ onNavigate, onNavigateTo, goBack }: HousesViewProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredHouses = houses.filter(house => {
    if (filter === 'all') return true;
    if (filter === 'royal') return house.status === 'Royal House';
    if (filter === 'alive') {
      const members = house.memberIds.map(id => characters[id]).filter(Boolean);
      return members.some(m => !m.isDead);
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col pb-20 lg:pb-6 xl:pb-4">
      <header className="sticky top-0 z-20 bg-background-light/95 backdrop-blur-sm border-b border-primary/20 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={goBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors text-ink-light">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-lg lg:text-xl xl:text-2xl font-header font-bold text-ink tracking-wide">The Great Houses</h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary">Registry</span>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-10 xl:p-12 2xl:p-16 relative gap-6">
        <div className="relative z-10 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {([['all', 'All Houses'], ['royal', 'Royal'], ['alive', 'With Survivors']] as [FilterType, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border whitespace-nowrap transition-colors ${filter === key ? 'bg-primary text-white border-primary shadow-sm' : 'bg-transparent text-ink-light hover:bg-primary/5 border-ink-light/20'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHouses.map((house) => {
            const colors = colorMap[house.color] || defaultColors;
            const members = house.memberIds.map(id => characters[id]).filter(Boolean);
            const aliveCount = members.filter(m => !m.isDead).length;

            return (
              <article
                key={house.id}
                onClick={() => onNavigateTo({ view: 'tree', houseId: house.id })}
                className={`scroll-card bg-[#fffcf5] p-6 border border-parchment-dark ${colors.borderHover} transition-all cursor-pointer group`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center relative overflow-hidden border ${colors.border}`}>
                    <div className={`absolute inset-0 ${colors.bgBlur} blur-md rounded-full transform scale-75`}></div>
                    <span className={`material-symbols-outlined ${colors.text} text-[32px] relative z-10`}>{house.icon}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-widest text-ink-light/60 font-semibold mb-1">{house.region}</span>
                    <span className={`${colors.bgPill} ${colors.text} px-2 py-0.5 rounded text-[10px] font-bold border ${colors.border}`}>{house.status}</span>
                  </div>
                </div>
                <div className="relative">
                  <h2 className={`font-header text-xl md:text-2xl xl:text-3xl text-ink mb-1 ${colors.groupHoverText} transition-colors uppercase`}>{house.name}</h2>
                  <p className="text-xs text-ink-light italic font-body mb-1">"{house.motto}"</p>
                  <p className="text-[11px] text-ink-light/70 font-body mb-3">{house.seat}</p>
                  <div className={`h-px w-full bg-gradient-to-r ${colors.gradient} to-transparent mb-3`}></div>
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2 p-1">
                      {members.slice(0, 3).map((member, i) => (
                        <button
                          key={i}
                          className="rounded-full border-2 border-white hover:z-10 transition-all cursor-pointer hover:scale-110"
                          onClick={(e) => { e.stopPropagation(); onNavigateTo({ view: 'character', characterId: member.id }); }}
                        >
                          <CharacterAvatar character={member} size="sm" />
                        </button>
                      ))}
                      {members.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-parchment flex items-center justify-center text-[10px] font-bold text-ink-light">
                          +{members.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-ink-light/50">{aliveCount} alive</span>
                      <span className={`text-xs font-medium ${colors.text} flex items-center group-hover:translate-x-1 transition-transform`}>
                        View Lineage <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="h-16 flex items-center justify-center opacity-50">
          <span className="text-[10px] uppercase tracking-[0.3em] text-ink-light/50 font-display">End of Registry</span>
        </div>
      </main>
    </div>
  );
}
