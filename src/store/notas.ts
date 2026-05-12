import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { uid } from '../lib/uid';

export interface Nota {
  id: string;
  nome: string;
  tag?: string;
  conteudo: string;
  criado_em: string;
  actualizado_em: string;
}

export interface Categoria {
  id: string;
  nome: string;
  emoji: string;
  sub?: string;
  bg: string;
  open: boolean;
  notas: Nota[];
}

interface NotasStore {
  categorias: Categoria[];
  addCategoria: (cat: { nome: string; emoji: string; sub?: string }) => void;
  updateCategoria: (id: string, patch: Partial<Pick<Categoria, 'nome' | 'emoji' | 'sub'>>) => void;
  removeCategoria: (id: string) => void;
  toggleCategoria: (id: string) => void;
  addNota: (catId: string, nota: { nome: string; tag?: string; conteudo: string }) => void;
  updateNota: (catId: string, notaId: string, patch: Partial<Pick<Nota, 'nome' | 'tag' | 'conteudo'>>) => void;
  removeNota: (catId: string, notaId: string) => void;
}

const BG_PALETTE = ['#E8EFF8', '#FFF3E0', '#E8F5E8', '#EDE9FF', '#FDECEA', '#D4F0E8'];

export const useNotasStore = create<NotasStore>()(
  persist(
    (set) => ({
      categorias: [],

      addCategoria: ({ nome, emoji, sub }) =>
        set((state) => ({
          categorias: [
            ...state.categorias,
            {
              id: uid(),
              nome,
              emoji: emoji || '📋',
              sub,
              bg: BG_PALETTE[state.categorias.length % BG_PALETTE.length] ?? '#E8EFF8',
              open: true,
              notas: [],
            },
          ],
        })),

      updateCategoria: (id, patch) =>
        set((state) => ({
          categorias: state.categorias.map((c) =>
            c.id === id ? { ...c, ...patch } : c,
          ),
        })),

      removeCategoria: (id) =>
        set((state) => ({
          categorias: state.categorias.filter((c) => c.id !== id),
        })),

      toggleCategoria: (id) =>
        set((state) => ({
          categorias: state.categorias.map((c) =>
            c.id === id ? { ...c, open: !c.open } : c,
          ),
        })),

      addNota: (catId, { nome, tag, conteudo }) =>
        set((state) => ({
          categorias: state.categorias.map((c) =>
            c.id === catId
              ? {
                  ...c,
                  notas: [
                    ...c.notas,
                    {
                      id: uid(),
                      nome,
                      tag,
                      conteudo,
                      criado_em: new Date().toISOString(),
                      actualizado_em: new Date().toISOString(),
                    },
                  ],
                }
              : c,
          ),
        })),

      updateNota: (catId, notaId, patch) =>
        set((state) => ({
          categorias: state.categorias.map((c) =>
            c.id === catId
              ? {
                  ...c,
                  notas: c.notas.map((n) =>
                    n.id === notaId
                      ? { ...n, ...patch, actualizado_em: new Date().toISOString() }
                      : n,
                  ),
                }
              : c,
          ),
        })),

      removeNota: (catId, notaId) =>
        set((state) => ({
          categorias: state.categorias.map((c) =>
            c.id === catId
              ? { ...c, notas: c.notas.filter((n) => n.id !== notaId) }
              : c,
          ),
        })),
    }),
    { name: 'medeasy_notas_v1' },
  ),
);
