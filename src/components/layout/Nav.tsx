import { useLocation, Link } from 'react-router-dom';

const labels: Record<string, string> = {
  '/home': 'Início',
  '/urgencia': 'Urgência',
  '/notas': 'Notas',
};

export default function Nav() {
  const { pathname } = useLocation();
  const badge = labels[pathname] ?? 'Início';

  return (
    <nav className="nav">
      <Link to="/home" className="nav-brand" style={{ textDecoration: 'none' }}>
        <div className="nav-logo">⚕</div>
        <div>
          <div className="nav-title">Medeasy</div>
          <div className="nav-sub">Referência clínica — SPMD 2025/2026</div>
        </div>
      </Link>
      <span className="nav-badge">{badge}</span>
    </nav>
  );
}
