import { useRef } from 'react';

interface Props {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

export default function VacSearch({ placeholder, value, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="vac-search-wrap">
      <span className="vac-search-icon">🔍</span>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button
        className={`vac-clear-btn ${value.length > 0 ? 'show' : ''}`}
        type="button"
        aria-label="Limpar"
        onClick={() => { onChange(''); ref.current?.focus(); }}
      >
        ✕
      </button>
    </div>
  );
}
