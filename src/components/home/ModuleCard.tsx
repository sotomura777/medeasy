import { useNavigate } from 'react-router-dom';
import type { AppModule } from '../../content/schema';

interface ModuleCardProps {
  mod: AppModule;
}

export default function ModuleCard({ mod }: ModuleCardProps) {
  const navigate = useNavigate();

  function handleClick() {
    if (mod.status === 'available' && mod.rota) {
      navigate(mod.rota);
    }
  }

  return (
    <div
      className={`module-card ${mod.status === 'available' ? 'available' : 'soon'}`}
      onClick={handleClick}
      role={mod.status === 'available' ? 'link' : undefined}
      tabIndex={mod.status === 'available' ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
    >
      <span className="mc-emoji">{mod.emoji}</span>
      <div className="mc-name">{mod.nome}</div>
      <div className="mc-desc">{mod.descricao}</div>
      <span className={`mc-status ${mod.status === 'available' ? 'ok' : 'soon'}`}>
        {mod.status === 'available' ? 'Disponível' : 'Em breve'}
      </span>
      {mod.status === 'available' && <span className="mc-arrow">→</span>}
    </div>
  );
}
