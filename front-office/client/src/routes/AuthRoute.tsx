import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

interface AdminRouteProps {
    setLoading: (value: boolean) => void;
}

const AuthRoute = ({ setLoading }: AdminRouteProps) => {

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const handleComplete = () => setLoading(false);
    const timeout = setTimeout(handleComplete, 500);

    return () => clearTimeout(timeout);
  }, [location, setLoading]);

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  )
}

export default AuthRoute