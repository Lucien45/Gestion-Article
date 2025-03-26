import React, { useEffect, useState } from 'react'
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
  CircularProgress
} from "@mui/material";
import { Article, CalendarToday, DeleteForever, Email, ManageAccounts, Badge } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StyledTableCell, StyledTableRow } from "../../utils/Table";
import { Token } from '../../utils/Token';
import { UserService } from '../../services/user.service';
import { apiUrl } from '../../services/api';

interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  username: string;
  profile?: string;
  role: string;
  lastLogin: string;
  articles: Article;
}

interface Article {
  length: number;
}

export const UserAccount: React.FC = () => {
  const [dataUser, setDataUser] = useState<User | null>(null);
  const userProfile = JSON.parse(Token.GetToken("user") as string);

  useEffect(() => {
    if (userProfile) {
      UserService.getUserById(userProfile.id)
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }, []);
  
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

        <Grid container size={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // onClick={() => setShowDialogue(true)}
          >
            Modifier
          </Button>
        </Grid>
      </CardContent>
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
  return (
    <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px", margin: "20px auto" }}>
      <Typography variant="h6" mb={5} gutterBottom>
        Remplir les informations suivantes
        <hr />
      </Typography>
      <Grid2 container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid2 size={6}>
          <TextField
            label="Matricule"
            variant="outlined"
            name="userMatricule"
            // value={userMatricule}
            // onChange={handleChange}
            required
            fullWidth
            // error=''
            // helperText='{imError ? "Vous devez six (06) chiffres" : ""}'
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Email"
            variant="outlined"
            name="userEmail"
            // value={userEmail}
            // onChange={handleChange}
            fullWidth
            inputMode="email"
            // error={emailError}
            // helperText={
            //   emailError ? "L'adresse email n'a pas un format valide" : ""
            // }
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Nom"
            variant="outlined"
            name="userName"
            // value={userName}
            // onChange={handleChange}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Prénom"
            variant="outlined"
            name="userFirstName"
            // value={userFirstName}
            // onChange={handleChange}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel>Sexe</InputLabel>
            <Select
              name="userSex"
              // value={userSex}
              // onChange={handleChange}
              label="Sexe"
            >
              <MenuItem value="masculin">Masculin</MenuItem>
              <MenuItem value="féminin">Féminin</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Numéro de téléphone"
            variant="outlined"
            name="userPhoneNumber"
            // value={userPhoneNumber}
            // onChange={handleChange}
            fullWidth
            inputMode="numeric"
            // error={phoneNumberError}
            // helperText={
            //   phoneNumberError
            //     ? "Le numéro de téléphone doit avoir une longueur 10"
            //     : ""
            // }
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel>Profile</InputLabel>
            <Select
              name="userProfileId"
              // value={userProfileId}
              // onChange={handleChange}
              label="Profile"
            >
              {/* {profileOptions.map((option) => (
                <MenuItem value={option.id}>
                  {format_split(option.name)}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Date de naissance"
            variant="outlined"
            type="date"
            name="userBirthDate"
            // value={userBirthDate}
            // onChange={handleChange}
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
            name="userPassword"
            // value={userPassword}
            // onChange={handleChange}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            label="Confirmation du mot de passe"
            variant="outlined"
            type="password"
            name="userConfirmPassword"
            // value={userConfirmPassword}
            // onChange={handleConfirmPasswordChange}
            required
            fullWidth
          />
        </Grid2>

        {/* {error && (
          <Grid2 size={12}>
            <Alert severity="error">
              Les deux mots de passe ne sont pas identique
            </Alert>
          </Grid2>
        )} */}

        <Grid2 size={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // disabled={!desableButton()}
            // onClick={() => setShowDialogue(true)}
          >
            Créer
          </Button>
        </Grid2>
      </Grid2>
    </Paper>
  )
}
