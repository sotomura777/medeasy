import { useNotasStore, type Categoria, type Nota } from '../../store/notas';
import NotaSubCard from './NotaSubCard';

interface CategoriaCardProps {
  cat: Categoria;
  onEditCat: (cat: Categoria) => void;
  onAddNota: (catId: string) => void;
  onOpenNota: (catId: string, nota: Nota) => void;
}

export default function CategoriaCard({ cat, onEditCat, onAddNota, onOpenNota }: CategoriaCardProps) {
  const toggleCategoria = useNotasStore((s) => s.toggleCategoria);

  return (
    <div className={`cat-card${cat.open ? ' open' : ''}`}>
      <div className="cat-header" onClick={() => toggleCategoria(cat.id)}>
        <div className="cat-header-left">
          <div className="cat-icon-wrap" style={{ background: cat.bg }}>
            {cat.emoji}
          </div>
          <div>
            <div className="cat-title-text">{cat.nome}</div>
            {cat.sub && <div className="cat-subtitle-text">{cat.sub}</div>}
          </div>
        </div>
        <div className="cat-meta">
          <span className="cat-count">
            {cat.notas.length} nota{cat.notas.length !== 1 ? 's' : ''}
          </span>
          <button
            className="mbtn"
            style={{ padding: '4px 10px', fontSize: 12 }}
            onClick={(e) => { e.stopPropagation(); onEditCat(cat); }}
          >
            ✏️
          </button>
          <span className="cat-chevron">{cat.open ? '▲' : '▼'}</span>
        </div>
      </div>
      {cat.open && (
        <div className="cat-body" style={{ display: 'block' }}>
          <div className="sub-grid">
            {cat.notas.map((nota) => (
              <NotaSubCard
                key={nota.id}
                nota={nota}
                onClick={() => onOpenNota(cat.id, nota)}
              />
            ))}
            <div className="sub-card-add" onClick={() => onAddNota(cat.id)}>
              <div className="sub-card-add-icon">＋</div>
              <span>Adicionar nota</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
