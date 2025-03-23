import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { Header } from './components/Header';
import Page404 from './pages/Page404';
import AuthRoute from './routes/AuthRoute';
import AppRoute from './routes/AppRoute';

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {loading && <LoadingSpinner />}
      <Routes>
      <Route path="/" element={<Header />}>
          <Route index element={<Navigate to="/home" replace />} />
          {/* Routes principales */}
          <Route path="/*" element={<AppRoute setLoading={setLoading} />} />
          {/* Routes d'authentification */}
          <Route path="auth/*" element={<AuthRoute setLoading={setLoading} />} />
        </Route>
        {/* Page 404 pour les routes inexistantes */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
