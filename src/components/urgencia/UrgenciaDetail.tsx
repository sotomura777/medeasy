import { useState, useEffect, useCallback } from 'react';
import DOMPurify from 'dompurify';
import type { Patologia } from '../../content/schema';
import { IconArrowLeft, IconBookmark, SpecialityIcon, SPEC_BY_ID } from './icons';
import { PATOLOGIA_META, type Severidade } from './patologia-meta';

const ALLOWED_TAGS = [
  'div', 'span', 'p', 'br', 'b', 'strong', 'i', 'em', 'u', 'small',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'ul', 'ol', 'li', 'a', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'sup', 'sub', 'hr',
];
const ALLOWED_ATTR = ['class', 'style', 'href', 'target', 'rel', 'src', 'alt', 'width', 'height'];

const SEV_LABEL: Record<Severidade, string> = {
  critica: 'Crítica',
  urgente: 'Urgente',
  estavel: 'Estável',
};

interface Props {
  patologia: Patologia;
  bookmarked: boolean;
  onToggleBookmark: () => void;
  onBack: () => void;
}

export default function UrgenciaDetail({ patologia, bookmarked, onToggleBookmark, onBack }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const meta = PATOLOGIA_META[patologia.id];
  const spec = meta ? SPEC_BY_ID[meta.especialidade] : null;
  const Icon = meta ? SpecialityIcon[meta.especialidade] : null;

  const goBack = useCallback(() => onBack(), [onBack]);

  useEffect(() => {
    setActiveTab(0);
  }, [patologia.id]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Escape') { goBack(); return; }
      if (e.key === 'b' || e.key === 'B') { onToggleBookmark(); return; }
      const n = parseInt(e.key);
      if (n >= 1 && n <= patologia.tabs.length) {
        setActiveTab(n - 1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goBack, onToggleBookmark, patologia.tabs.length]);

  return (
    <div className="detail-view">
      <button className="detail-back" onClick={goBack}>
        <IconArrowLeft size={16} /> Voltar
      </button>

      <div className="detail-header">
        <div className="detail-top-row">
          {spec && Icon && (
            <span
              className="detail-spec-badge"
              style={{ background: `${spec.color}18`, color: spec.color, border: `1px solid ${spec.color}40` }}
            >
              <Icon size={14} /> {spec.label}
            </span>
          )}
          {meta && (
            <span className={`pat-sev-badge sev-${meta.severidade}`}>
              {SEV_LABEL[meta.severidade]}
            </span>
          )}
          <div className="detail-actions">
            <button
              className={`pat-bm-btn${bookmarked ? ' active' : ''}`}
              onClick={onToggleBookmark}
              title={bookmarked ? 'Remover favorito' : 'Adicionar favorito'}
            >
              <IconBookmark size={18} filled={bookmarked} />
            </button>
          </div>
        </div>
        <div className="detail-title">{patologia.titulo}</div>
        {patologia.tags.length > 0 && (
          <div className="detail-tags">
            {patologia.tags.map(tag => (
              <span key={tag.texto} className={`utag utag-${tag.cor}`}>{tag.texto}</span>
            ))}
          </div>
        )}
      </div>

      <div className="utabs">
        {patologia.tabs.map((tab, i) => (
          <button
            key={tab.id}
            className={`utab-btn${i === activeTab ? ' active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {patologia.tabs.map((tab, i) => (
        <div
          key={`${patologia.id}-${tab.id}`}
          className={`utab-pane${i === activeTab ? ' active' : ''}`}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(tab.html, { ALLOWED_TAGS, ALLOWED_ATTR }),
          }}
        />
      ))}
    </div>
  );
}
