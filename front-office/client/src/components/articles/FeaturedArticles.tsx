import React, { useEffect, useState } from 'react';
import { Article } from '../../types';
import { ArticleCard } from './ArticleCard';
import { ArticleService } from '../../services/article.service';
import { LoadingArtcile } from '../LoadingSpinner';

export const FeaturedArticles: React.FC = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFeatureArticles = async () => {
    try {
      setLoading(true);
      const response = await ArticleService.getAllArticles();
      console.log('liste article: ', response.data);
      const fetchArticleById: Article[] = response.data.filter((article: Article) => article.featured === true);
      console.log('liste article featured: ', fetchArticleById)
      setFeaturedArticles(fetchArticleById? fetchArticleById : []);
    } catch (error) {
      console.warn(error);
    }finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchFeatureArticles();
  }, []);

  if (featuredArticles.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Articles à la une
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          (featuredArticles.length > 0
            ? featuredArticles
            : Array.from({ length: 4 })
          ).map((_, idx) => (
            <LoadingArtcile idx={idx} />
          ))
        ) : (
          featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} featured />
          ))
        )}
      </div>
    </section>
  );
};