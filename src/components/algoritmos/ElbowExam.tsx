import { useState } from 'react';
import DOMPurify from 'dompurify';
import { EXAM_SECTIONS } from '../../content/algoritmos/elbow-data';

export default function ElbowExam() {
  const [activeSection, setActiveSection] = useState('lat');
  const [openTests, setOpenTests] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const sec of EXAM_SECTIONS) {
      for (const t of sec.tests) {
        if (t.open) initial.add(`${sec.id}-${t.name}`);
      }
    }
    return initial;
  });

  const toggleTest = (key: string) => {
    setOpenTests(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const section = EXAM_SECTIONS.find(s => s.id === activeSection)!;

  return (
    <div className="algo-sh-exam-layout">
      <div className="algo-sh-exam-nav">
        {EXAM_SECTIONS.map(s => (
          <button
            key={s.id}
            className={`algo-sh-exam-nav-item${activeSection === s.id ? ' active' : ''}`}
            onClick={() => setActiveSection(s.id)}
          >
            <span className="algo-sh-exam-nav-icon">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      <div className="algo-sh-exam-content">
        <h2>{section.title}</h2>
        {section.desc && <p className="algo-sh-section-desc">{section.desc}</p>}

        {section.tests.map(t => {
          const key = `${section.id}-${t.name}`;
          const isOpen = openTests.has(key);
          return (
            <div key={key} className={`algo-sh-test-card${isOpen ? ' open' : ''}`}>
              <button className="algo-sh-test-header" onClick={() => toggleTest(key)}>
                <div className="algo-sh-test-header-left">
                  <span className="algo-sh-test-name">{t.name}</span>
                  {t.struct && <span className="algo-sh-test-struct">{t.struct}</span>}
                </div>
                <span className="algo-sh-test-toggle">▾</span>
              </button>
              {isOpen && (
                <div className="algo-sh-test-body">
                  {t.sens && (
                    <div className="algo-sh-test-grid">
                      <div className="algo-sh-test-stat"><span className="sv-sens">{t.sens}</span><span>Sens.</span></div>
                      <div className="algo-sh-test-stat"><span className="sv-spec">{t.spec}</span><span>Espec.</span></div>
                      <div className="algo-sh-test-stat"><span className="sv-lr">{t.lr}</span><span>{t.lrLabel || 'LR+'}</span></div>
                    </div>
                  )}
                  {t.howTo && (
                    <>
                      <div className="algo-sh-how-label">Como fazer</div>
                      <div className="algo-sh-how-text">{t.howTo}</div>
                    </>
                  )}
                  {t.observeItems && (
                    <>
                      {!t.howTo && <div className="algo-sh-how-label">Avaliação</div>}
                      <ul className="algo-sh-observe-list">
                        {t.observeItems.map((item, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }} />
                        ))}
                      </ul>
                    </>
                  )}
                  {t.positive && (
                    <div className={`algo-sh-positive${t.positiveStyle === 'purple' ? ' purple' : ''}${t.positiveStyle === 'danger' ? ' danger' : ''}`}>
                      {t.positive}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
