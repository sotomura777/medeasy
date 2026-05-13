import { useState, useCallback, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { params } from '../../content/analises/params';
import type { LabParam, ClinicalContext, InterpretResult } from '../../content/analises/types';

function normalize(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export default function AnaInterpreter() {
  const [age, setAge] = useState(50);
  const [sex, setSex] = useState('M');
  const [clinCtx, setClinCtx] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<LabParam | null>(null);
  const [value, setValue] = useState('');
  const [extras, setExtras] = useState<Record<string, string>>({});

  const ctx: ClinicalContext = useMemo(() => ({
    age: age || null,
    sex,
    context: clinCtx,
    extras,
  }), [age, sex, clinCtx, extras]);

  const filtered = useMemo(() => {
    if (!search) return params;
    const q = normalize(search);
    return params.filter(p => normalize(`${p.name} ${p.keywords}`).includes(q));
  }, [search]);

  const selectParam = useCallback((p: LabParam) => {
    setSelected(p);
    setValue('');
    const initial: Record<string, string> = {};
    if (p.extras) {
      for (const e of p.extras) {
        initial[e.id] = e.default !== undefined ? String(e.default) : (e.options?.[0]?.[0] ?? '');
      }
    }
    setExtras(initial);
  }, []);

  const result: InterpretResult | null = useMemo(() => {
    if (!selected) return null;
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    return selected.interpret(v, ctx);
  }, [selected, value, ctx]);

  const refText = useMemo(() => {
    if (!selected) return '';
    return selected.ref(ctx);
  }, [selected, ctx]);

  return (
    <div className="ana-container">
      <div className="ana-header">
        <h2>Interpretador de análises</h2>
        <p className="ana-subtitle">Escolhe um parâmetro, introduz o valor e o contexto. Recebes o que pensar e o que fazer.</p>
      </div>

      <div className="ana-how">
        <strong>Como funciona:</strong> opcionalmente preenche idade/sexo em cima (alguns parâmetros têm intervalos diferentes). Depois escolhe um parâmetro abaixo, mete o valor e a página devolve: <strong>veredicto · o que pensar · o que fazer já · red flags</strong>.
      </div>

      {/* Context bar */}
      <div className="ana-context-bar">
        <span className="ana-ctx-label">Contexto</span>
        <input
          type="number"
          placeholder="Idade"
          min={0}
          max={120}
          value={age}
          onChange={e => setAge(Number(e.target.value))}
        />
        <select value={sex} onChange={e => setSex(e.target.value)}>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        <select value={clinCtx} onChange={e => setClinCtx(e.target.value)}>
          <option value="">Sem contexto especial</option>
          <option value="dm">Diabetes</option>
          <option value="drc">DRC conhecida</option>
          <option value="cirrose">Cirrose / doença hepática</option>
          <option value="grav">Gravidez</option>
        </select>
      </div>

      {/* Search */}
      <div className="ana-search-bar">
        <div className="ana-search-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Pesquisar parâmetro (ex: TSH, sódio, ALT...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="ana-search-clear" onClick={() => setSearch('')} aria-label="Limpar">×</button>
          )}
        </div>
      </div>

      {/* Param grid */}
      <div className="ana-params-grid">
        {filtered.map(p => (
          <button
            key={p.id}
            className={`ana-param-chip${selected?.id === p.id ? ' active' : ''}`}
            onClick={() => selectParam(p)}
          >
            <span className="ana-pname">{p.name}</span>
            <span className="ana-punit">{p.unit || '—'}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="ana-no-results">Nenhum parâmetro encontrado.</div>
        )}
      </div>

      {/* Input zone */}
      {selected && (
        <div className="ana-input-zone">
          <h3 className="ana-iz-title">{selected.name}</h3>
          <p className="ana-iz-subtitle">Introduz o valor que tens na análise.</p>

          <div className="ana-ref-range" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`<strong>Referência:</strong> ${refText}`) }} />

          <div className="ana-value-input">
            <label>Valor:</label>
            <input
              type="number"
              step="0.01"
              placeholder="Introduza o valor"
              value={value}
              onChange={e => setValue(e.target.value)}
              autoFocus
            />
            <span className="ana-unit-label">{selected.unit}</span>
          </div>

          {/* Extra fields */}
          {selected.extras && selected.extras.length > 0 && (
            <div className="ana-extras">
              {selected.extras.map(e => (
                <div key={e.id}>
                  <label>{e.label}</label>
                  {e.type === 'select' && e.options ? (
                    <select
                      value={extras[e.id] || ''}
                      onChange={ev => setExtras(prev => ({ ...prev, [e.id]: ev.target.value }))}
                    >
                      {e.options.map(o => (
                        <option key={o[0]} value={o[0]}>{o[1]}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      step={e.step || '0.1'}
                      value={extras[e.id] || ''}
                      onChange={ev => setExtras(prev => ({ ...prev, [e.id]: ev.target.value }))}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Output */}
          <div className="ana-output">
            {!result && (
              <div className="ana-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                <p>Introduz o valor para ver a interpretação.</p>
              </div>
            )}

            {result && (
              <>
                <div className={`ana-verdict ${result.level}`}>
                  <div className="ana-verdict-label">Veredicto</div>
                  <p className="ana-verdict-value">{result.verdict}</p>
                  {result.detail && (
                    <div className="ana-verdict-detail" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result.detail) }} />
                  )}
                </div>

                {result.think && (
                  <div className="ana-action-block ana-think">
                    <div className="ana-action-title">💡 O que pensar</div>
                    <div className="ana-action-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result.think) }} />
                  </div>
                )}

                {result.doNow && (
                  <div className="ana-action-block ana-do">
                    <div className="ana-action-title">✅ O que fazer já</div>
                    <div className="ana-action-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result.doNow) }} />
                  </div>
                )}

                {result.danger && (
                  <div className="ana-action-block ana-danger">
                    <div className="ana-action-title">🚨 Quando preocupar</div>
                    <div className="ana-action-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result.danger) }} />
                  </div>
                )}

                <div className="ana-action-block ana-ref">
                  <div className="ana-action-title">ℹ️ Referência</div>
                  <div className="ana-action-content ana-ref-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(refText) }} />
                </div>
              </>
            )}
          </div>

          <button className="ana-reset-btn" onClick={() => setValue('')}>↺ Limpar</button>
        </div>
      )}

      <div className="ana-disclaimer">
        <strong>Aviso:</strong> Esta ferramenta apoia a decisão clínica mas não a substitui. Interpretar sempre no contexto completo do doente (história, exame objetivo, outros exames). Os intervalos de referência variam por laboratório.
      </div>
    </div>
  );
}
