import VacTableView, { type TableSection } from './VacTableView';

const SECTIONS: TableSection[] = [
  {
    header: 'Vacinas extra PNV recomendadas',
    columns: ['Idade / Indicacao', 'Vacina e esquema'],
    rows: [
      { cells: [
        'A partir das 6 semanas — todos os lactentes',
        '<span class="vac-name">Vacina contra rotavirus</span> Vacina monovalente atenuada contra rotavirus <span class="brand-inline">(Rotarix®)</span>: 2 doses orais (intervalo ≥ 4 semanas, completar ate 24 semanas) <span class="or">ou</span><br>Vacina pentavalente atenuada contra rotavirus <span class="brand-inline">(RotaTeq®)</span>: 3 doses orais (intervalo ≥ 4 semanas, completar ate 32 semanas)',
      ] },
      { cells: [
        'A partir dos 12 meses',
        '<span class="vac-name">Vacina contra a varicela</span> Vacina contra a varicela (estirpe Oka) <span class="brand-inline">(Varilrix®)</span>: 2 doses, intervalo de 6 semanas <span class="or">ou</span><br>Vacina contra a varicela (estirpe Oka/Merck) <span class="brand-inline">(Varivax®)</span>: 2 doses, intervalo de 4–8 semanas<br><em>(geralmente 2a dose entre os 4 e 6 anos)</em>',
      ] },
      { cells: [
        'A partir dos 12 meses',
        '<span class="vac-name">Vacina contra a hepatite A</span> Vacina contra hepatite A (formulacao pediatrica) <span class="brand-inline">(Havrix 720 Junior® · VAQTA Pediatrico® · Avaxim 80 U Pediatrico®)</span>: 2 doses com intervalo de 6–12 meses',
      ] },
      { cells: [
        'A partir dos 6 meses — anualmente',
        '<span class="vac-name">Vacina contra a gripe</span> Vacina contra a gripe tetravalente (intranasal viva atenuada, 2–18 anos; ou injetavel inativada, ≥ 6 meses) <span class="brand-inline">(Fluenz Tetra® · Vaxigrip Tetra® · Influvac Tetra®)</span>: dose anual<br><em>Criancas entre 6 meses e 8 anos, na 1a vacinacao alguma vez na vida, devem receber 2 doses com intervalo ≥ 4 semanas</em>',
      ] },
      { cells: [
        'Lactentes na primeira epoca VSR — em alternativa ao Nirsevimab',
        '<span class="vac-name">Imunizacao passiva contra VSR</span> Nirsevimab (anticorpo monoclonal) <span class="brand-inline">(Beyfortus®)</span>: anticorpo monoclonal, dose unica IM, para todos os lactentes na sua primeira epoca VSR (financiado pelo SNS desde 2024/25)',
      ] },
      { cells: [
        'A partir das 6 semanas (4CMenB) ou 2 anos (rLP2086, ≥ 10 anos) — extra PNV',
        '<span class="vac-name">Vacina contra meningococo B (extra PNV)</span> <em>Nota: MenB ja consta do PNV aos 2, 4 e 12 meses. Recomenda-se completar esquema se omissao previa.</em><br>Vacina contra MenB (4CMenB; rLP2086 disponivel ≥ 10 anos) <span class="brand-inline">(Bexsero® · Trumenba®)</span>',
      ] },
      { cells: [
        'A partir dos 6 meses',
        '<span class="vac-name">Vacina contra meningococos ACWY (catch-up se nao fez aos 12 meses)</span> Vacina conjugada tetravalente MenACWY <span class="brand-inline">(Nimenrix® · MenQuadfi®)</span>: 1 dose',
      ] },
      { cells: [
        '9–14 anos — catch-up HPV',
        '<span class="vac-name">HPV — esquema fora do PNV</span> Vacina contra HPV nonavalente (HPV-9) <span class="brand-inline">(Gardasil 9® · Cervarix® — bivalente, contra HPV 16/18)</span>: 2 doses (0, 6 meses) se &lt; 15 anos; 3 doses (0, 2, 6 meses) se ≥ 15 anos',
      ] },
      { cells: [
        'Em qualquer idade pediatrica — em viagem para areas endemicas',
        '<span class="vac-name">Vacinas do viajante</span> Febre tifoide, encefalite japonesa, raiva, febre amarela, encefalite por carraca, colera — conforme destino e recomendacoes da Consulta do Viajante',
      ] },
    ],
  },
  {
    header: 'Vacinas do viajante e outras (criancas)',
    columns: ['Indicacao', 'Vacina e esquema'],
    rows: [
      { cells: [
        'A partir dos 12 meses — viagem para areas endemicas de febre amarela',
        '<span class="vac-name">Vacina contra febre amarela (viva atenuada 17D)</span> <span class="brand-inline">(Stamaril®)</span><br>Dose unica SC. ≥ 9 meses em circunstancias excecionais (epidemia). Centros de Vacinacao Internacional autorizados.',
      ] },
      { cells: [
        'A partir dos 2 anos — viagem para areas endemicas de febre tifoide',
        '<span class="vac-name">Vacina contra a febre tifoide</span> <em>Parenterica polissacarida Vi (≥ 2 anos):</em> <span class="brand-inline">(Typhim Vi®)</span> — 1 dose IM<br><em>Oral viva (≥ 6 anos):</em> <span class="brand-inline">(Vivotif®)</span> — 3 capsulas em dias alternados<br>Reforco cada 3 anos se exposicao continuada',
      ] },
      { cells: [
        'A partir das 6 semanas — pre e pos-exposicao a raiva',
        '<span class="vac-name">Vacina contra a raiva</span> <span class="brand-inline">(Verorab® · Rabipur®)</span><br>Pre-exposicao: 3 doses (0, 7, 21–28 dias) IM<br>Pos-exposicao: 4–5 doses + imunoglobulina antirrabica conforme Norma 001/2025 DGS',
      ] },
      { cells: [
        'A partir dos 2 anos — profilaxia da colera e LT-ETEC',
        '<span class="vac-name">Vacina oral inativada contra colera</span> <span class="brand-inline">(Dukoral®)</span><br>2–5 anos: 3 doses orais (intervalo 1–6 semanas)<br>≥ 6 anos: 2 doses orais (intervalo 1–6 semanas)',
      ] },
      { cells: [
        'A partir do 1 ano — viagem para areas endemicas de encefalite por carraca',
        '<span class="vac-name">Vacina contra encefalite por carraca (TBE)</span> <span class="brand-inline">(FSME-Immun Junior® · Encepur Criancas®)</span><br>3 doses (0, 1–3 meses, 5–12 meses); reforco aos 3 anos e depois cada 5 anos',
      ] },
      { cells: [
        'A partir dos 2 meses — meningococos ACWY (catch-up ou viagem)',
        '<span class="vac-name">Vacina conjugada tetravalente MenACWY</span> <span class="brand-inline">(Nimenrix® — a partir das 6 semanas · MenQuadfi® — ≥ 12 meses)</span><br>Esquema dependente da idade de inicio; obrigatoria para peregrinos a Meca',
      ] },
      { cells: [
        'Combinacao Hep A + Hep B',
        '<span class="vac-name">Vacina combinada hepatite A + hepatite B (pediatrica)</span> <span class="brand-inline">(Twinrix Pediatrico® — 1 a 15 anos)</span><br>3 doses: 0, 1 e 6 meses',
      ] },
    ],
  },
];

const NOTES = `<h3>Notas</h3>
<ul>
  <li>Recomendacoes com base nas <strong>Recomendacoes sobre Vacinas Extra PNV — Comissao de Vacinas da SIP-SPP</strong> (atualizacao 2024/2025).</li>
  <li>Esquemas concretos dependem da idade de inicio; consultar RCM da vacina.</li>
  <li>Vacinas extra PNV sao, em regra, <strong>nao comparticipadas</strong>, com excecoes (ex.: rotavirus e Nirsevimab em grupos de risco especificos).</li>
</ul>`;

interface Props { onBack: () => void; }

export default function VacChildExtra({ onBack }: Props) {
  return (
    <VacTableView
      onBack={onBack}
      icon="🧒"
      title="Extra PNV — Criancas"
      infoHtml='Vacinas <strong>nao incluidas</strong> no PNV mas recomendadas pela Comissao de Vacinas da Sociedade de Infeciologia Pediatrica (SIP-SPP). A administracao e por decisao individual / familiar e habitualmente nao e comparticipada.'
      searchPlaceholder="Pesquisar (ex: rotavirus, varicela, HPV)…"
      sections={SECTIONS}
      notesHtml={NOTES}
    />
  );
}
