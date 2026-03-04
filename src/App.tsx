import { useState, useCallback, useEffect } from 'react';
import LandingView from './views/LandingView';
import HousesView from './views/HousesView';
import CharacterView from './views/CharacterView';
import TreeView from './views/TreeView';
import TalesView from './views/TalesView';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';

export type ViewState = 'landing' | 'houses' | 'character' | 'tree' | 'tales';
export type TabId = 'landing' | 'houses' | 'tree' | 'tales';

export interface NavigationState {
  view: ViewState;
  houseId?: string;
  characterId?: string;
}

export default function App() {
  const [nav, setNav] = useState<NavigationState>({ view: 'landing' });
  const [spoilerMode, setSpoilerMode] = useState(false);
  const [history, setHistory] = useState<NavigationState[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>('landing');

  // In-app navigation (character cards, house cards, etc.) — preserves activeTab
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

  // Top-level tab navigation (bottom nav / side nav) — clears history, updates activeTab
  const navigateToTab = useCallback((tab: TabId) => {
    setHistory([]);
    setActiveTab(tab);
    setNav({ view: tab });
  }, []);

  const canGoBack = history.length > 0;

  // Scroll to top on every navigation change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nav]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light text-ink overflow-x-hidden max-w-md md:max-w-2xl mx-auto lg:mx-0 lg:max-w-none lg:w-[calc(100%-16rem)] xl:w-[calc(100%-18rem)] shadow-2xl border-x border-parchment-dark font-body lg:ml-64 xl:ml-72">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-paper-texture z-0 mix-blend-multiply"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        {nav.view === 'landing' && (
          <LandingView
            onNavigate={navigateToTab}
            onNavigateTo={navigate}
            spoilerMode={spoilerMode}
            setSpoilerMode={setSpoilerMode}
          />
        )}
        {nav.view === 'houses' && (
          <HousesView
            onNavigate={navigateToTab}
            onNavigateTo={navigate}
            goBack={goBack}
            canGoBack={canGoBack}
            spoilerMode={spoilerMode}
            setSpoilerMode={setSpoilerMode}
          />
        )}
        {nav.view === 'character' && (
          <CharacterView
            characterId={nav.characterId || 'jon-snow'}
            onNavigate={navigateToTab}
            onNavigateTo={navigate}
            goBack={goBack}
            canGoBack={canGoBack}
            spoilerMode={spoilerMode}
            setSpoilerMode={setSpoilerMode}
          />
        )}
        {nav.view === 'tree' && (
          <TreeView
            houseId={nav.houseId || 'stark'}
            onNavigateTo={navigate}
            goBack={goBack}
            canGoBack={canGoBack}
            spoilerMode={spoilerMode}
            setSpoilerMode={setSpoilerMode}
          />
        )}
        {nav.view === 'tales' && (
          <TalesView
            onNavigateTo={navigate}
            spoilerMode={spoilerMode}
            setSpoilerMode={setSpoilerMode}
          />
        )}
      </div>

      <SideNav activeTab={activeTab} onNavigate={navigateToTab} spoilerMode={spoilerMode} setSpoilerMode={setSpoilerMode} />
      <BottomNav activeTab={activeTab} onNavigate={navigateToTab} />
    </div>
  );
}
