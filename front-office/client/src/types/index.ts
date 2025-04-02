export interface User {
  id: string;
  email: string;
  username: string;
  profile?: string | null;
  role: 'author' | 'editor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  nom: string;
  description: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  titre: string;
  description: string;
  couverture: string;
  contenu: string;
  date_publication: string;
  auteur?: User;
  categorie?: Category;
  vue: number;
  commentaires: Commentaire;
  likes: Like;
  reading_time: number;
  featured: boolean;
  status: string;
}

export interface Commentaire {
  id: string;
  contenu: string;
  user_id: string;
  article_id: string;
  status: 'pending' | 'approved' | 'rejected';
  date_commantaire: string;
  updatedAt: string;
  user?: User;
  length: number;
}

export interface Like {
  id: string;
  userId: string;
  articleId: string;
  createdAt: string;
  length: number;
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