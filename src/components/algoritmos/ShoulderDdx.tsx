import { useState } from 'react';
import { DDX_DATA } from '../../content/algoritmos/shoulder-data';

export default function ShoulderDdx() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div>
      <div className="algo-sh-ddx-header">
        <h2>Diagnósticos Diferenciais</h2>
        <p>Clicar em cada diagnóstico para expandir características clínicas. Baseado em BMC Primary Care (2021) e AAFP.</p>
      </div>

      <div className="algo-sh-ddx-grid">
        {DDX_DATA.map((d, i) => (
          <button
            key={i}
            className={`algo-sh-ddx-card${expanded.has(i) ? ' expanded' : ''}`}
            onClick={() => toggle(i)}
          >
            <div className="algo-sh-ddx-card-header">
              <div className={`algo-sh-ddx-icon ${d.iconClass}`}>{d.icon}</div>
              <div>
                <div className="algo-sh-ddx-title">{d.title}</div>
                <div className="algo-sh-ddx-subtitle">{d.subtitle}</div>
              </div>
            </div>
            <div className="algo-sh-ddx-tags">
              {d.tags.map((t, j) => <span key={j} className={`algo-sh-ddx-tag ${t.cls}`}>{t.label}</span>)}
            </div>
            {expanded.has(i) && (
              <div className="algo-sh-ddx-body">
                {d.features.map((f, j) => (
                  <div key={j} className="algo-sh-ddx-feature">
                    <span className="algo-sh-feature-key">{f.key}</span>
                    <span className="algo-sh-feature-val">{f.val}</span>
                  </div>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
