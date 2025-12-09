import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock } from 'lucide-react';
import { Article } from '../../types';
import { supabaseBucket, supabaseUrl } from '../../services/api';
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

    if (popularArticles.length === 0) return null;

    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Articles populaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {loading ? (
                    (popularArticles.length > 0
                        ? popularArticles
                        : Array.from({ length: 4 })
                    ).map((_, idx) => (
                        <div key={idx} className="flex space-x-4 group animate-pulse">
                        <div className="relative w-32 h-32 flex-shrink-0 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
                        <div className="flex-1 py-2 flex flex-col justify-between">
                            <div className="h-6 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded mb-4" />
                            <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <div className="h-4 w-4 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                                <div className="h-4 w-16 bg-neutral-300 dark:bg-neutral-700 rounded" />
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="h-4 w-4 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                                <div className="h-4 w-12 bg-neutral-300 dark:bg-neutral-700 rounded" />
                            </div>
                            </div>
                        </div>
                        </div>
                    ))
                ) : (
                    popularArticles.map((article) => (
                        <Link
                            key={article.id}
                            to={`/articles/${article.id}`}
                            className="flex space-x-4 group"
                        >
                            <div className="relative w-32 h-32 flex-shrink-0">
                                <img
                                    src={
                                    article?.couverture
                                        // ? `${apiUrl}/${article.couverture}`
                                        ? `${supabaseUrl}/storage/v1/object/public/${supabaseBucket}/${article.couverture}`
                                        : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'
                                    }
                                    alt={article.titre}
                                    className="rounded-lg object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors mb-2">
                                    {article.titre}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
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
                    ))
                )}
            </div>
        </section>
    );
};