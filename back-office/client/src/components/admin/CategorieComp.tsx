/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  IconButton,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Grid2,
  Divider,
  TableRow,
  TableCell,
  Checkbox,
  Stack,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from '@mui/icons-material/Save';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ArticleService } from "../../services/article.service";
import { Add, DeleteForever, Edit, UploadFile } from "@mui/icons-material";
import { StyledTableCell, StyledTableRow } from "../../utils/Table";
import { Token } from "../../utils/Token";
import Papa from "papaparse";
import { SearchService } from "../../services/search.service";

interface Categorie {
  id: number;
  nom: string;
  description: string;
}

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

interface User {
  id: string;
  email: string;
  username: string;
  profile: string;
  role: string;
}

interface DialogCategorieProps {
  categorieData: CategorieData;
}

interface CategorieData {
  nom: string;
  description: string;
}

const DialogCategorie: React.FC<DialogCategorieProps> = ({ categorieData }) => {
  return (
    <Box>
      <Typography mb={1} variant="body1">
        <b>Nom:</b> {categorieData.nom}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Description:</b> {categorieData.description}
      </Typography>
    </Box>
  );
};

interface Suggestion {
  type: string,
  label: string,
  id: number,
}


export const ListCategorie: React.FC = () => {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState<Categorie | null>(null);

  const [successDialog, setSuccessDialog] = useState(false);
  const [ErrorDialog, setErrorDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedId, setSelectedId] = useState<number | string>(0);
  const userProfile = JSON.parse(Token.GetToken("user") as string) || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<number | string>(0);
  const [openSuggestionDetail, setOpenSuggestionDetail] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true)
    await ArticleService.getAllCategories()
    .then((response) => {
      setCategories(response.data);
      console.log('categorie: ', response.data);
      
    })
    .catch((error) => {
      console.warn(error);
      setLoading(false);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  const fetchSuggestions = async (value: string) => {
    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const res = await SearchService.searchCategorie(value);
      console.log("Suggestions:", res.data);
      setSuggestions(res.data || []);
      setShowSuggestions(true);
    } catch (err) {
      console.log("Erreur lors de la récupération des suggestions:", err);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (categorie: Categorie) => {
    setSelectedCategorie(categorie);
    setSelectedId(categorie.id);
    setOpenEditModal(true);
  };

  const handleDelete = (categorie: Categorie) => {
    setSelectedCategorie(categorie);
    setOpenDeleteDialog(true);
  };

  const handleOpenDialogSuggestion = (id: number | string) => {
    setSelectedSuggestionId(id);
    setOpenSuggestionDetail(true);
    setShowSuggestions(false);

    setSearchTerm('');
    setSuggestions([]);
  }

  const handleImportModal = () => {
    setOpenImportModal(true);
  }

  const handleConfirmDelete = async () => {
    if (!selectedCategorie) return;
    try {
      await ArticleService.deleteCategorie(selectedCategorie.id);
      setOpenDeleteDialog(false);
      fetchCategories();
      setSuccessDialog(true);
      setMessage('suppression reussie avec succès ✅');
    } catch (error) {
      console.warn(error);
      setErrorDialog(true);
      setMessage('Erreur lors de suppression de categorie ⚠️');
    }
  };

  if (suggestionLoading) {
    return(
      <Dialog open={true} fullWidth>
        <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" mb={4} gutterBottom>
          Informations sur les categories
          {}
        </Typography>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={() => handleImportModal()}
        >
          Importer
        </Button>
      </Box>
      <hr />
      <Box position="relative" width="100%">
        <TextField
          label="Rechercher une categorie"
          variant="outlined"
          style={{ marginBottom: "20px", marginTop: "10px", width: "100%" }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} 
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
              <StyledTableCell>Nom</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {loading && (
            <TableBody>
              {[...Array(5)].map((_, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell>
                    <Box sx={{ bgcolor: "#9b968f", height: 20, borderRadius: 1, width: "80%", mx: "auto" }} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ bgcolor: "#9b968f", height: 20, borderRadius: 1, width: "90%", mx: "auto" }} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                      <Box sx={{ bgcolor: "#9b968f", width: 32, height: 32, borderRadius: "50%" }} />
                      <Box sx={{ bgcolor: "#9b968f", width: 32, height: 32, borderRadius: "50%" }} />
                      <Box sx={{ bgcolor: "#9b968f", width: 32, height: 32, borderRadius: "50%" }} />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
          {!loading && (
            <TableBody>
              {categories.map((categorie) => (
                <StyledTableRow key={categorie.id}>
                  <StyledTableCell component="th" scope="row">
                    {categorie.nom}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {categorie.description}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton
                      aria-label="Gérer le categorie"
                      onClick={() => handleEdit(categorie)}
                    >
                      <Edit
                        titleAccess="Gérer le categorie"
                        fontSize="medium"
                        color="primary"
                      ></Edit>
                    </IconButton>
                    {userProfile?.role === 'admin' && (

                      <IconButton 
                        onClick={() => handleDelete(categorie)}
                      >
                        <DeleteForever
                          titleAccess="Supprimer le categorie"
                          fontSize="medium"
                          color="error"
                        ></DeleteForever>
                      </IconButton>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* Modal detail suggestion */}
      <CategorieDetail
        id={selectedSuggestionId}
        open={openSuggestionDetail}
        setOpen={setOpenSuggestionDetail}
      />
      
      {/* Modal d'édition */}
      <UpdateCategorie
        open={openEditModal}
        setOpen={setOpenEditModal}
        id={selectedId}
        refreshCategorie={fetchCategories}
      />

      {/* Modal Import */}
      <ImportCategorieCSVDialog
        open={openImportModal}
        onClose={() => setOpenImportModal(false)}
        onSuccess={(msg) => { setSuccessDialog(true); setMessage(msg); }}
        onError={(msg) => { setErrorDialog(true); setMessage(msg); }}
        refreshCategorie={fetchCategories}
      />

      {/* Dialogue de suppression */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer cette catégorie ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">Annuler</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Supprimer</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de succès */}
      <Dialog fullWidth open={successDialog} onClose={() => setSuccessDialog(false)}>
        <DialogTitle>
          <b>Succès ✅</b>
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
            <b>{message}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de error */}
      <Dialog fullWidth open={ErrorDialog} onClose={() => setErrorDialog(false)}>
        <DialogTitle>
          <b>Error ⚠️</b>
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
            <b>{message}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export const AddEditCategorie: React.FC = () => {
  const [newCategorie, setNewCategorie] = useState<CategorieData>({ nom: "", description: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [ErrorDialog, setErrorDialog] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategorie({ ...newCategorie, [e.target.name]: e.target.value });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmSubmit = async () => {
    setProcessing(true);
    await ArticleService.createCategorie(newCategorie)
    .then((response) => {
      setNewCategorie({ nom: "", description: "" });
      setSuccessDialog(true);
      console.log('reponse server: ', response);
    })
    .catch((error) => {
      setErrorDialog(true);
      console.warn('reponse server: ',error);
    })
    .finally(() => {
      setProcessing(false);
      setOpenDialog(false);
      setErrorDialog(false);
    })
  };

  function desableButton() {
    return (
      newCategorie.nom
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
            label="Nom"
            variant="outlined"
            name="nom"
            onChange={handleChange} 
            value={newCategorie.nom}
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
            value={newCategorie.description}
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
              <DialogCategorie categorieData={newCategorie} />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={processing} onClick={handleCloseDialog}>
            Annuler
          </Button>
          <Button onClick={handleConfirmSubmit} disabled={processing} color="primary" variant="contained">
            Ok, Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de succès */}
      <Dialog fullWidth open={successDialog} onClose={() => setSuccessDialog(false)}>
        <DialogTitle>
          <b>Succès ✅</b>
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
            <b>Le Categorie {newCategorie.nom} a été ajoutée avec succès ✅</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de error */}
      <Dialog fullWidth open={ErrorDialog} onClose={() => setErrorDialog(false)}>
        <DialogTitle>
          <b>Error ⚠️</b>
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
            <b>Erreur lors de la creation du categorie ⚠️</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

interface UpdateCategorieProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number | string | undefined;
  refreshCategorie: () => Promise<void>;
}

export const UpdateCategorie: React.FC<UpdateCategorieProps> = ({open, setOpen, id, refreshCategorie}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [dataCategorie, setDataCategorie] = useState({ 
    nom: "", description: "" 
  });

  const [processMessage, setProcessMessage] = useState("");
  const [userUpdateSuccess, setUserUpdateSuccess] = useState<boolean>(false);

  const fetchCategorie = async () => {
    if (!id) return;
    try {
      const response = await ArticleService.getCategorie(Number(id));
      setDataCategorie({
        nom: response.data.nom,
        description: response.data.description,
      });
    } catch (error) {
      console.warn("Erreur lors de la récupération de la catégorie :", error);
    }
  };

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
    if (!id) return;
    if (!dataCategorie) return;
    try {
      await ArticleService.updateCategorie(Number(id), dataCategorie);
      setProcessMessage(`Le categorie ${dataCategorie?.nom} a été ajoutée avec succès ✅`);
      await refreshCategorie();
      setOpenDialog(false);
      setSuccessDialog(true);
      setUserUpdateSuccess(true)
    } catch (error: any) {
      setUserUpdateSuccess(false)
      setProcessMessage(`Erreur lors de mise a jour de la categorie ${dataCategorie?.nom} ⚠️`);
      console.warn("Erreur lors de mise a jour :", error.response?.data || error.message);
    }finally {
      setOpenDialog(false);
    }
    
  };

  useEffect(() => {
    fetchCategorie();
  }, [id]);

  return(
    <>
      {/* Modal d'édition */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Modifier les informations</DialogTitle>

        <Divider sx={{ my: 2 }} />

        <DialogContent>
          <TextField
            fullWidth
            label="Nom"
            value={dataCategorie?.nom || ""}
            onChange={(e) => setDataCategorie({ ...dataCategorie, nom: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Description"
            value={dataCategorie?.description || ""}
            onChange={(e) => setDataCategorie({ ...dataCategorie, description: e.target.value })}
            margin="dense"
          />
        </DialogContent>

        <Divider sx={{ my: 2 }} />

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Annuler</Button>
          <Button onClick={handleOpenDialog} color="primary" variant="contained" startIcon={<DomainVerificationIcon />}>Vérifier</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmation */}
      <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Veuillez vérifier les informations</DialogTitle>
        <DialogContent dividers>
          <DialogCategorie categorieData={dataCategorie} />
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
          <b>{processMessage}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialog(false)} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

interface ImportCategorieProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  refreshCategorie: () => Promise<void>;
}

interface CategorieCSV {
  nom: string;
  description: string;
  [key: string]: string;
}

export const ImportCategorieCSVDialog: React.FC<ImportCategorieProps> = ({ open, onClose, onSuccess, onError, refreshCategorie }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<CategorieCSV[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setCsvData([]);
    setSelectedRows([]);
    if (file) {
      Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data.map((row) => {
            const arr = row as string[];
            return {
              nom: arr[1],
              description: arr[2],
            };
          });
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

    const selectedCategories = selectedRows.map((idx) => ({
      nom: csvData[idx].nom,
      description: csvData[idx].description,
    }));
    try {
      const response = await ArticleService.ImportcreateCategorie(selectedCategories)
      console.log('reponse server: ', response);
      setLoading(false);
      setSelectedFile(null);
      setCsvData([]);
      setSelectedRows([]);
      onSuccess && onSuccess("Importation réussie ✅");
      refreshCategorie && refreshCategorie();
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Importer des catégories (CSV)</DialogTitle>
      <DialogContent>
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
                  <TableCell>Nom</TableCell>
                  <TableCell>Description</TableCell>
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
                        label="Nom"
                        value={row.nom}
                        onChange={e => {
                          const newData = [...csvData];
                          newData[idx] = { ...newData[idx], nom: e.target.value };
                          setCsvData(newData);
                        }}
                        size="small"
                        variant="outlined"
                        fullWidth
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

interface DetailCategorieProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number | string;
}

interface CategorieDetail {
  id: number;
  nom: string;
  description: string;
  articles: Article[];
}

export const CategorieDetail: React.FC<DetailCategorieProps> = ({open, setOpen, id}) => {
  const [DataCategorie, setDatacategorie] = useState<CategorieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCategorie = async() => {
    setLoading(true);
    try {
      const res = await ArticleService.getCategorie(id);
      setDatacategorie(res.data);
      console.log('data detail: ', res.data);
    } catch (error) {
      console.warn(`Échec de récupération des détails du categorie ${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCategorie();
  }, [id]);

  if (loading) return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
          <CircularProgress />
        </Box>
      </DialogContent>
    </Dialog>
  );

  return(
    <>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)} maxWidth="xs"
        PaperProps={{
            sx: { borderRadius: 4, bgcolor: "#f9fafb", width: "700px", maxWidth: "90vw" }
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, pb: 1 }}>
            <InfoOutlinedIcon color="primary" sx={{ fontSize: 32 }} />
            <span style={{ fontWeight: 700, fontSize: 20 }}>Détail du categorie</span>
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
        </DialogTitle>
        <Divider />
        <DialogContent dividers sx={{ bgcolor: "#fff" }}>
          <Stack spacing={3} alignItems="center" mt={1}>
            <Avatar sx={{ bgcolor: "#ff9800", width: 64, height: 64, fontSize: 32 }}>
              {DataCategorie?.nom?.charAt(0)?.toUpperCase() || "?"}
            </Avatar>
            <Typography variant="h5" fontWeight="bold" color="primary" align="center">
              {DataCategorie?.nom || ""}
            </Typography>
            <Stack spacing={1} width="100%">
              <Typography variant="body1" color="textSecondary">
                <b>Description :</b> {DataCategorie?.description || ""}
              </Typography>
            </Stack>
            {/* Affichage des articles */}
            {DataCategorie?.articles && DataCategorie.articles.length > 0 && (
              <Box mt={2} width="100%">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Articles de cette catégorie :
                </Typography>
                <ul style={{ paddingLeft: 20 }}>
                  {DataCategorie.articles.map((article) => (
                    <li key={article.id}>
                      <Typography variant="body2">
                        <b>{article.titre}</b> — {article.description}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f9fafb" }}>
            <Button onClick={() => setOpen(false)} color="primary" variant="contained">
                Fermer
            </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
