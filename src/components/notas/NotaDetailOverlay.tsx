import type { Nota } from '../../store/notas';

interface NotaDetailOverlayProps {
  nota: Nota;
  onClose: () => void;
  onEdit: () => void;
}

export default function NotaDetailOverlay({ nota, onClose, onEdit }: NotaDetailOverlayProps) {
  return (
    <div
      className="nota-detail-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="nota-detail">
        <div className="nd-hero">
          <div>
            <div className="nd-title">{nota.nome}</div>
            {nota.tag && <div className="nd-desc">{nota.tag}</div>}
          </div>
          <div className="nd-actions">
            <button className="mbtn" onClick={onEdit}>✏️ Editar</button>
            <button className="mbtn" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="nd-body">
          {nota.conteudo ? (
            <>
              <div className="nd-label">Conteúdo</div>
              <div className="nd-text">{nota.conteudo}</div>
            </>
          ) : (
            <div className="nd-text" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Sem conteúdo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
