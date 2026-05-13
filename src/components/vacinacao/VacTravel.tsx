import VacToolbar from './VacToolbar';
import { REGION_LEGEND } from '../../content/vacinacao/travel-data';

interface Props {
  onBack: () => void;
  onSelectRegion: (id: string) => void;
}

export default function VacTravel({ onBack, onSelectRegion }: Props) {
  return (
    <>
      <VacToolbar onBack={onBack} />
      <h2 className="vac-page-title"><span className="vac-icon">🌍</span> Consulta do Viajante — Mapa</h2>

      <div className="vac-info-box">
        <div className="vac-info-icon">i</div>
        <div>
          <strong>Clica numa regiao</strong> do mapa ou na legenda para abrir a pagina completa com todas as recomendacoes de vacinacao para essa zona.
        </div>
      </div>

      <div className="vac-map-wrap">
        <svg className="vac-world-map" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1000" height="500" fill="#e8f4fa" rx="12" />

          <path className="region" style={{ fill: '#c9e3d2' }} onClick={() => onSelectRegion('namerica')}
            d="M 80 80 L 200 70 L 280 90 L 320 130 L 290 180 L 250 200 L 210 220 L 180 250 L 150 230 L 120 200 L 90 160 L 70 120 Z" />
          <text className="region-label" x={190} y={155}>AMERICA</text>
          <text className="region-label" x={190} y={170}>DO NORTE</text>

          <path className="region" style={{ fill: '#ffd6a5' }} onClick={() => onSelectRegion('samerica')}
            d="M 200 240 L 240 260 L 245 290 L 235 320 L 230 360 L 235 410 L 220 450 L 200 460 L 185 430 L 175 390 L 170 340 L 175 290 L 190 260 Z" />
          <text className="region-label" x={205} y={360}>AMERICA</text>
          <text className="region-label" x={205} y={375}>DO SUL</text>

          <path className="region" style={{ fill: '#b8d4e8' }} onClick={() => onSelectRegion('europe')}
            d="M 460 100 L 540 90 L 580 100 L 600 130 L 590 165 L 550 175 L 510 170 L 470 160 L 445 130 Z" />
          <text className="region-label" x={520} y={135}>EUROPA</text>

          <path className="region" style={{ fill: '#ffcaa7' }} onClick={() => onSelectRegion('africa-north')}
            d="M 460 200 L 550 195 L 610 200 L 640 220 L 630 260 L 590 270 L 530 270 L 480 260 L 450 240 Z" />
          <text className="region-label" x={540} y={235}>NORTE DE AFRICA</text>

          <path className="region" style={{ fill: '#ff9b6b' }} onClick={() => onSelectRegion('africa-sub')}
            d="M 480 280 L 560 280 L 620 290 L 640 330 L 625 380 L 600 420 L 560 440 L 520 435 L 490 410 L 470 370 L 465 320 Z" />
          <text className="region-label" x={545} y={345}>AFRICA</text>
          <text className="region-label" x={545} y={360}>SUBSARIANA</text>

          <path className="region" style={{ fill: '#d4b6e5' }} onClick={() => onSelectRegion('asia-central')}
            d="M 620 110 L 720 100 L 770 120 L 760 160 L 720 175 L 670 170 L 625 155 Z" />
          <text className="region-label" x={695} y={140}>ASIA CENTRAL</text>

          <path className="region" style={{ fill: '#c8a4d8' }} onClick={() => onSelectRegion('asia-south')}
            d="M 670 200 L 740 195 L 770 220 L 760 260 L 730 275 L 695 270 L 670 250 L 660 220 Z" />
          <text className="region-label" x={715} y={240}>SUL DA ASIA</text>

          <path className="region" style={{ fill: '#f4a8c9' }} onClick={() => onSelectRegion('asia-se')}
            d="M 790 250 L 850 245 L 890 260 L 905 295 L 880 330 L 840 340 L 810 320 L 790 290 Z" />
          <text className="region-label" x={845} y={295}>SUDESTE ASIATICO</text>

          <path className="region" style={{ fill: '#e8b4dd' }} onClick={() => onSelectRegion('asia-east')}
            d="M 800 130 L 880 120 L 920 145 L 910 185 L 870 200 L 830 195 L 800 175 Z" />
          <text className="region-label" x={860} y={165}>ASIA ORIENTAL</text>

          <path className="region" style={{ fill: '#a8d8c7' }} onClick={() => onSelectRegion('oceania')}
            d="M 830 380 L 900 370 L 940 390 L 930 420 L 880 430 L 845 420 L 830 400 Z" />
          <text className="region-label" x={885} y={405}>OCEANIA</text>

          <g className="region" onClick={() => onSelectRegion('meca')} style={{ cursor: 'pointer' }}>
            <circle cx={620} cy={218} r={11} fill="#f6d365" stroke="white" strokeWidth={2} />
            <text x={620} y={223} textAnchor="middle" fontSize={13} fontWeight={900} fill="#5a4400">★</text>
          </g>
          <text className="region-label" x={640} y={218} textAnchor="start" style={{ fontSize: '8.5px' }}>MECA</text>
          <text className="region-label" x={640} y={228} textAnchor="start" style={{ fontSize: '8px' }}>(Arabia Saudita)</text>
        </svg>
      </div>

      <div className="vac-region-legend">
        {REGION_LEGEND.map(r => (
          <div key={r.id} className="leg" onClick={() => onSelectRegion(r.id)}>
            <span className="swatch" style={{ background: r.color }} />
            {r.label}
          </div>
        ))}
      </div>

      <div className="vac-priority-legend">
        <span className="item" style={{ background: '#ffe0d4', color: '#a14b34' }}>Essencial</span>
        <span className="item" style={{ background: '#fef5c4', color: '#8a7314' }}>Recomendada</span>
        <span className="item" style={{ background: '#d6e8f5', color: '#2a5d85' }}>Situacoes especificas</span>
        <span className="item" style={{ background: '#f4a261', color: '#4a2a10' }}>Obrigatoria</span>
      </div>

      <div className="vac-travel-disclaimer">
        <strong>⚕️ Nota clinica:</strong> Esta consulta de viagem e uma referencia para apoio a decisao. A consulta presencial num Centro de Vacinacao Internacional (CVI) e recomendada idealmente 4–6 semanas antes da viagem. Avaliar sempre destino especifico, epoca do ano, tipo de viagem (urbano vs. rural), duracao, atividades planeadas e estado de saude individual.
      </div>
    </>
  );
}
