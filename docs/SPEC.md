# Medeasy — Especificação Técnica

> Documento de especificação completo para Claude Code (ou outro assistente) construir o MVP da app **Medeasy**.
> Versão 2.0 — alinhada com o mockup `medeasy.html`.

---

## 1. O produto

### Nome
**Medeasy**

### Tagline
Apoio rápido e visual ao internato — protocolos, fármacos e notas, organizados em cartões.

### Problema
Médicos no Ano Comum (primeiro ano de internato em Portugal) precisam de informação clínica rápida — diagnóstico, tratamento, doses — com o doente à frente. As alternativas existentes (UpToDate, Tonic, normas DGS em PDF) são demasiado densas, demasiado lentas, ou ambas. Resultado: tempo perdido, decisões com base em memória incompleta, fricção no fluxo clínico.

### Solução
Uma **PWA modular** organizada em cartões. Cada módulo cobre uma área (urgência, antibioterapia, notas pessoais, etc.). Dentro de cada módulo, conteúdo curado e estruturado em cartões pequenos — a unidade visual de toda a app. **Tudo é cartão.** Esta granularidade é a diferenciação face à Tonic ou UpToDate: legibilidade em segundos, não em parágrafos.

### Posicionamento
Ferramenta **educacional e de estudo entre pares**, não dispositivo médico oficial. Disclaimer claro no onboarding e rodapé. Esta posição reduz drasticamente o risco médico-legal e permite tom mais informal/prático nos conteúdos.

### Visão a 2 anos
Começar gratuito ou tip-based para construir adopção rápida na comunidade de internos portugueses. Eventual modelo B2B (licenças institucionais a ARS/hospitais) quando a base de utilizadores estiver consolidada. **No MVP, sem monetização.**

---

## 2. Modelo mental — tudo é cartão

A app inteira segue uma hierarquia consistente de cartões aninhados:

```
App (Home)
 └── Módulos (cartões na Home: Urgência, Antibioterapia, Notas...)
      └── Categorias (cartões dentro do módulo: patologias, especialidades...)
           └── Cartões de conteúdo (a unidade atómica de informação)
```

A diferença entre módulos é **quem cria o conteúdo** e **que tipo de cartões aparecem**:

| Módulo | Categorias criadas por | Cartões de conteúdo | Editável pelo utilizador |
|---|---|---|---|
| Urgência | Curadores (Sofia) | Drug cards, alerts, scores, alarme | Não (Fase 1) |
| Antibioterapia | Curadores (futuro) | Cards de antibiótico, espectro, contexto | Não |
| Notas | Utilizador | Notas livres | Sim, tudo |
| Sintomas | Curadores (futuro) | Diagnóstico diferencial, abordagem | Não |

**No futuro (Fase 3):** os utilizadores poderão sugerir cartões para módulos curados, e/ou partilhar publicamente cartões das suas Notas.

---

## 3. Decisões já tomadas

| Decisão | Escolha |
|---|---|
| Nome | **Medeasy** |
| Plataforma inicial | **PWA** (instalável no iPhone) |
| Plataforma futura | Wrapper Capacitor para App Store quando houver razão concreta |
| Stack frontend | **React 18 + Vite + TypeScript** |
| Estado local | **Zustand** com persist middleware |
| Persistência local Fase 1 | **localStorage** |
| Backend Fase 2+ | **Supabase** (Postgres, Auth, RLS, região Frankfurt) |
| Hosting | **Vercel** (deploy automático do GitHub) |
| Pesquisa | **Fuse.js** cliente-side |
| Offline | Service Worker via `vite-plugin-pwa` (Workbox) |
| Conteúdo curado | Ficheiros JSON no repositório, versionados em Git |
| Identidade visual | **Duas estéticas coexistentes** — manter como no mockup |
| Notas | Especialidades **totalmente livres** criadas pelo utilizador |
| Módulos "em breve" | **Visíveis na Home com badge "Em breve", não clicáveis** |
| Idioma | Português europeu |
| Âmbito clínico Fase 1 | Módulo Urgência (31 patologias migradas) + Notas |
| Receita no MVP | Nenhuma |

### Justificação das escolhas técnicas

**Supabase em vez de Firebase:** dados relacionais (utilizadores ↔ notas ↔ votos ↔ módulos), Postgres com JOINs é mais limpo que Firestore denormalizado. Row Level Security é desenhada para o modelo "privado por defeito, partilha opcional". Hosting Frankfurt resolve RGPD.

**Vite + React em vez de Next.js:** SPA offline-first sem SEO. Next.js adicionaria complexidade (App Router, Server Components) sem benefício. Vite arranca rápido, build simples, deploy estático.

**PWA primeiro:** validar o produto antes de pagar o "imposto Apple" ($99/ano + revisão + rejeições potenciais de apps médicas). Arquitectar para Capacitor depois é trivial.

**Duas estéticas em vez de uma:** o conteúdo da Urgência é estruturalmente diferente — denso, técnico, com doses e tabelas. IBM Plex Sans/Mono comunica precisão clínica. A Home e Notas são contextos calmos, de leitura/estudo — Lora + DM Sans funciona melhor. Uniformizar empobreceria ambos. Esta dualidade já está no mockup e é deliberada.

---

## 4. Identidade visual

### Duas estéticas coexistentes

**Vista A — Home, Notas, futuros módulos de estudo (estética "soft")**
- Fontes: **Lora** (serif, títulos), **DM Sans** (corpo)
- Paleta: navy + teal + accent suaves
- Border-radius generoso (14-18px nos cartões)
- Espaçamento amplo, ar entre elementos
- Estado emocional: calmo, premium, "casa de estudo"

**Vista B — Módulo Urgência (estética "clínica densa")**
- Fontes: **IBM Plex Sans** (corpo), **IBM Plex Mono** (labels, doses, números clínicos)
- Paleta: neutros bege/creme + pastilhas semânticas (blue/amber/green/red/purple/teal)
- Border-radius compacto (8-10px)
- Densidade alta, informação por cm²
- Estado emocional: focado, urgente, "sala de operações"

### Transição entre estéticas
Quando o utilizador entra no módulo Urgência, a app muda de mundo visual. A nav superior mantém-se igual (continuidade), mas o conteúdo abaixo respira de forma diferente. Esta transição é parte da personalidade da app.

### Tokens CSS

**Estética soft (Home/Notas/global)**
```css
:root {
  --navy:#0F2340; --navy-mid:#1A3558; --navy-light:#E8EFF8;
  --teal:#0E6B5A; --teal-mid:#128A72; --teal-light:#D4F0E8;
  --amber:#B85C00; --amber-light:#FFF3E0;
  --red:#8B1A1A; --red-light:#FDECEA;
  --purple:#3B1A6B; --purple-light:#EDE9FF;
  --green-ok:#1A5C1A; --green-bg:#E8F5E8;
  --text:#1A2030; --text-soft:#4A5568; --text-muted:#8A9AB0;
  --white:#FFFFFF; --page:#F2F6FB; --border:#DDE4EE;
  --font-serif:'Lora', serif;
  --font-sans:'DM Sans', sans-serif;
}
```

**Estética clínica (Urgência)**
```css
.urg-scope {
  --bg:#f5f4f0; --surface:#ffffff; --surface2:#f0efe9;
  --border:#dddbd3; --border2:#c8c6bc;
  --text:#1a1916; --text2:#5a5850; --text3:#8a8880;
  --blue:#1a4fa0;    --blue-bg:#e8eef8;    --blue-border:#b0c2e0;
  --amber:#7a4e00;   --amber-bg:#fdf3d8;   --amber-border:#e8c870;
  --green:#1a5c30;   --green-bg:#e6f4eb;   --green-border:#8ecba0;
  --red:#8c1a1a;     --red-bg:#fce8e8;     --red-border:#e0a0a0;
  --purple:#3b1a6b;  --purple-bg:#ede9ff;  --purple-border:#afa9ec;
  --teal:#0e6b5a;    --teal-bg:#d4f0e8;    --teal-border:#6ecba8;
  --accent:#c8401a;
  --font-mono:'IBM Plex Mono', monospace;
  --font-sans:'IBM Plex Sans', sans-serif;
}
```

A estética clínica deve estar isolada a uma classe `.urg-scope` (ou similar) que envolve todo o módulo Urgência. Tudo lá dentro herda as variáveis e fontes correctas. Tudo fora usa a estética soft por defeito.

---

## 5. Estrutura técnica

### Pastas

```
medeasy/
├── public/
│   ├── icons/                        # PWA icons
│   ├── manifest.webmanifest
│   └── robots.txt
├── src/
│   ├── App.tsx                       # Router e layout
│   ├── main.tsx
│   ├── routes/
│   │   ├── Home.tsx                  # Grelha de módulos
│   │   ├── Urgencia.tsx              # Módulo Urgência
│   │   ├── Notas.tsx                 # Módulo Notas
│   │   ├── Antibioterapia.tsx        # Placeholder (Fase 1)
│   │   └── Sobre.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx               # Topo, igual em toda a app
│   │   │   ├── BackBar.tsx           # Voltar + breadcrumb
│   │   │   └── DisclaimerModal.tsx   # Onboarding
│   │   ├── home/
│   │   │   └── ModuleCard.tsx        # Card de módulo na Home
│   │   ├── urgencia/
│   │   │   ├── UrgenciaHeader.tsx    # Cabeçalho preto com pesquisa
│   │   │   ├── PatologiaCard.tsx     # Accordion de patologia
│   │   │   ├── PatologiaTabs.tsx
│   │   │   ├── DrugCard.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── ScoreTable.tsx
│   │   │   ├── AlarmList.tsx
│   │   │   ├── LinhaBlock.tsx
│   │   │   └── AbbrevPanel.tsx       # Botão flutuante "Abr"
│   │   ├── notas/
│   │   │   ├── CategoriaCard.tsx     # Accordion de especialidade
│   │   │   ├── NotaSubCard.tsx       # Sub-card dentro da especialidade
│   │   │   ├── CategoriaModal.tsx    # Modal de criar/editar categoria
│   │   │   ├── NotaModal.tsx         # Modal de criar/editar nota
│   │   │   └── NotaDetailOverlay.tsx # Vista detalhada
│   │   └── ui/                       # Primitivos partilhados
│   │       ├── Modal.tsx
│   │       ├── Button.tsx
│   │       └── Badge.tsx
│   ├── content/                      # Conteúdo curado (estático)
│   │   ├── index.ts                  # Exporta tudo
│   │   ├── modules.ts                # Lista de módulos da Home
│   │   ├── urgencia/
│   │   │   ├── index.ts
│   │   │   ├── patologias/
│   │   │   │   ├── pneumonia.json
│   │   │   │   ├── sepsis.json
│   │   │   │   └── ... (31 patologias)
│   │   │   └── abreviaturas.json
│   │   └── schema.ts                 # Tipos TypeScript
│   ├── store/
│   │   ├── notas.ts                  # Zustand store com persist
│   │   ├── settings.ts
│   │   └── ui.ts                     # View atual, modais abertos, etc.
│   ├── lib/
│   │   ├── search.ts                 # Fuse.js setup
│   │   ├── storage.ts                # Wrappers de localStorage
│   │   ├── sanitize.ts               # DOMPurify
│   │   └── uid.ts
│   ├── styles/
│   │   ├── globals.css               # Estética soft (default)
│   │   ├── urgencia.css              # Estética clínica (.urg-scope)
│   │   └── tokens.css
│   └── vite-env.d.ts
├── scripts/
│   └── migrate-urgencia.ts           # Converte HTML original em JSON
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Stack completa

**Dependências principais:**
- `react` `react-dom` (18+)
- `react-router-dom` (v6)
- `zustand` (com middleware `persist`)
- `fuse.js`
- `dompurify` (com `@types/dompurify`)
- `vite-plugin-pwa` (Workbox runtime caching)
- `clsx`
- `date-fns`

**Sem necessidade de:**
- Redux / TanStack Query no MVP (Zustand chega)
- Tailwind (mantemos CSS puro com variables — preserva identidade visual)
- shadcn/ui (estética é própria, biblioteca empobreceria)
- Storybook (over-engineering para 2 pessoas)

---

## 6. Modelo de dados

### 6.1 Tipos TypeScript

```typescript
// src/content/schema.ts

// ─── Conteúdo curado ───

export type TagColor =
  | 'blue' | 'amber' | 'green' | 'red' | 'purple' | 'teal';

export interface Tag {
  texto: string;
  cor: TagColor;
}

export interface TabContent {
  id: string;             // 'diag' | 'alg' | 'farm' | 'nf' | 'alarme' ou custom
  label: string;
  html: string;           // Sanitizado com DOMPurify ao renderizar
}

export interface Fonte {
  titulo: string;         // ex: "DGS 006/2014"
  url?: string;
  data_consulta?: string;
}

export interface Patologia {
  id: string;             // kebab-case único
  titulo: string;
  icone: string;          // emoji
  tags: Tag[];
  tabs: TabContent[];
  fontes?: Fonte[];
  revisado_em?: string;   // ISO date
  revisado_por?: string;
  categorias?: string[];
}

export interface Abreviatura {
  sigla: string;
  significado: string;
  seccao?: string;
}

// ─── Módulos da Home ───

export type ModuleStatus = 'available' | 'soon';

export interface AppModule {
  id: string;             // 'urgencia' | 'antibio' | 'notas' | 'sintomas' | 'neuro'
  nome: string;
  emoji: string;
  descricao: string;
  status: ModuleStatus;
  rota?: string;          // ex: '/urgencia' — só se 'available'
}
```

### 6.2 Zustand store das Notas (Fase 1 — localStorage)

```typescript
// src/store/notas.ts

export interface Nota {
  id: string;             // uuid local
  nome: string;
  tag?: string;
  conteudo: string;
  criado_em: string;      // ISO
  actualizado_em: string;
}

export interface Categoria {
  id: string;
  nome: string;
  emoji: string;
  sub?: string;           // subtítulo curto, opcional
  bg: string;             // cor de fundo do ícone
  open: boolean;          // estado de accordion
  notas: Nota[];
}

interface NotasStore {
  categorias: Categoria[];
  // actions
  addCategoria: (cat: Omit<Categoria, 'id' | 'notas' | 'open'>) => void;
  updateCategoria: (id: string, patch: Partial<Categoria>) => void;
  removeCategoria: (id: string) => void;
  toggleCategoria: (id: string) => void;
  addNota: (catId: string, nota: Omit<Nota, 'id' | 'criado_em' | 'actualizado_em'>) => void;
  updateNota: (catId: string, notaId: string, patch: Partial<Nota>) => void;
  removeNota: (catId: string, notaId: string) => void;
}
```

Persistido via `zustand/middleware` em `medeasy_notas_v1` no localStorage (mesma key que o mockup já usa, para compatibilidade caso ela tenha dados de teste).

### 6.3 Schema Supabase (Fase 2+ — não implementar agora)

```sql
-- Auth gerida pelo Supabase

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  nome text,
  email text,
  hospital text,
  ano_internato text,
  criado_em timestamp with time zone default now()
);

-- Notas privadas sincronizadas (substituem localStorage após login)
create table notas_categorias (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  nome text not null,
  emoji text,
  sub text,
  bg text,
  ordem int default 0,
  criado_em timestamp with time zone default now()
);

create table notas (
  id uuid primary key default gen_random_uuid(),
  categoria_id uuid references notas_categorias(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  nome text not null,
  tag text,
  conteudo text,
  criado_em timestamp with time zone default now(),
  actualizado_em timestamp with time zone default now()
);

-- Fase 3: contribuições à comunidade
create table contribuicoes (
  id uuid primary key default gen_random_uuid(),
  autor_id uuid references profiles(id) on delete set null,
  tipo text not null,             -- 'patologia_correcao' | 'nota_publica' | 'sugestao'
  modulo_id text,                 -- ex: 'urgencia'
  patologia_id text,              -- ex: 'pneumonia'
  conteudo text not null,
  referencia text,                -- bibliografia (obrigatória para correções)
  estado text default 'pendente', -- 'pendente' | 'aprovado' | 'rejeitado'
  votos_uteis int default 0,
  reportes int default 0,
  criado_em timestamp with time zone default now()
);

-- RLS:
-- notas_categorias, notas: SELECT/INSERT/UPDATE/DELETE só dono
-- contribuicoes: SELECT público para 'aprovado', INSERT autenticado, UPDATE só admins
```

---

## 7. Migração do conteúdo Urgência

O conteúdo está em `tratamento_urgencia-3.html` (no repositório como referência) como array `patologias` no script. **31 patologias** já trabalhadas:

```
espasmo-muscular, rinite-cronica, osteoporose, itu, psoriase, anemia,
amigdalite, pneumonia, sepsis, anafilaxia, fibrilhao_auricular, tep,
avc, cetoacidose, asma, dpoc, crise_hiper, sincope, sca,
edema_pulmonar, convulsao, cefaleia, delirium, hipoglicemia,
pancreatite, hemorragia_digestiva, infecoes_vaginais, ist, vih,
herpes_virus, asma_diag
```

### Script de migração

`scripts/migrate-urgencia.ts`:

1. Lê o ficheiro HTML original.
2. Extrai o array JavaScript `patologias` do bloco `<script>` (regex ou parser AST).
3. Para cada patologia, gera `src/content/urgencia/patologias/{id}.json` com a estrutura `Patologia`.
4. Normaliza IDs para kebab-case (`fibrilhao_auricular` → `fibrilhacao-auricular`).
5. Mantém o HTML embutido das tabs **tal como está** — não tentar parsear para componentes nesta primeira fase. O HTML actual já tem classes CSS semânticas válidas.
6. Adiciona campos vazios `fontes: []` e `revisado_em: null` para preenchimento futuro.
7. Gera `src/content/urgencia/index.ts` que importa e exporta todas as patologias.

### Renderização das tabs

`PatologiaTabs.tsx` recebe o HTML de cada tab e usa:
```tsx
<div className="urg-scope" dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(tab.html, {
    ALLOWED_TAGS: [...],  // configurar lista permissiva
    ALLOWED_ATTR: ['class', 'style', 'href', 'target']
  })
}} />
```

A classe `urg-scope` no contentor garante que toda a estética clínica (IBM Plex, paleta original) se aplica dentro.

---

## 8. Funcionalidades por fase

### Fase 1 — MVP (3-5 semanas a 5-10h/semana)

**Home (vista inicial)**
- [x] Nav superior fixa com logo e título "Medeasy"
- [x] Hero com título e subtítulo
- [x] Grelha de cartões de módulos:
  - 🚨 Urgência — `available`
  - 💊 Antibioterapia — `soon` (placeholder, não clicável)
  - 📝 Notas & Dívidas — `available`
  - 🩺 Sintomas — `soon`
  - 🧠 Neurologia — `soon`
- [x] Disclaimer modal no primeiro arranque

**Módulo Urgência**
- [x] Back bar com breadcrumb
- [x] Header preto com pesquisa
- [x] Lista alfabética de patologias (`A`, `B`, `C`...)
- [x] Cartão accordion por patologia (igual ao original)
- [x] Tabs internos com HTML sanitizado
- [x] Botão flutuante "Abr" para painel de abreviaturas
- [x] Pesquisa fuzzy (título + tags + texto das tabs)
- [x] Histórico "últimas 5 patologias vistas" no topo (opcional MVP)

**Módulo Notas**
- [x] Back bar com breadcrumb
- [x] Hero com título "Notas & Dívidas"
- [x] Lista de categorias (vazio se primeiro uso)
- [x] Botão "Adicionar especialidade" (cria categoria)
- [x] Modal de criar/editar categoria (nome, emoji, subtítulo)
- [x] Categoria accordion com sub-cards de notas
- [x] Sub-card "+ Adicionar nota" dentro de cada categoria
- [x] Modal de criar/editar nota (nome, tag, conteúdo)
- [x] Overlay de detalhe da nota (vista completa + editar/fechar)
- [x] Persistência localStorage (`medeasy_notas_v1`)
- [x] Confirmação ao apagar categoria (que tem notas) ou nota

**Módulo Antibioterapia (placeholder)**
- [x] Não clicável na Home (já configurado no `status: soon`)

**Infra geral**
- [x] PWA instalável (manifest, ícones, install prompt)
- [x] Offline: conteúdo curado cacheado pelo SW
- [x] Disclaimer no rodapé
- [x] Routing: `/`, `/urgencia`, `/notas`
- [x] Optimização mobile (testar em iPhone real)
- [x] Deploy Vercel

**NÃO incluir na Fase 1:**
- Login / autenticação
- Sync entre dispositivos
- Notas da comunidade
- Pagamentos
- Analytics avançados
- Calculadoras interactivas
- Pesquisa global cross-módulo

### Fase 2 — Auth e sync (2-3 semanas após Fase 1)
- Auth Supabase (magic link email)
- Migração das notas locais → BD quando faz login
- Sync multi-dispositivo
- Perfil básico (nome, hospital, ano)
- Backup/restore manual de notas (export JSON)

### Fase 3 — Comunidade (4+ semanas após Fase 2)
- Partilhar notas publicamente (opt-in por nota)
- Sugerir correcções a patologias da Urgência (com referência obrigatória)
- Votos (útil / desactualizado / reporte)
- Painel admin para moderação
- Toggle "ver contribuições da comunidade" nas patologias

### Fase 4 — Crescimento
- Módulo Antibioterapia (conteúdo real)
- Módulo Sintomas (diagnóstico diferencial)
- Calculadoras interactivas (CURB-65, qSOFA, Wells, CHA₂DS₂-VASc)
- Ajuste de doses por TFG/peso
- Pesquisa global cross-módulo
- Possível integração Consensus API ou similar

---

## 9. Segurança e privacidade

### Fase 1 (sem servidor)
- Tudo em localStorage. Nada sai do dispositivo.
- DOMPurify sempre ao renderizar HTML do conteúdo curado (boa prática mesmo sendo nosso conteúdo).
- Disclaimer claro: educacional, não substitui julgamento clínico, sem identificadores de doentes nas notas.

### Fase 2+ (com servidor)
- Supabase região Frankfurt (RGPD).
- RLS em todas as tabelas.
- Detecção heurística de identificadores no editor de notas (avisar se padrões tipo nº utente 9 dígitos, datas DD/MM/YYYY junto a "doente", "Sr"/"Sra"). Apenas aviso, não bloqueio.
- Política de privacidade simples.
- Direito ao esquecimento: botão "apagar conta e todos os meus dados".

---

## 10. Disclaimers

### Onboarding (primeiro arranque) + rodapé

```
Medeasy é uma ferramenta educacional e de apoio entre pares, não constitui
dispositivo médico nem substitui o julgamento clínico do profissional de
saúde. As informações aqui apresentadas não devem ser usadas como única
fonte para decisões clínicas. Confirme sempre com fontes oficiais (DGS,
UpToDate, bula INFARMED) e com colegas mais experientes em caso de dúvida.
Os autores não se responsabilizam por decisões tomadas com base no
conteúdo aqui disponibilizado.
```

### Modal ao criar nota
```
Lembrete: não inclua identificadores de doentes (nome, nº utente, data
de nascimento). Mantenha as notas genéricas e aplicáveis a casos semelhantes.
```

---

## 11. Sprints para Claude Code

### Sprint 0 — Setup (dia 1)
1. `npm create vite@latest medeasy -- --template react-ts`
2. Instalar dependências (lista da secção 5)
3. Configurar `vite-plugin-pwa` com manifest básico (placeholder icons)
4. Configurar `react-router-dom` com as rotas
5. Estrutura de pastas conforme secção 5
6. Importar fontes Google (Lora, DM Sans, IBM Plex Sans, IBM Plex Mono)
7. Criar `globals.css` (estética soft) e `urgencia.css` (`.urg-scope`)
8. Commit inicial

### Sprint 1 — Home e infra (semana 1)
1. `Nav.tsx` com branding "Medeasy" (logo cubinho teal, fonte Lora)
2. `Home.tsx` com hero + grelha de `ModuleCard`
3. `modules.ts` com os 5 módulos (3 available, 2 soon — atenção: Antibioterapia também `soon` agora apesar do mockup mostrar disponível, porque é placeholder)
4. `BackBar.tsx` reutilizável para todas as vistas internas
5. `DisclaimerModal.tsx` no primeiro arranque (guardar flag em localStorage)
6. Rota `/` mostra a Home
7. Click num módulo `available` navega para a rota
8. Módulo `soon` não é clicável, mostra apenas badge

### Sprint 2 — Migração de conteúdo Urgência (semana 1-2)
1. Escrever `scripts/migrate-urgencia.ts` (lê HTML original, extrai array, gera JSONs)
2. Validar com TypeScript que todos os 31 ficheiros passam o schema
3. `src/content/urgencia/index.ts` carrega todas
4. Verificar que conteúdo é fiel ao original (validar 3-4 patologias manualmente)

### Sprint 3 — Vista Urgência (semana 2)
1. `Urgencia.tsx` com `.urg-scope` wrapper
2. `UrgenciaHeader.tsx` (fundo preto, pesquisa, count badge)
3. Agrupamento alfabético + `alpha-label` separators
4. `PatologiaCard.tsx` accordion
5. `PatologiaTabs.tsx` renderiza HTML via DOMPurify
6. Pesquisa Fuse.js (filtra cards em real-time)
7. `AbbrevPanel.tsx` (botão flutuante + painel — só visível na vista Urgência)

### Sprint 4 — Módulo Notas (semana 3)
1. `Notas.tsx` com hero e botão "Adicionar especialidade"
2. `store/notas.ts` Zustand com persist
3. `CategoriaCard.tsx` accordion com header (emoji + nome + sub + contador)
4. `NotaSubCard.tsx` mini-card no grid
5. `CategoriaModal.tsx` (nome, emoji, subtítulo + paleta de cores rotativa para `bg`)
6. `NotaModal.tsx` (nome, tag, conteúdo textarea)
7. `NotaDetailOverlay.tsx` (vista completa + botões editar/fechar)
8. Confirmação ao eliminar (categoria que tem notas, e notas)

### Sprint 5 — PWA, polish e deploy (semana 4)
1. Manifest com ícones reais (192, 512, maskable)
2. Configurar runtime caching para conteúdo curado (cache-first)
3. Testar instalação como PWA no iPhone Safari real
4. Verificar safe-areas iOS, touch targets ≥44px
5. Optimização: code-splitting do módulo Urgência (lazy load)
6. Lighthouse audit (target: PWA 100, Performance ≥90)
7. Deploy Vercel + domínio (se já tiveres)
8. README.md com instruções (`npm install`, `npm run dev`, `npm run build`)

### Critérios de aceitação do MVP

- [ ] Funciona offline no iPhone instalado como PWA
- [ ] Home mostra os 5 módulos com estado correcto
- [ ] Todas as 31 patologias acessíveis e visualmente idênticas ao original
- [ ] Pesquisa devolve resultados em <300ms
- [ ] Notas criam-se, editam-se, apagam-se com persistência fiável
- [ ] Disclaimer visível no primeiro arranque
- [ ] Carregamento inicial <2s em 4G
- [ ] Lighthouse PWA score = 100

---

## 12. Decisões em aberto

| # | Decisão | Quando |
|---|---|---|
| 1 | Lista de patologias prioritárias a expandir (Sofia) | Após Sprint 3 |
| 2 | Domínio definitivo (medeasy.pt? medeasy.app?) | Sprint 5 |
| 3 | Estratégia de feedback dos primeiros beta-testers | Pós-MVP |
| 4 | Tipo de notas da comunidade na Fase 3 (módulo próprio? secção em cada patologia?) | Antes da Fase 3 |
| 5 | Estrutura legal | Antes de monetizar |

---

## 13. Notas para o assistente que vai construir

- **Mockup `medeasy.html` é a referência visual.** Quando houver dúvidas sobre aparência, abrir e copiar. Estilos, espaçamentos, animações, cores — tudo está lá.
- **`tratamento_urgencia-3.html` é a fonte de conteúdo.** Migrar como JSON, manter o HTML embutido nas tabs.
- **Manter as duas estéticas separadas.** Nunca aplicar Lora a doses, nunca aplicar IBM Plex a títulos da Home. A separação é a personalidade.
- **Mobile-first.** Tudo testado em viewport ~390px primeiro. Desktop é bonus.
- **Cards aninhados em todo o lado.** Se algo deveria ser uma lista corrida ou um parágrafo longo, pensar duas vezes — provavelmente devia ser cards.
- **Não over-engineer.** Sem Redux, sem GraphQL, sem micro-frontends. Se algo não está aqui, perguntar antes de adicionar.
- **Commit frequente** com mensagens descritivas. A Sofia (não-técnica) acompanha pelo histórico.
- **README.md claro** para que a Sofia consiga correr localmente se quiser.

---

**Próximo passo concreto:** entregar este SPEC + `tratamento_urgencia-3.html` + `medeasy.html` ao Claude Code. Pedir para começar pelo Sprint 0 + Sprint 1, e mostrar Home funcional antes de avançar para Sprint 2.
