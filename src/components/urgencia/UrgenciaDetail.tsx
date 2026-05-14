import { useState, useEffect, useCallback } from 'react';
import DOMPurify from 'dompurify';
import type { Patologia } from '../../content/schema';
import { IconArrowLeft, IconBookmark, SpecialityIcon, SPEC_BY_ID } from './icons';
import { PATOLOGIA_META, type Severidade } from './patologia-meta';

const ALLOWED_TAGS = [
  'div', 'span', 'p', 'br', 'b', 'strong', 'i', 'em', 'u', 'small',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'ul', 'ol', 'li', 'a', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'sup', 'sub', 'hr', 'code',
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
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [patologia.id]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === 'Escape') { goBack(); return; }
      if (e.key === 'b' && !e.metaKey && !e.ctrlKey) { onToggleBookmark(); return; }
      const n = parseInt(e.key);
      if (n >= 1 && n <= patologia.tabs.length) {
        setActiveTab(n - 1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goBack, onToggleBookmark, patologia.tabs.length]);

  return (
    <div className="urg-page">
      <button className="back-link" onClick={goBack}>
        <IconArrowLeft size={16} />
        <span>Urgência</span>
      </button>

      <header className="detail-head">
        <div className="detail-eyebrow">
          {spec && Icon && (
            <span className="detail-spec-badge" style={{ color: spec.color }}>
              <Icon size={14} />
              {spec.label}
            </span>
          )}
          {meta && (
            <span className={`detail-sev-pill sev-${meta.severidade}`}>
              {SEV_LABEL[meta.severidade]}
            </span>
          )}
        </div>
        <div className="detail-title-row">
          <h1 className="detail-title">{patologia.titulo}</h1>
          <div className="detail-actions">
            <button
              className={`icon-btn${bookmarked ? ' on' : ''}`}
              onClick={onToggleBookmark}
              title={bookmarked ? 'Remover favorito (B)' : 'Adicionar a favoritos (B)'}
              aria-pressed={bookmarked}
            >
              <IconBookmark size={18} filled={bookmarked} />
            </button>
          </div>
        </div>
        <div className="detail-tags">
          {patologia.tags.map(t => (
            <span key={t.texto} className="detail-tag">{t.texto}</span>
          ))}
        </div>
      </header>

      <nav className="tabs" role="tablist">
        {patologia.tabs.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={i === activeTab}
            className={`tab-btn${i === activeTab ? ' active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <span className="tab-kbd">{i + 1}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {patologia.tabs.map((tab, i) => (
        <div
          key={`${patologia.id}-${tab.id}`}
          className={`pane${i === activeTab ? ' active' : ''}`}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(tab.html, { ALLOWED_TAGS, ALLOWED_ATTR }),
          }}
        />
      ))}

      <div className="urg-disclaimer">
        Conteúdo educacional · revisto entre pares. Não substitui o julgamento
        clínico. Atalhos: <span className="kbd">1</span>·<span className="kbd">2</span>·<span className="kbd">3</span> tabs · <span className="kbd">B</span> favorito · <span className="kbd">Esc</span> voltar.
      </div>
    </div>
  );
}
