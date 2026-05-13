import { useState, useMemo } from 'react';
import VacToolbar from './VacToolbar';
import VacSearch from './VacSearch';

interface MatrixRow {
  disease: string;
  searchText: string;
  cells: Record<string, { dose: string; label: string; cls: string; info: string } | null>;
  spanTdpa?: boolean;
}

const AGES = ['0', '2m', '4m', '6m', '12m', '18m', '5a', '10a', '25a', '45a', '65a', '10/10'];

const AGE_LABELS: Record<string, { num: string; unit: string }> = {
  '0': { num: 'Nasc.', unit: '' },
  '2m': { num: '2', unit: 'meses' },
  '4m': { num: '4', unit: 'meses' },
  '6m': { num: '6', unit: 'meses' },
  '12m': { num: '12', unit: 'meses' },
  '18m': { num: '18', unit: 'meses' },
  '5a': { num: '5', unit: 'anos' },
  '10a': { num: '10', unit: 'anos' },
  '25a': { num: '25', unit: 'anos' },
  '45a': { num: '45', unit: 'anos' },
  '65a': { num: '65', unit: 'anos' },
  '10/10': { num: '10/10', unit: 'anos' },
};

const ROWS: MatrixRow[] = [
  {
    disease: 'Hepatite B',
    searchText: 'hepatite B',
    cells: {
      '0': { dose: '1', label: 'VHB', cls: 'v-vhb', info: 'VHB — Vacina contra a hepatite B (1a dose, a nascenca)' },
      '2m': { dose: '2', label: 'VHB', cls: 'v-vhb', info: 'VHB — 2a dose (incluida na hexavalente)' },
      '6m': { dose: '3', label: 'VHB', cls: 'v-vhb', info: 'VHB — 3a dose (incluida na hexavalente)' },
    },
  },
  {
    disease: 'Haemophilus influenzae b',
    searchText: 'haemophilus influenzae b hib',
    cells: {
      '2m': { dose: '1', label: 'Hib', cls: 'v-hib', info: 'Hib — Haemophilus influenzae tipo b, 1a dose (hexavalente)' },
      '4m': { dose: '2', label: 'Hib', cls: 'v-hib', info: 'Hib — 2a dose (hexavalente)' },
      '6m': { dose: '3', label: 'Hib', cls: 'v-hib', info: 'Hib — 3a dose (hexavalente)' },
      '18m': { dose: '4', label: 'Hib', cls: 'v-hib', info: 'Hib — 4a dose / reforco (pentavalente)' },
    },
  },
  {
    disease: 'Difteria, tetano, tosse convulsa',
    searchText: 'difteria tetano tosse convulsa',
    cells: {
      '2m': { dose: '1', label: 'DTPa', cls: 'v-dtpa', info: 'DTPa — Difteria, tetano, tosse convulsa acelular, 1a dose' },
      '4m': { dose: '2', label: 'DTPa', cls: 'v-dtpa', info: 'DTPa — 2a dose' },
      '6m': { dose: '3', label: 'DTPa', cls: 'v-dtpa', info: 'DTPa — 3a dose' },
      '18m': { dose: '4', label: 'DTPa', cls: 'v-dtpa', info: 'DTPa — 4a dose / reforco' },
      '5a': { dose: '5', label: 'DTPa', cls: 'v-dtpa', info: 'DTPa — 5a dose / reforco pre-escolar' },
    },
  },
  {
    disease: 'Poliomielite',
    searchText: 'poliomielite polio',
    cells: {
      '2m': { dose: '1', label: 'VIP', cls: 'v-vip', info: 'VIP — Vacina inativada da poliomielite, 1a dose' },
      '4m': { dose: '2', label: 'VIP', cls: 'v-vip', info: 'VIP — 2a dose' },
      '6m': { dose: '3', label: 'VIP', cls: 'v-vip', info: 'VIP — 3a dose' },
      '18m': { dose: '4', label: 'VIP', cls: 'v-vip', info: 'VIP — 4a dose / reforco' },
      '5a': { dose: '5', label: 'VIP', cls: 'v-vip', info: 'VIP — 5a dose / reforco pre-escolar' },
    },
  },
  {
    disease: 'Streptococcus pneumoniae',
    searchText: 'streptococcus pneumoniae pneumococica',
    cells: {
      '2m': { dose: '1', label: 'Pn20', cls: 'v-pn', info: 'Pn20 — Vacina pneumococica conjugada 20-valente, 1a dose (substituiu Pn13 em 01/01/2025)' },
      '4m': { dose: '2', label: 'Pn20', cls: 'v-pn', info: 'Pn20 — 2a dose' },
      '12m': { dose: '3', label: 'Pn20', cls: 'v-pn', info: 'Pn20 — 3a dose / reforco' },
    },
  },
  {
    disease: 'Neisseria meningitidis B',
    searchText: 'neisseria meningitidis B meningococo',
    cells: {
      '2m': { dose: '1', label: 'MenB', cls: 'v-menb', info: 'MenB — Vacina contra meningococo B, 1a dose' },
      '4m': { dose: '2', label: 'MenB', cls: 'v-menb', info: 'MenB — 2a dose' },
      '12m': { dose: '3', label: 'MenB', cls: 'v-menb', info: 'MenB — 3a dose / reforco' },
    },
  },
  {
    disease: 'Neisseria meningitidis A, C, W, Y',
    searchText: 'neisseria meningitidis ACWY meningococo',
    cells: {
      '12m': { dose: '1', label: 'MenACWY', cls: 'v-menacwy', info: 'MenACWY — Vacina conjugada tetravalente (substituiu MenC em 14/03/2025, Norma 005/2025)' },
    },
  },
  {
    disease: 'Sarampo, parotidite epidemica, rubeola',
    searchText: 'sarampo papeira rubeola parotidite VASPR',
    cells: {
      '12m': { dose: '1', label: 'VASPR', cls: 'v-vaspr', info: 'VASPR — Sarampo, papeira, rubeola; 1a dose' },
      '5a': { dose: '2', label: 'VASPR', cls: 'v-vaspr', info: 'VASPR — 2a dose' },
    },
  },
  {
    disease: 'Virus papiloma humano',
    searchText: 'virus papiloma humano HPV',
    cells: {
      '10a': { dose: '1,2', label: 'HPV', cls: 'v-hpv', info: 'HPV — Vacina nonavalente contra papiloma virus humano; 2 doses (0, 6 meses) aos 10 anos. Universal para raparigas e rapazes.' },
    },
  },
  {
    disease: 'Tetano, difteria e tosse convulsa (gravidas)',
    searchText: 'tetano difteria tosse convulsa gravida tdpa',
    spanTdpa: true,
    cells: {
      '25a': { dose: 'Tdpa — Gravidas', label: '', cls: 'v-tdpa', info: 'Tdpa — Em cada gravidez, idealmente 20–36 semanas (preferencialmente ate 32). Protecao do recem-nascido contra tosse convulsa.' },
    },
  },
  {
    disease: 'Tetano e difteria',
    searchText: 'tetano difteria td',
    cells: {
      '10a': { dose: 'Td', label: '', cls: 'v-td', info: 'Td — Tetano + difteria (dose reduzida adulto), 1a dose de reforco aos 10 anos' },
      '25a': { dose: 'Td', label: '', cls: 'v-td', info: 'Td — Reforco aos 25 anos' },
      '45a': { dose: 'Td', label: '', cls: 'v-td', info: 'Td — Reforco aos 45 anos' },
      '65a': { dose: 'Td', label: '', cls: 'v-td', info: 'Td — Reforco aos 65 anos' },
      '10/10': { dose: 'Td', label: '', cls: 'v-td', info: 'Td — Reforcos decenais apos os 65 anos' },
    },
  },
];

const LEGEND = [
  { cls: 'v-vhb', bg: '#fce8d4', border: '#f0c896', label: 'VHB · Hepatite B' },
  { cls: 'v-hib', bg: '#fef5c4', border: '#ecd97a', label: 'Hib · Haemophilus b' },
  { cls: 'v-dtpa', bg: '#ffe0d4', border: '#f7b39e', label: 'DTPa · Triplice' },
  { cls: 'v-vip', bg: '#fcd0c5', border: '#f29b87', label: 'VIP · Polio' },
  { cls: 'v-pn', bg: '#c8e9d6', border: '#8fd0a8', label: 'Pn20 · Pneumococica' },
  { cls: 'v-menb', bg: '#d6e8f5', border: '#98c5e0', label: 'MenB' },
  { cls: 'v-menacwy', bg: '#d4dff5', border: '#9eb5e0', label: 'MenACWY' },
  { cls: 'v-vaspr', bg: '#e1eccb', border: '#b6c98a', label: 'VASPR' },
  { cls: 'v-hpv', bg: '#e1d4f0', border: '#b8a3d8', label: 'HPV' },
  { cls: 'v-tdpa', bg: '#fad1e6', border: '#ed9bc5', label: 'Tdpa' },
  { cls: 'v-td', bg: '#f5d4c8', border: '#e0a48d', label: 'Td' },
];

interface Props {
  onBack: () => void;
}

export default function VacMatrix({ onBack }: Props) {
  const [query, setQuery] = useState('');
  const [activeAge, setActiveAge] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const q = query.trim().toLowerCase();

  const filteredRows = useMemo(() => {
    if (!q) return ROWS;
    return ROWS.filter(r => (r.searchText + ' ' + r.disease).toLowerCase().includes(q));
  }, [q]);

  const toggleAge = (age: string) => {
    setActiveAge(prev => prev === age ? null : age);
  };

  const hasVaccineAtAge = (row: MatrixRow, age: string) => {
    if (row.cells[age]) return true;
    if (row.spanTdpa && ['25a', '45a', '65a', '10/10'].includes(age)) return true;
    return false;
  };

  const handlePillHover = (e: React.MouseEvent, info: string) => {
    setTooltip({ text: info, x: e.clientX + 14, y: e.clientY + 14 });
  };

  return (
    <>
      <VacToolbar onBack={onBack} />
      <h2 className="vac-page-title"><span className="vac-icon">📊</span> Calendario Vacinal — Matriz</h2>

      <div className="vac-info-box">
        <div className="vac-info-icon">i</div>
        <div>
          <strong>Vacinas × Idades — Plano Nacional de Vacinacao 2025.</strong>{' '}
          Clica numa <strong>idade</strong> (cabecalho da coluna) para filtrar as vacinas a administrar nessa altura. Passa o rato sobre cada dose para ver o nome completo da vacina.
        </div>
      </div>

      <VacSearch
        placeholder="Pesquisar por vacina ou doenca (ex: hepatite, sarampo, meningite)…"
        value={query}
        onChange={setQuery}
      />

      {activeAge && (
        <div className="vac-matrix-filter-info show">
          <span>A mostrar apenas vacinas administradas aos <strong>{AGE_LABELS[activeAge]?.num} {AGE_LABELS[activeAge]?.unit}</strong></span>
          <button onClick={() => setActiveAge(null)}>Limpar filtro</button>
        </div>
      )}

      <div className="vac-matrix-wrap">
        <table className={`vac-matrix ${activeAge ? 'filter-active' : ''}`}>
          <thead>
            <tr>
              <th className="disease-col">Vacina / Doenca</th>
              {AGES.map(age => (
                <th
                  key={age}
                  className={activeAge === age ? 'age-active' : ''}
                  onClick={() => toggleAge(age)}
                >
                  <span className="age-num">{AGE_LABELS[age]?.num}</span>
                  {AGE_LABELS[age]?.unit && <span className="age-unit">{AGE_LABELS[age]?.unit}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map(row => (
              <tr
                key={row.disease}
                className={activeAge && !hasVaccineAtAge(row, activeAge) ? 'not-relevant' : ''}
              >
                <td className="disease">{row.disease}</td>
                {row.spanTdpa ? (
                  <>
                    {AGES.slice(0, 8).map(age => (
                      <td key={age} className={`cell ${activeAge === age ? 'age-match' : ''}`} />
                    ))}
                    <td
                      className={`cell ${activeAge === '25a' ? 'age-match' : ''}`}
                      colSpan={4}
                      style={{ textAlign: 'center' }}
                    >
                      {row.cells['25a'] && (
                        <span
                          className={`v-pill ${row.cells['25a'].cls}`}
                          style={{ minWidth: 320 }}
                          onMouseEnter={e => handlePillHover(e, row.cells['25a']!.info)}
                          onMouseMove={e => setTooltip(t => t ? { ...t, x: e.clientX + 14, y: e.clientY + 14 } : null)}
                          onMouseLeave={() => setTooltip(null)}
                        >
                          <span className="dose">{row.cells['25a'].dose}</span>
                        </span>
                      )}
                    </td>
                  </>
                ) : (
                  AGES.map(age => {
                    const cell = row.cells[age] ?? null;
                    return (
                      <td key={age} className={`cell ${activeAge === age ? 'age-match' : ''}`}>
                        {cell && (
                          <span
                            className={`v-pill ${cell.cls}`}
                            onMouseEnter={e => handlePillHover(e, cell.info)}
                            onMouseMove={e => setTooltip(t => t ? { ...t, x: e.clientX + 14, y: e.clientY + 14 } : null)}
                            onMouseLeave={() => setTooltip(null)}
                          >
                            <span className="dose">{cell.dose}</span>
                            {cell.label && <span className="label">{cell.label}</span>}
                          </span>
                        )}
                      </td>
                    );
                  })
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="vac-matrix-legend">
        {LEGEND.map(l => (
          <span key={l.cls} className="item">
            <span className="swatch" style={{ background: l.bg, borderColor: l.border }} />
            {l.label}
          </span>
        ))}
      </div>

      {filteredRows.length === 0 && (
        <div className="vac-no-results show">
          <span className="emoji">🔍</span>
          Nenhum resultado encontrado.
        </div>
      )}

      <div className="vac-notes-block">
        <h3>Notas</h3>
        <ul>
          <li><strong>PNV 2025 atualizado:</strong> Pn20 substituiu Pn13 a 01/01/2025 (Norma 013/2024); MenACWY substituiu MenC a 14/03/2025 (Norma 005/2025).</li>
          <li>Os algarismos dentro das pilulas (1, 2, 3…) indicam o <strong>numero da dose</strong> dessa vacina.</li>
          <li>A vacina <strong>BCG</strong> a nascenca e administrada apenas a criancas pertencentes a grupos de risco para tuberculose.</li>
          <li>Os reforcos de Td continuam aos 65 anos e depois de 10 em 10 anos.</li>
          <li>A vacina <strong>Tdpa-Gravidas</strong> e administrada em <strong>cada</strong> gravidez (idealmente 20–36 semanas).</li>
        </ul>
      </div>

      {tooltip && (
        <div className="vac-popover" style={{ left: tooltip.x, top: tooltip.y, display: 'block' }}>
          {tooltip.text}
        </div>
      )}
    </>
  );
}
