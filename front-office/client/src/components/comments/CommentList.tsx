import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Comment } from '../../types';
import { StaticComments } from '../../data/metadata';

interface CommentListProps {
  articleId: string;
}


export const CommentList: React.FC<CommentListProps> = ({ articleId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchCommentById: Comment[] = StaticComments.filter((comment) => comment.articleId === articleId);
    if (fetchCommentById) {
      setComments(fetchCommentById)
    }
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
              src={comment.user?.photoUrl || `https://ui-avatars.com/api/?name=${comment.user?.username}`}
              alt={comment.user?.username}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {comment.user?.username}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </p>
              </div>
              <p className="text-gray-700 mt-1">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};