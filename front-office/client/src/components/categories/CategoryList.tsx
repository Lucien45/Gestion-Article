/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, Code, Globe, Music, Camera, Film, Users } from 'lucide-react';
import { Category } from '../../types';
import { ArticleService } from '../../services/article.service';

const categoryIcons = {
  technology: Code,
  culture: Globe,
  music: Music,
  photography: Camera,
  cinema: Film,
  community: Users,
  books: BookOpen,
  other: Bookmark,
};

export const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

   const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await ArticleService.getAllCategories();
        const categorie_filtred = response.data.filter((categorie: Category) => categorie.articles?.length !== 0)
        setCategories(categorie_filtred? categorie_filtred : []);
      } catch (error: any) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    if (loading) {
      return (
        <div className="flex flex-col bg-neutral-300 dark:bg-neutral-700 w-56 h-64 animate-pulse rounded-xl p-4 gap-4">
          <div className="bg-neutral-400/50 dark:bg-neutral-600 w-full h-32 rounded-md" />
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-400/50 dark:bg-neutral-600 w-full h-4 rounded-md" />
            <div className="bg-neutral-400/50 dark:bg-neutral-600 w-4/5 h-4 rounded-md" />
            <div className="bg-neutral-400/50 dark:bg-neutral-600 w-full h-4 rounded-md" />
            <div className="bg-neutral-400/50 dark:bg-neutral-600 w-2/4 h-4 rounded-md" />
          </div>
        </div>
      );
    }

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Catégories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.nom as keyof typeof categoryIcons] || Bookmark;
          return (
            <Link
              key={category.id}
              to={`/categories/${category.nom}`}
              className="group bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{category.nom}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category?.articles?.length} articles</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};