import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { ArticleService } from "../../services/article.service";

interface Article {
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
  comments_count: number;
  readingTime: number;
}

interface User {
  id: string;
  email: string;
  username: string;
  profile: string;
  role: string;
}

interface Categorie {
  id: string;
  nom: string;
  description: string;
}

export const ListArticle: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    await ArticleService.getAllArticles()
    .then((response) => {
      setArticles(response.data);
      console.log('article: ', response.data);
      
    })
    .catch((error) => {
      console.warn(error);
    })
  }

  useEffect(() => {
    fetchArticles();
  }
  , []);

  return (
    <Card sx={{  width: "100%", maxWidth: "1500px", margin: "10px auto"}}>
      <CardContent>
        <Typography variant="h5">Liste des Articles</Typography>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titre</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Couverture</TableCell>
                <TableCell>Date de publication</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Vues</TableCell>
                <TableCell>Likes</TableCell>
                <TableCell>Commentaires</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.titre}</TableCell>
                  <TableCell>{article.description}</TableCell>
                  <TableCell>
                    <img src={article.couverture} alt="Couverture" width="50" />
                  </TableCell>
                  <TableCell>{article.date_publication}</TableCell>
                  <TableCell>{article.categorie?.nom}</TableCell>
                  <TableCell>{article.status}</TableCell>
                  <TableCell>{article.vue}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton color="secondary">
                      <Edit />
                    </IconButton>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export const AddEditArticle: React.FC = () => {
  return (
    <Card sx={{  width: "100%", maxWidth: "1500px", margin: "10px auto"}}>
      <CardContent>
        <Typography variant="h5">Ajouter un Article</Typography>
        <Box
          sx={{
            maxWidth: "800px",
            margin: "20px auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
          }}
        >
          <TextField id="titre" label="Titre" variant="outlined" required fullWidth />
          <TextField id="description" label="Description" variant="outlined" required fullWidth />
          
          <TextField id="contenu" type="file" variant="outlined" required fullWidth />
          <TextField id="couverture" type="file" variant="outlined" required fullWidth />
          
          <FormControl fullWidth required>
            <InputLabel>Catégorie</InputLabel>
            <Select label="Catégorie">
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Divertissement">Divertissement</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select label="Status">
              <MenuItem value="Publié">Publié</MenuItem>
              <MenuItem value="Brouillon">Brouillon</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button variant="contained" color="primary">Sauvegarder</Button>
        </Box>
      </CardContent>
    </Card>
  );
};