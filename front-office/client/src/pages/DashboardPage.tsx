/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Eye, FileText, Settings, Trash2, Users, Archive } from 'lucide-react';
import { Token } from '../utils/Token';
import { Article } from '../types';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';

interface User {
    id: number | string;
    email: string;
    username: string;
    profile?: string;
    role: string;
}

export const DashboardPage: React.FC = () => {
    const [user, setUser]  = useState<User | null>(null);
    const userProfile = JSON.parse(Token.GetToken("profile") as string);
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUserArticles = async () => {
        try {
            setLoading(true);
            const response = await ArticleService.getAllArticles();
            console.log('liste article: ', response.data);
            const Article_user = response.data.filter((article: Article) => article.auteur?.id === userProfile.id)
            console.log('liste article filtred dash: ', Article_user)
            setArticles(Article_user? Article_user : []);
        } catch (error: any) {
            console.warn(error);
            setError('auccun liset dispo')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserArticles();
        if (userProfile) {
            UserService.getUserById(userProfile.id)
            .then((res) => {
            setUser(res.data);
            console.log(res.data);
            })
            .catch((err) => {
            console.log(err)
            })
        }else {
            setUser(null);
        }
    }, []);

    if (!user) {
        return (
        <div className="text-center py-8">
            <p className="text-gray-600">Veuillez vous connecter pour accéder au tableau de bord.</p>
        </div>
        );
    }

    if (loading) {
        return (
          <div className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4">
            <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md" />
            <div className="flex flex-col gap-2">
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
              <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md" />
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
              <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md" />
            </div>
          </div>
        );
    }
    
    if (error) {
        return (
            <div className="text-center text-red-600 py-8">
            {error}
            </div>
        );
    }

    const isAdmin = user.role === 'admin';

    return (
        <div className="space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <Link
            to="/articles/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
            Nouvel article
            </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500">Articles publiés</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {articles.filter(a => a.status === 'publié').length}
                    </p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500">Vues totales</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {articles.reduce((sum, article) => sum + (article.vue || 0), 0)}
                    </p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-600" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500">Brouillons</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {articles.filter(a => a.status === 'brouillon').length}
                    </p>
                    </div>
                    <Edit2 className="h-8 w-8 text-blue-600" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500">Archivés</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {articles.filter(a => a.status === 'archivé').length}
                    </p>
                    </div>
                    <Archive className="h-8 w-8 text-blue-600" />
                </div>
            </div>
        </div>

        {/* Admin/Editor Tools */}
        {(isAdmin) && (
            <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Outils d'administration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                to="/dashboard/users"
                className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50"
                >
                <Users className="h-6 w-6 text-blue-600" />
                <div>
                    <h3 className="font-medium text-gray-900">Gestion des utilisateurs</h3>
                    <p className="text-sm text-gray-500">Gérer les rôles et les permissions</p>
                </div>
                </Link>
                <Link
                to="/dashboard/settings"
                className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50"
                >
                <Settings className="h-6 w-6 text-blue-600" />
                <div>
                    <h3 className="font-medium text-gray-900">Paramètres du site</h3>
                    <p className="text-sm text-gray-500">Configurer les options globales</p>
                </div>
                </Link>
            </div>
            </div>
        )}

        {/* Articles List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Mes articles</h2>
            </div>
            <div className="divide-y">
            {articles.map(article => (
                <div key={article.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                    <h3 className="font-medium text-gray-900">{article.titre}</h3>
                    <p className="text-sm text-gray-500">
                    {article.status === 'published' ? 'Publié' : 'Brouillon'} • {article.vue} vues
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Link
                    to={`/articles/${article.id}/edit`}
                    className="p-2 text-gray-600 hover:text-blue-600"
                    >
                    <Edit2 className="h-5 w-5" />
                    </Link>
                    <button className="p-2 text-gray-600 hover:text-red-600">
                    <Trash2 className="h-5 w-5" />
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};