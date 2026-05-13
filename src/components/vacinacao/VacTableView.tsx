import { useState, useMemo } from 'react';
import DOMPurify from 'dompurify';
import VacToolbar from './VacToolbar';
import VacSearch from './VacSearch';

export interface TableSection {
  header: string;
  columns: string[];
  rows: { cells: string[] }[];
}

interface Props {
  onBack: () => void;
  icon: string;
  title: string;
  infoHtml?: string;
  searchPlaceholder: string;
  sections: TableSection[];
  notesHtml?: string;
}

export default function VacTableView({ onBack, icon, title, infoHtml, searchPlaceholder, sections, notesHtml }: Props) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return sections.map(s => ({ ...s, visibleRows: s.rows }));
    return sections.map(s => {
      const visibleRows = s.rows.filter(r =>
        r.cells.some(c => c.toLowerCase().includes(q))
      );
      return { ...s, visibleRows };
    }).filter(s => s.visibleRows.length > 0 || s.header.toLowerCase().includes(q));
  }, [q, sections]);

  const anyVisible = filtered.some(s => s.visibleRows.length > 0);

  return (
    <>
      <VacToolbar onBack={onBack} />
      <h2 className="vac-page-title"><span className="vac-icon">{icon}</span> {title}</h2>

      {infoHtml && (
        <div className="vac-info-box">
          <div className="vac-info-icon">i</div>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(infoHtml) }} />
        </div>
      )}

      <VacSearch placeholder={searchPlaceholder} value={query} onChange={setQuery} />

      {filtered.map(section => (
        <div key={section.header} className="vac-section">
          <h3 className="vac-section-header">{section.header}</h3>
          <table className="vac-table">
            <thead>
              <tr>
                {section.columns.map(col => <th key={col}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {section.visibleRows.map((row, i) => (
                <tr key={i}>
                  {row.cells.map((cell, j) => (
                    <td
                      key={j}
                      className={j === 0 ? 'indication' : 'vaccines'}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {!anyVisible && q && (
        <div className="vac-no-results show">
          <span className="emoji">🔍</span>
          Nenhum resultado encontrado.
        </div>
      )}

      {notesHtml && (
        <div className="vac-notes-block" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notesHtml) }} />
      )}
    </>
  );
}
