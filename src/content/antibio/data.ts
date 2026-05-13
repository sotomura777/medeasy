export type AntibioView =
  | 'home' | 'imagine' | 'mews' | 'alarme' | 'betalact'
  | 'aware' | 'principios' | 'sinave' | 'calc'
  | 'gravida' | 'diferida' | 'escalonamento';

export interface ToolCard {
  id: Exclude<AntibioView, 'home'>;
  emoji: string;
  name: string;
  desc: string;
}

export const TOOLS: ToolCard[] = [
  { id: 'imagine', emoji: '🧠', name: 'Mnemónica IMAGINE', desc: 'Checklist de 7 pontos antes de prescrever qualquer antibiótico.' },
  { id: 'mews', emoji: '📊', name: 'Score MEWS', desc: 'Deteção precoce de gravidade clínica com calculadora interativa.' },
  { id: 'alarme', emoji: '🚨', name: 'Sinais de Alarme', desc: 'Critérios de referenciação urgente em infeções graves.' },
  { id: 'betalact', emoji: '⚠️', name: 'Alergia a Beta-Lactâmicos', desc: 'Tipo I vs não tipo I, falsa alergia e reatividade cruzada.' },
  { id: 'aware', emoji: '🌍', name: 'Classificação AWaRe', desc: 'Access · Watch · Reserve — OMS 2017.' },
  { id: 'principios', emoji: '📋', name: 'Princípios Gerais', desc: 'Regras fundamentais de prescrição racional de antibióticos.' },
  { id: 'sinave', emoji: '📢', name: 'SINAVE', desc: 'Infeções de notificação obrigatória incluídas neste guia.' },
  { id: 'calc', emoji: '🧒', name: 'Calculadora Pediátrica', desc: 'Doses por peso com volume de suspensão automático.' },
  { id: 'gravida', emoji: '🤰', name: 'Grávida e Aleitamento', desc: 'Perfil de segurança dos antibióticos em ambulatório.' },
  { id: 'diferida', emoji: '⏳', name: 'Prescrição Diferida', desc: 'Quando usar, como explicar ao doente e critérios de início.' },
  { id: 'escalonamento', emoji: '📈', name: 'Escalonamento de ATB', desc: 'Quando e como escalar, desescalar e mudar de antibiótico.' },
];

export const VIEW_LABELS: Record<Exclude<AntibioView, 'home'>, string> = {
  imagine: 'Mnemónica IMAGINE', mews: 'Score MEWS', alarme: 'Sinais de Alarme',
  betalact: 'Alergia a Beta-Lactâmicos', aware: 'Classificação AWaRe',
  principios: 'Princípios Gerais', sinave: 'SINAVE', calc: 'Calculadora Pediátrica',
  gravida: 'Grávida e Aleitamento', diferida: 'Prescrição Diferida',
  escalonamento: 'Escalonamento de ATB',
};

// ── Cross-reactivity ──

export const DRUG_LIST: Record<string, string> = {
  amox:'Amoxicilina*', amp:'Ampicilina', clox:'Cloxacilina/Fluclox.**',
  pen:'Penicilina', piper:'Piperacilina*',
  cefadrox:'Cefadroxil**', cefazol:'Cefazolina', cefalex:'Cefalexina**',
  cefox:'Cefoxitina', cefepro:'Cefeprozil**',
  cefurox:'Cefuroxima', cefixin:'Cefixima', cefotax:'Cefotaxima',
  ceftaz:'Ceftazidima', ceftriax:'Ceftriaxona',
  cefepim:'Cefepima', erta:'Ertapenem', imip:'Imipenem', mero:'Meropenem',
};

export type RiskLevel = 'ok' | 'x1' | 'x2' | 'x3' | 'x4' | 'x5' | 'same';

export const CROSS_MATRIX: Record<string, Record<string, RiskLevel>> = {
  amox:    {amox:'same',amp:'x2',clox:'x3',pen:'x4',piper:'x3',cefadrox:'x1',cefazol:'ok',cefalex:'x1',cefox:'ok',cefepro:'x2',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  amp:     {amox:'x2',amp:'same',clox:'x3',pen:'x4',piper:'x3',cefadrox:'x2',cefazol:'ok',cefalex:'x2',cefox:'ok',cefepro:'x2',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  clox:    {amox:'x3',amp:'x3',clox:'same',pen:'x3',piper:'x3',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  pen:     {amox:'x4',amp:'x4',clox:'x3',pen:'same',piper:'x3',cefadrox:'ok',cefazol:'ok',cefalex:'x3',cefox:'ok',cefepro:'ok',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  piper:   {amox:'x3',amp:'x3',clox:'x3',pen:'x3',piper:'same',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'x3',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'x3',ceftriax:'ok',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  cefadrox:{amox:'x1',amp:'x2',clox:'ok',pen:'ok',piper:'ok',cefadrox:'same',cefazol:'ok',cefalex:'x1',cefox:'ok',cefepro:'ok',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  cefazol: {amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'ok',cefadrox:'ok',cefazol:'same',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  cefalex: {amox:'x1',amp:'x2',clox:'ok',pen:'x3',piper:'ok',cefadrox:'x1',cefazol:'ok',cefalex:'same',cefox:'ok',cefepro:'x2',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  cefox:   {amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'ok',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'same',cefepro:'ok',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  cefepro: {amox:'x2',amp:'x2',clox:'ok',pen:'ok',piper:'x3',cefadrox:'ok',cefazol:'ok',cefalex:'x2',cefox:'ok',cefepro:'same',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  cefurox: {amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'ok',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'same',cefixin:'x3',cefotax:'x1',ceftaz:'x1',ceftriax:'x1',cefepim:'x2',erta:'ok',imip:'ok',mero:'ok'},
  cefixin: {amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'ok',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'x3',cefixin:'same',cefotax:'x2',ceftaz:'x3',ceftriax:'x3',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  cefotax: {amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'ok',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'x1',cefixin:'x2',cefotax:'same',ceftaz:'x2',ceftriax:'x1',cefepim:'ok',erta:'ok',imip:'ok',mero:'ok'},
  ceftaz:  {amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'x3',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'x1',cefixin:'x3',cefotax:'x2',ceftaz:'same',ceftriax:'x3',cefepim:'x3',erta:'ok',imip:'ok',mero:'ok'},
  ceftriax:{amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'ok',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'x1',cefixin:'x3',cefotax:'x1',ceftaz:'x3',ceftriax:'same',cefepim:'x1',erta:'ok',imip:'ok',mero:'ok'},
  cefepim: {amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'ok',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'x2',cefixin:'ok',cefotax:'ok',ceftaz:'x3',ceftriax:'x1',cefepim:'same',erta:'ok',imip:'ok',mero:'ok'},
  erta:    {amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'ok',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'same',imip:'x5',mero:'x5'},
  imip:    {amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'ok',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'x5',imip:'same',mero:'x5'},
  mero:    {amox:'ok',amp:'ok',clox:'ok',pen:'ok',piper:'ok',cefadrox:'ok',cefazol:'ok',cefalex:'ok',cefox:'ok',cefepro:'ok',cefurox:'ok',cefixin:'ok',cefotax:'ok',ceftaz:'ok',ceftriax:'ok',cefepim:'ok',erta:'x5',imip:'x5',mero:'same'},
};

export interface RiskInfo { symbol: string; cls: string }

export const RISK_LABELS: Record<Exclude<RiskLevel, 'same'>, RiskInfo> = {
  ok: { symbol: '✓', cls: 'safe' },
  x1: { symbol: 'X¹', cls: 'caution' },
  x2: { symbol: 'X²', cls: 'avoid' },
  x3: { symbol: 'X³', cls: 'avoid' },
  x4: { symbol: 'X⁴', cls: 'avoid' },
  x5: { symbol: 'X⁵', cls: 'avoid' },
};

export const DRUG_GROUPS = [
  { label: 'Penicilinas', options: [
    { value: 'amox', label: 'Amoxicilina (inclui Amox+Clav.)' },
    { value: 'amp', label: 'Ampicilina' },
    { value: 'clox', label: 'Cloxacilina / Flucloxacilina' },
    { value: 'pen', label: 'Penicilina G / Benzilpenicilina' },
    { value: 'piper', label: 'Piperacilina (inclui Pip+Taz.)' },
  ]},
  { label: 'Cefalosporinas 1.ª gen.', options: [
    { value: 'cefadrox', label: 'Cefadroxil' },
    { value: 'cefazol', label: 'Cefazolina' },
    { value: 'cefalex', label: 'Cefalexina' },
  ]},
  { label: 'Cefalosporinas 2.ª gen.', options: [
    { value: 'cefox', label: 'Cefoxitina' },
    { value: 'cefepro', label: 'Cefeprozil' },
    { value: 'cefurox', label: 'Cefuroxima' },
  ]},
  { label: 'Cefalosporinas 3.ª gen.', options: [
    { value: 'cefixin', label: 'Cefixima' },
    { value: 'cefotax', label: 'Cefotaxima' },
    { value: 'ceftaz', label: 'Ceftazidima' },
    { value: 'ceftriax', label: 'Ceftriaxona' },
  ]},
  { label: 'Cefalosporinas 4.ª gen.', options: [
    { value: 'cefepim', label: 'Cefepima' },
  ]},
  { label: 'Carbapenemes', options: [
    { value: 'erta', label: 'Ertapenem' },
    { value: 'imip', label: 'Imipenem' },
    { value: 'mero', label: 'Meropenem' },
  ]},
];

// ── Pediatric calculator ──

export interface PedDrug {
  name: string;
  dose: number;
  max: number;
  split: number;
  freq: string;
  avail: string;
  note: string;
}

export const PED_DRUGS: Record<string, PedDrug> = {
  amox_std:      { name:'Amoxicilina', dose:50, max:1000, split:3, freq:'8/8h', avail:'Susp. 125 mg/5ml ou 250 mg/5ml', note:'OMA, rinossinusite, amigdalofaringite' },
  amox_high:     { name:'Amoxicilina (dose alta)', dose:90, max:3000, split:3, freq:'8/8h', avail:'Susp. 125 mg/5ml ou 250 mg/5ml', note:'OMA refratária, rinossinusite com fatores de risco' },
  amox_pneu:     { name:'Amoxicilina (pneumonia)', dose:100, max:3000, split:3, freq:'8/8h', avail:'Susp. 125 mg/5ml ou 250 mg/5ml', note:'Pneumonia comunitária pediátrica' },
  amoxclav_std:  { name:'Amox+Clav. (ref. amox)', dose:40, max:1500, split:3, freq:'8/8h', avail:'Formulação 4:1 — verificar concentração', note:'Dose referida à componente de amoxicilina' },
  amoxclav_high: { name:'Amox+Clav. dose alta (ref. amox)', dose:90, max:3000, split:3, freq:'8/8h', avail:'Formulação 14:1 — verificar concentração', note:'OMA refratária, pneumonia grave' },
  fluclox:       { name:'Flucloxacilina', dose:75, max:2000, split:4, freq:'6/6h', avail:'Cápsulas 250/500 mg ou solução oral', note:'Infeções pele e tecidos moles por S. aureus' },
  cefurox:       { name:'Cefuroxima', dose:25, max:1000, split:2, freq:'12/12h', avail:'Susp. 125 mg/5ml ou comp. 125/250 mg', note:'Alternativa a penicilinas (hip. não tipo I), ITU' },
  ceftriax:      { name:'Ceftriaxona (dose única)', dose:50, max:1000, split:1, freq:'dose única IM/IV', avail:'Uso parentérico — administração hospitalar', note:'Pielonefrite — dose de carga antes de oral' },
  azitro:        { name:'Azitromicina', dose:10, max:500, split:1, freq:'24/24h', avail:'Susp. 200 mg/5ml ou comp. 500 mg', note:'Hip. penicilina tipo I; agentes atípicos' },
  azitro_tc:     { name:'Azitromicina (tosse convulsa)', dose:12, max:500, split:1, freq:'24/24h', avail:'Susp. 200 mg/5ml ou comp. 500 mg', note:'Bordetella pertussis — 5 dias' },
  clinda:        { name:'Clindamicina', dose:30, max:1800, split:3, freq:'6/6-8/8h', avail:'Cápsulas 150/300 mg — sol. oral manipulada', note:'Hip. beta-lactâmicos, suspeita MRSA' },
  sxt:           { name:'SMX+TMP (ref. TMP)', dose:10, max:160, split:2, freq:'12/12h', avail:'Susp. TMP 40 mg/5ml + SMX 200 mg/5ml', note:'ITU, alternativa a beta-lactâmicos' },
  metro:         { name:'Metronidazol', dose:30, max:2250, split:3, freq:'8/8h', avail:'Susp. 200 mg/5ml ou comprimidos', note:'Infeções anaeróbias, odontogénicas' },
  nitro:         { name:'Nitrofurantoína', dose:5, max:400, split:4, freq:'6/6h', avail:'Cápsulas 50/100 mg', note:'ITU não complicada. Não usar < 3 meses' },
};

export const PED_DRUG_GROUPS = [
  { label: 'Penicilinas', options: [
    { value: 'amox_std', label: 'Amoxicilina standard (50 mg/kg/dia)' },
    { value: 'amox_high', label: 'Amoxicilina dose alta (90 mg/kg/dia)' },
    { value: 'amox_pneu', label: 'Amoxicilina pneumonia (100 mg/kg/dia)' },
    { value: 'amoxclav_std', label: 'Amox+Clav. standard (40 mg/kg/dia)' },
    { value: 'amoxclav_high', label: 'Amox+Clav. dose alta (90 mg/kg/dia)' },
    { value: 'fluclox', label: 'Flucloxacilina (75 mg/kg/dia)' },
  ]},
  { label: 'Cefalosporinas', options: [
    { value: 'cefurox', label: 'Cefuroxima (25 mg/kg/dia)' },
    { value: 'ceftriax', label: 'Ceftriaxona (50 mg/kg — dose única)' },
  ]},
  { label: 'Macrólidos', options: [
    { value: 'azitro', label: 'Azitromicina (10 mg/kg/dia)' },
    { value: 'azitro_tc', label: 'Azitromicina tosse convulsa (12 mg/kg/dia)' },
  ]},
  { label: 'Outros', options: [
    { value: 'clinda', label: 'Clindamicina (30 mg/kg/dia)' },
    { value: 'sxt', label: 'SMX+TMP — TMP (10 mg/kg/dia)' },
    { value: 'metro', label: 'Metronidazol (30 mg/kg/dia)' },
    { value: 'nitro', label: 'Nitrofurantoína (5 mg/kg/dia)' },
  ]},
];
