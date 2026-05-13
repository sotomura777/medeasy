import { useState, useMemo } from 'react';

const FIELDS = [
  { id: 'pas', label: 'PA sistólica', options: [
    { v: 3, l: '< 70 mmHg' }, { v: 2, l: '71–80 mmHg' }, { v: 1, l: '81–100 mmHg' },
    { v: 0, l: '101–199 mmHg' }, { v: 2, l: '≥ 200 mmHg' },
  ]},
  { id: 'fc', label: 'Freq. cardíaca', options: [
    { v: 2, l: '≤ 40 bpm' }, { v: 1, l: '41–50 bpm' }, { v: 0, l: '51–100 bpm' },
    { v: 1, l: '101–110 bpm' }, { v: 2, l: '111–129 bpm' }, { v: 3, l: '≥ 130 bpm' },
  ]},
  { id: 'fr', label: 'Freq. respiratória', options: [
    { v: 1, l: '< 9 rpm' }, { v: 0, l: '9–14 rpm' }, { v: 1, l: '15–20 rpm' },
    { v: 2, l: '21–29 rpm' }, { v: 3, l: '≥ 30 rpm' },
  ]},
  { id: 'temp', label: 'Temperatura', options: [
    { v: 2, l: '< 35 °C' }, { v: 0, l: '35–38,4 °C' }, { v: 2, l: '≥ 38,5 °C' },
  ]},
  { id: 'neuro', label: 'Estado neurológico', options: [
    { v: 0, l: 'Alerta' }, { v: 1, l: 'Responde à voz' },
    { v: 2, l: 'Responde à dor' }, { v: 3, l: 'Sem resposta' },
  ]},
];

export default function MewsTool() {
  const [vals, setVals] = useState<Record<string, number>>(
    () => Object.fromEntries(FIELDS.map(f => [f.id, 0]))
  );

  const total = useMemo(() => Object.values(vals).reduce((a, b) => a + b, 0), [vals]);
  const maxV = useMemo(() => Math.max(...Object.values(vals)), [vals]);
  const urgent = total >= 5 || maxV >= 3;
  const moderate = !urgent && total >= 3;

  const levelCls = urgent ? 'danger' : moderate ? 'warn' : 'ok';
  const levelText = urgent ? '⚠ REFERENCIAÇÃO URGENTE' : moderate ? 'Risco moderado — vigiar' : 'Baixo risco';
  const actionText = urgent
    ? 'Score ≥ 5 ou item isolado ≥ 3. Encaminhar ao hospital imediatamente com relatório clínico. Considerar Via Verde Sépsis.'
    : moderate
    ? 'Monitorizar de perto. Reavaliação em 1–2h. Considerar referenciação se agravamento.'
    : 'Monitorização habitual. Sem necessidade de referenciação urgente com base no MEWS.';

  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">📊</span>
        <div className="atb-detail-title">Score MEWS — Deteção Precoce de Gravidade</div>
        <div className="atb-detail-meta">Modified Early Warning Score · Subbe et al. 2001 · Via Verde Sépsis DGS 2016</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-red">Score ≥ 5 ou item ≥ 3 → referenciação urgente</span>
          <span className="atb-tag atb-tag-blue">Independente da etiologia</span>
        </div>
      </div>

      <div className="atb-alert atb-alert-danger">
        <span className="atb-alert-icon">⚠</span>
        <div><strong>Referenciação hospitalar urgente</strong> se score total ≥ 5 ou qualquer parâmetro isolado ≥ 3. Acompanhar com relatório clínico ao médico de urgência.</div>
      </div>

      {/* Reference table */}
      <div className="atb-section">
        <div className="atb-section-head">
          <span className="atb-pill atb-pill-blue">Tabela de referência</span>
          <span className="atb-section-name">Pontuação por parâmetro vital</span>
        </div>
        <div className="atb-table-wrap">
          <table className="atb-mews-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th className="atb-th-3">3</th><th className="atb-th-2">2</th><th className="atb-th-1">1</th>
                <th>0</th>
                <th className="atb-th-1">1</th><th className="atb-th-2">2</th><th className="atb-th-3">3</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>PA sistólica (mmHg)</td><td className="ms3">&lt;70</td><td className="ms2">71–80</td><td className="ms1">81–100</td><td className="ms0">101–199</td><td className="msn">—</td><td className="ms2">≥200</td><td className="msn">—</td></tr>
              <tr><td>Freq. cardíaca (bpm)</td><td className="msn">—</td><td className="ms2">≤40</td><td className="ms1">41–50</td><td className="ms0">51–100</td><td className="ms1">101–110</td><td className="ms2">111–129</td><td className="ms3">≥130</td></tr>
              <tr><td>Freq. respiratória (rpm)</td><td className="msn">—</td><td className="msn">—</td><td className="ms1">&lt;9</td><td className="ms0">9–14</td><td className="ms1">15–20</td><td className="ms2">21–29</td><td className="ms3">≥30</td></tr>
              <tr><td>Temperatura (°C)</td><td className="msn">—</td><td className="ms2">&lt;35</td><td className="msn">—</td><td className="ms0">35–38,4</td><td className="msn">—</td><td className="ms2">≥38,5</td><td className="msn">—</td></tr>
              <tr><td>Estado neurológico</td><td className="msn">—</td><td className="msn">—</td><td className="msn">—</td><td className="ms0">Alerta</td><td className="ms1">Resp. voz</td><td className="ms2">Resp. dor</td><td className="ms3">Sem resp.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="atb-rule" />

      {/* Calculator */}
      <div className="atb-section">
        <div className="atb-section-head">
          <span className="atb-pill atb-pill-green">Calculadora interativa</span>
          <span className="atb-section-name">Introduzir os valores do doente</span>
        </div>
        <div className="atb-card">
          <div className="atb-mews-form">
            {FIELDS.map(f => (
              <div key={f.id} className="atb-mf-field">
                <label>{f.label}</label>
                <select value={vals[f.id]} onChange={e => setVals(p => ({ ...p, [f.id]: Number(e.target.value) }))}>
                  {f.options.map((o, i) => (
                    <option key={i} value={o.v}>{o.l}{o.v === 0 ? ' ✓' : ''}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className={`atb-mews-result atb-mews-${levelCls}`}>
            <div className="atb-mews-score">{total}</div>
            <div className="atb-mews-interp">
              <strong>{levelText}</strong>
              <span>{actionText}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
