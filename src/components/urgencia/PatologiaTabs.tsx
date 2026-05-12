import { useState } from 'react';
import DOMPurify from 'dompurify';
import type { TabContent } from '../../content/schema';

const ALLOWED_TAGS = [
  'div', 'span', 'p', 'br', 'b', 'strong', 'i', 'em', 'u', 'small',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'ul', 'ol', 'li', 'a', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'sup', 'sub', 'hr',
];

const ALLOWED_ATTR = ['class', 'style', 'href', 'target', 'rel', 'src', 'alt', 'width', 'height'];

interface PatologiaTabsProps {
  tabs: TabContent[];
  patologiaId: string;
}

export default function PatologiaTabs({ tabs, patologiaId }: PatologiaTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="utabs">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            className={`utab-btn${i === active ? ' active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setActive(i); }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={`${patologiaId}-${tab.id}`}
          className={`utab-pane${i === active ? ' active' : ''}`}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(tab.html, {
              ALLOWED_TAGS,
              ALLOWED_ATTR,
            }),
          }}
        />
      ))}
    </>
  );
}
