import type { Nota } from '../../store/notas';

interface NotaSubCardProps {
  nota: Nota;
  onClick: () => void;
}

export default function NotaSubCard({ nota, onClick }: NotaSubCardProps) {
  const preview = nota.conteudo.length > 60
    ? nota.conteudo.slice(0, 60) + '…'
    : nota.conteudo;

  return (
    <div className="sub-card" onClick={onClick}>
      <div className="sub-card-title">{nota.nome}</div>
      {nota.conteudo && <div className="sub-card-desc">{preview}</div>}
      <div className="sub-card-footer">
        <span>{nota.tag ?? ''}</span>
        <span>→</span>
      </div>
    </div>
  );
}
