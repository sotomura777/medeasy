import { useState, useEffect } from 'react';
import { useNotasStore, type Nota } from '../../store/notas';

interface NotaModalProps {
  catId: string;
  editNota: Nota | null;
  onClose: () => void;
}

export default function NotaModal({ catId, editNota, onClose }: NotaModalProps) {
  const { addNota, updateNota, removeNota } = useNotasStore();
  const [nome, setNome] = useState('');
  const [tag, setTag] = useState('');
  const [conteudo, setConteudo] = useState('');

  useEffect(() => {
    if (editNota) {
      setNome(editNota.nome);
      setTag(editNota.tag ?? '');
      setConteudo(editNota.conteudo);
    } else {
      setNome('');
      setTag('');
      setConteudo('');
    }
  }, [editNota]);

  function save() {
    const trimmed = nome.trim();
    if (!trimmed) return;
    if (editNota) {
      updateNota(catId, editNota.id, { nome: trimmed, tag: tag.trim() || undefined, conteudo: conteudo.trim() });
    } else {
      addNota(catId, { nome: trimmed, tag: tag.trim() || undefined, conteudo: conteudo.trim() });
    }
    onClose();
  }

  function handleDelete() {
    if (!editNota) return;
    if (confirm(`Remover a nota "${editNota.nome}"?`)) {
      removeNota(catId, editNota.id);
      onClose();
    }
  }

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-hd">
          <div className="modal-title">{editNota ? 'Editar nota' : 'Nova nota'}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="form-group">
          <label className="flabel">Título</label>
          <input
            type="text"
            className="finput"
            placeholder="ex: FA paroxística, Score CHA2DS2..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label className="flabel">Tag / categoria</label>
          <input
            type="text"
            className="finput"
            placeholder="ex: Dívida, Referência..."
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="flabel">Conteúdo</label>
          <textarea
            className="finput"
            placeholder="Escreve a nota, dívida ou referência aqui..."
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            style={{ resize: 'vertical', minHeight: 100 }}
          />
        </div>
        <div className="mfooter">
          {editNota ? (
            <button className="mbtn mbtn-del" onClick={handleDelete}>🗑 Remover</button>
          ) : <div />}
          <div className="mfooter-right">
            <button className="mbtn" onClick={onClose}>Cancelar</button>
            <button className="mbtn mbtn-primary" onClick={save}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
