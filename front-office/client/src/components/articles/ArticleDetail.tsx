import { useParams } from 'react-router-dom';
import { Calendar, Clock, Eye, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Article } from '../../types';
import { StaticArticles } from '../../data/metadata';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CommentForm } from '../comments/CommentForm';
import { CommentList } from '../comments/CommentList';

export const ArticleDetail:  React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentArticle, setCurrentArticle] = useState<Article>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (StaticArticles.length === 0) {
      setLoading(true);
      setError("Aucun article disponible");
    } else {
      setLoading(false);
      setError(null);
      const fetchArticleById: Article | undefined = StaticArticles.find((article) => article.id === id);
      if (fetchArticleById) {
        setCurrentArticle(fetchArticleById);
      }
    }
  }, [id, StaticArticles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !currentArticle) {
    return (
      <div className="text-center text-red-600 py-8">
        {error || 'Article non trouvé'}
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* En-tête de l'article */}
      <header className="mb-8">
        <div className="relative aspect-[21/9] mb-6">
          <img
            src={currentArticle.cover_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'}
            alt={currentArticle.title}
            className="rounded-lg object-cover w-full h-full"
          />
          {currentArticle.categorie && (
            <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {currentArticle.categorie}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {currentArticle.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{currentArticle.user?.username}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
            {currentArticle.published_at || currentArticle.createdAt ? (
              format(new Date(currentArticle.published_at || currentArticle.createdAt), 'dd MMMM yyyy', { locale: fr })
            ) : (
              'Date inconnue'
            )}
          </span>

          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{currentArticle.readingTime} min de lecture</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{currentArticle.views} vues</span>
          </div>
        </div>

        <p className="text-xl text-gray-600">
          {currentArticle.description}
        </p>
      </header>

      {/* Contenu de l'article */}
      <div className="prose prose-lg max-w-none mb-12">
        {/* Ici, vous pouvez charger le contenu de l'article depuis contentUrl */}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi ab dolores veritatis suscipit eaque nulla temporibus non maiores quibusdam doloremque. Quo, iure praesentium numquam nam eveniet totam culpa quos debitis!
        
      </div>

      {/* Section des commentaires */}
      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Commentaires</h2>
        <div className="space-y-8">
          <CommentForm articleId={currentArticle.id} />
          <CommentList articleId={currentArticle.id} />
        </div>
      </section> 
    </article>
  );
}
