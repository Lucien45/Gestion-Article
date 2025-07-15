import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { ArticleDetail } from '../components/articles/ArticleDetail';
import { ArticlePages } from '../pages/ArticlePage';
import { CategorieArticlesPage } from '../pages/CategorieArticlesPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProfilePage } from '../pages/ProfilePage';
import Page404 from '../pages/Page404';
import { SearchResult } from '../components/searchs/SearchBar';


interface AdminRouteProps {
    setLoading: (value: boolean) => void;
}


const AppRoute = ({ setLoading }: AdminRouteProps) => {

    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const handleComplete = () => setLoading(false);
        const timeout = setTimeout(handleComplete, 1000);
    
        return () => clearTimeout(timeout);
    }, [location, setLoading]);

    return (
        <Routes>
            <Route path='home' element={<HomePage />} />
            <Route path="articles/:id" element={<ArticleDetail />} />
            <Route path="articles" element={<ArticlePages/>} />
            <Route path="categories/:nom" element={<CategorieArticlesPage/>} />
            <Route path="profile" element={<ProfilePage/>} />
            <Route path="dashboard" element={<DashboardPage/>} />
            <Route path="search" element={<SearchResult/>} />
            {/* Page 404 pour les routes inexistantes */}
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}

export default AppRoute