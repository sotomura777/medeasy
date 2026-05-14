import { useState } from 'react';
import { DDX_DATA, DDX_GROUP_ORDER } from '../../content/algoritmos/elbow-data';
import type { DdxApproach } from '../../content/algoritmos/elbow-data';

const APPROACH_LABELS: { key: keyof DdxApproach; icon: string; title: string }[] = [
  { key: 'immediate', icon: '🩺', title: 'Primeira abordagem' },
  { key: 'home', icon: '🏠', title: 'Orientações ao doente' },
  { key: 'exams', icon: '🩻', title: 'Exames a pedir' },
  { key: 'refer', icon: '🔀', title: 'Quando referenciar' },
  { key: 'benign', icon: '🔎', title: 'Diagnósticos a não esquecer' },
];

export default function ElbowDdx() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);

  const groups: Record<string, typeof DDX_DATA> = {};
  DDX_DATA.forEach(d => {
    if (!groups[d.group]) groups[d.group] = [];
    groups[d.group]!.push(d);
  });

  return (
    <div>
      <div className="algo-sh-ddx-header">
        <h2>Diagnósticos Diferenciais</h2>
        <p>Clicar em cada diagnóstico para expandir testes clínicos e abordagem. 13 diagnósticos agrupados por frequência e gravidade.</p>
      </div>

      {DDX_GROUP_ORDER.map(group => {
        const items = groups[group];
        if (!items) return null;
        return (
          <div key={group} className="algo-sh-ddx-group">
            <div className="algo-sh-ddx-group-label">{group}</div>
            <div className="algo-sh-ddx-grid">
              {items.map(d => {
                const isOpen = expanded === d.id;
                return (
                  <button
                    key={d.id}
                    className={`algo-sh-ddx-card${isOpen ? ' expanded' : ''}`}
                    onClick={() => toggle(d.id)}
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
                    {isOpen && (
                      <div className="algo-sh-ddx-body">
                        <div className={`algo-sh-urgency ${d.urgency}`} style={{ marginBottom: '12px' }}>
                          {d.urgencyLabel}
                        </div>

                        {d.tests.length > 0 && (
                          <div className="algo-sh-ddx-section">
                            <div className="algo-sh-ddx-section-title">🔍 Testes Clínicos</div>
                            {d.tests.map((t, ti) => (
                              <div key={ti} className="algo-sh-ddx-test-item">
                                <div className="algo-sh-ddx-test-name">{t.name}</div>
                                <div className="algo-sh-ddx-test-how">{t.how}</div>
                                <div className="algo-sh-ddx-test-result pos">✅ {t.pos}</div>
                                <div className="algo-sh-ddx-test-result neg">❌ {t.neg}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {APPROACH_LABELS.map(({ key, icon, title }) => {
                          const list = d.approach[key];
                          if (!list || list.length === 0) return null;
                          return (
                            <div key={key} className="algo-sh-ddx-section">
                              <div className="algo-sh-ddx-section-title">{icon} {title}</div>
                              <ul className="algo-sh-res-list">
                                {list.map((item, j) => <li key={j}>{item}</li>)}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
