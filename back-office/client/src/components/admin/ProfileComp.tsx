/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Grid2,
  CardContent,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  IconButton,
  Avatar,
  Box,
  Divider,
  Grid,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Article, CalendarToday, DeleteForever, Email, ManageAccounts, Badge } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StyledTableCell, StyledTableRow } from "../../utils/Table";
import { Token } from '../../utils/Token';
import { UserService } from '../../services/user.service';
import { apiUrl } from '../../services/api';

interface User {
  id: number | string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profile?: string;
  role: string;
  nom: string;
  prenom?: string;
  lastLogin: string;
  civilite: string;
  date_naissance: string;
  contact?: string
  articles: Article;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  preview: string;
  role: string;
  nom: string;
  prenom?: string;
  civilite: string;
  date_naissance: string;
  contact?: string
}

interface Article {
  length: number;
}

interface DialogUserProps {
  userData: UserData;
}

interface DialogUserUpdateProps {
  userData: Partial<User>;
}


const DialogAddUser: React.FC<DialogUserProps> = ({ userData }) => {
  return (
    <Grid2>
      <Typography mb={1} variant="body1">
        <b>Role: </b>
        {userData.role}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Nom: </b>
        {userData.nom}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Prénom: </b>
        {userData.prenom}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Email: </b>
        {userData.email}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Sexe: </b>
        {userData.civilite}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Numéro de téléphone: </b>
        {userData.contact}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Date de naissance: </b>
        {userData.date_naissance}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Mot de passe: </b>
        {userData.password}
      </Typography>
    </Grid2>
  );
};

const DialogUpdateUser: React.FC<DialogUserUpdateProps> = ({ userData }) => {
  return (
    <Grid2>
      <Typography mb={1} variant="body1">
        <b>Role: </b>
        {userData.role}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Nom: </b>
        {userData.nom}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Prénom: </b>
        {userData.prenom}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Email: </b>
        {userData.email}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Sexe: </b>
        {userData.civilite}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Numéro de téléphone: </b>
        {userData.contact}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Date de naissance: </b>
        {userData.date_naissance}
      </Typography>
      <Typography mb={1} variant="body1">
        <b>Mot de passe: </b>
        {userData.password}
      </Typography>
    </Grid2>
  );
};

export const UserAccount: React.FC = () => {
  const [dataUser, setDataUser] = useState<Partial<User> | null>(null);
  const userProfile = JSON.parse(Token.GetToken("user") as string);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchUser = async () => {
    if (userProfile) {
      UserService.getUserById(userProfile.id)
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = () => {
    setOpenEditModal(true);
  };
  
  return (
    <Paper elevation={4} sx={{ padding: "20px", margin: "20px auto", borderRadius: 3, background: "#f9f9f9" }}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            src={dataUser?.profile ? `${apiUrl}/${dataUser.profile}` : ''}
            alt={dataUser?.username || "profileDefault"}
            sx={{ width: 80, height: 80, border: "3px solid #ddd" }}
          />
        </Box>

        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          {dataUser?.username || "Utilisateur"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" alignItems="center">
            <Email sx={{ marginRight: 1, color: "gray" }} />
            <Typography variant="body1">
              <strong>Email :</strong> {dataUser?.email || "Non spécifié"}
            </Typography>
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center">
            <CalendarToday sx={{ marginRight: 1, color: "gray" }} />
            <Typography variant="body1">
              <strong>Dernière connexion :</strong> {dataUser?.lastLogin ? new Date(dataUser.lastLogin).toLocaleString() : "Jamais connecté"}
            </Typography>
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center">
            <Article sx={{ marginRight: 1, color: "gray" }} />
            <Typography variant="body1">
              <strong>Nombre d'articles :</strong> {dataUser?.articles?.length || 0}
            </Typography>
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center">
            <Badge sx={{ marginRight: 1, color: "gray" }} />
            <Typography variant="body1">
              <strong>Rôle :</strong> {dataUser?.role || "Utilisateur"}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container xs={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => handleEdit()}
          >
            Modifier
          </Button>
        </Grid>
      </CardContent>

      {/* Composant UpdateUser */}
      <UpdateUser
        open={openEditModal}
        setOpen={setOpenEditModal}
        id={userProfile.id}
        refreshUser={fetchUser}
      />

    </Paper>
  )
}

export const UserList: React.FC = () => {
  const [dataUser, setDataUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [researchMode, setResearchMode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await UserService.getAllUsers();
      setDataUser(response.data);
    } catch (error) {
      console.warn(error);
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleRadioChange = (e: { target: { value: string } }) => {
    setResearchMode(e.target.value);
  };

  function enableResearch() {
    return researchMode;
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
      <Typography variant="h6" mb={4} gutterBottom>
        Informations sur les utilisateurs
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
            value="nom"
            control={
              <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "1em" } }} />
            }
            label={<span style={{ fontSize: "0.8em" }}>Nom</span>}
          />
          <FormControlLabel
            value="username"
            control={
              <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "1em" } }} />
            }
            label={<span style={{ fontSize: "0.8em" }}>username</span>}
          />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Rechercher un utilisateur"
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
              <StyledTableCell>Nom</StyledTableCell>
              <StyledTableCell>Prénom</StyledTableCell>
              <StyledTableCell>username</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Rôle</StyledTableCell>
              <StyledTableCell>Profile</StyledTableCell>
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
              {dataUser.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.nom}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.prenom}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.username}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.email}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.role}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Avatar
                      src={user?.profile ? `${apiUrl}/${user.profile}` : ''}
                      alt={user.username || "profileDefault"}
                      sx={{ width: 60, height: 60, border: "2px solid #ddd" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton
                      aria-label="Détails sur l'utilisateur"
                      // onClick={() => handleUpdateOpen(user)}
                    >
                      <VisibilityIcon
                        titleAccess="Détails sur l'utilisateur"
                        fontSize="medium"
                        color="primary"
                      ></VisibilityIcon>
                    </IconButton>
                    <IconButton
                      aria-label="Gérer le compte utilisateur"
                      // onClick={() => handleManageOpen(user)}
                    >
                      <ManageAccounts
                        titleAccess="Gérer le compte utilisateur"
                        fontSize="medium"
                        color="primary"
                      ></ManageAccounts>
                    </IconButton>
                    <IconButton 
                      // onClick={() => handleDeleteOpen(user)}
                    >
                      <DeleteForever
                        titleAccess="Supprimer le compte utilisateur"
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
    </Paper>
  )
}

export const AddUser: React.FC = () => {
  const [NewUserData, setNewUserData] = useState({ 
    username: '', email: '', password: '', confirmPassword: '', preview: '', 
    role: '', nom: '', prenom: '', civilite: '', date_naissance: '', contact:'',
  });

  const [error, setError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [userCreationSuccess, setUserCreationSuccess] = useState<boolean>(false);
  const [processMessage, setProcessMessage] = useState("");

  
  const loadProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];
    if (photo) {
      setImage(photo);
      setNewUserData({ ...NewUserData, preview: URL.createObjectURL(photo) });
      console.log(photo);
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (e.target.name === "nom") {
      const value = e.target.value;
      if (/^[A-Za-z' ]*$/.test(value)) {
        setNewUserData({ ...NewUserData, nom: value});
      }
    }
    if (e.target.name === "prenom") {
      const value = e.target.value;
      if (/^[A-Za-z' ]*$/.test(value)) {
        setNewUserData({ ...NewUserData, prenom: value});
      }
    }
    if (e.target.name === "civilite") {
      setNewUserData({ ...NewUserData, prenom: e.target.value});
    }
    if (e.target.name === "email") {
      // Email validation regex pattern
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const value = e.target.value;
      setNewUserData({ ...NewUserData, email: value});
      if (!emailPattern.test(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
    if (e.target.name === "password") {
      setNewUserData({ ...NewUserData, password: e.target.value});
    }
    if (e.target.name === "username") {
      setNewUserData({ ...NewUserData, username: e.target.value});
    }
    if (e.target.name === "date_naissance") {
      setNewUserData({ ...NewUserData, date_naissance: e.target.value});
    }
    if (e.target.name === "contact") {
      const numericValue = e.target.value;
      setNewUserData({ ...NewUserData, contact: numericValue})
    }
  };

  function desableButton() {
    return (
      NewUserData.username &&
      NewUserData.email &&
      NewUserData.password &&
      NewUserData.confirmPassword &&
      NewUserData.role &&
      NewUserData.nom &&
      NewUserData.date_naissance &&
      NewUserData.civilite 
    );
  }

  const handleConfirmPasswordChange = (e: { target: { value: string } }) => {
    const confirmPassword = e.target.value;
    setNewUserData((prevData) => ({ ...prevData, confirmPassword }));
  
    if (NewUserData.password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
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
    formData.append("username", NewUserData.username);
    formData.append("email", NewUserData.email);
    formData.append("password", NewUserData.password);
    formData.append("role", NewUserData.role);
    formData.append("nom", NewUserData.nom);

    if (NewUserData.prenom) {
      formData.append("prenom", NewUserData.prenom);
    }
    if (NewUserData.contact) {
      formData.append("contact", NewUserData.contact);
    }    
    if (image) {
     formData.append('profile', image);
    }
  
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }    
  
    try {
      const response = await UserService.SignUp(formData);
      console.log("Réponse serveur :", response);
      setProcessMessage(`L'utilisateur ${NewUserData.username} a été ajoutée avec succès.`);
      setNewUserData({ 
        username: '', email: '', password: '', confirmPassword: '', preview: '', 
        role: '', nom: '', prenom: '', civilite: '', date_naissance: '', contact:''});
      setSuccessDialog(true);
      setUserCreationSuccess(true)
    } catch (error: any) {
      setUserCreationSuccess(false)
      console.warn("Erreur lors de l'ajout :", error.response?.data || error.message);
      setNewUserData({ 
        username: '', email: '', password: '', confirmPassword: '', preview: '', 
        role: '', nom: '', prenom: '', civilite: '', date_naissance: '', contact:''});
    } finally {
      setProcessing(false);
      setOpenDialog(false);
    }
  }
  
  return (
    <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px", margin: "20px auto" }}>
      <Typography variant="h6" mb={5} gutterBottom>
        Remplir les informations suivantes
        <hr />
      </Typography>
      <Grid2 container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel>role</InputLabel>
            <Select
              name="role"
              value={NewUserData.role}
              onChange={(e) => setNewUserData({ ...NewUserData, role: e.target.value })} 
              label="auteur"
            >
              <MenuItem value="" disabled>Selectionnez un role</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="editeur">editeur</MenuItem>
              <MenuItem value="auteur">auteur</MenuItem>
              <MenuItem value="autre">autre</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={NewUserData.email}
            onChange={handleChange}
            fullWidth
            inputMode="email"
            error={emailError}
            helperText={
              emailError ? "L'adresse email n'a pas un format valide" : ""
            }
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Nom"
            variant="outlined"
            name="nom"
            value={NewUserData.nom}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Prénom"
            variant="outlined"
            name="prenom"
            value={NewUserData.prenom}
            onChange={handleChange}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel>Sexe</InputLabel>
            <Select
              name="civilite"
              value={NewUserData.civilite}
              onChange={(e) => setNewUserData({ ...NewUserData, civilite: e.target.value })} 
              label="Sexe"
            >
              <MenuItem value="" disabled>Selectionnez votre civilite</MenuItem>
              <MenuItem value="masculin">Masculin</MenuItem>
              <MenuItem value="féminin">Féminin</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Numéro de téléphone"
            variant="outlined"
            name="contact"
            value={NewUserData.contact}
            onChange={handleChange}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth required>
            <Button variant="outlined" component="label">
              Photo de profile
              <input type="file" hidden accept="image/*" onChange={loadProfile} />
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="username"
            variant="outlined"
            name="username"
            value={NewUserData.username}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={6}>
          {NewUserData.preview && (
              <>
                <img src={NewUserData.preview} alt="Aperçu" style={{ maxWidth: "200px", marginTop: "8px" }} />
              </>
            )}
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Date de naissance"
            variant="outlined"
            type="date"
            name="date_naissance"
            value={NewUserData.date_naissance}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Mot de passe"
            variant="outlined"
            type="password"
            name="password"
            value={NewUserData.password}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Confirmation du mot de passe"
            variant="outlined"
            type="password"
            name="confirmPassword"
            value={NewUserData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            fullWidth
          />
        </Grid2>

        {error && (
          <Grid2 size={12}>
            <Alert severity="error">
              Les deux mots de passe ne sont pas identique
            </Alert>
          </Grid2>
        )}

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
              <DialogAddUser userData={NewUserData} />
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
          {userCreationSuccess && (
            <b>L'utilisateur a été créé avec succès ✅</b>
          )}
          {!userCreationSuccess && (
            <b>Le systène n'a pas pu créer l'utilisateur ⚠️</b>
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
            {/* L'Utilisateur <b>{NewUserData.username}</b> a été ajoutée avec succès. */}
            <Grid2>
              <Typography variant="body1">{processMessage}</Typography>
            </Grid2>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

interface UpdateUserProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number | string | undefined;
  refreshUser: () => Promise<void>;
}

export const UpdateUser: React.FC<UpdateUserProps> = ({ open, setOpen, id, refreshUser }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  
  const [dataUserUpdate, setDataUserUpdate] = useState<Partial<User>>({ 
    username: '', email: '', password: '', confirmPassword: '', profile: '', 
    role: '', nom: '', prenom: '', civilite: '', date_naissance: '', contact:'',
  });
  const [initialData, setInitialData] = useState<Partial<User> | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const loadProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];
    if (photo) {
    setImage(photo);
    setDataUserUpdate({ ...dataUserUpdate, profile: URL.createObjectURL(photo) });
    console.log(photo);
    }
  };

  const fetchUser = async() => {
    try {
        const res = await UserService.getUserById(Number(id));
        console.log('data update: ', res.data);
        const data = {
          username: res.data.username,
          email: res.data.email,
          password: res.data.password, 
          confirme_mdp: "",
          profile: res.data.profile ? `${apiUrl}/${res.data.profile}` : '',
          role: res.data.role,
          nom: res.data.nom,
          prenom: res.data.prenom,
          civilite: res.data.civilite,
          date_naissance: res.data.date_naissance,
          contact: res.data.contact,
        };
        setDataUserUpdate(data);
        setInitialData(data);
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

  const handleSaveEdit = async () => {
    await refreshUser();
    setOpenDialog(false);
    setSuccessDialog(true);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {/* Modal d'édition */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Modifier les informations</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Rôle</InputLabel>
                <Select
                  name="role"
                  value={dataUserUpdate.role}
                  onChange={(e) => setDataUserUpdate({ ...dataUserUpdate, role: e.target.value })}
                  label="Rôle"
                >
                  <MenuItem value="" disabled>Selectionnez un rôle</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editeur">Éditeur</MenuItem>
                  <MenuItem value="auteur">Auteur</MenuItem>
                  <MenuItem value="autre">Autre</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                value={dataUserUpdate.email}
                onChange={(e) => setDataUserUpdate({ ...dataUserUpdate, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nom"
                fullWidth
                value={dataUserUpdate.nom || ""}
                onChange={(e) => setDataUserUpdate({ ...dataUserUpdate, nom: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Prénom"
                fullWidth
                value={dataUserUpdate.prenom || ""}
                onChange={(e) => setDataUserUpdate({ ...dataUserUpdate, prenom: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Sexe</InputLabel>
                <Select
                  name="civilite"
                  value={dataUserUpdate.civilite}
                  onChange={(e) => setDataUserUpdate({ ...dataUserUpdate, civilite: e.target.value })}
                  label="Sexe"
                >
                  <MenuItem value="" disabled>Selectionnez votre civilité</MenuItem>
                  <MenuItem value="masculin">Masculin</MenuItem>
                  <MenuItem value="féminin">Féminin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Numéro de téléphone"
                fullWidth
                value={dataUserUpdate.contact || ""}
                onChange={(e) => setDataUserUpdate({ ...dataUserUpdate, contact: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Photo de profil
                <input type="file" hidden accept="image/*" onChange={loadProfile}/>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                fullWidth
                value={dataUserUpdate.username || ""}
                onChange={(e) => setDataUserUpdate({ ...dataUserUpdate, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {dataUserUpdate.profile && (
                <>
                  <img src={dataUserUpdate.profile} alt="Aperçu" style={{ maxWidth: "200px", marginTop: "8px" }} />
                </>
                )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date de naissance"
                type="date"
                fullWidth
                value={dataUserUpdate.date_naissance || ""}
                onChange={(e) => setDataUserUpdate({ ...dataUserUpdate, date_naissance: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mot de passe"
                type="password"
                fullWidth
                value={dataUserUpdate.password}
                onChange={(e) => setDataUserUpdate({ ...dataUserUpdate, password: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirmation du mot de passe"
                type="password"
                fullWidth
                value={dataUserUpdate.confirmPassword}
                onChange={(e) => setDataUserUpdate({ ...dataUserUpdate, confirmPassword: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleOpenDialog} color="primary" variant="contained">
            Vérifier
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmation */}
      <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Veuillez vérifier les informations</DialogTitle>
        <DialogContent dividers>
          <DialogUpdateUser userData={dataUserUpdate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Annuler</Button>
          <Button onClick={handleSaveEdit} color="primary" variant="contained">Confirmer</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de succès */}
      <Dialog fullWidth open={successDialog} onClose={() => setSuccessDialog(false)}>
        <DialogTitle>Succès ✅</DialogTitle>
        <DialogContent>
          <DialogContentText>
            L'utilisateur <b>{dataUserUpdate.nom}</b> a été mis à jour avec succès.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialog(false)} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

