import { useState, useMemo } from 'react';
import { PED_DRUGS, PED_DRUG_GROUPS } from '../../content/antibio/data';

export default function PedCalcTool() {
  const [peso, setPeso] = useState('');
  const [atb, setAtb] = useState('');

  const result = useMemo(() => {
    const w = parseFloat(peso);
    if (!atb || !w || w < 2 || w > 80) return null;
    const d = PED_DRUGS[atb];
    if (!d) return null;
    const doseDia = Math.min(d.dose * w, d.max);
    const doseToma = doseDia / d.split;
    const maxed = d.dose * w > d.max;
    const m = d.avail.match(/(\d+)\s*mg\/5ml/);
    const suspVol = m?.[1] ? (doseToma / parseFloat(m[1])) * 5 : null;
    const suspConc = m?.[1] ? parseFloat(m[1]) : null;
    return { d, doseDia, doseToma, maxed, suspVol, suspConc, w };
  }, [peso, atb]);

  const weightError = peso && (parseFloat(peso) < 2 || parseFloat(peso) > 80);

  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">🧒</span>
        <div className="atb-detail-title">Calculadora de Doses Pediátricas</div>
        <div className="atb-detail-meta">Guia de Bolso PAPA ARS LVT Ed. 1.3 · doses baseadas no peso corporal</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-blue">Doses máximas aplicadas automaticamente</span>
          <span className="atb-tag atb-tag-amber">Confirmar sempre com o RCM</span>
        </div>
      </div>

      <div className="atb-section">
        <div className="atb-section-head">
          <span className="atb-pill atb-pill-blue">Cálculo por peso</span>
          <span className="atb-section-name">Introduzir peso e selecionar antibiótico</span>
        </div>
        <div className="atb-calc-layout">
          <div className="atb-calc-form">
            <div className="atb-calc-field">
              <label>Peso da criança (kg)</label>
              <input type="number" placeholder="ex: 18" min={1} max={80} step={0.1} value={peso} onChange={e => setPeso(e.target.value)} />
            </div>
            <div className="atb-calc-field">
              <label>Antibiótico</label>
              <select value={atb} onChange={e => setAtb(e.target.value)}>
                <option value="">— Selecionar —</option>
                {PED_DRUG_GROUPS.map(g => (
                  <optgroup key={g.label} label={g.label}>
                    {g.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            <p className="atb-calc-note">Doses empíricas baseadas no peso. Confirmar sempre com o RCM.</p>
          </div>

          <div className="atb-calc-output">
            {weightError && (
              <div className="atb-card atb-calc-error">Peso fora do intervalo (2–80 kg). Consulte um farmacêutico.</div>
            )}

            {!result && !weightError && (
              <div className="atb-calc-empty">
                <div className="atb-calc-empty-icon">⚕</div>
                <div>Introduza o peso e selecione o antibiótico para calcular.</div>
              </div>
            )}

            {result && (
              <>
                <div className="atb-card atb-calc-result-main">
                  <div className="atb-star-label">Resultado do cálculo</div>
                  <div className="atb-calc-drug-name">{result.d.name}</div>
                  <div className="atb-calc-dose-val">{result.doseToma.toFixed(1)} mg / toma</div>
                  <div className="atb-calc-detail">Dose diária total: <strong>{result.doseDia.toFixed(1)} mg/dia</strong>{result.maxed ? ' — dose máxima aplicada' : ''}</div>
                  <div className="atb-calc-detail">Frequência: <strong>{result.d.freq}</strong>{result.d.split > 1 ? ` — ${result.d.split} tomas/dia` : ''}</div>
                  <div className="atb-calc-detail">Formulação: {result.d.avail}</div>
                  {result.maxed && <div className="atb-calc-warn">⚠ Dose máxima atingida — não aumentar.</div>}
                  <div className="atb-calc-indication">{result.d.note}</div>
                </div>

                {result.suspVol !== null && (
                  <div className="atb-card atb-calc-susp">
                    <div className="atb-calc-susp-label">Volume de suspensão — {result.suspConc} mg / 5 ml</div>
                    <div className="atb-calc-dose-val">{result.suspVol.toFixed(1)} ml / toma</div>
                    <div className="atb-calc-detail">Agitar o frasco antes de usar. Usar seringa de 1 ml ou copo medidor.</div>
                  </div>
                )}

                <div className="atb-calc-meta">
                  Peso: <strong>{result.w} kg</strong> · Base: {result.d.dose} mg/kg/dia · Máx: {result.d.max} mg{result.d.split > 1 ? '/dia' : ''}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="atb-rule" />

      <div className="atb-alert atb-alert-warn">
        <span className="atb-alert-icon">⚠</span>
        <div><strong>Duração OMA por idade:</strong> &lt;2 anos ou OMA recorrente → <strong>7 dias</strong>. ≥2 anos sem recorrência → <strong>5 dias</strong>.</div>
      </div>
    </>
  );
}
