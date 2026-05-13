// ===== ALGORITHM STEPS =====

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
    id: 0, title: 'Red Flags', subtitle: 'Excluir patologia grave ou emergência antes de prosseguir',
    options: [
      { icon: '🚨', title: 'Sim — Red Flag presente', desc: 'Dor noturna intensa, perda de peso, febre, trauma de alta energia, sinais neurológicos', action: 'redflag', cls: 'danger' },
      { icon: '✅', title: 'Não — sem sinais de alarme', desc: 'Prosseguir algoritmo musculoesquelético', action: 'next' }
    ]
  },
  {
    id: 1, title: 'Trauma?', subtitle: 'Houve mecanismo de trauma recente (queda, impacto direto, entorse)?',
    options: [
      { icon: '💥', title: 'Trauma agudo', desc: 'Queda, impacto, acidente', action: 'trauma', cls: 'warn' },
      { icon: '🔁', title: 'Sobrecarga repetitiva', desc: 'Microtraumatismos, atividade desportiva, trabalho overhead', action: 'overuse' },
      { icon: '❓', title: 'Sem trauma identificado', desc: 'Início espontâneo ou insidioso', action: 'next' }
    ]
  },
  {
    id: 2, title: 'Início & Duração', subtitle: 'Qual a evolução temporal da dor?',
    options: [
      { icon: '⚡', title: '< 2 semanas — Agudo', desc: 'Início súbito, possivelmente relacionado com atividade', action: 'acute' },
      { icon: '📅', title: '2–12 semanas — Subagudo', desc: 'Evolução progressiva', action: 'subacute' },
      { icon: '📆', title: '> 12 semanas — Crónico', desc: 'Dor persistente, limitação progressiva', action: 'chronic' }
    ]
  },
  {
    id: 3, title: 'Limitação do ROM', subtitle: 'Existe limitação global de amplitude de movimento (ativa E passiva)?',
    options: [
      { icon: '🔒', title: 'Sim — global, ativo e passivo', desc: 'Limitação em todos os planos, especialmente rot. externa', action: 'capsulitis', cls: 'warn' },
      { icon: '⚠️', title: 'Parcial — só ativo', desc: 'ROM passivo preservado, ativo doloroso', action: 'next' },
      { icon: '✅', title: 'Não — ROM preservado', desc: 'Amplitude normal ou quase normal', action: 'next' }
    ]
  },
  {
    id: 4, title: 'Localização da Dor', subtitle: 'Onde é predominantemente a dor?',
    options: [
      { icon: '🔼', title: 'Anterosuperior / topo', desc: 'Dor na face anterior, irradiação para o deltóide', action: 'impingement' },
      { icon: '◀️', title: 'Anterior', desc: 'Face anterior, goteira bicipital', action: 'biceps' },
      { icon: '🔝', title: 'Articulação AC (topo)', desc: 'Dor localizada na articulação acromioclavicular', action: 'acjoint' },
      { icon: '📡', title: 'Difusa / irradiada para braço', desc: 'Dor que irradia para todo o membro, parestesias', action: 'radicular', cls: 'warn' }
    ]
  }
];

// ===== ALGORITHM RESULTS =====

export interface ResultSection {
  title: string;
  type?: string;
  items: string[];
}

export interface AlgoResult {
  icon: string;
  iconClass: string;
  title: string;
  subtitle: string;
  urgency: string;
  urgencyText: string;
  sections: ResultSection[];
}

export const RESULTS: Record<string, AlgoResult> = {
  redflag: {
    icon: '🚨', iconClass: 'ri-red', title: 'Red Flag Identificado', subtitle: 'Investigação urgente necessária',
    urgency: 'ub-red', urgencyText: '🔴 URGENTE — Excluir patologia grave',
    sections: [
      { title: '⚠ Sinais de Alarme Possíveis', type: 'urgent', items: [
        'Dor noturna severa não aliviada por posição → tumor ósseo / metástase',
        'Febre + dor + limitação → artrite séptica / osteomielite (emergência)',
        'Perda de peso + dor ombro + adenopatias → neoplasia',
        'Trauma de alta energia → excluir fratura (Rx urgente)',
        'Síndrome de Pancoast: dor ombro + Horner + fraqueza → tumor pulmonar ápex',
        'SCA: dor ombro/braço esquerdo + diaforese + ECG imediato'
      ]},
      { title: '📋 Ação Imediata', type: 'warn', items: [
        'ECG se dor precordial/ombro esq',
        'Rx ombro e/ou tórax conforme contexto',
        'Análises: VS, PCR, hemograma, cálcio sérico',
        'Referência urgente Ortopedia ou SU conforme clínica'
      ]}
    ]
  },
  impingement: {
    icon: '📌', iconClass: 'ri-blue', title: 'Síndrome de Impingement Subacromial',
    subtitle: 'Diagnóstico mais frequente em MGF (>30% das dores de ombro)',
    urgency: 'ub-blue', urgencyText: '🔵 Consulta programada — Gestão em cuidados primários',
    sections: [
      { title: '🔍 Confirmar com Exame Objetivo', items: [
        'Hawkins-Kennedy (sens. 80–92%) + Neer (sens. 72–81%)',
        'Arco doloroso entre 60–120° de abdução',
        'Empty Can: dor ou fraqueza → avaliar coifa',
        'Drop Arm se suspeita de rotura'
      ]},
      { title: '🩻 Imagiologia', items: [
        'Rx ombro AP + Saída do Outlet: excluir calcificações, acromion tipo III',
        'Ecografia: 1ª linha para coifa dos rotadores (acessível, dinâmica)',
        'RMN: se rotura suspeita ou falha terapêutica > 6 sem'
      ]},
      { title: '💊 Tratamento', items: [
        'AINE oral 2–4 semanas + proteção gástrica',
        'Fisioterapia: fortalecimento rotadores, estabilizadores escápula',
        'Infiltração corticosteroide subacromial se sem melhoria em 4–6 sem',
        'Referência Ortopedia se sem resposta em 3–6 meses'
      ]},
      { title: '📋 Mensagem ao Doente', items: [
        'Evitar movimentos overhead repetitivos',
        'Melhoria esperada em 80% dos casos em 12 meses',
        'Retorno ao exercício gradual com fisioterapia'
      ]}
    ]
  },
  capsulite: {
    icon: '🔒', iconClass: 'ri-purple', title: 'Capsulite Adesiva (Ombro Congelado)',
    subtitle: 'Prevalência 2–5% vida. Pico 50–60 anos. F > M.',
    urgency: 'ub-orange', urgencyText: '🟠 Acompanhamento programado — Pode durar 1–3 anos',
    sections: [
      { title: '🔍 Critérios Diagnósticos', items: [
        'Limitação global ROM ativo E passivo em todos os planos',
        'Rotação externa passiva < 50% contralateral = critério principal',
        'Sem história de trauma significativo',
        'Rx: excluir artrose GH (pode coexistir)'
      ]},
      { title: '⚠ Fatores de Risco', type: 'warn', items: [
        'Diabetes mellitus (risco 3–5x superior, forma mais grave)',
        'Hipotiroidismo / doença tiroideia',
        'Imobilização prolongada pós-trauma ou cirurgia',
        'Doença cardiovascular, Parkinson'
      ]},
      { title: '💊 Abordagem', items: [
        'AINE + fisioterapia na fase aguda (congelamento)',
        'Infiltração intra-articular corticosteroide guiada por ecografia',
        'Fisioterapia mobilização progressiva',
        'Distensão capsular ou manipulação sob anestesia se refratária',
        'Referência Ortopedia se sem melhoria em 6 meses'
      ]}
    ]
  },
  trauma: {
    icon: '💥', iconClass: 'ri-orange', title: 'Patologia Pós-Traumática',
    subtitle: 'Excluir fratura, luxação, rotura coifa aguda',
    urgency: 'ub-orange', urgencyText: '🟠 Urgência relativa — Rx imediato necessário',
    sections: [
      { title: '🩻 Imagiologia Urgente', items: [
        'Rx ombro AP + axilar ou Y-view: excluir fratura proximal úmero, clavícula',
        'Rx articulação AC: lesão AC grau I–VI (distância CC)',
        'Se Rx normal + suspeita rotura coifa: ecografia ou RMN'
      ]},
      { title: '🔍 Diagnósticos a Excluir', type: 'warn', items: [
        'Fratura proximal úmero (4-part → cirurgia)',
        'Luxação GH: reduzir em urgência, Rx pré e pós',
        'Rotura coifa aguda total: cirurgia se jovem ativo',
        'Lesão acromioclavicular: graus IV–VI → cirúrgicos'
      ]},
      { title: '📋 Ação', items: [
        'SU se deformidade evidente, instabilidade ou suspeita fratura',
        'Crioterapia + imobilização inicial + analgesia',
        'Referência Ortopedia se patologia significativa confirmada'
      ]}
    ]
  },
  radicular: {
    icon: '⚡', iconClass: 'ri-orange', title: 'Possível Radiculopatia Cervical / Dor Referida',
    subtitle: 'A dor irradiada ao ombro pode ter origem cervical, visceral ou cardíaca',
    urgency: 'ub-orange', urgencyText: '🟠 Avaliar urgência conforme contexto clínico',
    sections: [
      { title: '🔍 Distinguir de Patologia GH', items: [
        'Spurling test positivo → radiculopatia (referir Neurocirurgia/Ortopedia)',
        'ROM cervical limitado/doloroso → patologia cervical',
        'Parestesias ou défice neurológico → Rx + RMN cervical',
        'Dor em distribuição dermatomal C5–C8'
      ]},
      { title: '⚠ Excluir Urgência', type: 'urgent', items: [
        'Dor ombro esq + dor peito + diaforese → ECG imediato (SCA)',
        'Dor ombro dir + febre + náuseas → ecografia abdominal (colecistite)',
        'Deficit motor progressivo → RMN cervical urgente (mielopatia)'
      ]},
      { title: '📋 Investigação', items: [
        'ECG se suspeita cardíaca',
        'Rx cervical se sintomas cervicais',
        'RMN cervical se défice neurológico',
        'Análises se suspeita sistémica'
      ]}
    ]
  },
  acjoint: {
    icon: '🔝', iconClass: 'ri-green', title: 'Patologia Acromioclavicular',
    subtitle: 'Artrose AC, lesão traumática AC',
    urgency: 'ub-green', urgencyText: '🟢 Consulta programada — Geralmente conservador',
    sections: [
      { title: '🔍 Diagnóstico Clínico', items: [
        'Dor localizada sobre articulação AC à palpação',
        'Cross-body adduction test (Scarf) positivo',
        'Deformidade se lesão aguda grau III+',
        'Rx AC: calcificações, artrose, separação AC'
      ]},
      { title: '💊 Tratamento', items: [
        'Artrose AC: AINE, fisioterapia, infiltração local',
        'Lesão grau I–II: conservador (imobilização 2–3 sem)',
        'Lesão grau IV–VI: referência cirúrgica Ortopedia'
      ]}
    ]
  },
  biceps: {
    icon: '🦾', iconClass: 'ri-blue', title: 'Tendinopatia da Longa Porção do Bíceps',
    subtitle: 'Frequentemente associada a impingement ou patologia SLAP',
    urgency: 'ub-blue', urgencyText: '🔵 Consulta programada',
    sections: [
      { title: '🔍 Clínica', items: [
        'Dor face anterior ombro, goteira bicipital',
        "Speed's test positivo + Yergason positivo",
        'Verificar também coifa (frequente co-existência)',
        'Sinal de Popeye: rotura completa (músculo retraído distalmente)'
      ]},
      { title: '💊 Tratamento', items: [
        'AINE + repouso relativo',
        'Ecografia ombro: confirmar diagnóstico e excluir rotura',
        'Fisioterapia excêntrica',
        'Infiltração bainha tendão bíceps se refratário',
        'Cirurgia (tenodese/tenotomia) se rotura ou falha conservadora'
      ]}
    ]
  }
};

// ===== FINDING TAG LABELS =====

export const FINDING_TAGS: Record<string, [string, string]> = {
  impingement: ['tag-blue', 'Impingement'],
  capsulite: ['tag-orange', 'Capsulite Adesiva'],
  ac: ['tag-green', 'Articulação AC'],
  biceps: ['tag-blue', 'Bíceps'],
  radicular: ['tag-orange', 'Radiculopatia?'],
  trauma: ['tag-orange', 'Trauma'],
  overuse: ['tag-blue', 'Sobrecarga'],
  chronic: ['tag-blue', 'Crónico'],
};

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

// ===== DIFFERENTIAL DIAGNOSES =====

export interface DdxFeature {
  key: string;
  val: string;
}

export interface DdxTag {
  cls: string;
  label: string;
}

export interface DdxItem {
  icon: string;
  iconClass: string;
  title: string;
  subtitle: string;
  tags: DdxTag[];
  features: DdxFeature[];
}

export const DDX_DATA: DdxItem[] = [
  {
    icon: '📌', iconClass: 'ri-blue', title: 'Impingement Subacromial', subtitle: 'Síndrome de conflito subacromial',
    tags: [{ cls: 'dt-common', label: 'Mais comum' }, { cls: 'dt-age', label: '40–60 anos' }],
    features: [
      { key: 'Dor', val: 'Anterolateral, irradia para deltóide' },
      { key: 'ROM', val: 'Arco doloroso 60–120° abdução' },
      { key: 'Testes', val: 'Hawkins + Neer positivos' },
      { key: 'Fraqueza', val: 'Possível se rotura associada' },
      { key: 'Imagiologia', val: 'Rx ± Ecografia / RMN' },
      { key: 'Referência', val: 'Ortopedia se > 3–6m sem resposta' }
    ]
  },
  {
    icon: '🔒', iconClass: 'ri-purple', title: 'Capsulite Adesiva', subtitle: 'Frozen shoulder',
    tags: [{ cls: 'dt-age', label: '50–60 anos' }, { cls: 'dt-systemic', label: 'Diabetes / Tiróide' }],
    features: [
      { key: 'Dor', val: 'Difusa, piora à noite (fase 1)' },
      { key: 'ROM', val: 'Redução global ativo + passivo' },
      { key: 'Critério', val: 'Rot. externa passiva < 50% contralateral' },
      { key: 'Testes', val: 'Sem testes específicos; ROM é tudo' },
      { key: 'Duração', val: '1–3 anos (3 fases)' },
      { key: 'Referência', val: 'Fisioterapia + infiltração GH' }
    ]
  },
  {
    icon: '💪', iconClass: 'ri-blue', title: 'Rotura Coifa Rotadores', subtitle: 'Parcial ou total do supraspinhoso',
    tags: [{ cls: 'dt-age', label: '> 50 anos' }, { cls: 'dt-trauma', label: 'Trauma / Crónico' }],
    features: [
      { key: 'Dor', val: 'Anterolateral, noturna, piora em esforço' },
      { key: 'ROM', val: 'Ativo limitado, passivo preservado' },
      { key: 'Testes', val: 'Drop arm + Empty can positivos' },
      { key: 'Fraqueza', val: 'Fraqueza abdução/rot. externa proeminente' },
      { key: 'Imagiologia', val: 'Ecografia ou RMN ombro' },
      { key: 'Referência', val: 'Ortopedia se rotura total / jovem ativo' }
    ]
  },
  {
    icon: '🔝', iconClass: 'ri-green', title: 'Artropatia Acromioclavicular', subtitle: 'Artrose AC ou lesão ligamentar',
    tags: [{ cls: 'dt-trauma', label: 'Trauma' }, { cls: 'dt-age', label: 'Qualquer idade' }],
    features: [
      { key: 'Dor', val: 'Localizada sobre articulação AC' },
      { key: 'ROM', val: 'Dor no extremo da adução horizontal' },
      { key: 'Testes', val: 'Scarf test positivo, palpação AC dolorosa' },
      { key: 'Deformidade', val: 'Visível se lesão grau III+' },
      { key: 'Imagiologia', val: 'Rx AC com carga bilateral' },
      { key: 'Referência', val: 'Graus IV–VI → Ortopedia' }
    ]
  },
  {
    icon: '🦾', iconClass: 'ri-blue', title: 'Tendinopatia do Bíceps', subtitle: 'Longa porção + possível SLAP',
    tags: [{ cls: 'dt-common', label: 'Frequente' }, { cls: 'dt-trauma', label: 'Sobrecarga' }],
    features: [
      { key: 'Dor', val: 'Anterior, goteira bicipital' },
      { key: 'ROM', val: 'Preservado na maioria' },
      { key: 'Testes', val: "Speed's + Yergason positivos" },
      { key: 'Sinal Popeye', val: 'Rotura completa: músculo retraído' },
      { key: 'Imagiologia', val: 'Ecografia goteira bicipital' },
      { key: 'Referência', val: 'Fisioterapia; cirurgia se rotura' }
    ]
  },
  {
    icon: '⚡', iconClass: 'ri-orange', title: 'Radiculopatia Cervical', subtitle: 'Mais comum C5–C6 (dermátoma ombro)',
    tags: [{ cls: 'dt-systemic', label: 'Cervical' }, { cls: 'dt-age', label: '40–60 anos' }],
    features: [
      { key: 'Dor', val: 'Irradiada ao longo do membro, dermatomal' },
      { key: 'ROM', val: 'ROM ombro preservado; ROM cervical limitado' },
      { key: 'Testes', val: 'Spurling positivo, défice sensitivo/motor' },
      { key: 'Parestesias', val: 'Frequentes, digitais' },
      { key: 'Imagiologia', val: 'RMN cervical (± Rx)' },
      { key: 'Referência', val: 'Neurocirurgia/Ortopedia se défice' }
    ]
  },
  {
    icon: '🔥', iconClass: 'ri-orange', title: 'Bursite Subacromial', subtitle: 'Isolada ou associada a impingement',
    tags: [{ cls: 'dt-common', label: 'Frequente' }],
    features: [
      { key: 'Dor', val: 'Difusa, ombro lateral, piora com abdução' },
      { key: 'ROM', val: 'Arco doloroso semelhante ao impingement' },
      { key: 'Testes', val: 'Hawkins + Neer + palpação subacromial' },
      { key: 'Diferencial', val: 'ROM passivo preservado (vs capsulite)' },
      { key: 'Imagiologia', val: 'Ecografia: derrame bursa subacromial' },
      { key: 'Tratamento', val: 'AINE + fisioterapia + infiltração' }
    ]
  },
  {
    icon: '⚖️', iconClass: 'ri-green', title: 'Instabilidade Glenoumeral',
    subtitle: 'Anterior (mais comum) / posterior / multidirecional',
    tags: [{ cls: 'dt-age', label: '< 35 anos' }, { cls: 'dt-trauma', label: 'Desportivo' }],
    features: [
      { key: 'Dor', val: 'Vaga, piora em posição de risco (abdução + rot ext)' },
      { key: 'ROM', val: 'Normal ou hipermóvel' },
      { key: 'Testes', val: 'Apprehension + Relocation positivos' },
      { key: 'História', val: 'Episódios de luxação ou subluxação' },
      { key: 'Imagiologia', val: 'RMN artroRM se lesão Bankart/Hill-Sachs' },
      { key: 'Referência', val: 'Ortopedia se recidivante' }
    ]
  }
];
