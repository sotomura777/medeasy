import { useState, useMemo, useEffect, useRef } from 'react';
import type { Patologia } from '../../content/schema';
import type { SpecialityId } from './icons';
import { IconSearch, IconClose, IconBookmark, IconChevronRight, IconSun, IconMoon } from './icons';
import { SpecialityIcon, SPECIALITIES } from './icons';
import { PATOLOGIA_META } from './patologia-meta';

interface Props {
  patologias: Patologia[];
  bookmarks: Set<string>;
  onToggleBookmark: (id: string) => void;
  onSelect: (id: string) => void;
  theme: 'day' | 'night';
  onToggleTheme: () => void;
}

type FilterMode = 'all' | 'bookmarks' | SpecialityId;

export default function UrgenciaList({
  patologias, bookmarks, onToggleBookmark, onSelect, theme, onToggleTheme,
}: Props) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterMode>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const sorted = useMemo(
    () => [...patologias].sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt')),
    [patologias],
  );

  const countBySpec = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of sorted) {
      const meta = PATOLOGIA_META[p.id];
      if (meta) m[meta.especialidade] = (m[meta.especialidade] ?? 0) + 1;
    }
    return m;
  }, [sorted]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter(p => {
      if (activeFilter === 'bookmarks') {
        if (!bookmarks.has(p.id)) return false;
      } else if (activeFilter !== 'all') {
        if (PATOLOGIA_META[p.id]?.especialidade !== activeFilter) return false;
      }
      if (!q) return true;
      const meta = PATOLOGIA_META[p.id];
      return (
        p.titulo.toLowerCase().includes(q) ||
        (meta?.summary ?? '').toLowerCase().includes(q) ||
        p.tags.some(t => t.texto.toLowerCase().includes(q))
      );
    });
  }, [query, sorted, activeFilter, bookmarks]);

  const groups = useMemo(() => {
    const m = new Map<string, Patologia[]>();
    for (const p of filtered) {
      const k = p.titulo.charAt(0).toUpperCase();
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(p);
    }
    return [...m.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      } else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        setQuery('');
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="urg-page">
      <div className="list-head">
        <div>
          <div className="list-eyebrow">⚕ Tratamento</div>
          <div className="list-title-row">
            <div>
              <h1 className="list-title">Urgência</h1>
              <p className="list-sub">
                Protocolos por patologia · linhas terapêuticas, fármacos e sinais de alarme.
              </p>
            </div>
            <div className="list-actions-row">
              <div className="list-counter">
                <b>{filtered.length}</b> de <b>{sorted.length}</b>
                {' '}{filtered.length === 1 ? 'patologia' : 'patologias'}
              </div>
              <button className="urg-theme-btn" onClick={onToggleTheme} title="Tema dia/noite">
                {theme === 'night' ? <IconSun size={14} /> : <IconMoon size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div className="search-wrap">
          <IconSearch size={18} />
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Pesquisar patologia, fármaco, sinal..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          {query ? (
            <button className="search-clear" onClick={() => setQuery('')}>
              <IconClose size={16} />
            </button>
          ) : (
            <span className="search-kbd">⌘K</span>
          )}
        </div>

        <div className="chip-row">
          <button
            className={`chip${activeFilter === 'all' ? ' active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todas <span className="chip-count">{sorted.length}</span>
          </button>
          <button
            className={`chip${activeFilter === 'bookmarks' ? ' active' : ''}`}
            onClick={() => setActiveFilter('bookmarks')}
            title="Os meus favoritos"
          >
            <IconBookmark size={13} filled={activeFilter === 'bookmarks'} />
            Favoritos <span className="chip-count">{bookmarks.size}</span>
          </button>
          <div className="chip-divider" />
          {SPECIALITIES.map(s => {
            const Icon = SpecialityIcon[s.id];
            return (
              <button
                key={s.id}
                className={`chip${activeFilter === s.id ? ' active' : ''}`}
                onClick={() => setActiveFilter(s.id)}
              >
                <Icon size={14} />
                {s.short}
                <span className="chip-count">{countBySpec[s.id] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="empty">
          Nenhuma patologia encontrada{query ? ` para "${query}"` : ''}.
        </div>
      ) : (
        groups.map(([letter, items]) => (
          <section key={letter} className="alpha-block">
            <div className="alpha-label">{letter}</div>
            <div className="pat-list">
              {items.map(p => {
                const meta = PATOLOGIA_META[p.id];
                const Icon = meta ? SpecialityIcon[meta.especialidade] : null;
                const isBookmarked = bookmarks.has(p.id);

                return (
                  <div
                    key={p.id}
                    className={`pat-row${meta ? ` sev-${meta.severidade}` : ''}`}
                    onClick={() => onSelect(p.id)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(p.id); }
                    }}
                  >
                    <div className={`pat-ico${meta ? ` spec-${meta.especialidade}` : ''}`}>
                      {Icon ? <Icon size={20} /> : <span>{p.icone}</span>}
                    </div>
                    <div className="pat-meta">
                      <div className="pat-title-row">
                        <div className="pat-title">{p.titulo}</div>
                      </div>
                      <div className="pat-summary">
                        {meta?.summary ?? ''}
                      </div>
                    </div>
                    <div className="pat-tags">
                      {p.tags.slice(0, 2).map(t => (
                        <span key={t.texto} className={`pat-tag${meta?.severidade === 'critica' ? ' t-critica' : meta?.severidade === 'urgente' ? ' t-urgente' : ''}`}>
                          {t.texto}
                        </span>
                      ))}
                    </div>
                    <div className="pat-side">
                      <button
                        className={`pat-bookmark${isBookmarked ? ' on' : ''}`}
                        onClick={e => { e.stopPropagation(); onToggleBookmark(p.id); }}
                        aria-label={isBookmarked ? 'Remover favorito' : 'Adicionar a favoritos'}
                        title={isBookmarked ? 'Remover favorito' : 'Adicionar a favoritos'}
                      >
                        <IconBookmark size={18} filled={isBookmarked} />
                      </button>
                      <span className="pat-chevron"><IconChevronRight size={18} /></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}

      <div className="urg-disclaimer">
        Medeasy é uma ferramenta educacional e de apoio entre pares. Não
        constitui dispositivo médico nem substitui o julgamento clínico.
        Confirme sempre com fontes oficiais.
      </div>
    </div>
  );
}
