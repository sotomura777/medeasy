interface Props {
  onBack: () => void;
  label?: string;
}

export default function VacToolbar({ onBack, label = 'Voltar' }: Props) {
  return (
    <div className="vac-toolbar">
      <button className="vac-btn-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={14} height={14}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {label}
      </button>
    </div>
  );
}
