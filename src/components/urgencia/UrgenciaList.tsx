import { useState, useMemo, useEffect, useRef } from 'react';
import type { Patologia } from '../../content/schema';
import type { SpecialityId } from './icons';
import { IconSearch, IconBookmark, IconChevronRight, IconSun, IconMoon } from './icons';
import { SpecialityIcon, SPECIALITIES, SPEC_BY_ID } from './icons';
import { PATOLOGIA_META, type Severidade } from './patologia-meta';
import { createPatologiaSearch } from '../../lib/search';

interface Props {
  patologias: Patologia[];
  bookmarks: Set<string>;
  onToggleBookmark: (id: string) => void;
  onSelect: (id: string) => void;
  theme: 'day' | 'night';
  onToggleTheme: () => void;
}

const SEV_LABEL: Record<Severidade, string> = {
  critica: 'Crítica',
  urgente: 'Urgente',
  estavel: 'Estável',
};

export default function UrgenciaList({
  patologias, bookmarks, onToggleBookmark, onSelect, theme, onToggleTheme,
}: Props) {
  const [query, setQuery] = useState('');
  const [specFilter, setSpecFilter] = useState<SpecialityId | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sorted = useMemo(
    () => [...patologias].sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt')),
    [patologias],
  );

  const fuse = useMemo(() => createPatologiaSearch(sorted), [sorted]);

  const filtered = useMemo(() => {
    let list = query.trim() ? fuse.search(query).map(r => r.item) : sorted;
    if (specFilter) {
      list = list.filter(p => PATOLOGIA_META[p.id]?.especialidade === specFilter);
    }
    return list;
  }, [query, sorted, fuse, specFilter]);

  const groups = useMemo(() => {
    const map: Record<string, Patologia[]> = {};
    for (const p of filtered) {
      const letter = p.titulo.charAt(0).toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(p);
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="urg-topbar">
        <div className="urg-topbar-row">
          <div>
            <div className="urg-title">Tratamento — Urgência</div>
            <div className="urg-sub">Protocolos por patologia</div>
          </div>
          <div className="urg-search-wrap">
            <IconSearch size={16} />
            <input
              ref={inputRef}
              type="text"
              className="urg-search"
              placeholder="Pesquisar patologia… ⌘K"
              autoComplete="off"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <span className="urg-count-badge">
            {filtered.length} {filtered.length === 1 ? 'patologia' : 'patologias'}
          </span>
          <div className="urg-topbar-actions">
            <button className="urg-theme-btn" onClick={onToggleTheme} title={theme === 'day' ? 'Modo noturno' : 'Modo diurno'}>
              {theme === 'day' ? <IconMoon size={16} /> : <IconSun size={16} />}
            </button>
          </div>
        </div>
        <div className="urg-chips">
          {SPECIALITIES.map(spec => {
            const Icon = SpecialityIcon[spec.id];
            const active = specFilter === spec.id;
            return (
              <button
                key={spec.id}
                className={`urg-chip${active ? ' active' : ''}`}
                style={{ '--chip-color': spec.color, '--chip-bg': `${spec.color}22` } as React.CSSProperties}
                onClick={() => setSpecFilter(active ? null : spec.id)}
              >
                <Icon size={14} />
                {spec.short}
              </button>
            );
          })}
        </div>
      </div>

      {groups.length === 0 && <div className="empty">Nenhuma patologia encontrada.</div>}

      {groups.map(([letter, items]) => (
        <div key={letter} className="alpha-group">
          <div className="alpha-label">{letter}</div>
          {items.map(p => {
            const meta = PATOLOGIA_META[p.id];
            const spec = meta ? SPEC_BY_ID[meta.especialidade] : null;
            const Icon = meta ? SpecialityIcon[meta.especialidade] : null;
            const isBookmarked = bookmarks.has(p.id);

            return (
              <div key={p.id} className="pat-row" onClick={() => onSelect(p.id)}>
                {meta && <div className={`pat-sev-rail sev-${meta.severidade}`} />}
                <div
                  className="pat-spec-icon"
                  style={spec ? { background: `${spec.color}15`, color: spec.color } : undefined}
                >
                  {Icon ? <Icon size={18} /> : <span>{p.icone}</span>}
                </div>
                <div className="pat-info">
                  <div className="pat-title">{p.titulo}</div>
                  {meta && <div className="pat-summary">{meta.summary}</div>}
                </div>
                <div className="pat-right">
                  {meta && (
                    <span className={`pat-sev-badge sev-${meta.severidade}`}>
                      {SEV_LABEL[meta.severidade]}
                    </span>
                  )}
                  <button
                    className={`pat-bm-btn${isBookmarked ? ' active' : ''}`}
                    onClick={e => { e.stopPropagation(); onToggleBookmark(p.id); }}
                    title={isBookmarked ? 'Remover favorito' : 'Adicionar favorito'}
                  >
                    <IconBookmark size={16} filled={isBookmarked} />
                  </button>
                  <IconChevronRight size={16} className="pat-chevron" />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
