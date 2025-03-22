import { Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured }) => {
  const cardClass = featured
    ? 'col-span-2 md:col-span-3 lg:col-span-2'
    : 'col-span-2 md:col-span-1';

  return (
    <div className={`${cardClass} group`}>
      <Link to={`/articles/${article.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
          <img
            src={article.cover_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'}
            alt={article.title}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
          />
          {article.categorie && (
            <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {article.categorie}
            </span>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 line-clamp-2">{article.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.user?.username}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.readingTime} min</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};