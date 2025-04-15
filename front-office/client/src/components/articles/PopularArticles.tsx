import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock } from 'lucide-react';
import { Article } from '../../types';
import { apiUrl } from '../../services/api';
import { ArticleService } from '../../services/article.service';

export const PopularArticles: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const popularArticles = articles
        .sort((a, b) => (b.vue || 0) - (a.vue || 0))
        .slice(0, 4);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await ArticleService.getAllArticles();
            const Article_user = response.data.filter((article: Article) => article.status === 'publié')
            setArticles(Article_user? Article_user : []);
        } catch (error) {
            console.warn(error);
        }finally {
            setLoading(false);
        }
    }
        
    useEffect(() => {
        fetchArticles();
    }, []);

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

    return (
        <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {popularArticles.map((article) => (
            <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="flex space-x-4 group"
            >
                <div className="relative w-32 h-32 flex-shrink-0">
                <img
                    src={article?.couverture ? `${apiUrl}/${article.couverture}` : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'}
                    alt={article.titre}
                    className="rounded-lg object-cover w-full h-full"
                />
                </div>
                <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {article.titre}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{article.vue} vues</span>
                    </div>
                    <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.reading_time} min</span>
                    </div>
                </div>
                </div>
            </Link>
            ))}
        </div>
        </section>
    );
};