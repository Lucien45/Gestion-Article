import { useEffect, useState } from 'react';
import { ArticleCard } from '../components/articles/ArticleCard';
import { Article } from '../types';
import { StaticArticles } from '../data/metadata';
import { Loader2 } from 'lucide-react';
import { FeaturedArticles } from '../components/articles/FeaturedArticles';

export const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (StaticArticles.length === 0) {
      setLoading(true);
      setError('Auccun article disponible');
    }else {
      setLoading(false);
      setError(null);
      setArticles(StaticArticles)
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
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

  return (
    <div className="space-y-12">
      <FeaturedArticles />
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Derniers articles</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};
