import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

function ECGSoft({ width = 600, height = 80, color = '#5FBA9A', stroke = 1.5, beats = 2 }: { width?: number; height?: number; color?: string; stroke?: number; beats?: number }) {
  const beatSeg = (cx: number, h: number) =>
    `L${cx - 12},${h / 2} L${cx - 8},${h / 2 - 4} L${cx - 4},${h / 2 + 3} L${cx},${h / 2 - 22} L${cx + 4},${h / 2 + 18} L${cx + 8},${h / 2 - 6} L${cx + 12},${h / 2}`;
  const positions = beats === 1 ? [width / 2] : Array.from({ length: beats }, (_, i) => (width / (beats + 1)) * (i + 1));
  let d = `M0,${height / 2}`;
  positions.forEach(cx => { d += ` ${beatSeg(cx, height)}`; });
  d += ` L${width},${height / 2}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo({ size = 34 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 4, background: 'var(--teal-mid)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 20 20">
        <path d="M1,10 L5,10 L7,4 L9,16 L11,10 L19,10" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="auth-scope">
      {/* Left panel */}
      <div className="auth-left">
        <div className="auth-left-blob" />
        <div className="auth-left-ecg">
          <ECGSoft width={900} height={80} color="#5FBA9A" stroke={1.5} beats={2} />
        </div>

        <div className="auth-brand">
          <Logo />
          <div>
            <div className="auth-brand-name">Medeasy</div>
            <div className="auth-brand-sub">Auxiliar de estudo · Ano Comum</div>
          </div>
        </div>

        <div className="auth-left-content">
          <div className="auth-left-kicker">ENTRAR</div>
          <h1 className="auth-left-title">Bem-vindo de volta.</h1>
          <p className="auth-left-sub">Entra com email ou contas Google/Apple. Os teus módulos, cartões e notas pessoais estão à tua espera.</p>

          <div className="auth-preview-card">
            <div className="auth-preview-inner">
              <div className="auth-preview-chips">
                <span className="auth-chip auth-chip--coral">Urgência</span>
                <span className="auth-chip auth-chip--amber">P1 · 2 min</span>
              </div>
              <div className="auth-preview-title">Anafilaxia</div>
              <div className="auth-preview-desc">Adrenalina 0,5mg IM coxa lateral. Repetir 5–15min se sem resposta.</div>
            </div>
          </div>
        </div>

        <div className="auth-left-footer">
          <span className="auth-left-footer-dot">●</span>
          <span><strong style={{ color: 'var(--text-soft)' }}>Auxiliar de estudo.</strong> Não substitui julgamento clínico.</span>
        </div>
      </div>

      {/* Right form */}
      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-bar" />
          <h2 className="auth-form-title">Entra na tua conta</h2>
          <p className="auth-form-subtitle">Continua de onde paraste.</p>

          <div className="auth-oauth">
            <button type="button" className="auth-oauth-btn" onClick={() => navigate('/home')}>
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M15.68 8.18c0-.57-.05-1.12-.15-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.42v2h2.59c1.51-1.4 2.39-3.45 2.39-5.88z" fill="#4285F4"/><path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2a4.78 4.78 0 0 1-7.13-2.52H.94v2.06A8 8 0 0 0 8 16z" fill="#34A853"/><path d="M3.58 9.54a4.81 4.81 0 0 1 0-3.08V4.4H.94a8 8 0 0 0 0 7.2l2.64-2.06z" fill="#FBBC05"/><path d="M8 3.18c1.22 0 2.31.42 3.17 1.24l2.38-2.38C12.15.77 10.25 0 8 0A8 8 0 0 0 .94 4.4l2.64 2.06A4.77 4.77 0 0 1 8 3.18z" fill="#EA4335"/></svg>
              Google
            </button>
            <button type="button" className="auth-oauth-btn" onClick={() => navigate('/home')}>
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M11.18 0C9.6.1 7.78 1.1 6.72 2.4 5.78 3.52 4.98 5.2 5.32 6.82c1.7.04 3.48-.98 4.5-2.28.94-1.18 1.66-2.84 1.36-4.54zM14.1 5.56C12.76 4 10.78 3.1 9 3.1c-1.24 0-2.22.5-3 .5s-1.88-.48-3.08-.46C1.3 3.16 0 4.88 0 8.12c0 2.02.78 4.14 1.74 5.52.82 1.18 1.54 2.16 2.64 2.16 1.06 0 1.5-.7 2.8-.7 1.32 0 1.62.7 2.74.68 1.16-.02 1.88-1.06 2.7-2.24.58-.82.82-1.32 1.12-2.24C11.7 10.28 10.76 8 11.58 6.1c.34-.78.98-1.48 1.52-1.94.54-.46-.46-.36-1-.6h2z" fill="var(--navy)"/></svg>
              Apple
            </button>
          </div>

          <div className="auth-divider">OU EMAIL</div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input className="auth-input" type="email" placeholder="nome@hospital.pt" />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input className="auth-input" type="password" placeholder="••••••••" />
          </div>

          <div className="auth-options">
            <label className="auth-remember">
              <input type="checkbox" defaultChecked />
              Manter sessão
            </label>
            <button type="button" className="auth-forgot">Esqueci-me</button>
          </div>

          <button type="submit" className="auth-submit">Entrar →</button>

          <div className="auth-switch">
            Sem conta? <Link to="/register">Cria em 30 segundos →</Link>
          </div>
        </form>
      </div>

      <Link to="/" className="auth-back">
        <svg width="13" height="13" viewBox="0 0 13 13">
          <path d="M8 2 L3 6.5 L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        Voltar
      </Link>
    </div>
  );
}
