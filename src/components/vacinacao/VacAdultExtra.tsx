import VacTableView, { type TableSection } from './VacTableView';

const SECTIONS: TableSection[] = [
  {
    header: 'Vacinacao de grupos de risco ou em circunstancias especiais',
    columns: ['Indicacoes', 'Vacinas'],
    rows: [
      { cells: ['Mulheres nao vacinadas pelo PNV<br>Mulheres nao vacinadas pelo PNV, com lesoes cervicais pre-malignas<br>Homens nao vacinados pelo PNV, ate aos 26 anos', '<span class="vac-name">Vacina contra o papiloma virus humano</span> Vacina contra HPV nonavalente (HPV-9) <span class="brand-inline">(Gardasil 9® · Cervarix®)</span>: 3 doses, em esquema 0, 2 e 6 meses'] },
      { cells: ['Idade ≥ 50 anos', '<span class="vac-name">Vacina contra a zona ou herpes zoster</span> Vacina recombinante contra zoster (sub-unitaria) <span class="brand-inline">(Shingrix®)</span>: 2 doses, com intervalo idealmente de 2 meses (maximo 6 meses)'] },
      { cells: ['Idade ≥ 60 anos', '<span class="vac-name">Vacina contra o virus sincicial respiratorio</span> <span class="brand-inline">(Abrysvo® · Arexvy®)</span>: dose unica'] },
      { cells: ['Idade ≥ 65 anos', '<span class="vac-name">Vacina antipneumococica</span> Vacina pneumococica polissacarida 23-valente (Pn23) <span class="brand-inline">(Pneumovax 23®)</span>: dose unica'] },
      { cells: ['Gravidas (independentemente da idade gestacional)', '<span class="vac-name">Vacina contra a gripe</span> Vacina contra a gripe tetravalente <span class="brand-inline">(Influvac Tetra® · Vaxigrip Tetra®)</span>: dose unica'] },
      { cells: ['Idade 18 anos e em terapeutica prolongada com salicilatos', '<span class="vac-name">Vacina contra a gripe</span> Vacina contra a gripe tetravalente <span class="brand-inline">(Influvac Tetra® · Vaxigrip Tetra®)</span>: dose anual'] },
      { cells: ['Dador de medula ossea (antes da doacao)', '<span class="vac-name">Vacinas antipneumococicas</span> Pn20 <span class="brand-inline">(Prevenar 20®)</span>: dose unica <span class="or">e</span><br>Pn23 <span class="brand-inline">(Pneumovax 23®)</span>: 1 dose 6–12 meses apos a Pn20-conjugada (minimo 8 semanas)'] },
      { cells: ['Homens que tem sexo com homens', '<span class="vac-name">Vacina contra a hepatite A</span> <span class="brand-inline">(VAQTA®)</span>: 2 doses, intervalo 6–18 meses <span class="or">ou</span> <span class="brand-inline">(Havrix Adulto®)</span>: 2 doses, intervalo 6–12 meses'] },
    ],
  },
  {
    header: 'Vacinacao em contexto de saude ocupacional',
    columns: ['Indicacoes', 'Vacinas'],
    rows: [
      { cells: ['Profissionais dos servicos de saude do setor privado<br>Profissionais de infantarios, creches e equiparados', '<span class="vac-name">Vacina contra a gripe</span> Vacina contra a gripe tetravalente (dose padrao ou de dose elevada se ≥ 60 anos) <span class="brand-inline">(Influvac Tetra® · Vaxigrip Tetra® · Efluelda Tetra®)</span>: dose anual'] },
    ],
  },
  {
    header: 'Doentes cronicos · Sistema cardiovascular',
    columns: ['Indicacoes', 'Vacinas'],
    rows: [
      { cells: ['Doenca cardiaca cronica', '<span class="vac-name">Vacina contra a zona ou herpes zoster</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses, intervalo idealmente 2 meses<br><br>Se cardiopatia congénita sem significado hemodinamico; ou cardiopatia hipertensiva; ou cardiopatia isquemica:<br><span class="vac-name">Vacina contra a gripe</span>: dose anual<br><br>Se cardiopatia isquemica, IC cronica, cardiomiopatias:<br><span class="vac-name">Vacinas antipneumococicas</span> Pn20 + Pn23'] },
    ],
  },
  {
    header: 'Doentes cronicos · Sistema gastrointestinal',
    columns: ['Indicacoes', 'Vacinas'],
    rows: [
      { cells: ['Doenca hepatica cronica', '<span class="vac-name">Vacinas antipneumococicas</span> Pn20 + Pn23<br><br><span class="vac-name">Vacina contra a zona</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses<br><br>Se cirrose / atrésia biliar / hepatite cronica:<br><span class="vac-name">Vacina contra a gripe</span>: dose anual'] },
      { cells: ['Doenca inflamatoria intestinal', '<span class="vac-name">Vacina contra a zona</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses<br><br>Se sob biologicos/imunossupressores e &lt; 26 anos:<br><span class="vac-name">Vacina contra o HPV</span> <span class="brand-inline">(Gardasil 9®)</span>: 3 doses'] },
      { cells: ['Sindrome nefrotica', '<span class="vac-name">Vacina contra a gripe</span>: dose anual'] },
    ],
  },
  {
    header: 'Doentes cronicos · Sistema metabolico',
    columns: ['Indicacoes', 'Vacinas'],
    rows: [
      { cells: ['Obesidade<br>Doencas hereditarias do metabolismo', '<span class="vac-name">Vacina contra a gripe</span>: dose anual'] },
      { cells: ['Diabetes <em>mellitus</em>', '<span class="vac-name">Vacinas antipneumococicas</span> Pn20 + Pn23<br><br><span class="vac-name">Vacina contra a zona</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses'] },
    ],
  },
  {
    header: 'Doentes cronicos · Sistema neurologico',
    columns: ['Indicacoes', 'Vacinas'],
    rows: [
      { cells: ['Doenca neuromuscular', '<span class="vac-name">Vacinas antipneumococicas</span> Pn20 + Pn23'] },
    ],
  },
  {
    header: 'Doentes cronicos · Patologias plurissistemas',
    columns: ['Indicacoes', 'Vacinas'],
    rows: [
      { cells: ['Doenca reumatica inflamatoria sistemica', 'Se jovem adulto: <span class="vac-name">HPV</span> 3 doses<br><br>Se serologia negativa: <span class="vac-name">VHB</span> 3 doses<br><br>Se serologia varicela negativa: <span class="vac-name">Vacina contra a varicela</span> 2 doses'] },
      { cells: ['Hemoglobinopatias', '<span class="vac-name">Vacina contra a gripe</span>: dose anual'] },
      { cells: ['Conectivites (lupus, miopatias inflamatorias, esclerose sistemica)', 'Se lupus e &lt; 26 anos: <span class="vac-name">HPV</span> 3 doses<br><br><span class="vac-name">Vacina contra a zona</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses'] },
      { cells: ['Trissomia 21', '<span class="vac-name">Vacinas antipneumococicas</span> Pn13 + Pn23 + reforco aos 5 anos'] },
      { cells: ['Malformacao congenita com repercussao respiratoria', '<span class="vac-name">Vacina contra a gripe</span>: dose anual'] },
    ],
  },
  {
    header: 'Doentes cronicos · Sistema respiratorio',
    columns: ['Indicacoes', 'Vacinas'],
    rows: [
      { cells: ['DPOC', '<span class="vac-name">Vacina contra a zona</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses<br><br><span class="vac-name">Vacinas antipneumococicas</span> Pn20 + Pn23'] },
      { cells: ['Sequelas respiratorias COVID-19<br>Displasia broncopulmonar ligeira<br>Fibrose pulmonar intersticial', '<span class="vac-name">Vacina contra a gripe</span>: dose anual'] },
      { cells: ['Bronquiectasias<br>Doenca intersticial pulmonar<br>Enfisema<br>Fibrose quistica<br>Hipertensao pulmonar<br>Insuficiencia respiratoria cronica', '<span class="vac-name">Vacinas antipneumococicas</span> Pn20 + Pn23'] },
      { cells: ['Asma', '<span class="vac-name">Vacina contra a zona</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses'] },
      { cells: ['Asma sob corticoterapia sistemica ou inalada', '<span class="vac-name">Vacina contra a gripe</span>: dose anual'] },
      { cells: ['Pneumoconiose', '<span class="vac-name">Vacinas antipneumococicas</span> Pn20 + Pn23'] },
      { cells: ['Papilomatose respiratoria recorrente', '<span class="vac-name">HPV</span> <span class="brand-inline">(Gardasil 9®)</span>: 3 doses'] },
    ],
  },
  {
    header: 'Imunossupressao / Imunodepressao',
    columns: ['Indicacoes', 'Vacinas'],
    rows: [
      { cells: ['Artrite reumatoide<br>Imunodeficiencia congenita ou adquirida', '<span class="vac-name">Vacina contra a zona</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses, intervalo 1–2 meses'] },
      { cells: ['Neoplasia ativa', 'Se tumor maligno; ou imunodepressao por QT, RT, biologicos, DMARDs:<br><span class="vac-name">Vacinas antipneumococicas</span> Pn20 + Pn23 + reforco aos 5 anos'] },
      { cells: ['Imunossupressao iatrogenica', 'Se LES ou DII sob biologicos: <span class="vac-name">HPV</span> 3 doses<br><br><span class="vac-name">Vacina contra a zona</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses'] },
      { cells: ['Infecao por VIH', 'Se T CD4+ ≥ 500/mm³: <span class="vac-name">Vacinas antipneumococicas</span> Pn20 + Pn23<br><br>Se T CD4+ ≥ 200/mm³: <span class="vac-name">Vacina contra a zona</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses'] },
      { cells: ['Sindrome de insuficiencia medular congenita', '<span class="vac-name">HPV</span> <span class="brand-inline">(Gardasil 9®)</span>: 3 doses'] },
      { cells: ['Coabitantes ou prestadores de cuidados a individuos de alto risco', '<span class="vac-name">Vacina contra a gripe</span>: dose anual'] },
    ],
  },
  {
    header: 'Candidatos a transplante / transplantados',
    columns: ['Indicacoes', 'Vacinas'],
    rows: [
      { cells: ['Candidato ou recetor de transplante', 'Transplante de orgao solido e &lt; 26 anos: <span class="vac-name">HPV</span> 3 doses, preferencialmente antes do transplante<br><br>Transplante de celulas hematopoieticas: <span class="vac-name">HPV</span> 3 doses, 6–12 meses pos-transplante<br><br><span class="vac-name">Vacina contra a zona</span> <span class="brand-inline">(Shingrix®)</span>: 2 doses'] },
    ],
  },
  {
    header: 'Profilaxia pos-exposicao da hepatite A',
    columns: ['Indicacao', 'Vacina e esquema'],
    rows: [
      { cells: ['Coabitantes e contactos sexuais de pessoas com hepatite A', '<em>Ate 2 semanas apos ultima exposicao.</em><br><br><span class="brand-inline">(VAQTA®)</span>: 2 doses, intervalo 6–18 meses <span class="or">ou</span><br><span class="brand-inline">(Havrix 1440 Adulto®)</span>: 2 doses, intervalo 6–12 meses <span class="or">ou</span><br><span class="brand-inline">(Avaxim®)</span>: 2 doses, intervalo 6–12 meses'] },
    ],
  },
  {
    header: 'Vacinas do viajante e outras vacinas comercializadas',
    columns: ['Indicacao', 'Vacina e esquema'],
    rows: [
      { cells: ['Profilaxia conjunta de hepatite A + hepatite B', '<span class="vac-name">Vacina combinada hepatite A + hepatite B</span> <span class="brand-inline">(Twinrix Adulto® / Pediatrico®)</span><br>3 doses (0, 1, 6 meses) ou esquema acelerado (0, 7, 21 dias + reforco aos 12 meses)'] },
      { cells: ['Viagem para areas endemicas de febre amarela', '<span class="vac-name">Vacina contra a febre amarela</span> <span class="brand-inline">(Stamaril®)</span><br>Dose unica, ≥ 10 dias antes da viagem. Validade vitalicia (OMS 2016). CVI autorizado.'] },
      { cells: ['Profilaxia pre-exposicao da raiva', '<span class="vac-name">Vacina contra a raiva</span> <span class="brand-inline">(Verorab® · Rabipur®)</span><br>Pre-exposicao: 3 doses (0, 7, 21–28 dias) IM'] },
      { cells: ['Profilaxia pos-exposicao da raiva', '<span class="vac-name">Vacina contra a raiva + imunoglobulina antirrabica</span><br>Nao vacinado: 4–5 doses + imunoglobulina no dia 0<br>Vacinado: 2 doses (0, 3 dias), sem imunoglobulina<br><em>Norma 001/2025 DGS</em>'] },
      { cells: ['Viagem para areas de risco de febre tifoide', '<span class="vac-name">Vacina contra a febre tifoide</span><br>Polissacarida Vi: <span class="brand-inline">(Typhim Vi®)</span> 1 dose IM<br>Oral Ty21a: <span class="brand-inline">(Vivotif®)</span> 3 capsulas em dias alternados'] },
      { cells: ['Profilaxia da colera e diarreia do viajante por LT-ETEC', '<span class="vac-name">Vacina oral inativada contra a colera</span> <span class="brand-inline">(Dukoral®)</span><br>Adultos ≥ 6 anos: 2 doses orais; Criancas 2–5 anos: 3 doses orais'] },
      { cells: ['Viagem para areas endemicas de encefalite por carraca', '<span class="vac-name">Vacina contra encefalite por carraca (TBE)</span> <span class="brand-inline">(FSME-Immun® · Encepur®)</span><br>3 doses (0, 1–3 meses, 5–12 meses); reforco aos 3 anos'] },
      { cells: ['Viagem para areas endemicas de encefalite japonesa', '<span class="vac-name">Vacina contra encefalite japonesa</span> <span class="brand-inline">(Ixiaro®)</span><br>≥ 18 anos: 2 doses (0, 28 dias) IM; reforco aos 12–24 meses'] },
      { cells: ['Viagem para area de risco meningococica (Sahel; Meca)', '<span class="vac-name">Vacina conjugada tetravalente MenACWY</span> <span class="brand-inline">(Nimenrix® · MenQuadfi®)</span><br>Dose unica. <em>Obrigatoria para peregrinos a Meca (visto Hajj/Umrah)</em>'] },
      { cells: ['Tuberculose — grupos de risco', '<span class="vac-name">BCG</span> <span class="brand-inline">(BCG-SSI® · BCG Medac®)</span><br>Dose unica intradermica. <em>Em adultos, indicacao muito restrita</em>'] },
      { cells: ['Mpox — grupos de risco (HSH, profissionais de laboratorio)', '<span class="vac-name">Vacina contra Mpox / variola (3a geracao, MVA-BN)</span> <span class="brand-inline">(Jynneos® / Imvanex®)</span><br>Pre-exposicao: 2 doses SC (intervalo 4 semanas)<br>Pos-exposicao: idealmente ≤ 4 dias apos exposicao'] },
    ],
  },
];

const NOTES = `<h3>Notas e simbolos</h3>
<ul>
  <li><sup>*</sup> VSR: indicada dos 50 aos 59 anos se risco aumentado</li>
  <li><sup>#</sup> Risco de desenvolvimento de sindrome de Reye apos infecao por virus da gripe</li>
  <li><sup>$</sup> Vacina contra a gripe de dose elevada pode ser administrada em adultos com ≥ 60 anos</li>
  <li><sup>Δ</sup> Segundo recomendacoes da SPMI e APMGF</li>
  <li><sup>‡</sup> No adulto, IMC ≥ 30 Kg/m²; na crianca/adolescente, IMC > 120% do P97 ou > 3 Z-Score</li>
</ul>`;

interface Props { onBack: () => void; }

export default function VacAdultExtra({ onBack }: Props) {
  return (
    <VacTableView
      onBack={onBack}
      icon="💉"
      title="Extra PNV — Adultos"
      searchPlaceholder="Pesquisar por vacina, condicao ou grupo (ex: zoster, diabetes, transplante)…"
      sections={SECTIONS}
      notesHtml={NOTES}
    />
  );
}
