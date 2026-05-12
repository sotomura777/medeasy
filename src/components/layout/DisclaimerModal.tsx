import { useState, useEffect } from 'react';

const STORAGE_KEY = 'medeasy_disclaimer_v1';

export default function DisclaimerModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={`modal-overlay${visible ? ' open' : ''}`}>
      <div className="modal">
        <div className="modal-hd">
          <div className="modal-title">Aviso importante</div>
        </div>
        <div className="modal-body">
          <p>
            Medeasy é uma ferramenta educacional e de apoio entre pares, não
            constitui dispositivo médico nem substitui o julgamento clínico do
            profissional de saúde. As informações aqui apresentadas não devem ser
            usadas como única fonte para decisões clínicas.
          </p>
          <br />
          <p>
            Confirme sempre com fontes oficiais (DGS, UpToDate, bula INFARMED) e
            com colegas mais experientes em caso de dúvida. Os autores não se
            responsabilizam por decisões tomadas com base no conteúdo aqui
            disponibilizado.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={accept}>
            Compreendo e aceito
          </button>
        </div>
      </div>
    </div>
  );
}
