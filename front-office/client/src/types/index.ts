export interface User {
  id: string;
  email: string;
  username: string;
  photoUrl: string | null;
  role: 'author' | 'editor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  cover_url: string;
  published_at: string;
  createdAt: string;
  views: number;
  user?: User;
  likes_count: number;
  comments_count: number;
  categorie?: string;
  readingTime: number;
  featured: boolean;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  articleId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface ArticleLike {
  id: string;
  userId: string;
  articleId: string;
  createdAt: string;
}

export interface UserActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  createdAt: string;
  user?: User;
}