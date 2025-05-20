/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import {
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
  Divider,
  Grid,
  FormGroup,
  Switch,
  Autocomplete,
  Stack,
  Pagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from '@mui/icons-material/Save';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import { Visibility, Edit, DeleteForever, CalendarToday, Article, Description, Category, ThumbUp, Comment, Star, Timer } from "@mui/icons-material";
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
  reading_time: number;
  featured: boolean;
}

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

interface ArticleData {
  titre: string;
  description: string;
  contenu: string;
  couverture: string;
  auteur: number;
  categorie: string| number;
  status: string;
  featured: boolean; 
  reading_time: number;
}

interface UpdateArticle {
  titre: string;
  contenu: string;
  description: string;
  couverture: string;
  categorie: number; 
  status: string;
  featured: boolean; 
  reading_time: number;
}

interface User {
  id: string;
  email: string;
  username: string;
  profile: string;
  role: string;
}

interface Categorie {
  id: number | string;
  nom: string;
  description: string;
}

interface DialogArtcileProps {
  articledata: ArticleData;
}

interface DialogUpdateArtcileProps {
  articledata: UpdateArticle;
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

const DialogUpdateArticle: React.FC<DialogUpdateArtcileProps> = ({ articledata }) => {
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
      <Typography mb={1} variant="body1">
        <b>Featured:</b> {articledata.featured ? 'oui' : 'non'}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Temp de lecture:</b> {articledata.reading_time} min
      </Typography>
    </Box>
  );
};

export const ListArticle: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [researchMode, setResearchMode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const userProfile = JSON.parse(Token.GetToken("user") as string);

  const [selectedId, setSelectedId] = useState<number | string>(0);
  
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await ArticleService.getAllArticles();
      console.log('liste article: ', response.data)
      if (userProfile.role === 'admin') {
        setArticles(response.data);
      } else {
        const Article_user = response.data.filter((article: Article) => article.auteur?.id === userProfile.id)
        console.log('liste article user: ', Article_user)
        setArticles(Article_user? Article_user : []);
      }
    } catch (error) {
      console.warn(error);
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleView = (article: Article) => {
    setSelectedId(article.id);
    setOpenViewModal(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedId(article.id);
    setOpenEditModal(true);
  };

  const handleDelete = (article: Article) => {
    setSelectedArticle(article);
    setOpenDeleteDialog(true);
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
                      sx={{ width: 60, height: 60, border: "2px solid #ddd", borderRadius: 0 }}
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
      <Stack 
        spacing={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Pagination count={articles.length} />
      </Stack>

      {/* Modal de visualisation */}
      <DetailArticle
        open={openViewModal}
        setOpen={setOpenViewModal}
        id={selectedId}
      />

      {/* Modal d'édition */}
      <UpdateArticle
        open={openEditModal}
        setOpen={setOpenEditModal}
        id={selectedId}
        refreshArticle={fetchArticles}
      />

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

interface DetalArticleProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number | string | undefined;
}

interface UpdateArticleProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number | string | undefined;
  refreshArticle: () => Promise<void>;
}

export const DetailArticle: React.FC<DetalArticleProps> = ({open, setOpen, id}) => {
  const [dataArticle, setDataArticle] = useState<ArticleDetail | null>();

  const fetchArticle = async() => {
    try {
      const res = await ArticleService.getArticle(Number(id));
      setDataArticle(res.data);
      console.log('data detail: ', res.data);
    } catch (error) {
      console.warn(`Échec de récupération des détails de l'article ${error}`);
    }
  }

  useEffect(() => {
    fetchArticle();
  }, [id])
  
  return(
    <>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Les informations sur l'Article</DialogTitle>

        <Divider sx={{ my: 1 }} />

        <DialogContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src={dataArticle?.couverture ? `${apiUrl}/${dataArticle?.couverture}` : ''}
              alt={dataArticle?.titre}
              sx={{ width: 100, height: 100, border: "3px solid #ddd", borderRadius: 0 }}
            />
          </Box>
          <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
            {dataArticle?.titre || "Article"}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" alignItems="center">
              <Description sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Description :</strong> {dataArticle?.description || "Non spécifié"}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <Category sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Catégorie :</strong> {dataArticle?.categorie?.nom || "Non spécifié"}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <Visibility sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Nombre de Vues :</strong> {dataArticle?.vue || 0}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <ThumbUp sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Nombre de Likes :</strong> {dataArticle?.likes.length} </Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <Comment sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Nombre de Commentaires :</strong> {dataArticle?.commentaires.length} </Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <CalendarToday sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Date de publication :</strong> {dataArticle?.date_publication ? new Date(dataArticle.date_publication).toLocaleDateString() : "Non spécifié"}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <Star sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Featured :</strong> {dataArticle?.featured ? 'Oui' : 'Non'}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <Timer sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Temps de lecture :</strong> {dataArticle?.reading_time || "Non spécifié"} Min</Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <Divider sx={{ my: 1 }} />

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export const UpdateArticle: React.FC<UpdateArticleProps> = ({ open, setOpen, id, refreshArticle }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  
  const [dataArticleUpdate, setDataArticleUpdate] = useState({
    titre: '', description: '', couverture: '', contenu: '', 
    categorie: 0, status: '', featured: false, reading_time: 0,
  });
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  const [processMessage, setProcessMessage] = useState("");
  const [userUpdateSuccess, setUserUpdateSuccess] = useState<boolean>(false);

  const loadCouverture = (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];
    if (photo) {
      setImage(photo);
      setDataArticleUpdate({ ...dataArticleUpdate, couverture: URL.createObjectURL(photo) });
      console.log("image: ",photo);
    }
  };

  const loadContenu = (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];
    if (photo) {
      setPdf(photo);
      setDataArticleUpdate({ ...dataArticleUpdate, contenu: URL.createObjectURL(photo) });
      console.log("pdf: ",photo);
    }
  };

  const fetchArticle = async() => {
    try {
      const res = await ArticleService.getArticle(Number(id));
      console.log('data update: ', res.data);
      
      const data = {
        titre: res.data.titre,
        description: res.data.description,
        categorie: res.data.categorie.id, 
        contenu: res.data.contenu ? `${apiUrl}/${res.data.contenu}` : '',
        couverture: res.data.couverture ? `${apiUrl}/${res.data.couverture}` : '',
        status: res.data.status,
        featured: res.data.featured,
        reading_time: res.data.reading_time,
      };
      setDataArticleUpdate(data);
    } catch (error) {
      console.log(`Échec de récupération des détails du club ${error}`);
    }
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpen(true);
  };

  const handleSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titre", dataArticleUpdate.titre);
    formData.append("description", dataArticleUpdate.description);
    formData.append("status", dataArticleUpdate.status);
    formData.append("categorie_id", dataArticleUpdate.categorie.toString());
    formData.append("featured", dataArticleUpdate.featured ? "true" : "false");
    formData.append("reading_time", dataArticleUpdate.reading_time.toString());

    if (pdf) {
      formData.append("files", pdf);
    }
    if (image) {
      formData.append("files", image);
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await ArticleService.updateArticle(Number(id), formData);
      setProcessMessage(`L'Article ${dataArticleUpdate?.titre} a été mis a jour avec succès ✅`);
      await refreshArticle();
      setOpenDialog(false);
      setSuccessDialog(true);
      setUserUpdateSuccess(true)
    } catch (error: any) {
      setUserUpdateSuccess(false)
      setProcessMessage(`Erreur lors de mise a jour de L'article ${dataArticleUpdate?.titre} ⚠️`);
      console.warn("Erreur lors de mise a jour :", error.response?.data || error.message);
    }finally {
      setOpenDialog(false);
    }
    
  };

  useEffect(() => {
    fetchArticle();
    ArticleService.getAllCategories()
      .then((response) => setCategories(response.data))
      .catch(console.warn);
  }, [id]);

  return (
    <>
    {/* Modal d'édition */}
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Modifier les informations</DialogTitle>
      <Divider sx={{ my: 2 }} />

      <DialogContent>
        <DialogContentText>
          <Grid container spacing={5} >
            <Grid item xs={12} sm={6}>
              <TextField
                label="Titre"
                variant="outlined"
                margin="dense"
                multiline
                rows={3}
                value={dataArticleUpdate.titre}
                onChange={(e) => setDataArticleUpdate({ ...dataArticleUpdate, titre: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                variant="outlined"
                margin="dense"
                multiline
                rows={3}
                value={dataArticleUpdate.description}
                onChange={(e) => setDataArticleUpdate({ ...dataArticleUpdate, description: e.target.value })}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <Button variant="outlined" component="label">
                  Couverture
                  <input type="file" hidden accept="image/*" onChange={loadCouverture} />
                </Button>
                {dataArticleUpdate.couverture && (
                  <>
                    <img src={dataArticleUpdate?.couverture} alt="Aperçu" style={{ maxWidth: "150px", marginTop: "10px" }} />
                  </>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <Button variant="outlined" component="label">
                  Contenu
                  <input type="file" hidden accept="application/pdf" onChange={loadContenu} />
                </Button>
                {dataArticleUpdate.contenu && (
                  <>
                    <iframe src={dataArticleUpdate?.contenu} style={{ width: "100%", height: "200px", marginTop: "10px" }} />
                  </>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                options={categories}
                getOptionLabel={(option) => option.nom}
                sx={{ width: '100%' }}
                value={categories.find((cat) => cat.id === dataArticleUpdate.categorie) || null}
                onChange={(event, newValue) => {
                  setDataArticleUpdate({ ...dataArticleUpdate, categorie: newValue ? Number(newValue.id) : dataArticleUpdate.categorie });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Catégorie"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={dataArticleUpdate.status}
                  onChange={(e) => setDataArticleUpdate({ ...dataArticleUpdate, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="brouillon">Brouillon</MenuItem>
                  <MenuItem value="publié">Publié</MenuItem>
                  <MenuItem value="archivé">Archivé</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              Featured
              <FormGroup >
                <FormControlLabel control=
                {
                  <Switch 
                    checked={dataArticleUpdate.featured } 
                    onChange={(e) => setDataArticleUpdate({...dataArticleUpdate, featured: e.target.checked})} 
                  />
                } label={dataArticleUpdate.featured ? 'Activer': 'Desactiver'} />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Temp de lecture (min)"
                variant="outlined"
                margin="dense"
                type="Number"
                rows={3}
                value={dataArticleUpdate.reading_time}
                onChange={(e) => setDataArticleUpdate({ ...dataArticleUpdate, reading_time: Number(e.target.value) })}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>

      <Divider sx={{ my: 2 }} />

      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleOpenDialog} color="primary" variant="contained" startIcon={<DomainVerificationIcon />}>
          Vérifier
        </Button>
      </DialogActions>
    </Dialog>

    {/* Dialog de confirmation */}
    <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Veuillez vérifier les informations</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            src={dataArticleUpdate?.couverture ? `${dataArticleUpdate.couverture}` : dataArticleUpdate?.titre}
            alt={dataArticleUpdate?.titre}
            sx={{ width: 80, height: 80, border: "3px solid #ddd", borderRadius: 0 }}
          />
        </Box>
        <DialogUpdateArticle articledata={dataArticleUpdate} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">Annuler</Button>
        <Button onClick={handleSaveEdit} color="primary" variant="contained">Ok, Confirmer</Button>
      </DialogActions>
    </Dialog>

    {/* Dialog de succès */}
    <Dialog fullWidth open={successDialog} onClose={() => setSuccessDialog(false)}>
      <DialogTitle>
      {userUpdateSuccess && (
        <b>Succès ✅</b>
      )}
      {!userUpdateSuccess && (
        <b>Erreur ⚠️</b>
      )}
        
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {userUpdateSuccess && (
            <b>{processMessage}</b>
          )}
          {!userUpdateSuccess && (
            <b>{processMessage}</b>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSuccessDialog(false)} color="primary">OK</Button>
      </DialogActions>
    </Dialog>
    </>
  );

}

export const AddEditArticle: React.FC = () => {
  const [Newarticles, setNewArticles] = useState<ArticleData>({
    titre: "",
    description: "",
    contenu: '',
    couverture: '',
    auteur: 0,
    categorie: 0,
    status: "",
    featured: false,
    reading_time: 0,
  });
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const userProfile = JSON.parse(Token.GetToken("user") as string);

  const [image, setImage] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewArticles({ ...Newarticles, [e.target.name]: e.target.value });
  };

  const loadCouverture = (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];
    if (photo) {
      setImage(photo);
      setNewArticles({ ...Newarticles, couverture: URL.createObjectURL(photo) });
      console.log(photo);
    }
  };

  const loadContenu = (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];
    if (photo) {
      setPdf(photo);
      setNewArticles({ ...Newarticles, contenu: URL.createObjectURL(photo) });
      console.log(photo);
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

    if (pdf) {
      formData.append("files", pdf);
    }
    if (image) {
      formData.append("files", image);
    }   
    
    if (Newarticles.featured) {
      formData.append("featured", Newarticles.featured ? "true" : "false");
    }

    if (Newarticles.reading_time) {
      formData.append("reading_time", Newarticles.reading_time.toString());
    }
  
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }    
  
    try {
      const response = await ArticleService.createArticle(formData);
      console.log("Réponse serveur :", response);
      setNewArticles({ titre: "", description: "", contenu: '', couverture: '', auteur: 0, categorie: "", status: "", reading_time:0, featured: false });
      setSuccessDialog(true);
    } catch (error: any) {
      Utils.errorPage(`Erreur lors de l'ajout : ${error.response?.data || error.message}`)
      console.warn("Erreur lors de l'ajout :", error.response?.data || error.message);
      setNewArticles({ titre: "", description: "", contenu: '', couverture: '', auteur: 0, categorie: "", status: "", reading_time:0, featured: false });
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
              <input type="file" hidden accept="image/*" onChange={loadCouverture} />
            </Button>
            {Newarticles.couverture && (
              <>
                <img src={Newarticles.couverture} alt="Aperçu" style={{ maxWidth: "100px", marginTop: "10px" }} />
              </>
            )}
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth>
            <Button variant="outlined" component="label">
              Contenu
              <input type="file" hidden accept="application/pdf" onChange={loadContenu} />
            </Button>
            {Newarticles.contenu && (
              <>
                <iframe src={Newarticles.contenu} style={{ width: "100%", height: "300px", marginTop: "10px" }} />
              </>
            )}
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <Autocomplete
            disablePortal
            options={categories}
            getOptionLabel={(option) => option.nom}
            sx={{ width: '100%' }}
            value={categories.find((cat) => cat.id === Newarticles.categorie) || null}
            onChange={(event, newValue) => {
              setNewArticles({ ...Newarticles, categorie: newValue ? newValue.id : '' });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Catégorie"
                required
              />
            )}
          />
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
          Featured
          <FormGroup>
            <FormControlLabel control=
            {
              <Switch 
                checked={Newarticles.featured } 
                onChange={(e) => setNewArticles({...Newarticles, featured: e.target.checked})} 
              />
            } label={Newarticles.featured ? 'Activer' : 'Desactiver'} />
          </FormGroup>
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Temp de lecture (min)"
            variant="outlined"
            type="Number"
            rows={3}
            value={Newarticles.reading_time}
            onChange={(e) => setNewArticles({ ...Newarticles, reading_time: Number(e.target.value) })}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!desableButton()}
            onClick={handleOpenDialog}
            startIcon={<SaveIcon />}
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
              <>
                <Box display="flex" justifyContent="center" mb={2}>
                  <Avatar
                    src={Newarticles.couverture}
                    alt={Newarticles.titre}
                    sx={{ width: 160, height: 160, border: "1px solid #ddd", borderRadius: 0 }}
                  />
                </Box>
                <DialogAddArticle articledata={Newarticles} />
              </>
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
          <b>Article enregistrée avec succès ✅</b>
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