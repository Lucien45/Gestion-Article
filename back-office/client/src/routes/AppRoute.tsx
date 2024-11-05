import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminLayout from '../views/admin/AdminLayout';
import Dashboard from '../views/admin/Dashboard';
import Articles from '../views/admin/Articles';
import Report from '../views/admin/Report';
import { Institution } from '../views/admin/Institution';
import Profile from '../views/admin/Profile';
import Settings from '../views/admin/Settings';
import Logout from '../views/admin/Logout';
import Page404 from '../views/Page404';

interface AdminRouteProps {
    setLoading: (value: boolean) => void;
}


const AppRoute = ({ setLoading }: AdminRouteProps) => {

    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const handleComplete = () => setLoading(false);
        const timeout = setTimeout(handleComplete, 500);
    
        return () => clearTimeout(timeout);
    }, [location, setLoading]);

    return (
        <Routes>
            {/* APP ROUTE */}
            <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='/article' element={<Articles/>}/>
                <Route path='/report' element={<Report/>}/>
                <Route path='/institution' element={<Institution/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/settings' element={<Settings/>}/>
                <Route path='/logout' element={<Logout/>}/>
            </Route>
            {/* ERREUR */}
            <Route path='*' element={<Page404/>} />
        </Routes>
    )
}

export default AppRoute