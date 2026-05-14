// ===== ELBOW ALGORITHM DATA =====

export interface AlgoOption {
  icon: string;
  title: string;
  desc: string;
  action: string;
  cls?: string;
}

export interface AlgoStep {
  id: number;
  title: string;
  subtitle: string;
  options: AlgoOption[];
}

export const STEPS: AlgoStep[] = [
  {
    id: 0, title: 'Red Flags',
    subtitle: 'Excluir patologia grave ou urgência antes de prosseguir',
    options: [
      { icon: '🚨', title: 'Sim — Red Flag presente', desc: 'Dor noturna intensa sem alívio, febre, edema quente e eritema articular, perda de peso, défice neurológico progressivo, trauma de alta energia', action: 'redflag', cls: 'danger' },
      { icon: '✅', title: 'Não — sem sinais de alarme', desc: 'Prosseguir algoritmo', action: 'next' },
    ],
  },
  {
    id: 1, title: 'Mecanismo de início',
    subtitle: 'Como começou a dor no cotovelo?',
    options: [
      { icon: '💥', title: 'Trauma agudo', desc: 'Queda, impacto direto, entorse, hiperextensão', action: 'trauma', cls: 'warn' },
      { icon: '🎾', title: 'Sobrecarga / uso repetitivo', desc: 'Desporto, trabalho com movimentos repetidos do punho/antebraço, uso intenso do computador', action: 'overuse' },
      { icon: '🌙', title: 'Início insidioso / progressivo', desc: 'Sem causa aparente, piora gradual', action: 'insidioso' },
      { icon: '🔥', title: 'Início súbito com edema', desc: 'Inchaço rápido, calor, possível eritema', action: 'inflamatorio', cls: 'warn' },
    ],
  },
  {
    id: 2, title: 'Localização da dor',
    subtitle: 'Onde é predominantemente a dor?',
    options: [
      { icon: '➡️', title: 'Lateral — face externa', desc: 'Lado externo do cotovelo (epicôndilo lateral), piora ao apertar ou estender o punho', action: 'loc_lateral' },
      { icon: '⬅️', title: 'Medial — face interna', desc: 'Lado interno do cotovelo (epicôndilo medial), pode haver formigueiros no dedo mínimo', action: 'loc_medial' },
      { icon: '⬇️', title: 'Posterior — ponta do cotovelo', desc: 'Olecrânio, inchaço na ponta, dor ao apoiar', action: 'loc_posterior' },
      { icon: '🌐', title: 'Difusa / irradia para o braço', desc: 'Dor que sobe para o ombro ou desce para o antebraço, formigueiros', action: 'loc_difusa', cls: 'warn' },
    ],
  },
  {
    id: 3, title: 'ROM — Amplitude de Movimento',
    subtitle: 'Como está a mobilidade do cotovelo?',
    options: [
      { icon: '🔒', title: 'Marcadamente limitado', desc: 'Dificuldade em dobrar ou esticar o cotovelo, défice de extensão', action: 'rom_limitado', cls: 'warn' },
      { icon: '⚠️', title: 'Ligeiramente limitado ou doloroso', desc: 'Movimento possível mas com dor nos extremos', action: 'rom_parcial' },
      { icon: '✅', title: 'ROM preservado', desc: 'Mobilidade normal, a dor não limita o movimento', action: 'rom_normal' },
    ],
  },
  {
    id: 4, title: 'Padrão e fatores de agravamento',
    subtitle: 'O que piora a dor?',
    options: [
      { icon: '🤜', title: 'Força de preensão / apertar objetos', desc: 'Aperto de mão, abrir uma garrafa, usar computador, transportar pesos', action: 'agrava_preensao' },
      { icon: '⚡', title: 'Formigueiros / parestesias 4º-5º dedo', desc: 'Sensação elétrica, adormecimento dos dedos anelar e mínimo', action: 'agrava_parestesias', cls: 'warn' },
      { icon: '😴', title: 'Dor noturna / em repouso', desc: 'Piora à noite ou sem atividade específica', action: 'agrava_repouso', cls: 'warn' },
      { icon: '🔄', title: 'Rotação do antebraço / pronossupinação', desc: 'Piora ao virar a chave, usar chave de fendas', action: 'agrava_rotacao' },
    ],
  },
];

export const SIDEBAR_LABELS = ['Red Flags', 'Mecanismo', 'Localização', 'ROM', 'Padrão da dor', 'Resultado'];

// ===== RESULT BUILDER =====

export interface ElbowHypothesis {
  id: string;
  label: string;
  prob: string;
}

export interface ElbowResultData {
  narrative: string;
  hypotheses: ElbowHypothesis[];
  alert?: { type: 'red' | 'orange'; text: string };
}

export function buildElbowResult(answers: Record<number, string>): ElbowResultData {
  const redflag = answers[0] === 'redflag';
  const mecanismo = answers[1] || '';
  const localizacao = answers[2] || '';
  const rom = answers[3] || '';
  const agravamento = answers[4] || '';

  if (redflag) {
    return {
      narrative: 'O doente apresenta sinais de alarme que obrigam a excluir patologia grave antes de qualquer outra abordagem. Artrite séptica, gota aguda, tumor ósseo ou fratura não devem ser geridos como patologia tendinosa simples. Investigação urgente necessária.',
      hypotheses: [
        { id: 'redflag', label: '🚨 Patologia grave (séptica, tumoral, cristais)', prob: 'A excluir urgentemente' },
        { id: 'gota', label: '🔷 Gota / Pseudogota do cotovelo', prob: 'Se edema + eritema + sem febre alta' },
      ],
      alert: { type: 'red', text: '🔴 Investigação urgente — não gerir como tendinopatia simples' },
    };
  }

  const parts: string[] = [];

  if (mecanismo === 'trauma') parts.push('o quadro surgiu após traumatismo agudo, o que obriga a excluir fratura ou lesão ligamentar antes de qualquer outra hipótese');
  else if (mecanismo === 'overuse') parts.push('o início relacionado com sobrecarga ou uso repetitivo é o padrão clássico das tendinopatias do cotovelo');
  else if (mecanismo === 'insidioso') parts.push('o início insidioso e progressivo sugere um processo degenerativo ou compressivo crónico');
  else if (mecanismo === 'inflamatorio') parts.push('o início súbito com edema e calor levanta a hipótese de processo inflamatório — artrite, gota ou bursite séptica');

  if (localizacao === 'loc_lateral') parts.push('a dor localizada na face lateral (epicôndilo lateral) é o dado mais importante e aponta fortemente para epicondilite lateral');
  else if (localizacao === 'loc_medial') parts.push('a dor na face medial (epicôndilo medial) direciona para epicondilite medial ou síndrome do canal cubital — a coexistência é frequente');
  else if (localizacao === 'loc_posterior') parts.push('a dor posterior sobre o olecrânio, especialmente com edema flutuante, é típica de bursite olecraneana');
  else if (localizacao === 'loc_difusa') parts.push('a dor difusa com irradiação levanta a hipótese de origem cervical (C6-C7) — o cotovelo pode não ser o problema principal');

  if (rom === 'rom_limitado') parts.push('a limitação marcada do ROM, especialmente o défice de extensão passiva, sugere envolvimento articular (artrose, corpo livre, derrame)');
  else if (rom === 'rom_normal') parts.push('o ROM preservado torna a patologia articular estrutural menos provável');

  if (agravamento === 'agrava_parestesias') parts.push('os formigueiros nos 4º-5º dedos são altamente sugestivos de compressão do nervo cubital no canal cubital');
  else if (agravamento === 'agrava_preensao') parts.push('o agravamento com a força de preensão é o padrão típico das epicondilites');
  else if (agravamento === 'agrava_repouso') parts.push('a dor em repouso é atípica para tendinopatia e deve alertar para processo inflamatório ou compressivo');
  else if (agravamento === 'agrava_rotacao') parts.push('o agravamento com rotação do antebraço pode sugerir envolvimento da articulação proximal rádio-ulnar ou do bíceps distal');

  const narrative = `Tendo em conta o que foi referido, ${parts.join(', ')}. O exame objetivo e os testes específicos são determinantes para confirmar ou afastar as hipóteses.`;

  let hypotheses: ElbowHypothesis[];

  if (mecanismo === 'trauma') {
    hypotheses = [
      { id: 'trauma_cotovelo', label: '💥 Patologia pós-traumática', prob: '1ª hipótese — Rx urgente' },
      { id: 'epicondilite_lateral', label: '🎾 Epicondilite lateral', prob: '2ª hipótese — se dor lateral sem instabilidade' },
      { id: 'bursite_olecraniana', label: '💧 Bursite olecraneana', prob: '3ª hipótese — se edema posterior' },
    ];
  } else if (localizacao === 'loc_lateral') {
    if (agravamento === 'agrava_preensao' || mecanismo === 'overuse') {
      hypotheses = [
        { id: 'epicondilite_lateral', label: '🎾 Epicondilite Lateral', prob: '1ª hipótese — padrão clássico overuse + dor lateral' },
        { id: 'nip', label: '🔴 Síndrome N. Interósseo Posterior', prob: '2ª hipótese — se fraqueza extensores sem dor típica à palpação' },
        { id: 'artrose_radio', label: '🦴 Artrose Radioumeral', prob: '3ª hipótese — se ROM limitado + crepitações' },
      ];
    } else {
      hypotheses = [
        { id: 'epicondilite_lateral', label: '🎾 Epicondilite Lateral', prob: '1ª hipótese — mais frequente' },
        { id: 'artrose_radio', label: '🦴 Artrose Radioumeral', prob: '2ª hipótese — se ROM limitado' },
        { id: 'bursite_olecraniana', label: '💧 Bursite olecraneana', prob: '3ª hipótese — se componente posterior' },
      ];
    }
  } else if (localizacao === 'loc_medial') {
    if (agravamento === 'agrava_parestesias') {
      hypotheses = [
        { id: 'canal_cubital', label: '⚡ Síndrome do Canal Cubital', prob: '1ª hipótese — parestesias 4º/5º dedo são altamente sugestivas' },
        { id: 'epicondilite_medial', label: '⛳ Epicondilite Medial', prob: '2ª hipótese — pode coexistir com compressão cubital' },
        { id: 'ucl', label: '🏋 Lesão UCL', prob: '3ª hipótese — atleta de lançamento, instabilidade medial' },
      ];
    } else {
      hypotheses = [
        { id: 'epicondilite_medial', label: '⛳ Epicondilite Medial', prob: '1ª hipótese — dor medial com flexão resistida punho' },
        { id: 'canal_cubital', label: '⚡ Síndrome do Canal Cubital', prob: '2ª hipótese — excluir compressão cubital' },
        { id: 'ucl', label: '🏋 Lesão UCL', prob: '3ª hipótese — se contexto de lançamento/desporto' },
      ];
    }
  } else if (localizacao === 'loc_posterior') {
    hypotheses = [
      { id: 'bursite_olecraniana', label: '💧 Bursite Olecraneana', prob: '1ª hipótese — edema flutuante posterior' },
      { id: 'gota', label: '🔷 Gota / Pseudogota', prob: '2ª hipótese — se eritema + hiperuricemia' },
      { id: 'tendinite_triceps', label: '💪 Tendinite do Tríceps', prob: '3ª hipótese — dor à extensão resistida' },
    ];
  } else if (localizacao === 'loc_difusa') {
    hypotheses = [
      { id: 'radiculopatia_e', label: '⚡ Radiculopatia Cervical C6-C7', prob: '1ª hipótese — dor difusa com irradiação' },
      { id: 'epicondilite_lateral', label: '🎾 Epicondilite Lateral', prob: '2ª hipótese — coexistência frequente' },
      { id: 'dor_miofascial_e', label: '💆 Dor Miofascial', prob: '3ª hipótese — se ROM normal, pontos gatilho' },
    ];
  } else if (mecanismo === 'inflamatorio') {
    hypotheses = [
      { id: 'bursite_olecraniana', label: '💧 Bursite Olecraneana', prob: '1ª hipótese — edema súbito posterior' },
      { id: 'gota', label: '🔷 Gota / Pseudogota', prob: '2ª hipótese — eritema + hiperuricemia' },
      { id: 'artrite_e', label: '🔴 Artrite (AR / Reativa / Séptica)', prob: '3ª hipótese — limitação ROM + contexto sistémico' },
    ];
  } else {
    hypotheses = [
      { id: 'epicondilite_lateral', label: '🎾 Epicondilite Lateral', prob: '1ª hipótese — mais frequente' },
      { id: 'canal_cubital', label: '⚡ Síndrome do Canal Cubital', prob: '2ª hipótese — excluir' },
      { id: 'bursite_olecraniana', label: '💧 Bursite Olecraneana', prob: '3ª hipótese — verificar posterior' },
    ];
  }

  let alert: ElbowResultData['alert'];
  if (agravamento === 'agrava_repouso') {
    alert = { type: 'orange', text: '🟠 Dor em repouso — excluir causa inflamatória sistémica, compressiva ou processo séptico' };
  }

  return { narrative, hypotheses, alert };
}

// ===== EXAM SECTIONS =====

export interface ExamTest {
  name: string;
  struct?: string;
  sens?: string;
  spec?: string;
  lr?: string;
  lrLabel?: string;
  howTo?: string;
  observeItems?: string[];
  positive?: string;
  positiveStyle?: string;
  open?: boolean;
}

export interface ExamSection {
  id: string;
  icon: string;
  label: string;
  title: string;
  desc?: string;
  tests: ExamTest[];
}

export const EXAM_SECTIONS: ExamSection[] = [
  {
    id: 'lat', icon: '🎾', label: 'Lateral / Tenista', title: "Epicondilite Lateral — 'Cotovelo de Tenista'",
    desc: 'Testes para patologia do epicôndilo lateral e extensores do punho.',
    tests: [
      {
        name: 'Teste de Cozen', struct: 'Epicondilite lateral — Alta sens.', open: true,
        sens: '84%', spec: '74%', lr: '3.23',
        howTo: 'Cotovelo em extensão, punho em pronação. Pedir extensão resistida do punho enquanto se palpa o epicôndilo lateral.',
        positive: '⚡ Positivo: dor sobre o epicôndilo lateral → probabilidade epicondilite lateral',
      },
      {
        name: 'Teste de Mill', struct: 'Epicondilite lateral',
        howTo: 'Cotovelo em extensão + pronação do antebraço + flexão passiva do punho. Observar dor no epicôndilo lateral.',
        positive: '⚡ Positivo: dor no epicôndilo lateral com este posicionamento',
      },
      {
        name: 'Chair Test (Polk)', struct: 'Epicondilite lateral — Funcional',
        howTo: 'Pedir ao doente para levantar uma cadeira pelo espaldar com cotovelo em extensão e antebraço em pronação.',
        positive: '⚡ Positivo: dor no epicôndilo lateral ao tentar levantar → reproduz sintoma funcional típico',
      },
      {
        name: "Maudsley's Test", struct: 'N. Interósseo Posterior vs ECRB',
        howTo: 'Resistência à extensão do 3º dedo (dedo médio) com cotovelo em extensão.',
        positive: '⚡ Positivo: dor sobre epicôndilo lateral → compressão nervo interósseo posterior (DDx com epicondilite)',
      },
    ],
  },
  {
    id: 'med', icon: '⛳', label: 'Medial / Golfista', title: "Epicondilite Medial — 'Cotovelo de Golfista'",
    desc: 'Testes para patologia do epicôndilo medial e flexores do punho.',
    tests: [
      {
        name: 'Teste de Flexão Resistida do Punho', struct: 'Epicondilite medial', open: true,
        sens: '75%', spec: '68%', lr: '2.34',
        howTo: 'Cotovelo em extensão, antebraço em supinação. Resistência à flexão do punho enquanto se palpa o epicôndilo medial.',
        positive: '⚡ Positivo: dor sobre o epicôndilo medial → probabilidade epicondilite medial',
      },
      {
        name: 'Teste de Pronação Resistida', struct: 'Pronador Redondo',
        howTo: 'Cotovelo a 90°, antebraço em posição neutra. Resistência à pronação do antebraço.',
        positive: '⚡ Positivo: dor medial → envolvimento do pronador redondo + flexores',
      },
      {
        name: 'Valgus Stress Test', struct: 'Lig. Colateral Medial (UCL)',
        howTo: 'Cotovelo a 30° de flexão (desbloqueia olecrânio). Aplicar força em valgus (medial) ao antebraço enquanto estabiliza o úmero.',
        positive: '⚡ Positivo: dor medial e/ou abertura do espaço medial → lesão UCL (atletas de lançamento)',
      },
    ],
  },
  {
    id: 'cubital', icon: '⚡', label: 'Nervo Cubital', title: 'Nervo Cubital — Síndrome do Canal Cubital',
    desc: '2ª causa mais comum de neuropatia membro superior. Parestesias 4º/5º dedos.',
    tests: [
      {
        name: 'Sinal de Tinel no Canal Cubital', struct: 'N. Cubital — Screening', open: true,
        sens: '70%', spec: '98%', lr: '35',
        howTo: 'Percussão suave sobre o nervo cubital na goteira epicôndilo medial-olecrânio.',
        positive: '⚡ Positivo: parestesias elétricas no 4º/5º dedo → compressão N. Cubital (Espec. 98%)',
      },
      {
        name: 'Teste de Flexão do Cotovelo', struct: 'N. Cubital — Alta sensibilidade',
        sens: '75%', spec: '99%', lr: '75',
        howTo: 'Flexão máxima do cotovelo + extensão do punho durante 60 segundos. Observar parestesias no 4º/5º dedo.',
        positive: '⚡ Positivo: parestesias no 4º/5º dedo dentro de 60s → síndrome canal cubital',
      },
      {
        name: 'Sinal de Froment', struct: 'Fraqueza N. Cubital',
        howTo: 'Pedir ao doente para segurar uma folha de papel entre polegar e indicador. Tentar retirar o papel.',
        positive: '⚡ Positivo: flexão compensatória do polegar (FPL) para manter a folha → fraqueza do adutor do polegar (N. Cubital)',
      },
    ],
  },
  {
    id: 'rom_e', icon: '🔄', label: 'ROM & Articular', title: 'ROM & Avaliação Articular',
    desc: 'Valores normais e interpretação clínica da amplitude de movimento do cotovelo.',
    tests: [
      {
        name: 'ROM Ativo & Passivo', struct: 'Valores normais', open: true,
        observeItems: [
          '<strong>Flexão:</strong> 0–145° — limitação sugere derrame, corpo livre ou artrose',
          '<strong>Extensão:</strong> 0° — défice de extensão passiva é o sinal articular mais importante',
          '<strong>Pronação:</strong> 0–80° — limitação sugere patologia radioulnar proximal',
          '<strong>Supinação:</strong> 0–85° — limitação sugere patologia radioulnar proximal',
        ],
        positive: '🔑 Défice de extensão passiva → derrame articular ou corpo livre intra-articular',
        positiveStyle: 'purple',
      },
      {
        name: 'Teste de Estabilidade em Varus', struct: 'Lig. Colateral Lateral',
        howTo: 'Cotovelo a 30° de flexão. Aplicar força em varus (lateral) ao antebraço com estabilização do úmero.',
        positive: '⚡ Positivo: dor lateral e/ou abertura → lesão ligamento colateral lateral',
      },
    ],
  },
  {
    id: 'posterior', icon: '💧', label: 'Posterior & Bursa', title: 'Face Posterior — Bursa & Tríceps',
    desc: 'Avaliação da bursa olecraneana e tendão do tríceps.',
    tests: [
      {
        name: 'Palpação Bursa Olecraneana', struct: 'Bursite', open: true,
        howTo: 'Cotovelo a 90°. Palpação suave sobre o olecrânio. Avaliar flutuação, calor, eritema e dor.',
        positive: '⚡ Positivo: swelling flutuante sobre olecrânio → bursite. Se eritema + febre → excluir séptica',
      },
      {
        name: 'Extensão Tríceps Resistida', struct: 'Integridade tendão tríceps',
        howTo: 'Cotovelo a 90° de flexão. Pedir extensão ativa contra resistência. Palpar o tendão do tríceps sobre o olecrânio.',
        positive: '⚡ Positivo: incapacidade de extensão + descontinuidade palpável → rotura tendão tríceps (urgência cirúrgica)',
      },
      {
        name: 'Teste do Bíceps Distal', struct: 'Integridade tendão bíceps distal',
        howTo: 'Pedir supinação resistida + flexão do cotovelo. Palpar a tuberosidade radial anterior.',
        positive: '⚡ Positivo: sinal de Popeye invertido (músculo retraído para cima) + perda supinação → rotura bíceps distal',
      },
    ],
  },
  {
    id: 'cervical', icon: '🧠', label: 'Cervical & Neuro', title: 'Avaliação Cervical & Neurológica',
    desc: 'Excluir radiculopatia cervical como causa de dor no cotovelo — C6 e C7 são os mais comuns.',
    tests: [
      {
        name: "Spurling's Test", struct: 'Radiculopatia cervical', open: true,
        howTo: 'Cabeça inclinada para o lado sintomático + extensão + compressão axial suave.',
        positive: '⚡ Positivo: dor irradiada para cotovelo/braço = radiculopatia (referir Neurocirurgia/Ortopedia)',
        positiveStyle: 'danger',
      },
      {
        name: 'Dermátomos C6–C8', struct: 'Avaliação neurológica rápida',
        observeItems: [
          '<strong>C6:</strong> bíceps + extensão punho + face lateral antebraço + polegar',
          '<strong>C7:</strong> tríceps + flexão punho + dedo médio',
          '<strong>C8:</strong> flexores dedos + dedo mínimo',
        ],
        positive: '⚠ Défice motor ou sensitivo → referência urgente Neurologia/Ortopedia espinal',
        positiveStyle: 'danger',
      },
    ],
  },
];

// ===== DDX DATA =====

export interface DdxTag {
  cls: string;
  label: string;
}

export interface DdxTest {
  name: string;
  how: string;
  pos: string;
  neg: string;
}

export interface DdxApproach {
  immediate: string[];
  home: string[];
  exams: string[];
  refer: string[];
  benign: string[];
}

export interface ElbowDdxItem {
  id: string;
  icon: string;
  iconClass: string;
  title: string;
  subtitle: string;
  group: string;
  urgency: string;
  urgencyLabel: string;
  tags: DdxTag[];
  tests: DdxTest[];
  approach: DdxApproach;
}

export const DDX_DATA: ElbowDdxItem[] = [
  {
    id: 'epicondilite_lateral', icon: '🎾', iconClass: 'ri-blue',
    title: 'Epicondilite Lateral', subtitle: '"Cotovelo de Tenista" — mais comum (1–3% população)',
    group: 'Comum', urgency: 'ub-blue', urgencyLabel: '🔵 CSP',
    tags: [{ cls: 'dt-common', label: 'Mais comum' }, { cls: 'dt-age', label: '35–55 anos' }],
    tests: [
      { name: 'Cozen Test', how: 'Cotovelo estendido, punho em pronação → extensão resistida do punho', pos: 'Dor epicôndilo lateral → ↑↑ probabilidade (Sens. 84%)', neg: 'Sem dor → ↓ probabilidade' },
      { name: 'Mill Test', how: 'Cotovelo estendido + pronação + flexão passiva do punho', pos: 'Dor lateral → ↑ probabilidade', neg: 'Sem dor → ↓ probabilidade' },
      { name: 'Palpação epicôndilo lateral', how: 'Pressão 1cm distal-anterior ao epicôndilo lateral', pos: 'Dor focal muito reprodutível → ↑↑ probabilidade (sinal mais específico)', neg: 'Indolor → ↓ probabilidade' },
      { name: 'Chair Test', how: 'Levantar cadeira com cotovelo estendido e pronação', pos: 'Dor lateral → reproduz sintoma funcional', neg: 'Sem dor → ↓ probabilidade' },
    ],
    approach: {
      immediate: ['AINE oral 1–2 semanas com proteção gástrica', 'Cinta epicondiliana (banda de força) 2–3cm abaixo do epicôndilo', 'Gelo local 15min, 3x/dia na fase aguda', 'Evitar atividades desencadeantes (apertar, puxar, levantar)'],
      home: ['Alongamento extensores: punho em flexão máxima com cotovelo estendido — 30s, 5x/dia', 'Exercícios excêntricos extensores (Tyler Twist): fundamental na fase subaguda/crónica', 'Ergonomia: rato neutro, teclado ao nível dos cotovelos, evitar prolongada pronação-extensão', 'Calor local antes dos exercícios (fase subaguda)'],
      exams: ['Geralmente diagnóstico clínico — sem exames na 1ª consulta', 'Ecografia: se atípico, suspeita de rotura parcial, ou falha terapêutica', 'RMN: raramente necessário — suspeita de corpo livre ou lesão associada', 'Rx cotovelo: se suspeita de artrose ou calcificação'],
      refer: ['Fisioterapia: se sem melhoria em 6–8 semanas (excêntrico + US terapêutico)', 'Infiltração corticosteroide eco-guiada: alívio a curto prazo, mas não superior a longo prazo', 'Ortopedia: falha conservadora > 6–12 meses — PRP, tenotomia percutânea ou artroscopia'],
      benign: ['Síndrome do nervo interósseo posterior (fraqueza extensores sem dor típica à palpação direta)', 'Artrose radioumeral (ROM limitado com crepitações, Rx diagnóstico)', 'Dor cervical referida C6 (irradiação, Spurling positivo, ROM cotovelo normal)', 'Síndrome do desfiladeiro torácico (bilateral, piora com elevação braços)'],
    },
  },
  {
    id: 'epicondilite_medial', icon: '⛳', iconClass: 'ri-green',
    title: 'Epicondilite Medial', subtitle: '"Cotovelo de Golfista" — 5–10x menos comum que lateral',
    group: 'Comum', urgency: 'ub-blue', urgencyLabel: '🔵 CSP',
    tags: [{ cls: 'dt-age', label: '35–55 anos' }, { cls: 'dt-trauma', label: 'Sobrecarga flexores' }],
    tests: [
      { name: 'Flexão Resistida do Punho', how: 'Cotovelo estendido, supinação → flexão resistida do punho', pos: 'Dor epicôndilo medial → ↑↑ probabilidade', neg: 'Sem dor → ↓ probabilidade' },
      { name: 'Pronação Resistida', how: 'Cotovelo 90°, posição neutra → pronação resistida', pos: 'Dor medial → envolvimento pronador redondo', neg: 'Sem dor → ↓ probabilidade' },
      { name: 'Palpação epicôndilo medial', how: 'Pressão direta sobre epicôndilo medial', pos: 'Dor focal → ↑↑ probabilidade', neg: 'Indolor → ↓ probabilidade' },
    ],
    approach: {
      immediate: ['AINE oral 1–2 semanas', 'Repouso relativo — evitar atividades com flexão resistida punho', 'Gelo local 15min, 3x/dia', 'Cinta epicondiliana medial se disponível'],
      home: ['Alongamento flexores: punho em extensão máxima com cotovelo estendido — 30s, 5x/dia', 'Exercícios excêntricos flexores na fase subaguda', 'Ergonomia de trabalho: evitar flexão prolongada do cotovelo', 'Técnica desportiva: avaliação grip e swing se atleta'],
      exams: ['Geralmente diagnóstico clínico', 'Ecografia: suspeita rotura parcial ou falha terapêutica', 'EMG/VCN: excluir síndrome canal cubital coexistente (frequente!)'],
      refer: ['Fisioterapia: sem melhoria em 6–8 semanas', 'Neurofisiologia: se suspeita de síndrome canal cubital associado', 'Ortopedia: falha conservadora > 6 meses'],
      benign: ['Síndrome do canal cubital (parestesias 4º/5º, Tinel medial positivo)', 'Lesão UCL (atleta de lançamento, instabilidade em valgus)', 'Dor cervical referida C7 (irradiação, ROM cervical limitado)'],
    },
  },
  {
    id: 'canal_cubital', icon: '⚡', iconClass: 'ri-purple',
    title: 'Síndrome do Canal Cubital', subtitle: '2ª neuropatia mais comum membro sup. — compressão N. Cubital',
    group: 'Comum', urgency: 'ub-orange', urgencyLabel: '🟠 EMG + Ortopedia',
    tags: [{ cls: 'dt-common', label: 'Frequente' }, { cls: 'dt-systemic', label: 'Neuropatia' }],
    tests: [
      { name: 'Sinal de Tinel Canal Cubital', how: 'Percussão sobre N. Cubital na goteira medial', pos: 'Parestesias 4º/5º dedo → ↑ probabilidade (Espec. 98%)', neg: 'Negativo → ↓ probabilidade (mas não exclui)' },
      { name: 'Teste de Flexão do Cotovelo', how: 'Flexão máxima cotovelo + extensão punho durante 60s', pos: 'Parestesias 4º/5º dedo em <60s → ↑↑ probabilidade (Espec. 99%)', neg: 'Negativo → ↓ probabilidade' },
      { name: 'Sinal de Froment', how: 'Segurar papel entre polegar e indicador — tentar retirar', pos: 'Flexão FPL compensatória → fraqueza adutor polegar (caso avançado)', neg: 'Força normal → sem défice motor significativo' },
    ],
    approach: {
      immediate: ['Evitar flexão prolongada do cotovelo (especialmente à noite)', 'Almofada de proteção do cotovelo noturna ou tala em extensão à noite', 'Evitar apoiar o cotovelo em superfícies duras', 'AINE se componente inflamatório local'],
      home: ['Dormir com cotovelo em extensão: envolver toalha ou usar tala noturna', 'Evitar cotovelo fletido mais de 90° por períodos longos', 'Ajuste ergonómico: suporte cotovelo, evitar bordo mesa', 'Exercícios deslizamento neural cubital (nerve gliding)'],
      exams: ['EMG/VCN: confirma diagnóstico, avalia gravidade e localização', 'Rx cotovelo: excluir osteófito ou corpo livre que comprime o nervo', 'Ecografia: avalia espessura nervo e causa compressiva'],
      refer: ['Neurofisiologia: EMG/VCN — essencial antes de cirurgia', 'Ortopedia/Neurocirurgia: défice motor, atrofia intrínseca, falha conservadora > 3–6 meses — descompressão ou transposição do nervo'],
      benign: ['Epicondilite medial coexistente (dor à palpação epicôndilo, sem parestesias)', 'Radiculopatia C8 (parestesias dedo mínimo, Spurling positivo, EMG diferencia)', 'Síndrome do canal de Guyon (compressão N. Cubital no pulso, Tinel no pulso)'],
    },
  },
  {
    id: 'bursite_olecraniana', icon: '💧', iconClass: 'ri-orange',
    title: 'Bursite Olecraneana', subtitle: 'Distensão bursa posterior — traumática, por fricção ou inflamatória',
    group: 'Comum', urgency: 'ub-blue', urgencyLabel: '🔵 CSP / SU se séptica',
    tags: [{ cls: 'dt-common', label: 'Frequente' }, { cls: 'dt-trauma', label: 'Trauma / Fricção' }],
    tests: [
      { name: 'Inspeção + Palpação Bursa', how: 'Observar e palpar olecrânio com cotovelo a 90°', pos: 'Swelling flutuante sobre olecrânio → bursite confirmada', neg: 'Sem swelling → diagnóstico improvável' },
      { name: 'Sinais de sépsis local', how: 'Avaliar eritema, calor, temperatura, adenopatias, febre', pos: 'Eritema + calor + febre → EXCLUIR BURSITE SÉPTICA urgentemente', neg: 'Sem sinais inflamatórios → bursite asséptica' },
      { name: 'ROM cotovelo', how: 'Avaliar ROM ativo e passivo', pos: 'ROM preservado apesar do swelling → típico de bursite (vs artrite)', neg: 'ROM limitado → artrite ou derrame articular — ponderar artrocentese' },
    ],
    approach: {
      immediate: ['Bursite asséptica: AINE + proteção (cotoveira) + evitar apoio', 'Bursite séptica: artrocentese diagnóstica + antibioterapia anti-estafilocócica (flucloxacilina)', 'Punção-aspiração: se volumosa e limitante — enviar líquido para análise (células, cristais, cultura)', 'Gelo local 20min, 3x/dia na fase aguda'],
      home: ['Usar cotoveira protetora para evitar trauma repetido', 'Evitar apoiar o cotovelo em superfícies duras', 'Elevação do membro se edema importante', 'Calor local (fase subaguda não séptica)'],
      exams: ['Geralmente diagnóstico clínico', 'Análise líquido bursal: células, cristais, Gram e cultura — obrigatório se séptica suspeita', 'Ecografia: confirma distensão bursal, orienta punção', 'Rx: excluir calcificações, osteofito, corpo livre'],
      refer: ['SU: suspeita bursite séptica (eritema, febre, leucocitose)', 'Ortopedia: bursite crónica recidivante, falha após múltiplas aspirações — bursectomia', 'Reumatologia: se gota ou AR subjacente'],
      benign: ['Derrame articular (ROM limitado, dor articular difusa)', 'Gota do cotovelo (cristais no líquido, hiperuricemia, podagra prévia)', 'Tumor tecidos moles (swelling duro, sem flutuação, crescimento progressivo)'],
    },
  },
  {
    id: 'nip', icon: '🔴', iconClass: 'ri-orange',
    title: 'Síndrome N. Interósseo Posterior', subtitle: 'Compressão ramo motor do N. Radial — confunde com epicondilite lateral',
    group: 'Menos Comum', urgency: 'ub-orange', urgencyLabel: '🟠 EMG + Ortopedia',
    tags: [{ cls: 'dt-age', label: '30–50 anos' }, { cls: 'dt-systemic', label: 'Neuropatia motora' }],
    tests: [
      { name: 'Maudsley Test', how: 'Resistência à extensão do 3º dedo com cotovelo estendido', pos: 'Dor sobre arco de Frohse (4cm distal epicôndilo) — não sobre epicôndilo → ↑ probabilidade NIP', neg: 'Dor sobre epicôndilo → mais provável epicondilite' },
      { name: 'Palpação arco de Frohse', how: 'Palpação 4–5cm distal ao epicôndilo lateral, sobre o músculo supinador', pos: 'Dor focal → compressão no arco de Frohse', neg: 'Indolor → ↓ probabilidade' },
      { name: 'Fraqueza extensores dedos', how: 'Avaliar extensão ativa de todos os dedos', pos: 'Fraqueza extensão dedos/polegar SEM dor articular significativa → NIP', neg: 'Força normal → NIP improvável' },
    ],
    approach: {
      immediate: ['AINE + repouso relativo', 'Evitar supinação repetida contra resistência', 'Tala em extensão parcial do cotovelo se muito sintomático'],
      home: ['Evitar movimentos de supinação forçada repetida', 'Ergonomia de trabalho: evitar rotação repetida do antebraço', 'Exercícios de deslizamento neural radial suaves'],
      exams: ['EMG/VCN: confirma e localiza a compressão', 'RMN: edema muscular dos extensores confirma denervação', 'Ecografia: visualiza compressão no arco de Frohse'],
      refer: ['Neurofisiologia: EMG — obrigatório para diagnóstico', 'Ortopedia: falha conservadora > 3–6 meses — descompressão cirúrgica'],
      benign: ['Epicondilite lateral (dor sobre epicôndilo, sem fraqueza extensora pura)', 'Artrose radioumeral (ROM limitado, crepitações)', 'Radiculopatia C7 (irradiação cervical, Spurling positivo)'],
    },
  },
  {
    id: 'artrose_radio', icon: '🦴', iconClass: 'ri-orange',
    title: 'Artrose Radioumeral / do Cotovelo', subtitle: 'Desgaste articular — mais comum após trauma ou uso intenso',
    group: 'Menos Comum', urgency: 'ub-blue', urgencyLabel: '🔵 CSP / Ortopedia eletiva',
    tags: [{ cls: 'dt-age', label: '> 50 anos' }, { cls: 'dt-systemic', label: 'Degenerativo' }],
    tests: [
      { name: 'ROM com crepitações', how: 'Avaliar ROM ativo e passivo com mão palpando articulação', pos: 'Crepitações + limitação ROM (esp. extensão) → ↑ probabilidade artrose', neg: 'ROM normal sem crepitações → artrose improvável' },
      { name: 'Défice de extensão passiva', how: 'Extensão passiva máxima do cotovelo', pos: 'Défice > 10° → corpo livre ou artrose — Rx obrigatório', neg: 'Extensão completa → artrose/corpo livre menos provável' },
    ],
    approach: {
      immediate: ['Paracetamol regular como base', 'AINE em cursos curtos nas agudizações', 'Repouso relativo nas fases de agudização'],
      home: ['Manter mobilidade com exercícios suaves diários', 'Calor local antes dos exercícios', 'Evitar carga excessiva mas não imobilizar'],
      exams: ['Rx cotovelo AP + perfil: confirma diagnóstico (pinçamento, osteófitos, corpos livres)', 'TC: avaliação pré-cirúrgica, corpos livres', 'RMN: lesão cartilagem, corpos livres'],
      refer: ['Ortopedia: limitação funcional severa, corpos livres sintomáticos, considerar artroplastia', 'Fisioterapia: manutenção de mobilidade e força'],
      benign: ['Epicondilite lateral (ROM normal, dor localizada ao epicôndilo)', 'Bursite olecraneana (swelling posterior, ROM preservado)', 'Artrite inflamatória (bilateral, matinal, VS/PCR elevados)'],
    },
  },
  {
    id: 'ucl', icon: '🏋', iconClass: 'ri-orange',
    title: 'Lesão UCL (Ligamento Colateral Medial)', subtitle: '"Tommy John" — atletas de lançamento, instabilidade medial',
    group: 'Menos Comum', urgency: 'ub-orange', urgencyLabel: '🟠 Ortopedia',
    tags: [{ cls: 'dt-trauma', label: 'Desportivo' }, { cls: 'dt-age', label: 'Jovem adulto' }],
    tests: [
      { name: 'Valgus Stress Test', how: 'Cotovelo 30° flexão → força em valgus no antebraço', pos: 'Dor medial e/ou abertura espaço medial → ↑↑ probabilidade lesão UCL', neg: 'Estável e indolor → UCL provavelmente íntegro' },
      { name: 'Milking Maneuver', how: 'Doente puxa o polegar do examinador com cotovelo fletido, criando valgus', pos: 'Dor/instabilidade medial → UCL comprometido', neg: 'Estável → sem lesão UCL significativa' },
    ],
    approach: {
      immediate: ['Imobilização temporária em flexão 90° se lesão aguda', 'Gelo + AINE + analgesia', 'Suspender atividade de lançamento imediatamente'],
      home: ['Repouso de lançamento (mínimo 6 semanas se parcial)', 'Fisioterapia de reabilitação progressiva', 'Técnica de lançamento — avaliação biomecânica'],
      exams: ['Rx: excluir avulsão óssea', 'RMN com gadolínio artro: avalia grau da lesão UCL', 'Ecografia dinâmica: avalia abertura em tempo real com stress'],
      refer: ['Ortopedia: rotura completa em atleta competitivo — cirurgia Tommy John', 'Fisioterapia: lesão parcial — programa de retorno ao lançamento 4–6 meses'],
      benign: ['Epicondilite medial (sem instabilidade, dor à palpação epicôndilo)', 'Canal cubital (parestesias, Tinel positivo)', 'Fratura de stress olecrânio (atletas lançamento, Rx/RMN diagnóstico)'],
    },
  },
  {
    id: 'trauma_cotovelo', icon: '💥', iconClass: 'ri-red',
    title: 'Patologia Pós-Traumática', subtitle: 'Fratura, luxação cotovelo, lesão ligamentar — Rx obrigatório',
    group: 'Traumática', urgency: 'ub-red', urgencyLabel: '🔴 Rx urgente',
    tags: [{ cls: 'dt-trauma', label: 'Trauma agudo' }, { cls: 'dt-age', label: 'Qualquer idade' }],
    tests: [
      { name: 'Palpação sistematizada', how: 'Epicôndilos, olecrânio, cabeça do rádio (rodar antebraço), goteira medial', pos: 'Dor focal + crepitação → fratura provável', neg: 'Indolor → fratura menos provável' },
      { name: 'ROM + Avaliação Neurovascular', how: 'ROM ativo + pulso radial + força mãos + sensibilidade', pos: 'Défice ROM marcado + comprometimento neurovascular → urgência', neg: 'ROM funcional + neuro intacto → lesão grave menos provável' },
    ],
    approach: {
      immediate: ['Imobilização provisória + gelo + analgesia', 'Rx cotovelo AP + perfil + oblíqua: obrigatório', 'Luxação: redução em SU com Rx pré e pós-redução', 'Avaliação neurovascular antes e após qualquer manobra'],
      home: ['Manter imobilização conforme indicação', 'Elevação membro para controlo do edema', 'Exercícios dedos/punho para evitar rigidez distal'],
      exams: ['Rx: obrigatório e imediato', 'TC: fratura complexa intra-articular', 'RMN: suspeita de lesão ligamentar após Rx normal'],
      refer: ['SU imediato: luxação, fratura desviada/intra-articular, défice neurovascular', 'Ortopedia urgente: fratura cabeça rádio tipo III/IV, fratura olecrânio desviada, avulsão epitroclear'],
      benign: ['Contusão simples (ROM funcional, sem instabilidade, sem crepitação)', 'Hematoma local sem lesão estrutural', 'Neuropraxia transitória (recupera em dias-semanas)'],
    },
  },
  {
    id: 'tendinite_triceps', icon: '💪', iconClass: 'ri-green',
    title: 'Tendinite / Tendinopatia do Tríceps', subtitle: 'Inserção no olecrânio — pouco comum, confunde com bursite',
    group: 'Benigna', urgency: 'ub-green', urgencyLabel: '🟢 CSP',
    tags: [{ cls: 'dt-trauma', label: 'Sobrecarga extensão' }, { cls: 'dt-age', label: '30–50 anos' }],
    tests: [
      { name: 'Extensão Resistida Cotovelo', how: 'Cotovelo a 90° → extensão ativa contra resistência', pos: 'Dor sobre olecrânio/tendão tríceps → ↑ probabilidade tendinite', neg: 'Indolor → ↓ probabilidade; se fraqueza marcada → excluir rotura' },
      { name: 'Palpação tendão tríceps', how: 'Palpação direta sobre o tendão proximal ao olecrânio', pos: 'Dor focal reprodutível → tendinopatia tríceps', neg: 'Indolor → ↓ probabilidade' },
    ],
    approach: {
      immediate: ['AINE oral 1–2 semanas', 'Repouso relativo: evitar extensão repetida contra resistência', 'Gelo local 15min, 3x/dia'],
      home: ['Alongamento tríceps: braço levantado, cotovelo fletido atrás da cabeça — 30s, 3x', 'Exercícios excêntricos progressivos', 'Evitar arremessos e push-ups na fase aguda'],
      exams: ['Ecografia: avalia tendão e exclui rotura parcial', 'Rx: excluir calcificação ou esporão olecraneano'],
      refer: ['Fisioterapia: programa excêntrico se refratário', 'Ortopedia: rotura parcial extensa ou falha conservadora > 3 meses'],
      benign: ['Bursite olecraneana (swelling flutuante, não sobre tendão)', 'Fratura de stress olecrânio (atletas, Rx pode ser normal — cintigrafia)', 'Artrose do cotovelo (ROM limitado, crepitações)'],
    },
  },
  {
    id: 'gota', icon: '🔷', iconClass: 'ri-orange',
    title: 'Gota / Pseudogota do Cotovelo', subtitle: 'Artropatia microcristalina — início súbito, eritema intenso',
    group: 'Benigna', urgency: 'ub-orange', urgencyLabel: '🟠 Confirmar + CSP',
    tags: [{ cls: 'dt-systemic', label: 'Cristais / Metabólico' }, { cls: 'dt-age', label: '> 40 anos, H > M' }],
    tests: [
      { name: 'Clínica típica', how: 'Início súbito, eritema + calor + edema + dor muito intensa, frequentemente noturno', pos: 'Quadro típico → ↑ probabilidade gota (confirmar com uricemia + líquido articular)', neg: 'Início gradual, sem eritema → gota menos provável' },
      { name: 'Artrocentese + análise líquido', how: 'Punção articular ou bursal → enviar para cristais, células, cultura', pos: 'Cristais de urato monossódico → gota confirmada; Pirofosfato → pseudogota', neg: 'Sem cristais → excluir diagnóstico' },
    ],
    approach: {
      immediate: ['Colchicina 1mg + 0.5mg 1h depois (primeira crise): eficaz se iniciado <24h', 'AINE em dose plena se sem contraindicação (naproxeno 500mg 12/12h)', 'Corticosteroide oral se AINE/colchicina contraindicados', 'Repouso e gelo local'],
      home: ['Hidratação abundante', 'Evitar álcool e alimentos ricos em purinas na crise', 'Uricosúricos: iniciar APENAS após resolução da crise'],
      exams: ['Uricemia: pode estar normal durante a crise!', 'Análise líquido: cristais — gold standard diagnóstico', 'Rx: tofos, erosões em "saca-rolha" (gota crónica)', 'Ecografia: cristais, tofos'],
      refer: ['Reumatologia: gota recorrente, falha terapêutica, tofos', 'Internamento: crise muito intensa, impossibilidade de medicação oral', 'SU: suspeita de artrite séptica coexistente'],
      benign: ['Bursite olecraneana séptica (febre, leucocitose, cultura positiva)', 'Artrite séptica (urgência — febre alta, líquido turvo/purulento)', 'Celulite periarticular (eritema difuso, sem líquido articular)'],
    },
  },
  {
    id: 'radiculopatia_e', icon: '⚡', iconClass: 'ri-orange',
    title: 'Radiculopatia Cervical C6–C7', subtitle: 'Dor irradiada ao cotovelo de origem cervical',
    group: 'Cervical / Referida', urgency: 'ub-orange', urgencyLabel: '🟠 Avaliar urgência',
    tags: [{ cls: 'dt-systemic', label: 'Cervical' }, { cls: 'dt-age', label: '40–60 anos' }],
    tests: [
      { name: "Spurling's Test", how: 'Cabeça inclinada ipsilateral + extensão + compressão axial suave', pos: 'Dor irradiada ao cotovelo/antebraço → ↑↑ probabilidade radiculopatia', neg: 'Sem irradiação → ↓ probabilidade causa cervical' },
      { name: 'ROM cervical + miótoma', how: 'ROM cervical + força bíceps (C6), tríceps (C7) + sensibilidade', pos: 'Limitação cervical + défice segmentar → ↑↑ probabilidade radiculopatia', neg: 'ROM cervical normal, força simétrica → ↓ probabilidade' },
      { name: 'ROM cotovelo preservado', how: 'Avaliar ROM ativo e passivo cotovelo', pos: 'ROM completamente normal → ↑ probabilidade causa não local (cervical)', neg: 'ROM limitado → provável causa articular local' },
    ],
    approach: {
      immediate: ['AINE se componente inflamatório', 'Evitar posições de extensão cervical prolongada', 'Calor cervical posterior para espasmo associado'],
      home: ['Correção postural: ecrã ao nível dos olhos', 'Chin tuck: retração cervical suave — 10x, 3x/dia', 'Almofada ergonómica cervical'],
      exams: ['Rx cervical: se sintomas > 6 semanas', 'RMN cervical: défice neurológico, Spurling positivo, falha terapêutica', 'EMG/VCN: distinguir radiculopatia de neuropatia periférica'],
      refer: ['Neurocirurgia/Ortopedia espinal: défice motor, falha conservadora > 6–12 sem', 'Fisioterapia: mobilização cervical, tração, estabilização'],
      benign: ['Epicondilite lateral (dor sobre epicôndilo, ROM cervical normal)', 'Canal cubital (parestesias 4º/5º, Tinel medial positivo)', 'Síndrome do desfiladeiro torácico (parestesias, piora com elevação)'],
    },
  },
  {
    id: 'dor_miofascial_e', icon: '💆', iconClass: 'ri-green',
    title: 'Dor Miofascial / Tensão Muscular', subtitle: 'Extensores/flexores do antebraço — frequente em trabalhadores',
    group: 'Benigna', urgency: 'ub-green', urgencyLabel: '🟢 CSP',
    tags: [{ cls: 'dt-common', label: 'Frequente' }, { cls: 'dt-systemic', label: 'Postura / Stress' }],
    tests: [
      { name: 'Palpação pontos gatilho', how: 'Pressão firme sobre músculos extensores/flexores do antebraço', pos: 'Dor reprodutível com irradiação local → ↑ probabilidade dor miofascial', neg: 'Sem pontos gatilho → ↓ probabilidade' },
      { name: 'ROM preservado', how: 'Avaliar ROM cotovelo e punho', pos: 'ROM completamente normal → ↑ probabilidade causa muscular', neg: 'ROM limitado → causa estrutural mais provável' },
    ],
    approach: {
      immediate: ['Calor local + massagem suave', 'AINE em curso curto se necessário', 'Agulhamento seco se disponível'],
      home: ['Correção postural e ergonomia de trabalho', 'Alongamentos regulares extensores e flexores do antebraço', 'Pausas no trabalho: 5min por cada hora de trabalho repetitivo'],
      exams: ['Geralmente nenhum necessário', 'Ecografia ou Rx só se dúvida diagnóstica ou sintomas > 6 semanas'],
      refer: ['Fisioterapia: se refratário após 4–6 semanas', 'Medicina do trabalho: se contexto ocupacional'],
      benign: ['Epicondilite lateral (dor sobre epicôndilo, Cozen positivo)', 'Síndrome do canal cubital (parestesias digitais)', 'Radiculopatia cervical (irradiação, Spurling positivo)'],
    },
  },
  {
    id: 'artrite_e', icon: '🔴', iconClass: 'ri-red',
    title: 'Artrite do Cotovelo', subtitle: 'AR, artrite reativa, psoriásica ou séptica — excluir urgência',
    group: 'Red Flag / Sistémico', urgency: 'ub-red', urgencyLabel: '🔴 Urgência se séptica',
    tags: [{ cls: 'dt-systemic', label: 'Inflamatório / Séptico' }, { cls: 'dt-age', label: 'Qualquer idade' }],
    tests: [
      { name: 'ROM articular limitado bilateral', how: 'Avaliar ambos os cotovelos + outras articulações', pos: 'Bilateral + matinal + outras articulações → artrite inflamatória sistémica', neg: 'Unilateral sem contexto sistémico → causa local mais provável' },
      { name: 'Sinais de sépsis', how: 'Temperatura, eritema, calor, leucocitose, estado geral', pos: 'Febre + artrite → artrocentese urgente + cultura → artrite séptica (emergência)', neg: 'Afebril + bom estado geral → séptica menos provável' },
    ],
    approach: {
      immediate: ['Artrite séptica suspeita: SU imediato — artrocentese + antibioterapia empírica', 'AR: AINE + referência Reumatologia + suspender esforços', 'Repouso articular na fase aguda'],
      home: ['AR controlada: exercícios de mobilidade suave', 'Proteger articulação de sobrecarga durante flares'],
      exams: ['Análises: hemograma, VS, PCR, FR, anti-CCP, ácido úrico', 'Rx: erosões, pinçamento', 'Ecografia: derrame articular, sinóvia', 'Artrocentese: se séptica suspeita — cells, cristais, cultura'],
      refer: ['SU imediato: artrite séptica suspeita', 'Reumatologia: AR, artrite psoriásica, artrite reativa', 'Ortopedia: lavagem artroscópica se séptica confirmada'],
      benign: ['Bursite olecraneana asséptica (swelling posterior, ROM preservado)', 'Gota (cristais, hiperuricemia)', 'Epicondilite lateral (ROM normal, dor localizada)'],
    },
  },
  {
    id: 'redflag', icon: '🚨', iconClass: 'ri-red',
    title: 'Red Flag — Patologia Grave', subtitle: 'Tumor ósseo, artrite séptica, fratura patológica',
    group: 'Red Flag', urgency: 'ub-red', urgencyLabel: '🔴 URGENTE',
    tags: [{ cls: 'dt-common', label: 'NÃO PERDER' }],
    tests: [
      { name: 'Dor noturna intensa', how: 'Dor que acorda, não alivia com repouso', pos: 'Presente → ↑ probabilidade patologia grave (tumoral)', neg: 'Ausente → menos provável' },
      { name: 'Sinais sistémicos', how: 'Febre, perda de peso, sudorese, adenopatias', pos: 'Presentes → investigação oncológica urgente', neg: 'Ausentes → causa grave sistémica menos provável' },
    ],
    approach: {
      immediate: ['Não gerir como tendinopatia sem investigação', 'Análises: hemograma, VS, PCR, LDH, cálcio, fosfatase alcalina', 'Rx cotovelo urgente', 'Artrocentese se derrame (células, cultura, cristais)'],
      home: ['Não aplicável — requer diagnóstico definitivo'],
      exams: ['Rx cotovelo: lesão óssea, fratura patológica', 'RMN: tumor ósseo ou tecidos moles', 'TC: detalhe ósseo, extensão lesão', 'Cintigrafia: metástases ósseas múltiplas'],
      refer: ['SU: artrite séptica, fratura patológica, défice neurovascular', 'Ortopedia Oncológica: tumor ósseo suspeito', 'Reumatologia: artrite inflamatória grave'],
      benign: ['Nevralgia amiotrófica de Parsonage-Turner (dor intensa + fraqueza, sem trauma)', 'Gota aguda muito intensa (cristais diagnósticos)', 'Bursite séptica (confinada à bursa, não articular)'],
    },
  },
];

export const DDX_GROUP_ORDER = ['Comum', 'Menos Comum', 'Traumática', 'Cervical / Referida', 'Benigna', 'Red Flag / Sistémico', 'Red Flag'];
