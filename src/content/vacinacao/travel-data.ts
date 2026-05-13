export interface TravelVaccine {
  name: string;
  brand: string;
  priority: 'required' | 'essential' | 'recommended' | 'specific';
  info: string;
}

export interface TravelRegion {
  name: string;
  sub: string;
  color: string;
  vaccines: TravelVaccine[];
}

export const TRAVEL_DATA: Record<string, TravelRegion> = {
  namerica: {
    name: 'America do Norte',
    sub: 'EUA, Canada, Mexico (zonas urbanas)',
    color: '#c9e3d2',
    vaccines: [
      { name: 'PNV atualizado', brand: '', priority: 'essential', info: 'Garantir reforcos do PNV em dia (Td, VASPR, gripe sazonal). Em geral, baixo risco infecioso adicional.' },
      { name: 'Vacina contra a gripe', brand: 'Influvac Tetra® · Vaxigrip Tetra®', priority: 'recommended', info: 'Dose anual, especialmente entre outubro e marco. Considerar em todos os viajantes ≥ 6 meses.' },
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'specific', info: 'Em zonas rurais ou contacto proximo com populacao local. 2 doses (0, 6–12 meses).' },
      { name: 'Vacina contra a raiva (pre-exposicao)', brand: 'Verorab® · Rabipur®', priority: 'specific', info: 'Apenas em viagens prolongadas a zonas remotas, espeleologia ou contacto com animais (Mexico rural).' },
    ],
  },
  samerica: {
    name: 'America Central e do Sul',
    sub: 'Brasil, Peru, Bolivia, Equador, Colombia, Venezuela, America Central',
    color: '#ffd6a5',
    vaccines: [
      { name: 'Vacina contra a febre amarela', brand: 'Stamaril®', priority: 'essential', info: '<strong>Dose unica ≥ 10 dias antes da viagem.</strong> Endemica em toda a Amazonia e zonas tropicais. Obrigatoria para entrada em varios paises. CVI autorizado.' },
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'essential', info: 'Risco elevado em toda a regiao. 2 doses (0, 6–12 meses). Ou combinada com Hep B (Twinrix®).' },
      { name: 'Vacina contra a febre tifoide', brand: 'Typhim Vi® · Vivotif®', priority: 'recommended', info: 'Risco em zonas rurais e contacto proximo com populacao local. 1 dose IM ou 3 capsulas orais.' },
      { name: 'Vacina contra a raiva (pre-exposicao)', brand: 'Verorab® · Rabipur®', priority: 'specific', info: 'Viagens prolongadas, zonas remotas, contacto com animais (caes, morcegos, primatas). 3 doses IM.' },
      { name: 'Vacina contra colera', brand: 'Dukoral®', priority: 'specific', info: 'Em zonas com surtos ativos ou viagens com risco aumentado. Util tambem contra diarreia do viajante por LT-ETEC.' },
      { name: 'Profilaxia da malaria', brand: '(quimioprofilaxia, nao vacina)', priority: 'specific', info: 'Nao existe vacina disponivel. Quimioprofilaxia (atovaquona-proguanil, doxiciclina ou mefloquina) em zonas endemicas. Repelentes + mosquiteiro.' },
    ],
  },
  europe: {
    name: 'Europa',
    sub: 'Uniao Europeia, Reino Unido, Balcas, Europa de Leste',
    color: '#b8d4e8',
    vaccines: [
      { name: 'PNV atualizado', brand: '', priority: 'essential', info: 'Verificar Td, VASPR e gripe sazonal. Baixo risco infecioso adicional em geral.' },
      { name: 'Vacina contra encefalite por carraca (TBE)', brand: 'FSME-Immun® · Encepur®', priority: 'specific', info: 'Austria, Alemanha, Suica, paises balticos, Escandinavia rural, Europa de Leste, Siberia. Endemica entre primavera e outono. 3 doses (esquema acelerado disponivel).' },
      { name: 'Vacina contra a raiva (pre-exposicao)', brand: 'Verorab® · Rabipur®', priority: 'specific', info: 'Europa de Leste rural, contacto com animais selvagens. Considerar em estadias prolongadas.' },
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'specific', info: 'Europa de Leste e Balcas em viagens de longa duracao ou contacto proximo com populacao local.' },
    ],
  },
  'africa-north': {
    name: 'Norte de Africa',
    sub: 'Marrocos, Argelia, Tunisia, Libia, Egito',
    color: '#ffcaa7',
    vaccines: [
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'essential', info: 'Risco elevado em toda a regiao. 2 doses (0, 6–12 meses).' },
      { name: 'Vacina contra a febre tifoide', brand: 'Typhim Vi® · Vivotif®', priority: 'recommended', info: 'Recomendada para a maioria dos viajantes, especialmente fora dos resorts turisticos.' },
      { name: 'Vacina contra hepatite B', brand: 'Engerix B® · HBVaxPro®', priority: 'recommended', info: 'Em estadias prolongadas, contacto sexual, procedimentos medicos. Ou combinada (Twinrix®).' },
      { name: 'Vacina contra a raiva (pre-exposicao)', brand: 'Verorab® · Rabipur®', priority: 'specific', info: 'Contacto com animais (caes errantes frequentes). 3 doses IM.' },
      { name: 'Vacina contra a poliomielite', brand: '(VIP)', priority: 'specific', info: 'Reforco unico de adulto se Egito, Sudao ou regioes fronteiricas. Verificar surtos ativos.' },
    ],
  },
  'africa-sub': {
    name: 'Africa Subsariana',
    sub: 'Senegal, Costa do Marfim, Gana, Nigeria, Quenia, Tanzania, Africa do Sul, Mocambique, Angola, Cabo Verde, etc.',
    color: '#ff9b6b',
    vaccines: [
      { name: 'Vacina contra a febre amarela', brand: 'Stamaril®', priority: 'required', info: '<strong>OBRIGATORIA</strong> para entrada na maioria dos paises desta regiao. Dose unica ≥ 10 dias antes. Cinturao endemico. Apresentar Certificado Internacional de Vacinacao (cartao amarelo).' },
      { name: 'Vacina meningococica ACWY', brand: 'Nimenrix® · MenQuadfi®', priority: 'essential', info: 'Cinturao da meningite (Sahel: Senegal a Etiopia), sobretudo dezembro–junho. Dose unica.' },
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'essential', info: 'Risco muito elevado. 2 doses (0, 6–12 meses). Combinada com Hep B (Twinrix®) e pratica.' },
      { name: 'Vacina contra a febre tifoide', brand: 'Typhim Vi® · Vivotif®', priority: 'essential', info: 'Risco muito elevado em zonas rurais e urbanas. 1 dose IM ou 3 capsulas orais.' },
      { name: 'Vacina contra hepatite B', brand: 'Engerix B® · HBVaxPro®', priority: 'recommended', info: 'Prevalencia elevada. Em estadias prolongadas, profissionais de saude, contactos proximos.' },
      { name: 'Vacina contra a raiva (pre-exposicao)', brand: 'Verorab® · Rabipur®', priority: 'recommended', info: 'Caes e morcegos endemicos. Acesso pos-exposicao muitas vezes limitado. 3 doses IM.' },
      { name: 'Vacina contra colera', brand: 'Dukoral®', priority: 'specific', info: 'Surtos frequentes em zonas com acesso limitado a agua potavel. Tambem protege contra LT-ETEC.' },
      { name: 'Profilaxia da malaria', brand: '(quimioprofilaxia, nao vacina)', priority: 'essential', info: 'Endemica em quase toda a regiao. Quimioprofilaxia obrigatoria + repelentes + mosquiteiro impregnado.' },
    ],
  },
  'asia-central': {
    name: 'Asia Central',
    sub: 'Cazaquistao, Uzbequistao, Turquemenistao, Tajiquistao, Quirguistao, Mongolia',
    color: '#d4b6e5',
    vaccines: [
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'essential', info: 'Risco elevado. 2 doses (0, 6–12 meses).' },
      { name: 'Vacina contra a febre tifoide', brand: 'Typhim Vi® · Vivotif®', priority: 'recommended', info: 'Zonas rurais e contacto proximo com populacao local.' },
      { name: 'Vacina contra hepatite B', brand: 'Engerix B® · HBVaxPro®', priority: 'recommended', info: 'Em estadias prolongadas ou contactos proximos.' },
      { name: 'Vacina contra encefalite por carraca (TBE)', brand: 'FSME-Immun® · Encepur®', priority: 'specific', info: 'Endemica em zonas florestais; transmissao entre primavera e outono.' },
      { name: 'Vacina contra a raiva (pre-exposicao)', brand: 'Verorab® · Rabipur®', priority: 'specific', info: 'Animais selvagens e caes errantes; acesso pos-exposicao limitado.' },
    ],
  },
  'asia-south': {
    name: 'Sul da Asia',
    sub: 'India, Paquistao, Bangladesh, Sri Lanka, Nepal, Butao, Maldivas',
    color: '#c8a4d8',
    vaccines: [
      { name: 'Vacina contra a febre tifoide', brand: 'Typhim Vi® · Vivotif®', priority: 'essential', info: '<strong>Risco mais elevado do mundo</strong>. Recomendada a todos os viajantes para a regiao.' },
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'essential', info: 'Risco muito elevado em toda a regiao. 2 doses (0, 6–12 meses).' },
      { name: 'Vacina contra hepatite B', brand: 'Engerix B® · HBVaxPro®', priority: 'recommended', info: 'Prevalencia elevada. Combinada com Hep A (Twinrix®) e pratica.' },
      { name: 'Vacina contra a raiva (pre-exposicao)', brand: 'Verorab® · Rabipur®', priority: 'recommended', info: 'India e o pais com mais mortes por raiva no mundo. Recomendada a todos os viajantes prolongados.' },
      { name: 'Vacina contra encefalite japonesa', brand: 'Ixiaro®', priority: 'specific', info: 'Areas rurais com arrozais, estadias > 4 semanas durante epoca de transmissao (maio–outubro). 2 doses (0, 28 dias).' },
      { name: 'Vacina contra colera', brand: 'Dukoral®', priority: 'specific', info: 'Bangladesh, India, Nepal — em zonas com surtos ativos. Tambem contra LT-ETEC.' },
      { name: 'Profilaxia da malaria', brand: '(quimioprofilaxia, nao vacina)', priority: 'specific', info: 'Endemica em zonas rurais. Avaliar destino especifico.' },
    ],
  },
  'asia-se': {
    name: 'Sudeste Asiatico',
    sub: 'Tailandia, Vietname, Camboja, Laos, Myanmar, Malasia, Indonesia, Filipinas, Singapura',
    color: '#f4a8c9',
    vaccines: [
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'essential', info: 'Risco elevado em toda a regiao. 2 doses (0, 6–12 meses).' },
      { name: 'Vacina contra a febre tifoide', brand: 'Typhim Vi® · Vivotif®', priority: 'essential', info: 'Risco elevado, especialmente fora de centros urbanos turisticos.' },
      { name: 'Vacina contra encefalite japonesa', brand: 'Ixiaro®', priority: 'recommended', info: 'Endemica. Recomendada em estadias > 4 semanas em zonas rurais durante epoca de transmissao. 2 doses (0, 28 dias).' },
      { name: 'Vacina contra hepatite B', brand: 'Engerix B® · HBVaxPro®', priority: 'recommended', info: 'Prevalencia elevada de hepatite B na regiao.' },
      { name: 'Vacina contra a raiva (pre-exposicao)', brand: 'Verorab® · Rabipur®', priority: 'recommended', info: 'Endemica. Caes, morcegos e macacos representam risco elevado.' },
      { name: 'Vacina contra colera', brand: 'Dukoral®', priority: 'specific', info: 'Filipinas, Indonesia, Myanmar — em zonas com surtos ativos.' },
      { name: 'Profilaxia da malaria e dengue', brand: '(quimioprofilaxia / repelentes)', priority: 'specific', info: 'Malaria em zonas rurais; dengue urbana e rural (sem vacina universal). Repelentes essenciais.' },
    ],
  },
  'asia-east': {
    name: 'Asia Oriental',
    sub: 'China, Japao, Coreia do Sul, Coreia do Norte, Taiwan',
    color: '#e8b4dd',
    vaccines: [
      { name: 'PNV atualizado', brand: '', priority: 'essential', info: 'Garantir reforcos do PNV em dia, sobretudo VASPR e Td.' },
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'recommended', info: 'Risco intermedio. Recomendada na maioria das viagens a China e Coreia do Norte.' },
      { name: 'Vacina contra a febre tifoide', brand: 'Typhim Vi® · Vivotif®', priority: 'recommended', info: 'China rural, Coreia do Norte. Nao necessaria para Japao / Coreia do Sul urbanos.' },
      { name: 'Vacina contra hepatite B', brand: 'Engerix B® · HBVaxPro®', priority: 'recommended', info: 'Prevalencia elevada na China. Estadias prolongadas, contactos proximos.' },
      { name: 'Vacina contra encefalite japonesa', brand: 'Ixiaro®', priority: 'specific', info: 'China rural (arrozais), Japao rural em meses quentes (junho–setembro). 2 doses (0, 28 dias).' },
      { name: 'Vacina contra a raiva (pre-exposicao)', brand: 'Verorab® · Rabipur®', priority: 'specific', info: 'China e Coreia do Norte rural. Acesso pos-exposicao variavel.' },
    ],
  },
  oceania: {
    name: 'Oceania',
    sub: 'Australia, Nova Zelandia, Polinesia, Melanesia, Micronesia',
    color: '#a8d8c7',
    vaccines: [
      { name: 'PNV atualizado', brand: '', priority: 'essential', info: 'Australia e Nova Zelandia: garantir reforcos do PNV. Baixo risco infecioso adicional.' },
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'specific', info: 'Recomendada em viagens a ilhas do Pacifico (Papua-Nova Guine, Fiji, Vanuatu, Samoa).' },
      { name: 'Vacina contra a febre tifoide', brand: 'Typhim Vi® · Vivotif®', priority: 'specific', info: 'Papua-Nova Guine, ilhas do Pacifico em zonas rurais.' },
      { name: 'Vacina contra encefalite japonesa', brand: 'Ixiaro®', priority: 'specific', info: 'Papua-Nova Guine, Estreito de Torres (Australia do norte). Estadias prolongadas em zonas rurais.' },
      { name: 'Profilaxia da malaria e dengue', brand: '(quimioprofilaxia / repelentes)', priority: 'specific', info: 'Papua-Nova Guine, Ilhas Salomao, Vanuatu. Dengue em surtos em varias ilhas.' },
    ],
  },
  meca: {
    name: 'Peregrinacao a Meca',
    sub: 'Hajj e Umrah · Arabia Saudita',
    color: '#f6d365',
    vaccines: [
      { name: 'Vacina meningococica ACWY', brand: 'Nimenrix® · MenQuadfi®', priority: 'required', info: '<strong>OBRIGATORIA para emissao do visto Hajj/Umrah.</strong> Dose unica ≥ 10 dias e ≤ 3 anos antes da chegada. Comprovativo de vacinacao exigido nas fronteiras.' },
      { name: 'Vacina contra a gripe sazonal', brand: 'Influvac Tetra® · Vaxigrip Tetra®', priority: 'essential', info: '<strong>Exigida pelas autoridades sauditas</strong> a todos os peregrinos. Multidoes em ambiente fechado favorecem transmissao.' },
      { name: 'Vacina contra a poliomielite', brand: '(VIP)', priority: 'required', info: 'Para peregrinos provenientes de paises com transmissao ativa de poliovirus. Verificar requisitos atualizados.' },
      { name: 'Vacina contra a febre amarela', brand: 'Stamaril®', priority: 'required', info: 'Para peregrinos provenientes de paises com risco de febre amarela (cartao amarelo exigido na entrada).' },
      { name: 'Vacina contra hepatite A', brand: 'Havrix® · VAQTA® · Avaxim®', priority: 'recommended', info: 'Recomendada devido a aglomeracoes e condicoes sanitarias variaveis durante a peregrinacao.' },
      { name: 'Vacina contra hepatite B', brand: 'Engerix B® · HBVaxPro®', priority: 'recommended', info: 'Recomendada, especialmente para peregrinos com procedimentos de barbear (Hajj termina com tonsura).' },
      { name: 'Vacina contra COVID-19', brand: '(boosters atualizados)', priority: 'recommended', info: 'Verificar requisitos atuais das autoridades sauditas.' },
    ],
  },
};

export const REGION_LEGEND: { id: string; label: string; color: string }[] = [
  { id: 'namerica', label: 'America do Norte', color: '#c9e3d2' },
  { id: 'samerica', label: 'America Central e Sul', color: '#ffd6a5' },
  { id: 'europe', label: 'Europa', color: '#b8d4e8' },
  { id: 'africa-north', label: 'Norte de Africa', color: '#ffcaa7' },
  { id: 'africa-sub', label: 'Africa Subsariana', color: '#ff9b6b' },
  { id: 'asia-central', label: 'Asia Central', color: '#d4b6e5' },
  { id: 'asia-south', label: 'Sul da Asia', color: '#c8a4d8' },
  { id: 'asia-se', label: 'Sudeste Asiatico', color: '#f4a8c9' },
  { id: 'asia-east', label: 'Asia Oriental', color: '#e8b4dd' },
  { id: 'oceania', label: 'Oceania', color: '#a8d8c7' },
  { id: 'meca', label: 'Meca (Hajj/Umrah)', color: '#f6d365' },
];
