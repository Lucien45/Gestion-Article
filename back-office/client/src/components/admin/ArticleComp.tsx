/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
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
  TableRow,
  TableCell,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from '@mui/icons-material/Save';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import { Visibility, Edit, DeleteForever, CalendarToday, Article, Description, Category, ThumbUp, Comment, Star, Timer, ImportExport, UploadFile } from "@mui/icons-material";
import { ArticleService } from "../../services/article.service";
import { Token } from "../../utils/Token";
import { Utils } from "../../utils/Utils";
import { apiUrl } from "../../services/api";
import { StyledTableCell, StyledTableRow } from "../../utils/Table";
import Papa from "papaparse";
import { UserService } from "../../services/user.service";
import { SearchService } from "../../services/search.service";
import { LogService } from "../../services/log.service";

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

interface Suggestion {
  type: string,
  label: string,
  id: number,
}

export const ListArticle: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [successDialog, setSuccessDialog] = useState(false);
  const [ErrorDialog, setErrorDialog] = useState(false);
  const [message, setMessage] = useState('');
  
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [researchMode, setResearchMode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<number>(0);
  const [openSuggestionDetail, setOpenSuggestionDetail] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

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

  const handleImportModal = () => {
    setOpenImportModal(true);
  }

  const handleConfirmDelete = async () => {
    if (!selectedArticle) return;
    try {
      await ArticleService.deleteArticle(selectedArticle.id)
      
      const Log = {
        action: 'suppression artcile',
        user: Number(userProfile?.id),
      }
      await LogService.createLog(Log)
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

  const fetchSuggestions = async (value: string) => {
    if (!value || !researchMode) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setSuggestionLoading(true);
    try {
      const res = await SearchService.searchArticle(value, researchMode);
      console.log("Suggestions:", res.data);
      setSuggestions(res.data || []);
      setShowSuggestions(true);
    } catch (err) {
      console.log("Erreur lors de la récupération des suggestions:", err);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setSuggestionLoading(false);
    }
  };

  const handleOpenDialogSuggestion = (id: number) => {
    setSelectedSuggestionId(id);
    setOpenSuggestionDetail(true);
    setShowSuggestions(false);

    setSearchTerm('');
    setSuggestions([]);
    setResearchMode('');
  }

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" mb={4} gutterBottom>
          Informations sur les Articles
          {}
        </Typography>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          startIcon={<ImportExport />}
          onClick={() => handleImportModal()}
        >
          Importer
        </Button>
      </Box>
      <hr />
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
      <Box position="relative">
        <TextField
          label="Rechercher une article"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
          setSearchTerm(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} 
          style={{ marginBottom: "20px", marginTop: "10px", width: "100%" }}
          disabled={!enableResearch()}
        />
        {showSuggestions && (
          <Paper
            elevation={4}
            style={{
              position: "absolute",
              zIndex: 10,
              left: 0,
              right: 0,
              margin: "0 auto",
              maxWidth: 600,
              width: "100%",
              top: 60,
            }}
          >
            {suggestionLoading ? (
              <Box p={2} textAlign="center">
                <CircularProgress size={20} />
              </Box>
            ) : suggestions.length > 0 ? (
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {suggestions.map((item, idx) => (
                  <li
                    key={item.label + idx}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      borderBottom: idx !== suggestions.length - 1 ? "1px solid #eee" : "none",
                      background: "#fff",
                    }}
                    onMouseDown={() => {
                      handleOpenDialogSuggestion(item.id)
                    }}
                  >
                    <span style={{ color: "#ff9800", fontWeight: 600 }}>{item.type} :</span> {item.label}
                  </li>
                ))}
              </ul>
            ) : (
              <Box p={2} textAlign="center" color="text.secondary">
                Aucune suggestion
              </Box>
            )}
          </Paper>
        )}
      </Box>
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
            <TableBody>
              {[...Array(5)].map((_, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell>
                    <Box sx={{ bgcolor: "#eee", height: 20, borderRadius: 1, width: "80%", mx: "auto" }} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ bgcolor: "#eee", height: 20, borderRadius: 1, width: "90%", mx: "auto" }} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ bgcolor: "#eee", height: 60, width: 60, borderRadius: 0, mx: "auto" }} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ bgcolor: "#eee", height: 20, borderRadius: 1, width: "70%", mx: "auto" }} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ bgcolor: "#eee", height: 20, borderRadius: 1, width: "60%", mx: "auto" }} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                      <Box sx={{ bgcolor: "#eee", width: 32, height: 32, borderRadius: "50%" }} />
                      <Box sx={{ bgcolor: "#eee", width: 32, height: 32, borderRadius: "50%" }} />
                      <Box sx={{ bgcolor: "#eee", width: 32, height: 32, borderRadius: "50%" }} />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
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

      {/* Modal detail suggestion */}
      {openSuggestionDetail && (
        <DetailArticle
          open={openSuggestionDetail}
          setOpen={setOpenSuggestionDetail}
          id={selectedSuggestionId}
        />
      )}

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

      {/* Modal Import */}
      <ImportArtcileCSVDialog
        open={openImportModal}
        onClose={() => setOpenImportModal(false)}
        onSuccess={(msg) => { setSuccessDialog(true); setMessage(msg); }}
        onError={(msg) => { setErrorDialog(true); setMessage(msg); }}
        refreshArticles={fetchArticles}
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
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

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
  const userProfile = JSON.parse(Token.GetToken("user") as string) || {};
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
      console.log(`Échec de récupération des détails de l'article ${error}`);
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
      
      const Log = {
        action: 'modification article',
        user: Number(userProfile?.id),
      };
      LogService.createLog(Log);
      await refreshArticle()
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
      
      const Log = {
        action: 'création article',
        user: Number(userProfile?.id),
      };
      LogService.createLog(Log);


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

interface ImportArticlesProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  refreshArticles: () => Promise<void>;
}

interface ArticlesCSV {
  titre: string;
  description: string;
  contenu: string;
  couverture: string;
  auteur_id: number | string;
  categorie_id: number | string;
  status: string;
  featured: boolean;
  reading_time: number | string;
}

export const ImportArtcileCSVDialog: React.FC<ImportArticlesProps> = ({ open, onClose, onSuccess, onError, refreshArticles }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<ArticlesCSV[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [categories, setCategories] = useState<Categorie[]>([]);
  const [auteurs, setAuteurs] = useState<User[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const userProfile = JSON.parse(Token.GetToken("user") as string) || {};
  const loadCouverture = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];
    if (photo) {
      setImage(photo);
      const newData = [...csvData];
      newData[idx] = { ...newData[idx], couverture: URL.createObjectURL(photo) };
      setCsvData(newData);
      console.log("image: ", photo);
    }
  };

  const loadContenu = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];
    if (photo) {
      setPdf(photo);
      const newData = [...csvData];
      newData[idx] = { ...newData[idx], contenu: URL.createObjectURL(photo) };
      setCsvData(newData);
      console.log("pdf: ", photo);
    }
  };
  const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setCsvData([]);
    setSelectedRows([]);
    if (file) {
      Papa.parse<ArticlesCSV>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = (results.data as any[]).map((row) => ({
            titre: row.titre || "",
            description: row.description || "",
            contenu: row.contenu || "",
            couverture: row.couverture || "",
            status: row.status || "",
            auteur_id: row.auteur_id ? Number(row.auteur_id) : 0,
            categorie_id: row.categorie_id ? Number(row.categorie_id) : 0,
            featured: row.featured === "true" || row.featured === true || row.featured === "t" || row.featured === "1",
            reading_time: row.reading_time ? Number(row.reading_time) : 0,
          }));
          setCsvData(data);
          setSelectedRows(data.map((_, idx) => idx));
        },
      });
    }
  };

  const handleRowSelect = (idx: number) => {
    setSelectedRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleImport = async () => {
    if (!csvData.length || !selectedRows.length) return;
    setLoading(true);

    const selectedArticles: ArticlesCSV[] = selectedRows.map((idx) => csvData[idx]);
    try {
      console.log('selected: ',selectedArticles)
      const response = await ArticleService.ImportcreateArticle(selectedArticles);
      console.log("Réponse serveur :", response);

      const Log = {
        action: 'import article',
        user: Number(userProfile?.id),
      };
      LogService.createLog(Log);

      setLoading(false);
      setSelectedFile(null);
      setCsvData([]);
      setSelectedRows([]);
      onSuccess && onSuccess("Importation réussie ✅");
      refreshArticles && refreshArticles();
      onClose();
    } catch (err) {
      console.warn('reponse server: ',err);
      setLoading(false);
      onError && onError("Erreur lors de l'importation ⚠️");
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setCsvData([]);
    setSelectedRows([]);
    onClose();
  };

  const fetchData = async () => {
    await ArticleService.getAllCategories()
      .then((response) => setCategories(response.data))
      .catch(console.warn);

    await UserService.getAllUsers()
      .then((res) => setAuteurs(res.data))
      .catch(console.warn)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Importer des catégories (CSV)</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFile />}
            disabled={loading}
          >
            Sélectionner un fichier CSV
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && (
            <Typography variant="body2" color="textSecondary">
              Fichier sélectionné : <b>{selectedFile.name}</b>
            </Typography>
          )}
        </Box>
        {csvData.length > 0 && (
          <Box mt={3}>
            <Typography variant="subtitle1" gutterBottom>
              Aperçu des données importées :
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Titre</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Contenu</TableCell>
                  <TableCell>Couverture</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Auteur</TableCell>
                  <TableCell>Catégorie</TableCell>
                  <TableCell>Featured</TableCell>
                  <TableCell>Temps lecture</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(idx)}
                        onChange={() => handleRowSelect(idx)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Titre"
                        value={row.titre}
                        onChange={e => {
                          const newData = [...csvData];
                          newData[idx] = { ...newData[idx], titre: e.target.value };
                          setCsvData(newData);
                        }}
                        size="small"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        sx={{ minWidth: 250 }}
                        disabled={!selectedRows.includes(idx)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Description"
                        value={row.description}
                        onChange={e => {
                          const newData = [...csvData];
                          newData[idx] = { ...newData[idx], description: e.target.value };
                          setCsvData(newData);
                        }}
                        size="small"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        sx={{ minWidth: 250 }}
                        disabled={!selectedRows.includes(idx)}
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl variant="outlined" fullWidth sx={{ minWidth: 200 }} disabled={!selectedRows.includes(idx)}>
                        <Button variant="outlined" component="label" disabled={!selectedRows.includes(idx)}>
                          Contenu
                          <input type="file" hidden accept="application/pdf" onChange={loadContenu(idx)} />
                        </Button>
                        {row.contenu && (
                          <>
                            <iframe 
                              src={
                                row?.contenu
                                ?`${apiUrl}/${row?.contenu}` 
                                : row?.contenu
                              } 
                              style={{ width: "100%", height: "200px", marginTop: "10px" }} 
                              
                            />
                          </>
                        )}
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl 
                        variant="outlined" 
                        size="small"
                        fullWidth
                        sx={{ minWidth: 200 }}
                        disabled={!selectedRows.includes(idx)}
                      >
                        <Button variant="outlined" component="label" disabled={!selectedRows.includes(idx)}>
                          Contenu
                          <input type="file" hidden accept="image/*" onChange={loadCouverture(idx)} />
                        </Button>
                        {row.couverture && (
                          <>
                            <img 
                              src={
                                row?.couverture
                                ?`${apiUrl}/${row?.couverture}` 
                                : row?.couverture
                              } 
                              alt="Aperçu" 
                              style={{ maxWidth: "150px", marginTop: "10px" }} 
                            />
                          </>
                        )}
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl 
                        size="small"
                        variant="outlined"
                        fullWidth
                        sx={{ minWidth: 120 }}
                        disabled={!selectedRows.includes(idx)}
                      >
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={row.status}
                          onChange={e => {
                            const newData = [...csvData];
                            newData[idx] = { ...newData[idx], status: e.target.value };
                            setCsvData(newData);
                          }}
                          label="Status"
                        >
                          <MenuItem value="brouillon">Brouillon</MenuItem>
                          <MenuItem value="publié">Publié</MenuItem>
                          <MenuItem value="archivé">Archivé</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Autocomplete
                        disablePortal
                        options={auteurs}
                        getOptionLabel={(option) => option.username}
                        sx={{ minWidth: 180 }}
                        fullWidth
                        size="small"
                        disabled={!selectedRows.includes(idx)}
                        value={auteurs.find((usr) => Number(usr.id) === Number(row.auteur_id)) || null}
                        onChange={(_, newValue) => {
                          const newData = [...csvData];
                          newData[idx] = { ...newData[idx], auteur_id: newValue ? newValue.id : "" };
                          setCsvData(newData);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Auteur"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Autocomplete
                        disablePortal
                        options={categories}
                        getOptionLabel={(option) => option.nom}
                        sx={{ minWidth: 180 }}
                        fullWidth
                        size="small"
                        disabled={!selectedRows.includes(idx)}
                        value={categories.find((cat) => cat.id === Number(row.categorie_id)) || null}
                        onChange={(_, newValue) => {
                          const newData = [...csvData];
                          newData[idx] = { ...newData[idx], categorie_id: newValue ? newValue.id : "" };
                          setCsvData(newData);
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
                    </TableCell>
                    <TableCell>
                      <FormGroup>
                        <FormControlLabel 
                          disabled={!selectedRows.includes(idx)}
                          control={
                            <Switch
                              checked={!!row.featured}
                              onChange={e => {
                                const newData = [...csvData];
                                newData[idx] = { ...newData[idx], featured: e.target.checked };
                                setCsvData(newData);
                              }}
                            />
                          }
                          label={row.featured ? 'Activer' : 'Desactiver'}
                        />
                      </FormGroup>
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Temp de lecture (min)"
                        value={row.reading_time}
                        type="Number"
                        onChange={e => {
                          const newData = [...csvData];
                          newData[idx] = { ...newData[idx], reading_time: e.target.value };
                          setCsvData(newData);
                        }}
                        size="small"
                        variant="outlined"
                        fullWidth
                        sx={{ minWidth: 100 }}
                        disabled={!selectedRows.includes(idx)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={loading}>Annuler</Button>
        <Button
          onClick={handleImport}
          color="primary"
          variant="contained"
          disabled={!csvData.length || !selectedRows.length || loading}
        >
          {loading ? <CircularProgress size={20} /> : "Importer la sélection"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}