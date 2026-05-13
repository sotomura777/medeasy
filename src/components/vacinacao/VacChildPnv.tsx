import { useState, useMemo } from 'react';
import VacToolbar from './VacToolbar';
import VacSearch from './VacSearch';

interface TimelineEntry {
  ageNum: string;
  ageUnit: string;
  title: string;
  vaccines: { name: string; info: string }[];
  protects: string;
}

const TIMELINE: TimelineEntry[] = [
  {
    ageNum: 'Nasc.', ageUnit: 'A nascenca', title: 'Nascimento',
    vaccines: [
      { name: 'VHB (1a dose)', info: '1a dose. Esquema 0, 2, 6 meses (administrada em combinacao na hexavalente aos 2, 4 e 6 meses).' },
      { name: 'BCG (grupos de risco)', info: 'Administrada apenas a criancas pertencentes a grupos de risco para tuberculose (Norma 006/2016 atualizada 2025).' },
    ],
    protects: 'hepatite B, tuberculose (grupos de risco)',
  },
  {
    ageNum: '2', ageUnit: 'meses', title: '2 meses',
    vaccines: [
      { name: 'Hexavalente (1a)', info: 'Vacina combinada. Protege contra difteria, tetano, tosse convulsa (acelular), poliomielite, Haemophilus influenzae b e hepatite B. 1a dose.' },
      { name: 'Pn20 (1a)', info: 'Substituiu a Pn13 a 01/01/2025 (Norma 013/2024). Esquema 2+1 (2, 4 e 12 meses). 1a dose.' },
      { name: 'MenB (1a)', info: 'Vacina contra Neisseria meningitidis serogrupo B. Esquema 2, 4 e 12 meses. 1a dose.' },
      { name: 'Rotavirus (grupos de risco)', info: 'Apenas grupos de risco definidos por norma DGS. Administracao oral, esquema dependente do produto utilizado.' },
    ],
    protects: 'difteria, tetano, tosse convulsa, poliomielite, Hib, hepatite B, doenca pneumococica invasiva, meningite B, gastroenterite por rotavirus',
  },
  {
    ageNum: '4', ageUnit: 'meses', title: '4 meses',
    vaccines: [
      { name: 'Hexavalente (2a)', info: '2a dose.' },
      { name: 'Pn20 (2a)', info: '2a dose.' },
      { name: 'MenB (2a)', info: '2a dose.' },
      { name: 'Rotavirus (grupos de risco)', info: '2a dose (apenas grupos de risco).' },
    ],
    protects: 'mesmas doencas da 1a toma',
  },
  {
    ageNum: '6', ageUnit: 'meses', title: '6 meses',
    vaccines: [
      { name: 'Hexavalente (3a)', info: '3a dose. Conclui primovacinacao.' },
    ],
    protects: 'primovacinacao contra difteria, tetano, tosse convulsa, polio, Hib, hepatite B',
  },
  {
    ageNum: '12', ageUnit: 'meses', title: '12 meses',
    vaccines: [
      { name: 'Pn20 (reforco)', info: '3a dose / reforco. Conclui o esquema 2+1.' },
      { name: 'MenB (reforco)', info: 'Dose de reforco (3a dose).' },
      { name: 'MenACWY', info: 'Vacina contra meningococos A, C, W e Y. Substituiu a MenC desde 14/03/2025 (Norma 005/2025). Protecao contra mais serotipos de doenca invasiva meningococica.' },
      { name: 'VASPR (1a)', info: 'Vacina combinada contra sarampo, parotidite epidemica (papeira) e rubeola. 1a dose.' },
    ],
    protects: 'doenca pneumococica invasiva, meningite B, meningite A/C/W/Y, sarampo, papeira, rubeola',
  },
  {
    ageNum: '18', ageUnit: 'meses', title: '18 meses',
    vaccines: [
      { name: 'DTPaHibVIP (reforco)', info: 'Reforco (4a dose) contra difteria, tetano, tosse convulsa, Haemophilus influenzae b e poliomielite.' },
    ],
    protects: 'difteria, tetano, tosse convulsa, polio, Hib',
  },
  {
    ageNum: '5', ageUnit: 'anos', title: '5 anos',
    vaccines: [
      { name: 'DTPaVIP', info: 'Reforco pre-escolar contra difteria, tetano, tosse convulsa e poliomielite.' },
      { name: 'VASPR (2a)', info: '2a dose. Conclui esquema. Intervalo minimo de 4 semanas apos 1a dose.' },
    ],
    protects: 'difteria, tetano, tosse convulsa, polio; conclui: sarampo, papeira, rubeola',
  },
  {
    ageNum: '10', ageUnit: 'anos', title: '10 anos',
    vaccines: [
      { name: 'Td', info: 'Vacina contra tetano e difteria com doses reduzidas de antigenio.' },
      { name: 'HPV (raparigas e rapazes)', info: 'Esquema de 2 doses (0, 6 meses) em menores de 15 anos. Universal para raparigas e rapazes desde 2020.' },
    ],
    protects: 'tetano, difteria, infecoes e cancros associados ao HPV (colo do utero, vulva, vagina, penis, anus, orofaringe; verrugas genitais)',
  },
  {
    ageNum: '10-13', ageUnit: 'anos', title: '10–13 anos · Reforcos ao longo da vida',
    vaccines: [
      { name: 'Td (reforcos decenais)', info: 'Reforcos de Td ao longo da vida com intervalos de 10 anos: 25, 45, 65 anos e depois a cada 10 anos.' },
    ],
    protects: 'aos 10, 25, 45, 65 anos e depois cada 10 anos',
  },
];

interface Props {
  onBack: () => void;
}

export default function VacChildPnv({ onBack }: Props) {
  const [query, setQuery] = useState('');
  const [tooltip, setTooltip] = useState<{ title: string; body: string; x: number; y: number } | null>(null);
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return TIMELINE;
    return TIMELINE.filter(item => {
      const text = (item.title + ' ' + item.vaccines.map(v => v.name + ' ' + v.info).join(' ') + ' ' + item.protects).toLowerCase();
      return text.includes(q);
    });
  }, [q]);

  return (
    <>
      <VacToolbar onBack={onBack} />
      <h2 className="vac-page-title"><span className="vac-icon">👶</span> PNV — Criancas e Adolescentes</h2>

      <div className="vac-info-box">
        <div className="vac-info-icon">i</div>
        <div>
          <strong>Esquema vacinal recomendado em vigor desde 2025.</strong>{' '}
          Inclui as alteracoes: introducao da vacina pneumococica conjugada 20-valente (Pn20, em substituicao da Pn13) a 01/01/2025 e da MenACWY (em substituicao da MenC) aos 12 meses a partir de 14/03/2025.
          Passa o rato sobre cada vacina para mais informacao.
        </div>
      </div>

      <VacSearch
        placeholder="Pesquisar por vacina, idade ou doenca (ex: hexavalente, 12 meses, sarampo)…"
        value={query}
        onChange={setQuery}
      />

      <div className="vac-timeline">
        {filtered.map(item => (
          <div key={item.title} className="vac-tl-item">
            <div className="vac-tl-marker">
              <span className="age-num">{item.ageNum}</span>
              {item.ageUnit && <span className="age-unit">{item.ageUnit}</span>}
            </div>
            <div className="vac-tl-card">
              <h3>{item.title}</h3>
              <div className="vac-tl-vaccines">
                {item.vaccines.map(v => (
                  <span
                    key={v.name}
                    className="vac-chip"
                    onMouseEnter={e => setTooltip({ title: v.name, body: v.info, x: e.clientX + 14, y: e.clientY + 14 })}
                    onMouseMove={e => setTooltip(t => t ? { ...t, x: e.clientX + 14, y: e.clientY + 14 } : null)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <span className="dot" />{v.name}
                  </span>
                ))}
              </div>
              <div className="vac-tl-protects">
                <strong>Protege contra:</strong> {item.protects}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="vac-no-results show">
          <span className="emoji">🔍</span>
          Nenhum resultado encontrado.
        </div>
      )}

      <div className="vac-notes-block">
        <h3>Alteracoes recentes ao PNV (2024–2025)</h3>
        <ul>
          <li><strong>01/01/2025</strong> — Vacina pneumococica conjugada 20-valente (Pn20) substituiu a Pn13 no esquema (2, 4 e 12 meses). <em>Norma 013/2024 DGS.</em></li>
          <li><strong>14/03/2025</strong> — MenACWY substituiu a MenC aos 12 meses. <em>Norma 005/2025 DGS.</em></li>
          <li>Mantem-se vacinacao MenB aos 2, 4 e 12 meses.</li>
        </ul>
        <h3>Legenda de abreviaturas</h3>
        <ul>
          <li><strong>DTPa</strong> — difteria, tetano, tosse convulsa (acelular) · <strong>VIP</strong> — vacina inativada da poliomielite</li>
          <li><strong>Hib</strong> — Haemophilus influenzae b · <strong>VHB</strong> — virus da hepatite B</li>
          <li><strong>VASPR</strong> — sarampo, parotidite epidemica, rubeola · <strong>HPV</strong> — papiloma virus humano</li>
          <li><strong>MenACWY / MenB</strong> — Neisseria meningitidis serogrupos · <strong>Pn20</strong> — pneumococica 20-valente</li>
          <li><strong>Td</strong> — tetano + difteria (dose reduzida adulto)</li>
        </ul>
      </div>

      {tooltip && (
        <div className="vac-popover" style={{ left: tooltip.x, top: tooltip.y, display: 'block' }}>
          <strong>{tooltip.title}</strong>
          {tooltip.body}
        </div>
      )}
    </>
  );
}
