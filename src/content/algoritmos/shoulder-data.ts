// ===== SHOULDER ALGORITHM DATA (v2) =====

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
    subtitle: 'Excluir patologia grave antes de continuar',
    options: [
      { icon: '🚨', title: 'Sim — Red Flag presente', desc: 'Dor noturna intensa sem alívio, febre, perda de peso, trauma de alta energia, défice neurológico progressivo', action: 'redflag', cls: 'danger' },
      { icon: '✅', title: 'Não — sem sinais de alarme', desc: 'Prosseguir algoritmo musculoesquelético', action: 'next' },
    ],
  },
  {
    id: 1, title: 'Mecanismo de início',
    subtitle: 'Como começou a dor?',
    options: [
      { icon: '💥', title: 'Trauma agudo', desc: 'Queda, impacto direto, entorse, acidente', action: 'trauma_agudo', cls: 'warn' },
      { icon: '🔁', title: 'Sobrecarga / movimento repetitivo', desc: 'Trabalho overhead, desporto, esforço acumulado', action: 'overuse' },
      { icon: '🌙', title: 'Início insidioso / espontâneo', desc: 'Sem causa aparente, progressivo', action: 'insidioso' },
      { icon: '🔥', title: 'Início súbito sem trauma', desc: 'Dor intensa de aparecimento rápido sem mecanismo', action: 'subito' },
    ],
  },
  {
    id: 2, title: 'Duração da dor',
    subtitle: 'Há quanto tempo tem este problema?',
    options: [
      { icon: '⚡', title: 'Menos de 2 semanas', desc: 'Fase aguda', action: 'agudo' },
      { icon: '📅', title: '2 semanas a 3 meses', desc: 'Fase subaguda', action: 'subagudo' },
      { icon: '📆', title: 'Mais de 3 meses', desc: 'Fase crónica', action: 'cronico' },
    ],
  },
  {
    id: 3, title: 'Amplitude de Movimento (ROM)',
    subtitle: 'Como está a mobilidade do ombro?',
    options: [
      { icon: '🔒', title: 'Global — ativo E passivo limitados', desc: 'Dificuldade em todos os movimentos, mesmo quando o médico move o braço', action: 'rom_global', cls: 'warn' },
      { icon: '⚠️', title: 'Parcial — só o movimento ativo dói', desc: 'Quando o médico move o braço, a amplitude é maior', action: 'rom_ativo' },
      { icon: '✅', title: 'ROM preservado', desc: 'Mobilidade normal ou quase normal apesar da dor', action: 'rom_normal' },
    ],
  },
  {
    id: 4, title: 'Localização e padrão da dor',
    subtitle: 'Onde dói e como é a dor?',
    options: [
      { icon: '🔼', title: 'Anterosuperior — topo e face anterior', desc: 'Piora ao levantar o braço, dor entre 60° e 120° de abdução', action: 'loc_superior' },
      { icon: '🔝', title: 'Articulação AC — topo lateral', desc: 'Dor muito localizada na junção entre clavícula e acrómio', action: 'loc_ac' },
      { icon: '◀️', title: 'Anterior — goteira bicipital', desc: 'Dor na face anterior do ombro, piora com flexão do cotovelo', action: 'loc_anterior' },
      { icon: '📡', title: 'Difusa / irradia para o braço', desc: 'Dor que desce pelo braço, formigueiros, sensação elétrica', action: 'loc_irradiada', cls: 'warn' },
    ],
  },
  {
    id: 5, title: 'Dor noturna',
    subtitle: 'A dor interfere com o sono?',
    options: [
      { icon: '🌙', title: 'Sim, intensa — acorda a noite', desc: 'Dor que acorda ou impede de dormir', action: 'noturna_intensa', cls: 'warn' },
      { icon: '😴', title: 'Sim, moderada — dificulta o sono', desc: 'Piora quando deita sobre o ombro', action: 'noturna_mod' },
      { icon: '☀️', title: 'Não — só com movimento / esforço', desc: 'Dor mecânica sem componente noturna significativa', action: 'noturna_nao' },
    ],
  },
];

export const SIDEBAR_LABELS = ['Red Flags', 'Mecanismo', 'Duração', 'ROM', 'Localização', 'Dor noturna', 'Resultado'];

// ===== RESULT BUILDER =====

export interface ShoulderHypothesis {
  id: string;
  label: string;
  prob: string;
}

export interface ShoulderResultData {
  narrative: string;
  hypotheses: ShoulderHypothesis[];
  alert?: { type: 'red' | 'orange'; text: string };
}

export function buildShoulderResult(answers: Record<number, string>): ShoulderResultData {
  const redflag = answers[0] === 'redflag';
  const mecanismo = answers[1] || '';
  const duracao = answers[2] || '';
  const rom = answers[3] || '';
  const loc = answers[4] || '';
  const noturna = answers[5] || '';

  if (redflag) {
    return {
      narrative: 'O doente apresenta sinais de alarme que obrigam a excluir patologia grave antes de qualquer outra abordagem. Dor noturna intensa, febre, perda de peso, défice neurológico ou trauma de alta energia são bandeiras vermelhas que não podem ser ignoradas. Não deve ser tratado como patologia musculoesquelética simples sem investigação prévia.',
      hypotheses: [
        { id: 'redflag', label: '🚨 Patologia grave (tumoral, séptica, visceral)', prob: 'A excluir urgentemente' },
      ],
      alert: { type: 'red', text: '🔴 URGENTE — Excluir patologia grave antes de qualquer abordagem' },
    };
  }

  const parts: string[] = [];

  if (mecanismo === 'trauma_agudo') parts.push('o início está claramente relacionado com um traumatismo agudo');
  else if (mecanismo === 'overuse') parts.push('o quadro sugere um mecanismo de sobrecarga ou uso repetitivo — típico de patologia microtraumática cumulativa');
  else if (mecanismo === 'insidioso') parts.push('o início insidioso sem causa aparente é característico de patologia degenerativa ou inflamatória');
  else if (mecanismo === 'subito') parts.push('o início súbito sem trauma levanta a hipótese de calcificação aguda ou episódio inflamatório');

  if (duracao === 'agudo') parts.push('com uma duração inferior a 2 semanas (fase aguda)');
  else if (duracao === 'subagudo') parts.push('com 2 semanas a 3 meses de evolução (fase subaguda)');
  else if (duracao === 'cronico') parts.push('com mais de 3 meses de evolução — o que sugere um processo estabelecido que pode precisar de abordagem mais estruturada');

  if (rom === 'rom_global') parts.push('a limitação global do movimento — tanto ativo como passivo — é o dado mais relevante aqui, apontando fortemente para envolvimento capsular');
  else if (rom === 'rom_ativo') parts.push('o facto de o movimento passivo estar relativamente preservado enquanto o ativo é doloroso sugere patologia tendínea ou subacromial, sem atingimento capsular major');
  else if (rom === 'rom_normal') parts.push('a amplitude de movimento preservada é um dado importante — torna a patologia articular estrutural ou capsular menos provável');

  if (loc === 'loc_superior') parts.push('a dor na face anterosuperior com arco doloroso é o padrão clássico de conflito subacromial');
  else if (loc === 'loc_ac') parts.push('a dor muito localizada sobre a articulação AC direciona para patologia desta articulação especificamente');
  else if (loc === 'loc_anterior') parts.push('a dor anterior na goteira bicipital sugere envolvimento da longa porção do bíceps ou estruturas anteriores');
  else if (loc === 'loc_irradiada') parts.push('a dor difusa com irradiação para o braço e possíveis parestesias levanta a hipótese de origem cervical ou dor referida — o ombro pode não ser o problema principal');

  if (noturna === 'noturna_intensa') parts.push('a dor noturna intensa que acorda o doente é preocupante e pode indicar patologia mais extensa da coifa ou, menos frequentemente, processo sistémico');
  else if (noturna === 'noturna_mod') parts.push('a dor ao deitar sobre o ombro é frequente na patologia subacromial e da coifa');

  const narrative = `Tendo em conta o que foi referido, ${parts.join(', ')}. O exame objetivo e os testes específicos são determinantes para confirmar ou afastar as hipóteses.`;

  let hypotheses: ShoulderHypothesis[];

  if (mecanismo === 'trauma_agudo') {
    hypotheses = [
      { id: 'trauma', label: '💥 Patologia pós-traumática', prob: '1ª hipótese — Rx obrigatório' },
      { id: 'rotcuff', label: '💪 Rotura aguda da coifa', prob: '2ª hipótese — se fraqueza marcada' },
      { id: 'acjoint', label: '🔝 Lesão acromioclavicular', prob: '3ª hipótese — se dor no topo' },
    ];
  } else if (rom === 'rom_global') {
    hypotheses = [
      { id: 'capsulite', label: '🔒 Capsulite Adesiva', prob: '1ª hipótese — limitação global ativo+passivo é o critério principal' },
      { id: 'artrose', label: '🦴 Artrose Glenoumeral', prob: '2ª hipótese — especialmente se > 60 anos e crepitações' },
      { id: 'rotcuff', label: '💪 Rotura extensa da coifa', prob: '3ª hipótese — pode limitar ROM se muito extensa' },
    ];
  } else if (loc === 'loc_irradiada') {
    hypotheses = [
      { id: 'radicular', label: '⚡ Radiculopatia cervical', prob: '1ª hipótese — dor irradiada com parestesias' },
      { id: 'dor_referida', label: '❤️ Dor referida visceral', prob: '2ª hipótese — excluir sempre SCA (esq) e colecistite (dir)' },
      { id: 'impingement', label: '📌 Impingement subacromial', prob: '3ª hipótese — pode coexistir' },
    ];
  } else if (loc === 'loc_ac') {
    hypotheses = [
      { id: 'acjoint', label: '🔝 Artropatia acromioclavicular', prob: '1ª hipótese — localização é o dado principal' },
      { id: 'impingement', label: '📌 Impingement subacromial', prob: '2ª hipótese — frequentemente coexiste' },
      { id: 'calcificacao', label: '🪨 Tendinite calcificante', prob: '3ª hipótese — se início súbito intenso' },
    ];
  } else if (loc === 'loc_anterior') {
    hypotheses = [
      { id: 'biceps', label: '🦾 Tendinopatia LP Bíceps', prob: '1ª hipótese — dor anterior goteira bicipital' },
      { id: 'impingement', label: '📌 Impingement subacromial', prob: '2ª hipótese — coexiste em ~90% dos casos' },
      { id: 'instabilidade', label: '⚖️ Instabilidade glenoumeral', prob: '3ª hipótese — jovem com dor anterior' },
    ];
  } else if (mecanismo === 'subito' && noturna === 'noturna_intensa') {
    hypotheses = [
      { id: 'calcificacao', label: '🪨 Tendinite Calcificante', prob: '1ª hipótese — crise aguda intensa sem trauma' },
      { id: 'bursite', label: '🔥 Bursite subacromial aguda', prob: '2ª hipótese — inflamação aguda subacromial' },
      { id: 'redflag', label: '🚨 Causa não-MSK', prob: 'A excluir — dor intensa súbita sem explicação MSK' },
    ];
  } else if ((mecanismo === 'overuse' || mecanismo === 'insidioso') && duracao === 'cronico' && noturna === 'noturna_intensa') {
    hypotheses = [
      { id: 'rotcuff', label: '💪 Rotura da coifa dos rotadores', prob: '1ª hipótese — crónico + dor noturna intensa' },
      { id: 'impingement', label: '📌 Impingement subacromial', prob: '2ª hipótese — mais comum, pode evoluir para rotura' },
      { id: 'capsulite', label: '🔒 Capsulite adesiva', prob: '3ª hipótese — se início de limitação ROM' },
    ];
  } else if (mecanismo === 'overuse' || mecanismo === 'insidioso') {
    hypotheses = [
      { id: 'impingement', label: '📌 Impingement subacromial', prob: '1ª hipótese — padrão de sobrecarga mais comum' },
      { id: 'bursite', label: '🔥 Bursite subacromial', prob: '2ª hipótese — frequentemente associada' },
      { id: 'dor_miofascial', label: '💆 Dor miofascial / tensão muscular', prob: '3ª hipótese — especialmente se ROM normal' },
    ];
  } else {
    hypotheses = [
      { id: 'impingement', label: '📌 Impingement subacromial', prob: '1ª hipótese — diagnóstico mais frequente' },
      { id: 'bursite', label: '🔥 Bursite subacromial', prob: '2ª hipótese — coexiste frequentemente' },
      { id: 'dor_miofascial', label: '💆 Dor miofascial', prob: '3ª hipótese — considerar se ROM normal' },
    ];
  }

  let alert: ShoulderResultData['alert'];
  if (noturna === 'noturna_intensa') {
    alert = { type: 'orange', text: '🟠 Dor noturna intensa — pode indicar rotura da coifa ou processo sistémico. Investigar.' };
  }

  return { narrative, hypotheses, alert };
}

// ===== EXAM OBJECTIVE SECTIONS =====

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
    id: 'inspect', icon: '👁️', label: 'Inspeção & Palpação', title: 'Inspeção & Palpação',
    desc: 'Começar com o doente em pé, ombros expostos. Comparar ambos os lados.',
    tests: [
      {
        name: 'Inspeção Visual', open: true,
        observeItems: [
          'Atrofia muscular (supra/infraespinhoso — sugere lesão crónica coifa)',
          'Assimetria dos contornos (luxação GH altera silhueta)',
          'Deformidade "ombro em dragona" (luxação acromioclavicular)',
          'Eritema, edema, equimoses (trauma)',
          'Postura: protrusão ombros? Escoliose?'
        ]
      },
      {
        name: 'Palpação — Pontos-Chave',
        observeItems: [
          '<strong>Articulação AC:</strong> dor localizada → patologia AC',
          '<strong>Processo coracoide:</strong> inserção do curto bíceps / tendão subescapular',
          '<strong>Grande tuberosidade:</strong> inserção supra e infraespinhoso',
          '<strong>Goteira bicipital:</strong> tendinite longa porção do bíceps (dor anterior)',
          '<strong>Articulação GH posterior:</strong> crepitações, derrame',
          '<strong>Espaço subacromial:</strong> dor à pressão → bursite subacromial'
        ],
        positive: '⚡ Dor focal sobre estrutura = hipótese diagnóstica dirigida'
      }
    ]
  },
  {
    id: 'rom', icon: '🔄', label: 'Amplitude de Movimento', title: 'Amplitude de Movimento',
    desc: 'Avaliar ativa e passiva. Redução global passiva sugere capsulite adesiva.',
    tests: [
      {
        name: 'ROM Ativo & Passivo', struct: 'Valores normais', open: true,
        observeItems: [
          '<strong>Flexão anterior:</strong> 0–180° — limitação anterior precoce → impingement',
          '<strong>Abdução:</strong> 0–180° — arco doloroso 60–120° → impingement subacromial',
          '<strong>Rotação externa (braço ao lado):</strong> 0–60° — limitação marcada = capsulite adesiva',
          '<strong>Rotação interna:</strong> T12 normal — reduzida = capsulite ou artrose GH',
          '<strong>Extensão posterior:</strong> 0–60°'
        ],
        positive: '🔑 Redução ROM ativo E passivo em todos os planos → Capsulite Adesiva',
        positiveStyle: 'purple'
      },
      {
        name: 'Teste do Arco Doloroso (Painful Arc)', struct: 'Impingement',
        sens: '32–97%', spec: '10–80%', lr: '80%', lrLabel: 'Esp. PMC',
        howTo: 'Pedir abdução ativa de 0 a 180°. Observar arco em que ocorre dor.',
        positive: '⚡ Positivo: dor entre 60°–120° de abdução → impingement subacromial'
      }
    ]
  },
  {
    id: 'impingement', icon: '📌', label: 'Impingement', title: 'Testes de Impingement',
    desc: 'Úteis como screening — alta sensibilidade, baixa especificidade. Negativos reduzem probabilidade de impingement.',
    tests: [
      {
        name: 'Sinal de Neer', struct: 'Subacromial', open: true,
        sens: '72–81%', spec: '54%', lr: '1.76',
        howTo: 'Estabilizar a escápula com uma mão. Com a outra elevar o braço em rotação interna (flexão passiva) até dor ou fim de amplitude.',
        positive: '⚡ Positivo: dor na fase final da flexão anterior'
      },
      {
        name: 'Teste de Hawkins-Kennedy', struct: 'Subacromial — Melhor sensibilidade',
        sens: '80–92%', spec: '25–66%', lr: '1.63',
        howTo: 'Flexão ombro + cotovelo a 90° (posição "L"). Estabilizar escápula. Aplicar força para baixo no antebraço distal forçando rotação interna máxima.',
        positive: '⚡ Positivo: dor com rotação interna → compressão supraspinhoso'
      }
    ]
  },
  {
    id: 'rotcuff', icon: '💪', label: 'Coifa dos Rotadores', title: 'Coifa dos Rotadores',
    desc: 'Testar força e integridade dos tendões. Fraqueza + dor = tendinose; fraqueza sem dor = provável rotura.',
    tests: [
      {
        name: 'Empty Can (Jobe)', struct: 'Supraspinhoso', open: true,
        sens: '50–79%', spec: '87%', lr: '3.90',
        howTo: 'Abdução a 90° no plano escapular + rotação interna (polegar para baixo, "esvaziar lata"). Aplicar força resistida para baixo.',
        positive: '⚡ Positivo: dor ou fraqueza → lesão supraspinhoso'
      },
      {
        name: 'Drop Arm Test', struct: 'Rotura completa coifa',
        sens: '12–35%', spec: '88–97%', lr: 'Alta', lrLabel: 'Especif.',
        howTo: 'Elevar passivamente o braço a 90° de abdução. Pedir ao doente para baixar lentamente o braço.',
        positive: '⚡ Positivo: braço cai abruptamente ou dor intensa → rotura significativa coifa'
      },
      {
        name: 'Lift-off Test (Gerber)', struct: 'Subscapular',
        howTo: 'Colocar dorso da mão do doente no lombo. Pedir para afastar (lift-off) a mão das costas contra resistência.',
        positive: '⚡ Incapacidade de manter = rotura subscapular'
      }
    ]
  },
  {
    id: 'instab', icon: '⚖️', label: 'Instabilidade', title: 'Instabilidade GH',
    desc: 'Mais prevalente em jovens ativos. Pode coexistir com impingement.',
    tests: [
      {
        name: 'Apprehension Test', struct: 'Instabilidade anterior', open: true,
        howTo: 'Doente em supino. Abdução 90° + rotação externa progressiva. Aplicar pressão anterior na cabeça umeral.',
        positive: '⚡ Positivo: apreensão (medo de luxar) — NÃO apenas dor'
      },
      {
        name: 'Relocation Test (Jobe)', struct: 'Confirmar instabilidade anterior',
        howTo: 'Após apprehension test positivo, aplicar força posterior sobre a cabeça umeral.',
        positive: '⚡ Positivo: alívio da apreensão → instabilidade anterior confirmada'
      },
      {
        name: 'Sulcus Sign', struct: 'Instabilidade inferior / multidirecional',
        howTo: 'Doente sentado, braço ao lado. Aplicar tração inferior no membro superior.',
        positive: '⚡ Positivo: depressão visível abaixo do acrómio (> 1cm) → laxidez inferior'
      }
    ]
  },
  {
    id: 'biceps', icon: '🦾', label: 'Bicípite & AC', title: 'Bicípite & Articulação AC',
    tests: [
      {
        name: "Speed's Test", struct: 'Longa porção bíceps / SLAP', open: true,
        howTo: 'Flexão do ombro a 60–90° com cotovelo em extensão e antebraço em supinação. Aplicar resistência à flexão do ombro.',
        positive: '⚡ Positivo: dor na goteira bicipital → tendinite bíceps ou SLAP'
      },
      {
        name: "Yergason's Test", struct: 'Longa porção bíceps',
        howTo: 'Cotovelo a 90° fletido, braço ao lado. Pedir supinação ativa resistida.',
        positive: '⚡ Positivo: dor + snap na goteira bicipital → instabilidade tendão bíceps'
      },
      {
        name: 'Cross-body Adduction (Scarf Test)', struct: 'Articulação acromioclavicular',
        howTo: 'Elevar braço a 90° de flexão. Cruzar o braço horizontalmente sobre o tórax (adução horizontal).',
        positive: '⚡ Positivo: dor sobre a articulação AC → patologia AC'
      }
    ]
  },
  {
    id: 'neuro', icon: '⚡', label: 'Neuro & Cervical', title: 'Avaliação Neurológica & Cervical',
    desc: 'Excluir radiculopatia cervical como causa de dor no ombro / braço.',
    tests: [
      {
        name: "Spurling's Test", struct: 'Radiculopatia cervical', open: true,
        howTo: 'Doente sentado. Inclinar cabeça para o lado sintomático + extensão + compressão axial suave.',
        positive: '⚡ Positivo: dor irradiada para o braço = radiculopatia cervical (referir Ortopedia/Neuro)',
        positiveStyle: 'danger'
      },
      {
        name: 'Avaliação Miótoma / Dermátoma', struct: 'C5–C8',
        observeItems: [
          '<strong>C5:</strong> deltoide (abdução ombro) + sensibilidade cara lateral braço',
          '<strong>C6:</strong> bíceps + extensão punho + sensibilidade polegar',
          '<strong>C7:</strong> tríceps + flexão punho + sensibilidade dedo médio',
          '<strong>C8:</strong> flexores dedos + sensibilidade dedo mínimo'
        ],
        positive: '⚠ Défice motor ou sensitivo → referência urgente neurologia/ortopedia',
        positiveStyle: 'danger'
      },
      {
        name: 'ROM Cervical + Dor Referida',
        observeItems: [
          '<strong>C4/C5:</strong> ombro e trapézio — padrão semelhante ao impingement',
          '<strong>Diafragma (frénico C3-C5):</strong> dor ombro direito → excluir patologia hepatobiliar',
          '<strong>Cardíaca:</strong> dor ombro/braço esquerdo com irradiação — excluir SCA'
        ]
      }
    ]
  }
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

export interface ShoulderDdxItem {
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

export const DDX_DATA: ShoulderDdxItem[] = [
  {
    id: 'impingement', icon: '📌', iconClass: 'ri-blue',
    title: 'Síndrome de Impingement Subacromial',
    subtitle: 'Conflito entre tendões da coifa e o acrómio — diagnóstico mais frequente',
    group: 'Comum', urgency: 'ub-blue', urgencyLabel: '🔵 CSP',
    tags: [{ cls: 'dt-common', label: 'Mais comum >30%' }, { cls: 'dt-age', label: '40–60 anos' }],
    tests: [
      { name: 'Hawkins-Kennedy', how: 'Flexão ombro + cotovelo 90° → rotação interna forçada', pos: 'Dor → ↑ probabilidade (Sens. 80–92%)', neg: 'Sem dor → ↓ probabilidade' },
      { name: 'Sinal de Neer', how: 'Elevar braço em rotação interna passiva com escápula estabilizada', pos: 'Dor terminal → ↑ probabilidade (Sens. 72–81%)', neg: 'Sem dor → ↓ probabilidade' },
      { name: 'Arco Doloroso', how: 'Abdução ativa 0°–180°, observar onde dói', pos: 'Dor entre 60–120° → ↑ probabilidade', neg: 'Dor fora deste arco → outros diagnósticos' },
      { name: 'Empty Can (Jobe)', how: 'Abdução 90° plano escapular, polegar para baixo → resistência', pos: 'Dor ou fraqueza → ↑ probabilidade (Espec. 87%)', neg: 'Força normal sem dor → ↓ probabilidade' },
    ],
    approach: {
      immediate: ['AINE oral 2–4 semanas com proteção gástrica', 'Gelo local 15–20min, 3–4x/dia nas primeiras 48–72h', 'Evitar movimentos overhead e carga com braço estendido'],
      home: ['Exercício pêndulo: tronco inclinado, braço solto, movimentos circulares — 2x/dia', 'Alongamento cápsula posterior: braço cruzado sobre peito — 30s, 3x', 'Fortalecimento rotadores externos: banda elástica — 3 séries de 15'],
      exams: ['Rx ombro AP + Outlet: 1ª linha — tipo acrómio e calcificações', 'Ecografia: suspeita de rotura coifa ou bursite', 'RMN: falha terapêutica > 6 semanas ou suspeita rotura total'],
      refer: ['Fisioterapia: sem melhoria em 4–6 semanas', 'Ortopedia: sem resposta em 3–6 meses ou rotura coifa confirmada', 'Infiltração subacromial eco-guiada: alternativa antes de referenciar'],
      benign: ['Dor miofascial trapézio/deltóide (ROM normal, pontos gatilho)', 'Síndrome do desfiladeiro torácico (parestesias, piora com elevação)', 'Artrite reativa pós-infecção (início súbito, contexto infecioso)'],
    },
  },
  {
    id: 'bursite', icon: '🔥', iconClass: 'ri-orange',
    title: 'Bursite Subacromial',
    subtitle: 'Inflamação da bursa — frequentemente coexiste com o impingement',
    group: 'Comum', urgency: 'ub-blue', urgencyLabel: '🔵 CSP',
    tags: [{ cls: 'dt-common', label: 'Frequente' }, { cls: 'dt-age', label: 'Qualquer idade' }],
    tests: [
      { name: 'Hawkins-Kennedy + Neer', how: 'Ver testes de impingement', pos: 'Positivos → ↑ probabilidade (bursite e impingement coexistem frequentemente)', neg: 'Negativos → ↓ probabilidade' },
      { name: 'Palpação espaço subacromial', how: 'Pressão sob bordo anterior do acrómio com braço em ligeira extensão', pos: 'Dor focal → ↑ probabilidade', neg: 'Indolor → ↓ probabilidade' },
      { name: 'ROM passivo preservado', how: 'Avaliar ROM passivo em todos os planos', pos: 'ROM passivo normal → confirma bursite (vs capsulite)', neg: 'ROM passivo também limitado → pensar capsulite adesiva' },
    ],
    approach: {
      immediate: ['AINE oral 1–2 semanas', 'Gelo local 15–20min, 3x/dia', 'Repouso relativo — evitar overhead'],
      home: ['Exercícios pêndulo suaves', 'Evitar dormir sobre o ombro afetado', 'Calor húmido antes dos exercícios na fase subaguda'],
      exams: ['Ecografia: derrame bursal confirma diagnóstico', 'Rx ombro: excluir calcificações e artrose'],
      refer: ['Infiltração subacromial eco-guiada: sem melhoria em 4–6 semanas', 'Fisioterapia: reforço rotadores e estabilizadores escapulares'],
      benign: ['Dor miofascial deltóide (sem arco doloroso típico)', 'Calcificação supraspinhoso aguda (Rx diagnóstico)', 'Impingement subacromial (frequentemente coexiste)'],
    },
  },
  {
    id: 'rotcuff', icon: '💪', iconClass: 'ri-blue',
    title: 'Rotura da Coifa dos Rotadores',
    subtitle: 'Parcial ou total — supraspinhoso é o tendão mais afetado',
    group: 'Comum', urgency: 'ub-orange', urgencyLabel: '🟠 Ortopedia',
    tags: [{ cls: 'dt-age', label: '> 50 anos' }, { cls: 'dt-trauma', label: 'Trauma / Degenerativo' }],
    tests: [
      { name: 'Drop Arm Test', how: 'Elevar braço 90° passivamente → pedir para baixar devagar', pos: 'Braço cai abruptamente → ↑↑ probabilidade rotura total (Espec. 88–97%)', neg: 'Controlo normal → rotura total improvável' },
      { name: 'Empty Can (Jobe)', how: 'Abdução 90° plano escapular, polegar para baixo → resistência', pos: 'Fraqueza marcada sem dor principal → ↑ probabilidade rotura', neg: 'Força normal → ↓ probabilidade rotura significativa' },
      { name: 'Lift-off (Gerber)', how: 'Dorso da mão no lombo → afastar mão contra resistência', pos: 'Incapacidade → rotura subscapular', neg: 'Força normal → subscapular íntegro' },
    ],
    approach: {
      immediate: ['AINE + analgesia adequada', 'Evitar esforços acima da cabeça', 'Tipoia de conforto se dor aguda intensa'],
      home: ['Exercícios pêndulo suaves enquanto aguarda avaliação', 'Sem fortalecimento ativo até confirmação imagiológica', 'Gelo local para controlo da dor'],
      exams: ['Ecografia: exame de 1ª linha — avalia tipo e extensão da rotura', 'RMN: gold standard — extensão, retração e qualidade muscular', 'Rx: excluir artrose e calcificações'],
      refer: ['Ortopedia: rotura total em jovem (<60 anos) ou atleta — considerar cirurgia precoce', 'Ortopedia: rotura parcial extensa sem melhoria em 3–6 meses', 'Fisioterapia: roturas parciais ou idosos sem indicação cirúrgica'],
      benign: ['Impingement subacromial simples (sem fraqueza, Drop Arm negativo)', 'Neuropatia nervo supraescapular (atrofia sem trauma)', 'Artrose glenoumeral avançada (Rx diagnóstico)'],
    },
  },
  {
    id: 'capsulite', icon: '🔒', iconClass: 'ri-purple',
    title: 'Capsulite Adesiva (Ombro Congelado)',
    subtitle: 'Contração capsular progressiva — evolui em 3 fases ao longo de 1–3 anos',
    group: 'Comum', urgency: 'ub-orange', urgencyLabel: '🟠 Seguimento',
    tags: [{ cls: 'dt-age', label: '50–60 anos, F>M' }, { cls: 'dt-systemic', label: 'Diabetes / Tiróide' }],
    tests: [
      { name: 'ROM Rotação Externa Passiva', how: 'Braço ao lado → rotar externamente de forma passiva', pos: '< 50% contralateral → ↑↑ probabilidade (critério principal)', neg: 'ROM normal → capsulite improvável' },
      { name: 'ROM Abdução Passiva', how: 'Elevar o braço passivamente — avaliar amplitude', pos: '< 90° com resistência elástica → ↑ probabilidade', neg: 'ROM passivo completo → excluir capsulite' },
      { name: 'ROM Rotação Interna', how: 'Pedir para colocar mão atrás das costas', pos: 'Limitação marcada vs lado saudável → ↑ probabilidade', neg: 'Simétrico → ↓ probabilidade' },
    ],
    approach: {
      immediate: ['AINE nas primeiras semanas (fase dolorosa)', 'Calor húmido antes dos exercícios', 'Infiltração intra-articular corticosteroide eco-guiada — melhora dor a curto prazo', 'Gerir expectativas: processo de 1–3 anos'],
      home: ['Exercício pêndulo de Codman: 3–4x/dia sem forçar', 'Rotação externa com bengala: 10 repetições, 3 séries diárias', 'Mobilização passiva assistida com braço saudável', 'Nunca imobilizar — movimento suave é essencial'],
      exams: ['Rx ombro: excluir artrose GH e calcificações', 'Rastrear: glicemia em jejum e TSH', 'Ecografia ou RMN: apenas se dúvida diagnóstica'],
      refer: ['Fisioterapia: fundamental em todas as fases', 'Ortopedia: sem melhoria após 6 meses — distensão capsular ou manipulação sob anestesia'],
      benign: ['Artrose glenoumeral (Rx diagnóstico, crepitações, > 60 anos)', 'Polimialgia reumática (> 50 anos, dor bilateral, VS muito elevada)', 'Rotura extensa coifa (fraqueza proeminente, ROM passivo inicialmente preservado)'],
    },
  },
  {
    id: 'acjoint', icon: '🔝', iconClass: 'ri-green',
    title: 'Artropatia Acromioclavicular',
    subtitle: 'Artrose AC crónica ou lesão ligamentar pós-traumática (graus I–VI)',
    group: 'Comum', urgency: 'ub-green', urgencyLabel: '🟢 CSP',
    tags: [{ cls: 'dt-trauma', label: 'Trauma / Sobrecarga' }, { cls: 'dt-age', label: 'Qualquer idade' }],
    tests: [
      { name: 'Palpação AC direta', how: 'Pressão com 1 dedo sobre a articulação AC', pos: 'Dor focal reprodutível → ↑↑ probabilidade (sinal mais específico)', neg: 'Indolor → ↓ probabilidade' },
      { name: 'Scarf Test', how: 'Braço a 90° → adução horizontal forçada (mão ao ombro contralateral)', pos: 'Dor sobre AC → ↑ probabilidade', neg: 'Sem dor → ↓ probabilidade' },
    ],
    approach: {
      immediate: ['AINE oral 1–2 semanas', 'Tipoia 48–72h se trauma agudo', 'Gelo local 3x/dia', 'Evitar adução horizontal e elevação acima da cabeça'],
      home: ['Evitar dormir sobre o ombro afetado', 'Evitar pesos com braço em adução horizontal', 'Retomar atividade gradualmente quando a dor permitir'],
      exams: ['Rx AC bilateral com carga: obrigatório se trauma — classifica grau (I–VI)', 'Rx simples: artrose AC (esclerose, osteófitos)', 'RMN: suspeita de lesão coifa associada'],
      refer: ['Ortopedia: lesão AC graus IV–VI, grau III em atleta, artrose refratária', 'Infiltração AC eco-guiada: dor crónica refratária ao conservador'],
      benign: ['Impingement subacromial (coexiste frequentemente)', 'Osteólise distal clavícula (levantadores de peso, Rx diagnóstico)', 'Fratura de stress clavícula distal (atletas, Rx pode ser normal)'],
    },
  },
  {
    id: 'biceps', icon: '🦾', iconClass: 'ri-blue',
    title: 'Tendinopatia LP Bíceps',
    subtitle: 'Longa porção do bíceps — frequentemente associada ao impingement',
    group: 'Comum', urgency: 'ub-blue', urgencyLabel: '🔵 CSP',
    tags: [{ cls: 'dt-common', label: 'Frequente' }, { cls: 'dt-trauma', label: 'Sobrecarga' }],
    tests: [
      { name: "Speed's Test", how: 'Flexão ombro 60–90° + cotovelo estendido + supinação → resistência', pos: 'Dor na goteira bicipital → ↑ probabilidade', neg: 'Sem dor → ↓ probabilidade' },
      { name: "Yergason's Test", how: 'Cotovelo 90° fletido → supinação resistida', pos: 'Dor ou snap na goteira → ↑ probabilidade', neg: 'Sem dor → ↓ probabilidade' },
      { name: 'Palpação goteira bicipital', how: 'Braço em rotação interna → palpar face anterior entre as tuberosidades', pos: 'Dor focal reprodutível → ↑↑ probabilidade', neg: 'Indolor → ↓ probabilidade' },
    ],
    approach: {
      immediate: ['AINE oral 1–2 semanas', 'Repouso relativo: evitar flexão do cotovelo contra resistência', 'Gelo sobre goteira 15min, 3x/dia'],
      home: ['Alongamento bíceps: braço estendido atrás, polegar para baixo — 30s, 3x', 'Exercícios excêntricos bíceps na fase subaguda', 'Evitar carga com cotovelo fletido (ex: carregar caixas)'],
      exams: ['Ecografia goteira bicipital: exame de eleição — avalia tendão e derrame', 'RMN: suspeita de lesão SLAP associada'],
      refer: ['Fisioterapia: programa excêntrico estruturado', 'Ortopedia: sinal de Popeye em jovem ativo, falha conservadora > 3–6 meses'],
      benign: ['Impingement subacromial (coexiste em ~90%)', 'Lesão SLAP (dor profunda, clique intra-articular, atletas de lançamento)', 'Síndrome do túnel cárpico coexistente (parestesias noturnas mão)'],
    },
  },
  {
    id: 'radicular', icon: '⚡', iconClass: 'ri-orange',
    title: 'Radiculopatia Cervical',
    subtitle: 'C5–C6 mais comum — dor irradiada ao ombro de origem cervical',
    group: 'Cervical / Referida', urgency: 'ub-orange', urgencyLabel: '🟠 Avaliar urgência',
    tags: [{ cls: 'dt-systemic', label: 'Cervical' }, { cls: 'dt-age', label: '40–60 anos' }],
    tests: [
      { name: "Spurling's Test", how: 'Cabeça inclinada ipsilateral + extensão + compressão axial suave', pos: 'Dor irradiada para braço/mão → ↑↑ probabilidade (Espec. 93%)', neg: 'Sem irradiação → ↓ probabilidade radiculopatia' },
      { name: 'ROM Cervical', how: 'Flexão, extensão, rotações e inclinações', pos: 'Limitação ou dor reprodutível → ↑ probabilidade cervical', neg: 'ROM cervical normal → ↓ probabilidade causa cervical' },
      { name: 'Avaliação miótoma C5–C7', how: 'Força deltóide (C5), bíceps (C6), tríceps (C7) + sensibilidade', pos: 'Fraqueza segmentar → ↑↑ probabilidade (referência urgente se motor)', neg: 'Força simétrica → ↓ probabilidade défice radicular' },
    ],
    approach: {
      immediate: ['AINE se componente inflamatório', 'Colar cervical suave: máximo 2–3 dias em fase muito aguda', 'Calor cervical posterior para espasmo muscular', 'EXCLUIR: ECG se dor ombro esq; eco abdominal se dor ombro dir + febre'],
      home: ['Correção postural: ecrã ao nível dos olhos', 'Chin tuck: retração cervical suave — 10x, 3x/dia', 'Almofada ergonómica cervical'],
      exams: ['Rx cervical AP + perfil: sintomas > 6 semanas ou trauma', 'RMN cervical: défice neurológico, Spurling positivo, falha terapêutica', 'EMG/VCN: dúvida entre radiculopatia e neuropatia periférica'],
      refer: ['Neurocirurgia/Ortopedia espinal: défice motor, mielopatia, falha conservadora > 6–12 sem', 'SU imediato: défice motor agudo ou mielopatia cervical'],
      benign: ['Tensão muscular cervical/trapézio (sem irradiação verdadeira, sem défice)', 'Síndrome do desfiladeiro torácico (parestesias, piora com elevação braço)', 'Nevralgia occipital (dor occipital irradiada ao ombro)'],
    },
  },
  {
    id: 'dor_referida', icon: '❤️', iconClass: 'ri-red',
    title: 'Dor Referida de Causa Visceral',
    subtitle: 'Cardíaca, diafragmática ou abdominal — excluir SEMPRE antes de tratar',
    group: 'Cervical / Referida', urgency: 'ub-red', urgencyLabel: '🔴 Excluir urgência',
    tags: [{ cls: 'dt-common', label: 'Excluir sempre' }, { cls: 'dt-systemic', label: 'Visceral / Cardíaca' }],
    tests: [
      { name: 'Contexto SCA', how: 'Dor ombro esquerdo + dor torácica / dispneia / diaforese / irradiação mandíbula', pos: 'Qualquer sinal → ECG imediato, não tratar como MSK', neg: 'Ausentes e ROM limitado → causa cardíaca menos provável' },
      { name: 'Contexto colecistite', how: 'Dor ombro direito + febre + náuseas + dor hipocôndrio direito', pos: 'Presente → ecografia abdominal urgente (nervo frénico C3–C5)', neg: 'Ausente → causa biliar menos provável' },
      { name: 'ROM ombro completamente normal', how: 'Avaliar ROM ativo e passivo do ombro', pos: 'ROM 100% normal + dor → ↑↑ probabilidade dor referida', neg: 'ROM limitado → provável causa MSK local' },
    ],
    approach: {
      immediate: ['ECG imediato se suspeita SCA — não atrasar', 'Ecografia abdominal urgente se suspeita colecistite', 'Não iniciar tratamento MSK sem excluir causa visceral grave'],
      home: ['Não aplicável até diagnóstico estabelecido'],
      exams: ['ECG + troponinas: suspeita cardíaca', 'Ecografia abdominal: dor ombro direito + sintomas abdominais', 'Rx tórax: excluir Pancoast e derrame pleural'],
      refer: ['SU imediato: qualquer suspeita de SCA ou abdómen agudo', 'Cirurgia geral: colecistite aguda confirmada'],
      benign: ['Pleurite diafragmática (dor ombro + dor respiratória, Rx tórax diagnóstico)', 'Pericardite (dor melhora ao inclinar para a frente, fricção pericárdica)'],
    },
  },
  {
    id: 'trauma', icon: '💥', iconClass: 'ri-orange',
    title: 'Patologia Pós-Traumática',
    subtitle: 'Fratura, luxação glenoumeral, lesão AC, rotura coifa aguda',
    group: 'Traumática', urgency: 'ub-red', urgencyLabel: '🔴 Rx urgente',
    tags: [{ cls: 'dt-trauma', label: 'Trauma agudo' }, { cls: 'dt-age', label: 'Qualquer idade' }],
    tests: [
      { name: 'Inspeção + deformidade', how: 'Comparação visual dos dois ombros', pos: 'Deformidade visível → Rx imediato', neg: 'Sem deformidade → lesão grave menos provável' },
      { name: 'Palpação sistematizada', how: 'Clavícula toda, AC, troquiter, goteira bicipital', pos: 'Dor focal com crepitação → fratura', neg: 'Indolor → estrutura provavelmente íntegra' },
      { name: 'Drop Arm Test', how: 'Elevar braço 90° passivamente → pedir para baixar devagar', pos: 'Braço cai → rotura coifa aguda', neg: 'Controlo normal → coifa provavelmente íntegra' },
    ],
    approach: {
      immediate: ['Imobilização com tipoia + crioterapia + analgesia', 'Rx ombro AP + axilar ou Y-view: obrigatório', 'Luxação glenoumeral: redução em SU, Rx pré e pós-redução'],
      home: ['Manter tipoia conforme indicação', 'Crioterapia regular nas primeiras 48h', 'Exercícios dedos/punho para evitar rigidez distal'],
      exams: ['Rx: obrigatório e imediato', 'TC: fratura complexa ou articular', 'RMN/Ecografia: suspeita lesão coifa ou ligamentos após Rx normal'],
      refer: ['SU imediato: luxação não reduzida, fratura desviada, défice neurovascular', 'Ortopedia urgente: fratura ≥3 fragmentos, rotura coifa total aguda em jovem, lesão AC grau IV–VI'],
      benign: ['Contusão deltóide simples (sem fratura, ROM preservado)', 'Neuropraxia nervo axilar transitória pós-trauma'],
    },
  },
  {
    id: 'instabilidade', icon: '⚖️', iconClass: 'ri-green',
    title: 'Instabilidade Glenoumeral',
    subtitle: 'Anterior (mais comum), posterior ou multidirecional — predomina em jovens',
    group: 'Instabilidade', urgency: 'ub-blue', urgencyLabel: '🔵 Ortopedia eletiva',
    tags: [{ cls: 'dt-age', label: '< 35 anos' }, { cls: 'dt-trauma', label: 'Desportivo' }],
    tests: [
      { name: 'Apprehension Test', how: 'Supino, abdução 90° + rotação externa progressiva + pressão anterior', pos: 'Apreensão (medo de luxar, não apenas dor) → ↑↑ probabilidade instabilidade anterior', neg: 'Só dor sem apreensão → ↓ probabilidade' },
      { name: 'Relocation Test', how: 'Após apprehension positivo, pressão posterior sobre cabeça umeral', pos: 'Alívio da apreensão → confirma instabilidade anterior', neg: 'Sem alívio → outro diagnóstico' },
      { name: 'Sulcus Sign', how: 'Tração inferior no membro superior com braço ao lado', pos: 'Depressão > 1cm abaixo do acrómio → instabilidade inferior/multidirecional', neg: 'Sem sulco → laxidez inferior improvável' },
    ],
    approach: {
      immediate: ['Redução em SU se luxação aguda + Rx pré e pós', 'Imobilização 3–6 semanas após 1º episódio em jovem', 'Analgesia adequada'],
      home: ['Evitar posição de risco: abdução + rotação externa máxima', 'Fortalecimento rotadores externos e estabilizadores escapulares', 'Evitar desportos de contacto até avaliação ortopédica'],
      exams: ['Rx ombro: excluir Hill-Sachs e Bankart ósseo', 'RMN artro: lesão de Bankart, SLAP, avaliação capsulo-ligamentar completa'],
      refer: ['Ortopedia: após 2º episódio, instabilidade multidirecional, atleta jovem', 'Fisioterapia: 1º episódio em adulto sem desporto competitivo — estabilização'],
      benign: ['Hiperlaxidão generalizada benigna (assintomática, bilateral)', 'Capsulite adesiva (limita ROM em vez de permitir excesso)', 'Impingement (dor em arco, sem apreensão)'],
    },
  },
  {
    id: 'calcificacao', icon: '🪨', iconClass: 'ri-orange',
    title: 'Tendinite Calcificante',
    subtitle: 'Depósito de cálcio no supraspinhoso — crise álgica aguda intensa e súbita',
    group: 'Benigna', urgency: 'ub-blue', urgencyLabel: '🔵 CSP / SU se crise',
    tags: [{ cls: 'dt-age', label: '30–50 anos' }, { cls: 'dt-common', label: 'Autolimitada' }],
    tests: [
      { name: 'Rx ombro AP', how: 'Verificar presença de calcificação densa sobre o supraspinhoso', pos: 'Calcificação visível → diagnóstico confirmado', neg: 'Sem calcificação → excluir este diagnóstico' },
      { name: 'Intensidade e início', how: 'Dor súbita muito intensa sem trauma + limitação marcada de horas a dias', pos: 'Quadro típico de crise aguda → ↑ probabilidade', neg: 'Dor gradual moderada → pensar impingement clássico' },
    ],
    approach: {
      immediate: ['AINE em dose plena durante a crise', 'Gelo local', 'Infiltração subacromial com corticosteroide + anestésico: alívio rápido na crise aguda'],
      home: ['Repouso durante a crise (dias)', 'Retoma gradual de mobilidade após crise resolvida', 'Fisioterapia após fase aguda para recuperar ROM'],
      exams: ['Rx ombro AP: confirma e classifica a calcificação', 'Ecografia: avaliação dinâmica e guia infiltração ou lavagem'],
      refer: ['Fisioterapia: mobilização progressiva pós-crise', 'Ortopedia: calcificação persistente sintomática > 6 meses — lavagem eco-guiada ou artroscopia'],
      benign: ['Artrite séptica (febre alta, VS/PCR muito elevados — emergência)', 'Crise de gota do ombro (hiperuricemia, cristais no líquido articular)'],
    },
  },
  {
    id: 'artrose', icon: '🦴', iconClass: 'ri-orange',
    title: 'Artrose Glenoumeral',
    subtitle: 'Desgaste articular progressivo — mais comum acima dos 60 anos',
    group: 'Benigna', urgency: 'ub-blue', urgencyLabel: '🔵 CSP / Ortopedia eletiva',
    tags: [{ cls: 'dt-age', label: '> 60 anos' }, { cls: 'dt-systemic', label: 'Degenerativo' }],
    tests: [
      { name: 'Crepitação articular', how: 'Mão sobre articulação GH durante ROM ativo e passivo', pos: 'Crepitações palpáveis ou audíveis → ↑ probabilidade artrose', neg: 'Sem crepitações → artrose menos provável' },
      { name: 'ROM passivo limitado com crepitação', how: 'Avaliar ROM passivo com atenção a crepitações', pos: 'Limitação global + crepitação → ↑ probabilidade artrose (vs capsulite sem crepitação)', neg: 'ROM passivo normal → artrose improvável' },
    ],
    approach: {
      immediate: ['Paracetamol regular como base analgésica', 'AINE em cursos curtos nas agudizações', 'Calor local para rigidez matinal'],
      home: ['Exercícios de mobilidade suave diários — manter amplitude possível', 'Evitar carga excessiva mas não imobilizar', 'Termoterapia antes dos exercícios'],
      exams: ['Rx ombro AP + perfil: confirma diagnóstico (pinçamento, osteófitos, esclerose subcondral)', 'RMN/TC: avaliação pré-cirúrgica'],
      refer: ['Ortopedia: limitação funcional severa refratária — artroplastia total do ombro', 'Fisioterapia: programa de manutenção de mobilidade e força', 'Infiltração intra-articular: ácido hialurónico ou corticosteroide'],
      benign: ['Capsulite adesiva (sem crepitações, Rx normal)', 'Artrite reumatoide (bilateral, matinal, VS/PCR/FR elevados)', 'Pseudogota do ombro (condrocalcinose no Rx)'],
    },
  },
  {
    id: 'dor_miofascial', icon: '💆', iconClass: 'ri-green',
    title: 'Dor Miofascial / Tensão Muscular',
    subtitle: 'Trapézio, deltóide, infraespinhoso — muito frequente, benigna',
    group: 'Benigna', urgency: 'ub-green', urgencyLabel: '🟢 CSP',
    tags: [{ cls: 'dt-common', label: 'Muito frequente' }, { cls: 'dt-systemic', label: 'Postura / Stress' }],
    tests: [
      { name: 'Palpação pontos gatilho', how: 'Pressão firme sobre trapézio, deltóide, infraespinhoso', pos: 'Dor reprodutível com irradiação típica → ↑ probabilidade dor miofascial', neg: 'Sem pontos gatilho → ↓ probabilidade' },
      { name: 'ROM ombro completamente normal', how: 'Avaliar ROM ativo e passivo', pos: 'ROM 100% normal apesar da dor → ↑↑ probabilidade causa muscular', neg: 'ROM limitado → estrutura articular provavelmente envolvida' },
    ],
    approach: {
      immediate: ['Calor local ou massagem suave na fase aguda', 'Paracetamol ou AINE em curso curto', 'Agulhamento seco ou TENS se disponível'],
      home: ['Correção postural: ajuste do posto de trabalho, ecrã ao nível dos olhos', 'Alongamentos diários trapézio e ombro: 30s, 3x/dia', 'Exercício aeróbico regular: reduz tensão muscular crónica', 'Gestão do stress: técnicas de relaxamento'],
      exams: ['Geralmente nenhum necessário', 'Rx ou análises apenas se dúvida diagnóstica ou sintomas > 6 semanas sem melhoria'],
      refer: ['Fisioterapia: se refratário após 4–6 semanas de medidas conservadoras', 'Medicina do trabalho: se relacionado com contexto ocupacional'],
      benign: ['Fibromialgia (dor difusa bilateral, múltiplos pontos, critérios ACR)', 'Impingement subacromial (arco doloroso típico, ROM potencialmente limitado)', 'Radiculopatia cervical (irradiação dermatomal, Spurling positivo)'],
    },
  },
  {
    id: 'redflag', icon: '🚨', iconClass: 'ri-red',
    title: 'Red Flag — Patologia Grave',
    subtitle: 'Tumor ósseo, metástase, artrite séptica, tumor de Pancoast',
    group: 'Red Flag', urgency: 'ub-red', urgencyLabel: '🔴 URGENTE',
    tags: [{ cls: 'dt-common', label: 'NÃO PERDER' }],
    tests: [
      { name: 'Dor noturna intensa', how: 'Dor que acorda o doente, não alivia com posição ou repouso', pos: 'Presente → ↑↑ probabilidade patologia grave (tumoral)', neg: 'Ausente → menos provável causa grave' },
      { name: 'Sinais sistémicos', how: 'Febre, perda de peso > 5% involuntária, sudorese noturna, adenopatias', pos: 'Presentes → investigação oncológica urgente', neg: 'Ausentes → causa sistémica grave menos provável' },
      { name: 'Défice neurológico progressivo', how: 'Fraqueza progressiva, síndrome de Horner (ptose + miose + anidrose)', pos: 'Presente → TC tórax urgente (Pancoast) ou RMN urgente', neg: 'Ausente → menos provável' },
    ],
    approach: {
      immediate: ['Não tratar como MSK simples sem investigação', 'Análises urgentes: hemograma, VS, PCR, LDH, cálcio, fosfatase alcalina', 'Rx tórax + ombro', 'ECG se suspeita cardíaca'],
      home: ['Não aplicável — requer diagnóstico definitivo primeiro'],
      exams: ['Rx tórax: tumor de Pancoast, metástases, derrame pleural', 'Análises completas incluindo marcadores tumorais e LDH', 'TC tórax/abdómen: suspeita neoplásica confirmada', 'Cintigrafia óssea: suspeita metástase óssea'],
      refer: ['SU imediato: febre com artrite, défice neurológico agudo, suspeita SCA', 'Oncologia: suspeita neoplásica confirmada', 'Pneumologia/Cirurgia torácica: tumor de Pancoast'],
      benign: ['Nevralgia amiotrófica de Parsonage-Turner (dor intensa súbita + fraqueza, sem trauma)', 'Crise álgica de artrose GH avançada (Rx diagnóstico)', 'Calcificação aguda supraspinhoso (Rx com calcificação densa)'],
    },
  },
];

export const DDX_GROUP_ORDER = ['Comum', 'Cervical / Referida', 'Traumática', 'Instabilidade', 'Benigna', 'Red Flag'];
