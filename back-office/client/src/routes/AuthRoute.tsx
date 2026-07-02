import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Page404 from '../views/Page404';
import AuthLayout from '../views/auth/AuthLayout';
import AuthPage from '../views/auth/AuthPage';
import PasswordReset from '../views/auth/passwordReset';

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
      <Route element={<AuthLayout/>}>
        <Route index element={<AuthPage/>} />
      </Route>
      <Route path="forgot-password" element={<PasswordReset/>} />
      <Route path="reset-password" element={<PasswordReset/>} />
      <Route path="*" element={<Page404/>} />
    </Routes>
  )
}

export default AuthRoute