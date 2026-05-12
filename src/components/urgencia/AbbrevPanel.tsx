import { useState } from 'react';
import { abreviaturas } from '../../content/urgencia';

export default function AbbrevPanel() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const term = filter.toLowerCase().trim();
  const sections = new Map<string, typeof abreviaturas>();
  for (const a of abreviaturas) {
    const sec = a.seccao ?? '';
    if (!sections.has(sec)) sections.set(sec, []);
    sections.get(sec)!.push(a);
  }

  return (
    <>
      <button
        className="abbrev-btn"
        onClick={() => setOpen(true)}
        title="Abreviaturas"
      >
        Abr
      </button>

      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1001,
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div
          style={{
            position: 'fixed', bottom: 74, right: 20, zIndex: 1002,
            background: '#fff', border: '1px solid #dddbd3', borderRadius: 12,
            width: 320, maxHeight: '70vh', overflowY: 'auto',
            boxShadow: '0 8px 32px rgba(0,0,0,.18)',
          }}
        >
          <div
            style={{
              padding: '14px 16px 10px', borderBottom: '1px solid #dddbd3',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <h3
              style={{
                fontSize: 13, fontWeight: 600, color: '#1a1916',
                fontFamily: "'IBM Plex Mono', monospace", textTransform: 'uppercase',
                letterSpacing: '.08em', margin: 0,
              }}
            >
              Abreviaturas
            </h3>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#8a8880', lineHeight: 1 }}
            >
              ✕
            </button>
          </div>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #dddbd3' }}>
            <input
              type="text"
              placeholder="Pesquisar abreviatura..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              autoFocus
              style={{
                width: '100%', border: '1px solid #dddbd3', borderRadius: 6,
                padding: '6px 10px', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace",
                background: '#f0efe9', color: '#1a1916', outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
          {[...sections.entries()].map(([seccao, items]) => {
            const filtered = items.filter(
              (a) =>
                !term ||
                a.sigla.toLowerCase().includes(term) ||
                a.significado.toLowerCase().includes(term)
            );
            if (filtered.length === 0) return null;
            return (
              <div key={seccao}>
                <div
                  style={{
                    fontSize: 10, fontWeight: 600, color: '#8a8880',
                    fontFamily: "'IBM Plex Mono', monospace", textTransform: 'uppercase',
                    letterSpacing: '.1em', padding: '10px 14px 4px', background: '#f0efe9',
                  }}
                >
                  {seccao}
                </div>
                {filtered.map((a) => (
                  <div
                    key={a.sigla}
                    style={{
                      display: 'flex', alignItems: 'baseline', gap: 10,
                      padding: '6px 14px', borderBottom: '1px solid #dddbd3',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: 12,
                        fontWeight: 700, color: '#c8401a', minWidth: 60, flexShrink: 0,
                      }}
                    >
                      {a.sigla}
                    </span>
                    <span style={{ fontSize: 12, color: '#5a5850', lineHeight: 1.4 }}>
                      {a.significado}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
