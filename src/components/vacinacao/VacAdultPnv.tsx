import VacTableView, { type TableSection } from './VacTableView';

const SECTIONS: TableSection[] = [
  {
    header: 'Reforcos de Td ao longo da vida',
    columns: ['Idade', 'Vacina', 'Esquema'],
    rows: [
      { cells: ['25 anos', '<span class="vac-name">Td</span>', '1 dose de reforco'] },
      { cells: ['45 anos', '<span class="vac-name">Td</span>', '1 dose de reforco'] },
      { cells: ['65 anos', '<span class="vac-name">Td</span>', '1 dose de reforco'] },
      { cells: ['A partir dos 65 anos', '<span class="vac-name">Td</span>', '1 dose a cada 10 anos'] },
    ],
  },
  {
    header: 'Esquema de recurso (adulto nao vacinado ou esquema desconhecido)',
    columns: ['Vacina', 'Esquema'],
    rows: [
      { cells: ['Td (tetano + difteria)', '3 doses: 0, 1–2 meses e 6–12 meses apos 2a dose <span class="or">e</span> reforcos decenais subsequentes'] },
      { cells: ['VASPR (sarampo, papeira, rubeola)', 'Adultos nascidos ≥ 1970, sem historia credivel de sarampo nem vacinacao previa: <span class="vac-name">1 dose</span><br>Profissionais de saude com contacto proximo com doentes: <span class="vac-name">2 doses</span> (independentemente do ano de nascimento), intervalo minimo 4 semanas'] },
      { cells: ['VHB (hepatite B)', 'Esquema 0, 1 e 6 meses (vacina recombinante 20 μg) em adultos nao vacinados ou com esquema incompleto'] },
      { cells: ['VIP (poliomielite)', 'Adultos sem vacinacao previa: 3 doses (0, 1–2 meses, 6–12 meses)'] },
    ],
  },
  {
    header: 'Vacinacao na gravida (PNV)',
    columns: ['Indicacao', 'Vacinas'],
    rows: [
      { cells: ['Em todas as gravidezes, idealmente entre as 20 e 36 semanas (preferencialmente ate 32 semanas)', '<span class="vac-name">Tdpa</span> 1 dose em <strong>cada</strong> gravidez para protecao do recem-nascido contra a tosse convulsa (vacina contra tetano, difteria e tosse convulsa acelular, doses reduzidas)'] },
      { cells: ['Gestante sem imunidade documentada contra tetano/difteria', '<span class="vac-name">Td</span> Iniciar/completar esquema durante a gravidez, garantindo ultima dose ≥ 2 semanas antes do parto'] },
    ],
  },
];

const NOTES = `<h3>Notas</h3>
<ul>
  <li>Em situacao de ferida tetanigenica, consultar a Norma 010/2016 DGS para gestao de profilaxia antitetanica (vacina e/ou imunoglobulina).</li>
  <li>O intervalo minimo entre doses de Td e de 4 semanas; apos reforco, novo reforco ao fim de 10 anos.</li>
</ul>`;

interface Props { onBack: () => void; }

export default function VacAdultPnv({ onBack }: Props) {
  return (
    <VacTableView
      onBack={onBack}
      icon="👤"
      title="PNV — Adultos"
      infoHtml="O PNV do adulto centra-se nos <strong>reforcos decenais de Td</strong> e na atualizacao de esquemas em pessoas com vacinacao incompleta. As vacinas contra difteria e tetano sao as unicas <strong>obrigatorias</strong> em Portugal (ex.: matricula escolar)."
      searchPlaceholder="Pesquisar (ex: tetano, gravida, sarampo)…"
      sections={SECTIONS}
      notesHtml={NOTES}
    />
  );
}
