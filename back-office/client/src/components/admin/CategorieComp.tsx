import React, { useEffect, useState } from "react";
import {
  Card,
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
  CardContent,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArticleService } from "../../services/article.service";
import { Delete, Edit } from "@mui/icons-material";

interface Categorie {
  nom: string;
  description: string;
}

interface DialogCategorieProps {
  categorieData: Categorie;
}

interface Categorie {
  nom: string;
  description: string;
}

export const ListCategorie: React.FC = () => {
  const [categories, setCategories] = useState<Categorie[]>([]);

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
  }
  , []);
  return (
    <Card sx={{  width: "100%", maxWidth: "1500px", margin: "10px auto"}}>
      <CardContent>
        <Typography variant="h5">Liste des Catégories</Typography>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {categories.map((categorie) => (
                <TableRow>
                  <TableCell>{categorie.nom}</TableCell>
                  <TableCell>{categorie.description}</TableCell>
                  <TableCell>
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

export const AddEditCategorie: React.FC = () => {
  const [newCategorie, setNewCategorie] = useState<Categorie>({ nom: "", description: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

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
    try {
      await ArticleService.createCategorie(newCategorie);
      setNewCategorie({ nom: "", description: "" });
      setSuccessDialog(true);
    } catch (error) {
      console.warn(error);
    } finally {
      setProcessing(false);
      setOpenDialog(false);
    }
  };

  return (
    <Card sx={{ width: "100%", maxWidth: "1500px", margin: "10px auto" }}>
      <Box sx={{ maxWidth: "600px", margin: "20px auto" }}>
        <Typography variant="h5">Ajouter / Modifier une Catégorie</Typography>
        <Box sx={{ maxWidth: "800px", margin: "20px auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField onChange={handleChange} value={newCategorie.nom} name="nom" label="Nom" variant="outlined" required fullWidth />
          <TextField onChange={handleChange} value={newCategorie.description} name="description" label="Description" variant="outlined" required fullWidth />
        </Box>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Sauvegarder
          </Button>
        </Box>
      </Box>

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
            La catégorie <b>{newCategorie.nom}</b> a été ajoutée avec succès.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
