import { useState, useCallback } from 'react';
import { STEPS, RESULTS, FINDING_TAGS } from '../../content/algoritmos/shoulder-data';

function determineResult(findings: string[]): string {
  if (findings.includes('radicular')) return 'radicular';
  if (findings.includes('capsulite')) return 'capsulite';
  if (findings.includes('ac')) return 'acjoint';
  if (findings.includes('biceps')) return 'biceps';
  if (findings.includes('impingement')) return 'impingement';
  if (findings.includes('trauma') && !findings.includes('overuse')) return 'trauma';
  return 'impingement';
}

export default function ShoulderSteps() {
  const [step, setStep] = useState(0);
  const [findings, setFindings] = useState<string[]>([]);
  const [resultKey, setResultKey] = useState<string | null>(null);

  const handleAnswer = useCallback((action: string, currentStep: number) => {
    if (action === 'redflag') {
      setResultKey('redflag');
      setStep(5);
      return;
    }
    const newFindings = [...findings];
    const mapping: Record<string, string> = {
      capsulitis: 'capsulite', impingement: 'impingement', biceps: 'biceps',
      acjoint: 'ac', radicular: 'radicular', trauma: 'trauma',
      overuse: 'overuse', chronic: 'chronic',
    };
    if (mapping[action]) newFindings.push(mapping[action]);
    setFindings(newFindings);

    if (currentStep + 1 >= STEPS.length) {
      setResultKey(determineResult(newFindings));
      setStep(5);
    } else {
      setStep(currentStep + 1);
    }
  }, [findings]);

  const restart = useCallback(() => {
    setStep(0);
    setFindings([]);
    setResultKey(null);
  }, []);

  const result = resultKey ? RESULTS[resultKey] : null;

  return (
    <div className="algo-sh-grid">
      {/* Sidebar */}
      <div className="algo-sh-sidebar">
        <h3>Progresso</h3>
        {['Red Flags', 'Trauma?', 'Início & Duração', 'Limitação ROM', 'Localização da Dor', 'Resultado'].map((label, i) => (
          <div key={i}>
            {i > 0 && <div className="algo-sh-connector" />}
            <div className={`algo-sh-step-item${i < step ? ' done' : ''}${i === step ? ' current' : ''}`}>
              <div className="algo-sh-step-dot">{i < step ? '✓' : i + 1}</div>
              <div className="algo-sh-step-label">{label}</div>
            </div>
          </div>
        ))}

        {resultKey && (
          <div className="algo-sh-summary">
            <div className="algo-sh-summary-title">Suspeitas</div>
            <div className="algo-sh-summary-tags">
              {findings.map((f, i) => {
                const tag = FINDING_TAGS[f];
                return tag ? <span key={i} className={`algo-sh-result-tag ${tag[0]}`}>{tag[1]}</span> : null;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Question / Result area */}
      <div className="algo-sh-question-area">
        {(() => {
          const s = !result ? STEPS[step] : undefined;
          if (!s) return null;
          return (
            <div className="algo-sh-qcard">
              <div className="algo-sh-q-step">Passo {step + 1} de {STEPS.length}</div>
              <div className="algo-sh-q-title">{s.title}</div>
              <div className="algo-sh-q-subtitle">{s.subtitle}</div>
              <div className="algo-sh-options">
                {s.options.map((o, i) => (
                  <button
                    key={i}
                    className={`algo-sh-option${o.cls ? ` ${o.cls}` : ''}`}
                    onClick={() => handleAnswer(o.action, step)}
                  >
                    <span className="algo-sh-opt-icon">{o.icon}</span>
                    <span className="algo-sh-opt-title">{o.title}</span>
                    <span className="algo-sh-opt-desc">{o.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })()}

        {result && (
          <div className="algo-sh-result-card">
            <div className="algo-sh-result-header">
              <div className={`algo-sh-result-icon ${result.iconClass}`}>{result.icon}</div>
              <div>
                <h3>{result.title}</h3>
                <div className="algo-sh-result-sub">{result.subtitle}</div>
              </div>
            </div>
            <div className={`algo-sh-urgency ${result.urgency}`}>{result.urgencyText}</div>
            <div className="algo-sh-result-sections">
              {result.sections.map((sec, i) => (
                <div key={i} className="algo-sh-res-section">
                  <h4>{sec.title}</h4>
                  <ul className={`algo-sh-res-list${sec.type ? ` ${sec.type}` : ''}`}>
                    {sec.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <button className="algo-sh-restart" onClick={restart}>↩ Recomeçar algoritmo</button>
          </div>
        )}
      </div>
    </div>
  );
}
