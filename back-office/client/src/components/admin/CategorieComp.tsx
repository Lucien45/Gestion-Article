import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArticleService } from "../../services/article.service";
import { DeleteForever, Edit } from "@mui/icons-material";
import { StyledTableCell, StyledTableRow } from "../../utils/Table";

interface Categorie {
  id: number;
  nom: string;
  description: string;
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


export const ListCategorie: React.FC = () => {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState<Categorie | null>(null);

  const fetchCategories = async () => {
    await ArticleService.getAllCategories()
    .then((response) => {
      setCategories(response.data);
      console.log('categorie: ', response.data);
      
    })
    .catch((error) => {
      console.warn(error);
    })
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (categorie: Categorie) => {
    setSelectedCategorie(categorie);
    setOpenEditModal(true);
  };

  const handleDelete = (categorie: Categorie) => {
    setSelectedCategorie(categorie);
    setOpenDeleteDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedCategorie) return;
    try {
      await ArticleService.updateCategorie(selectedCategorie.id, selectedCategorie);
      setOpenEditModal(false);
      fetchCategories();
    } catch (error) {
      console.warn(error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategorie) return;
    try {
      await ArticleService.deleteCategorie(selectedCategorie.id);
      setOpenDeleteDialog(false);
      fetchCategories();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
      <Typography variant="h6" mb={4} gutterBottom>
        Informations sur les categories
        {}
        <hr />
      </Typography>
      <TextField
        label="Rechercher une categorie"
        variant="outlined"
        style={{ marginBottom: "20px", marginTop: "10px", width: "100%" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Nom</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
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
                  <IconButton 
                    onClick={() => handleDelete(categorie)}
                  >
                    <DeleteForever
                      titleAccess="Supprimer le categorie"
                      fontSize="medium"
                      color="error"
                    ></DeleteForever>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer>
      
      {/* Modal d'édition */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Modifier la Catégorie</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom"
            value={selectedCategorie?.nom || ""}
            onChange={(e) => setSelectedCategorie({ ...selectedCategorie!, nom: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Description"
            value={selectedCategorie?.description || ""}
            onChange={(e) => setSelectedCategorie({ ...selectedCategorie!, description: e.target.value })}
            margin="dense"
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
          <Typography>Êtes-vous sûr de vouloir supprimer cette catégorie ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">Annuler</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Supprimer</Button>
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

  const [processMessage, setProcessMessage] = useState("");
  const [CategorieAddSuccess, setCategorieAddSuccess] = useState<boolean>(false);


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
    // try {
    //   await ArticleService.createCategorie(newCategorie);
    //   setNewCategorie({ nom: "", description: "" });
    //   setSuccessDialog(true);
    //   setProcessMessage(`Le Categorie ${newCategorie.nom} a été ajoutée avec succès ✅`);
    //   setCategorieAddSuccess(true);
    // } catch (error) {
    //   console.warn(error);
    //   setProcessMessage(`Erreur lors de mise a jour de L'article ${newCategorie.nom} ⚠️`);
    //   setCategorieAddSuccess(false);
    // } finally {
    //   setProcessing(false);
    //   setOpenDialog(false);
    //   setCategorieAddSuccess(false);
    //   setProcessMessage('');
    // }
    await ArticleService.createCategorie(newCategorie)
    .then((response) => {
      setNewCategorie({ nom: "", description: "" });
      setSuccessDialog(true);
      setProcessMessage(`Le Categorie ${newCategorie.nom} a été ajoutée avec succès ✅`);
      setCategorieAddSuccess(true);
      console.log('reponse server: ', response);
    })
    .catch((error) => {
      setSuccessDialog(true);
      setProcessMessage(`Erreur lors de mise a jour de La categorie ⚠️`);
      setCategorieAddSuccess(false);
      console.warn('reponse server: ',error);
    })
    .finally(() => {
      setProcessing(false);
      setOpenDialog(false);
      setCategorieAddSuccess(false);
      setProcessMessage('');
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
          >
            Sauvegarder
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
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de succès */}
      <Dialog fullWidth open={successDialog} onClose={() => setSuccessDialog(false)}>
        <DialogTitle>
          {CategorieAddSuccess && (
            <b>Succès ✅</b>
          )}
          {!CategorieAddSuccess && (
            <b>Erreur ⚠️</b>
          )}
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
            <b>{processMessage}</b>
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
