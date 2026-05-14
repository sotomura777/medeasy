import { useState, useCallback, useMemo } from 'react';
import '../styles/urgencia.css';
import BackBar from '../components/layout/BackBar';
import UrgenciaList from '../components/urgencia/UrgenciaList';
import UrgenciaDetail from '../components/urgencia/UrgenciaDetail';
import AbbrevPanel from '../components/urgencia/AbbrevPanel';
import { useBookmarks } from '../components/urgencia/useBookmarks';
import { patologias } from '../content/urgencia';
import type { Patologia } from '../content/schema';

const patologiaById = new Map<string, Patologia>(patologias.map(p => [p.id, p]));

export default function Urgencia() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'day' | 'night'>('day');
  const [bookmarks, toggleBookmark] = useBookmarks();

  const selected = useMemo(
    () => selectedId ? patologiaById.get(selectedId) ?? null : null,
    [selectedId],
  );

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'day' ? 'night' : 'day');
  }, []);

  const goBack = useCallback(() => setSelectedId(null), []);

  return (
    <div className="urg-scope" data-theme={theme}>
      <main className="page-main">
        <BackBar label="Urgência" />
        {selected ? (
          <UrgenciaDetail
            patologia={selected}
            bookmarked={bookmarks.has(selected.id)}
            onToggleBookmark={() => toggleBookmark(selected.id)}
            onBack={goBack}
          />
        ) : (
          <UrgenciaList
            patologias={patologias}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onSelect={setSelectedId}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}
      </main>
      <AbbrevPanel />
    </div>
  );
}
