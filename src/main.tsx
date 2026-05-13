import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './styles/urgencia.css';
import './styles/vacinacao.css';
import './styles/analises.css';
import './styles/algoritmos.css';
import './styles/antibio.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
