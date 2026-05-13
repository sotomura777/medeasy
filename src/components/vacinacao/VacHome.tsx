import type { VacView } from '../../routes/Vacinacao';

interface Props {
  goTo: (v: VacView) => void;
}

export default function VacHome({ goTo }: Props) {
  return (
    <>
      <header className="vac-header">
        <h1>Consultor de Vacinacao</h1>
        <p className="vac-subtitle">Plano Nacional de Vacinacao · Portugal</p>
        <span className="vac-badge">Atualizado · PNV 2025 (DGS)</span>
      </header>

      <button className="vac-hub-wide" onClick={() => goTo('matrix')}>
        <div className="vac-icon">📊</div>
        <div className="vac-text">
          <h2>Calendario Vacinal — Visao de Matriz</h2>
          <p>Tabela interativa cruzando vacinas com idades. Ideal para consulta rapida do esquema completo PNV 2025.</p>
        </div>
        <div className="vac-arrow">→</div>
      </button>

      <div className="vac-hub-grid">
        <button className="vac-hub-card" onClick={() => goTo('child-pnv')}>
          <div className="vac-icon">👶</div>
          <h2>PNV — Criancas</h2>
          <p>Esquema vacinal recomendado dos 0 aos 18 anos. Cronograma interativo por idade.</p>
          <div className="vac-meta">
            <span>Obrigatorio · Gratuito</span>
            <div className="vac-arrow">→</div>
          </div>
        </button>

        <button className="vac-hub-card" onClick={() => goTo('adult-pnv')}>
          <div className="vac-icon">👤</div>
          <h2>PNV — Adultos</h2>
          <p>Reforcos Td ao longo da vida e vacinas de catch-up para adultos.</p>
          <div className="vac-meta">
            <span>Recomendado · Gratuito</span>
            <div className="vac-arrow">→</div>
          </div>
        </button>

        <button className="vac-hub-card" onClick={() => goTo('child-extra')}>
          <div className="vac-icon">🧒</div>
          <h2>Extra PNV — Criancas</h2>
          <p>Vacinas nao incluidas no PNV recomendadas pela SIP-SPP para criancas.</p>
          <div className="vac-meta">
            <span>Recomendacoes SIP</span>
            <div className="vac-arrow">→</div>
          </div>
        </button>

        <button className="vac-hub-card" onClick={() => goTo('adult-extra')}>
          <div className="vac-icon">💉</div>
          <h2>Extra PNV — Adultos</h2>
          <p>Vacinacao de grupos de risco, doentes cronicos e situacoes especiais.</p>
          <div className="vac-meta">
            <span>Por indicacao clinica</span>
            <div className="vac-arrow">→</div>
          </div>
        </button>
      </div>

      <button className="vac-hub-wide vac-hub-travel" onClick={() => goTo('travel')}>
        <div className="vac-icon">🌍</div>
        <div className="vac-text">
          <h2>Consulta do Viajante</h2>
          <p>Mapa interativo das vacinas recomendadas por regiao do mundo. Clica numa regiao para ver as recomendacoes.</p>
        </div>
        <div className="vac-arrow">→</div>
      </button>

      <div className="vac-footer">
        Fontes: DGS · Norma 018/2020 · Norma 013/2024 · Norma 005/2025 · Recomendacoes SIP-SPP · SPMI/APMGF
      </div>
    </>
  );
}
