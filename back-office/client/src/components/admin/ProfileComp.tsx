/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
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
  DialogActions,
  Snackbar,
  FormGroup,
  Switch,
  Checkbox
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from '@mui/icons-material/Save';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import { Article, CalendarToday, DeleteForever, Email, ManageAccounts, Badge, Edit, AccountCircle, Phone, Work, CheckCircle, Cancel, History } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StyledTableCell, StyledTableRow } from "../../utils/Table";
import { Token } from '../../utils/Token';
import { UserService } from '../../services/user.service';
import { apiUrl } from '../../services/api';
import { SearchService } from '../../services/search.service';

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
  is_active: boolean;
  articles: Article;
}

interface UserData {
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

interface UserStatus {
  status: boolean;
  role: string;
}

interface DialogUserProps {
  userData: UserData;
}

interface DialogUserUpdateProps {
  userData: Partial<User>;
}
interface DialogUserUpdateStatusProps {
  userStatus: Partial<UserStatus>;
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

const DialogUpdateStatus: React.FC<DialogUserUpdateStatusProps> = ({ userStatus }) => {
  return (
    <Typography>
      <b>Statut: </b> {userStatus.status ? "Actif" : "Inactif"}
      <br />
      <b>Rôles sélectionnés: </b>{" "}
      {userStatus.role ? userStatus.role: "Aucun"}
    </Typography>
  );
};

interface Suggestion {
  type: string,
  label: string,
  id: number,
}

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
            src={dataUser?.profile ? `${apiUrl}/${dataUser.profile}` : dataUser?.username}
            alt={dataUser?.username}
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
            startIcon={<Edit />}
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
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<number>(0);
  const [openSuggestionDetail, setOpenSuggestionDetail] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditStatusModal, setOpenEditStatusModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [selectedId, setSelectedId] = useState<number | string>(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await UserService.getAllUsers();
      setDataUser(response.data);
      console.log('user all: ', response.data);
      
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

  const handleEdit = (id: number | string) => {
    setOpenEditModal(true);
    setSelectedId(id);
  };

  const handleDetailOpen = (user: User) => {
    setSelectedId(user.id);
    setOpenDetailModal(true);
  }

  const handleManage = (id: number | string) => {
    setOpenEditStatusModal(true);
    setSelectedId(id);
  };

  const handleDelete = (user: User) => {
    setSelectedId(user.id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      setOpenDeleteDialog(false);
      setOpenSuccess(true);
      fetchUsers();
    } catch (error) {
      console.warn(error);
      setOpenError(true);
    }
  };

  const fetchSuggestions = async (value: string) => {
    if (!value || !researchMode) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setSuggestionLoading(true);
    try {
      const res = await SearchService.searchUser(value, researchMode);
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
          <FormControlLabel
            value="email"
            control={
              <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "1em" } }} />
            }
            label={<span style={{ fontSize: "0.8em" }}>email</span>}
          />
        </RadioGroup>
      </FormControl>
      <Box position="relative">
        <TextField
          label="Rechercher un utilisateur"
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
              <StyledTableCell>Nom d'utilisateur</StyledTableCell>
              <StyledTableCell>Profile</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Rôle</StyledTableCell>
              <StyledTableCell>status</StyledTableCell>
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
                  <StyledTableCell align="left">
                    {user.username}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Avatar
                      src={user?.profile ? `${apiUrl}/${user.profile}` : ''}
                      alt={user.username || "profileDefault"}
                      sx={{ width: 60, height: 60, border: "2px solid #ddd", borderRadius: "10px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.email}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.role}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <span style={{ color: user?.is_active ? "green" : "red", fontWeight: "bold" }}>
                      {user?.is_active ? "Actif" : "Inactif"}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton
                      aria-label="Détails sur l'utilisateur"
                      onClick={() => handleDetailOpen(user)}
                    >
                      <VisibilityIcon
                        titleAccess="Détails sur l'utilisateur"
                        fontSize="medium"
                        color="primary"
                      ></VisibilityIcon>
                    </IconButton>
                    <IconButton
                      aria-label="Modifier l'information"
                      onClick={() => handleEdit(user.id)}
                    >
                      <Edit
                        titleAccess="Modifier l'information"
                        fontSize="medium"
                        color="secondary"
                      ></Edit>
                    </IconButton>
                    <IconButton
                      aria-label="Gérer de l'utilisateur"
                      onClick={() => handleManage(user.id)}
                    >
                      <ManageAccounts
                        titleAccess="Gérer l'acces de l'utilisateur"
                        fontSize="medium"
                        color="primary"
                      ></ManageAccounts>
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(user)}
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

      {/* Composant UpdateUser */}
      <UpdateUser
        open={openEditModal}
        setOpen={setOpenEditModal}
        id={selectedId}
        refreshUser={fetchUsers}
      />

      {/* Composant UpdateStatus */}
      <UpdateStatus
        open={openEditStatusModal}
        setOpen={setOpenEditStatusModal}
        id={selectedId}
        refreshUser={fetchUsers}
      />

      {/* Modal detail suggestion */}
      {openSuggestionDetail && (
        <DetailUser
          open={openSuggestionDetail}
          setOpen={setOpenSuggestionDetail}
          id={selectedSuggestionId}
        />
      )}

      {/* Composant detail user */}
      <DetailUser
        open={openDetailModal}
        setOpen={setOpenDetailModal}
        id={selectedId}
      />

      {/* Dialogue de suppression */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer cette utilisateur ?</Typography>
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
      setNewUserData({ ...NewUserData, civilite: e.target.value});
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

    if (NewUserData.date_naissance) {
      formData.append("date_naissance", NewUserData.date_naissance);
    }

    if (NewUserData.civilite) {
      formData.append("civilite", NewUserData.civilite);
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
          <FormControl variant="outlined" fullWidth>
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
                    src={NewUserData.preview}
                    alt={NewUserData.username}
                    sx={{ width: 180, height: 180, border: "1px solid #ddd" }}
                  />
                </Box>
                <DialogAddUser userData={NewUserData} />
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

interface DetalUserProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number | string | undefined;
}

export const UpdateUser: React.FC<UpdateUserProps> = ({ open, setOpen, id, refreshUser }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  
  const [dataUserUpdate, setDataUserUpdate] = useState<Partial<User>>({ 
    username: '', email: '', password: '', confirmPassword: '', profile: '', 
    nom: '', prenom: '', civilite: '', date_naissance: '', contact:'',
  });
  const [initialData, setInitialData] = useState<Partial<User> | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [processMessage, setProcessMessage] = useState("");
  const [userUpdateSuccess, setUserUpdateSuccess] = useState<boolean>(false);

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
      const data = {
        username: res.data.username,
        email: res.data.email,
        password: res.data.password, 
        confirme_mdp: "",
        profile: res.data.profile ? `${apiUrl}/${res.data.profile}` : '',
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

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (e.target.name === "nom") {
      const value = e.target.value;
      if (/^[A-Za-z' ]*$/.test(value)) {
        setDataUserUpdate({ ...dataUserUpdate, nom: value});
      }
    }
    if (e.target.name === "prenom") {
      const value = e.target.value;
      if (/^[A-Za-z' ]*$/.test(value)) {
        setDataUserUpdate({ ...dataUserUpdate, prenom: value});
      }
    }
    if (e.target.name === "civilite") {
      setDataUserUpdate({ ...dataUserUpdate, civilite: e.target.value});
    }
    if (e.target.name === "email") {
      // Email validation regex pattern
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const value = e.target.value;
      setDataUserUpdate({ ...dataUserUpdate, email: value});
      if (!emailPattern.test(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
    if (e.target.name === "password") {
      setDataUserUpdate({ ...dataUserUpdate, password: e.target.value});
    }
    if (e.target.name === "username") {
      setDataUserUpdate({ ...dataUserUpdate, username: e.target.value});
    }
    if (e.target.name === "date_naissance") {
      setDataUserUpdate({ ...dataUserUpdate, date_naissance: e.target.value});
    }
    if (e.target.name === "contact") {
      const numericValue = e.target.value;
      setDataUserUpdate({ ...dataUserUpdate, contact: numericValue})
    }
  };

  const handleConfirmPasswordChange = (e: { target: { value: string } }) => {
    const confirmPassword = e.target.value;
    setDataUserUpdate((prevData) => ({ ...prevData, confirmPassword }));
  
    if (dataUserUpdate.password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
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

    const formData = new FormData();
    if (dataUserUpdate.username) {
      formData.append("username", dataUserUpdate.username);
    }
    if (dataUserUpdate.email) {
      formData.append("email", dataUserUpdate.email);
    }
    if (dataUserUpdate.password) {
      formData.append("password", dataUserUpdate.password);
    }
    if (dataUserUpdate.nom) {
      formData.append("nom", dataUserUpdate.nom);
    }
    if (dataUserUpdate.prenom) {
      formData.append("prenom", dataUserUpdate.prenom);
    }
    if (dataUserUpdate.contact) {
      formData.append("contact", dataUserUpdate.contact);
    }    
    if (image) {
     formData.append('profile', image);
    }

    if (dataUserUpdate.date_naissance) {
      formData.append("date_naissance", dataUserUpdate.date_naissance);
    }

    if (dataUserUpdate.civilite) {
      formData.append("civilite", dataUserUpdate.civilite);
    }
  
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }    

    try {
      const response = await UserService.updateUser(Number(id), formData);
      console.log("Réponse serveur :", response);
      setProcessMessage(`L'utilisateur ${dataUserUpdate.username} a été ajoutée avec succès ✅`);
      await refreshUser();
      setOpenDialog(false);
      setSuccessDialog(true);
      setUserUpdateSuccess(true)
    } catch (error: any) {
      setUserUpdateSuccess(false)
      setProcessMessage(`Erreur lors de mise a jour de L'utilisateur ${dataUserUpdate.username} ⚠️`);
      console.warn("Erreur lors de mise a jour :", error.response?.data || error.message);
    }finally {
      setOpenDialog(false);
    }
    
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <>
      {/* Modal d'édition */}
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Modifier les informations</DialogTitle>

        <Divider sx={{ my: 2 }} />

        <DialogContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                inputMode="email"
                error={emailError}
                helperText={
                  emailError ? "L'adresse email n'a pas un format valide" : ""
                }
                fullWidth
                value={dataUserUpdate.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nom"
                name="nom"
                fullWidth
                value={dataUserUpdate.nom || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Prénom"
                fullWidth
                value={dataUserUpdate.prenom || ""}
                name="prenom"
                onChange={handleChange}
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
                name="contact"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Photo de profil
                <input type="file" hidden accept="image/*" onChange={loadProfile}/>
              </Button>
              {dataUserUpdate.profile && (
                <>
                  <img src={dataUserUpdate.profile} alt="Aperçu" style={{ maxWidth: "200px", marginTop: "8px" }} />
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                fullWidth
                value={dataUserUpdate.username || ""}
                name="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date de naissance"
                type="date"
                fullWidth
                value={dataUserUpdate.date_naissance || ""}
                InputLabelProps={{ shrink: true }}
                name="date_naissance"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mot de passe"
                type="password"
                fullWidth
                value={dataUserUpdate.password}
                name="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirmation du mot de passe"
                type="password"
                fullWidth
                value={dataUserUpdate.confirmPassword}
                name="confirmPassword"
                onChange={handleConfirmPasswordChange}
              />
            </Grid>
            {error && (
              <Grid item xs={12} sm={12}>
               <Alert severity="error">
                  Les deux mots de passe ne sont pas identique
                </Alert>
            </Grid>
            )}
          </Grid>
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
              src={dataUserUpdate?.profile ? `${dataUserUpdate.profile}` : dataUserUpdate?.username}
              alt={dataUserUpdate?.username}
              sx={{ width: 80, height: 80, border: "3px solid #ddd" }}
            />
          </Box>
          <DialogUpdateUser userData={dataUserUpdate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Annuler</Button>
          <Button onClick={handleSaveEdit} color="primary" variant="contained">Confirmer</Button>
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
};

export const UpdateStatus: React.FC<UpdateUserProps> = ({ open, setOpen, id, refreshUser }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [dataUserUpdate, setDataUserUpdate] = useState({status: false, role: '',});
  const [processMessage, setProcessMessage] = useState("");
  const [userUpdateSuccess, setUserUpdateSuccess] = useState<boolean>(false);
  const roleOptions = [
    {
      id: 1,
      nom: 'admin'
    },
    {
      id: 2,
      nom: 'editeur'
    },
    {
      id: 3,
      nom: 'auteur'
    },
    {
      id: 4,
      nom: 'autre'
    },
  ]

  const fetchUser = async() => {
    try {
      const res = await UserService.getUserById(Number(id));
      const data = {
        status: res.data.is_active,
        role: res.data.role,
      };
      setDataUserUpdate(data);
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

    const data = {
      role: dataUserUpdate.role,
      is_active: dataUserUpdate.status
    }

    try {
      const response = await UserService.updateUserStatus(Number(id), data)
      setProcessMessage(`L'utilisateur a été ajoutée avec succès ✅`);
      await refreshUser();
      setOpenDialog(false);
      setSuccessDialog(true);
      setUserUpdateSuccess(true)
    } catch (error: any) {
      setUserUpdateSuccess(false)
      setProcessMessage(`Erreur lors de mise a jour de L'utilisateur ⚠️`);
      console.warn("Erreur lors de mise a jour :", error.response?.data || error.message);
    }finally {
      setOpenDialog(false);
    }
    
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <>
      {/* Manage user Dialog */}
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Typography variant="h6" gutterBottom>
            Gestion des accès de l'utilsateur
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText>
              <Grid2
                container
                rowSpacing={5}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid2 size={12}>
                  Statut du compte
                  <FormGroup >
                    <FormControlLabel control=
                    {
                      <Switch 
                        checked={dataUserUpdate.status} 
                        onChange={(e) => setDataUserUpdate({...dataUserUpdate, status: e.target.checked})} 
                      />
                    } label={dataUserUpdate.status ? 'Activer': 'Desactiver'} />
                  </FormGroup>
                </Grid2>
                <Grid2 size={12}>
                  <FormGroup>
                    {roleOptions.map(roles =>(
                        <FormControlLabel key={roles.id} control={<Checkbox checked={dataUserUpdate.role.includes(roles.nom)}
                          onChange={(e) => setDataUserUpdate({...dataUserUpdate, role: roles.nom}) }
                        />} label={roles.nom} />
                    ))}
                  </FormGroup>
                </Grid2>
              </Grid2>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button title="Quitter" 
            onClick={() => setOpen(false)}
          >
            Quitter
          </Button>
          <Button variant="contained" title="Enregistrer" 
            onClick={handleOpenDialog}
            startIcon={<DomainVerificationIcon />}
          >
            Vérifier
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmation */}
      <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Veuillez vérifier les informations</DialogTitle>
        <DialogContent dividers>
          <DialogUpdateStatus userStatus={dataUserUpdate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Annuler</Button>
          <Button onClick={handleSaveEdit} color="primary" variant="contained">Confirmer</Button>
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
  )
}

export const DetailUser: React.FC<DetalUserProps> = ({open, setOpen, id}) => {
  const [dataUserUpdate, setDataUserUpdate] = useState<User | null>();

  const fetchUser = async() => {
    try {
      const res = await UserService.getUserById(Number(id));
      setDataUserUpdate(res.data);
    } catch (error) {
      console.log(`Échec de récupération des détails du club ${error}`);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [id])
  
  return(
    <>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Les informations sur l'utilisateur</DialogTitle>

        <Divider sx={{ my: 1 }} />

        <DialogContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src={dataUserUpdate?.profile ? `${apiUrl}/${dataUserUpdate.profile}` : ''}
              alt={dataUserUpdate?.username}
              sx={{ width: 80, height: 80, border: "3px solid #ddd" }}
            />
          </Box>
          <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
            {dataUserUpdate?.nom || "Utilisateur"} {dataUserUpdate?.prenom || ""}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" alignItems="center">
              <AccountCircle sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Nom d'utilisateur :</strong> {dataUserUpdate?.username || "Non spécifié"}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <Email sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Email :</strong> {dataUserUpdate?.email || "Non spécifié"}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <Phone sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Contact :</strong> {dataUserUpdate?.contact || "Non spécifié"}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <CalendarToday sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Date de naissance :</strong> {dataUserUpdate?.date_naissance ? new Date(dataUserUpdate.date_naissance).toLocaleDateString() : "Non spécifié"}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <History sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Dernière connexion :</strong> {dataUserUpdate?.lastLogin ? new Date(dataUserUpdate.lastLogin).toLocaleString() : "Jamais connecté"}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <Article sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Nombre d'articles :</strong> {dataUserUpdate?.articles?.length || 0}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <Work sx={{ marginRight: 1, color: "gray" }} />
              <Typography variant="body1"><strong>Rôle :</strong> {dataUserUpdate?.role || "Utilisateur"}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              {dataUserUpdate?.is_active ? <CheckCircle sx={{ marginRight: 1, color: "green" }} /> : <Cancel sx={{ marginRight: 1, color: "red" }} />}
              <Typography variant="body1"><strong>Status :</strong> <span style={{ color: dataUserUpdate?.is_active ? "green" : "red", fontWeight: "bold" }}>{dataUserUpdate?.is_active ? "Actif" : "Inactif"}</span></Typography>
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