import { useState, useMemo } from 'react';
import { DRUG_LIST, CROSS_MATRIX, RISK_LABELS, DRUG_GROUPS } from '../../content/antibio/data';
import type { RiskLevel } from '../../content/antibio/data';

export default function AllergyTool() {
  const [allergen, setAllergen] = useState('');

  const groups = useMemo(() => {
    if (!allergen) return null;
    const matrix = CROSS_MATRIX[allergen];
    if (!matrix) return null;
    const safe: { name: string; risk: Exclude<RiskLevel, 'same'> }[] = [];
    const caution: typeof safe = [];
    const avoid: typeof safe = [];
    for (const [drug, risk] of Object.entries(matrix)) {
      if (risk === 'same') continue;
      const name = DRUG_LIST[drug] ?? drug;
      const r = risk as Exclude<RiskLevel, 'same'>;
      if (r === 'ok') safe.push({ name, risk: r });
      else if (r === 'x1') caution.push({ name, risk: r });
      else avoid.push({ name, risk: r });
    }
    return { safe, caution, avoid };
  }, [allergen]);

  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">⚠️</span>
        <div className="atb-detail-title">Hipersensibilidade a Beta-Lactâmicos</div>
        <div className="atb-detail-meta">Flowchart BC Provincial PACE Group — adaptado UR-PPCIRA LVT · Guia PAPA Ed. 1.3</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-amber">Maioria das reações não é verdadeira alergia</span>
          <span className="atb-tag atb-tag-blue">Identificação incorreta tem consequências clínicas</span>
        </div>
      </div>

      <div className="atb-alert atb-alert-warn">
        <span className="atb-alert-icon">⚠</span>
        <div><strong>Porquê identificar corretamente?</strong> A identificação incorreta obriga a antibióticos de espectro mais alargado, aumentando resistências e falência terapêutica. A maioria das reações em idade pediátrica são exantemas virais confundidos com alergia.</div>
      </div>

      {/* Reaction types */}
      <div className="atb-section">
        <div className="atb-section-head">
          <span className="atb-pill atb-pill-blue">Tipos de reação</span>
          <span className="atb-section-name">Classificação e abordagem clínica</span>
        </div>
        <div className="atb-allergy-grid">
          <div className="atb-ac">
            <div className="atb-ac-head atb-ah-red">Tipo I — IgE mediada (imediata)</div>
            <div className="atb-ac-body"><strong>Sinais:</strong> urticária · angioedema · broncoespasmo · anafilaxia. Minutos a horas após administração.<br /><br /><strong>Ação:</strong> Evitar todos os beta-lactâmicos da mesma família. Consultar tabela de reatividade cruzada abaixo.</div>
          </div>
          <div className="atb-ac">
            <div className="atb-ac-head atb-ah-green">Não tipo I — não imediata</div>
            <div className="atb-ac-body"><strong>Sinais:</strong> rash maculopapular não pruriginoso · início &gt;72h · sem anafilaxia · sem envolvimento de mucosas.<br /><br /><strong>Ação:</strong> Pode usar cefalosporinas de 2.ª geração (cefuroxima) com precaução.</div>
          </div>
          <div className="atb-ac">
            <div className="atb-ac-head atb-ah-amber">Suspeitar de falsa alergia se:</div>
            <div className="atb-ac-body">— ATB usado depois sem reação<br />— Identificação por "história familiar"<br />— Sintomas GI, cefaleia ou rash viral em pediatria<br />— Rash &gt;72h, não pruriginoso<br />— Reação a amoxicilina em mononucleose</div>
          </div>
          <div className="atb-ac">
            <div className="atb-ac-head atb-ah-red">Reações graves — EVITAR TODOS</div>
            <div className="atb-ac-body">— Stevens-Johnson / NET<br />— Dermatite esfoliativa<br />— Pustulose exantemática aguda<br />— Anemia hemolítica · nefrite · hepatite<br /><br /><strong>→ Referenciação para imunoalergologia obrigatória.</strong></div>
          </div>
        </div>
      </div>

      <div className="atb-rule" />

      {/* Interactive cross-reactivity */}
      <div className="atb-section">
        <div className="atb-section-head">
          <span className="atb-pill atb-pill-purple">Tabela interativa</span>
          <span className="atb-section-name">Alergia cruzada — Gráfico 1</span>
        </div>

        <div className="atb-alert atb-alert-info">
          <span className="atb-alert-icon">ℹ</span>
          <div><strong>Como usar:</strong> Selecione o antibiótico ao qual o doente reportou reação alérgica. A tabela mostra quais pode prescrever com segurança, quais requerem precaução e quais deve evitar.</div>
        </div>

        <div className="atb-cross-selector">
          <div className="atb-cross-selector-label">Antibiótico com reação reportada pelo doente</div>
          <div className="atb-cross-selector-row">
            <select value={allergen} onChange={e => setAllergen(e.target.value)}>
              <option value="">— Selecionar antibiótico —</option>
              {DRUG_GROUPS.map(g => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </optgroup>
              ))}
            </select>
            {allergen && <button className="atb-cross-clear" onClick={() => setAllergen('')}>Limpar</button>}
          </div>
        </div>

        {!groups && (
          <div className="atb-cross-empty">Selecione o antibiótico ao qual o doente é alérgico para ver a tabela de reatividade cruzada.</div>
        )}

        {groups && (
          <div className="atb-cross-result">
            <div className="atb-cross-legend">
              <span className="atb-cl atb-cl-safe"><span className="atb-cl-sym">✓</span>Seguro</span>
              <span className="atb-cl atb-cl-caution"><span className="atb-cl-sym">X¹</span>Precaução</span>
              <span className="atb-cl atb-cl-avoid"><span className="atb-cl-sym">X²⁻⁵</span>Evitar</span>
            </div>

            <div className="atb-card atb-cross-group atb-cross-safe">
              <div className="atb-star-label">Seguros para prescrever</div>
              <div className="atb-cross-pills">
                {groups.safe.map((d, i) => {
                  const r = RISK_LABELS[d.risk];
                  return <span key={i} className={`atb-cross-pill atb-cp-${r.cls}`}><span className="atb-cp-sym">{r.symbol}</span>{d.name}</span>;
                })}
              </div>
            </div>

            {groups.caution.length > 0 && (
              <div className="atb-card atb-cross-group atb-cross-caution-group">
                <div className="atb-caution-label">Precaução — usar só se necessário</div>
                <div className="atb-cross-pills">
                  {groups.caution.map((d, i) => {
                    const r = RISK_LABELS[d.risk];
                    return <span key={i} className={`atb-cross-pill atb-cp-${r.cls}`}><span className="atb-cp-sym">{r.symbol}</span>{d.name}</span>;
                  })}
                </div>
              </div>
            )}

            {groups.avoid.length > 0 && (
              <div className="atb-card atb-cross-group atb-cross-avoid-group">
                <div className="atb-avoid-label">Evitar / NÃO prescrever</div>
                <div className="atb-cross-pills">
                  {groups.avoid.map((d, i) => {
                    const r = RISK_LABELS[d.risk];
                    return <span key={i} className={`atb-cross-pill atb-cp-${r.cls}`}><span className="atb-cp-sym">{r.symbol}</span>{d.name}</span>;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="atb-alert atb-alert-info">
        <span className="atb-alert-icon">ℹ</span>
        <div>Tabela baseada no Gráfico 1 do Guia de Bolso PAPA ARS LVT, traduzido e adaptado do <em>Flowchart from New Brunswick</em> (BC Provincial PACE Group). * Aplica-se também a combinações com inibidores de beta-lactamases.</div>
      </div>
    </>
  );
}
