/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArticleService } from '../services/article.service';
import { Article } from '../types';
import { ArticleCard } from '../components/articles/ArticleCard';

const ITEMS_PER_PAGE = 9;

export const ArticlePages: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = React.useState(1);

    const fetchArticles = async () => {
        try {
          setLoading(true);
          const response = await ArticleService.getAllArticles();
          console.log('liste article: ', response.data);
          const Article_user = response.data.filter((article: Article) => article.status === 'publié')
          console.log('liste article filtred: ', Article_user)
          setArticles(Article_user? Article_user : []);
        } catch (error: any) {
          console.warn(error);
          setError('auccun liset dispo')
        } finally {
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

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};