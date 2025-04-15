export interface User {
  id: number | string;
  email: string;
  username: string;
  profile?: string | null;
  role: 'author' | 'editor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number | string;
  nom: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  articles?: Article[];
}

export interface Article {
  id: number | string;
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
  length: number;
}

export interface Commentaire {
  id: number | string;
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
  id: number | string;
  userId: string;
  articleId: string;
  createdAt: string;
  length: number;
}

export interface UserActivityLog {
  id: number | string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  createdAt: string;
  user?: User;
}