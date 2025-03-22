import { Article, ArticleLike, Category, Comment, User } from "../types";

export const StaticUsers: User[] = [
  {
    id: "1",
    email: "user1@example.com",
    username: "user1",
    photoUrl: '/public/author.png',
    role: "author",
    createdAt: "2024-03-22T12:00:00Z",
    updatedAt: "2024-03-22T12:00:00Z"
  },
  {
    id: "2",
    email: "user2@example.com",
    username: "editorUser",
    photoUrl: "/public/editor.jpeg",
    role: "editor",
    createdAt: "2024-03-21T14:30:00Z",
    updatedAt: "2024-03-22T15:00:00Z"
  },
  {
    id: "3",
    email: "admin@example.com",
    username: "adminUser",
    photoUrl: "/public/admin.jpeg",
    role: "admin",
    createdAt: "2024-03-20T10:45:00Z",
    updatedAt: "2024-03-22T10:45:00Z"
  },

  {
    id: "4",
    email: "JohnDoe@example.com",
    username: "JohnDoe",
    photoUrl: '/public/author.png',
    role: "author",
    createdAt: "2024-03-22T12:00:00Z",
    updatedAt: "2024-03-22T12:00:00Z"
  },
  {
    id: "5",
    email: "JaneSmith@example.com",
    username: "JaneSmith",
    photoUrl: "/public/editor.jpeg",
    role: "editor",
    createdAt: "2024-03-21T14:30:00Z",
    updatedAt: "2024-03-22T15:00:00Z"
  },
  {
    id: "4",
    email: "AliceBrown@example.com",
    username: "AliceBrown",
    photoUrl: "/public/admin.jpeg",
    role: "admin",
    createdAt: "2024-03-20T10:45:00Z",
    updatedAt: "2024-03-22T10:45:00Z"
  }
];

export const StaticCategories: Category[] = [
  {
    id: "101",
    name: "Technology",
    description: "All about the latest technology trends",
    slug: "technology",
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-21T10:00:00Z"
  },
  {
    id: "102",
    name: "Health",
    description: "Health and wellness tips",
    slug: "health",
    createdAt: "2024-03-19T09:30:00Z",
    updatedAt: "2024-03-20T09:30:00Z"
  },
  {
    id: "103",
    name: "Sports",
    description: "Latest sports updates",
    slug: "sports",
    createdAt: "2024-03-18T08:45:00Z",
    updatedAt: "2024-03-19T08:45:00Z"
  }
];

export const StaticArticles: Article[] = [
  {
    id: "201",
    title: "The Future of AI",
    description: "A deep dive into artificial intelligence",
    cover_url: "/public/future_of_ai.jpeg",
    published_at: "2024-03-21T16:00:00Z",
    createdAt: "2024-03-20T12:00:00Z",
    views: 150,
    likes_count: 25,
    comments_count: 5,
    categorie: "Technology",
    readingTime: 10,
    user: StaticUsers[0],
    featured: true
  },
  {
    id: "202",
    title: "Healthy Eating Habits",
    description: "Tips on maintaining a healthy diet",
    cover_url: "/public/healthy_eating_habits.jpeg",
    published_at: "2024-03-19T14:00:00Z",
    createdAt: "2024-03-18T10:00:00Z",
    views: 200,
    likes_count: 30,
    comments_count: 8,
    categorie: "Health",
    readingTime: 7,
    user: StaticUsers[1],
    featured: false
  },
  {
    id: "203",
    title: "Top 10 Football Players",
    description: "Ranking the best football players of 2024",
    cover_url: "/public/football_players.jpeg",
    published_at: "2024-03-22T10:00:00Z",
    createdAt: "2024-03-21T09:00:00Z",
    views: 500,
    likes_count: 80,
    comments_count: 15,
    categorie: "Sports",
    readingTime: 5,
    user: StaticUsers[2],
    featured: false
  },

  {
    id: '204',
    title: 'Introduction à React',
    description: "Découvrez les bases de React et comment créer des composants réutilisables.",
    cover_url: '/public/Introduction.jpg',
    published_at: '2024-03-01',
    createdAt:'2024-03-01',
    views: 150,
    user: StaticUsers[3],
    likes_count: 20,
    comments_count: 5,
    categorie: 'Informatique',
    readingTime: 60,
    featured: false
  },
  {
    id: '2',
    title: 'Les nouveautés de TypeScript',
    description: "Un aperçu des dernières fonctionnalités de TypeScript et comment les utiliser.",
    cover_url: '/public/typescript.jpeg',
    published_at: '2024-03-02',
    createdAt:'2024-03-02',
    views: 200,
    user: StaticUsers[4],
    likes_count: 35,
    comments_count: 8,
    categorie: 'Informatique',
    readingTime: 80,
    featured: true
  },
  {
    id: '3',
    title: 'Optimisation des performances en React',
    description: "Apprenez à optimiser vos applications React pour de meilleures performances.",
    cover_url: '/public/optimise_react.jpg',
    published_at: '2024-03-03',
    createdAt:'2024-03-03',
    views: 300,
    user: StaticUsers[5],
    likes_count: 50,
    comments_count: 12,
    categorie: 'Informatique',
    readingTime: 90,
    featured: true
  },
];

export const StaticComments: Comment[] = [
  {
    id: "301",
    content: "Great article!",
    userId: "1",
    articleId: "201",
    status: "approved",
    createdAt: "2024-03-21T18:00:00Z",
    updatedAt: "2024-03-21T18:30:00Z",
    user: StaticUsers[0]
  },
  {
    id: "302",
    content: "Very informative, thanks for sharing.",
    userId: "2",
    articleId: "202",
    status: "approved",
    createdAt: "2024-03-19T16:00:00Z",
    updatedAt: "2024-03-19T16:15:00Z",
    user: StaticUsers[1]
  },
  {
    id: "303",
    content: "I disagree with this ranking.",
    userId: "3",
    articleId: "203",
    status: "pending",
    createdAt: "2024-03-22T11:30:00Z",
    updatedAt: "2024-03-22T11:30:00Z",
    user: StaticUsers[2]
  }
];

export const StaticArticleLikes: ArticleLike[] = [
  {
    id: "401",
    userId: "1",
    articleId: "201",
    createdAt: "2024-03-21T18:10:00Z"
  },
  {
    id: "402",
    userId: "2",
    articleId: "202",
    createdAt: "2024-03-19T16:10:00Z"
  },
  {
    id: "403",
    userId: "3",
    articleId: "203",
    createdAt: "2024-03-22T11:35:00Z"
  }
];
