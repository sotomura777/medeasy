import { useState, useCallback } from 'react';
import '../styles/algoritmos.css';
import BackBar from '../components/layout/BackBar';
import AlgoHome from '../components/algoritmos/AlgoHome';
import ShoulderAlgo from '../components/algoritmos/ShoulderAlgo';
import ElbowAlgo from '../components/algoritmos/ElbowAlgo';

export type AlgoView = 'home' | 'shoulder' | 'elbow';

export default function Algoritmos() {
  const [view, setView] = useState<AlgoView>('home');

  const goTo = useCallback((v: AlgoView) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="algo-scope">
      {view !== 'home' && <BackBar label="Algoritmos" />}

      {view === 'home' && <AlgoHome goTo={goTo} />}
      {view === 'shoulder' && <ShoulderAlgo onBack={() => goTo('home')} />}
      {view === 'elbow' && <ElbowAlgo onBack={() => goTo('home')} />}
    </div>
  );
}
