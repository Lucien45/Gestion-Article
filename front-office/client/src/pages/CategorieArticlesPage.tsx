/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleCard } from '../components/articles/ArticleCard';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Article, Category } from '../types';
import { ArticleService } from '../services/article.service';

const ITEMS_PER_PAGE = 9;

export const CategorieArticlesPage: React.FC = () => {
  const { nom } = useParams<{ nom: string }>();
  const [currentArticle, setCurrentArticle] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArticlesByCategory = async () => {
    try {
      setLoading(true);
      const response = await ArticleService.getAllArticles();
      const Article_user = response.data.filter((article: Article) => article.categorie?.nom === nom && article.status === 'publié')
      console.log('liste article filtred avec categorie: ', Article_user)
      setCurrentArticle(Article_user? Article_user : []);
    } catch (error: any) {
      console.warn(error);
      setError('auccun liste dispo')
    } finally {
      setLoading(false);
    }
  }

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await ArticleService.getAllCategories();
      setCategories(response.data? response.data : []);
    } catch (error: any) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (nom) {
      fetchArticlesByCategory();
    }
  }, [nom]);

  const category = categories.find(c => c.nom === nom);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="text-center text-red-600 py-8">
        {error || 'Catégorie non trouvée'}
      </div>
    );
  }

  const totalPages = Math.ceil(currentArticle.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = currentArticle.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.nom}</h1>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

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