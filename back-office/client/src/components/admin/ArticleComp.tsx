/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogContentText,
  CircularProgress,
  DialogActions,
  Avatar,
  Snackbar,
  Alert,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid2,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, Edit, DeleteForever } from "@mui/icons-material";
import { ArticleService } from "../../services/article.service";
import { Token } from "../../utils/Token";
import { Utils } from "../../utils/Utils";
import { apiUrl } from "../../services/api";
import { StyledTableCell, StyledTableRow } from "../../utils/Table";

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

interface ArticleData {
  titre: string;
  description: string;
  contenu: File | null;
  couverture: File | null;
  auteur: number;
  categorie: string| number;
  status: string;
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

interface DialogArtcileProps {
  articledata: ArticleData;
}


const DialogAddArticle: React.FC<DialogArtcileProps> = ({ articledata }) => {
  return (
    <Box>
      <Typography mb={1} variant="body1">
        <b>Titre:</b> {articledata.titre}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Description:</b> {articledata.description}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Categorie:</b> {articledata.categorie}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Status:</b> {articledata.status}
      </Typography>
    </Box>
  );
};

export const ListArticle: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [researchMode, setResearchMode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await ArticleService.getAllArticles();
      setArticles(response.data);
    } catch (error) {
      console.warn(error);
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
    ArticleService.getAllCategories()
      .then((response) => setCategories(response.data))
      .catch(console.warn);
  }
  , []);

  const handleView = (article: Article) => {
    setSelectedArticle(article);
    setOpenViewModal(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setOpenEditModal(true);
  };

  const handleDelete = (article: Article) => {
    setSelectedArticle(article);
    setOpenDeleteDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedArticle) return;
    try {
      setOpenEditModal(false);
      setOpenSuccess(true);
      fetchArticles();
    } catch (error) {
      console.warn(error);
      setOpenError(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedArticle) return;
    try {
      setOpenDeleteDialog(false);
      setOpenSuccess(true);
      fetchArticles();
    } catch (error) {
      console.warn(error);
      setOpenError(true);
    }
  };

  const handleRadioChange = (e: { target: { value: string } }) => {
    setResearchMode(e.target.value);
  };

  function enableResearch() {
    return researchMode;
  }

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
      <Typography variant="h6" mb={4} gutterBottom>
        Informations sur les Articles
        {}
        <hr />
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ fontSize: "0.8em" }}>
          Choisissez une méthode de recherche
        </FormLabel>
        <RadioGroup
          aria-label="options"
          name="researchMode"
          value={researchMode}
          onChange={handleRadioChange}
          row
        >
          <FormControlLabel
            value="titre"
            control={
              <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "1em" } }} />
            }
            label={<span style={{ fontSize: "0.8em" }}>Titre</span>}
          />
          <FormControlLabel
            value="categorie"
            control={
              <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "1em" } }} />
            }
            label={<span style={{ fontSize: "0.8em" }}>Catégorie</span>}
          />
          <FormControlLabel
            value="status"
            control={
              <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "1em" } }} />
            }
            label={<span style={{ fontSize: "0.8em" }}>Status</span>}
          />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Rechercher une article"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", marginTop: "10px", width: "100%" }}
        disabled={!enableResearch()}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Titre</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Couverture</StyledTableCell>
              <StyledTableCell>Catégorie</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {loading && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          )}
          {!loading && (
            <TableBody>
              {articles.map((article) => (
                <StyledTableRow key={article.id}>
                  <StyledTableCell component="th" scope="row">
                    {article.titre}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {article.description}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <Avatar
                      src={article?.couverture ? `${apiUrl}/${article.couverture}` : ''}
                      alt={article.titre || "profileDefault"}
                      sx={{ width: 60, height: 60, border: "2px solid #ddd" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {article.categorie?.nom}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {article.status}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                  <IconButton
                      aria-label="Détails sur l'article"
                      onClick={() => handleView(article)}
                    >
                      <Visibility
                        titleAccess="Détails sur l'article"
                        fontSize="medium"
                        color="primary"
                      ></Visibility>
                    </IconButton>
                    <IconButton
                      aria-label="Gérer l'article"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit
                        titleAccess="Gérer l'article"
                        fontSize="medium"
                        color="secondary"
                      ></Edit>
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(article)}
                    >
                      <DeleteForever
                        titleAccess="Supprimer l'article"
                        fontSize="medium"
                        color="error"
                      ></DeleteForever>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* Modal de visualisation */}
      <Dialog open={openViewModal} onClose={() => setOpenViewModal(false)}>
        <DialogTitle>Détails de l'Article</DialogTitle>
        <DialogContent>
          <Box>
            <Avatar
              src={selectedArticle?.couverture ? `${apiUrl}/${selectedArticle.couverture}` : ''}
              alt={selectedArticle?.titre}
              sx={{ width: 200, height: 200, marginBottom: 2 }}
            />
            <Typography variant="body1">Titre: {selectedArticle?.titre}</Typography>
            <Typography variant="body1">Description: {selectedArticle?.description}</Typography>
            <Typography variant="body1">Catégorie: {selectedArticle?.categorie?.nom}</Typography>
            <Typography variant="body1">Vues: {selectedArticle?.vue}</Typography>
            <Typography variant="body1">Likes: </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewModal(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>

      {/* Modal d'édition */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Modifier l'Article</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Titre"
            margin="dense"
            value={selectedArticle?.titre || ""}
            onChange={(e) => setSelectedArticle({ ...selectedArticle, titre: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            margin="dense"
            multiline
            rows={3}
            value={selectedArticle?.description || ""}
            onChange={(e) => setSelectedArticle({ ...selectedArticle, description: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Catégorie</InputLabel>
            <Select name="categorie" label="Catégorie" 
              onChange={(e) => setSelectedArticle({
                ...selectedArticle, categorie: { ...selectedArticle.categorie, id: e.target.value }
              })} 
              value={selectedArticle?.categorie?.id || ""} margin="dense">
              {categories.map((categorie) => (
                <MenuItem key={categorie.id} value={categorie.id}>{categorie.nom}</MenuItem>
              ))}  
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Nombre de vues"
            margin="dense"
            type="number"
            value={selectedArticle?.vue || ""}
            onChange={(e) => setSelectedArticle({ ...selectedArticle, vue: e.target.value })}
          />
          <TextField
            fullWidth
            label="Nombre de likes"
            margin="dense"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="secondary">Annuler</Button>
          <Button onClick={handleSaveEdit} color="primary" variant="contained">Enregistrer</Button>
        </DialogActions>
      </Dialog>


      {/* Dialogue de suppression */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer cette article ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">Annuler</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Supprimer</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbars */}
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success">
          Action réalisée avec succès !
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity="error">
          Une erreur est survenue !
        </Alert>
      </Snackbar>
    </Paper>      
  );
};

export const AddEditArticle: React.FC = () => {
  const [Newarticles, setNewArticles] = useState<ArticleData>({
    titre: "",
    description: "",
    contenu: null,
    couverture: null,
    auteur: 0,
    categorie: 0,
    status: "",
  });
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const userProfile = JSON.parse(Token.GetToken("user") as string);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewArticles({ ...Newarticles, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "couverture" | "contenu") => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setNewArticles((prevState) => ({
        ...prevState,
        [type]: { file, preview: fileUrl }, 
      }));
    }
  };
  

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmSubmit = async () => {
    setProcessing(true);
    const formData = new FormData();
    formData.append("titre", Newarticles.titre);
    formData.append("description", Newarticles.description);
    formData.append("status", Newarticles.status);
    formData.append("auteur_id", userProfile.id);
    formData.append("categorie_id", Newarticles.categorie.toString());

    if (Newarticles.contenu?.file) {
      formData.append("files", Newarticles.contenu.file);
    }
    if (Newarticles.couverture?.file) {
      formData.append("files", Newarticles.couverture.file);
    }    
  
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }    
  
    try {
      const response = await ArticleService.createArticle(formData);
      console.log("Réponse serveur :", response);
      setNewArticles({ titre: "", description: "", contenu: null, couverture: null, auteur: 0, categorie: "", status: "" });
      setSuccessDialog(true);
    } catch (error: any) {
      Utils.errorPage(`Erreur lors de l'ajout : ${error.response?.data || error.message}`)
      console.warn("Erreur lors de l'ajout :", error.response?.data || error.message);
      setNewArticles({ titre: "", description: "", contenu: null, couverture: null, auteur: 0, categorie: "", status: "" });
    } finally {
      setProcessing(false);
      setOpenDialog(false);
    }
  };  

  useEffect(() => {
    ArticleService.getAllCategories()
      .then((response) => setCategories(response.data))
      .catch(console.warn);
  }, []);

  function desableButton() {
    return (
      Newarticles.titre &&
      Newarticles.couverture &&
      Newarticles.contenu &&
      Newarticles.categorie &&
      Newarticles.status
    );
  }

  return (
    <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px", margin: "20px auto" }}>
      <Typography variant="h6" mb={5} gutterBottom>
        Remplir les informations suivantes
        <hr />
      </Typography>

      <Grid2 container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid2 size={6}>
          <TextField
            label="Titre"
            variant="outlined"
            name="titre"
            onChange={handleChange} 
            value={Newarticles.titre}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            onChange={handleChange} 
            value={Newarticles.description}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth>
            <Button variant="outlined" component="label">
              Couverture
              <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, "couverture")} />
            </Button>
            {Newarticles.couverture?.file && (
              <>
                <img src={Newarticles.couverture.preview} alt="Aperçu" style={{ maxWidth: "100px", marginTop: "10px" }} />
              </>
            )}
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth>
            <Button variant="outlined" component="label">
              Contenu
              <input type="file" hidden accept="application/pdf" onChange={(e) => handleFileUpload(e, "contenu")} />
            </Button>
            {Newarticles.contenu?.file && (
              <>
                <iframe src={Newarticles.contenu.preview} style={{ width: "100%", height: "300px", marginTop: "10px" }} />
              </>
            )}
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel>Categorie</InputLabel>
            <Select
              name="Categorie"
              onChange={(e) => setNewArticles({ ...Newarticles, categorie: e.target.value })} 
              value={Newarticles.categorie}
              label="Categorie"
            >
              <MenuItem value="" disabled>Selectionner un categorie</MenuItem>
              {categories.map((categorie) => (
                <MenuItem key={categorie.id} value={categorie.id}>{categorie.nom}</MenuItem>
              ))} 
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              onChange={(e) => setNewArticles({ ...Newarticles, status: e.target.value })} 
              value={Newarticles.status}
              label="Status"
            >
              <MenuItem value="" disabled>Selectionner un status</MenuItem>
              <MenuItem value="publié">Publié</MenuItem>
              <MenuItem value="brouillon">Brouillon</MenuItem>
              <MenuItem value="archivé">Archivé</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!desableButton()}
            onClick={handleOpenDialog}
          >
            Créer
          </Button>
        </Grid2>
      </Grid2>
      
      {/* Dialog de confirmation */}
      <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Veuillez vérifier les informations</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {processing ? (
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <CircularProgress />
              </Box>
            ) : (
              <DialogAddArticle articledata={Newarticles} />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={processing} onClick={handleCloseDialog}>
            Annuler
          </Button>
          <Button onClick={handleConfirmSubmit} disabled={processing} color="primary" variant="contained">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de succès */}
      <Dialog fullWidth open={successDialog} onClose={() => setSuccessDialog(false)}>
        <DialogTitle>
          <b>Catégorie enregistrée avec succès ✅</b>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setSuccessDialog(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <DialogContentText>
            L'article <b>{Newarticles.titre}</b> a été ajoutée avec succès.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};