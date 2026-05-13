import type { LabParam } from './types';

export const params: LabParam[] = [

  // ============== HEMATOLOGIA ==============
  {
    id: 'hb',
    name: 'Hemoglobina',
    keywords: 'hb hemoglobina anemia',
    unit: 'g/dL',
    ref: ctx => ctx.sex === 'F' ? '12 – 15 g/dL (mulher)' : '13 – 17 g/dL (homem)',
    interpret: (v, ctx) => {
      const lower = ctx.sex === 'F' ? 12 : 13;
      const upper = ctx.sex === 'F' ? 15 : 17;
      if (v < 7) return {
        level: 'critical',
        verdict: 'Anemia grave',
        detail: `${v} g/dL — muito abaixo do limite inferior (${lower}).`,
        think: 'Anemia clinicamente significativa. Causas a considerar consoante VGM: <strong>microcítica</strong> (ferropenia, talassemia), <strong>normocítica</strong> (hemorragia aguda, doença crónica, hemólise), <strong>macrocítica</strong> (B12/folato, álcool).',
        doNow: '<ul><li><strong>Ponderar transfusão</strong> se sintomático (dispneia, angina, taquicardia, alteração consciência) ou se Hb &lt;7 mesmo assintomático em doente com comorbilidades CV (alvo 7-8)</li><li>Investigar causa em paralelo (hemograma completo, VGM, retic, ferritina, B12, folato)</li><li>Excluir hemorragia ativa (toque rectal, sangue oculto se estável)</li></ul>',
        danger: 'Hb &lt;7 + instabilidade hemodinâmica ou hemorragia ativa → <strong>urgência hospitalar</strong>, transfusão emergente.'
      };
      if (v < lower - 2) return {
        level: 'severe',
        verdict: 'Anemia moderada-grave',
        detail: `${v} g/dL — bastante abaixo do limite inferior (${lower}).`,
        think: 'Investigar causa com prioridade. Sempre pedir <strong>VGM</strong> primeiro para classificar morfologicamente.',
        doNow: '<ul><li>Pedir: hemograma com VGM, contagem reticulocitária, ferritina, TSAT, B12, folato, função renal, TSH</li><li>Se VGM &lt;80: ferritina &lt;30 confirma ferropenia → investigar perda GI em homem ou pós-menopausa (sangue oculto, EDA, colonoscopia)</li><li>Se VGM &gt;100: pedir B12, folato, função hepática, TSH</li><li>Considerar referenciação se causa não esclarecida</li></ul>',
        danger: 'Anemia ferropénica em homem ou mulher pós-menopausa → <strong>investigar sempre hemorragia digestiva oculta</strong>.'
      };
      if (v < lower) return {
        level: 'moderate',
        verdict: 'Anemia ligeira',
        detail: `${v} g/dL — ligeiramente abaixo do normal (${lower} – ${upper}).`,
        think: 'Causa mais frequente em adultos: <strong>ferropenia</strong> (mulher menstruada, dieta vegetariana, perdas GI). Em idoso considerar: doença crónica, neoplasia, IRC, mielodisplasia.',
        doNow: '<ul><li>Pedir: VGM, ferritina, TSAT, B12, folato, função renal</li><li>História: hemorragias (menstruação, GI), alimentação, fármacos (AINE, anticoagulantes)</li><li>Repetir hemograma em 4-6 semanas após otimização</li></ul>'
      };
      if (v <= upper) return { level: 'normal', verdict: 'Hemoglobina normal', detail: `${v} g/dL — dentro do intervalo (${lower} – ${upper}).` };
      if (v <= upper + 2) return {
        level: 'mild',
        verdict: 'Poliglobulia ligeira',
        detail: `${v} g/dL — ligeiramente acima do normal.`,
        think: 'Causa mais comum: <strong>secundária</strong> — tabagismo, DPOC, SAOS, altitude, desidratação (hemoconcentração).',
        doNow: '<ul><li>Confirmar em colheita repetida bem hidratada</li><li>História: tabagismo, sintomas SAOS (ronco, sonolência), DPOC</li><li>SpO₂ e gasometria se DPOC</li><li>Considerar estudo do sono se SAOS provável</li></ul>'
      };
      return {
        level: 'severe',
        verdict: 'Poliglobulia significativa',
        detail: `${v} g/dL — bastante acima do normal.`,
        think: 'Hb persistentemente &gt;18,5 (H) ou &gt;16,5 (M) sugere <strong>policitemia vera</strong> (excluir JAK2). Causas secundárias graves: hipoxemia crónica, tumor produtor de EPO.',
        doNow: '<ul><li>Pedir: ferritina (baixa em PV), EPO sérica, JAK2 V617F</li><li>SpO₂, gasometria, considerar eco abdominal (esplenomegalia)</li><li>Referenciar a Hematologia</li><li>Aconselhar hidratação adequada e evitar fatores de desidratação</li></ul>',
        danger: 'Hb &gt;20 g/dL → risco trombótico significativo, referenciação urgente.'
      };
    }
  },

  {
    id: 'plt',
    name: 'Plaquetas',
    keywords: 'plt plaquetas trombocitos',
    unit: '× 10⁹/L',
    ref: () => '150 – 400 × 10⁹/L',
    interpret: (v) => {
      if (v < 20) return {
        level: 'critical',
        verdict: 'Trombocitopenia grave',
        detail: `${v} × 10⁹/L — risco de hemorragia espontânea.`,
        think: 'Urgência hematológica. Causas possíveis: PTI, PTT, CID, aplasia, infiltração medular, hipersplenismo, fármacos.',
        doNow: '<ul><li><strong>Urgência hospitalar imediata</strong></li><li>Suspender antiagregantes/anticoagulantes</li><li>Evitar AINE, procedimentos invasivos, IM</li><li>Pedir esfregaço (excluir pseudo-trombocitopenia por EDTA, esquistócitos)</li></ul>',
        danger: '&lt;20 × 10⁹/L → <strong>risco de hemorragia espontânea</strong> (intracraniana, GI). Pedir colheita em citrato para excluir pseudo-trombocitopenia se incidental num doente assintomático.'
      };
      if (v < 50) return {
        level: 'severe',
        verdict: 'Trombocitopenia moderada-grave',
        detail: `${v} × 10⁹/L — contraindica procedimentos invasivos.`,
        think: 'Investigar causa. Excluir primeiro pseudo-trombocitopenia (artefacto EDTA — pedir citrato).',
        doNow: '<ul><li>Esfregaço de sangue periférico (excluir pseudo-trombocitopenia, esquistócitos sugestivos PTT/SHU)</li><li>História: fármacos (HIT em heparina, quinina, sulfas), infeção viral recente, álcool</li><li>Função hepática, INR/aPTT, fibrinogénio, LDH (CID, hemólise)</li><li>Referenciar a Hematologia</li></ul>',
        danger: 'Trombocitopenia + sintomas neurológicos + febre + anemia hemolítica + IRA → <strong>PTT</strong>, urgência (plasmaférese).'
      };
      if (v < 100) return {
        level: 'moderate',
        verdict: 'Trombocitopenia ligeira-moderada',
        detail: `${v} × 10⁹/L — abaixo do normal.`,
        think: 'Causas comuns: infeção viral, álcool, fármacos (heparina, antibióticos, anti-epilépticos), cirrose, doença autoimune.',
        doNow: '<ul><li>Repetir hemograma em 2-4 semanas (excluir transitória)</li><li>Hist clínica: fármacos novos, álcool, infeção recente, sintomas autoimunes</li><li>Função hepática, ecografia abdominal se cirrose suspeita</li><li>Se persistente: ANA, HIV, HCV, esfregaço</li></ul>'
      };
      if (v < 150) return {
        level: 'mild',
        verdict: 'Trombocitopenia muito ligeira',
        detail: `${v} × 10⁹/L — ligeiramente baixa.`,
        think: 'Frequentemente irrelevante mas merece controlo. Comum em cirróticos, viroses recentes.',
        doNow: 'Repetir em 1-3 meses. Se persistente e tendência decrescente → investigar.'
      };
      if (v <= 400) return { level: 'normal', verdict: 'Plaquetas normais', detail: `${v} × 10⁹/L — dentro do intervalo.` };
      if (v <= 600) return {
        level: 'mild',
        verdict: 'Trombocitose ligeira',
        detail: `${v} × 10⁹/L — acima do normal.`,
        think: 'Quase sempre <strong>reativa</strong> (90%): infeção, inflamação, ferropenia, pós-esplenectomia, neoplasia oculta.',
        doNow: '<ul><li>PCR, ferritina, hemograma completo</li><li>Investigar foco: rastreio de neoplasia consoante idade (FOMC, mamografia, etc.)</li><li>Repetir em 4-6 semanas</li></ul>'
      };
      if (v <= 1000) return {
        level: 'moderate',
        verdict: 'Trombocitose moderada',
        detail: `${v} × 10⁹/L — substancialmente elevada.`,
        think: 'Maioria ainda reativa, mas considerar <strong>neoplasia mieloproliferativa</strong> (trombocitemia essencial, PV, LMC) se persistente.',
        doNow: '<ul><li>Investigação completa de causas reativas</li><li>Se persistente: JAK2, esfregaço, considerar referenciação Hematologia</li></ul>'
      };
      return {
        level: 'severe',
        verdict: 'Trombocitose extrema',
        detail: `${v} × 10⁹/L — muito elevada.`,
        think: 'Risco <strong>trombótico</strong> e paradoxalmente hemorrágico (síndrome de von Willebrand adquirida). Forte suspeita de neoplasia mieloproliferativa.',
        doNow: '<ul><li>Referenciação <strong>urgente</strong> a Hematologia</li><li>Avaliar sintomas trombóticos (cefaleias, AVC, IAM, TVP)</li><li>JAK2, CALR, MPL; esfregaço</li></ul>',
        danger: '&gt;1000 × 10⁹/L → risco trombótico significativo. AAS profilático pode ser iniciado após avaliação de risco hemorrágico.'
      };
    }
  },

  {
    id: 'wbc',
    name: 'Leucócitos',
    keywords: 'leucocitos wbc gb leucopenia leucocitose neutrofilos',
    unit: '× 10⁹/L',
    ref: () => '4,0 – 11,0 × 10⁹/L',
    interpret: (v) => {
      if (v < 1) return {
        level: 'critical',
        verdict: 'Leucopenia grave (provável neutropenia)',
        detail: `${v} × 10⁹/L — alto risco infecioso.`,
        think: 'Estimar neutrófilos absolutos. Se &lt;0,5 → neutropenia grave. Causas: aplasia, quimioterapia, leucemia aguda, fármacos (clozapina, metimazol).',
        doNow: '<ul><li><strong>Urgência hospitalar</strong> se febre (neutropenia febril)</li><li>Isolamento, antibioterapia empírica de largo espectro imediata se T ≥38°C</li><li>Hemocultura, urocultura antes de AB</li><li>Referenciar Hematologia</li></ul>',
        danger: 'Neutropenia (&lt;0,5) + febre → <strong>urgência absoluta</strong>, antibioterapia empírica em &lt;1h (Tazocin, cefepima, meropenem conforme protocolo local).'
      };
      if (v < 3) return {
        level: 'severe',
        verdict: 'Leucopenia',
        detail: `${v} × 10⁹/L — abaixo do normal.`,
        think: 'Causas: <strong>virais</strong> (mais frequente), fármacos, doença autoimune, hiperesplenismo, défice B12/folato.',
        doNow: '<ul><li>Pedir diferencial leucocitário (saber se é neutropenia, linfopenia, ambas)</li><li>Repetir hemograma em 2-4 semanas</li><li>Excluir fármacos suspeitos</li><li>Se persistente: ANA, HIV, esfregaço, B12/folato</li></ul>'
      };
      if (v < 4) return {
        level: 'mild',
        verdict: 'Leucopenia ligeira',
        detail: `${v} × 10⁹/L — ligeiramente baixos.`,
        think: 'Frequentemente após viroses; em afrodescendentes pode ser fisiológico (neutropenia étnica benigna).',
        doNow: 'Repetir em 4 semanas; se persistente e sintomático investigar.'
      };
      if (v <= 11) return { level: 'normal', verdict: 'Leucócitos normais', detail: `${v} × 10⁹/L — dentro do intervalo.` };
      if (v <= 15) return {
        level: 'mild',
        verdict: 'Leucocitose ligeira',
        detail: `${v} × 10⁹/L — acima do normal.`,
        think: 'Causas comuns: infeção bacteriana, stress, corticoides, exercício, tabaco, gravidez tardia. Pedir diferencial.',
        doNow: 'Avaliar contexto clínico (febre, sintomas), PCR, diferencial leucocitário. Repetir após resolução do quadro agudo.'
      };
      if (v <= 25) return {
        level: 'moderate',
        verdict: 'Leucocitose moderada',
        detail: `${v} × 10⁹/L — substancial.`,
        think: 'Infeção bacteriana significativa, abcesso, sépsis incipiente, neoplasia hematológica, terapia com corticoides altos.',
        doNow: '<ul><li>Avaliação clínica completa, pesquisa de foco infecioso</li><li>PCR, procalcitonina, hemoculturas se febre</li><li>Diferencial: predominância de neutrófilos imaturos (desvio à esquerda) sugere infeção</li></ul>'
      };
      return {
        level: 'severe',
        verdict: 'Leucocitose extrema',
        detail: `${v} × 10⁹/L — muito elevada.`,
        think: '&gt;25-30 × 10⁹/L com formas imaturas (mieloblastos, promielócitos) → suspeitar <strong>leucemia aguda</strong>. Outros: reação leucemoide (sépsis), LMC.',
        doNow: '<ul><li><strong>Referenciar urgente a Hematologia</strong></li><li>Esfregaço de sangue periférico</li><li>LDH, ácido úrico (síndrome lise tumoral), função renal</li></ul>',
        danger: '&gt;100 × 10⁹/L → risco de <strong>leucostase</strong> (dispneia, alterações neurológicas, priapismo) — emergência hematológica.'
      };
    }
  },

  {
    id: 'inr',
    name: 'INR',
    keywords: 'inr tp varfarina anticoagulacao',
    unit: '',
    ref: () => '0,8 – 1,2 (sem AC) · 2-3 em varfarina',
    extras: [
      { id: 'ac', label: 'Anticoagulado?', type: 'select', options: [
        ['no', 'Não'],
        ['warfarin', 'Sim — varfarina (alvo 2-3)'],
        ['warfarin25', 'Sim — varfarina alvo 2,5-3,5 (válvula)']
      ]}
    ],
    interpret: (v, ctx) => {
      const ac = ctx.extras.ac || 'no';
      if (ac === 'no') {
        if (v < 0.8) return { level: 'mild', verdict: 'INR baixo', detail: `${v}`, think: 'Raramente relevante. Verificar fármacos (vit K, corticoides).' };
        if (v <= 1.2) return { level: 'normal', verdict: 'INR normal', detail: `${v}` };
        if (v < 1.5) return {
          level: 'mild', verdict: 'INR ligeiramente elevado', detail: `${v} — para doente não anticoagulado.`,
          think: 'Causas: défice de vit K (dieta, antibióticos prolongados), doença hepática inicial, AINE, fármacos.',
          doNow: 'Função hepática completa, repetir após otimização. Confirmar que não está em anticoagulante.'
        };
        if (v < 3) return {
          level: 'moderate', verdict: 'INR elevado', detail: `${v} — substancial em doente não anticoagulado.`,
          think: '<strong>Doença hepática</strong> (síntese ↓), défice grave de vit K, CID, fármacos (amiodarona, antibióticos, miconazol).',
          doNow: '<ul><li>Função hepática, albumina, plaquetas, fibrinogénio</li><li>Excluir CID (D-dímeros, esfregaço)</li><li>Considerar vit K oral 10 mg se défice provável</li><li>Investigar etiologia hepática se aplicável</li></ul>'
        };
        return {
          level: 'severe', verdict: 'INR muito elevado', detail: `${v} — risco hemorrágico significativo.`,
          think: 'Insuficiência hepática aguda, CID grave, overdose de varfarina não declarada, intoxicação rodenticida.',
          doNow: '<ul><li><strong>Urgência</strong> se sinais hemorrágicos</li><li>Vit K 10 mg EV</li><li>Considerar CCP se hemorragia ativa</li><li>Investigar causa, função hepática completa, plaquetas, fibrinogénio</li></ul>',
          danger: 'INR &gt;1,5 + encefalopatia + bilirrubina alta → <strong>insuficiência hepática aguda</strong>, referenciar urgente.'
        };
      }
      const lower = ac === 'warfarin25' ? 2.5 : 2;
      const upper = ac === 'warfarin25' ? 3.5 : 3;
      if (v < lower) return {
        level: 'moderate', verdict: 'INR sub-terapêutico', detail: `${v} — alvo ${lower}-${upper}.`,
        think: 'Risco trombótico aumentado. Causas: má adesão, interação fármaco/dieta (vit K), absorção inadequada.',
        doNow: '<ul><li>Verificar adesão e dieta (vit K — vegetais verdes)</li><li>Aumentar dose semanal de varfarina em ~10-15%</li><li>Repetir INR em 7 dias</li></ul>'
      };
      if (v <= upper) return { level: 'normal', verdict: 'INR no alvo terapêutico', detail: `${v} — dentro do alvo ${lower}-${upper}.` };
      if (v <= upper + 1) return {
        level: 'mild', verdict: 'INR ligeiramente acima do alvo', detail: `${v}.`,
        doNow: 'Considerar reduzir 5-10% da dose semanal OU saltar uma dose se ≥4. Reavaliar em 3-7 dias. Verificar novos fármacos (antibióticos, antifúngicos).'
      };
      if (v < 5) return {
        level: 'moderate', verdict: 'INR elevado (sem hemorragia)', detail: `${v}.`,
        doNow: '<ul><li>Suspender 1-2 doses de varfarina</li><li>Reduzir dose semanal</li><li>Reavaliar INR em 2-4 dias</li><li>Investigar precipitantes (fármacos, dieta, doença intercorrente)</li></ul>'
      };
      if (v < 9) return {
        level: 'severe', verdict: 'INR muito elevado', detail: `${v} — risco hemorrágico significativo.`,
        doNow: '<ul><li>Suspender varfarina</li><li>Vit K 1-2,5 mg <strong>oral</strong> (não EV — sobre-correção)</li><li>Reavaliar INR em 24h</li><li>Reiniciar com dose reduzida quando INR no alvo</li></ul>',
        danger: 'Se hemorragia minor → vit K oral. Se hemorragia major → vit K 10 mg EV + CCP, hospital.'
      };
      return {
        level: 'critical', verdict: 'INR extremamente elevado', detail: `${v} — risco hemorrágico muito alto.`,
        doNow: '<ul><li>Suspender varfarina</li><li>Vit K 5-10 mg <strong>EV</strong></li><li>Considerar CCP profilático</li><li>Internamento ou observação hospitalar</li></ul>',
        danger: 'INR &gt;9 → <strong>urgência</strong>. Procurar sinais hemorrágicos (cefaleia → TAC; hematúria, melena, equimoses).'
      };
    }
  },

  // ============== ELETRÓLITOS ==============
  {
    id: 'na',
    name: 'Sódio (Na⁺)',
    keywords: 'na sodio hiponatremia hipernatremia',
    unit: 'mEq/L',
    ref: () => '135 – 145 mEq/L',
    interpret: (v) => {
      if (v < 120) return {
        level: 'critical', verdict: 'Hiponatrémia grave', detail: `${v} mEq/L — risco neurológico.`,
        think: 'Sintomas neurológicos prováveis (confusão, convulsões, coma). Causas agudas: SIADH, polidipsia, "ecstasy", pós-cirurgia.',
        doNow: '<ul><li><strong>Urgência hospitalar</strong></li><li>Se sintomas: SF hipertónico 3% em bolus 100-150 mL (UCI)</li><li>Avaliar volémia: euvolémica (SIADH), hipovolémica (perdas), hipervolémica (IC, cirrose)</li><li>Osmolaridade sérica e urinária, Na urinário</li></ul>',
        danger: 'Correção rápida (&gt;8-10 mEq/L em 24h) → <strong>mielinólise pontina central</strong>, irreversível.'
      };
      if (v < 125) return {
        level: 'severe', verdict: 'Hiponatrémia moderada', detail: `${v} mEq/L.`,
        think: 'Avaliar volémia e osmolaridade. Excluir pseudo-hiponatrémia (hiperglicemia → Na corrigido = Na + 1,6×[(glic-100)/100]).',
        doNow: '<ul><li>Excluir hiperglicemia (Na corrigido)</li><li>Avaliar volémia clinicamente</li><li>Osmolaridade sérica e urinária, Na urinário</li><li>Função tiróidea e cortisol se causa não óbvia</li><li>Internamento provável</li></ul>'
      };
      if (v < 130) return {
        level: 'moderate', verdict: 'Hiponatrémia ligeira', detail: `${v} mEq/L.`,
        think: 'Causas comuns: tiazidas, SIADH (fármacos como ISRS, carbamazepina, opioides), IC, cirrose, hipotiroidismo, addisson.',
        doNow: '<ul><li>Rever fármacos (tiazidas, ISRS, opióides, carbamazepina)</li><li>Pedir osmolaridade sérica e urinária, Na urinário</li><li>TSH, cortisol</li><li>Restrição hídrica se SIADH provável</li></ul>'
      };
      if (v < 135) return { level: 'mild', verdict: 'Hiponatrémia muito ligeira', detail: `${v} mEq/L.`, doNow: 'Investigar se persistente. Frequente em idosos e doentes a tomar tiazidas/ISRS.' };
      if (v <= 145) return { level: 'normal', verdict: 'Sódio normal', detail: `${v} mEq/L.` };
      if (v < 150) return {
        level: 'moderate', verdict: 'Hipernatrémia ligeira', detail: `${v} mEq/L.`,
        think: 'Quase sempre por défice de água livre: idosos com má ingestão, demência, perdas insensíveis sem reposição, diabetes insípida.',
        doNow: '<ul><li>Avaliar acesso à água, ingestão hídrica, glicemia</li><li>Calcular défice de água livre</li><li>Reposição lenta (oral preferida, ou SG 5% IV)</li></ul>'
      };
      if (v < 160) return {
        level: 'severe', verdict: 'Hipernatrémia moderada', detail: `${v} mEq/L.`,
        doNow: '<ul><li>Internamento</li><li>Reposição lenta — máx 10 mEq/L/dia (risco edema cerebral)</li><li>Investigar diabetes insípida se poliúria (osmU baixa apesar de sede e Na alto)</li></ul>'
      };
      return {
        level: 'critical', verdict: 'Hipernatrémia grave', detail: `${v} mEq/L — emergência.`,
        doNow: '<ul><li><strong>UCI</strong></li><li>Reposição muito lenta, monitorização contínua</li><li>Investigar e tratar causa</li></ul>',
        danger: 'Mortalidade significativa em valores &gt;160. Correção rápida → edema cerebral, mielinólise.'
      };
    }
  },

  {
    id: 'k',
    name: 'Potássio (K⁺)',
    keywords: 'k potassio hipocalemia hipercalemia',
    unit: 'mEq/L',
    ref: () => '3,5 – 5,0 mEq/L',
    interpret: (v) => {
      if (v < 2.5) return {
        level: 'critical', verdict: 'Hipocalémia grave', detail: `${v} mEq/L — risco arrítmico.`,
        think: 'Risco de arritmias graves (TV/FV). Causas: vómitos profusos, diarreia, diuréticos, hiperaldosteronismo, sd Bartter/Gitelman.',
        doNow: '<ul><li><strong>Hospital</strong>, ECG (ondas U, achatamento T, depressão ST)</li><li>Reposição EV (KCl em SF, máx 10-20 mEq/h periférico, 40 mEq/h via central)</li><li>Monitorização cardíaca</li><li><strong>Corrigir Mg em paralelo</strong> (hipoMg perpetua hipoK)</li></ul>',
        danger: '&lt;2,5 + alterações ECG ou sintomas (paresia, paralisia) → emergência.'
      };
      if (v < 3) return {
        level: 'severe', verdict: 'Hipocalémia moderada', detail: `${v} mEq/L.`,
        doNow: '<ul><li>ECG</li><li>Reposição oral (KCl 40-80 mEq/dia) ou EV se sintomas/digital/arritmia</li><li>Pedir Mg, gasometria (acidose vs alcalose)</li><li>Rever fármacos (tiazidas, ansa, β2)</li><li>Repetir em 24-48h</li></ul>'
      };
      if (v < 3.5) return {
        level: 'moderate', verdict: 'Hipocalémia ligeira', detail: `${v} mEq/L.`,
        think: 'Causas comuns: diuréticos da ansa/tiazidas, vómitos, diarreia, shift intracelular (β2, insulina, alcalose).',
        doNow: '<ul><li>Suplemento oral (KCl 20-40 mEq/dia ou alimentos ricos em K)</li><li>Rever diuréticos, considerar associar poupador de K</li><li>Repetir em 1-2 semanas</li></ul>'
      };
      if (v <= 5) return { level: 'normal', verdict: 'Potássio normal', detail: `${v} mEq/L.` };
      if (v < 5.5) return {
        level: 'mild', verdict: 'Hipercalémia ligeira', detail: `${v} mEq/L.`,
        think: '<strong>Excluir pseudo-hipercalémia</strong> (hemólise da amostra, garrote prolongado). Causas reais: IRC, IECA/ARA, espironolactona, AINE, β-bloqueantes, trimetoprim.',
        doNow: '<ul><li>Confirmar com nova colheita sem garrote</li><li>Rever fármacos (IECA/ARA + espironolactona em IC?)</li><li>Função renal, ionograma completo</li><li>ECG se ≥5,5 ou sintomas</li></ul>'
      };
      if (v < 6) return {
        level: 'moderate', verdict: 'Hipercalémia moderada', detail: `${v} mEq/L.`,
        doNow: '<ul><li>ECG (ondas T apiculadas, PR alargado)</li><li>Suspender fármacos retentores de K</li><li>Furosemida 40 mg + dieta pobre em K</li><li>Considerar resinas (resincalcio, patiromer)</li><li>Repetir em 24h</li></ul>'
      };
      if (v < 6.5) return {
        level: 'severe', verdict: 'Hipercalémia grave', detail: `${v} mEq/L.`,
        doNow: '<ul><li><strong>Hospital + ECG</strong></li><li>Cálcio gluconato 10% 10 mL EV (estabiliza miocárdio) se alterações ECG</li><li>Insulina + glicose, salbutamol nebulizado (shift intracelular)</li><li>Furosemida + resinas</li><li>Considerar hemodiálise se IRC</li></ul>'
      };
      return {
        level: 'critical', verdict: 'Hipercalémia extrema', detail: `${v} mEq/L — emergência cardíaca.`,
        doNow: '<ul><li><strong>Emergência</strong> — ECG imediato</li><li>Gluconato de cálcio EV imediato</li><li>Insulina + glicose + salbutamol</li><li>Hemodiálise urgente provável</li></ul>',
        danger: 'ECG com ondas sinusoidais ou QRS largo → <strong>paragem iminente</strong>.'
      };
    }
  },

  {
    id: 'cacorr',
    name: 'Cálcio total',
    keywords: 'calcio ca calcemia hipocalcemia hipercalcemia',
    unit: 'mg/dL',
    ref: () => '8,5 – 10,2 mg/dL (total) — corrigir para albumina!',
    extras: [
      { id: 'alb', label: 'Albumina (g/dL)', type: 'number', default: 4.0, step: '0.1' }
    ],
    interpret: (v, ctx) => {
      const alb = parseFloat(ctx.extras.alb ?? '') || 4.0;
      const corr = v + 0.8 * (4 - alb);
      const corrText = `Ca corrigido (albumina ${alb}): <strong>${corr.toFixed(1)} mg/dL</strong>`;
      if (corr < 7) return {
        level: 'critical', verdict: 'Hipocalcémia grave', detail: `Ca total ${v}, ${corrText}.`,
        think: 'Risco de tetania, convulsões, prolongamento QT/arritmias. Causas: hipoparatiroidismo, défice grave vit D, IRC, pancreatite, transfusões massivas.',
        doNow: '<ul><li><strong>Hospital</strong>, ECG, ionograma com Mg</li><li>Ca gluconato EV se sintomas</li><li>Corrigir Mg simultaneamente</li><li>Investigar causa: PTH, vit D, fosfato, função renal</li></ul>',
        danger: 'Sintomas: parestesias, espasmo carpopedal, sinal Chvostek/Trousseau → urgente.'
      };
      if (corr < 8.5) return {
        level: 'moderate', verdict: 'Hipocalcémia', detail: `Ca total ${v}, ${corrText}.`,
        doNow: '<ul><li>PTH, vit D (25-OH), fosfato, Mg, função renal</li><li>Suplementar Ca oral + vit D conforme causa</li><li>Referenciar Endocrinologia se persistente</li></ul>'
      };
      if (corr <= 10.2) return { level: 'normal', verdict: 'Cálcio normal', detail: `Ca total ${v}, ${corrText}.` };
      if (corr < 12) return {
        level: 'moderate', verdict: 'Hipercalcémia ligeira', detail: `Ca total ${v}, ${corrText}.`,
        think: '<strong>2 grandes causas:</strong> hiperparatiroidismo primário (ambulatório) e neoplasia (hospitalar). Outras: sarcoidose, intoxicação vit D, tiazidas, lítio, imobilização.',
        doNow: '<ul><li>PTH (alta → hiperparatiroidismo; baixa → neoplasia, sarcoidose, vit D)</li><li>Rever fármacos (tiazidas, lítio, suplementos)</li><li>Vit D, função renal, fosfato</li><li>Eletroforese proteínas (mieloma se &gt;50a)</li></ul>'
      };
      if (corr < 14) return {
        level: 'severe', verdict: 'Hipercalcémia moderada', detail: `Ca total ${v}, ${corrText}.`,
        doNow: '<ul><li>Hidratação salina IV 3-4 L/dia</li><li>Considerar bisfosfonatos (ácido zoledrónico)</li><li>Calcitonina se grave</li><li>Investigação urgente da causa (PTH, imagem)</li></ul>'
      };
      return {
        level: 'critical', verdict: 'Hipercalcémia grave', detail: `Ca total ${v}, ${corrText} — crise hipercalcémica.`,
        doNow: '<ul><li><strong>Emergência</strong></li><li>SF 0,9% 2-4 L/dia + calcitonina + bisfosfonato</li><li>Considerar hemodiálise se IRC</li><li>Investigação de neoplasia urgente</li></ul>',
        danger: 'Sintomas neurológicos, IRA, arritmias — risco vital.'
      };
    }
  },

  // ============== RENAL ==============
  {
    id: 'cr',
    name: 'Creatinina (+ TFG)',
    keywords: 'creatinina creat tfg drc rim funcao renal',
    unit: 'mg/dL',
    ref: ctx => ctx.sex === 'F' ? '0,6 – 1,1 mg/dL (mulher)' : '0,7 – 1,3 mg/dL (homem)',
    interpret: (v, ctx) => {
      const age = ctx.age || 50;
      const sex = ctx.sex;
      const k = sex === 'F' ? 0.7 : 0.9;
      const alpha = sex === 'F' ? -0.241 : -0.302;
      const sexMult = sex === 'F' ? 1.012 : 1;
      const ratio = v / k;
      const tfg = Math.round(142 * Math.pow(Math.min(ratio, 1), alpha) * Math.pow(Math.max(ratio, 1), -1.200) * Math.pow(0.9938, age) * sexMult);
      const tfgText = `TFG estimada (CKD-EPI): <strong>${tfg} mL/min/1,73m²</strong>`;

      if (tfg < 15) return {
        level: 'critical', verdict: 'DRC G5 — falência renal', detail: `${tfgText}. Creatinina ${v}.`,
        think: 'Falência renal. Necessária terapêutica de substituição renal (diálise ou transplante).',
        doNow: '<ul><li>Seguimento por Nefrologia (urgente se primeira deteção)</li><li>Acessar fármacos — descontinuar/ajustar todos os nefrotóxicos</li><li>Avaliar urgência de TSR (sintomas urémicos, K, acidose, sobrecarga)</li></ul>',
        danger: 'Sintomas urémicos (anorexia, náuseas, prurido, pericardite, alteração consciência) → diálise emergente.'
      };
      if (tfg < 30) return {
        level: 'severe', verdict: 'DRC G4 — diminuição grave da TFG', detail: `${tfgText}. Creatinina ${v}.`,
        doNow: '<ul><li>Seguimento por Nefrologia</li><li>Preparar para terapêutica de substituição renal (educar doente)</li><li>Anemia (EPO se Hb &lt;10), Ca/P, vit D, acidose</li><li>Ajustar todos os fármacos à TFG</li><li>Iniciar IECA/ARA + iSGLT2 se proteinúria</li></ul>'
      };
      if (tfg < 45) return {
        level: 'moderate', verdict: 'DRC G3b — diminuição moderada-grave', detail: `${tfgText}. Creatinina ${v}.`,
        doNow: '<ul><li>Referenciar Nefrologia se ainda não seguido</li><li>RAC urinária (albuminúria)</li><li>Otimizar TA (alvo &lt;130/80), DM, lípidos</li><li>IECA/ARA + iSGLT2 se proteinúria/DM</li><li>Vigilância semestral</li></ul>'
      };
      if (tfg < 60) return {
        level: 'mild', verdict: 'DRC G3a — diminuição ligeira-moderada', detail: `${tfgText}. Creatinina ${v}.`,
        think: 'Se persistente &gt;3 meses → DRC. Pode ainda ser AKI se aguda.',
        doNow: '<ul><li>Confirmar persistência (repetir em 3 meses)</li><li>RAC urinária e sedimento</li><li>Ecografia renal</li><li>Controlo TA e DM</li><li>Evitar AINE e nefrotóxicos</li><li>Considerar iSGLT2</li></ul>'
      };
      if (tfg < 90) return {
        level: 'normal', verdict: 'TFG G2 — ligeiramente diminuída', detail: `${tfgText}. Creatinina ${v}.`,
        think: 'Normal para a idade na maioria dos doentes. Só é DRC se houver outros marcadores de lesão renal (proteinúria, hematúria, alterações imagiológicas).',
        doNow: 'Pedir RAC urinária e sedimento se fatores de risco (DM, HTA). Caso contrário vigilância anual.'
      };
      return { level: 'normal', verdict: 'TFG G1 — normal', detail: `${tfgText}. Creatinina ${v}.` };
    }
  },

  {
    id: 'urea',
    name: 'Ureia',
    keywords: 'ureia bun azoto',
    unit: 'mg/dL',
    ref: () => '15 – 45 mg/dL',
    interpret: (v) => {
      if (v < 10) return {
        level: 'mild', verdict: 'Ureia baixa', detail: `${v} mg/dL.`,
        think: 'Causas: insuficiência hepática (síntese ↓), desnutrição, gravidez (hemodiluição), SIADH.',
        doNow: 'Pouco preocupante isoladamente. Avaliar função hepática e estado nutricional se contexto sugere.'
      };
      if (v <= 45) return { level: 'normal', verdict: 'Ureia normal', detail: `${v} mg/dL.` };
      if (v < 80) return {
        level: 'mild', verdict: 'Ureia elevada', detail: `${v} mg/dL.`,
        think: 'Causas: <strong>desidratação</strong>, dieta hiperproteica, hemorragia GI (proteínas absorvidas), corticoides, hipercatabolismo, DRC. Rácio ureia/creat &gt;100 sugere pré-renal ou HGI.',
        doNow: 'Hidratação, repetir; verificar creatinina (calcular rácio); excluir HGI se rácio alto.'
      };
      if (v < 150) return {
        level: 'moderate', verdict: 'Ureia substancialmente elevada', detail: `${v} mg/dL.`,
        doNow: '<ul><li>Avaliar função renal completa (creat, TFG)</li><li>Sinais de desidratação, volémia</li><li>Excluir hemorragia digestiva (toque, sangue oculto)</li><li>Avaliar sintomas urémicos</li></ul>'
      };
      return {
        level: 'severe', verdict: 'Uremia significativa', detail: `${v} mg/dL.`,
        think: 'Falência renal avançada com sintomas urémicos.',
        doNow: '<ul><li>Avaliação urgente da função renal</li><li>Sintomas urémicos (pericardite, encefalopatia, náuseas, prurido)</li><li>Provável necessidade de diálise</li></ul>',
        danger: 'Sintomas urémicos + ureia muito alta → diálise emergente.'
      };
    }
  },

  // ============== HEPÁTICO ==============
  {
    id: 'alt',
    name: 'ALT (TGP)',
    keywords: 'alt tgp transaminase hepatite',
    unit: 'U/L',
    ref: ctx => ctx.sex === 'F' ? '< 35 U/L (mulher)' : '< 40 U/L (homem)',
    interpret: (v, ctx) => {
      const upper = ctx.sex === 'F' ? 35 : 40;
      if (v <= upper) return { level: 'normal', verdict: 'ALT normal', detail: `${v} U/L.` };
      const xULN = (v / upper).toFixed(1);
      if (v < upper * 2) return {
        level: 'mild', verdict: `ALT ligeiramente elevada (${xULN}× LSN)`, detail: `${v} U/L.`,
        think: 'Causas comuns: <strong>esteatose hepática</strong> (NAFLD/MASLD), álcool, fármacos (estatinas, paracetamol em doses normais), exercício intenso recente.',
        doNow: '<ul><li>Rever fármacos, álcool, exercício</li><li>Função hepática completa (AST, GGT, FA, bili, albumina)</li><li>Ecografia abdominal (esteatose?)</li><li>Repetir em 1-3 meses</li></ul>'
      };
      if (v < upper * 5) return {
        level: 'moderate', verdict: `ALT moderadamente elevada (${xULN}× LSN)`, detail: `${v} U/L.`,
        think: 'Hepatite viral crónica (B, C), NAFLD/MASLD com esteato-hepatite, fármacos, álcool.',
        doNow: '<ul><li>Função hepática completa + serologias (HBsAg, anti-HCV)</li><li>Auto-imunidade (ANA, AMA, anti-LKM, IgG)</li><li>Ferritina, ceruloplasmina (Wilson se &lt;40a)</li><li>Ecografia abdominal</li><li>Considerar referenciação Gastrenterologia</li></ul>'
      };
      if (v < upper * 15) return {
        level: 'severe', verdict: `ALT muito elevada (${xULN}× LSN)`, detail: `${v} U/L.`,
        think: 'Hepatite aguda — viral, autoimune, fármacos (paracetamol, AINE, antibióticos), isquemia.',
        doNow: '<ul><li>Avaliação urgente — função hepática completa, INR, bilirrubina, NH₃</li><li>Serologias virais agudas, auto-imunidade</li><li>Excluir paracetamol (nivel)</li><li>Ecografia/eco-Doppler</li><li>Referenciação a Gastrenterologia</li></ul>'
      };
      return {
        level: 'critical', verdict: `ALT extremamente elevada (${xULN}× LSN)`, detail: `${v} U/L — hepatite aguda grave.`,
        think: '<strong>Top 3:</strong> isquémica (choque), tóxica (paracetamol), viral fulminante.',
        doNow: '<ul><li><strong>Urgência hospitalar</strong></li><li>Função hepática completa, INR, bilirrubina, ureia, creat, NH₃, lactato</li><li>Nível de paracetamol mesmo sem história</li><li>Investigar causa de choque/isquemia</li></ul>',
        danger: 'ALT &gt;1000 + INR alto + encefalopatia → <strong>insuficiência hepática aguda</strong>, referenciar a centro com transplante.'
      };
    }
  },

  {
    id: 'ast',
    name: 'AST (TGO)',
    keywords: 'ast tgo transaminase hepatite musculo',
    unit: 'U/L',
    ref: ctx => ctx.sex === 'F' ? '< 35 U/L (mulher)' : '< 40 U/L (homem)',
    extras: [{ id: 'alt', label: 'ALT (se conhecida)', type: 'number', step: '1' }],
    interpret: (v, ctx) => {
      const upper = ctx.sex === 'F' ? 35 : 40;
      const alt = parseFloat(ctx.extras.alt ?? '');
      if (v <= upper) return { level: 'normal', verdict: 'AST normal', detail: `${v} U/L.` };
      const xULN = (v / upper).toFixed(1);
      let ratioText = '';
      if (alt && alt > 0) {
        const ratio = (v / alt).toFixed(1);
        ratioText = ` Rácio AST/ALT = ${ratio}.`;
        if (Number(ratio) > 2) ratioText += ' <strong>Sugere álcool ou cirrose.</strong>';
        if (Number(ratio) > 3) ratioText += ' <strong>Muito específico para etiologia alcoólica.</strong>';
      }
      if (v < upper * 2) return {
        level: 'mild', verdict: `AST ligeiramente elevada (${xULN}× LSN)`, detail: `${v} U/L.${ratioText}`,
        think: '<strong>Menos específica que ALT</strong> — também sobe em músculo, miocárdio, eritrócitos. Excluir rabdomiólise, exercício intenso, hemólise.',
        doNow: 'Pedir ALT, GGT, FA, CK (rabdomiólise), LDH (hemólise). Avaliar contexto.'
      };
      if (v < upper * 5) return {
        level: 'moderate', verdict: `AST moderadamente elevada (${xULN}× LSN)`, detail: `${v} U/L.${ratioText}`,
        doNow: 'Função hepática completa, ALT, CK. Investigar causa hepática vs muscular.'
      };
      return {
        level: 'severe', verdict: `AST muito elevada (${xULN}× LSN)`, detail: `${v} U/L.${ratioText}`,
        think: 'Hepatite aguda (igual a ALT) ou <strong>rabdomiólise</strong>. Confirmar com CK.',
        doNow: '<ul><li>CK obrigatória (rabdomiólise)</li><li>Função hepática completa</li><li>ECG (suspeitar EAM se CK-MB elevada)</li><li>Urgência se causa não óbvia</li></ul>'
      };
    }
  },

  {
    id: 'ggt',
    name: 'GGT',
    keywords: 'ggt gama gt colestase alcool',
    unit: 'U/L',
    ref: ctx => ctx.sex === 'F' ? '< 38 U/L (mulher)' : '< 55 U/L (homem)',
    interpret: (v, ctx) => {
      const upper = ctx.sex === 'F' ? 38 : 55;
      if (v <= upper) return { level: 'normal', verdict: 'GGT normal', detail: `${v} U/L.` };
      const xULN = (v / upper).toFixed(1);
      if (v < upper * 3) return {
        level: 'mild', verdict: `GGT ligeiramente elevada (${xULN}× LSN)`, detail: `${v} U/L.`,
        think: 'Marcador <strong>sensível mas pouco específico</strong>. Causas comuns: álcool, esteatose hepática, fármacos indutores (fenitoína, fenobarbital, carbamazepina).',
        doNow: '<ul><li>Avaliar consumo alcoólico (AUDIT-C)</li><li>Rever fármacos</li><li>Função hepática completa, FA</li><li>Ecografia abdominal se persistente</li></ul>'
      };
      if (v < upper * 10) return {
        level: 'moderate', verdict: `GGT substancialmente elevada (${xULN}× LSN)`, detail: `${v} U/L.`,
        doNow: '<ul><li>FA, bilirrubina (avaliar colestase)</li><li>Ecografia abdominal</li><li>Investigação alcoólica detalhada</li><li>Se FA também alta → padrão colestático, investigar obstrução biliar</li></ul>'
      };
      return {
        level: 'severe', verdict: `GGT muito elevada (${xULN}× LSN)`, detail: `${v} U/L.`,
        think: 'Colestase significativa, álcool intenso, doença hepática avançada.',
        doNow: '<ul><li>Imagem (eco/TC/RM colangio)</li><li>Função hepática completa</li><li>Referenciação Gastrenterologia</li></ul>'
      };
    }
  },

  {
    id: 'bili',
    name: 'Bilirrubina total',
    keywords: 'bilirrubina bt ictericia',
    unit: 'mg/dL',
    ref: () => '0,3 – 1,2 mg/dL',
    interpret: (v) => {
      if (v <= 1.2) return { level: 'normal', verdict: 'Bilirrubina normal', detail: `${v} mg/dL.` };
      if (v < 2.5) return {
        level: 'mild', verdict: 'Hiperbilirrubinemia ligeira', detail: `${v} mg/dL — não suficiente para icterícia clínica.`,
        think: '<strong>Sd Gilbert</strong> (5% da população — bilirrubina ligeiramente alta em jejum/stress, sem patologia) é a causa mais comum quando isolada e indireta. Outras: hemólise ligeira, hepatite ligeira.',
        doNow: '<ul><li>Pedir bilirrubina direta e indireta (fracionar)</li><li>Hemograma, retic, LDH, haptoglobina (hemólise?)</li><li>Função hepática completa</li><li>Se isolada indireta + saudável → Gilbert</li></ul>'
      };
      if (v < 5) return {
        level: 'moderate', verdict: 'Icterícia clínica', detail: `${v} mg/dL — visível clinicamente (sobretudo nas escleróticas).`,
        doNow: '<ul><li>Fracionar (direta/indireta)</li><li>Função hepática completa, INR, albumina</li><li>Ecografia abdominal (vias biliares?)</li><li>Se direta predomina → obstrução ou hepatite</li><li>Se indireta predomina → hemólise ou Gilbert</li></ul>'
      };
      if (v < 15) return {
        level: 'severe', verdict: 'Hiperbilirrubinemia substancial', detail: `${v} mg/dL — icterícia significativa.`,
        think: 'Causas: obstrução biliar (cálculos, neoplasia pancreática), hepatite aguda grave, cirrose descompensada.',
        doNow: '<ul><li>Imagem urgente (ecografia, TC se neoplasia suspeita)</li><li>Função hepática completa, INR, ureia</li><li>Pesquisar dor abdominal, febre (colangite), perda de peso (neoplasia)</li><li>Referenciar urgente</li></ul>',
        danger: 'Icterícia + dor abdominal + febre → <strong>colangite aguda</strong>, urgência. Vesícula palpável indolor (Courvoisier) → suspeitar neoplasia.'
      };
      return {
        level: 'critical', verdict: 'Hiperbilirrubinemia grave', detail: `${v} mg/dL.`,
        doNow: '<ul><li><strong>Urgência hospitalar</strong></li><li>Avaliar insuficiência hepática (INR, encefalopatia)</li><li>Investigação imagiológica urgente</li></ul>'
      };
    }
  },

  // ============== ENDOCRINOLOGIA ==============
  {
    id: 'tsh',
    name: 'TSH',
    keywords: 'tsh tiroide hipotiroidismo hipertiroidismo',
    unit: 'mU/L',
    ref: ctx => ctx.context === 'grav' ? '0,1 – 2,5 mU/L (gravidez 1.º trim)' : '0,4 – 4,0 mU/L',
    extras: [
      { id: 't4', label: 'T4 livre (ng/dL, opcional)', type: 'number', step: '0.1' }
    ],
    interpret: (v, ctx) => {
      const t4 = parseFloat(ctx.extras.t4 ?? '');
      const lower = ctx.context === 'grav' ? 0.1 : 0.4;
      const upper = ctx.context === 'grav' ? 2.5 : 4.0;
      let t4Text = '';
      if (t4) {
        if (t4 < 0.8) t4Text = ` T4 livre ${t4} — <strong>baixo</strong>.`;
        else if (t4 > 1.8) t4Text = ` T4 livre ${t4} — <strong>alto</strong>.`;
        else t4Text = ` T4 livre ${t4} — normal.`;
      }
      if (v < 0.01) return {
        level: 'severe', verdict: 'TSH suprimido — hipertiroidismo provável', detail: `TSH ${v}.${t4Text}`,
        think: 'Doença de Graves, bócio multinodular tóxico, adenoma tóxico, tiroidite (fase precoce), iatrogénico (amiodarona, sobre-tratamento).',
        doNow: '<ul><li>T4 livre, T3 livre, Ac anti-TPO, anti-TRAb</li><li>Cintigrafia ou eco tiroideu</li><li>β-bloqueante para sintomas (propranolol)</li><li>Referenciar Endocrinologia</li></ul>',
        danger: 'TSH suprimido + taquicardia + IC ou FA + agitação → suspeita de <strong>crise tireotóxica</strong>, urgência.'
      };
      if (v < lower) return {
        level: 'moderate', verdict: 'TSH baixo', detail: `TSH ${v} — abaixo do limite (${lower}).${t4Text}`,
        think: t4 && t4 > 1.8 ? 'Hipertiroidismo manifesto.' : (t4 ? 'Hipertiroidismo subclínico.' : 'Pedir T4 livre para distinguir manifesto vs subclínico.'),
        doNow: '<ul><li>Pedir T4 livre se ainda não pedido</li><li>Ac anti-TPO, TRAb se hipertiroidismo confirmado</li><li>Eco tiroideu</li><li>Subclínico: tratar se TSH &lt;0,1 + cardiopatia/osteoporose/&gt;65a</li></ul>'
      };
      if (v <= upper) return { level: 'normal', verdict: 'TSH normal', detail: `TSH ${v}.${t4Text}` };
      if (v < 10) return {
        level: 'mild', verdict: 'TSH ligeiramente elevado', detail: `TSH ${v}.${t4Text}`,
        think: t4 && t4 < 0.8 ? 'Hipotiroidismo manifesto.' : 'Provável <strong>hipotiroidismo subclínico</strong> (Hashimoto inicial, recuperação de doença aguda, fármacos como lítio/amiodarona).',
        doNow: '<ul><li>Repetir em 2-3 meses (confirmar persistência)</li><li>T4 livre, Ac anti-TPO</li><li>Subclínico: tratar se TSH &gt;10, sintomas, gravidez planeada, anti-TPO positivos</li></ul>'
      };
      if (v < 30) return {
        level: 'moderate', verdict: 'TSH substancialmente elevado', detail: `TSH ${v} — provável hipotiroidismo manifesto.${t4Text}`,
        doNow: '<ul><li>T4 livre + Ac anti-TPO (confirmar Hashimoto)</li><li>Iniciar levotiroxina (1,6 μg/kg/dia em jovens saudáveis; 25-50 μg em idosos/cardiopatas)</li><li>Reavaliar em 6-8 semanas</li></ul>'
      };
      return {
        level: 'severe', verdict: 'TSH muito elevado — hipotiroidismo grave', detail: `TSH ${v}.${t4Text}`,
        doNow: '<ul><li>Iniciar levotiroxina (atenção em idosos/cardiopatas — começar com 25 μg)</li><li>T4 livre, cortisol (excluir insuficiência supra-renal antes de levo a doses altas)</li><li>Avaliar sintomas — coma mixedematoso é urgência</li></ul>',
        danger: 'TSH muito alto + alteração consciência + hipotermia + bradicardia → <strong>coma mixedematoso</strong>, urgência.'
      };
    }
  },

  {
    id: 'hba1c',
    name: 'HbA1c',
    keywords: 'hba1c a1c hemoglobina glicada diabetes',
    unit: '%',
    ref: () => '< 5,7% (normal) · 5,7–6,4% (pré-DM) · ≥ 6,5% (DM)',
    interpret: (v, ctx) => {
      const glicMedia = Math.round(28.7 * v - 46.7);
      if (v < 4) return {
        level: 'mild', verdict: 'HbA1c falsamente baixa', detail: `${v}% — pouco fiável.`,
        think: 'Causas de falsa redução: anemia hemolítica, hemorragia recente, transfusões, gravidez (turnover eritrocitário alto), hemoglobinopatias.',
        doNow: 'Confirmar glicemias capilares ou monitorização contínua. Avaliar hemograma e retic.'
      };
      if (v < 5.7) return { level: 'normal', verdict: 'HbA1c normal', detail: `${v}% — glicemia média estimada ${glicMedia} mg/dL.` };
      if (v < 6.5) return {
        level: 'mild', verdict: 'Pré-diabetes', detail: `${v}% — glicemia média estimada ${glicMedia} mg/dL.`,
        think: 'Risco aumentado de progressão para DM. Intervenção em estilo de vida pode reverter 40-60% dos casos.',
        doNow: '<ul><li>Intervenção intensiva no estilo de vida (dieta, exercício 150 min/sem, perda de peso 5-7%)</li><li>Considerar metformina se IMC &gt;35, &lt;60a, ou DG prévia</li><li>Repetir HbA1c em 6-12 meses</li><li>Calcular SCORE2 (risco CV aumentado)</li></ul>'
      };
      if (v < 7) return {
        level: 'moderate', verdict: 'Diabetes mellitus', detail: `${v}% — glicemia média estimada ${glicMedia} mg/dL.`,
        think: ctx.context === 'dm' ? 'Diabetes razoavelmente controlada para a maioria dos doentes. Alvos individualizados.' : 'Confirmar com 2.ª medição (ou glicemia em jejum) se 1.º diagnóstico.',
        doNow: ctx.context === 'dm' ? 'Manter terapêutica atual. Reavaliar em 6 meses.' : '<ul><li>Confirmar diagnóstico (2.ª medição)</li><li>Iniciar metformina (se sem contraindicação)</li><li>Avaliar comorbilidades (HTA, dislipidemia, microalbuminúria, retinopatia)</li><li>Educação terapêutica, dieta, exercício</li></ul>'
      };
      if (v < 9) return {
        level: 'moderate', verdict: 'DM com controlo subótimo', detail: `${v}% — glicemia média estimada ${glicMedia} mg/dL.`,
        doNow: '<ul><li>Intensificar terapêutica (adicionar 2.º fármaco — iSGLT2 ou GLP-1 RA preferidos se DCV/IC/DRC)</li><li>Reforçar educação alimentar</li><li>Investigar má adesão</li><li>Reavaliar em 3 meses</li></ul>'
      };
      if (v < 11) return {
        level: 'severe', verdict: 'DM mal controlada', detail: `${v}% — glicemia média estimada ${glicMedia} mg/dL.`,
        doNow: '<ul><li>Escalada terapêutica — considerar tripla terapêutica ou insulinização</li><li>Excluir descompensação (sintomas: poliúria, polidipsia, perda de peso, cetonas)</li><li>Reavaliação frequente (4-8 semanas)</li><li>Referenciar Endocrinologia se necessário</li></ul>'
      };
      return {
        level: 'critical', verdict: 'DM muito mal controlada / descompensada', detail: `${v}% — glicemia média estimada ${glicMedia} mg/dL.`,
        doNow: '<ul><li>Avaliar sintomas de descompensação (CAD, EHH)</li><li>Insulinização provável</li><li>Hospital se sintomas, cetonas positivas, ou desidratação</li><li>Referenciar Endocrinologia urgente</li></ul>',
        danger: 'HbA1c &gt;11% + sintomas (poliúria intensa, vómitos, dor abdominal, hálito cetónico) → suspeitar <strong>CAD</strong>.'
      };
    }
  },

  // ============== INFLAMAÇÃO ==============
  {
    id: 'pcr',
    name: 'PCR',
    keywords: 'pcr crp proteina c reativa inflamacao infecao',
    unit: 'mg/L',
    ref: () => '< 5 mg/L',
    interpret: (v) => {
      if (v <= 5) return { level: 'normal', verdict: 'PCR normal', detail: `${v} mg/L.` };
      if (v < 20) return {
        level: 'mild', verdict: 'PCR ligeiramente elevada', detail: `${v} mg/L.`,
        think: 'Causas frequentes: <strong>infeção viral</strong>, inflamação ligeira, obesidade, tabagismo, doença autoimune leve.',
        doNow: 'Avaliar contexto clínico. Repetir em 1-2 semanas se assintomático. Não justifica antibiótico isoladamente.'
      };
      if (v < 50) return {
        level: 'moderate', verdict: 'PCR elevada', detail: `${v} mg/L.`,
        think: 'Infeção bacteriana possível (mas não certo), inflamação significativa (vasculite, AR, doença IBD), neoplasia.',
        doNow: '<ul><li>Investigar foco infecioso (urina, RX tórax, etc.)</li><li>Hemograma, VS</li><li>Considerar AB se clínica compatível com infeção</li></ul>'
      };
      if (v < 100) return {
        level: 'severe', verdict: 'PCR substancialmente elevada', detail: `${v} mg/L — sugere infeção bacteriana ou inflamação intensa.`,
        doNow: '<ul><li>Procurar foco infecioso ativo</li><li>Hemoculturas se febre</li><li>Considerar AB empírico</li><li>Avaliar gravidade clínica (qSOFA, SOFA)</li></ul>'
      };
      return {
        level: 'critical', verdict: 'PCR muito elevada', detail: `${v} mg/L — alta probabilidade de infeção bacteriana grave.`,
        think: 'Sépsis, abcesso, endocardite, pneumonia grave, doença autoimune em surto, neoplasia avançada.',
        doNow: '<ul><li><strong>Avaliação urgente</strong></li><li>Hemoculturas + culturas direcionadas</li><li>Imagem (RX tórax, eco, TC conforme suspeita)</li><li>Antibioterapia empírica precoce se sépsis</li><li>Considerar hospital</li></ul>',
        danger: 'PCR &gt;100 + febre + sinais sistémicos → suspeita de <strong>sépsis</strong>, qSOFA imediato.'
      };
    }
  },

  // ============== VITAMINAS / FERRO ==============
  {
    id: 'ferritina',
    name: 'Ferritina',
    keywords: 'ferritina ferro reservas',
    unit: 'ng/mL',
    ref: ctx => ctx.sex === 'F' ? '15 – 200 ng/mL (mulher pré-menop.)' : '30 – 400 ng/mL (homem)',
    interpret: (v, ctx) => {
      if (v < 15) return {
        level: 'severe', verdict: 'Ferropenia confirmada', detail: `${v} ng/mL — diagnóstico bastante específico.`,
        think: '<strong>Investigar fonte:</strong> mulher menstruada (perdas), homem ou pós-menopausa (sempre suspeitar GI), dieta vegetariana, má absorção (doença celíaca).',
        doNow: '<ul><li>Hemograma com VGM, retic</li><li><strong>Homem ou pós-menopausa</strong>: investigar GI (sangue oculto, EDA + colonoscopia)</li><li>Anti-transglutaminase (doença celíaca)</li><li>Suplementação: ferro oral 100-200 mg/dia em jejum, com vit C</li><li>Reavaliar Hb em 4-8 semanas (subida esperada de 2 g/dL)</li></ul>',
        danger: 'Ferropenia em homem ou pós-menopausa → <strong>sempre investigar hemorragia digestiva</strong>. Risco de cancro colorrectal não negligenciável.'
      };
      if (v < 30) return {
        level: 'moderate', verdict: 'Ferropenia provável', detail: `${v} ng/mL — sugestivo (mesmo sem anemia).`,
        doNow: '<ul><li>Confirmar com TSAT (&lt;20% reforça)</li><li>Investigar fonte como acima</li><li>Suplementação oral</li></ul>'
      };
      const upper = ctx.sex === 'F' ? 200 : 400;
      if (v <= upper) return { level: 'normal', verdict: 'Ferritina normal', detail: `${v} ng/mL.` };
      if (v < 1000) return {
        level: 'mild', verdict: 'Ferritina elevada', detail: `${v} ng/mL.`,
        think: '<strong>Ferritina é reagente de fase aguda</strong> — sobe em inflamação. Causas: inflamação/infeção, doença hepática, álcool, sd metabólica, neoplasia.',
        doNow: '<ul><li>Pedir PCR (se alta, explica subida)</li><li>Função hepática</li><li>Avaliar consumo alcoólico, IMC</li><li>Repetir após resolução de inflamação aguda</li></ul>'
      };
      if (v < 10000) return {
        level: 'severe', verdict: 'Ferritina muito elevada', detail: `${v} ng/mL.`,
        think: 'Suspeitar de <strong>hemocromatose</strong> (sobretudo se TSAT &gt;45%) ou sobrecarga férrica secundária.',
        doNow: '<ul><li>TSAT (se &gt;45% reforça hemocromatose)</li><li>HFE genético se TSAT alta</li><li>Função hepática, glicemia (DM associada)</li><li>Referenciar Hematologia/Hepatologia</li></ul>'
      };
      return {
        level: 'critical', verdict: 'Ferritina extremamente elevada', detail: `${v} ng/mL.`,
        think: '&gt;10000 → considerar <strong>síndrome hemofagocítica</strong> (HLH), doença de Still, sépsis grave, neoplasia hematológica.',
        doNow: '<ul><li>Avaliação hospitalar urgente</li><li>Hemograma com esfregaço, triglicéridos, fibrinogénio, função hepática</li><li>Referenciar urgente</li></ul>'
      };
    }
  },

  {
    id: 'b12',
    name: 'Vitamina B12',
    keywords: 'b12 cobalamina anemia macrocitose',
    unit: 'pg/mL',
    ref: () => '200 – 900 pg/mL',
    interpret: (v) => {
      if (v < 150) return {
        level: 'severe', verdict: 'Défice grave de B12', detail: `${v} pg/mL.`,
        think: 'Causas: anemia perniciosa (Ac anti-FI), gastrectomia, doença ileal (Crohn), metformina prolongada, IBP, dieta vegana.',
        doNow: '<ul><li>Iniciar tratamento <strong>imediatamente</strong> (mesmo antes de investigar etiologia)</li><li>B12 IM 1000 μg dias 1, 3, 5, 7 da 1.ª semana, depois semanal × 4, depois mensal</li><li>Alternativa: oral 1000 μg/dia (eficaz mesmo em anemia perniciosa)</li><li>Pedir: Ac anti-FI, anti-células parietais, gastroscopia se PA suspeita</li><li>Hemograma com VGM, retic, esfregaço</li></ul>',
        danger: 'Défice B12 + sintomas neurológicos (parestesias, ataxia, défice cognitivo) → tratar <strong>imediatamente</strong>, atrasos = sequelas irreversíveis. <strong>NÃO dar só folato</strong> — corrige anemia mas piora neuropatia.'
      };
      if (v < 200) return {
        level: 'moderate', verdict: 'Défice de B12', detail: `${v} pg/mL.`,
        doNow: '<ul><li>Investigar causa (ver acima)</li><li>Tratar com B12 IM ou oral 1000 μg/dia</li><li>Reavaliar em 1-3 meses</li></ul>'
      };
      if (v < 300) return {
        level: 'mild', verdict: 'B12 limítrofe', detail: `${v} pg/mL — zona indeterminada.`,
        think: 'Pode haver défice funcional. Pedir <strong>homocisteína</strong> e/ou <strong>ácido metilmalónico</strong> — se elevados, défice confirmado.',
        doNow: 'Homocisteína e ácido metilmalónico. Se positivos ou clínica sugestiva, tratar como défice.'
      };
      if (v <= 900) return { level: 'normal', verdict: 'B12 normal', detail: `${v} pg/mL.` };
      return {
        level: 'mild', verdict: 'B12 elevada', detail: `${v} pg/mL.`,
        think: 'Geralmente irrelevante (suplementação, dieta). Em alguns contextos sugere neoplasia mieloproliferativa, hepatopatia, IR.',
        doNow: 'Avaliar suplementação. Se sem explicação e persistente, avaliar fígado, função renal, hemograma.'
      };
    }
  },

  {
    id: 'vitd',
    name: 'Vitamina D (25-OH)',
    keywords: 'vitamina d 25oh calcidiol',
    unit: 'ng/mL',
    ref: () => '> 30 ng/mL (suficiência)',
    interpret: (v) => {
      if (v < 10) return {
        level: 'severe', verdict: 'Défice grave de vitamina D', detail: `${v} ng/mL.`,
        think: 'Risco de osteomalácia, hipocalcémia, hiperparatiroidismo secundário.',
        doNow: '<ul><li>Iniciar <strong>colecalciferol 50.000 UI/semana × 8 semanas</strong> (alternativa: 7000 UI/dia)</li><li>Depois manutenção 800-2000 UI/dia</li><li>Avaliar cálcio, fosfato, PTH</li><li>Reavaliar em 3 meses</li></ul>'
      };
      if (v < 20) return {
        level: 'moderate', verdict: 'Défice de vitamina D', detail: `${v} ng/mL.`,
        doNow: '<ul><li>Colecalciferol 50.000 UI/semana × 8 semanas</li><li>Manutenção 800-2000 UI/dia</li><li>Reavaliar em 3 meses</li></ul>'
      };
      if (v < 30) return {
        level: 'mild', verdict: 'Insuficiência de vitamina D', detail: `${v} ng/mL.`,
        doNow: 'Suplementar 800-2000 UI/dia. Aconselhar exposição solar (15-30 min/dia braços e pernas) e dieta (peixe gordo, ovos).'
      };
      if (v <= 60) return { level: 'normal', verdict: 'Vitamina D suficiente', detail: `${v} ng/mL.` };
      if (v <= 100) return {
        level: 'mild', verdict: 'Vitamina D elevada (mas segura)', detail: `${v} ng/mL.`,
        doNow: 'Reduzir ou suspender suplementação. Reavaliar em 3 meses.'
      };
      return {
        level: 'severe', verdict: 'Toxicidade por vitamina D', detail: `${v} ng/mL — risco de hipercalcémia.`,
        doNow: '<ul><li>Suspender suplementação imediatamente</li><li>Pedir cálcio sérico e urinário</li><li>Hidratação</li><li>Se hipercalcémia → tratamento específico</li></ul>',
        danger: 'Hipervitaminose D pode causar hipercalcémia, nefrocalcinose, IRA.'
      };
    }
  },

  // ============== CARDIOVASCULAR ==============
  {
    id: 'ldl',
    name: 'LDL colesterol',
    keywords: 'ldl colesterol dislipidemia',
    unit: 'mg/dL',
    ref: () => 'Alvo depende risco CV',
    extras: [
      { id: 'risk', label: 'Categoria de risco CV', type: 'select', options: [
        ['low', 'Baixo / moderado'],
        ['high', 'Alto (DM, DRC, SCORE2 ≥10%)'],
        ['vhigh', 'Muito alto (DCV estabelecida)'],
        ['extreme', 'Extremo (≥2 eventos CV)']
      ]}
    ],
    interpret: (v, ctx) => {
      const risk = ctx.extras.risk || 'low';
      const target = ({ low: 116, high: 70, vhigh: 55, extreme: 40 } as Record<string, number>)[risk] ?? 116;
      const riskLabel = ({ low: 'baixo/moderado', high: 'alto', vhigh: 'muito alto', extreme: 'extremo' } as Record<string, string>)[risk] ?? '';
      if (v <= target) return { level: 'normal', verdict: 'LDL no alvo', detail: `${v} mg/dL — alvo &lt; ${target} para risco ${riskLabel}.` };
      if (v <= target * 1.3) return {
        level: 'mild', verdict: 'LDL ligeiramente acima do alvo', detail: `${v} mg/dL — alvo &lt; ${target}.`,
        doNow: '<ul><li>Reforçar estilo de vida (dieta mediterrânica, exercício)</li><li>Se já em estatina, verificar adesão</li><li>Considerar intensificar potência</li><li>Reavaliar em 3 meses</li></ul>'
      };
      if (v <= target * 2) return {
        level: 'moderate', verdict: 'LDL substancialmente acima do alvo', detail: `${v} mg/dL — alvo &lt; ${target}.`,
        doNow: '<ul><li>Iniciar/intensificar estatina (rosuvastatina 20-40 mg ou atorvastatina 40-80 mg)</li><li>Estilo de vida agressivo</li><li>Reavaliar 6-8 semanas</li><li>Se não atinge alvo → adicionar ezetimiba 10 mg</li></ul>'
      };
      if (v < 190) return {
        level: 'severe', verdict: 'LDL muito elevado', detail: `${v} mg/dL.`,
        doNow: '<ul><li>Estatina de alta potência imediata</li><li>+ ezetimiba</li><li>Avaliar candidatura a iPCSK9 se DCV</li><li>Investigar causas secundárias (hipotiroidismo, sd nefrótico, fármacos)</li></ul>'
      };
      return {
        level: 'severe', verdict: 'LDL extremo — suspeita de hipercolesterolemia familiar', detail: `${v} mg/dL.`,
        think: 'LDL &gt;190 sem causa secundária em adulto → <strong>HF</strong> (prevalência 1:250). Procurar história familiar de DCV precoce, xantomas, arco corneano em &lt;45a.',
        doNow: '<ul><li>Estatina de alta potência + ezetimiba</li><li>Aplicar critérios de Dutch Lipid Clinic Network</li><li>Referenciar para genética / consulta de dislipidemias</li><li>Rastreio em cascata familiar</li></ul>',
        danger: 'HF não tratada → DCV precoce (eventos antes dos 50-55 anos).'
      };
    }
  },

  {
    id: 'tropo',
    name: 'Troponina (hs-cTnT)',
    keywords: 'troponina tnt sca enfarte',
    unit: 'ng/L',
    ref: () => '< 14 ng/L (hs-cTnT)',
    interpret: (v) => {
      if (v < 14) return { level: 'normal', verdict: 'Troponina normal', detail: `${v} ng/L.` };
      if (v < 52) return {
        level: 'moderate', verdict: 'Troponina ligeiramente elevada', detail: `${v} ng/L.`,
        think: 'Lesão miocárdica presente. Causas <strong>isquémicas</strong> (EAM tipo 1 ou 2) e <strong>não isquémicas</strong> (IC, miocardite, TEP, sépsis, IRC, AVC, taquiarritmias). Importa a <strong>cinética</strong> — repetir em 1-3h.',
        doNow: '<ul><li>ECG 12 derivações</li><li>Avaliar dor torácica e contexto</li><li>Repetir troponina (cinética)</li><li>Calcular HEART score</li></ul>'
      };
      if (v < 100) return {
        level: 'severe', verdict: 'Troponina substancialmente elevada', detail: `${v} ng/L.`,
        doNow: '<ul><li><strong>Hospital</strong> se dor torácica ou contexto clínico</li><li>ECG, repetir troponina</li><li>Ativar via verde SCA se ECG/clínica compatíveis</li></ul>',
        danger: 'Troponina + dor torácica típica + alterações ECG → <strong>SCA</strong>, ativar via verde.'
      };
      return {
        level: 'critical', verdict: 'Troponina muito elevada', detail: `${v} ng/L — lesão miocárdica significativa.`,
        doNow: '<ul><li><strong>Urgência</strong> — ativar via verde SCA</li><li>ECG imediato (STEMI?), antiagregação dupla, anticoagulação</li><li>Hemodinâmica para ICP</li></ul>',
        danger: 'STEMI → ICP primária em &lt;90 min ou fibrinólise se sem hemodinâmica.'
      };
    }
  },

  {
    id: 'glic',
    name: 'Glicemia (jejum ou ocasional)',
    keywords: 'glicemia glicose jejum diabetes',
    unit: 'mg/dL',
    ref: () => 'Jejum &lt; 100 · pós-prandial &lt; 140',
    extras: [
      { id: 'tipo', label: 'Tipo', type: 'select', options: [['jejum', 'Jejum'], ['ocasional', 'Ocasional (sem jejum)']] }
    ],
    interpret: (v, ctx) => {
      const tipo = ctx.extras.tipo || 'jejum';
      if (v < 40) return {
        level: 'critical', verdict: 'Hipoglicemia grave', detail: `${v} mg/dL.`,
        doNow: '<ul><li><strong>Tratamento imediato</strong> — glicose oral 15-20 g se consciente, glucagon IM ou glicose IV se inconsciente</li><li>Reavaliar em 15 min</li><li>Investigar causa: fármacos (insulina, sulfonilureia), álcool, insuficiência supra-renal</li></ul>',
        danger: '&lt;40 com alteração consciência → emergência.'
      };
      if (v < 55) return {
        level: 'severe', verdict: 'Hipoglicemia', detail: `${v} mg/dL.`,
        doNow: 'Tratar com 15-20 g glicose oral. Reavaliar em 15 min. Tríade de Whipple: sintomas + glic baixa + reversão com glicose.'
      };
      if (v < 70) return {
        level: 'mild', verdict: 'Hipoglicemia ligeira', detail: `${v} mg/dL.`,
        doNow: 'Tratar se sintomático. Avaliar fármacos em diabéticos.'
      };
      if (tipo === 'jejum') {
        if (v < 100) return { level: 'normal', verdict: 'Glicemia em jejum normal', detail: `${v} mg/dL.` };
        if (v < 126) return {
          level: 'mild', verdict: 'Anomalia da glicemia em jejum (pré-DM)', detail: `${v} mg/dL.`,
          doNow: '<ul><li>Confirmar com 2.ª glicemia ou HbA1c</li><li>PTGO se aplicável</li><li>Estilo de vida intensivo</li><li>Calcular FINDRISC, considerar metformina se alto risco</li></ul>'
        };
        return {
          level: 'severe', verdict: 'Diabetes (glicemia em jejum elevada)', detail: `${v} mg/dL — ≥126 em 2 ocasiões = DM.`,
          doNow: '<ul><li>Confirmar com 2.ª medição se 1.ª deteção</li><li>HbA1c</li><li>Iniciar metformina (sem contraindicação)</li><li>Avaliação completa do diabético</li></ul>'
        };
      } else {
        if (v < 140) return { level: 'normal', verdict: 'Glicemia ocasional normal', detail: `${v} mg/dL.` };
        if (v < 200) return {
          level: 'mild', verdict: 'Glicemia ocasional elevada', detail: `${v} mg/dL — sugestiva mas não diagnóstica.`,
          doNow: 'Pedir glicemia em jejum + HbA1c para confirmar.'
        };
        if (v < 300) return {
          level: 'severe', verdict: 'Glicemia ocasional sugestiva de DM', detail: `${v} mg/dL — ≥200 + sintomas = DM.`,
          doNow: '<ul><li>HbA1c, glicemia em jejum, cetonas</li><li>Iniciar tratamento</li><li>Avaliar sintomas</li></ul>'
        };
        return {
          level: 'critical', verdict: 'Hiperglicemia grave', detail: `${v} mg/dL.`,
          think: 'Possível CAD (DM1, sépsis) ou EHH (idoso, DM2).',
          doNow: '<ul><li><strong>Urgência</strong> — cetonas urinárias, ionograma, gasometria</li><li>Hidratação IV, insulina</li><li>Pesquisar precipitante (infeção, EAM, omissão terapêutica)</li></ul>',
          danger: 'Glicemia &gt;300 + cetonas + dor abdominal/vómitos → <strong>CAD</strong>; glic &gt;600 + desidratação + alteração consciência → <strong>EHH</strong>.'
        };
      }
    }
  }

];
