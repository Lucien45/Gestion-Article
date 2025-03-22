import React, { useEffect, useState } from 'react';
import { Article } from '../../types';
import { StaticArticles } from '../../data/metadata';
import { ArticleCard } from './ArticleCard';

export const FeaturedArticles: React.FC = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticleById: Article[] = StaticArticles.filter((article) => article.featured === true);
    if (fetchArticleById) {
      setFeaturedArticles(fetchArticleById)
    }
    
  }, []);

  if (featuredArticles.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles à la une</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} featured />
        ))}
      </div>
    </section>
  );
};