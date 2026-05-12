import type { AppModule } from './schema';

export const modules: AppModule[] = [
  {
    id: 'urgencia',
    nome: 'Urgência',
    emoji: '🚨',
    descricao: 'Protocolos de tratamento por patologia com linhas terapêuticas, fármacos e sinais de alarme',
    status: 'available',
    rota: '/urgencia',
  },
  {
    id: 'antibio',
    nome: 'Antibioterapia',
    emoji: '💊',
    descricao: 'Guia de antibióticos por infecção, espectro e contexto clínico',
    status: 'soon',
  },
  {
    id: 'notas',
    nome: 'Notas & Dívidas',
    emoji: '📝',
    descricao: 'As tuas notas por especialidade — adiciona, edita e guarda tudo localmente',
    status: 'available',
    rota: '/notas',
  },
  {
    id: 'sintomas',
    nome: 'Sintomas',
    emoji: '🩺',
    descricao: 'Abordagem por sintoma — diagnóstico diferencial e orientação',
    status: 'soon',
  },
  {
    id: 'neuro',
    nome: 'Neurologia',
    emoji: '🧠',
    descricao: 'Protocolos neurológicos — em preparação',
    status: 'soon',
  },
];
