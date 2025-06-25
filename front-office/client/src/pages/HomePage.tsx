/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { ArticleCard } from '../components/articles/ArticleCard';
import { Article } from '../types';
import { FeaturedArticles } from '../components/articles/FeaturedArticles';
import { ArticleService } from '../services/article.service';
import { PopularArticles } from '../components/articles/PopularArticles';
import { CategoryList } from '../components/categories/CategoryList';
import { NewsletterSignup } from '../components/Newsletter/NewsletterSignup';
import { LoadingArtcile } from '../components/LoadingSpinner';

export const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await ArticleService.getAllArticles();
      const Article_user = response.data.filter((article: Article) => article.status === 'publié')
      setArticles(Article_user? Article_user : []);
    } catch (error: any) {
      console.warn(error);
      setError('auccun article disponnible')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">

        <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white hover:text-gray-100 dark:hover:text-gray-300">
            Découvrez des articles passionnants
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 dark:text-gray-300 hover:text-white dark:hover:text-gray-100">
            Explorez notre collection d'articles sur divers sujets rédigés par des experts
          </p>

          <a
            href="#articles"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 dark:bg-gray-100 dark:text-blue-700 dark:hover:bg-gray-200 transition-colors"
          >
            Commencer la lecture
          </a>
        </div>
      </section>


      {/* Featured Articles */}
      <FeaturedArticles />   

      {/* Categories */}
      <CategoryList />

      {/* Popular Articles */}
      <PopularArticles /> 
      
      {/* Latest Articles */}
      <section id="articles">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Derniers articles</h2>
          <a href="/articles" className="text-blue-600 hover:text-blue-700 font-medium">
            Voir tous les articles →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            (articles.length > 0
              ? articles
              : Array.from({ length: 4 })
            ).map((_, idx) => (
              <LoadingArtcile idx={idx} />
            ))
          ) : (
            articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="text-center text-red-600 py-8">
                {error}
              </div>
            )
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </div>
  );
};
