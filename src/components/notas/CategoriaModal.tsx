import { useState, useEffect } from 'react';
import { useNotasStore, type Categoria } from '../../store/notas';

interface CategoriaModalProps {
  editCat: Categoria | null;
  onClose: () => void;
}

export default function CategoriaModal({ editCat, onClose }: CategoriaModalProps) {
  const { addCategoria, updateCategoria, removeCategoria } = useNotasStore();
  const [nome, setNome] = useState('');
  const [emoji, setEmoji] = useState('');
  const [sub, setSub] = useState('');

  useEffect(() => {
    if (editCat) {
      setNome(editCat.nome);
      setEmoji(editCat.emoji);
      setSub(editCat.sub ?? '');
    } else {
      setNome('');
      setEmoji('');
      setSub('');
    }
  }, [editCat]);

  function save() {
    const trimmed = nome.trim();
    if (!trimmed) return;
    if (editCat) {
      updateCategoria(editCat.id, { nome: trimmed, emoji: emoji.trim() || '📋', sub: sub.trim() || undefined });
    } else {
      addCategoria({ nome: trimmed, emoji: emoji.trim() || '📋', sub: sub.trim() || undefined });
    }
    onClose();
  }

  function handleDelete() {
    if (!editCat) return;
    const msg = editCat.notas.length > 0
      ? `Remover "${editCat.nome}" e todas as ${editCat.notas.length} nota(s)?`
      : `Remover "${editCat.nome}"?`;
    if (confirm(msg)) {
      removeCategoria(editCat.id);
      onClose();
    }
  }

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-hd">
          <div className="modal-title">{editCat ? 'Editar especialidade' : 'Nova especialidade'}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="form-group">
          <label className="flabel">Nome da especialidade</label>
          <input
            type="text"
            className="finput"
            placeholder="ex: Cardiologia, Pneumologia..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') save(); }}
            autoFocus
          />
        </div>
        <div className="frow">
          <div className="form-group">
            <label className="flabel">Emoji / ícone</label>
            <input
              type="text"
              className="finput"
              placeholder="🫀"
              maxLength={4}
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="flabel">Subtítulo (opcional)</label>
            <input
              type="text"
              className="finput"
              placeholder="ex: Temas a rever"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
            />
          </div>
        </div>
        <div className="mfooter">
          {editCat ? (
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
