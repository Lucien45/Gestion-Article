/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Eye, User, ArrowLeft, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Article } from '../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CommentForm } from '../comments/CommentForm';
import { CommentList } from '../comments/CommentList';
import { ArticleService } from '../../services/article.service';
import { apiUrl } from '../../services/api';
import { Token } from '../../utils/Token';
import { Utils } from '../../utils/Utils';

export const ArticleDetail:  React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentArticle, setCurrentArticle] = useState<Article>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshComments, setRefreshComments] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  const userProfile = Token.GetToken("profile") ? JSON.parse(Token.GetToken("profile") as string) : null;

  const handleLike = async () => {
    if (!userProfile) {
      Utils.customMessage({
        icon: 'warning',
        title: 'Connexion requise',
        text: "Vous devez être connecté pour liker un article",
        toast: true,
        position: 'top',
        timer: 3500,
        showConfirmButton: false,
        background: '#fff7ed',
        color: '#ea580c',
        iconColor: '#f59e42',
      });
      return;
    }

    setLikeLoading(true);
    try {
      if (isLiked) {
        // Supprimer le like
        // Note: Il faudrait d'abord récupérer l'ID du like existant
        // Pour simplifier, on va juste décrémenter le compteur
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
        Utils.customMessage({
          icon: 'success',
          title: 'Like retiré',
          text: "Vous avez retiré votre like.",
          toast: true,
          position: 'bottom-end',
          timer: 2500,
          showConfirmButton: false,
          background: '#f0fdf4',
          color: '#16a34a',
          iconColor: '#ef4444', 
        });
      } else {
        const data = {
          user_id: userProfile.id,
          article_id: Number(id)
        };
        await ArticleService.createLike(data);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
        Utils.customMessage({
          icon: 'success',
          title: 'Article liké !',
          text: "Merci pour votre like ❤️",
          toast: true,
          position: 'bottom-end',
          timer: 2500,
          showConfirmButton: false,
          background: '#f0fdf4',
          color: '#16a34a',
          iconColor: '#f43f5e', 
        });
      }
    } catch (error) {
      console.error("Erreur lors du like:", error);
      Utils.customMessage({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur est survenue lors du like.",
        toast: true,
        position: 'top',
        timer: 3500,
        showConfirmButton: false,
        background: '#fef2f2',
        color: '#b91c1c',
        iconColor: '#ef4444',
      });
    } finally {
      setLikeLoading(false);
    }
  };
  
  const fetchDetailArticles = async () => {
    setLoading(true);
    try {
      const response = await ArticleService.getArticle(Number(id));
      console.log('detail article: ', response.data);
      setCurrentArticle(response.data);
      // Initialiser le compteur de likes
      setLikeCount(response.data.likes?.length || 0);
      setError(null);
    } catch (error: any) {
      console.warn(error);
      setError("Aucun article disponible");
    } finally {
      setLoading(false);
    }
  }

  const checkUserLike = async () => {
    if (!userProfile || !currentArticle) return;
    
    try {
      const likesResponse = await ArticleService.getAlLikes();
      const userLike = likesResponse.data.find((like: any) => 
        like.user?.id === userProfile.id && like.article?.id === currentArticle.id
      );
      setIsLiked(!!userLike);
    } catch (error) {
      console.error("Erreur lors de la vérification du like:", error);
    }
  };

  useEffect(() => {
    fetchDetailArticles();
  }, [id]);

  useEffect(() => {
    if (currentArticle) {
      checkUserLike();
    }
  }, [currentArticle, userProfile]);

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
      {/* Bouton retour */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </button>
      </div>

      {/* En-tête de l'article */}
      <header className="mb-8">
        <div className="relative aspect-[21/9] mb-6">
          <img
            src={currentArticle.couverture ? `${apiUrl}/${currentArticle.couverture}` : currentArticle.titre || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'}
            alt={currentArticle.titre}
            className="rounded-lg object-cover w-full h-full"
          />
          {currentArticle.categorie && (
            <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {currentArticle.categorie.nom}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {currentArticle.titre}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{currentArticle.auteur?.username}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
            {currentArticle.date_publication ? (
              format(new Date(currentArticle.date_publication), 'dd MMMM yyyy', { locale: fr })
            ) : (
              'Date inconnue'
            )}
          </span>

          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{currentArticle.reading_time} min de lecture</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{currentArticle.vue} vues</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              disabled={likeLoading}
              className={`flex items-center gap-1 transition-colors ${
                isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-500 hover:text-red-500'
              } ${likeLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </button>
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
          <CommentForm articleId={currentArticle.id} onCommentAdded={() => setRefreshComments(prev => prev + 1)} />
          <CommentList articleId={currentArticle.id} key={refreshComments} />
        </div>
      </section> 
    </article>
  );
}
