import BackBar from '../components/layout/BackBar';
import AnaInterpreter from '../components/analises/AnaInterpreter';

export default function Analises() {
  return (
    <div className="ana-scope">
      <BackBar label="Análises" />
      <AnaInterpreter />
    </div>
  );
}
