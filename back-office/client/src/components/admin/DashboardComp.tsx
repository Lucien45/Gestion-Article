import React, { useEffect, useState } from 'react'
import { Box, Grid, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, CircularProgress } from "@mui/material";
import { Visibility, Comment, CheckCircle, Add, Settings, People, Category, FeaturedPlayList } from "@mui/icons-material";
import { ArticleService } from '../../services/article.service';
import { Token } from '../../utils/Token';
import { UserService } from '../../services/user.service';
import { useNavigate } from 'react-router';

interface ArticleDetail {
  id: string;
  titre: string;
  contenu: string;
  description: string;
  couverture: string;
  date_publication: string;
  auteur?: User;
  categorie?: Categorie;
  status: string;
  vue: number;
  commentaires: Commentaire;
  likes: Like;
  reading_time: number;
  featured: boolean;
}

interface Commentaire {
  length: number;
}

interface Like {
  length: number;
}

interface User {
  id: string;
  email: string;
  username: string;
  is_active: boolean;
  role: string;
  lastLogin: string;
}

interface Categorie {
  id: number | string;
  nom: string;
  description: string;
}

export const AdminDash: React.FC = () => {
    const [Users, setUsers] = useState<User[]>([]);
    const [Categories, setCategories] = useState<Categorie[]>([]);
    const [loading, setLoading] = useState(false);
    const [Articles, setArticles] = useState<ArticleDetail[]>([]);
    const navigate = useNavigate();
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await ArticleService.getAllArticles();
            setArticles(response.data? response.data : []);

            const responseUsers = await UserService.getAllUsers();
            setUsers(responseUsers.data? responseUsers.data : []);

            const responseCategories = await ArticleService.getAllCategories();
            setCategories(responseCategories.data? responseCategories.data : []);
        } catch (error) {
          console.warn(error);
        } finally {
          setLoading(false);
        }
    }
    
    const articlesCount = Articles.length;
    const usersCount = Users.length;
    const categoriesCount = Categories.length;
    const publishedCount = Articles.filter(art => art.status === "publié").length;

    const stats = [
        { label: "Utilisateurs", value: usersCount, icon: <People fontSize="large" color="secondary" /> },
        { label: "Articles", value: articlesCount, icon: <CheckCircle fontSize="large" color="action" /> },
        { label: "Categories", value: categoriesCount, icon: <Category fontSize="large" color="success" /> },
        { label: "Articles publiés", value: publishedCount, icon: <CheckCircle fontSize="large" color="primary" /> },
    ];

    // Nouveaux utilisateurs récents
    const recentUsers = Users.slice(0, 5).map((user) => ({
        name: user.username,
        email: user.email,
        role: user.role,
        status: user.is_active ? "Actif" : "Inactif",
        last_login: user.lastLogin,
    }));

    const handleOptionClick = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box>
            <Grid container spacing={2} mb={3}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}>
                            <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                            <CardContent>
                                <Typography variant="h6">{stat.value}</Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {stat.label}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOptionClick('/admin/article')}>Nouveaux utilisateur</Button>
                <Button variant="contained" color="success" startIcon={<Add />} onClick={() => handleOptionClick('/admin/article')}>Nouveaux categorie</Button>
                <Button variant="outlined" color="secondary" startIcon={<People />} onClick={() => handleOptionClick('/admin/article')}>Gérer les utilisateurs</Button>
                <Button variant="outlined" color="inherit" startIcon={<Settings />} onClick={() => handleOptionClick('/admin/settings')}>Paramètres</Button>
            </Stack>


            {/* Utilisateurs récents */}
            <Box>
                <Typography variant="h6" mb={2}>Utilisateurs récents</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Nom</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Rôle</strong></TableCell>
                                <TableCell><strong>Dernier connexion</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        {loading && (
                            <>
                                <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                >
                                <CircularProgress />
                                </Box>
                            </>
                        )}
                        {!loading && (
                            <TableBody>
                                {recentUsers.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.last_login ? new Date(user.last_login).toLocaleString() : "Jamais connecté"}</TableCell>
                                        <TableCell>
                                            <Typography color={user.status === "Actif" ? "success.main" : "error.main"} fontWeight="bold">
                                                {user.status}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export const UserDash: React.FC = () => {
    const [Articles, setArticles] = useState<ArticleDetail[]>([]);
    const [loading, setLoading] = useState(false);
    const userProfile = JSON.parse(Token.GetToken("user") as string);

    const navigate = useNavigate();

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const response = await ArticleService.getAllArticles();
            console.log('liste article: ', response.data)
            const Article_user = response.data.filter((article: ArticleDetail) => article.auteur?.id === userProfile.id)
            console.log('liste article user: ', Article_user)
            setArticles(Article_user? Article_user : []);
        } catch (error) {
          console.warn(error);
        } finally {
          setLoading(false);
        }
    }

    const totalViews = Articles.reduce((sum, art) => sum + (art.vue || 0), 0);
    const totalComments = Articles.reduce((sum, art) => sum + (art.commentaires?.length || 0), 0);
    const publishedCount = Articles.filter(art => art.status === "publié").length;
    const articleFeaturedCount = Articles.filter(art => art.featured).length;

    const stats = [
        { label: "Vues d'articles", value: totalViews, icon: <Visibility fontSize="large" color="primary" /> },
        { label: "Articles Featured", value: articleFeaturedCount, icon: <FeaturedPlayList fontSize="large" color="secondary" /> },
        { label: "Commentaires", value: totalComments, icon: <Comment fontSize="large" color="success" /> },
        { label: "Articles publiés", value: publishedCount, icon: <CheckCircle fontSize="large" color="action" /> },
    ];
    
    const recentArticles = Articles.slice(0, 5).map((article) => ({
        title: article.titre,
        views: article.vue,
        comments: article.commentaires.length,
        status: article.status,
    }));

    const handleOptionClick = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        fetchArticles();
    }, []);
    return (
        <>
            <Grid container spacing={2} mb={3}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}>
                            <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                            <CardContent>
                                <Typography variant="h6">{stat.value}</Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {stat.label}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOptionClick('/admin/article')}>Nouvel article</Button>
                <Button variant="contained" color="success" startIcon={<Add />} onClick={() => handleOptionClick('/admin/article')}>Nouveaux categorie</Button>
                <Button variant="outlined" color="warning" startIcon={<People />} onClick={() => handleOptionClick('/admin/article')}>Gérer les articles</Button>
                <Button variant="outlined" color="inherit" startIcon={<Settings />} onClick={() => handleOptionClick('/admin/settings')}>Paramètres</Button>
            </Stack>

            {/* Recent Articles */}
            <Box mb={4}>
                <Typography variant="h6" mb={2}>Articles récents</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Article</strong></TableCell>
                                <TableCell><strong>Vues</strong></TableCell>
                                <TableCell><strong>Commentaires</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        {loading && (
                            <>
                                <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                >
                                <CircularProgress />
                                </Box>
                            </>
                        )}
                        {!loading && (
                            <TableBody>
                                {recentArticles.map((article, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{article.title}</TableCell>
                                        <TableCell>{article.views}</TableCell>
                                        <TableCell>{article.comments}</TableCell>
                                        <TableCell>
                                            <Typography color={article.status === "Publié" ? "success.main" : "warning.main"} fontWeight="bold">
                                                {article.status}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

