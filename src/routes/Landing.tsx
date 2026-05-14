import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

// ─── ECG Soft Line ───
function ECGSoft({ width = 600, height = 80, color = '#5FBA9A', stroke = 1.5, opacity = 1, beats = 2 }: { width?: number; height?: number; color?: string; stroke?: number; opacity?: number; beats?: number }) {
  const beatSeg = (cx: number, h: number) =>
    `L${cx - 12},${h / 2} L${cx - 8},${h / 2 - 4} L${cx - 4},${h / 2 + 3} L${cx},${h / 2 - 22} L${cx + 4},${h / 2 + 18} L${cx + 8},${h / 2 - 6} L${cx + 12},${h / 2}`;
  const positions = beats === 1 ? [width / 2] : Array.from({ length: beats }, (_, i) => (width / (beats + 1)) * (i + 1));
  let d = `M0,${height / 2}`;
  positions.forEach(cx => { d += ` ${beatSeg(cx, height)}`; });
  d += ` L${width},${height / 2}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', opacity }}>
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Logo ───
function Logo({ size = 32 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 4, background: 'var(--teal-mid)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 20 20">
        <path d="M1,10 L5,10 L7,4 L9,16 L11,10 L19,10" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Module Icons (SVG) ───
function IconUrgencia() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <path d="M14 24s-8-5-10-10.5A5.5 5.5 0 0 1 14 9 5.5 5.5 0 0 1 24 13.5C22 19 14 24 14 24z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.18" />
      <path d="M6.5 14.5 L10 14.5 L11.5 11 L14 19 L15.5 14.5 L17.5 14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconVacinacao() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <g transform="rotate(-45 14 14)">
        <rect x="7" y="12" width="14" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.18" />
        <line x1="21" y1="14" x2="24.5" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="3.5" y="12.5" width="3.5" height="3" stroke="currentColor" strokeWidth="1.6" />
        <line x1="11" y1="11" x2="11" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="17" y1="11" x2="17" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </g>
      <circle cx="23" cy="5" r="1.3" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
function IconAntibio() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <g transform="rotate(-35 14 14)">
        <rect x="4" y="11.5" width="20" height="5" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 14 a2.5 2.5 0 0 1 2.5 -2.5 H14 V16.5 H6.5 a2.5 2.5 0 0 1 -2.5 -2.5 z" fill="currentColor" fillOpacity="0.22" />
        <line x1="14" y1="11.5" x2="14" y2="16.5" stroke="currentColor" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
function IconAlgoritmos() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <line x1="14" y1="6" x2="7" y2="14" stroke="currentColor" strokeWidth="1.3" />
      <line x1="14" y1="6" x2="21" y2="14" stroke="currentColor" strokeWidth="1.3" />
      <line x1="7" y1="16" x2="11" y2="22" stroke="currentColor" strokeWidth="1.3" />
      <line x1="21" y1="16" x2="17" y2="22" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="14" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.18" />
      <circle cx="7" cy="15" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="21" cy="15" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="11" cy="22.5" r="1.7" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.18" />
      <circle cx="17" cy="22.5" r="1.7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconAnalises() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <line x1="9" y1="3.5" x2="19" y2="3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 4 V19 a4 4 0 0 0 8 0 V4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 14 Q12 13 14 13.5 T18 14 V19 a4 4 0 0 1 -8 0 z" fill="currentColor" fillOpacity="0.35" />
      <circle cx="13" cy="11" r="0.9" fill="currentColor" opacity="0.7" />
      <circle cx="15.6" cy="9.5" r="0.6" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
function IconInteracoes() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <circle cx="10" cy="14" r="6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="14" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 8.4 a6 6 0 0 0 0 11.2 a6 6 0 0 0 0 -11.2" fill="currentColor" fillOpacity="0.3" stroke="none" />
    </svg>
  );
}
function IconNotas() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <rect x="5" y="4" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.12" />
      <line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <line x1="8" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <path d="M19 7 L22.5 10.5 L17 16 L13 17 L14 13 L19.5 7.5 Z" fill="currentColor" fillOpacity="0.85" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function IconSintomas() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <path d="M7 4 v7 a4 4 0 0 0 8 0 V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11 15 v2.5 a5 5 0 0 0 10 0 v-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="21" cy="13" r="2.6" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.22" />
      <line x1="6" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="14" y1="4" x2="16" y2="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const MODULE_ICONS: Record<string, () => React.ReactElement> = {
  Urgencia: IconUrgencia,
  Vacinacao: IconVacinacao,
  Antibio: IconAntibio,
  Algoritmos: IconAlgoritmos,
  Analises: IconAnalises,
  Interacoes: IconInteracoes,
  Notas: IconNotas,
  Sintomas: IconSintomas,
};

// ─── Data ───

const MODULES = [
  { iconKey: 'Urgencia', tone: 'coral', name: 'Urgência', desc: '31 patologias com protocolos, sinais de alarme e fármacos.', chip: '31 patologias', available: true },
  { iconKey: 'Vacinacao', tone: 'purple', name: 'Vacinação', desc: 'PNV adulto e pediátrico, vacinas extra, matriz por região.', chip: 'PNV 2025', available: true },
  { iconKey: 'Antibio', tone: 'mint', name: 'Antibioterapia', desc: 'Guia rápido. Calculadora pediátrica, MEWS, teste de alergia.', chip: '+ 3 ferramentas', available: true },
  { iconKey: 'Algoritmos', tone: 'teal', name: 'Algoritmos', desc: 'Exame, diagnóstico diferencial e passos — ombro, cotovelo.', chip: '2 algoritmos', available: true },
  { iconKey: 'Analises', tone: 'amber', name: 'Análises', desc: 'Interpretador de análises — valores normais e leitura rápida.', chip: 'Interpretador', available: true },
  { iconKey: 'Interacoes', tone: 'navy', name: 'Interações', desc: 'Verifica interações entre fármacos antes de prescrever.', chip: 'Checker', available: true },
  { iconKey: 'Notas', tone: 'amber', name: 'Notas pessoais', desc: 'Post-its inline em qualquer cartão + notas organizadas por especialidade.', chip: 'Pessoais', available: true },
  { iconKey: 'Sintomas', tone: 'soon', name: 'Sintomas', desc: 'Diagnóstico diferencial guiado por sintomas.', chip: 'Em breve', available: false },
];

const STEPS = [
  { n: '01', t: 'Escolhe um módulo', d: 'Urgência, vacinação, antibioterapia… cada um agrupa o que importa por área.' },
  { n: '02', t: 'Abre um cartão', d: 'Cada cartão é auto-suficiente: o que olhar, o que fazer, o que confirmar.' },
  { n: '03', t: 'Anota o que aprendes', d: 'Notas pessoais por especialidade. Sincronizadas entre dispositivos.' },
];

const TESTIMONIALS = [
  { q: 'Comecei a usar no primeiro mês de internato. Os cartões da urgência salvam-me de andar à procura do PDF.', a: 'Inês P.', r: 'Interna · Medicina Interna', emoji: '🩺' },
  { q: 'A calculadora pediátrica é a única coisa que poupa cinco minutos cada vez que passo pela pediatria.', a: 'Rui M.', r: 'Interno · Pediatria', emoji: '👶' },
  { q: 'Uso para estudar antes do turno. As notas pessoais por especialidade são óptimas para revisão.', a: 'Teresa C.', r: 'Interna · Urgência', emoji: '✍️' },
  { q: 'A pesquisa fuzzy é um milagre. Encontro fármacos pelo nome comercial sem ter de pensar.', a: 'Diogo S.', r: 'Aluno · 6º ano', emoji: '🎓' },
  { q: 'Os post-its são a melhor parte. Anoto os truques de cada serviço e nunca mais os perco.', a: 'Mariana L.', r: 'Interna · Cirurgia Geral', emoji: '📌' },
  { q: 'Em consulta, parece que estou a ver os meus apontamentos. Ninguém repara — e é exactamente isso.', a: 'André B.', r: 'Médico · Med. Familiar', emoji: '🧠' },
  { q: 'Funciona offline em qualquer canto do hospital. Já não dependo da rede do piso 4.', a: 'Catarina F.', r: 'Interna · Ortopedia', emoji: '📡' },
  { q: 'Estudei para a prova nacional com isto. As notas da comunidade poupam horas de leitura.', a: 'Pedro R.', r: 'Aluno · 5º ano', emoji: '📚' },
];

const FAQS = [
  { q: 'O Medeasy substitui guidelines clínicas?', a: 'Não. É um auxiliar de estudo entre pares — não constitui dispositivo médico, não substitui guidelines oficiais (DGS, NICE, UpToDate), e a decisão clínica é sempre da tua responsabilidade.' },
  { q: 'Posso usar offline?', a: 'Sim. É uma PWA — instala-se no telemóvel e funciona sem rede. Sincroniza notas quando voltas a ligar.' },
  { q: 'O conteúdo está actualizado?', a: 'Sim, com revisões periódicas baseadas em guidelines actuais (DGS, NICE). Cada cartão indica a data da última revisão.' },
  { q: 'Como funciona o desconto estudante?', a: '50% off com email institucional (.edu, .ulisboa.pt, etc.). É aplicado automaticamente no checkout.' },
  { q: 'Quais os métodos de pagamento?', a: 'Cartão de débito/crédito via Stripe ou MB WAY. Sem fidelização.' },
  { q: 'Como cancelo?', a: 'Em dois cliques nas definições. Sem questões, sem chamadas, sem aborrecimento.' },
];

const FEATURES = [
  { icon: '⚡', t: 'Acesso em segundos', d: 'Cartão aberto, resposta lida. Sem páginas longas, sem fluff.' },
  { icon: '🔍', t: 'Pesquisa que perdoa', d: 'Erros tipográficos, siglas, nomes comerciais. Encontra na primeira tentativa.' },
  { icon: '📡', t: 'Onde quer que estejas', d: 'Bata, biblioteca, transportes, hospital. Funciona offline (PWA).' },
  { icon: '📝', t: 'As tuas notas', d: 'Caderno de estudo organizado. Anexa a qualquer cartão.' },
];

const PRICING_FEATURES = [
  'Todos os módulos disponíveis',
  'Funciona offline (PWA)',
  'Notas pessoais sincronizadas',
  'Pesquisa fuzzy em todo o app',
  'Actualizações regulares',
];

// ─── Component ───

export default function Landing() {
  const navigate = useNavigate();
  const goApp = () => navigate('/home');

  const testimonialTrack = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="landing-scope">
      {/* ─── Disclaimer ─── */}
      <div className="lp-disclaimer">
        <strong style={{ fontWeight: 600, color: '#fff' }}>Auxiliar de estudo</strong>
        <span style={{ margin: '0 8px', opacity: 0.4 }}>·</span>
        Não constitui dispositivo médico nem substitui o julgamento clínico
      </div>

      {/* ─── Nav ─── */}
      <nav className="lp-nav">
        <div className="lp-nav-left">
          <div className="lp-nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo size={34} />
            <div>
              <div>Med<span>easy</span></div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 400, marginTop: 2 }}>Auxiliar de estudo de medicina</div>
            </div>
          </div>
          <div className="lp-nav-links">
            <a href="#modulos">Módulos</a>
            <a href="#demo">Demo</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#precos">Preços</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="lp-nav-right">
          <button className="lp-nav-login" onClick={goApp}>Entrar</button>
          <button className="lp-btn lp-btn--primary lp-btn--sm" onClick={goApp}>Começar grátis</button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="lp-hero">
        {/* Background ECG */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.15, pointerEvents: 'none' }}>
          <ECGSoft width={2400} height={200} color="#5FBA9A" stroke={1.2} beats={4} />
        </div>

        <div className="lp-container">
          <div className="lp-hero-text">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 100, fontSize: 12, color: 'var(--text-soft)', marginBottom: 26 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#5FBA9A', display: 'inline-block' }} />
              v0.1 · novo · interações entre fármacos
            </div>

            <h1 className="lp-hero-title">
              Estuda medicina,<br />
              <span>como costumas pensar</span>.
            </h1>
            <p className="lp-hero-subtitle">
              Urgência, vacinação, antibioterapia, algoritmos e as tuas notas — organizados em cartões. Para estudantes de medicina e médicos.
            </p>
            <div className="lp-hero-actions">
              <button className="lp-btn lp-btn--primary" onClick={goApp} style={{ boxShadow: '0 4px 20px rgba(18,138,114,0.25)' }}>
                Começar 7 dias grátis →
              </button>
              <button className="lp-btn lp-btn--outline" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver demo do app
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 24, fontSize: 13, color: 'var(--text-muted)' }}>
              <span>✓ sem cartão</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>cancela em 2 cliques</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>iOS · Android · Web</span>
            </div>
          </div>

          {/* ─── Hero Illustration ─── */}
          <div className="lp-hero-illustration">
            {/* Floating ECG accent */}
            <div style={{ position: 'absolute', top: 0, right: 40, opacity: 0.5 }}>
              <ECGSoft width={140} height={50} color="#5FBA9A" stroke={1.5} beats={1} />
            </div>

            {/* Primary card — Urgência protocol */}
            <div style={{ position: 'absolute', top: '10%', left: 0, width: 320, background: 'var(--white)', borderRadius: 20, padding: 24, boxShadow: '0 24px 60px -10px rgba(15,35,64,0.22)', border: '1px solid var(--border)' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 5, background: '#E78F73', borderRadius: '20px 0 0 20px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingLeft: 6 }}>
                <span className="lp-chip lp-chip--coral">Urgência</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: '#E78F73', fontWeight: 600 }}>P1 · 4 min</span>
              </div>
              <div style={{ paddingLeft: 6 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--navy)', fontWeight: 600, lineHeight: 1.15 }}>EAM com supra-ST</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Cardiologia · Síndrome coronária aguda</div>
                <div style={{ height: 1, background: 'var(--border)', margin: '14px 0' }} />
                <div style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.55 }}>
                  {[
                    ['1.', 'AAS 250 mg + Clopidogrel 600 mg PO'],
                    ['2.', 'Atorvastatina 80 mg PO'],
                    ['3.', 'Contactar hemodinâmica — alvo <90 min'],
                  ].map(([n, t], i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 5 }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: 'var(--teal-mid)', fontWeight: 600, minWidth: 18 }}>{n}</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, padding: '8px 12px', background: 'var(--amber-light)', borderRadius: 8, fontSize: 11.5, color: 'var(--amber)', lineHeight: 1.4 }}>
                  <strong>Nota de estudo:</strong> revisar critérios door-to-balloon
                </div>
              </div>
            </div>

            {/* Background card — Vacinação */}
            <div style={{ position: 'absolute', top: '5%', right: 0, width: 260, background: 'var(--white)', borderRadius: 16, padding: 20, boxShadow: '0 12px 40px -10px rgba(15,35,64,0.15)', transform: 'rotate(3deg)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span className="lp-chip lp-chip--purple">Vacinação</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--text-muted)' }}>PNV 2025</span>
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--navy)', fontWeight: 600, lineHeight: 1.2 }}>Td/dTpa adulto</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-soft)', marginTop: 6, lineHeight: 1.5 }}>Reforço cada 10 anos. dTpa na gravidez (20–36 sem).</div>
            </div>

            {/* Note card — sticky note */}
            <div style={{ position: 'absolute', bottom: '5%', right: 20, width: 220, background: '#FFF8E0', borderRadius: 12, padding: 16, boxShadow: '0 10px 24px -6px rgba(0,0,0,0.15)', transform: 'rotate(-4deg)' }}>
              <div style={{ fontSize: 10, color: '#7a6020', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>📌 Nota minha</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--navy)', fontStyle: 'italic', lineHeight: 1.4 }}>"No HSM, ext. 4421 para hemodinâmica."</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Differential ─── */}
      <section className="lp-diff">
        {/* Background ECG */}
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, opacity: 0.12, pointerEvents: 'none' }}>
          <ECGSoft width={2400} height={120} color="#5FBA9A" stroke={1.2} beats={4} />
        </div>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, var(--teal-mid), transparent 70%)', opacity: 0.2, filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div className="lp-container" style={{ position: 'relative' }}>
          <div className="lp-section-header">
            <div className="lp-section-label">O QUE NOS DIFERENCIA</div>
            <h2 className="lp-section-title">Parece o que é —<br /><span>os teus apontamentos.</span></h2>
            <p className="lp-section-subtitle">Há quem consulte as suas notas. Há quem dependa de IA. O Medeasy põe-te do primeiro lado — é o teu caderno e o dos colegas, não um chatbot a falar por ti.</p>
          </div>
          <div className="lp-diff-grid">
            {/* Card 1 — Personal Notes */}
            <div className="lp-diff-card">
              <span className="lp-chip lp-chip--amber" style={{ marginBottom: 16 }}>01 · TEUS</span>
              <div className="lp-diff-card-title">Notas pessoais,<br />onde tu queres.</div>
              <p className="lp-diff-card-desc">Cola um post-it digital em qualquer cartão. Truques do teu hospital, lembretes, dúvidas — anexados ao protocolo onde ficam úteis.</p>
              {/* Visual — stacked post-its */}
              <div style={{ position: 'relative', height: 160, marginTop: 20 }}>
                <div style={{ position: 'absolute', top: 0, left: 12, right: 32, background: '#FFF1B5', padding: 14, borderRadius: 4, transform: 'rotate(-3deg)', boxShadow: '0 6px 14px -6px rgba(122,96,32,0.3)' }}>
                  <div style={{ fontSize: 9, color: '#7a6020', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 5 }}>📌 NOTA · CARDIO</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--navy)', fontStyle: 'italic', lineHeight: 1.4 }}>"Cateterismo no HSM = piso -1, ext. 4421."</div>
                </div>
                <div style={{ position: 'absolute', top: 50, left: 0, right: 40, background: '#FFE48A', padding: 16, borderRadius: 4, transform: 'rotate(2.5deg)', boxShadow: '0 10px 20px -6px rgba(122,96,32,0.35)' }}>
                  <div style={{ fontSize: 9, color: '#7a6020', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 5 }}>📌 NOTA · ANTIBIO</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--navy)', fontStyle: 'italic', lineHeight: 1.4 }}>"Em alérgicos β-lactâmicos, preferir clindamicina + cipro."</div>
                  <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: '#7a6020', opacity: 0.6 }}>— há 3 dias</div>
                </div>
              </div>
            </div>

            {/* Card 2 — Community */}
            <div className="lp-diff-card">
              <span className="lp-chip lp-chip--mint" style={{ marginBottom: 16 }}>02 · COMUNIDADE</span>
              <div className="lp-diff-card-title">Apontamentos da<br />comunidade médica.</div>
              <p className="lp-diff-card-desc">Notas partilhadas por estudantes e médicos — revistas pelos pares antes de aparecerem.</p>
              {/* Visual — community notes list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
                {[
                  { spec: 'CARDIO', t: 'Truque para diferenciar pericardite de EAM no ECG', author: 'A. Silva', stars: 142, approved: true },
                  { spec: 'PEDIATRIA', t: 'Doses iniciais de ressuscitação por peso', author: 'M. Costa', stars: 89, approved: true },
                  { spec: 'URGÊNCIA', t: 'Sequência de intubação rápida — variante HSM', author: 'R. Lopes', stars: 31, approved: false },
                ].map((n, i) => (
                  <div key={i} style={{ background: 'var(--page)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: 'var(--teal-mid)', fontWeight: 600, letterSpacing: '0.08em' }}>{n.spec}</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: n.approved ? 'var(--teal)' : 'var(--amber)' }}>
                        {n.approved ? '✓ Revisto' : 'Em revisão'}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--navy)', fontWeight: 500, lineHeight: 1.35, marginBottom: 4 }}>{n.t}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)' }}>
                      <span>por {n.author}</span>
                      <span>★ {n.stars}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3 — Not AI */}
            <div className="lp-diff-card" style={{ background: 'linear-gradient(180deg, var(--teal-light), var(--white))', border: '2px solid #5FBA9A' }}>
              <span className="lp-chip lp-chip--teal" style={{ marginBottom: 16 }}>03 · DISCRETO</span>
              <div className="lp-diff-card-title">Pareces preparado.<br />Porque estás.</div>
              <p className="lp-diff-card-desc">Em frente a um doente ou colega, consultar o Medeasy <strong>parece-se com as tuas notas</strong> — não com um chat de IA.</p>
              {/* Visual — comparison */}
              <div style={{ background: 'var(--white)', borderRadius: 12, padding: 14, border: '1px solid var(--border)', marginTop: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fbdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🚫</div>
                  <div>
                    <div style={{ fontSize: 11, color: '#9E3F1F', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Outras IAs</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-soft)', marginTop: 2 }}>"A gerar resposta…" · chat box · mal visto</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#E6F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--teal)' }}>
                    <IconNotas />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Medeasy</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-soft)', marginTop: 2 }}>Cartões clínicos · parece o que é · sem ruído</div>
                  </div>
                </div>
              </div>
              {/* Quote */}
              <div style={{ marginTop: 16, fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--text-soft)', fontStyle: 'italic', lineHeight: 1.5, borderLeft: '3px solid #5FBA9A', paddingLeft: 14 }}>
                "Quando consulto em ronda, ninguém repara. Parece que estou a ver os meus apontamentos — porque, efectivamente, estou."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Preview ─── */}
      <section className="lp-section lp-preview">
        <div className="lp-container">
          <div>
            <div className="lp-section-label">A DIFERENÇA</div>
            <h2 className="lp-section-title" style={{ textAlign: 'left', marginBottom: 16 }}>Simples. Rápido.<br />Em qualquer lugar.</h2>
            <p className="lp-section-subtitle" style={{ textAlign: 'left', margin: '0 0 40px' }}>Pesquisa instantânea, leitura em segundos, funciona offline. Usa na bata, na biblioteca, em casa ou em formação.</p>
            <div className="lp-preview-features">
              {FEATURES.map((f, i) => (
                <div key={i} className="lp-preview-feature">
                  <div className="lp-preview-feature-icon">{f.icon}</div>
                  <div>
                    <div className="lp-preview-feature-title">{f.t}</div>
                    <div className="lp-preview-feature-desc">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -30, background: 'radial-gradient(circle at center, #E6F5EE, transparent 70%)', opacity: 0.7, filter: 'blur(20px)', pointerEvents: 'none' }} />
            <div className="lp-phone">
              <div className="lp-phone-inner">
                <div className="lp-phone-notch" />
                <div style={{ background: 'var(--navy)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Logo size={24} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1 }}>Medeasy</div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)' }}>Auxiliar de estudo</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', padding: '3px 9px', borderRadius: 20, background: 'rgba(255,255,255,0.1)' }}>Urgência</div>
                </div>
                <div className="lp-phone-content">
                  <div style={{ width: 30, height: 2.5, background: 'var(--teal-mid)', borderRadius: 2, marginBottom: 10 }} />
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--navy)', fontWeight: 600, marginBottom: 4 }}>Urgência</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>31 patologias · 7 áreas</div>

                  {/* Tabs */}
                  <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                    {['Cardio', 'Resp', 'Neuro', 'GI'].map((t, i) => (
                      <div key={i} style={{ fontSize: 10, padding: '4px 9px', borderRadius: 12, background: i === 0 ? 'var(--navy)' : 'var(--white)', color: i === 0 ? '#fff' : 'var(--text-soft)', fontWeight: 500, border: `1px solid ${i === 0 ? 'var(--navy)' : 'var(--border)'}` }}>{t}</div>
                    ))}
                  </div>

                  {/* Protocol cards */}
                  {[
                    { title: 'EAM com supra-ST', sub: 'Síndrome coronária aguda', color: '#E78F73', t: '4min' },
                    { title: 'Edema agudo do pulmão', sub: 'IC descompensada', color: '#E78F73', t: '6min' },
                    { title: 'Taquicardia supra-V', sub: 'Manobras vagais + adenosina', color: '#B85C00', t: '5min' },
                  ].map((p, i) => (
                    <div key={i} style={{ background: 'var(--white)', borderRadius: 12, padding: '10px 12px', marginBottom: 6, border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: p.color, borderRadius: '12px 0 0 12px' }} />
                      <div style={{ paddingLeft: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 12.5, color: 'var(--navy)', fontWeight: 600 }}>{p.title}</div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{p.sub}</div>
                        </div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: p.color, fontWeight: 600 }}>{p.t}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Modules ─── */}
      <section className="lp-section lp-section--alt" id="modulos">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-label">MÓDULOS</div>
            <h2 className="lp-section-title">Tudo o que precisas, num só lugar.</h2>
            <p className="lp-section-subtitle">Cada módulo é uma estante de cartões — abre um, lê, fecha. Sem distracção, sem caça à informação.</p>
          </div>
          <div className="lp-modules">
            {MODULES.map((m, i) => {
              const Ic = MODULE_ICONS[m.iconKey];
              return (
                <div key={i} className={`lp-module-card${m.available ? ' lp-module-card--available' : ''}`} style={{ opacity: m.available ? 1 : 0.6 }}>
                  <div className={`lp-module-icon lp-module-icon--${m.tone}`} style={{ color: `var(--${m.tone === 'coral' ? 'red' : m.tone === 'mint' ? 'teal' : m.tone === 'soon' ? 'text-muted' : m.tone})` }}>
                    {Ic && <Ic />}
                  </div>
                  <div className="lp-module-title">{m.name}</div>
                  <div className="lp-module-desc">{m.desc}</div>
                  <div className="lp-module-chip">
                    <span className={`lp-chip lp-chip--${m.tone}`}>{m.chip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="lp-section" id="como-funciona">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-label">COMO FUNCIONA</div>
            <h2 className="lp-section-title">Estuda como costumas pensar.</h2>
          </div>
          <div className="lp-how">
            {STEPS.map((s, i) => (
              <div key={i} className="lp-how-step">
                <div className="lp-how-number">{s.n}</div>
                <div className="lp-how-step-title">{s.t}</div>
                <div className="lp-how-step-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── App Demo ─── */}
      <section className="lp-section lp-section--alt" id="demo">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-label">PREVIEW · APP</div>
            <h2 className="lp-section-title">O app, com a nova identidade.</h2>
            <p className="lp-section-subtitle">4 ecrãs principais com hierarquia clínica, pesquisa global, breadcrumbs e notas pessoais inline.</p>
          </div>
          <div className="lp-demo-phones">
            {/* Phone 1 — Home */}
            <div className="lp-demo-frame">
              <div className="lp-phone">
                <div className="lp-phone-inner">
                  <div className="lp-phone-notch" />
                  <div style={{ background: 'var(--navy)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Logo size={24} />
                      <div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1 }}>Medeasy</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)' }}>Auxiliar de estudo</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', padding: '3px 9px', borderRadius: 20, background: 'rgba(255,255,255,0.1)' }}>
                      <svg width="14" height="14" viewBox="0 0 15 15" style={{ verticalAlign: 'middle' }}><circle cx="6.5" cy="6.5" r="5" stroke="#fff" strokeWidth="1.5" fill="none" /><path d="M13 13 L10 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </div>
                  </div>
                  <div className="lp-phone-content">
                    <div style={{ background: 'var(--page)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                      <svg width="14" height="14" viewBox="0 0 15 15" style={{ color: 'var(--text-muted)' }}><circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M13 13 L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Pesquisar em todo o app</span>
                    </div>
                    <div style={{ width: 30, height: 2.5, background: 'var(--teal-mid)', borderRadius: 2, marginBottom: 8 }} />
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--navy)', fontWeight: 600, lineHeight: 1.15, marginBottom: 4 }}>Referência clínica<br/>rápida e organizada</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.5 }}>Protocolos, fármacos e notas — num só sítio.</div>
                    <div style={{ fontSize: 9, color: 'var(--teal-mid)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Módulos disponíveis</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                      {[
                        { name: 'Urgência', desc: '31 patologias', color: '#E78F73' },
                        { name: 'Vacinação', desc: 'PNV 2025', color: '#8B6CC1' },
                        { name: 'Antibioterapia', desc: '+ 3 ferramentas', color: '#5FBA9A' },
                        { name: 'Algoritmos', desc: '2 disponíveis', color: 'var(--teal-mid)' },
                        { name: 'Análises', desc: 'Interpretador', color: '#B85C00' },
                        { name: 'Interacções', desc: 'Checker', color: 'var(--navy)' },
                      ].map((m, i) => (
                        <div key={i} style={{ background: 'var(--white)', borderRadius: 10, padding: '8px 10px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', top: 0, right: 0, width: 2.5, height: '100%', background: 'var(--teal-mid)' }} />
                          <div style={{ width: 24, height: 24, borderRadius: 6, background: `${m.color}18`, marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: m.color, opacity: 0.6 }} />
                          </div>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 10.5, color: 'var(--navy)', fontWeight: 600, marginBottom: 1 }}>{m.name}</div>
                          <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{m.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lp-demo-label">01 · Home</div>
            </div>

            {/* Phone 2 — Urgência Lista */}
            <div className="lp-demo-frame">
              <div className="lp-phone">
                <div className="lp-phone-inner">
                  <div className="lp-phone-notch" />
                  <div style={{ background: 'var(--navy)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 14 14"><path d="M9 2 L4 7 L9 12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1 }}>Urgência</div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)' }}>31 patologias · 7 áreas</div>
                    </div>
                  </div>
                  <div className="lp-phone-content">
                    <div style={{ background: 'var(--page)', border: '1px solid var(--border)', borderRadius: 10, padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <svg width="13" height="13" viewBox="0 0 15 15" style={{ color: 'var(--text-muted)' }}><circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M13 13 L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Pesquisar patologia</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
                      {['Todas', 'Cardio', 'Resp', 'Neuro', 'GI'].map((t, i) => (
                        <div key={i} style={{ fontSize: 9, padding: '4px 9px', borderRadius: 12, background: i === 1 ? 'var(--navy)' : 'var(--white)', color: i === 1 ? '#fff' : 'var(--text-soft)', fontWeight: i === 1 ? 600 : 500, border: `1px solid ${i === 1 ? 'var(--navy)' : 'var(--border)'}` }}>{t}</div>
                      ))}
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--teal-mid)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Cardiologia · 5</div>
                    {[
                      { title: 'EAM com supra-ST', sub: 'Síndrome coronária aguda', sev: '#E78F73', label: 'P1', t: '4min' },
                      { title: 'Edema agudo do pulmão', sub: 'IC descompensada', sev: '#E78F73', label: 'P1', t: '6min' },
                      { title: 'Taquicardia SVT', sub: 'Manobras vagais + adenosina', sev: '#B85C00', label: 'P2', t: '5min' },
                      { title: 'Fibrilhação auricular', sub: 'Controlo de FC e ritmo', sev: '#B85C00', label: 'P2', t: '6min' },
                      { title: 'Pericardite aguda', sub: 'Diagnóstico diferencial', sev: 'var(--teal-mid)', label: 'P3', t: '4min' },
                    ].map((p, i) => (
                      <div key={i} style={{ background: 'var(--white)', borderRadius: 10, padding: '9px 10px 9px 14px', marginBottom: 5, border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: p.sev }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 11, color: 'var(--navy)', fontWeight: 600, marginBottom: 1 }}>{p.title}</div>
                            <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{p.sub}</div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: 2 }}>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5, color: p.sev, fontWeight: 700, padding: '1px 5px', background: `${p.sev}18`, borderRadius: 3 }}>{p.label}</span>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5, color: 'var(--text-muted)' }}>{p.t}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lp-demo-label">02 · Urgência — Lista</div>
            </div>

            {/* Phone 3 — Patologia Detalhe */}
            <div className="lp-demo-frame">
              <div className="lp-phone">
                <div className="lp-phone-inner">
                  <div className="lp-phone-notch" />
                  <div style={{ background: 'var(--navy)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 14 14"><path d="M9 2 L4 7 L9 12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1 }}>EAM supra-ST</div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)' }}>Urgência · Cardio</div>
                    </div>
                  </div>
                  <div className="lp-phone-content">
                    <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                      <span style={{ fontSize: 9, padding: '3px 8px', borderRadius: 8, background: '#E78F7318', color: '#E78F73', fontWeight: 600 }}>P1 · Crítico</span>
                      <span style={{ fontSize: 9, padding: '3px 8px', borderRadius: 8, background: '#B85C0018', color: '#B85C00', fontWeight: 600 }}>~4 min</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--navy)', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 3 }}>EAM com supra-ST</div>
                    <div style={{ fontSize: 10, color: 'var(--text-soft)', lineHeight: 1.5, marginBottom: 12 }}>Síndrome coronária aguda com elevação do ST. Reperfusão urgente.</div>
                    <div style={{ display: 'flex', gap: 3, marginBottom: 12, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                      {['Resumo', 'Fármacos', 'Sinais', 'Critérios'].map((t, i) => (
                        <div key={i} style={{ fontSize: 9.5, padding: '5px 7px', color: i === 0 ? 'var(--navy)' : 'var(--text-muted)', fontWeight: i === 0 ? 700 : 500, borderBottom: i === 0 ? '2px solid var(--teal-mid)' : '2px solid transparent' }}>{t}</div>
                      ))}
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--teal-mid)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Sequência terapêutica</div>
                    {[
                      { n: 1, t: 'Dupla antiagregação', d: 'AAS 250mg + Clopi 600mg PO' },
                      { n: 2, t: 'Estatina', d: 'Atorvastatina 80mg PO' },
                      { n: 3, t: 'Anticoagulação', d: 'Enoxaparina 1 mg/kg SC' },
                      { n: 4, t: 'Hemodinâmica', d: 'Door-to-balloon <90 min' },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                        <div style={{ width: 20, height: 20, borderRadius: 5, background: 'var(--teal-light)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 11, color: 'var(--navy)', fontWeight: 600, marginBottom: 1 }}>{s.t}</div>
                          <div style={{ fontSize: 9.5, color: 'var(--text-soft)', lineHeight: 1.4 }}>{s.d}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: 10, padding: '8px 10px', background: '#FFF8E0', borderRadius: 8, border: '1px solid #F5E5A8' }}>
                      <div style={{ fontSize: 8, color: '#7a6020', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 3 }}>Nota minha</div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 10, color: 'var(--navy)', fontStyle: 'italic', lineHeight: 1.4 }}>"No HSM, hemodinâmica → ext. 4421."</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lp-demo-label">03 · Patologia — Detalhe</div>
            </div>

            {/* Phone 4 — Antibioterapia MEWS */}
            <div className="lp-demo-frame">
              <div className="lp-phone">
                <div className="lp-phone-inner">
                  <div className="lp-phone-notch" />
                  <div style={{ background: 'var(--navy)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 14 14"><path d="M9 2 L4 7 L9 12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1 }}>Antibioterapia</div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)' }}>Guia + 3 ferramentas</div>
                    </div>
                  </div>
                  <div className="lp-phone-content">
                    <div style={{ fontSize: 9, color: 'var(--teal-mid)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Ferramentas</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
                      {[
                        { name: 'Guia rápido', desc: 'Por agente e indicação', color: '#5FBA9A' },
                        { name: 'MEWS', desc: 'Score de alerta', color: '#B85C00', active: true },
                        { name: 'Calc Pediátrica', desc: 'Doses por peso', color: 'var(--teal-mid)' },
                        { name: 'Teste alergia', desc: 'β-lactâmicos', color: '#8B6CC1' },
                      ].map((t, i) => (
                        <div key={i} style={{ background: t.active ? `${t.color}18` : 'var(--white)', border: `1.5px solid ${t.active ? t.color : 'var(--border)'}`, borderRadius: 10, padding: 8 }}>
                          <div style={{ width: 22, height: 22, borderRadius: 6, background: t.active ? 'var(--white)' : `${t.color}18`, marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 10, height: 10, borderRadius: 3, background: t.color, opacity: 0.6 }} />
                          </div>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 10, color: 'var(--navy)', fontWeight: 600, marginBottom: 1 }}>{t.name}</div>
                          <div style={{ fontSize: 8.5, color: 'var(--text-muted)' }}>{t.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <div>
                          <div style={{ fontSize: 8.5, color: '#B85C00', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>MEWS Score</div>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--navy)', fontWeight: 600 }}>Calculadora</div>
                        </div>
                        <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#B85C0018', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', border: '2px solid #B85C00' }}>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: '#B85C00', fontWeight: 700, lineHeight: 1 }}>4</div>
                          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 6.5, color: '#B85C00', textTransform: 'uppercase' as const, marginTop: 1 }}>Médio</div>
                        </div>
                      </div>
                      {[
                        { l: 'PA sistólica', v: '95', u: 'mmHg', p: 1, c: '#B85C00' },
                        { l: 'FC', v: '110', u: 'bpm', p: 2, c: '#E78F73' },
                        { l: 'FR', v: '22', u: 'cpm', p: 1, c: '#B85C00' },
                        { l: 'Temperatura', v: '37.8', u: '°C', p: 0, c: 'var(--teal-mid)' },
                        { l: 'AVPU', v: 'Alerta', u: '', p: 0, c: 'var(--teal-mid)' },
                      ].map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                          <span style={{ fontSize: 9.5, color: 'var(--text-soft)' }}>{r.l}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: 'var(--navy)', fontWeight: 600 }}>{r.v}{r.u && ` ${r.u}`}</span>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: r.c, padding: '1px 4px', background: `${r.c}18`, borderRadius: 3, fontWeight: 700 }}>+{r.p}</span>
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: 8, padding: '7px 9px', background: '#B85C0018', borderRadius: 7, fontSize: 9.5, color: '#B85C00', lineHeight: 1.4 }}>
                        <strong>Risco médio (4):</strong> reavaliar a cada 1h.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lp-demo-label">04 · Antibio — MEWS</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button className="lp-btn lp-btn--primary" onClick={goApp} style={{ boxShadow: '0 4px 20px rgba(18,138,114,0.25)' }}>
              Experimentar o app →
            </button>
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="lp-section lp-section--alt" id="precos">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-label">PREÇOS</div>
            <h2 className="lp-section-title">Um preço claro. Sem letra miúda.</h2>
            <p className="lp-section-subtitle">7 dias grátis. Sem cartão para começar. Stripe ou MB WAY.</p>
          </div>
          <div className="lp-pricing">
            {/* Mensal */}
            <div className="lp-pricing-card">
              <div className="lp-pricing-plan">Mensal</div>
              <div className="lp-pricing-price">
                <span className="lp-pricing-amount">4,99</span>
                <span className="lp-pricing-currency">€</span>
              </div>
              <div className="lp-pricing-period">Flexível. Cancela em 2 cliques.</div>
              <div className="lp-pricing-divider" />
              <div className="lp-pricing-features">
                {PRICING_FEATURES.map((f, j) => <div key={j} className="lp-pricing-feature">{f}</div>)}
              </div>
              <button className="lp-btn lp-btn--outline" onClick={goApp}>Começar mensal</button>
            </div>

            {/* Anual — featured */}
            <div className="lp-pricing-card lp-pricing-card--featured">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(90deg, #5FBA9A, var(--teal-mid))', borderRadius: '22px 22px 0 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div className="lp-pricing-badge">Recomendado</div>
                <span className="lp-chip lp-chip--mint">Poupa 17%</span>
              </div>
              <div className="lp-pricing-plan">Anual</div>
              <div className="lp-pricing-price">
                <span className="lp-pricing-amount">49,99</span>
                <span className="lp-pricing-currency">€</span>
              </div>
              <div className="lp-pricing-period">Equivale a 4,17€/mês.</div>
              <div className="lp-pricing-divider" />
              <div className="lp-pricing-features">
                {[...PRICING_FEATURES, 'Suporte prioritário', 'Exporta notas em PDF'].map((f, j) => <div key={j} className="lp-pricing-feature">{f}</div>)}
              </div>
              <button className="lp-btn lp-btn--primary" onClick={goApp} style={{ boxShadow: '0 4px 14px rgba(18,138,114,0.3)' }}>Começar anual →</button>
            </div>

            {/* Pro — coming soon */}
            <div className="lp-pricing-card" style={{ borderStyle: 'dashed', opacity: 0.7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="lp-chip lp-chip--navy">Pro</span>
                <span className="lp-chip lp-chip--amber">Em breve</span>
              </div>
              <div className="lp-pricing-plan" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Brevemente</div>
              <div className="lp-pricing-period">Para grupos de estudo e equipas hospitalares.</div>
              <div className="lp-pricing-divider" />
              <div className="lp-pricing-features">
                {[...PRICING_FEATURES, 'Biblioteca partilhada', 'Anotação em grupo'].map((f, j) => <div key={j} className="lp-pricing-feature lp-pricing-feature--disabled">{f}</div>)}
              </div>
              <button className="lp-btn lp-btn--outline" disabled style={{ cursor: 'not-allowed', opacity: 0.5 }}>Entrar na lista de espera</button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-label">QUEM JÁ USA</div>
            <h2 className="lp-section-title">Estudantes e médicos que já usam o Medeasy.</h2>
            <p className="lp-section-subtitle">Testemunhos de utilizadores actuais (nomes alterados por privacidade).</p>
          </div>
        </div>
        <div className="lp-testimonials">
          <div className="lp-marquee-track">
            {testimonialTrack.map((t, i) => (
              <div key={i} className="lp-testimonial-card">
                <div style={{ marginBottom: 14, opacity: 0.4 }}>
                  <ECGSoft width={70} height={20} color="#5FBA9A" stroke={1.2} beats={1} />
                </div>
                <div className="lp-testimonial-text" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>"{t.q}"</div>
                <div className="lp-testimonial-author">
                  <div className="lp-testimonial-avatar" style={{ background: 'var(--teal-light)' }}>{t.emoji}</div>
                  <div>
                    <div className="lp-testimonial-name">{t.a}</div>
                    <div className="lp-testimonial-role">{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="lp-section lp-section--alt" id="faq">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-label">PERGUNTAS FREQUENTES</div>
            <h2 className="lp-section-title">Tudo o que costumam perguntar.</h2>
          </div>
          <div className="lp-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="lp-faq-card">
                <div className="lp-faq-question">{f.q}</div>
                <div className="lp-faq-answer">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer CTA ─── */}
      <section className="lp-cta" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background ECG */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', opacity: 0.12, pointerEvents: 'none' }}>
          <ECGSoft width={2400} height={140} color="#5FBA9A" stroke={1.5} beats={3} />
        </div>
        <div style={{ position: 'absolute', top: -100, left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'var(--teal-mid)', opacity: 0.12, filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div className="lp-container" style={{ position: 'relative' }}>
          <div className="lp-section-label" style={{ color: '#5FBA9A' }}>COMEÇA HOJE</div>
          <h2 className="lp-cta-title">
            Estudar medicina é exigente.<br />
            <span>Tem boa companhia.</span>
          </h2>
          <p className="lp-cta-subtitle">7 dias grátis. Sem cartão. Cancela em 2 cliques.</p>
          <button className="lp-btn lp-btn--lg" onClick={goApp} style={{ background: '#5FBA9A', color: 'var(--navy)', border: 'none', fontWeight: 700, boxShadow: '0 8px 24px rgba(95,186,154,0.4)' }}>
            Criar conta grátis →
          </button>
          <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Auxiliar de estudo · Não constitui dispositivo médico</div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-main">
            <div className="lp-footer-brand">
              <div className="lp-footer-logo" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Logo size={28} />
                <span>Med<span>easy</span></span>
              </div>
              <p className="lp-footer-disclaimer">
                Medeasy é um <strong>auxiliar de estudo</strong> para estudantes de medicina e médicos. <strong>Não constitui dispositivo médico</strong>, não substitui guidelines oficiais nem o julgamento clínico do utilizador. Confirma sempre com fontes oficiais.
              </p>
            </div>
            <div className="lp-footer-links">
              <div className="lp-footer-col">
                <div className="lp-footer-col-title">Produto</div>
                <a href="#modulos">Módulos</a>
                <a href="#demo">Demo</a>
                <a href="#precos">Preços</a>
                <a href="#como-funciona">Como funciona</a>
              </div>
              <div className="lp-footer-col">
                <div className="lp-footer-col-title">Legal</div>
                <a href="#">Termos</a>
                <a href="#">Privacidade</a>
                <a href="#">Disclaimer</a>
              </div>
              <div className="lp-footer-col">
                <div className="lp-footer-col-title">Suporte</div>
                <a href="#faq">FAQ</a>
                <a href="#">Contacto</a>
              </div>
            </div>
          </div>
          <div className="lp-footer-bar">
            <div className="lp-footer-copyright">© 2026 Medeasy · Feito com ☕ em Portugal</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Auxiliar de estudo · Não constitui dispositivo médico</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
