import React from 'react'
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
  Card,
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
} from "@mui/material";
import { DeleteForever, ManageAccounts } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StyledTableCell, StyledTableRow } from "../../utils/Table";


export const UserAccount: React.FC = () => {
  return (
    <Card sx={{  width: "100%", maxWidth: "1500px", margin: "10px auto"}}>
      <CardContent>
        <Typography variant="h5">UserAccount</Typography>
      </CardContent>
    </Card>
  )
}

export const UserList: React.FC = () => {
  
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
          // value={researchMode}
          // onChange={handleRadioChange}
          row
        >
          <FormControlLabel
            value="userMatricule"
            control={
              <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "1em" } }} />
            }
            label={<span style={{ fontSize: "0.8em" }}>Matricule</span>}
          />
          <FormControlLabel
            value="userName"
            control={
              <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "1em" } }} />
            }
            label={<span style={{ fontSize: "0.8em" }}>Nom</span>}
          />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Rechercher un utilisateur"
        variant="outlined"
        // value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", marginTop: "10px", width: "100%" }}
        // disabled={!enableResearch()}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Matricule</StyledTableCell>
              <StyledTableCell>Nom</StyledTableCell>
              <StyledTableCell>Prénom</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Rôle</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {/* {loader && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          )} */}
          {/* {!loader && ( */}
            <TableBody>
              {/* {userData?.map((user) => ( */}
                <StyledTableRow key='{user.id}'>
                  <StyledTableCell component="th" scope="row">
                    Matricule
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Nom
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Prenom
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    email
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Role
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
              {/* ))} */}
            </TableBody>
          {/* )} */}
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
