import { useNavigate } from 'react-router-dom';

interface BackBarProps {
  label: string;
}

export default function BackBar({ label }: BackBarProps) {
  const navigate = useNavigate();

  return (
    <div className="back-bar">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Voltar
      </button>
      <span className="breadcrumb">
        Início / <span>{label}</span>
      </span>
    </div>
  );
}
