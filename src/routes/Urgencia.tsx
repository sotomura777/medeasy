import { useState, useMemo } from 'react';
import BackBar from '../components/layout/BackBar';
import UrgenciaHeader from '../components/urgencia/UrgenciaHeader';
import PatologiaCard from '../components/urgencia/PatologiaCard';
import AbbrevPanel from '../components/urgencia/AbbrevPanel';
import { patologias } from '../content/urgencia';
import { createPatologiaSearch } from '../lib/search';
import type { Patologia } from '../content/schema';

const sorted = [...patologias].sort((a, b) =>
  a.titulo.localeCompare(b.titulo, 'pt'),
);

const fuse = createPatologiaSearch(sorted);

function groupByAlpha(list: Patologia[]) {
  const groups: Record<string, Patologia[]> = {};
  for (const p of list) {
    const letter = p.titulo.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(p);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default function Urgencia() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return sorted;
    return fuse.search(query).map((r) => r.item);
  }, [query]);

  const groups = useMemo(() => groupByAlpha(filtered), [filtered]);

  return (
    <div className="urg-scope">
      <main className="page-main">
        <BackBar label="Urgência" />
        <UrgenciaHeader
          count={filtered.length}
          query={query}
          onSearch={setQuery}
        />
        <div>
          {groups.length === 0 && (
            <div className="empty">Nenhuma patologia encontrada.</div>
          )}
          {groups.map(([letter, items]) => (
            <div key={letter} className="alpha-group">
              <div className="alpha-label">{letter}</div>
              {items.map((p) => (
                <PatologiaCard key={p.id} patologia={p} />
              ))}
            </div>
          ))}
        </div>
      </main>
      <AbbrevPanel />
    </div>
  );
}
