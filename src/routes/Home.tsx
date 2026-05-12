import { modules } from '../content/modules';
import ModuleCard from '../components/home/ModuleCard';

export default function Home() {
  return (
    <main className="page-main">
      <div className="home-hero">
        <div className="home-hero-line" />
        <h1>
          Referência clínica
          <br />
          rápida e organizada
        </h1>
        <p>
          Protocolos terapêuticos, urgência, antibioterapia e as tuas notas —
          tudo num só lugar.
        </p>
      </div>
      <div className="section-label">Módulos disponíveis</div>
      <div className="module-grid">
        {modules.map((mod) => (
          <ModuleCard key={mod.id} mod={mod} />
        ))}
      </div>
      <div className="disclaimer-footer">
        Medeasy é uma ferramenta educacional e de apoio entre pares. Não constitui
        dispositivo médico nem substitui o julgamento clínico. Confirme sempre com
        fontes oficiais.
      </div>
    </main>
  );
}
