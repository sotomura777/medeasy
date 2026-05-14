export interface Drug {
  n: string;
  g: string;
  a?: string[];
}

export type Severity = 'major' | 'moderada' | 'minor';

export interface Rule {
  a: string[];
  b: string[];
  s: Severity;
  mech: string;
  eff: string;
  act: string;
}

export interface Interaction {
  a: string;
  b: string;
  s: Severity;
  mech: string;
  eff: string;
  act: string;
}

export const DRUGS: Drug[] = [
  // Antibióticos ambulatório
  {n:"Amoxicilina", g:"Antibiótico — penicilina", a:["amoxi"]},
  {n:"Amoxicilina + Ácido clavulânico", g:"Antibiótico — penicilina", a:["amoxiclav","augmentin","amoxicilina clavulanato"]},
  {n:"Flucloxacilina", g:"Antibiótico — penicilina"},
  {n:"Fenoximetilpenicilina", g:"Antibiótico — penicilina", a:["penicilina v"]},
  {n:"Benzilpenicilina", g:"Antibiótico — penicilina", a:["penicilina g"]},
  {n:"Cefadroxil", g:"Antibiótico — cefalosporina 1ª"},
  {n:"Cefalexina", g:"Antibiótico — cefalosporina 1ª"},
  {n:"Cefuroxima", g:"Antibiótico — cefalosporina 2ª"},
  {n:"Cefixima", g:"Antibiótico — cefalosporina 3ª"},
  {n:"Ceftriaxona", g:"Antibiótico — cefalosporina 3ª"},
  {n:"Cefotaxima", g:"Antibiótico — cefalosporina 3ª"},
  {n:"Cefepima", g:"Antibiótico — cefalosporina 4ª"},
  {n:"Azitromicina", g:"Antibiótico — macrólido", a:["zithromax"]},
  {n:"Claritromicina", g:"Antibiótico — macrólido"},
  {n:"Eritromicina", g:"Antibiótico — macrólido"},
  {n:"Ciprofloxacina", g:"Antibiótico — quinolona"},
  {n:"Levofloxacina", g:"Antibiótico — quinolona"},
  {n:"Norfloxacina", g:"Antibiótico — quinolona"},
  {n:"Moxifloxacina", g:"Antibiótico — quinolona"},
  {n:"Doxiciclina", g:"Antibiótico — tetraciclina"},
  {n:"Minociclina", g:"Antibiótico — tetraciclina"},
  {n:"Tigeciclina", g:"Antibiótico — glicilciclina"},
  {n:"Sulfametoxazol + Trimetoprim", g:"Antibiótico — sulfonamida", a:["smx-tmp","cotrimoxazol","bactrim","septrin"]},
  {n:"Trimetoprim", g:"Antibiótico"},
  {n:"Nitrofurantoína", g:"Antibiótico"},
  {n:"Fosfomicina", g:"Antibiótico"},
  {n:"Pivmecilinam", g:"Antibiótico — penicilina"},
  {n:"Secnidazol", g:"Antibiótico — nitroimidazol"},
  {n:"Metronidazol", g:"Antibiótico — nitroimidazol"},
  {n:"Clindamicina", g:"Antibiótico — lincosamida"},
  {n:"Rifampicina", g:"Antibiótico — rifamicina"},
  {n:"Rifaximina", g:"Antibiótico — rifamicina"},
  {n:"Linezolida", g:"Antibiótico — oxazolidinona"},
  // Antibióticos hospitalares
  {n:"Meropenem", g:"Antibiótico — carbapenem"},
  {n:"Imipenem", g:"Antibiótico — carbapenem"},
  {n:"Ertapenem", g:"Antibiótico — carbapenem"},
  {n:"Piperacilina + Tazobactam", g:"Antibiótico — penicilina", a:["pip-tazo","tazocin"]},
  {n:"Vancomicina", g:"Antibiótico — glicopéptido"},
  {n:"Teicoplanina", g:"Antibiótico — glicopéptido"},
  {n:"Gentamicina", g:"Antibiótico — aminoglicosídeo"},
  {n:"Amicacina", g:"Antibiótico — aminoglicosídeo"},
  {n:"Tobramicina", g:"Antibiótico — aminoglicosídeo"},
  {n:"Daptomicina", g:"Antibiótico — lipopéptido"},
  {n:"Aztreonam", g:"Antibiótico — monobactam"},
  {n:"Colistina", g:"Antibiótico — polimixina"},
  {n:"Ceftazidima + Avibactam", g:"Antibiótico — cefalosporina + inibidor"},
  // Anticoagulantes
  {n:"Varfarina", g:"Anticoagulante — AVK"},
  {n:"Acenocumarol", g:"Anticoagulante — AVK", a:["sintrom"]},
  {n:"Enoxaparina", g:"Anticoagulante — HBPM"},
  {n:"Dalteparina", g:"Anticoagulante — HBPM"},
  {n:"Heparina não fraccionada", g:"Anticoagulante — heparina"},
  {n:"Fondaparinux", g:"Anticoagulante"},
  {n:"Rivaroxabano", g:"Anticoagulante — DOAC anti-Xa"},
  {n:"Apixabano", g:"Anticoagulante — DOAC anti-Xa"},
  {n:"Edoxabano", g:"Anticoagulante — DOAC anti-Xa"},
  {n:"Dabigatrano", g:"Anticoagulante — DOAC anti-IIa"},
  {n:"Clopidogrel", g:"Antiplaquetário"},
  {n:"Ácido acetilsalicílico", g:"Antiplaquetário / AINE", a:["aas","aspirina"]},
  {n:"Ticagrelor", g:"Antiplaquetário"},
  {n:"Prasugrel", g:"Antiplaquetário"},
  // Antiepilépticos
  {n:"Valproato", g:"Antiepiléptico", a:["ácido valpróico","depakine"]},
  {n:"Fenitoína", g:"Antiepiléptico"},
  {n:"Carbamazepina", g:"Antiepiléptico"},
  {n:"Oxcarbazepina", g:"Antiepiléptico"},
  {n:"Levetiracetam", g:"Antiepiléptico"},
  {n:"Lamotrigina", g:"Antiepiléptico"},
  {n:"Topiramato", g:"Antiepiléptico"},
  {n:"Gabapentina", g:"Antiepiléptico"},
  {n:"Pregabalina", g:"Antiepiléptico"},
  {n:"Fenobarbital", g:"Antiepiléptico — barbitúrico"},
  // Antidepressivos / psiquiátricos
  {n:"Sertralina", g:"Antidepressivo — ISRS"},
  {n:"Fluoxetina", g:"Antidepressivo — ISRS"},
  {n:"Paroxetina", g:"Antidepressivo — ISRS"},
  {n:"Escitalopram", g:"Antidepressivo — ISRS"},
  {n:"Citalopram", g:"Antidepressivo — ISRS"},
  {n:"Fluvoxamina", g:"Antidepressivo — ISRS"},
  {n:"Venlafaxina", g:"Antidepressivo — IRSN"},
  {n:"Duloxetina", g:"Antidepressivo — IRSN"},
  {n:"Mirtazapina", g:"Antidepressivo"},
  {n:"Bupropiona", g:"Antidepressivo"},
  {n:"Trazodona", g:"Antidepressivo"},
  {n:"Amitriptilina", g:"Antidepressivo — ADT"},
  {n:"Nortriptilina", g:"Antidepressivo — ADT"},
  {n:"Clomipramina", g:"Antidepressivo — ADT"},
  {n:"Imipramina", g:"Antidepressivo — ADT"},
  {n:"Moclobemida", g:"Antidepressivo — IMAO"},
  {n:"Fenelzina", g:"Antidepressivo — IMAO"},
  {n:"Tranilcipromina", g:"Antidepressivo — IMAO"},
  {n:"Selegilina", g:"IMAO"},
  {n:"Lítio", g:"Estabilizador humor"},
  {n:"Haloperidol", g:"Antipsicótico típico"},
  {n:"Quetiapina", g:"Antipsicótico atípico"},
  {n:"Risperidona", g:"Antipsicótico atípico"},
  {n:"Olanzapina", g:"Antipsicótico atípico"},
  {n:"Aripiprazol", g:"Antipsicótico atípico"},
  {n:"Clozapina", g:"Antipsicótico atípico"},
  {n:"Hidroxizina", g:"Anti-histamínico"},
  {n:"Sumatriptano", g:"Triptano"},
  {n:"Zolmitriptano", g:"Triptano"},
  // Antifúngicos
  {n:"Fluconazol", g:"Antifúngico — azol"},
  {n:"Voriconazol", g:"Antifúngico — azol"},
  {n:"Itraconazol", g:"Antifúngico — azol"},
  {n:"Posaconazol", g:"Antifúngico — azol"},
  {n:"Cetoconazol", g:"Antifúngico — azol"},
  {n:"Caspofungina", g:"Antifúngico — equinocandina"},
  {n:"Anfotericina B", g:"Antifúngico"},
  // Antirretrovirais
  {n:"Ritonavir", g:"Antirretroviral — IP"},
  {n:"Lopinavir + Ritonavir", g:"Antirretroviral — IP"},
  {n:"Darunavir", g:"Antirretroviral — IP"},
  {n:"Atazanavir", g:"Antirretroviral — IP"},
  {n:"Efavirenze", g:"Antirretroviral — INNTR"},
  {n:"Tenofovir", g:"Antirretroviral — INTR"},
  {n:"Emtricitabina", g:"Antirretroviral — INTR"},
  {n:"Dolutegravir", g:"Antirretroviral — INI"},
  {n:"Raltegravir", g:"Antirretroviral — INI"},
  // Imunossupressores
  {n:"Ciclosporina", g:"Imunossupressor"},
  {n:"Tacrolimus", g:"Imunossupressor"},
  {n:"Sirolimus", g:"Imunossupressor"},
  {n:"Everolimus", g:"Imunossupressor"},
  {n:"Metotrexato", g:"Imunossupressor / antineoplásico"},
  {n:"Azatioprina", g:"Imunossupressor"},
  {n:"Micofenolato", g:"Imunossupressor"},
  {n:"Alopurinol", g:"Antigotoso"},
  {n:"Febuxostate", g:"Antigotoso"},
  // Cardiovasculares
  {n:"Sinvastatina", g:"Estatina"},
  {n:"Atorvastatina", g:"Estatina"},
  {n:"Rosuvastatina", g:"Estatina"},
  {n:"Pravastatina", g:"Estatina"},
  {n:"Fluvastatina", g:"Estatina"},
  {n:"Pitavastatina", g:"Estatina"},
  {n:"Ezetimiba", g:"Hipolipemiante"},
  {n:"Gemfibrozil", g:"Fibrato"},
  {n:"Fenofibrato", g:"Fibrato"},
  {n:"Digoxina", g:"Glicósido cardíaco"},
  {n:"Amiodarona", g:"Antiarrítmico III"},
  {n:"Dronedarona", g:"Antiarrítmico III"},
  {n:"Sotalol", g:"Antiarrítmico III / beta-bloqueador"},
  {n:"Flecainida", g:"Antiarrítmico Ic"},
  {n:"Propafenona", g:"Antiarrítmico Ic"},
  {n:"Quinidina", g:"Antiarrítmico Ia"},
  {n:"Diltiazem", g:"Antagonista cálcio"},
  {n:"Verapamilo", g:"Antagonista cálcio"},
  {n:"Amlodipina", g:"Antagonista cálcio"},
  {n:"Nifedipina", g:"Antagonista cálcio"},
  {n:"Lercanidipina", g:"Antagonista cálcio"},
  {n:"Bisoprolol", g:"Beta-bloqueador"},
  {n:"Carvedilol", g:"Beta-bloqueador"},
  {n:"Atenolol", g:"Beta-bloqueador"},
  {n:"Metoprolol", g:"Beta-bloqueador"},
  {n:"Nebivolol", g:"Beta-bloqueador"},
  {n:"Propranolol", g:"Beta-bloqueador"},
  {n:"Enalapril", g:"IECA"},
  {n:"Lisinopril", g:"IECA"},
  {n:"Ramipril", g:"IECA"},
  {n:"Perindopril", g:"IECA"},
  {n:"Captopril", g:"IECA"},
  {n:"Losartan", g:"ARA"},
  {n:"Valsartan", g:"ARA"},
  {n:"Irbesartan", g:"ARA"},
  {n:"Candesartan", g:"ARA"},
  {n:"Telmisartan", g:"ARA"},
  {n:"Furosemida", g:"Diurético ansa"},
  {n:"Hidroclorotiazida", g:"Diurético tiazídico"},
  {n:"Indapamida", g:"Diurético"},
  {n:"Espironolactona", g:"Diurético — antagonista aldosterona"},
  {n:"Eplerenona", g:"Diurético — antagonista aldosterona"},
  {n:"Sacubitril + Valsartan", g:"ARNI", a:["entresto"]},
  {n:"Dapagliflozina", g:"Antidiabético — iSGLT2 / IC"},
  {n:"Empagliflozina", g:"Antidiabético — iSGLT2 / IC"},
  // Analgésicos / opioides / AINEs
  {n:"Paracetamol", g:"Analgésico"},
  {n:"Ibuprofeno", g:"AINE"},
  {n:"Diclofenac", g:"AINE"},
  {n:"Naproxeno", g:"AINE"},
  {n:"Etoricoxib", g:"AINE — coxib"},
  {n:"Celecoxib", g:"AINE — coxib"},
  {n:"Cetorolac", g:"AINE"},
  {n:"Indometacina", g:"AINE"},
  {n:"Piroxicam", g:"AINE"},
  {n:"Meloxicam", g:"AINE"},
  {n:"Tramadol", g:"Opioide fraco"},
  {n:"Codeína", g:"Opioide fraco"},
  {n:"Tapentadol", g:"Opioide"},
  {n:"Morfina", g:"Opioide forte"},
  {n:"Fentanilo", g:"Opioide forte"},
  {n:"Oxicodona", g:"Opioide forte"},
  {n:"Buprenorfina", g:"Opioide"},
  {n:"Metadona", g:"Opioide"},
  // Antidiabéticos
  {n:"Metformina", g:"Antidiabético — biguanida"},
  {n:"Gliclazida", g:"Antidiabético — sulfonilureia"},
  {n:"Glimepirida", g:"Antidiabético — sulfonilureia"},
  {n:"Glibenclamida", g:"Antidiabético — sulfonilureia"},
  {n:"Insulina", g:"Antidiabético"},
  {n:"Repaglinida", g:"Antidiabético — glinida"},
  {n:"Sitagliptina", g:"Antidiabético — iDPP4"},
  {n:"Vildagliptina", g:"Antidiabético — iDPP4"},
  {n:"Linagliptina", g:"Antidiabético — iDPP4"},
  {n:"Liraglutida", g:"Antidiabético — GLP1"},
  {n:"Semaglutida", g:"Antidiabético — GLP1"},
  {n:"Pioglitazona", g:"Antidiabético — TZD"},
  // GI
  {n:"Omeprazol", g:"IBP"},
  {n:"Pantoprazol", g:"IBP"},
  {n:"Esomeprazol", g:"IBP"},
  {n:"Lansoprazol", g:"IBP"},
  {n:"Rabeprazol", g:"IBP"},
  {n:"Ranitidina", g:"Anti-H2"},
  {n:"Famotidina", g:"Anti-H2"},
  {n:"Sucralfato", g:"Protector mucosa"},
  {n:"Hidróxido de alumínio + magnésio", g:"Antiácido", a:["antiacido","maalox"]},
  {n:"Metoclopramida", g:"Procinético"},
  {n:"Domperidona", g:"Procinético"},
  {n:"Ondansetrom", g:"Antiemético", a:["ondansetron"]},
  {n:"Colestiramina", g:"Quelante ácidos biliares"},
  // Corticoides
  {n:"Prednisolona", g:"Corticoide sistémico"},
  {n:"Prednisona", g:"Corticoide sistémico"},
  {n:"Dexametasona", g:"Corticoide sistémico"},
  {n:"Metilprednisolona", g:"Corticoide sistémico"},
  {n:"Hidrocortisona", g:"Corticoide sistémico"},
  // Respiratório
  {n:"Teofilina", g:"Broncodilatador — metilxantina"},
  {n:"Salmeterol", g:"Broncodilatador — LABA"},
  {n:"Formoterol", g:"Broncodilatador — LABA"},
  {n:"Indacaterol", g:"Broncodilatador — LABA"},
  {n:"Salbutamol", g:"Broncodilatador — SABA"},
  {n:"Tiotrópio", g:"Broncodilatador — LAMA"},
  {n:"Montelucaste", g:"Antileucotrieno"},
  // Antineoplásicos orais
  {n:"Tamoxifeno", g:"Antineoplásico — SERM"},
  {n:"Anastrozol", g:"Antineoplásico — IA"},
  {n:"Letrozol", g:"Antineoplásico — IA"},
  {n:"Capecitabina", g:"Antineoplásico"},
  {n:"Imatinib", g:"Antineoplásico — TKI"},
  {n:"Erlotinib", g:"Antineoplásico — TKI"},
  // Outros
  {n:"Álcool", g:"Outros", a:["alcool","etanol"]},
  {n:"Erva de São João", g:"Fitoterápico", a:["hipericão","st johns wort"]},
  {n:"Sumo de toranja", g:"Alimento — inibidor CYP3A4", a:["toranja"]},
  {n:"Cálcio", g:"Suplemento", a:["carbonato calcio"]},
  {n:"Ferro", g:"Suplemento", a:["sulfato ferroso","ferro oral"]},
  {n:"Magnésio", g:"Suplemento", a:["magnésio oral"]},
  {n:"Probenecide", g:"Uricosúrico"},
  {n:"Colchicina", g:"Antigotoso"},
  {n:"Levotiroxina", g:"Hormona tiroideia", a:["eutirox","letter"]},
  {n:"Diazepam", g:"Benzodiazepina"},
  {n:"Lorazepam", g:"Benzodiazepina"},
  {n:"Alprazolam", g:"Benzodiazepina"},
  {n:"Bromazepam", g:"Benzodiazepina"},
  {n:"Midazolam", g:"Benzodiazepina"},
  {n:"Zolpidem", g:"Hipnótico Z"},
  {n:"Zopiclona", g:"Hipnótico Z"},
  {n:"Petidina", g:"Opioide"},
  {n:"Tinidazol", g:"Antibiótico — nitroimidazol"},
  {n:"Mercaptopurina", g:"Imunossupressor"},
  {n:"Contraste iodado", g:"Diagnóstico"},
  {n:"Sildenafil", g:"Inibidor PDE5"},
  {n:"Tadalafil", g:"Inibidor PDE5"},
  {n:"Ergotamina", g:"Antimigranoso"},
  {n:"Anticonceptivo oral", g:"Contracepção hormonal", a:["pilula","contraceptivo"]},
  {n:"Cinacalcet", g:"Calcimimético"},
  {n:"Levodopa", g:"Antiparkinsoniano"},
];

const CL = {
  ISRS: ["Sertralina","Fluoxetina","Paroxetina","Escitalopram","Citalopram","Fluvoxamina"],
  IRSN: ["Venlafaxina","Duloxetina"],
  ADT: ["Amitriptilina","Nortriptilina","Clomipramina","Imipramina"],
  IMAO: ["Moclobemida","Selegilina","Fenelzina","Tranilcipromina"],
  TRIPTANOS: ["Sumatriptano","Zolmitriptano"],
  AINE: ["Ibuprofeno","Diclofenac","Naproxeno","Etoricoxib","Celecoxib","Cetorolac","Indometacina","Piroxicam","Meloxicam","Ácido acetilsalicílico"],
  QUINOLONAS: ["Ciprofloxacina","Levofloxacina","Norfloxacina","Moxifloxacina"],
  MACROLIDOS: ["Azitromicina","Claritromicina","Eritromicina"],
  AZOIS: ["Fluconazol","Voriconazol","Itraconazol","Posaconazol","Cetoconazol"],
  AMINOGLICOSIDEOS: ["Gentamicina","Amicacina","Tobramicina"],
  CARBAPENEMES: ["Meropenem","Imipenem","Ertapenem"],
  TETRACICLINAS: ["Doxiciclina","Minociclina","Tigeciclina"],
  ESTATINAS: ["Sinvastatina","Atorvastatina","Rosuvastatina","Pravastatina","Fluvastatina","Pitavastatina"],
  ESTATINAS_CYP3A4: ["Sinvastatina","Atorvastatina"],
  ANTIARRITMICOS_QT: ["Amiodarona","Dronedarona","Sotalol","Quinidina","Flecainida","Propafenona"],
  ANTIPSICOTICOS_QT: ["Haloperidol","Quetiapina","Risperidona","Clozapina","Olanzapina"],
  ANTIPSICOTICOS: ["Haloperidol","Quetiapina","Risperidona","Clozapina","Olanzapina","Aripiprazol"],
  DOACs: ["Rivaroxabano","Apixabano","Edoxabano","Dabigatrano"],
  AVK: ["Varfarina","Acenocumarol"],
  HEPARINAS: ["Enoxaparina","Dalteparina","Heparina não fraccionada","Fondaparinux"],
  ANTIPLAQ: ["Clopidogrel","Ácido acetilsalicílico","Ticagrelor","Prasugrel"],
  IECA: ["Enalapril","Lisinopril","Ramipril","Perindopril","Captopril"],
  ARA: ["Losartan","Valsartan","Irbesartan","Candesartan","Telmisartan"],
  DIURETICOS_TIAZ: ["Hidroclorotiazida","Indapamida"],
  DIURETICOS_ANSA: ["Furosemida"],
  POUPADORES_K: ["Espironolactona","Eplerenona"],
  CORTICOIDES: ["Prednisolona","Prednisona","Dexametasona","Metilprednisolona","Hidrocortisona"],
  SULFONILUREIAS: ["Gliclazida","Glimepirida","Glibenclamida"],
  OPIOIDES_SEROT: ["Tramadol","Tapentadol","Metadona","Fentanilo"],
  IBPs: ["Omeprazol","Pantoprazol","Esomeprazol","Lansoprazol","Rabeprazol"],
  CATIOES_QUELANTES: ["Hidróxido de alumínio + magnésio","Cálcio","Ferro","Magnésio","Sucralfato"],
  ANTIRRETROVIRAIS_IP: ["Ritonavir","Lopinavir + Ritonavir","Darunavir","Atazanavir"],
  BENZODIAZEPINAS: ["Diazepam","Lorazepam","Alprazolam","Bromazepam","Midazolam","Zolpidem","Zopiclona"],
  OPIOIDES_TODOS: ["Tramadol","Morfina","Fentanilo","Oxicodona","Codeína","Tapentadol","Metadona","Buprenorfina","Petidina"],
  BETA_BLOQ: ["Bisoprolol","Carvedilol","Atenolol","Metoprolol","Nebivolol","Propranolol"],
  BETA_BLOQ_NAO_SELET: ["Propranolol","Carvedilol"],
  BRONCODILATADORES_B2: ["Salbutamol","Salmeterol","Formoterol","Indacaterol"],
  ANTIDIABETICOS_HIPO: ["Insulina","Gliclazida","Glimepirida","Glibenclamida","Repaglinida"],
  INDUTORES_CYP: ["Rifampicina","Carbamazepina","Fenitoína","Fenobarbital","Erva de São João","Efavirenze"],
  INIBIDORES_CYP3A4_FORTES: ["Claritromicina","Eritromicina","Itraconazol","Cetoconazol","Voriconazol","Posaconazol","Ritonavir","Lopinavir + Ritonavir","Darunavir","Sumo de toranja"],
} as const;

export const RULES: Rule[] = [
  // SÍNDROME SEROTONINÉRGICA
  {
    a: ["Linezolida"], b: [...CL.ISRS, ...CL.IRSN, ...CL.ADT, ...CL.TRIPTANOS, ...CL.IMAO, "Tramadol","Tapentadol","Metadona","Fentanilo","Mirtazapina","Trazodona","Bupropiona","Lítio"],
    s: "major",
    mech: "Linezolida é IMAO reversível. Combinada com fármacos serotoninérgicos aumenta drasticamente a serotonina sináptica.",
    eff: "Síndrome serotoninérgica: agitação, hipertermia, clonus, hiper-reflexia, instabilidade autonómica.",
    act: "Evitar combinação. Suspender ISRS/IRSN ≥2 semanas antes (fluoxetina ≥5 semanas). Se urgente: monitorização hospitalar."
  },
  {
    a: ["Tramadol"], b: [...CL.ISRS, ...CL.IRSN, ...CL.ADT, ...CL.IMAO, ...CL.TRIPTANOS, "Mirtazapina","Trazodona","Bupropiona","Lítio"],
    s: "major",
    mech: "Tramadol inibe recaptação de serotonina/noradrenalina. Soma-se ao efeito de outros agentes serotoninérgicos.",
    eff: "Síndrome serotoninérgica e ↓limiar convulsivo. Com bupropiona: ↓ adicional do limiar convulsivo.",
    act: "Preferir alternativa analgésica (paracetamol, opioide puro). Se necessário: usar dose mínima e monitorizar."
  },
  {
    a: [...CL.IMAO], b: [...CL.ISRS, ...CL.IRSN, ...CL.ADT, ...CL.TRIPTANOS, "Tramadol","Tapentadol","Metadona","Petidina","Linezolida","Bupropiona","Mirtazapina"],
    s: "major",
    mech: "Inibição da MAO + agentes serotoninérgicos → crise serotoninérgica e/ou hipertensiva.",
    eff: "Síndrome serotoninérgica grave, crise hipertensiva.",
    act: "Contra-indicado. Washout de 2 semanas entre fármacos (5 semanas se fluoxetina antes)."
  },
  {
    a: [...CL.ISRS], b: [...CL.TRIPTANOS],
    s: "moderada",
    mech: "Adição de efeito serotoninérgico (5-HT1).",
    eff: "Risco baixo mas real de síndrome serotoninérgica, sobretudo no início ou aumento de dose.",
    act: "Usar com precaução. Informar doente sobre sintomas. Evitar associação prolongada."
  },
  {
    a: [...CL.ISRS], b: [...CL.IRSN],
    s: "major",
    mech: "Adição de efeito serotoninérgico.",
    eff: "Síndrome serotoninérgica.",
    act: "Não combinar. Fazer cross-taper se mudança terapêutica."
  },

  // VANCOMICINA + NEFROTÓXICOS
  {
    a: ["Vancomicina"], b: [...CL.AMINOGLICOSIDEOS],
    s: "major",
    mech: "Nefrotoxicidade aditiva por lesão tubular proximal.",
    eff: "↑ Risco lesão renal aguda, sobretudo em doentes >65a, hipovolémicos ou com função renal limítrofe.",
    act: "Monitorizar creatinina diariamente e vales de vancomicina. Ajustar doses por TFG. Evitar associação se possível."
  },
  {
    a: ["Vancomicina"], b: ["Piperacilina + Tazobactam"],
    s: "major",
    mech: "Nefrotoxicidade aditiva (mecanismo não totalmente esclarecido; possível lesão tubular sinérgica).",
    eff: "↑ Incidência LRA documentada em múltiplas meta-análises (AKI até 30%).",
    act: "Considerar cefepima ou meropenem como alternativa empírica. Se essencial: monitorização renal estrita."
  },
  {
    a: ["Vancomicina"], b: [...CL.AINE],
    s: "moderada",
    mech: "AINEs reduzem perfusão renal (vasoconstrição arteriolar aferente) potenciando nefrotoxicidade da vancomicina.",
    eff: "↑ Risco LRA.",
    act: "Evitar AINE durante terapêutica com vancomicina. Preferir paracetamol."
  },
  {
    a: [...CL.AMINOGLICOSIDEOS], b: [...CL.AINE],
    s: "moderada",
    mech: "AINEs ↓ perfusão renal e prolongam exposição ao aminoglicosídeo.",
    eff: "↑ Nefrotoxicidade e ototoxicidade.",
    act: "Evitar combinação prolongada. Vigiar creatinina."
  },
  {
    a: [...CL.AMINOGLICOSIDEOS], b: ["Furosemida"],
    s: "moderada",
    mech: "Ototoxicidade e nefrotoxicidade aditivas.",
    eff: "Surdez (especialmente alta frequência) e LRA.",
    act: "Evitar associação prolongada. Vigiar creatinina, ionograma e função auditiva."
  },

  // PROLONGAMENTO QT
  {
    a: [...CL.QUINOLONAS], b: [...CL.ANTIARRITMICOS_QT],
    s: "major",
    mech: "Adição de bloqueio do canal hERG → prolongamento QT.",
    eff: "Risco torsade de pointes, sobretudo com moxifloxacina e em hipoK/hipoMg.",
    act: "Evitar associação. Se essencial: ECG basal, monitorização contínua, corrigir K+ e Mg2+."
  },
  {
    a: [...CL.QUINOLONAS], b: [...CL.ANTIPSICOTICOS_QT],
    s: "major",
    mech: "QT aditivo.",
    eff: "Torsade de pointes, morte súbita.",
    act: "Preferir antibiótico alternativo. Se necessário: ECG e correção de eletrólitos."
  },
  {
    a: [...CL.MACROLIDOS], b: [...CL.ANTIARRITMICOS_QT],
    s: "major",
    mech: "Macrólidos (sobretudo claritromicina e eritromicina) prolongam QT.",
    eff: "Torsade de pointes.",
    act: "Preferir azitromicina (menor risco). Evitar claritromicina/eritromicina."
  },
  {
    a: ["Azitromicina"], b: [...CL.ANTIPSICOTICOS_QT],
    s: "moderada",
    mech: "QT aditivo.",
    eff: "Prolongamento QT.",
    act: "Vigiar ECG se factores de risco (idoso, hipoK, cardiopatia)."
  },
  {
    a: [...CL.MACROLIDOS], b: [...CL.ANTIPSICOTICOS_QT],
    s: "major",
    mech: "QT aditivo + inibição CYP3A4 (haloperidol, quetiapina) com claritromicina/eritromicina.",
    eff: "↑ Concentrações de antipsicótico e prolongamento QT.",
    act: "Evitar. Se inevitável: ECG e reduzir dose do antipsicótico."
  },
  {
    a: ["Ondansetrom"], b: [...CL.ANTIARRITMICOS_QT, ...CL.ANTIPSICOTICOS_QT, ...CL.QUINOLONAS, ...CL.MACROLIDOS, ...CL.AZOIS, "Metadona","Citalopram","Escitalopram"],
    s: "moderada",
    mech: "QT aditivo.",
    eff: "Prolongamento QT.",
    act: "Limitar a dose única IV (8 mg) ou usar metoclopramida. ECG se múltiplos factores."
  },
  {
    a: ["Citalopram","Escitalopram"], b: [...CL.ANTIARRITMICOS_QT, ...CL.ANTIPSICOTICOS_QT, ...CL.QUINOLONAS, "Metadona"],
    s: "moderada",
    mech: "QT aditivo (citalopram/escitalopram têm efeito QT dose-dependente).",
    eff: "Prolongamento QT.",
    act: "Limitar citalopram a 20 mg/dia (40 se <65a sem RF). ECG se factores risco."
  },

  // CARBAPENEMES + VALPROATO
  {
    a: [...CL.CARBAPENEMES], b: ["Valproato"],
    s: "major",
    mech: "Carbapenemes inibem hidrólise do glucurónido de valproato e ↑ excreção renal — mecanismo único e rápido.",
    eff: "Queda de 60-100% dos níveis séricos de valproato em 24-48h → perda de controlo de crises.",
    act: "Evitar. Se imprescindível: trocar antiepiléptico ou monitorizar níveis com aumentos significativos de dose (raramente eficaz)."
  },

  // AZÓIS / INIBIDORES CYP
  {
    a: [...CL.AZOIS], b: [...CL.AVK],
    s: "major",
    mech: "Inibição CYP2C9 (fluconazol, voriconazol) e CYP3A4 → ↑ varfarina.",
    eff: "↑ INR, risco hemorrágico significativo.",
    act: "Reduzir varfarina ~25-50% no início. Monitorizar INR 2-3 dias após início e fim do antifúngico."
  },
  {
    a: [...CL.AZOIS], b: [...CL.ESTATINAS_CYP3A4],
    s: "major",
    mech: "Inibição CYP3A4 ↑ concentrações de sinvastatina/atorvastatina.",
    eff: "Miopatia, rabdomiólise.",
    act: "Sinvastatina: contra-indicada com itraconazol/cetoconazol/posaconazol/voriconazol. Atorvastatina: limitar a 20 mg/dia ou trocar para rosuvastatina/pravastatina."
  },
  {
    a: [...CL.AZOIS], b: ["Ciclosporina","Tacrolimus","Sirolimus","Everolimus"],
    s: "major",
    mech: "Inibição CYP3A4 e P-glicoproteína.",
    eff: "↑ Drástico níveis de imunossupressor → nefrotoxicidade, neurotoxicidade, mielossupressão.",
    act: "Reduzir dose do imunossupressor 50-75% antes de iniciar. Monitorizar níveis 48h depois."
  },
  {
    a: [...CL.AZOIS], b: [...CL.DOACs],
    s: "major",
    mech: "Inibição CYP3A4 e P-gp.",
    eff: "↑ Exposição ao DOAC → hemorragia.",
    act: "Itraconazol/cetoconazol: contra-indicados com rivaroxabano e apixabano. Fluconazol em curso curto: usar com precaução."
  },
  {
    a: ["Fluconazol"], b: ["Fenitoína"],
    s: "major",
    mech: "Inibição CYP2C9.",
    eff: "↑ Níveis fenitoína, toxicidade (nistagmo, ataxia).",
    act: "Reduzir dose fenitoína e monitorizar níveis."
  },
  {
    a: ["Fluconazol"], b: [...CL.SULFONILUREIAS],
    s: "moderada",
    mech: "Inibição CYP2C9.",
    eff: "Hipoglicemia prolongada.",
    act: "Monitorizar glicemia. Considerar reduzir dose."
  },

  // METRONIDAZOL
  {
    a: ["Metronidazol"], b: [...CL.AVK],
    s: "major",
    mech: "Inibição CYP2C9 + deslocamento proteico.",
    eff: "↑ INR marcado, hemorragia.",
    act: "Reduzir varfarina 25-50%. Verificar INR a 2-3 dias. Cobrir com tinidazol não é alternativa segura."
  },
  {
    a: ["Metronidazol","Tinidazol","Secnidazol"], b: ["Álcool"],
    s: "major",
    mech: "Inibição da aldeído desidrogenase → acumulação de acetaldeído (reação tipo dissulfiram).",
    eff: "Náuseas violentas, vómitos, flushing, taquicardia, hipotensão.",
    act: "Abstinência alcoólica durante e até 72h após terapêutica. Vigiar excipientes com álcool."
  },
  {
    a: ["Metronidazol"], b: ["Lítio"],
    s: "major",
    mech: "↓ Excreção renal do lítio.",
    eff: "Toxicidade do lítio (tremor, confusão, convulsões).",
    act: "Monitorizar litemia. Considerar suspender lítio durante o tratamento."
  },

  // RIFAMPICINA (INDUTOR FORTE)
  {
    a: ["Rifampicina"], b: [...CL.AVK],
    s: "major",
    mech: "Indução potente CYP2C9/3A4.",
    eff: "↓ Efeito anticoagulante; após suspensão risco ↑INR.",
    act: "Aumentar dose varfarina (frequentemente 2-3x). INR semanal. Reavaliar após cessação de rifampicina."
  },
  {
    a: ["Rifampicina"], b: [...CL.DOACs, ...CL.ESTATINAS, "Ciclosporina","Tacrolimus","Digoxina","Quetiapina","Haloperidol","Verapamilo","Diltiazem","Amiodarona","Carbamazepina","Fenitoína","Itraconazol","Voriconazol","Posaconazol","Tamoxifeno","Imatinib","Erlotinib","Dolutegravir","Raltegravir","Efavirenze","Ritonavir","Lopinavir + Ritonavir","Darunavir","Sertralina","Citalopram","Escitalopram","Amitriptilina","Nortriptilina","Metadona","Sitagliptina","Linagliptina","Gliclazida","Glimepirida","Levotiroxina","Prednisolona","Dexametasona","Anticonceptivo oral","Sildenafil","Tadalafil","Repaglinida","Pioglitazona"],
    s: "major",
    mech: "Indução pan-CYP (3A4, 2C9, 2C19) e P-gp.",
    eff: "Redução marcada (até 90%) das concentrações plasmáticas → falência terapêutica.",
    act: "Evitar associação. Se inevitável: aumentar dose com monitorização ou trocar fármaco. Cuidado: efeito persiste ~2 semanas após paragem da rifampicina."
  },
  {
    a: [...CL.INDUTORES_CYP], b: ["Anticonceptivo oral"],
    s: "major",
    mech: "Indução CYP3A4.",
    eff: "Falência contraceptiva.",
    act: "Método contraceptivo não hormonal ou DIU. Rifampicina: durante e 4 semanas após."
  },

  // CLARITROMICINA / ERITROMICINA
  {
    a: ["Claritromicina","Eritromicina"], b: [...CL.ESTATINAS_CYP3A4],
    s: "major",
    mech: "Inibição CYP3A4 forte.",
    eff: "Miopatia, rabdomiólise.",
    act: "Suspender sinvastatina/atorvastatina durante o curso de macrólido. Preferir azitromicina."
  },
  {
    a: ["Claritromicina","Eritromicina"], b: ["Digoxina"],
    s: "major",
    mech: "Inibição P-gp intestinal e flora intestinal que metaboliza digoxina.",
    eff: "↑ Digoxinemia → náuseas, arritmias, BAV.",
    act: "Monitorizar digoxinemia e ECG. Reduzir dose digoxina."
  },
  {
    a: ["Claritromicina","Eritromicina"], b: ["Carbamazepina"],
    s: "major",
    mech: "Inibição CYP3A4.",
    eff: "↑ Níveis carbamazepina → diplopia, ataxia, sonolência.",
    act: "Evitar associação. Se inevitável: reduzir dose CBZ e monitorizar."
  },
  {
    a: ["Claritromicina","Eritromicina"], b: [...CL.DOACs],
    s: "moderada",
    mech: "Inibição P-gp/CYP3A4.",
    eff: "↑ Exposição ao DOAC.",
    act: "Curso curto geralmente tolerado. Evitar em renais. Considerar azitromicina."
  },
  {
    a: ["Claritromicina","Eritromicina"], b: ["Ciclosporina","Tacrolimus"],
    s: "major",
    mech: "Inibição CYP3A4 + P-gp.",
    eff: "Imunossupressão excessiva, nefrotoxicidade.",
    act: "Reduzir imunossupressor e monitorizar níveis. Preferir azitromicina."
  },
  {
    a: ["Claritromicina","Eritromicina"], b: ["Colchicina"],
    s: "major",
    mech: "Inibição P-gp/CYP3A4 → acumulação colchicina.",
    eff: "Toxicidade grave por colchicina, potencialmente fatal (mielossupressão, falência multiorgânica).",
    act: "Contra-indicado em insuficiência renal/hepática. Caso contrário, reduzir colchicina drasticamente."
  },
  {
    a: ["Claritromicina","Eritromicina"], b: ["Verapamilo","Diltiazem"],
    s: "moderada",
    mech: "Inibição CYP3A4 + efeito cronotrópico negativo aditivo.",
    eff: "Hipotensão, bradicardia.",
    act: "Vigiar TA e FC. Casos de morte súbita descritos em idosos."
  },

  // DAPTOMICINA
  {
    a: ["Daptomicina"], b: [...CL.ESTATINAS],
    s: "moderada",
    mech: "Toxicidade muscular aditiva (CK elevada).",
    eff: "Miopatia, rabdomiólise.",
    act: "Considerar suspender estatina durante o curso de daptomicina. Monitorizar CK semanalmente."
  },

  // SMX+TMP / COTRIMOXAZOL
  {
    a: ["Sulfametoxazol + Trimetoprim","Trimetoprim"], b: [...CL.AVK],
    s: "major",
    mech: "Inibição CYP2C9 + deslocamento proteico.",
    eff: "↑ INR, hemorragia.",
    act: "Reduzir varfarina e monitorizar INR estreitamente."
  },
  {
    a: ["Sulfametoxazol + Trimetoprim"], b: ["Metotrexato"],
    s: "major",
    mech: "Adição de antifolato + ↓ excreção renal MTX + deslocamento proteico.",
    eff: "Pancitopenia, toxicidade MTX grave.",
    act: "Contra-indicado em doses de MTX oncológicas. Em doses baixas (AR): evitar; se necessário, vigiar hemograma."
  },
  {
    a: ["Sulfametoxazol + Trimetoprim","Trimetoprim"], b: ["Fenitoína"],
    s: "moderada",
    mech: "Inibição CYP2C9.",
    eff: "↑ Níveis fenitoína.",
    act: "Vigiar sinais de toxicidade e doseamento."
  },
  {
    a: ["Sulfametoxazol + Trimetoprim","Trimetoprim"], b: [...CL.IECA, ...CL.ARA, ...CL.POUPADORES_K],
    s: "major",
    mech: "Trimetoprim bloqueia canais ENaC (efeito amilorida-like) → retenção K+.",
    eff: "Hipercaliemia grave, sobretudo em idosos e renais.",
    act: "Evitar em idosos com IECA/ARA. Monitorizar K+. Risco de morte súbita documentado."
  },
  {
    a: ["Sulfametoxazol + Trimetoprim","Trimetoprim"], b: [...CL.SULFONILUREIAS],
    s: "moderada",
    mech: "Deslocamento proteico + inibição CYP2C9.",
    eff: "Hipoglicemia prolongada.",
    act: "Vigiar glicemia, especialmente idosos."
  },

  // DOXICICLINA / TETRACICLINAS
  {
    a: [...CL.TETRACICLINAS], b: [...CL.CATIOES_QUELANTES],
    s: "moderada",
    mech: "Quelação de catiões divalentes (Ca2+, Mg2+, Al3+, Fe2+) no lúmen intestinal.",
    eff: "↓ Absorção tetraciclina → falência terapêutica.",
    act: "Separar administração em ≥2h (idealmente 2h antes ou 4-6h depois)."
  },
  {
    a: [...CL.QUINOLONAS], b: [...CL.CATIOES_QUELANTES],
    s: "moderada",
    mech: "Quelação por catiões divalentes.",
    eff: "↓ Absorção quinolona → falência terapêutica.",
    act: "Separar administração ≥2h antes ou 6h depois do catião."
  },
  {
    a: [...CL.TETRACICLINAS], b: [...CL.AVK],
    s: "moderada",
    mech: "Alteração da flora intestinal + efeito directo discutido.",
    eff: "↑ INR.",
    act: "Vigiar INR durante o tratamento."
  },

  // AINEs
  {
    a: [...CL.AINE], b: [...CL.AVK, ...CL.DOACs, ...CL.HEPARINAS],
    s: "major",
    mech: "AINEs ↓ função plaquetária e lesam mucosa gástrica; também deslocam varfarina das proteínas e inibem CYP2C9.",
    eff: "Hemorragia digestiva alta, hemorragia em qualquer local.",
    act: "Evitar AINE em anticoagulados. Se necessário: dose mínima + IBP + curta duração. Preferir paracetamol."
  },
  {
    a: [...CL.AINE], b: [...CL.ANTIPLAQ],
    s: "major",
    mech: "↑ Risco hemorrágico aditivo; ibuprofeno também antagoniza efeito antiagregante da aspirina.",
    eff: "Hemorragia GI; com aspirina em prevenção CV: perda de efeito cardioprotector.",
    act: "Evitar. Tomar aspirina ≥2h antes do ibuprofeno se inevitável. Associar IBP."
  },
  {
    a: [...CL.AINE], b: [...CL.CORTICOIDES],
    s: "major",
    mech: "Aditivo de lesão da mucosa gástrica e ↓ síntese de prostaglandinas protectoras.",
    eff: "Úlcera péptica, hemorragia digestiva.",
    act: "Evitar combinação prolongada. Associar IBP se inevitável."
  },
  {
    a: [...CL.AINE], b: [...CL.IECA, ...CL.ARA, ...CL.DIURETICOS_ANSA, ...CL.DIURETICOS_TIAZ],
    s: "moderada",
    mech: "AINE bloqueia prostaglandinas vasodilatadoras renais → ↓ TFG. 'Triple whammy' se IECA/ARA + diurético + AINE.",
    eff: "LRA, agravamento HTA, hipercaliemia.",
    act: "Evitar em idosos, IC, IR. Vigiar creatinina e K+ se inevitável."
  },
  {
    a: [...CL.AINE], b: ["Lítio"],
    s: "major",
    mech: "↓ Excreção renal lítio.",
    eff: "Toxicidade lítio (até 50% subida em níveis).",
    act: "Evitar. Se necessário curto prazo: vigiar litemia em 5-7 dias."
  },
  {
    a: [...CL.AINE], b: ["Metotrexato"],
    s: "major",
    mech: "↓ Excreção renal MTX + deslocamento proteico.",
    eff: "Toxicidade MTX (mielossupressão, mucosite, nefrotoxicidade).",
    act: "Em doses oncológicas: contra-indicado. Em doses baixas (AR): tolerado com vigilância."
  },

  // VARFARINA — interações adicionais
  {
    a: [...CL.AVK], b: ["Amiodarona"],
    s: "major",
    mech: "Inibição CYP2C9/3A4.",
    eff: "↑ INR significativo, durante semanas a meses pela t½ longa da amiodarona.",
    act: "Reduzir varfarina ~30-50% ao iniciar amiodarona. INR semanal inicialmente."
  },
  {
    a: [...CL.AVK], b: [...CL.MACROLIDOS],
    s: "moderada",
    mech: "Inibição CYP3A4 + alteração flora intestinal.",
    eff: "↑ INR.",
    act: "Vigiar INR em 3-5 dias após início. Preferir azitromicina."
  },
  {
    a: [...CL.AVK], b: [...CL.QUINOLONAS],
    s: "moderada",
    mech: "Inibição enzimática + alteração flora.",
    eff: "↑ INR.",
    act: "Verificar INR 3-5 dias após início."
  },
  {
    a: [...CL.AVK], b: ["Erva de São João"],
    s: "major",
    mech: "Indução CYP2C9/3A4.",
    eff: "↓ INR, trombose.",
    act: "Contra-indicado."
  },
  {
    a: [...CL.AVK], b: ["Paracetamol"],
    s: "moderada",
    mech: "↓ Síntese factores vit K-dependentes em doses ≥2 g/dia mantidas.",
    eff: "↑ INR (modesto a moderado).",
    act: "Doses ≤2 g/dia geralmente seguras. Se uso prolongado: verificar INR."
  },

  // DOACs
  {
    a: [...CL.DOACs], b: [...CL.INIBIDORES_CYP3A4_FORTES],
    s: "major",
    mech: "Inibição CYP3A4 e P-gp.",
    eff: "↑ Exposição DOAC → hemorragia.",
    act: "Evitar com inibidores fortes (ritonavir, itraconazol, cetoconazol, claritromicina). Apixabano com inibidor forte: 2,5 mg 2x/d (ou evitar)."
  },
  {
    a: [...CL.DOACs], b: ["Carbamazepina","Fenitoína","Fenobarbital","Erva de São João","Efavirenze"],
    s: "major",
    mech: "Indução CYP3A4/P-gp.",
    eff: "↓ Concentração DOAC → trombose.",
    act: "Evitar associação. Se essencial: monitorizar com testes de actividade anti-Xa específicos."
  },
  {
    a: ["Dabigatrano"], b: ["Verapamilo","Amiodarona","Dronedarona","Claritromicina","Itraconazol","Cetoconazol","Ciclosporina","Tacrolimus"],
    s: "major",
    mech: "Inibição P-gp.",
    eff: "↑ Dabigatrano → hemorragia.",
    act: "Reduzir dose dabigatrano para 110 mg 2x/d ou evitar. Dronedarona: contra-indicada."
  },

  // DIGOXINA
  {
    a: ["Digoxina"], b: ["Amiodarona","Dronedarona","Verapamilo","Diltiazem","Quinidina","Propafenona"],
    s: "major",
    mech: "Inibição P-gp + ↓ clearance digoxina.",
    eff: "↑ Digoxinemia até 2x → náuseas, alterações visuais, arritmias.",
    act: "Reduzir dose digoxina 30-50%. Monitorizar digoxinemia."
  },
  {
    a: ["Digoxina"], b: [...CL.AZOIS],
    s: "moderada",
    mech: "Inibição P-gp (itraconazol especialmente).",
    eff: "↑ Digoxinemia.",
    act: "Monitorizar digoxinemia."
  },
  {
    a: ["Digoxina"], b: [...CL.DIURETICOS_TIAZ, ...CL.DIURETICOS_ANSA],
    s: "moderada",
    mech: "Hipocaliemia sensibiliza miocárdio à digoxina.",
    eff: "Arritmias por toxicidade digitálica.",
    act: "Monitorizar K+ e suplementar se necessário."
  },

  // LÍTIO
  {
    a: ["Lítio"], b: [...CL.IECA, ...CL.ARA, ...CL.DIURETICOS_TIAZ],
    s: "major",
    mech: "↓ Excreção renal de lítio.",
    eff: "Toxicidade lítio (tremor grosseiro, confusão, ataxia, convulsões).",
    act: "Evitar tiazidas. Se IECA/ARA: monitorizar litemia 5-7 dias após introdução e em desidratação."
  },
  {
    a: ["Lítio"], b: ["Furosemida"],
    s: "moderada",
    mech: "↓ Excreção renal lítio (menos marcada que tiazidas).",
    eff: "↑ Litemia.",
    act: "Monitorizar litemia."
  },

  // IMUNOSSUPRESSORES
  {
    a: ["Ciclosporina","Tacrolimus"], b: ["Verapamilo","Diltiazem","Amiodarona"],
    s: "major",
    mech: "Inibição CYP3A4/P-gp.",
    eff: "↑ Níveis imunossupressor → nefrotoxicidade.",
    act: "Reduzir dose e monitorizar níveis."
  },
  {
    a: ["Ciclosporina","Tacrolimus"], b: ["Sumo de toranja"],
    s: "moderada",
    mech: "Inibição CYP3A4 intestinal.",
    eff: "↑ Variável e imprevisível.",
    act: "Evitar consumo regular."
  },
  {
    a: ["Ciclosporina"], b: [...CL.ESTATINAS],
    s: "major",
    mech: "Inibição OATP1B1 e CYP3A4 (sinvastatina/atorvastatina).",
    eff: "Miopatia, rabdomiólise.",
    act: "Contra-indicada sinvastatina. Atorvastatina, rosuvastatina, pravastatina: limitar dose (rosuvastatina ≤5 mg)."
  },
  {
    a: ["Metotrexato"], b: ["Probenecide"],
    s: "major",
    mech: "Inibição secreção tubular renal MTX.",
    eff: "Toxicidade MTX.",
    act: "Evitar associação."
  },
  {
    a: ["Metotrexato"], b: ["Amoxicilina","Amoxicilina + Ácido clavulânico","Piperacilina + Tazobactam","Benzilpenicilina"],
    s: "moderada",
    mech: "Penicilinas competem pela secreção tubular do MTX.",
    eff: "↑ Níveis MTX, toxicidade.",
    act: "Evitar em doses oncológicas. Doses baixas (AR): monitorização clínica."
  },
  {
    a: ["Azatioprina","Mercaptopurina"], b: ["Alopurinol","Febuxostate"],
    s: "major",
    mech: "Inibição xantina oxidase → acumulação de 6-mercaptopurina.",
    eff: "Mielossupressão grave, pancitopenia.",
    act: "Reduzir azatioprina para 25-33% da dose habitual. Vigiar hemograma. Preferir não associar."
  },

  // TEOFILINA
  {
    a: ["Teofilina"], b: [...CL.QUINOLONAS],
    s: "moderada",
    mech: "Inibição CYP1A2 (sobretudo ciprofloxacina).",
    eff: "↑ Teofilinemia → náuseas, taquicardia, convulsões.",
    act: "Reduzir teofilina 50% ou trocar antibiótico. Levofloxacina e moxifloxacina: menor risco."
  },
  {
    a: ["Teofilina"], b: ["Claritromicina","Eritromicina","Azitromicina"],
    s: "moderada",
    mech: "Inibição CYP1A2/3A4 (claritro/eritro). Azitromicina: efeito mínimo mas descrito.",
    eff: "↑ Teofilinemia.",
    act: "Monitorizar níveis."
  },
  {
    a: ["Teofilina"], b: [...CL.INDUTORES_CYP],
    s: "moderada",
    mech: "Indução CYP1A2.",
    eff: "↓ Teofilina.",
    act: "Vigiar controlo respiratório; ajustar dose."
  },

  // ANTIEPILÉPTICOS
  {
    a: ["Fenitoína"], b: ["Valproato"],
    s: "moderada",
    mech: "Valproato desloca fenitoína das proteínas plasmáticas e inibe metabolismo.",
    eff: "↑ Fenitoína livre — pode haver toxicidade mesmo com níveis totais normais.",
    act: "Doseamento de fenitoína livre, não apenas total."
  },
  {
    a: ["Carbamazepina"], b: ["Valproato"],
    s: "moderada",
    mech: "Indução por CBZ ↓ valproato; valproato ↑ metabolito activo CBZ (epóxido).",
    eff: "Toxicidade epóxido (ataxia, diplopia) e ↓ controlo de crises.",
    act: "Monitorizar níveis e clínica."
  },
  {
    a: ["Lamotrigina"], b: ["Valproato"],
    s: "major",
    mech: "Valproato inibe glucuronidação da lamotrigina → ↑ níveis 2-3x.",
    eff: "Rash grave (Stevens-Johnson), risco aumentado.",
    act: "Iniciar lamotrigina a 25 mg em dias alternados. Titulação muito lenta."
  },
  {
    a: ["Lamotrigina"], b: [...CL.INDUTORES_CYP],
    s: "moderada",
    mech: "Indução glucuronidação.",
    eff: "↓ Níveis lamotrigina.",
    act: "Aumentar dose lamotrigina."
  },

  // ANTIRRETROVIRAIS
  {
    a: [...CL.ANTIRRETROVIRAIS_IP], b: [...CL.ESTATINAS_CYP3A4],
    s: "major",
    mech: "Inibição CYP3A4 muito potente (ritonavir).",
    eff: "Rabdomiólise.",
    act: "Contra-indicada sinvastatina. Atorvastatina: dose mínima. Pravastatina/rosuvastatina preferidas."
  },
  {
    a: [...CL.ANTIRRETROVIRAIS_IP], b: ["Amiodarona","Quinidina","Flecainida","Propafenona","Dronedarona","Colchicina","Ergotamina","Midazolam","Sildenafil","Tadalafil","Quetiapina"],
    s: "major",
    mech: "Inibição CYP3A4.",
    eff: "Toxicidade grave do co-fármaco.",
    act: "Maioria contra-indicada. Ver RCM individual."
  },
  {
    a: ["Efavirenze"], b: [...CL.AVK],
    s: "moderada",
    mech: "Indução CYP2C9.",
    eff: "↓ INR ou aumento — efeito variável.",
    act: "Monitorizar INR estreitamente."
  },

  // LEVOTIROXINA
  {
    a: ["Levotiroxina"], b: [...CL.CATIOES_QUELANTES],
    s: "moderada",
    mech: "Quelação intestinal.",
    eff: "↓ Absorção levotiroxina, hipotiroidismo.",
    act: "Separar ≥4h."
  },
  {
    a: ["Levotiroxina"], b: [...CL.IBPs],
    s: "moderada",
    mech: "↓ Acidez gástrica reduz absorção (controverso).",
    eff: "Possível ↑ TSH.",
    act: "Monitorizar TSH se introdução de IBP. Manter formulação."
  },

  // IBPs
  {
    a: ["Omeprazol","Esomeprazol"], b: ["Clopidogrel"],
    s: "moderada",
    mech: "Inibição CYP2C19 ↓ activação clopidogrel (pro-drug).",
    eff: "Possível ↓ efeito antiagregante (relevância clínica discutida).",
    act: "Preferir pantoprazol, lansoprazol ou rabeprazol em doentes com clopidogrel."
  },
  {
    a: [...CL.IBPs], b: ["Itraconazol","Cetoconazol"],
    s: "moderada",
    mech: "↑ pH gástrico ↓ absorção (formulações que necessitam meio ácido).",
    eff: "Falência antifúngica.",
    act: "Preferir voriconazol/fluconazol ou suspender IBP. Itraconazol solução oral é menos afectado."
  },

  // ANTIDIABÉTICOS
  {
    a: ["Metformina"], b: ["Contraste iodado"],
    s: "major",
    mech: "Risco LRA induzida por contraste → acumulação metformina → acidose láctica.",
    eff: "Acidose láctica.",
    act: "Suspender metformina antes ou no momento do procedimento e reintroduzir 48h depois após confirmar função renal."
  },
  {
    a: [...CL.SULFONILUREIAS], b: ["Sulfametoxazol + Trimetoprim","Fluconazol","Voriconazol","Gemfibrozil","Claritromicina"],
    s: "moderada",
    mech: "Inibição CYP2C9.",
    eff: "Hipoglicemia.",
    act: "Vigiar glicemia."
  },
  {
    a: ["Empagliflozina","Dapagliflozina"], b: [...CL.DIURETICOS_ANSA],
    s: "moderada",
    mech: "Diurese aditiva.",
    eff: "Hipovolemia, hipotensão.",
    act: "Reduzir diurético em hipovolémicos."
  },

  // CORTICOIDES
  {
    a: [...CL.CORTICOIDES], b: [...CL.AVK],
    s: "moderada",
    mech: "Efeito variável; corticoides em alta dose podem ↑ INR.",
    eff: "Alteração do INR.",
    act: "Vigiar INR ao iniciar/parar."
  },
  {
    a: [...CL.CORTICOIDES], b: [...CL.QUINOLONAS],
    s: "moderada",
    mech: "Aditivo de toxicidade tendinosa.",
    eff: "Tendinite, rotura tendínea (especialmente aquiliana, em idosos).",
    act: "Evitar em >60a. Informar doente; suspender se dor tendínea."
  },

  // ESTATINAS
  {
    a: [...CL.ESTATINAS], b: ["Gemfibrozil"],
    s: "major",
    mech: "Inibição OATP1B1 e glucuronidação.",
    eff: "Rabdomiólise.",
    act: "Combinação não recomendada. Se fibrato necessário: fenofibrato."
  },
  {
    a: [...CL.ESTATINAS_CYP3A4], b: ["Diltiazem","Verapamilo","Amiodarona"],
    s: "moderada",
    mech: "Inibição CYP3A4 moderada.",
    eff: "↑ Risco miopatia.",
    act: "Sinvastatina: máximo 20 mg/d com amiodarona/verapamilo, 10 mg/d com diltiazem. Considerar trocar para rosuvastatina."
  },
  {
    a: [...CL.ESTATINAS_CYP3A4], b: ["Sumo de toranja"],
    s: "moderada",
    mech: "Inibição CYP3A4 intestinal.",
    eff: "↑ Estatina, miopatia.",
    act: "Evitar consumo regular de sumo de toranja."
  },

  // BETA-BLOQ + ANTAGONISTAS CÁLCIO NÃO-DHP
  {
    a: ["Bisoprolol","Carvedilol","Atenolol","Metoprolol","Propranolol","Nebivolol"], b: ["Verapamilo","Diltiazem"],
    s: "major",
    mech: "Inotropismo e cronotropismo negativos aditivos.",
    eff: "Bradicardia grave, BAV, IC.",
    act: "Evitar associação por via EV. Oral apenas com monitorização e em casos seleccionados."
  },

  // IECA/ARA + POUPADORES K
  {
    a: [...CL.IECA, ...CL.ARA], b: [...CL.POUPADORES_K, "Sacubitril + Valsartan"],
    s: "moderada",
    mech: "Aditivo de retenção K+.",
    eff: "Hipercaliemia.",
    act: "Monitorizar K+ e creatinina (basal, 1-2 sem, periodicamente)."
  },
  {
    a: [...CL.IECA], b: [...CL.ARA],
    s: "major",
    mech: "Duplo bloqueio SRAA.",
    eff: "Hipotensão, hipercaliemia, LRA.",
    act: "Não recomendado (exceções raras em nefrologia, com supervisão)."
  },
  {
    a: [...CL.IECA], b: ["Sacubitril + Valsartan"],
    s: "major",
    mech: "↑ Risco angioedema.",
    eff: "Angioedema potencialmente fatal.",
    act: "Suspender IECA ≥36h antes de iniciar sacubitril/valsartan."
  },

  // ERVA DE SÃO JOÃO
  {
    a: ["Erva de São João"], b: [...CL.ISRS, ...CL.IRSN, ...CL.TRIPTANOS, "Tramadol"],
    s: "major",
    mech: "Efeito serotoninérgico aditivo.",
    eff: "Síndrome serotoninérgica.",
    act: "Evitar associação."
  },
  {
    a: ["Erva de São João"], b: [...CL.DOACs, ...CL.ESTATINAS, "Ciclosporina","Tacrolimus","Digoxina","Anticonceptivo oral","Tamoxifeno","Imatinib"],
    s: "major",
    mech: "Indução CYP3A4 e P-gp.",
    eff: "↓ Eficácia do co-fármaco.",
    act: "Evitar Erva de São João."
  },

  // ALOPURINOL
  {
    a: ["Alopurinol"], b: [...CL.IECA],
    s: "moderada",
    mech: "Mecanismo imuno-mediado.",
    eff: "↑ Risco hipersensibilidade, leucopenia (sobretudo captopril).",
    act: "Vigiar reacções cutâneas."
  },

  // BENZODIAZEPINAS + OPIOIDES
  {
    a: ["Diazepam","Lorazepam","Alprazolam","Bromazepam","Midazolam","Zolpidem","Zopiclona"], b: ["Tramadol","Morfina","Fentanilo","Oxicodona","Codeína","Tapentadol","Metadona","Buprenorfina"],
    s: "major",
    mech: "Depressão SNC aditiva.",
    eff: "Depressão respiratória, sedação profunda, morte.",
    act: "Black box FDA. Evitar combinação. Se necessária: doses mínimas e duração curta."
  },

  // COLCHICINA
  {
    a: ["Colchicina"], b: [...CL.AZOIS, "Ciclosporina","Verapamilo","Diltiazem","Ritonavir"],
    s: "major",
    mech: "Inibição P-gp e CYP3A4.",
    eff: "Toxicidade colchicina potencialmente fatal.",
    act: "Reduzir colchicina drasticamente. Em IR/IH: contra-indicado."
  },

  // AMIODARONA / ANTIARRÍTMICOS
  {
    a: ["Amiodarona","Dronedarona","Sotalol"], b: ["Bisoprolol","Carvedilol","Atenolol","Metoprolol","Propranolol","Nebivolol"],
    s: "moderada",
    mech: "Aditivo cronotrópico negativo.",
    eff: "Bradicardia, BAV.",
    act: "Vigiar FC e ECG. Reduzir dose se necessário."
  },
  {
    a: ["Amiodarona"], b: [...CL.QUINOLONAS],
    s: "major",
    mech: "QT aditivo.",
    eff: "Torsade de pointes.",
    act: "Evitar (especialmente moxifloxacina). Preferir outro antibiótico."
  },

  // NIFEDIPINA / DIIDROPIRIDINAS
  {
    a: ["Amlodipina","Nifedipina","Lercanidipina"], b: ["Sumo de toranja"],
    s: "moderada",
    mech: "Inibição CYP3A4 intestinal.",
    eff: "↑ Hipotensão, edema.",
    act: "Evitar consumo regular (especialmente felodipina, nifedipina)."
  },
  {
    a: ["Amlodipina","Nifedipina","Lercanidipina"], b: [...CL.INIBIDORES_CYP3A4_FORTES],
    s: "moderada",
    mech: "Inibição CYP3A4.",
    eff: "Hipotensão.",
    act: "Vigiar TA. Considerar reduzir dose."
  },

  // INSULINA / ANTIDIABÉTICOS + BETA-BLOQ
  {
    a: ["Insulina", ...CL.SULFONILUREIAS, "Repaglinida"], b: ["Bisoprolol","Carvedilol","Atenolol","Metoprolol","Propranolol","Nebivolol"],
    s: "moderada",
    mech: "Beta-bloqueio mascara sintomas adrenérgicos de hipoglicemia (tremor, taquicardia); sudorese preservada.",
    eff: "Hipoglicemia não reconhecida pelo doente.",
    act: "Educar doente: vigiar sudorese e sintomas neuroglicopénicos. Preferir cardioselectivos (bisoprolol, metoprolol)."
  },

  // METOCLOPRAMIDA / DOMPERIDONA
  {
    a: ["Metoclopramida"], b: [...CL.ANTIPSICOTICOS, ...CL.ISRS],
    s: "moderada",
    mech: "Adição de bloqueio dopaminérgico / efeito serotoninérgico.",
    eff: "Sintomas extrapiramidais, síndrome neuroléptico maligno (raro).",
    act: "Evitar uso prolongado. Limite 5 dias."
  },
  {
    a: ["Domperidona"], b: [...CL.AZOIS, ...CL.MACROLIDOS, ...CL.ANTIARRITMICOS_QT],
    s: "major",
    mech: "Inibição CYP3A4 + QT aditivo.",
    eff: "Prolongamento QT, arritmia.",
    act: "Domperidona contra-indicada com inibidores CYP3A4 fortes e em prolongamento QT. EMA limitou indicações."
  },

  // CEFTRIAXONA
  {
    a: ["Ceftriaxona"], b: ["Cálcio"],
    s: "major",
    mech: "Precipitação ceftriaxona-cálcio.",
    eff: "Precipitados pulmonares e renais (descritos casos fatais em neonatos).",
    act: "Não administrar simultaneamente por via EV. Em adultos: separar e usar linhas diferentes."
  },

  // TENOFOVIR
  {
    a: ["Tenofovir"], b: [...CL.AINE],
    s: "moderada",
    mech: "Nefrotoxicidade aditiva (tubulopatia proximal).",
    eff: "↑ Risco LRA, síndrome Fanconi.",
    act: "Vigiar creatinina e proteinúria."
  },
  {
    a: ["Tenofovir"], b: ["Diclofenac"],
    s: "major",
    mech: "Tubulopatia aditiva.",
    eff: "LRA aguda.",
    act: "Evitar."
  },

  // CAPECITABINA
  {
    a: ["Capecitabina"], b: [...CL.AVK],
    s: "major",
    mech: "Inibição CYP2C9 + efeito desconhecido.",
    eff: "↑ INR marcado, hemorragia (descrito tardiamente, até 1 mês após início).",
    act: "Monitorizar INR semanalmente."
  },

  // AZATIOPRINA / MICOFENOLATO
  {
    a: ["Micofenolato"], b: [...CL.IBPs, ...CL.CATIOES_QUELANTES],
    s: "moderada",
    mech: "↓ Absorção (IBPs reduzem activação do mofetil; antiácidos quelam).",
    eff: "↓ Exposição micofenolato → risco rejeição.",
    act: "Separar antiácidos ≥2h. Vigiar com IBP."
  },

  // TAMOXIFENO
  {
    a: ["Tamoxifeno"], b: ["Paroxetina","Fluoxetina","Bupropiona","Cinacalcet"],
    s: "major",
    mech: "Inibição CYP2D6 ↓ conversão em endoxifeno (metabolito activo).",
    eff: "↓ Eficácia antitumoral.",
    act: "Preferir sertralina, escitalopram ou venlafaxina."
  },

  // ALOPURINOL + VARFARINA
  {
    a: ["Alopurinol"], b: ["Varfarina"],
    s: "moderada",
    mech: "Inibição metabolismo varfarina.",
    eff: "↑ INR.",
    act: "Monitorizar INR."
  },

  // IMATINIB
  {
    a: ["Imatinib","Erlotinib"], b: [...CL.INIBIDORES_CYP3A4_FORTES],
    s: "major",
    mech: "Inibição CYP3A4 → ↑ exposição TKI.",
    eff: "Toxicidade hematológica e GI.",
    act: "Evitar associação ou reduzir TKI."
  },
  {
    a: ["Imatinib","Erlotinib"], b: [...CL.IBPs],
    s: "moderada",
    mech: "↑ pH gástrico ↓ absorção erlotinib.",
    eff: "↓ Eficácia (sobretudo erlotinib).",
    act: "Evitar IBP com erlotinib. Considerar anti-H2 espaçado."
  },

  // ========== REGRAS ADICIONAIS ==========

  // VANCOMICINA + CONTRASTE
  {
    a: ["Vancomicina"], b: ["Contraste iodado"],
    s: "major",
    mech: "Nefrotoxicidade aditiva.",
    eff: "↑ Risco LRA, sobretudo em doentes com função renal limítrofe.",
    act: "Separar no tempo, hidratar adequadamente antes e após contraste."
  },

  // COLISTINA + NEFROTÓXICOS
  {
    a: ["Colistina"], b: ["Vancomicina"],
    s: "major",
    mech: "Nefrotoxicidade severa aditiva.",
    eff: "LRA grave.",
    act: "Evitar. Se necessário: monitorizar função renal rigorosamente, hidratar."
  },
  {
    a: ["Colistina"], b: [...CL.AMINOGLICOSIDEOS],
    s: "major",
    mech: "Nefrotoxicidade severa aditiva.",
    eff: "LRA grave.",
    act: "Evitar. Se necessário: monitorizar função renal rigorosamente."
  },

  // METOTREXATO + IBPs
  {
    a: ["Metotrexato"], b: [...CL.IBPs],
    s: "major",
    mech: "↓ Excreção renal MTX por inibição de transportadores renais.",
    eff: "Toxicidade MTX (mielossupressão, mucosite).",
    act: "Monitorizar. Suspender IBP se possível durante MTX em alta dose."
  },

  // AMIODARONA + FENITOÍNA
  {
    a: ["Amiodarona"], b: ["Fenitoína"],
    s: "major",
    mech: "Toxicidade bidirecional: amiodarona ↑ fenitoína (CYP2C9), fenitoína ↓ amiodarona (CYP3A4).",
    eff: "Toxicidade fenitoína (ataxia, nistagmo) e/ou ↓ eficácia amiodarona.",
    act: "Monitorizar níveis de ambos os fármacos."
  },

  // AMOXICILINA + ALOPURINOL (rash)
  {
    a: ["Amoxicilina","Amoxicilina + Ácido clavulânico"], b: ["Alopurinol"],
    s: "minor",
    mech: "Mecanismo não completamente esclarecido; possível reação imunológica facilitada.",
    eff: "Rash cutâneo (não alérgico) — pode ser confundido com alergia a penicilina.",
    act: "Informar doente. Não é verdadeira alergia. Não contraindica uso futuro de penicilinas."
  },

  // FOSFOMICINA + METOCLOPRAMIDA
  {
    a: ["Fosfomicina"], b: ["Metoclopramida"],
    s: "moderada",
    mech: "Metoclopramida ↑ trânsito GI → ↓ absorção oral de fosfomicina.",
    eff: "↓ Níveis séricos de fosfomicina → possível falência terapêutica.",
    act: "Não administrar simultaneamente. Separar mínimo 2h."
  },

  // NITROFURANTOÍNA
  {
    a: ["Nitrofurantoína"], b: ["Hidróxido de alumínio + magnésio","Magnésio"],
    s: "moderada",
    mech: "Antiácidos com magnésio ↓ absorção de nitrofurantoína.",
    eff: "↓ Eficácia antibiótica.",
    act: "Separar administração mínimo 2h."
  },
  {
    a: ["Nitrofurantoína"], b: ["Probenecide"],
    s: "moderada",
    mech: "Probenecide ↓ secreção tubular renal de nitrofurantoína.",
    eff: "↓ Concentração urinária (local de ação) e ↑ toxicidade sistémica.",
    act: "Evitar combinação."
  },

  // CIPROFLOXACINA + SULFONILUREIAS
  {
    a: ["Ciprofloxacina"], b: [...CL.SULFONILUREIAS],
    s: "moderada",
    mech: "Mecanismo não completamente esclarecido; possível efeito sobre células beta pancreáticas.",
    eff: "Hipo ou hiperglicemia imprevisível.",
    act: "Monitorizar glicemia. Informar doente sobre sinais de hipoglicemia."
  },

  // HIDROXIZINA + QT
  {
    a: ["Hidroxizina"], b: [...CL.ANTIARRITMICOS_QT, ...CL.ANTIPSICOTICOS_QT, ...CL.QUINOLONAS, ...CL.MACROLIDOS],
    s: "moderada",
    mech: "QT aditivo (hidroxizina tem efeito QT dose-dependente).",
    eff: "Prolongamento QT.",
    act: "Precaução. Evitar doses altas de hidroxizina. ECG se múltiplos factores de risco."
  },

  // CARBAMAZEPINA + FENITOÍNA
  {
    a: ["Carbamazepina"], b: ["Fenitoína"],
    s: "moderada",
    mech: "Interação bidirecional e imprevisível: ambos são indutores e substratos enzimáticos.",
    eff: "Níveis de ambos alterados — toxicidade ou sub-terapêutica.",
    act: "Monitorizar níveis séricos de ambos os fármacos."
  },

  // BUPROPIONA + ISRS
  {
    a: ["Bupropiona"], b: [...CL.ISRS],
    s: "moderada",
    mech: "Adição de efeito serotoninérgico + ↓ limiar convulsivo.",
    eff: "Síndrome serotoninérgica moderada. ↑ Risco convulsões.",
    act: "Precaução. Monitorizar sintomas serotoninérgicos. Dose mínima eficaz."
  },

  // LÍTIO + TEOFILINA
  {
    a: ["Lítio"], b: ["Teofilina"],
    s: "moderada",
    mech: "Teofilina ↑ excreção renal do lítio.",
    eff: "↓ Níveis lítio → perda de eficácia terapêutica.",
    act: "Ajustar dose de lítio. Monitorizar litemia."
  },

  // BETA-BLOQ NÃO SELETIVOS + BRONCODILATADORES
  {
    a: [...CL.BETA_BLOQ_NAO_SELET], b: [...CL.BRONCODILATADORES_B2],
    s: "moderada",
    mech: "Antagonismo farmacológico: beta-bloqueio não seletivo anula o efeito beta-2 broncodilatador.",
    eff: "Broncoespasmo em doentes asmáticos ou com DPOC.",
    act: "Evitar beta-bloqueantes não seletivos em asma/DPOC. Preferir cardioseletivos (bisoprolol, metoprolol)."
  },

  // CORTICOIDES + ANTIDIABÉTICOS
  {
    a: [...CL.CORTICOIDES], b: [...CL.ANTIDIABETICOS_HIPO, "Metformina"],
    s: "moderada",
    mech: "Corticoides ↑ neoglucogénese e ↑ resistência à insulina.",
    eff: "Hiperglicemia. Descompensação diabética.",
    act: "Monitorizar glicemia. Ajustar dose de antidiabético. Considerar insulina temporária."
  },

  // MICOFENOLATO + RIFAMPICINA
  {
    a: ["Micofenolato"], b: ["Rifampicina"],
    s: "moderada",
    mech: "Indução enzimática ↓ níveis de micofenolato ~50%.",
    eff: "↓ Imunossupressão → risco rejeição de transplante.",
    act: "Evitar. Se inevitável: monitorizar níveis e ajustar dose."
  },

  // ÁLCOOL + PARACETAMOL
  {
    a: ["Álcool"], b: ["Paracetamol"],
    s: "moderada",
    mech: "Álcool crónico induz CYP2E1 → ↑ metabolito hepatotóxico (NAPQI) do paracetamol.",
    eff: "Hepatotoxicidade.",
    act: "Não ultrapassar 2 g/dia em alcoólicos crónicos. Informar doente."
  },

  // ÁLCOOL + DEPRESSORES SNC
  {
    a: ["Álcool"], b: [...CL.OPIOIDES_TODOS, ...CL.BENZODIAZEPINAS, ...CL.ANTIPSICOTICOS, "Hidroxizina"],
    s: "moderada",
    mech: "Depressão SNC aditiva.",
    eff: "Sedação excessiva, depressão respiratória.",
    act: "Evitar. Informar doente sobre risco."
  },

  // COLESTIRAMINA
  {
    a: ["Colestiramina"], b: [...CL.AVK, "Levotiroxina","Digoxina",...CL.ESTATINAS,...CL.DOACs,"Micofenolato","Paracetamol"],
    s: "moderada",
    mech: "Quelação / adsorção de fármacos no lúmen intestinal → ↓ absorção.",
    eff: "↓ Eficácia do co-fármaco.",
    act: "Separar todos os fármacos orais pelo menos 4h da colestiramina (1h antes ou 4-6h depois)."
  },

  // IBPs + FERRO
  {
    a: [...CL.IBPs], b: ["Ferro"],
    s: "moderada",
    mech: "↑ pH gástrico ↓ solubilidade do ferro não-heme → ↓ absorção.",
    eff: "↓ Absorção ferro → anemia ferropénica refractária.",
    act: "Tomar ferro 30 min antes do IBP, ou em jejum. Considerar ferro IV se refractário."
  },

  // METOCLOPRAMIDA + LEVODOPA
  {
    a: ["Metoclopramida"], b: ["Levodopa"],
    s: "moderada",
    mech: "Antagonismo dopaminérgico central.",
    eff: "↓ Eficácia levodopa. Agravamento sintomas parkinsónicos.",
    act: "Evitar em doentes parkinsónicos. Preferir domperidona (não cruza BHE)."
  },

  // CONTRACEPTIVOS + ANTIBIÓTICOS LARGO ESPECTRO (minor)
  {
    a: ["Anticonceptivo oral"], b: ["Amoxicilina","Amoxicilina + Ácido clavulânico","Cefalexina","Cefuroxima","Cefixima","Doxiciclina"],
    s: "minor",
    mech: "Hipótese (controversa): alteração flora intestinal → ↓ recirculação entero-hepática de etinilestradiol.",
    eff: "Possível ↓ eficácia contraceptiva (evidência fraca).",
    act: "Informar. Não é indicação formal para método adicional (excepto rifampicina e antiepilépticos indutores, que são major)."
  },
];

export function normalize(s: string): string {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .trim();
}

export function searchDrugs(q: string): Drug[] {
  if (!q || q.length < 2) return [];
  const nq = normalize(q);
  const matches: { drug: Drug; score: number }[] = [];
  for (const d of DRUGS) {
    const nname = normalize(d.n);
    if (nname.includes(nq)) {
      matches.push({ drug: d, score: nname.startsWith(nq) ? 0 : 1 });
      continue;
    }
    if (d.a) {
      for (const alias of d.a) {
        if (normalize(alias).includes(nq)) {
          matches.push({ drug: d, score: 2 });
          break;
        }
      }
    }
  }
  matches.sort((x, y) => x.score - y.score);
  return matches.slice(0, 8).map(m => m.drug);
}

export function findInteractions(drugs: string[]): Interaction[] {
  const found: Interaction[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const d1 = drugs[i]!;
      const d2 = drugs[j]!;
      for (const rule of RULES) {
        const inA1 = rule.a.includes(d1);
        const inB1 = rule.b.includes(d1);
        const inA2 = rule.a.includes(d2);
        const inB2 = rule.b.includes(d2);
        if ((inA1 && inB2) || (inA2 && inB1)) {
          const pairA = (inA1 && inB2) ? d1 : d2;
          const pairB = (inA1 && inB2) ? d2 : d1;
          const key = [pairA, pairB, rule.s, rule.mech].sort().join("|");
          if (seen.has(key)) continue;
          seen.add(key);
          found.push({ a: pairA, b: pairB, s: rule.s, mech: rule.mech, eff: rule.eff, act: rule.act });
        }
      }
    }
  }
  const order: Record<Severity, number> = { major: 0, moderada: 1, minor: 2 };
  found.sort((x, y) => order[x.s] - order[y.s]);
  return found;
}
