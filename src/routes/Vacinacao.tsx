import { useState, useCallback } from 'react';
import BackBar from '../components/layout/BackBar';
import VacHome from '../components/vacinacao/VacHome';
import VacMatrix from '../components/vacinacao/VacMatrix';
import VacChildPnv from '../components/vacinacao/VacChildPnv';
import VacAdultPnv from '../components/vacinacao/VacAdultPnv';
import VacChildExtra from '../components/vacinacao/VacChildExtra';
import VacAdultExtra from '../components/vacinacao/VacAdultExtra';
import VacTravel from '../components/vacinacao/VacTravel';
import VacRegionDetail from '../components/vacinacao/VacRegionDetail';

export type VacView =
  | 'home'
  | 'matrix'
  | 'child-pnv'
  | 'adult-pnv'
  | 'child-extra'
  | 'adult-extra'
  | 'travel'
  | 'region-detail';

export default function Vacinacao() {
  const [view, setView] = useState<VacView>('home');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const goTo = useCallback((v: VacView) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openRegion = useCallback((regionId: string) => {
    setSelectedRegion(regionId);
    setView('region-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="vac-scope">
      {view !== 'home' && (
        <BackBar label="Vacinacao" />
      )}

      {view === 'home' && <VacHome goTo={goTo} />}
      {view === 'matrix' && <VacMatrix onBack={() => goTo('home')} />}
      {view === 'child-pnv' && <VacChildPnv onBack={() => goTo('home')} />}
      {view === 'adult-pnv' && <VacAdultPnv onBack={() => goTo('home')} />}
      {view === 'child-extra' && <VacChildExtra onBack={() => goTo('home')} />}
      {view === 'adult-extra' && <VacAdultExtra onBack={() => goTo('home')} />}
      {view === 'travel' && <VacTravel onBack={() => goTo('home')} onSelectRegion={openRegion} />}
      {view === 'region-detail' && selectedRegion && (
        <VacRegionDetail regionId={selectedRegion} onBack={() => goTo('travel')} />
      )}
    </div>
  );
}
