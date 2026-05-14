import type { SpecialityId } from './icons';

export type Severidade = 'critica' | 'urgente' | 'estavel';

export interface PatologiaMeta {
  especialidade: SpecialityId;
  severidade: Severidade;
  summary: string;
}

export const PATOLOGIA_META: Record<string, PatologiaMeta> = {
  amigdalite:          { especialidade: 'infecto', severidade: 'urgente', summary: 'Diagnóstico clínico, score Centor/McIsaac, antibioterapia se estreptocócica.' },
  anafilaxia:          { especialidade: 'alergo',  severidade: 'critica', summary: 'Epinefrina IM imediata 0,3–0,5 mg. Reavaliar a cada 5–15 min.' },
  anemia:              { especialidade: 'gi',      severidade: 'estavel', summary: 'Classificação por VCM, abordagem etiológica, transfusão se sintomática.' },
  asma:                { especialidade: 'pneumo',  severidade: 'urgente', summary: 'Salbutamol nebulizado + corticoide sistémico precoce. Brometo de ipratrópio se grave.' },
  'asma-diag':         { especialidade: 'pneumo',  severidade: 'estavel', summary: 'Confirmação por espirometria + reversibilidade. Step-up GINA 2024.' },
  avc:                 { especialidade: 'neuro',   severidade: 'critica', summary: '"Time is brain". TC sem contraste → trombólise IV se <4,5h; trombectomia até 24h.' },
  cefaleia:            { especialidade: 'neuro',   severidade: 'urgente', summary: 'Excluir red flags (SNOOP10), tratar primária vs investigar secundária.' },
  cetoacidose:         { especialidade: 'endo',    severidade: 'critica', summary: 'Fluidos → potássio → insulina. Corrigir desidratação antes de baixar glicemia.' },
  convulsao:           { especialidade: 'neuro',   severidade: 'critica', summary: 'Diazepam ou lorazepam IV. Fenitoína/valproato se persistente.' },
  'crise-hiper':       { especialidade: 'cardio',  severidade: 'urgente', summary: 'Diferenciar emergência (lesão de órgão) vs urgência. Descer PA gradualmente.' },
  delirium:            { especialidade: 'neuro',   severidade: 'urgente', summary: 'Identificar e tratar causa. Medidas não farmacológicas primeiro.' },
  dpoc:                { especialidade: 'pneumo',  severidade: 'urgente', summary: 'Broncodilatadores + corticoide sistémico. VMNI se acidose respiratória.' },
  'edema-pulmonar':    { especialidade: 'cardio',  severidade: 'critica', summary: 'Posição sentado + O₂ + furosemida + NTG. VMNI precoce.' },
  'espasmo-muscular':  { especialidade: 'derma',   severidade: 'estavel', summary: 'Repouso relativo + relaxante muscular + analgesia.' },
  'fibrilhao-auricular': { especialidade: 'cardio', severidade: 'urgente', summary: 'Anticoagulação se CHA₂DS₂-VASc ≥2. Cardioversão se instável.' },
  'hemorragia-digestiva': { especialidade: 'gi',    severidade: 'critica', summary: 'Estabilizar → IBP IV → endoscopia precoce. Octreotido se varicial.' },
  'herpes-virus':      { especialidade: 'infecto', severidade: 'estavel', summary: 'Aciclovir PO em mucocutâneo, IV em encefalite/imunodeprimido.' },
  hipoglicemia:        { especialidade: 'endo',    severidade: 'critica', summary: '15g HC se consciente. Glicose 30% IV ou glucagon IM se inconsciente.' },
  'infecoes-vaginais': { especialidade: 'infecto', severidade: 'estavel', summary: 'Diagnóstico por exsudato + pH. Tratamento específico por agente.' },
  ist:                 { especialidade: 'infecto', severidade: 'urgente', summary: 'Tratamento empírico + parceiros + serologias completas.' },
  itu:                 { especialidade: 'infecto', severidade: 'urgente', summary: 'Fosfomicina ou nitrofurantoína em cistite. Ceftriaxona em pielonefrite.' },
  osteoporose:         { especialidade: 'derma',   severidade: 'estavel', summary: 'Suplementação Ca+VitD + bifosfonatos se T-score ≤−2,5.' },
  pancreatite:         { especialidade: 'gi',      severidade: 'urgente', summary: 'Fluidoterapia agressiva primeiras 24h. Identificar causa (litiásica vs alcoólica).' },
  pneumonia:           { especialidade: 'pneumo',  severidade: 'urgente', summary: 'Estratificar gravidade (CURB-65). Amoxicilina ± macrólido em PAC ligeira.' },
  psoriase:            { especialidade: 'derma',   severidade: 'estavel', summary: 'Tópicos em ligeira (corticoide + análogo VitD). Biológicos em moderada-grave.' },
  'rinite-cronica':    { especialidade: 'alergo',  severidade: 'estavel', summary: 'Anti-H1 + corticoide intranasal. Imunoterapia em alérgica selecionada.' },
  sca:                 { especialidade: 'cardio',  severidade: 'critica', summary: 'ECG <10 min. EAM c/ supra → ICP primária <120 min ou fibrinólise.' },
  sepsis:              { especialidade: 'infecto', severidade: 'critica', summary: 'Bundle 1h: lactato → hemoculturas → antibiótico → fluidos → vasopressor.' },
  sincope:             { especialidade: 'cardio',  severidade: 'urgente', summary: 'ECG + ortostatismo. Risco cardiogénico → telemetria + ecocardio.' },
  tep:                 { especialidade: 'pneumo',  severidade: 'critica', summary: 'Wells → D-dímeros vs AngioTC. HBPM imediato; trombólise se maciço.' },
  vih:                 { especialidade: 'infecto', severidade: 'estavel', summary: 'Início precoce TARV. Profilaxia oportunistas se CD4 baixa.' },
};
