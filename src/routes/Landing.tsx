import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const MODULES = [
  { icon: '❤️', tone: 'coral', name: 'Urgência', desc: '31 patologias com protocolos, sinais de alarme e fármacos.', chip: '31 patologias', available: true },
  { icon: '💉', tone: 'purple', name: 'Vacinação', desc: 'PNV adulto e pediátrico, vacinas extra, matriz por região.', chip: 'PNV 2025', available: true },
  { icon: '💊', tone: 'mint', name: 'Antibioterapia', desc: 'Guia rápido. Calculadora pediátrica, MEWS, teste de alergia.', chip: '+ 3 ferramentas', available: true },
  { icon: '🔀', tone: 'teal', name: 'Algoritmos', desc: 'Exame, diagnóstico diferencial e passos — ombro, cotovelo.', chip: '2 algoritmos', available: true },
  { icon: '🧪', tone: 'amber', name: 'Análises', desc: 'Interpretador de análises — valores normais e leitura rápida.', chip: 'Interpretador', available: true },
  { icon: '⚗️', tone: 'navy', name: 'Interações', desc: 'Verifica interações entre fármacos antes de prescrever.', chip: 'Checker', available: true },
  { icon: '📝', tone: 'amber', name: 'Notas pessoais', desc: 'Post-its inline em qualquer cartão + notas organizadas por especialidade.', chip: 'Pessoais', available: true },
  { icon: '🩺', tone: 'soon', name: 'Sintomas', desc: 'Diagnóstico diferencial guiado por sintomas.', chip: 'Em breve', available: false },
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

const PRICING = [
  { plan: 'Mensal', price: '4,99', period: '/mês', desc: 'Flexível. Cancela em 2 cliques.', featured: false },
  { plan: 'Anual', price: '49,99', period: '/ano', desc: 'Equivale a 4,17€/mês. Poupa 17%.', featured: true, badge: 'Recomendado' },
  { plan: 'Pro', price: '—', period: '', desc: 'Para grupos de estudo e equipas hospitalares.', featured: false, soon: true },
];

const PRICING_FEATURES = [
  'Todos os módulos disponíveis',
  'Funciona offline (PWA)',
  'Notas pessoais sincronizadas',
  'Pesquisa fuzzy em todo o app',
  'Actualizações regulares',
];

function Logo({ size = 32 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 4, background: 'var(--teal-mid)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 20 20">
        <path d="M1,10 L5,10 L7,4 L9,16 L11,10 L19,10" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const goApp = () => navigate('/home');

  const testimonialTrack = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="landing-scope">
      {/* Disclaimer */}
      <div className="lp-disclaimer">
        <strong>Auxiliar de estudo</strong>
        <span style={{ margin: '0 8px', opacity: 0.4 }}>·</span>
        Não constitui dispositivo médico nem substitui o julgamento clínico
      </div>

      {/* Nav */}
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

      {/* Hero */}
      <section className="lp-hero">
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
              <button className="lp-btn lp-btn--primary" onClick={goApp}>
                Começar grátis →
              </button>
              <button className="lp-btn lp-btn--outline" onClick={goApp}>
                Ver o app
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

          <div className="lp-hero-illustration">
            <div className="lp-hero-card lp-hero-card--1" style={{ border: '1px solid var(--border)' }}>
              <div className="lp-hero-card-icon" style={{ background: '#FAE6DE' }}>🚑</div>
              <div className="lp-hero-card-title">EAM com supra-ST</div>
              <div className="lp-hero-card-desc">AAS 250mg + Clopidogrel 600mg</div>
            </div>
            <div className="lp-hero-card lp-hero-card--2" style={{ border: '1px solid var(--border)' }}>
              <div className="lp-hero-card-icon" style={{ background: '#EDE6F8' }}>💉</div>
              <div className="lp-hero-card-title">Td/dTpa adulto</div>
              <div className="lp-hero-card-desc">Reforço cada 10 anos</div>
            </div>
            <div className="lp-hero-card lp-hero-card--3" style={{ border: '1px solid var(--border)', background: '#FFF8E0' }}>
              <div style={{ fontSize: 10, color: '#7a6020', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>📌 Nota minha</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--navy)', fontStyle: 'italic', lineHeight: 1.4 }}>"No HSM, ext. 4421 para hemodinâmica."</div>
            </div>
          </div>
        </div>
      </section>

      {/* Differential */}
      <section className="lp-diff">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-label">O QUE NOS DIFERENCIA</div>
            <h2 className="lp-section-title">Parece o que é —<br /><span>os teus apontamentos.</span></h2>
            <p className="lp-section-subtitle">Há quem consulte as suas notas. Há quem dependa de IA. O Medeasy põe-te do primeiro lado — é o teu caderno e o dos colegas, não um chatbot a falar por ti.</p>
          </div>
          <div className="lp-diff-grid">
            <div className="lp-diff-card">
              <div className="lp-chip lp-chip--amber" style={{ marginBottom: 16 }}>01 · TEUS</div>
              <div className="lp-diff-card-title">Notas pessoais, onde tu queres.</div>
              <div className="lp-diff-card-desc">Cola um post-it digital em qualquer cartão. Truques do teu hospital, lembretes, dúvidas — anexados ao protocolo onde ficam úteis.</div>
            </div>
            <div className="lp-diff-card">
              <div className="lp-chip lp-chip--mint" style={{ marginBottom: 16 }}>02 · COMUNIDADE</div>
              <div className="lp-diff-card-title">Apontamentos da comunidade médica.</div>
              <div className="lp-diff-card-desc">Notas partilhadas por estudantes e médicos — revistas pelos pares antes de aparecerem. Aprende com a experiência dos outros.</div>
            </div>
            <div className="lp-diff-card">
              <div className="lp-chip lp-chip--teal" style={{ marginBottom: 16 }}>03 · DISCRETO</div>
              <div className="lp-diff-card-title">Pareces preparado. Porque estás.</div>
              <div className="lp-diff-card-desc">Em frente a um doente ou colega, consultar o Medeasy parece-se com as tuas notas — não com um chat de IA. Mesma confiança clínica, sem o estigma.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="lp-section lp-preview">
        <div className="lp-container">
          <div>
            <div className="lp-section-label">A DIFERENÇA</div>
            <h2 className="lp-section-title" style={{ textAlign: 'left', marginBottom: 16 }}>Simples. Rápido.<br />Em qualquer lugar.</h2>
            <p className="lp-section-subtitle" style={{ textAlign: 'left', margin: '0 0 40px' }}>Pesquisa instantânea, leitura em segundos, funciona offline.</p>
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
          <div className="lp-phone">
            <div className="lp-phone-inner">
              <div className="lp-phone-notch" />
              <div style={{ background: 'var(--navy)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Logo size={24} />
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#fff', fontWeight: 600 }}>Medeasy</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)' }}>Auxiliar de estudo</div>
                </div>
              </div>
              <div className="lp-phone-content">
                <div style={{ width: 30, height: 2.5, background: 'var(--teal-mid)', borderRadius: 2, marginBottom: 10 }} />
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--navy)', fontWeight: 600, marginBottom: 4 }}>Urgência</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>31 patologias · 7 áreas</div>
                {[
                  { title: 'EAM com supra-ST', sub: 'Síndrome coronária aguda', color: '#E78F73' },
                  { title: 'Edema agudo do pulmão', sub: 'IC descompensada', color: '#E78F73' },
                  { title: 'Taquicardia supra-V', sub: 'Manobras vagais', color: '#B85C00' },
                ].map((p, i) => (
                  <div key={i} style={{ background: 'var(--white)', borderRadius: 12, padding: '10px 12px', marginBottom: 6, border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: p.color, borderRadius: '12px 0 0 12px' }} />
                    <div style={{ paddingLeft: 6 }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 12.5, color: 'var(--navy)', fontWeight: 600 }}>{p.title}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="lp-section lp-section--alt" id="modulos">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-label">MÓDULOS</div>
            <h2 className="lp-section-title">Tudo o que precisas, num só lugar.</h2>
            <p className="lp-section-subtitle">Cada módulo é uma estante de cartões — abre um, lê, fecha. Sem distracção, sem caça à informação.</p>
          </div>
          <div className="lp-modules">
            {MODULES.map((m, i) => (
              <div key={i} className={`lp-module-card${m.available ? ' lp-module-card--available' : ''}`} style={{ opacity: m.available ? 1 : 0.6 }}>
                <div className={`lp-module-icon lp-module-icon--${m.tone}`}>{m.icon}</div>
                <div className="lp-module-title">{m.name}</div>
                <div className="lp-module-desc">{m.desc}</div>
                <div className="lp-module-chip">
                  <span className={`lp-chip lp-chip--${m.tone}`}>{m.chip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
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

      {/* Pricing */}
      <section className="lp-section lp-section--alt" id="precos">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-label">PREÇOS</div>
            <h2 className="lp-section-title">Um preço claro. Sem letra miúda.</h2>
            <p className="lp-section-subtitle">7 dias grátis. Sem cartão para começar. Stripe ou MB WAY.</p>
          </div>
          <div className="lp-pricing">
            {PRICING.map((p, i) => (
              <div key={i} className={`lp-pricing-card${p.featured ? ' lp-pricing-card--featured' : ''}`} style={p.soon ? { borderStyle: 'dashed', opacity: 0.7 } : undefined}>
                {p.badge && <div className="lp-pricing-badge">{p.badge}</div>}
                <div className="lp-pricing-plan">{p.plan}</div>
                <div className="lp-pricing-price">
                  <span className="lp-pricing-amount">{p.price}</span>
                  {!p.soon && <span className="lp-pricing-currency">€</span>}
                </div>
                <div className="lp-pricing-period">{p.desc}</div>
                <div className="lp-pricing-divider" />
                <div className="lp-pricing-features">
                  {PRICING_FEATURES.map((f, j) => (
                    <div key={j} className={`lp-pricing-feature${p.soon ? ' lp-pricing-feature--disabled' : ''}`}>{f}</div>
                  ))}
                </div>
                <button
                  className={`lp-btn ${p.featured ? 'lp-btn--primary' : 'lp-btn--outline'}`}
                  onClick={p.soon ? undefined : goApp}
                  disabled={p.soon}
                  style={p.soon ? { cursor: 'not-allowed', opacity: 0.5 } : undefined}
                >
                  {p.soon ? 'Em breve' : p.featured ? 'Começar anual →' : 'Começar mensal'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
                <div className="lp-testimonial-stars">★★★★★</div>
                <div className="lp-testimonial-text">"{t.q}"</div>
                <div className="lp-testimonial-author">
                  <div className="lp-testimonial-avatar">{t.emoji}</div>
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

      {/* FAQ */}
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

      {/* Footer CTA */}
      <section className="lp-cta">
        <div className="lp-container">
          <h2 className="lp-cta-title">
            Estudar medicina é exigente.<br />
            <span>Tem boa companhia.</span>
          </h2>
          <p className="lp-cta-subtitle">7 dias grátis. Sem cartão. Cancela em 2 cliques.</p>
          <button className="lp-btn lp-btn--lg" onClick={goApp} style={{ background: '#5FBA9A', color: 'var(--navy)', border: 'none', fontWeight: 700 }}>
            Criar conta grátis →
          </button>
          <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Auxiliar de estudo · Não constitui dispositivo médico</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-main">
            <div className="lp-footer-brand">
              <div className="lp-footer-logo" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Logo size={28} />
                <span>Med<span>easy</span></span>
              </div>
              <div className="lp-footer-disclaimer">
                Medeasy é um <strong>auxiliar de estudo</strong> para estudantes de medicina e médicos. <strong>Não constitui dispositivo médico</strong>, não substitui guidelines oficiais nem o julgamento clínico do utilizador. Confirma sempre com fontes oficiais.
              </div>
            </div>
            <div className="lp-footer-links">
              <div className="lp-footer-col">
                <div className="lp-footer-col-title">Produto</div>
                <a href="#modulos">Módulos</a>
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
