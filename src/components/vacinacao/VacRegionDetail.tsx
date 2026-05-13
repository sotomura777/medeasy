import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import VacToolbar from './VacToolbar';
import { TRAVEL_DATA, type TravelVaccine } from '../../content/vacinacao/travel-data';

const PRIORITY_ORDER: Record<string, number> = { required: 0, essential: 1, recommended: 2, specific: 3 };
const PRIORITY_LABEL: Record<string, string> = {
  essential: 'Essencial',
  recommended: 'Recomendada',
  specific: 'Situacoes especificas',
  required: 'Obrigatoria',
};

function countByPriority(vaccines: TravelVaccine[]) {
  const c = { required: 0, essential: 0, recommended: 0, specific: 0 };
  for (const v of vaccines) {
    if (v.priority in c) c[v.priority]++;
  }
  return c;
}

interface Props {
  regionId: string;
  onBack: () => void;
}

export default function VacRegionDetail({ regionId, onBack }: Props) {
  const data = TRAVEL_DATA[regionId];

  const sorted = useMemo(() => {
    if (!data) return [];
    return [...data.vaccines].sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 99) - (PRIORITY_ORDER[b.priority] ?? 99));
  }, [data]);

  if (!data) return null;

  const counts = countByPriority(data.vaccines);

  return (
    <>
      <VacToolbar onBack={onBack} label="Voltar ao mapa" />

      <div className="vac-region-hero" style={{ background: `linear-gradient(135deg, ${data.color}cc 0%, ${data.color}88 100%)` }}>
        <div className="hero-eyebrow">Consulta do viajante</div>
        <h2>{data.name}</h2>
        <p className="hero-sub">{data.sub}</p>
        <div className="hero-stats">
          <span className="stat"><span className="stat-num">{data.vaccines.length}</span> vacinas / medidas</span>
          {counts.required > 0 && (
            <span className="stat" style={{ background: '#f4a261', color: '#4a2a10' }}>
              <span className="stat-num" style={{ color: '#4a2a10' }}>{counts.required}</span> obrigatorias
            </span>
          )}
          {counts.essential > 0 && (
            <span className="stat" style={{ background: '#ffe0d4', color: '#a14b34' }}>
              <span className="stat-num" style={{ color: '#a14b34' }}>{counts.essential}</span> essenciais
            </span>
          )}
          {counts.recommended > 0 && (
            <span className="stat" style={{ background: '#fef5c4', color: '#8a7314' }}>
              <span className="stat-num" style={{ color: '#8a7314' }}>{counts.recommended}</span> recomendadas
            </span>
          )}
          {counts.specific > 0 && (
            <span className="stat" style={{ background: '#d6e8f5', color: '#2a5d85' }}>
              <span className="stat-num" style={{ color: '#2a5d85' }}>{counts.specific}</span> especificas
            </span>
          )}
        </div>
      </div>

      <div className="vac-region-content">
        <div className="vac-region-main">
          <h3 className="vac-section-title">Vacinas recomendadas</h3>
          {sorted.map(v => (
            <div key={v.name} className={`vac-vacc-card ${v.priority}`}>
              <div className="vacc-header">
                <div>
                  <div className="vacc-name">{v.name}</div>
                  {v.brand && <span className="vacc-brand">{v.brand}</span>}
                </div>
                <span className={`vacc-priority ${v.priority}`}>{PRIORITY_LABEL[v.priority]}</span>
              </div>
              <div className="vacc-info" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(v.info) }} />
            </div>
          ))}
        </div>

        <aside className="vac-region-side">
          <div className="vac-side-card">
            <h4>⏱️ Quando vacinar</h4>
            <p>Idealmente <strong>4–6 semanas antes</strong> da partida, para tempo de imunizacao completa e eventuais doses adicionais.</p>
          </div>
          <div className="vac-side-card">
            <h4>📋 Documentos</h4>
            <p>Levar o <strong>Cartao Internacional de Vacinacao</strong> ("cartao amarelo") em viagens onde haja vacinas obrigatorias.</p>
          </div>
          <div className="vac-side-card">
            <h4>🦟 Medidas adicionais</h4>
            <p>Repelentes de insetos (DEET ≥ 30%), mosquiteiro impregnado, agua engarrafada/fervida, lavagem cuidadosa de alimentos crus.</p>
          </div>
          <div className="vac-side-card vac-side-card-warn">
            <h4>⚠️ Atencao</h4>
            <p>Confirmar requisitos de entrada do destino e <strong>quimioprofilaxia para a malaria</strong> se aplicavel (nao substituivel por vacina).</p>
          </div>
        </aside>
      </div>

      <div className="vac-travel-disclaimer">
        <strong>⚕️ Nota clinica:</strong> Lista de recomendacoes genericas. A escolha individual deve sempre ser feita em consulta presencial num Centro de Vacinacao Internacional (CVI), considerando destino especifico, epoca do ano, duracao, atividades, estado de saude e historia vacinal.
      </div>
    </>
  );
}
