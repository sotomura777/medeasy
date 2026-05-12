import { useState } from 'react';
import BackBar from '../components/layout/BackBar';
import CategoriaCard from '../components/notas/CategoriaCard';
import CategoriaModal from '../components/notas/CategoriaModal';
import NotaModal from '../components/notas/NotaModal';
import NotaDetailOverlay from '../components/notas/NotaDetailOverlay';
import { useNotasStore, type Categoria, type Nota } from '../store/notas';

type ModalState =
  | { type: 'none' }
  | { type: 'cat'; editCat: Categoria | null }
  | { type: 'nota'; catId: string; editNota: Nota | null }
  | { type: 'detail'; catId: string; nota: Nota };

export default function Notas() {
  const categorias = useNotasStore((s) => s.categorias);
  const [modal, setModal] = useState<ModalState>({ type: 'none' });

  function closeModal() {
    setModal({ type: 'none' });
  }

  return (
    <main className="page-main">
      <BackBar label="Notas & Dívidas" />

      <div className="notas-hero">
        <div className="notas-hero-line" />
        <h2>Notas & Dívidas</h2>
        <p>As tuas notas por especialidade. Tudo guardado localmente no teu dispositivo.</p>
      </div>

      {categorias.map((cat) => (
        <CategoriaCard
          key={cat.id}
          cat={cat}
          onEditCat={(c) => setModal({ type: 'cat', editCat: c })}
          onAddNota={(catId) => setModal({ type: 'nota', catId, editNota: null })}
          onOpenNota={(catId, nota) => setModal({ type: 'detail', catId, nota })}
        />
      ))}

      <button
        className="add-cat-btn"
        onClick={() => setModal({ type: 'cat', editCat: null })}
      >
        <span style={{ fontSize: 20 }}>＋</span> Adicionar especialidade
      </button>

      {modal.type === 'cat' && (
        <CategoriaModal editCat={modal.editCat} onClose={closeModal} />
      )}

      {modal.type === 'nota' && (
        <NotaModal catId={modal.catId} editNota={modal.editNota} onClose={closeModal} />
      )}

      {modal.type === 'detail' && (
        <NotaDetailOverlay
          nota={modal.nota}
          onClose={closeModal}
          onEdit={() =>
            setModal({ type: 'nota', catId: modal.catId, editNota: modal.nota })
          }
        />
      )}
    </main>
  );
}
