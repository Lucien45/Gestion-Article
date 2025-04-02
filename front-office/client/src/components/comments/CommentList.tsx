import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Commentaire } from '../../types';
import { StaticComments } from '../../data/metadata';
import { ArticleService } from '../../services/article.service';
import { apiUrl } from '../../services/api';

interface CommentListProps {
  articleId: string;
}


export const CommentList: React.FC<CommentListProps> = ({ articleId }) => {
  const [comments, setComments] = useState<Commentaire[]>([]);

  const fetchCommetaires = async () => {
    try {
      const response = await ArticleService.getAllCommentaires();
      console.log('all comment: ', response.data);
      const fetchCommentById: Commentaire[] = StaticComments.filter((comment) => comment.article_id === articleId);
      console.log('all comment article: ', fetchCommentById);
      setComments(fetchCommentById);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    fetchCommetaires();
  }, [articleId]);

  if (comments.length === 0) {
    return (
      <div className="text-center py-4 text-gray-600">
        Aucun commentaire pour le moment
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start space-x-3">
            <img
              src={comment.user?.profile ? `${apiUrl}/${comment.user.profile}` : comment.user?.username || `https://ui-avatars.com/api/?name=${comment.user?.username}`}
              alt={comment.user?.username}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {comment.user?.username}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(comment.date_commantaire), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </p>
              </div>
              <p className="text-gray-700 mt-1">{comment.contenu}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};