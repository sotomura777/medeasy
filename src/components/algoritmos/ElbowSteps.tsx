import { useState, useCallback } from 'react';
import { STEPS, SIDEBAR_LABELS, DDX_DATA, buildElbowResult } from '../../content/algoritmos/elbow-data';
import type { ElbowResultData, DdxApproach } from '../../content/algoritmos/elbow-data';

const APPROACH_LABELS: { key: keyof DdxApproach; icon: string; title: string }[] = [
  { key: 'immediate', icon: '🩺', title: 'Primeira abordagem' },
  { key: 'home', icon: '🏠', title: 'Orientações ao doente' },
  { key: 'exams', icon: '🩻', title: 'Exames a pedir' },
  { key: 'refer', icon: '🔀', title: 'Quando referenciar' },
  { key: 'benign', icon: '🔎', title: 'Diagnósticos a não esquecer' },
];

function ApproachPanel({ approach }: { approach: DdxApproach }) {
  return (
    <div className="algo-sh-approach-grid">
      {APPROACH_LABELS.map(({ key, icon, title }) => {
        const items = approach[key];
        if (!items || items.length === 0) return null;
        return (
          <div key={key} className="algo-sh-res-section">
            <h4>{icon} {title}</h4>
            <ul className="algo-sh-res-list">
              {items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default function ElbowSteps() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultData, setResultData] = useState<ElbowResultData | null>(null);
  const [expandedHyp, setExpandedHyp] = useState<number | null>(null);

  const handleAnswer = useCallback((action: string, currentStep: number) => {
    const newAnswers = { ...answers, [currentStep]: action };
    setAnswers(newAnswers);

    if (action === 'redflag') {
      setResultData(buildElbowResult(newAnswers));
      setStep(STEPS.length);
      return;
    }

    if (currentStep + 1 >= STEPS.length) {
      setResultData(buildElbowResult(newAnswers));
      setStep(STEPS.length);
    } else {
      setStep(currentStep + 1);
    }
  }, [answers]);

  const restart = useCallback(() => {
    setStep(0);
    setAnswers({});
    setResultData(null);
    setExpandedHyp(null);
  }, []);

  return (
    <div className="algo-sh-grid">
      <div className="algo-sh-sidebar">
        <h3>Progresso</h3>
        {SIDEBAR_LABELS.map((label, i) => (
          <div key={i}>
            {i > 0 && <div className="algo-sh-connector" />}
            <div className={`algo-sh-step-item${i < step ? ' done' : ''}${i === step ? ' current' : ''}`}>
              <div className="algo-sh-step-dot">{i < step ? '✓' : i + 1}</div>
              <div className="algo-sh-step-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="algo-sh-question-area">
        {!resultData && step < STEPS.length && (() => {
          const s = STEPS[step]!;
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

        {resultData && (
          <div className="algo-sh-result-card">
            <div className="algo-sh-narrative">
              <p>{resultData.narrative}</p>
            </div>

            {resultData.alert && (
              <div className={`algo-sh-urgency ${resultData.alert.type === 'red' ? 'ub-red' : 'ub-orange'}`}>
                {resultData.alert.text}
              </div>
            )}

            <div className="algo-sh-hyp-list">
              <div className="algo-sh-hyp-title">Hipóteses por ordem de probabilidade</div>
              {resultData.hypotheses.map((h, i) => {
                const ddx = DDX_DATA.find(d => d.id === h.id);
                const isOpen = expandedHyp === i;
                return (
                  <div key={i} className={`algo-sh-hyp-card${isOpen ? ' open' : ''}`}>
                    <button className="algo-sh-hyp-header" onClick={() => setExpandedHyp(isOpen ? null : i)}>
                      <div>
                        <div className="algo-sh-hyp-label">{h.label}</div>
                        <div className="algo-sh-hyp-prob">{h.prob}</div>
                      </div>
                      <span className="algo-sh-test-toggle">▾</span>
                    </button>
                    {isOpen && ddx && (
                      <div className="algo-sh-hyp-body">
                        <ApproachPanel approach={ddx.approach} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button className="algo-sh-restart" onClick={restart}>↩ Recomeçar algoritmo</button>
          </div>
        )}
      </div>
    </div>
  );
}
