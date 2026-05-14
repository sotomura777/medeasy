import { useState } from 'react';
import ElbowSteps from './ElbowSteps';
import ElbowExam from './ElbowExam';
import ElbowDdx from './ElbowDdx';

type Tab = 'algo' | 'exam' | 'ddx';

interface Props {
  onBack: () => void;
}

export default function ElbowAlgo({ onBack }: Props) {
  const [tab, setTab] = useState<Tab>('algo');

  return (
    <div className="algo-shoulder">
      <div className="algo-sh-header">
        <div className="algo-sh-header-left">
          <button className="algo-sh-back" onClick={onBack} aria-label="Voltar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="algo-sh-icon">💪</div>
          <div>
            <h2>Dor no <span>Cotovelo</span></h2>
            <div className="algo-sh-sub">Algoritmo Clínico — Cuidados Primários</div>
          </div>
        </div>
        <span className="algo-sh-badge">v1.0 · Evidence-Based</span>
      </div>

      <div className="algo-sh-tabs">
        <button className={`algo-sh-tab${tab === 'algo' ? ' active' : ''}`} onClick={() => setTab('algo')}>🔍 Algoritmo</button>
        <button className={`algo-sh-tab${tab === 'exam' ? ' active' : ''}`} onClick={() => setTab('exam')}>🤲 Exame Objetivo</button>
        <button className={`algo-sh-tab${tab === 'ddx' ? ' active' : ''}`} onClick={() => setTab('ddx')}>📋 Diagnósticos Diferenciais</button>
      </div>

      <div className="algo-sh-main">
        {tab === 'algo' && <ElbowSteps />}
        {tab === 'exam' && <ElbowExam />}
        {tab === 'ddx' && <ElbowDdx />}

        <div className="algo-sh-sources">
          <strong>📚 Fontes:</strong>{' '}
          UpToDate — Evaluation of elbow pain · AAFP — Common Elbow Injuries · PMC — Cubital Tunnel Syndrome Review · Orthobullets — Lateral Epicondylitis · BMJ Best Practice — Elbow assessment
        </div>
      </div>
    </div>
  );
}
