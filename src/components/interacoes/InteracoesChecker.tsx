import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { searchDrugs, findInteractions } from '../../content/interacoes/data';
import type { Drug, Interaction, Severity } from '../../content/interacoes/data';

function severityLabel(s: Severity) {
  return s === 'major' ? 'Major' : s === 'moderada' ? 'Moderada' : 'Minor';
}

function AutocompleteInput({ placeholder, onSelect, exclude }: {
  placeholder: string;
  onSelect: (name: string) => void;
  exclude: Set<string>;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Drug[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (val: string) => {
    setQuery(val);
    const r = searchDrugs(val).filter(d => !exclude.has(d.n));
    setResults(r);
    setActiveIdx(-1);
    setOpen(r.length > 0);
  };

  const pick = useCallback((drug: Drug) => {
    onSelect(drug.n);
    setQuery('');
    setResults([]);
    setOpen(false);
  }, [onSelect]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const p = activeIdx >= 0 ? results[activeIdx] : results[0];
      if (p) pick(p);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.parentElement?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="int-input-row">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={e => handleInput(e.target.value)}
        onKeyDown={handleKey}
        onFocus={() => { if (results.length) setOpen(true); }}
        autoComplete="off"
      />
      {open && results.length > 0 && (
        <div className="int-autocomplete">
          {results.map((d, i) => (
            <div
              key={d.n}
              className={`int-auto-item${i === activeIdx ? ' active' : ''}`}
              onMouseDown={e => { e.preventDefault(); pick(d); }}
            >
              {d.n}<span className="int-group">{d.g}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ name, target, onRemove }: { name: string; target?: boolean; onRemove: () => void }) {
  return (
    <span className={`int-chip${target ? ' target' : ''}`}>
      {name}
      <button title="Remover" aria-label="Remover" onClick={onRemove}>&times;</button>
    </span>
  );
}

function InteractionCard({ int }: { int: Interaction }) {
  return (
    <div className={`int-interaction ${int.s}`}>
      <div className="int-header">
        <div className="int-pair">{int.a}<span className="int-x">&times;</span>{int.b}</div>
        <span className={`int-severity-tag ${int.s}`}>{severityLabel(int.s)}</span>
      </div>
      <div className="int-body">
        <div><span className="int-label">Mecanismo:</span>{int.mech}</div>
        <div><span className="int-label">Efeito clínico:</span>{int.eff}</div>
        <div className="int-action-bar">
          <span className="int-action-icon" />
          <span className="int-label" style={{ color: 'var(--int-accent-dark)' }}>Conduta:</span>
          {int.act}
        </div>
      </div>
    </div>
  );
}

export default function InteracoesChecker() {
  const [currentDrugs, setCurrentDrugs] = useState<string[]>([]);
  const [targetDrug, setTargetDrug] = useState<string | null>(null);

  const allDrugs = useMemo(() => {
    const list = [...currentDrugs];
    if (targetDrug) list.push(targetDrug);
    return list;
  }, [currentDrugs, targetDrug]);

  const exclude = useMemo(() => new Set(allDrugs), [allDrugs]);

  const interactions = useMemo(() => {
    if (allDrugs.length < 2) return [];
    return findInteractions(allDrugs);
  }, [allDrugs]);

  const counts = useMemo(() => {
    const c = { major: 0, moderada: 0, minor: 0 };
    interactions.forEach(i => c[i.s]++);
    return c;
  }, [interactions]);

  const addCurrent = useCallback((name: string) => {
    setCurrentDrugs(prev => prev.includes(name) ? prev : [...prev, name]);
  }, []);

  const handleSetTarget = useCallback((name: string) => {
    setCurrentDrugs(prev => prev.filter(d => d !== name));
    setTargetDrug(name);
  }, []);

  const removeCurrent = useCallback((name: string) => {
    setCurrentDrugs(prev => prev.filter(d => d !== name));
  }, []);

  const clearAll = useCallback(() => {
    setCurrentDrugs([]);
    setTargetDrug(null);
  }, []);

  const showResults = allDrugs.length >= 2;

  return (
    <>
      <header className="int-header-block">
        <h1 className="int-title">Verificador de Interações Medicamentosas</h1>
        <p className="int-sub">Apoio à prescrição — contexto MGF + hospitalar · base interna offline</p>
      </header>

      <div className="int-warning-permanent">
        <strong>Aviso:</strong> Esta ferramenta é um apoio de primeira linha para alerta de interações. Não foi verificada interação a interação em tempo real em fontes primárias. Para fármacos de janela terapêutica estreita (varfarina, lítio, digoxina, imunossupressores, antiepilépticos) confirmar sempre em BNF, Micromedex ou RCM INFARMED antes de prescrever. Não substitui avaliação clínica nem consulta de farmacêutico.
      </div>

      <div className="int-card">
        <div className="int-row-head">
          <h2 className="int-card-title">Medicação atual do doente</h2>
          {currentDrugs.length > 0 && (
            <button className="int-clear-all" type="button" onClick={clearAll}>Limpar lista</button>
          )}
        </div>
        <AutocompleteInput
          placeholder="Procurar fármaco (ex: varfarina, sinvastatina, amoxicilina)..."
          onSelect={addCurrent}
          exclude={exclude}
        />
        <div className="int-chips">
          {currentDrugs.map(d => (
            <Chip key={d} name={d} onRemove={() => removeCurrent(d)} />
          ))}
        </div>
        {currentDrugs.length === 0 && (
          <p className="int-empty-hint">Adicione todos os fármacos que o doente já toma.</p>
        )}
      </div>

      <div className="int-card">
        <h2 className="int-card-title">Fármaco a adicionar / verificar</h2>
        <AutocompleteInput
          placeholder="Fármaco que se pretende prescrever..."
          onSelect={handleSetTarget}
          exclude={exclude}
        />
        <div className="int-chips">
          {targetDrug && (
            <Chip name={targetDrug} target onRemove={() => setTargetDrug(null)} />
          )}
        </div>
      </div>

      {showResults && (
        <div className="int-card">
          <h2 className="int-card-title">Interações detetadas</h2>
          <div className="int-results-summary">
            {interactions.length === 0 ? (
              <span className="int-pill none">&#10003; Sem interações conhecidas detetadas</span>
            ) : (
              <>
                {counts.major > 0 && <span className="int-pill major">{counts.major} Major</span>}
                {counts.moderada > 0 && <span className="int-pill moderada">{counts.moderada} Moderada</span>}
                {counts.minor > 0 && <span className="int-pill minor">{counts.minor} Minor</span>}
              </>
            )}
          </div>
          {interactions.length === 0 ? (
            <div className="int-no-results">
              Nenhuma interação significativa entre os fármacos listados. A ausência de alerta não exclui outras considerações clínicas (função renal, alergias, dose, via).
            </div>
          ) : (
            interactions.map((int, i) => <InteractionCard key={i} int={int} />)
          )}
        </div>
      )}

      <div className="int-footer-note">
        <strong>Aviso clínico:</strong> Esta ferramenta apoia a decisão mas não substitui o juízo clínico. Base de dados compilada a partir de Micromedex, DrugBank, UpToDate, INFARMED RCM e British National Formulary. Severidade pode variar consoante dose, via de administração, função renal/hepática e comorbilidades. Verificar sempre o RCM do fármaco específico em casos limítrofes.
      </div>
    </>
  );
}
