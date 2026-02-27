import { useState, useCallback } from 'react';
import LandingView from './views/LandingView';
import HousesView from './views/HousesView';
import CharacterView from './views/CharacterView';
import TreeView from './views/TreeView';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';

export type ViewState = 'landing' | 'houses' | 'character' | 'tree';

export interface NavigationState {
  view: ViewState;
  houseId?: string;
  characterId?: string;
}

export default function App() {
  const [nav, setNav] = useState<NavigationState>({ view: 'landing' });
  const [spoilerMode, setSpoilerMode] = useState(false);
  const [history, setHistory] = useState<NavigationState[]>([]);

  const navigate = useCallback((next: NavigationState) => {
    setHistory(prev => [...prev, nav]);
    setNav(next);
  }, [nav]);

  const goBack = useCallback(() => {
    setHistory(prev => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) setNav(last);
      return copy;
    });
  }, []);

  const navigateToView = useCallback((view: ViewState) => {
    navigate({ view });
  }, [navigate]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light text-ink overflow-x-hidden max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto lg:mr-0 shadow-2xl border-x border-parchment-dark font-body lg:ml-64 xl:ml-72">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-paper-texture z-0 mix-blend-multiply"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        {nav.view === 'landing' && (
          <LandingView
            onNavigate={navigateToView}
            onNavigateTo={navigate}
          />
        )}
        {nav.view === 'houses' && (
          <HousesView
            onNavigate={navigateToView}
            onNavigateTo={navigate}
            goBack={goBack}
          />
        )}
        {nav.view === 'character' && (
          <CharacterView
            characterId={nav.characterId || 'jon-snow'}
            onNavigate={navigateToView}
            onNavigateTo={navigate}
            goBack={goBack}
            spoilerMode={spoilerMode}
            setSpoilerMode={setSpoilerMode}
          />
        )}
        {nav.view === 'tree' && (
          <TreeView
            houseId={nav.houseId || 'stark'}
            onNavigateTo={navigate}
            goBack={goBack}
            spoilerMode={spoilerMode}
            setSpoilerMode={setSpoilerMode}
          />
        )}
      </div>

      <SideNav currentView={nav.view} onNavigate={navigateToView} />
      <BottomNav currentView={nav.view} onNavigate={navigateToView} />
    </div>
  );
}
