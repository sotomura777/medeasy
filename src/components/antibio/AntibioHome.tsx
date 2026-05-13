import { TOOLS } from '../../content/antibio/data';
import type { AntibioView } from '../../content/antibio/data';

interface Props { goTo: (v: AntibioView) => void }

export default function AntibioHome({ goTo }: Props) {
  return (
    <div className="atb-home">
      <div className="atb-home-header">
        <div className="atb-home-line" />
        <h2>Ferramentas Clínicas<br />de Apoio à Prescrição</h2>
        <p>Scores, calculadoras e referências rápidas para suporte à decisão em antibioterapia ambulatória. Baseado no Guia de Bolso PAPA — ARS LVT, Edição 1.3, novembro 2025.</p>
      </div>

      <div className="atb-section-label">Ferramentas disponíveis</div>
      <div className="atb-tool-grid">
        {TOOLS.map(t => (
          <button key={t.id} className="atb-tool-card" onClick={() => goTo(t.id)}>
            <span className="atb-tool-emoji">{t.emoji}</span>
            <div className="atb-tool-name">{t.name}</div>
            <div className="atb-tool-desc">{t.desc}</div>
            <span className="atb-tool-status">Disponível</span>
            <span className="atb-tool-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
