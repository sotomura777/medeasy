interface UrgenciaHeaderProps {
  count: number;
  query: string;
  onSearch: (q: string) => void;
}

export default function UrgenciaHeader({ count, query, onSearch }: UrgenciaHeaderProps) {
  return (
    <div className="urg-header">
      <div>
        <div className="urg-title">⚕ Tratamento — Urgência</div>
        <div className="urg-sub">Protocolos por patologia · Portugal</div>
      </div>
      <div className="urg-search-wrap">
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="urg-search"
          placeholder="Pesquisar patologia..."
          autoComplete="off"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <span className="urg-count-badge">
        {count} {count === 1 ? 'patologia' : 'patologias'}
      </span>
    </div>
  );
}
