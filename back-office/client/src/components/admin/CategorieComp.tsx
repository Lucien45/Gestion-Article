/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from '@mui/icons-material/Save';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import { ArticleService } from "../../services/article.service";
import { DeleteForever, Edit } from "@mui/icons-material";
import { StyledTableCell, StyledTableRow } from "../../utils/Table";
import { Token } from "../../utils/Token";

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

  const [successDialog, setSuccessDialog] = useState(false);
  const [ErrorDialog, setErrorDialog] = useState(false);
  const [message, setMessage] = useState('');

  const [selectedId, setSelectedId] = useState<number | string>(0);
  const userProfile = JSON.parse(Token.GetToken("user") as string) || {};

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
    setSelectedId(categorie.id);
    setOpenEditModal(true);
  };

  const handleDelete = (categorie: Categorie) => {
    setSelectedCategorie(categorie);
    setOpenDeleteDialog(true);
  };

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
        </Table>
      </TableContainer>
      
      {/* Modal d'édition */}
      <UpdateCategorie
        open={openEditModal}
        setOpen={setOpenEditModal}
        id={selectedId}
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
