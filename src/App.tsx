import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/layout/Nav';
import DisclaimerModal from './components/layout/DisclaimerModal';
import Landing from './routes/Landing';

const Login = lazy(() => import('./routes/Login'));
const Register = lazy(() => import('./routes/Register'));
const Home = lazy(() => import('./routes/Home'));
const Urgencia = lazy(() => import('./routes/Urgencia'));
const Vacinacao = lazy(() => import('./routes/Vacinacao'));
const Analises = lazy(() => import('./routes/Analises'));
const Algoritmos = lazy(() => import('./routes/Algoritmos'));
const Antibio = lazy(() => import('./routes/Antibio'));
const Interacoes = lazy(() => import('./routes/Interacoes'));
const Notas = lazy(() => import('./routes/Notas'));

const CHROME_HIDDEN = new Set(['/', '/login', '/register']);

function AppShell() {
  const { pathname } = useLocation();
  const hideChrome = CHROME_HIDDEN.has(pathname);

  return (
    <>
      {!hideChrome && <Nav />}
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem', color: '#8A9AB0' }}>A carregar...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/urgencia" element={<Urgencia />} />
          <Route path="/vacinacao" element={<Vacinacao />} />
          <Route path="/analises" element={<Analises />} />
          <Route path="/algoritmos" element={<Algoritmos />} />
          <Route path="/antibio" element={<Antibio />} />
          <Route path="/interacoes" element={<Interacoes />} />
          <Route path="/notas" element={<Notas />} />
        </Routes>
      </Suspense>
      {!hideChrome && <DisclaimerModal />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
