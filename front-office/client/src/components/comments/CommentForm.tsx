/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { Token } from '../../utils/Token';
import { UserService } from '../../services/user.service';
import { ArticleService } from '../../services/article.service';
import { Utils } from '../../utils/Utils';

interface CommentFormProps {
  articleId: number | string;
}

interface User {
  id: number;
  email: string;
  username: string;
  profile?: string;
  role: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
  const [user, setUser]  = useState<User | null>(null);
  const userProfile = JSON.parse(Token.GetToken("profile") as string);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    const data = {
      contenu: comment,
      user_id: Number(userProfile.id),
      article_id: Number(articleId),
    }

    try{
      await ArticleService.createCommentaire(data);
      setComment('')
      Utils.success('commentaire ajouter');
    }catch{
      setComment('')
      Utils.errorPage('Il y a un erreur')
      setIsSubmitting(false);
    }finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (userProfile) {
      UserService.getUserById(userProfile.id)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
    }else {
      setUser(null);
    }
  }, []);

  if (!user) {
    return (
      <div className="text-center py-4 text-gray-600">
        vous devez vous inscrire ou vous connecter pour poster un commentaire.
      </div>
    );
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="comment" className="sr-only">
          Votre commentaire
        </label>
        <textarea
          id="comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Partagez votre avis..."
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !comment.trim()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4 mr-2" />
          {isSubmitting ? 'Envoi...' : 'Envoyer'}
        </button>
      </div>
    </form>
  );
};