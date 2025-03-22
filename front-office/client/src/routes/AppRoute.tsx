import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { ArticleDetail } from '../components/articles/ArticleDetail';


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
            <Route index element={<HomePage />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="profile" element={<div>Profile Page</div>} />
            <Route path="dashboard" element={<div>Dashboard Page</div>} />
        </Routes>
    )
}

export default AppRoute