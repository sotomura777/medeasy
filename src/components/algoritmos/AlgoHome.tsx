import type { AlgoView } from '../../routes/Algoritmos';

interface Props {
  goTo: (v: AlgoView) => void;
}

const ALGORITHMS = [
  {
    id: 'shoulder' as const,
    emoji: '🫀',
    title: 'Dor no Ombro',
    subtitle: 'Algoritmo Clínico — Cuidados Primários',
    desc: 'Algoritmo step-by-step com exame objetivo e diagnósticos diferenciais. Baseado em BMC Primary Care 2021 e AAFP.',
    tags: ['5 passos', 'Exame objetivo', '8 DDx'],
  },
];

export default function AlgoHome({ goTo }: Props) {
  return (
    <div className="algo-home">
      <div className="algo-home-header">
        <h2>Algoritmos Clínicos</h2>
        <p>Algoritmos de diagnóstico interativos — escolhe um problema e segue os passos.</p>
      </div>

      <div className="algo-home-grid">
        {ALGORITHMS.map(a => (
          <button key={a.id} className="algo-home-card" onClick={() => goTo(a.id)}>
            <div className="algo-home-card-icon">{a.emoji}</div>
            <div className="algo-home-card-body">
              <div className="algo-home-card-title">{a.title}</div>
              <div className="algo-home-card-subtitle">{a.subtitle}</div>
              <div className="algo-home-card-desc">{a.desc}</div>
              <div className="algo-home-card-tags">
                {a.tags.map(t => <span key={t} className="algo-home-tag">{t}</span>)}
              </div>
            </div>
            <svg className="algo-home-card-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
