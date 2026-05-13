import { useState, useCallback } from 'react';
import { VIEW_LABELS } from '../content/antibio/data';
import type { AntibioView } from '../content/antibio/data';
import AntibioHome from '../components/antibio/AntibioHome';
import MewsTool from '../components/antibio/MewsTool';
import AllergyTool from '../components/antibio/AllergyTool';
import PedCalcTool from '../components/antibio/PedCalcTool';
import {
  ImagineTool, AlarmeTool, AwareTool, PrincipiosTool,
  SinaveTool, GravidaTool, DiferidaTool, EscalonamentoTool,
} from '../components/antibio/AntibioStatic';

export default function Antibio() {
  const [view, setView] = useState<AntibioView>('home');

  const goTo = useCallback((v: AntibioView) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="atb-scope">
      {view !== 'home' && (
        <div className="atb-back-bar">
          <button className="atb-back-btn" onClick={() => goTo('home')}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5" /></svg>
            Voltar
          </button>
          <span className="atb-breadcrumb">Início › <span>{VIEW_LABELS[view as Exclude<AntibioView, 'home'>]}</span></span>
        </div>
      )}

      <div className="atb-main">
        {view === 'home' && <AntibioHome goTo={goTo} />}
        {view === 'imagine' && <ImagineTool />}
        {view === 'mews' && <MewsTool />}
        {view === 'alarme' && <AlarmeTool />}
        {view === 'betalact' && <AllergyTool />}
        {view === 'aware' && <AwareTool />}
        {view === 'principios' && <PrincipiosTool />}
        {view === 'sinave' && <SinaveTool />}
        {view === 'calc' && <PedCalcTool />}
        {view === 'gravida' && <GravidaTool />}
        {view === 'diferida' && <DiferidaTool />}
        {view === 'escalonamento' && <EscalonamentoTool />}
      </div>

      <div className="atb-disclaimer">
        <strong>Fonte:</strong> Guia de Bolso PAPA — ARS Lisboa e Vale do Tejo, Edição 1.3, novembro 2025. Esta ferramenta apoia a decisão clínica mas não a substitui.
      </div>
    </div>
  );
}
