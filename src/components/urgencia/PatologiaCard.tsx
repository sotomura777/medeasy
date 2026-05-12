import { useState, useCallback } from 'react';
import type { Patologia } from '../../content/schema';
import PatologiaTabs from './PatologiaTabs';

interface PatologiaCardProps {
  patologia: Patologia;
}

export default function PatologiaCard({ patologia }: PatologiaCardProps) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <div className={`ucard${open ? ' open' : ''}`}>
      <div className="ucard-header" onClick={toggle}>
        <div className="ucard-icon">{patologia.icone}</div>
        <div className="ucard-meta">
          <div className="ucard-title">{patologia.titulo}</div>
          <div className="ucard-tags">
            {patologia.tags.map((tag) => (
              <span key={tag.texto} className={`utag utag-${tag.cor}`}>
                {tag.texto}
              </span>
            ))}
          </div>
        </div>
        <svg
          className="ucard-chevron"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <div className="ucard-body" style={{ display: 'block' }}>
          <PatologiaTabs tabs={patologia.tabs} patologiaId={patologia.id} />
        </div>
      )}
    </div>
  );
}
