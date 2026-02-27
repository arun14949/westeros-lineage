import { NavigationState } from '../App';
import { getHouse, characters, type TreeNode, type House } from '../data';

interface TreeViewProps {
  houseId: string;
  onNavigateTo: (nav: NavigationState) => void;
  goBack: () => void;
  spoilerMode: boolean;
  setSpoilerMode: (mode: boolean) => void;
}

const houseTextColor: Record<string, string> = {
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

const houseBgColor: Record<string, string> = {
  stark: 'bg-stark',
  targaryen: 'bg-targaryen',
  lannister: 'bg-lannister',
  baratheon: 'bg-baratheon',
  greyjoy: 'bg-greyjoy',
  tyrell: 'bg-tyrell',
  martell: 'bg-martell',
  arryn: 'bg-arryn',
  tully: 'bg-tully',
};

export default function TreeView({ houseId, onNavigateTo, goBack, spoilerMode, setSpoilerMode }: TreeViewProps) {
  const house = getHouse(houseId);
  if (!house) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div>
          <span className="material-symbols-outlined text-5xl text-ink-light/30 mb-4 block">error</span>
          <p className="font-display text-ink-light">House not found</p>
          <button onClick={goBack} className="mt-4 text-primary font-display text-sm underline">Go back</button>
        </div>
      </div>
    );
  }

  const textColor = houseTextColor[house.color] || 'text-primary';
  const bgColor = houseBgColor[house.color] || 'bg-primary';

  return (
    <div className="flex-1 flex flex-col pb-20 lg:pb-6 xl:pb-4">
      <header className="sticky top-0 z-20 bg-background-light/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-ink/5">
        <button onClick={goBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-ink/5 transition-colors text-ink">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <span className={`text-lg font-bold font-display ${textColor}`}>{house.name}</span>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col relative px-4 md:px-6 lg:px-10 xl:px-12 2xl:px-16 py-6 overflow-x-auto overflow-y-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6 min-w-max">
          <div className="text-center flex-1">
            <h2 className="text-[10px] uppercase tracking-widest text-ink-light font-display font-bold mb-1">The Lineage Of</h2>
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-display italic text-ink mb-2">{house.name}</h1>
            <div className={`w-12 h-1 ${bgColor}/20 mx-auto mb-3 rounded-full`}></div>
            <p className="text-xs text-ink-light font-body max-w-[280px] mx-auto leading-relaxed">{house.description}</p>
            <p className={`text-[11px] ${textColor} font-display font-semibold mt-2 italic`}>"{house.motto}"</p>
          </div>
          <div className="flex flex-col items-center gap-1 absolute right-4 top-0">
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
            <span className="text-[10px] font-display text-ink-light">Spoilers</span>
          </div>
        </div>

        {/* Tree - centered with horizontal scroll */}
        <div className="flex justify-center min-w-max pb-6">
          <TreeNodeComponent
            node={house.tree}
            house={house}
            textColor={textColor}
            bgColor={bgColor}
            spoilerMode={spoilerMode}
            onCharacterClick={(id) => onNavigateTo({ view: 'character', characterId: id })}
            isRoot
          />
        </div>

        {/* Members List */}
        <div className="mt-6 mb-4">
          <h3 className="font-display text-center text-sm uppercase tracking-[0.2em] text-primary/70 mb-5 font-bold flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-primary/20"></span>
            All Members
            <span className="h-px w-8 bg-primary/20"></span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {house.memberIds.map(id => {
              const char = characters[id];
              if (!char) return null;
              return (
                <button
                  key={id}
                  onClick={() => onNavigateTo({ view: 'character', characterId: id })}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-parchment transition-colors group"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-parchment to-parchment-dark border-2 border-parchment-dark group-hover:border-primary/30 transition-colors flex items-center justify-center">
                      <span className={`material-symbols-outlined text-2xl ${textColor} opacity-60`}>person</span>
                    </div>
                    {spoilerMode && char.isDead && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-crimson rounded-full flex items-center justify-center border border-white">
                        <span className="material-symbols-outlined text-white text-[8px]">skull</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-display font-bold text-ink leading-tight group-hover:text-primary transition-colors">{char.name.split(' ')[0]}</div>
                    {char.alias && <div className="text-[9px] text-ink-light italic">{char.alias}</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-20"></div>
      </main>
    </div>
  );
}

interface TreeNodeProps {
  node: TreeNode;
  house: House;
  textColor: string;
  bgColor: string;
  spoilerMode: boolean;
  onCharacterClick: (id: string) => void;
  isRoot?: boolean;
}

function TreeNodeComponent(props: TreeNodeProps) {
  const { node, house, textColor, bgColor, spoilerMode, onCharacterClick, isRoot = false } = props;
  const char = characters[node.characterId];
  const spouse = node.spouse ? characters[node.spouse] : null;

  if (!char) return null;

  const hasChildren = node.children && node.children.length > 0;
  const childCount = node.children?.length || 0;

  return (
    <div className="flex flex-col items-center">
      {/* Current Node + Spouse */}
      <div className="flex items-center gap-2 relative z-10">
        {/* Main Character Card */}
        <button
          onClick={() => onCharacterClick(char.id)}
          className={`${isRoot ? 'bg-white shadow-md' : 'bg-parchment/50 shadow-sm'} p-3 rounded-xl border border-parchment-dark flex flex-col items-center w-24 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group`}
        >
          <div className="relative mb-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-parchment to-parchment-dark border-2 border-ink/10 group-hover:border-primary/40 transition-colors flex items-center justify-center">
              <span className={`material-symbols-outlined text-3xl ${textColor} opacity-60`}>person</span>
            </div>
            {spoilerMode && char.isDead && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-crimson rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <span className="material-symbols-outlined text-white text-[10px]">skull</span>
              </div>
            )}
          </div>
          <h3 className="font-display font-bold text-ink text-xs text-center leading-tight group-hover:text-primary transition-colors">{char.name.split(' ')[0]}</h3>
          {char.alias && <p className="text-[8px] text-ink-light/70 italic mt-0.5">{char.alias}</p>}
          <p className="text-[8px] text-ink-light font-body italic mt-0.5 text-center leading-tight line-clamp-1">{char.title.split(',')[0]}</p>
        </button>

        {/* Spouse */}
        {spouse && (
          <>
            <div className="flex items-center gap-1">
              <div className="w-3 h-px bg-ink/20"></div>
              <span className="text-[8px] text-ink-light/50 italic">m.</span>
              <div className="w-3 h-px bg-ink/20"></div>
            </div>
            <button
              onClick={() => onCharacterClick(spouse.id)}
              className="bg-parchment/30 p-2.5 rounded-xl border border-parchment-dark/50 flex flex-col items-center w-20 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="relative mb-1.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-parchment to-parchment-dark border-2 border-ink/10 group-hover:border-primary/40 transition-colors flex items-center justify-center">
                  <span className={`material-symbols-outlined text-2xl ${textColor} opacity-60`}>person</span>
                </div>
                {spoilerMode && spouse.isDead && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-crimson rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <span className="material-symbols-outlined text-white text-[8px]">skull</span>
                  </div>
                )}
              </div>
              <h3 className="font-display font-bold text-ink text-[10px] text-center leading-tight group-hover:text-primary transition-colors">{spouse.name.split(' ')[0]}</h3>
              <p className="text-[7px] text-ink-light font-body italic mt-0.5 text-center leading-tight line-clamp-1">{spouse.title.split(',')[0]}</p>
            </button>
          </>
        )}
      </div>

      {/* Children */}
      {hasChildren && (
        <>
          {/* Vertical line down from parent */}
          <div className="w-px h-8 bg-ink/20"></div>

          {/* Horizontal connector line */}
          {childCount > 1 ? (
            <div className="relative flex justify-center" style={{ width: `${childCount * 112}px` }}>
              {/* Horizontal line */}
              <div className="absolute top-0 h-px bg-ink/20" style={{ left: '56px', right: '56px' }}></div>
              {/* Vertical drops to each child */}
              {node.children!.map((_, idx) => {
                const leftOffset = 56 + (idx * 112);
                return (
                  <div
                    key={idx}
                    className="absolute top-0 w-px h-8 bg-ink/20"
                    style={{ left: `${leftOffset}px` }}
                  ></div>
                );
              })}
              <div className="h-8"></div>
            </div>
          ) : (
            <div className="w-px h-8 bg-ink/20"></div>
          )}

          {/* Children Row */}
          <div className="flex gap-4">
            {node.children!.map((child) => (
              <TreeNodeComponent
                key={child.characterId}
                node={child}
                house={house}
                textColor={textColor}
                bgColor={bgColor}
                spoilerMode={spoilerMode}
                onCharacterClick={onCharacterClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
