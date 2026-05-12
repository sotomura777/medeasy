export type TagColor =
  | 'blue' | 'amber' | 'green' | 'red' | 'purple' | 'teal';

export interface Tag {
  texto: string;
  cor: TagColor;
}

export interface TabContent {
  id: string;
  label: string;
  html: string;
}

export interface Fonte {
  titulo: string;
  url?: string;
  data_consulta?: string;
}

export interface Patologia {
  id: string;
  titulo: string;
  icone: string;
  tags: Tag[];
  tabs: TabContent[];
  fontes?: Fonte[];
  revisado_em?: string;
  revisado_por?: string;
  categorias?: string[];
}

export interface Abreviatura {
  sigla: string;
  significado: string;
  seccao?: string;
}

export type ModuleStatus = 'available' | 'soon';

export interface AppModule {
  id: string;
  nome: string;
  emoji: string;
  descricao: string;
  status: ModuleStatus;
  rota?: string;
}
