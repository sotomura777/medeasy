# Medeasy

Referência clínica rápida e organizada — protocolos, fármacos e notas, tudo em cartões.

PWA pensada para médicos no Ano Comum (internato) em Portugal. Funciona offline, instala-se no iPhone.

## Começar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` no browser.

## Build

```bash
npm run build
npm run preview   # testar o build localmente
```

## Estrutura

```
src/
├── routes/          Home, Urgência, Notas
├── components/      Componentes React por módulo
├── content/         Conteúdo curado (JSON) + schema TypeScript
├── store/           Zustand (notas com localStorage)
├── lib/             Utilitários (pesquisa Fuse.js, uid)
└── styles/          CSS puro (estética soft + clínica)
```

## Módulos

| Módulo | Estado | Descrição |
|---|---|---|
| Urgência | Disponível | 31 patologias com protocolos, fármacos e sinais de alarme |
| Notas & Dívidas | Disponível | Notas pessoais por especialidade (localStorage) |
| Antibioterapia | Em breve | Guia de antibióticos |
| Sintomas | Em breve | Diagnóstico diferencial |
| Neurologia | Em breve | Protocolos neurológicos |

## Stack

- React 19 + TypeScript + Vite
- Zustand (estado local persistido)
- Fuse.js (pesquisa fuzzy)
- DOMPurify (sanitização de HTML)
- vite-plugin-pwa (Workbox)
- CSS puro com custom properties

## Deploy

Preparado para Vercel — `npm run build` gera a pasta `dist/` com tudo incluído.

## Disclaimer

Medeasy é uma ferramenta educacional e de apoio entre pares. Não constitui dispositivo médico nem substitui o julgamento clínico.
