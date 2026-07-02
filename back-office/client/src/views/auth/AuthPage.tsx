/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Box, Button, TextField, Typography, Avatar, Select, MenuItem, InputLabel, FormControl,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Utils } from "../../utils/Utils";
import { UserService } from "../../services/user.service";
import { Token } from "../../utils/Token";
import { LogService } from "../../services/log.service";

const AuthPage: React.FC = () => {
  const [signInData, setSignInData] = useState({ identification: '', password: '' });
  
  const [signUpData, setSignUpData] = useState({
    username: '', email: '', password: '', confirmPassword: '', preview: '', role: ''
  });

  const [image, setImage] = useState<File | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);

  const loadProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];
    if (photo) {
      setImage(photo);
      setSignUpData({ ...signUpData, preview: URL.createObjectURL(photo) });
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await UserService.SignIn(signInData);
      Token.AddToken("authUser", res.data.token);
      Token.AddToken("user", JSON.stringify(res.data.user));
      setSignInData({ identification: '', password: '' });

      const Log = {
        action: 'connexion',
        user: Number(res.data.user.id),
      }
      await LogService.createLog(Log)
      window.location.href = "/admin";
    } catch {
      Utils.errorPage("Mot de passe ou login incorrect");
    } finally {
      setLoader(false);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      Utils.errorPage("Les mots de passe ne correspondent pas");
      return;
    }

    Utils.confirmMessage("Créer un compte ?", async () => {
      try {
        const formData = new FormData();
        formData.append("email", signUpData.email);
        formData.append("username", signUpData.username);
        formData.append("password", signUpData.password);
        if (image) formData.append("profile", image);
        if (signUpData.role) formData.append("role", signUpData.role);

        const res = await UserService.SignUp(formData);
        Utils.success("Votre compte a été créé avec succès ✅! vous pouvez vous connecter maintenant.");
        console.log('reponse: ',res);
        
        const Log = {
          action: 'création compte',
          user: Number(res.data.id),
        }
        await LogService.createLog(Log)
        
        setSignInData({ identification: '', password: '' });
        setSignUpData({ username: '', email: '', password: '', confirmPassword: '', preview: '', role: '' });
        setImage(null);
      } catch (error: any) {
        Utils.errorPage(error.response?.data?.message || "Erreur ❌");
      }
    },
    () => { 
      console.log("Inscription annulée par l'utilisateur.");
    });
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (e.target.name === "email") {
      // Email validation regex pattern
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const value = e.target.value;
      setSignUpData({ ...signUpData, email: value});
      if (!emailPattern.test(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
    if (e.target.name === "password") {
      setSignUpData({ ...signUpData, password: e.target.value});
    }
    if (e.target.name === "username") {
      setSignUpData({ ...signUpData, username: e.target.value});
    }
  };

  function desableButtonRegister() {
    return (
      signUpData.username &&
      signUpData.email &&
      signUpData.password &&
      signUpData.confirmPassword &&
      signUpData.role 
    );
  }

  const handleConfirmPasswordChange = (e: { target: { value: string } }) => {
    const confirmPassword = e.target.value;
    setSignUpData((prevData) => ({ ...prevData, confirmPassword }));
  
    if (signUpData.password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>

      <form
        onSubmit={handleSignIn}
        className='sign-in-form'
      >
        <Typography variant="h4" mb={2}>CONNEXION</Typography>
        <TextField
          fullWidth
          label="Username ou email"
          variant="outlined"
          value={signInData.identification}
          onChange={(e) => setSignInData({ ...signInData, identification: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Mot de passe"
          variant="outlined"
          value={signInData.password}
          onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
          margin="normal"
        />
        <Box textAlign="right">
          <Link component={RouterLink} to="/forgot-password" underline="hover" variant="body2">
            Mot de passe oublié ?
          </Link>
        </Box>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!signInData.identification || !signInData.password}
          startIcon={<VpnKeyIcon />}
        >
          Connexion
        </Button>
      </form>

      {loader && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      )}
      <form
        onSubmit={handleSignUp}
        className="sign-up-form"
      >
        <Typography variant="h4" mb={2}>REGISTER</Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          name="username"
          required
          value={signUpData.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          margin="normal"
          value={signUpData.email}
          onChange={handleChange}
          inputMode="email"
          error={emailError}
          helperText={
            emailError ? "L'adresse email n'a pas un format valide" : ""
          }
          required
        />
        <Button variant="outlined" component="label" fullWidth sx={{ my: 1 }}>
          Télécharger une photo
          <input type="file" hidden accept="image/*" onChange={loadProfile} />
        </Button>
        {signUpData.preview && (
          <Box textAlign="center" my={2}>
            <Avatar src={signUpData.preview} sx={{ width: 100, height: 100, mx: "auto" }} />
          </Box>
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Rôle</InputLabel>
          <Select
            labelId="role-label"
            value={signUpData.role}
            onChange={(e) => setSignUpData({ ...signUpData, role: e.target.value })}
            label="Rôle"
          >
            <MenuItem value="" disabled>Selectionnez un role</MenuItem>
            <MenuItem value="editeur">Éditeur</MenuItem>
            <MenuItem value="auteur">Auteur</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Mot de passe"
          variant="outlined"
          margin="normal"
          value={signUpData.password}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          type="password"
          name="confirmPassword"
          label="Confirmer mot de passe"
          variant="outlined"
          margin="normal"
          value={signUpData.confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        {error && (
          <Alert severity="error">
            Les deux mots de passe ne sont pas identique
          </Alert>
        )}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={!desableButtonRegister()}
          startIcon={<AppRegistrationIcon />}
        >
          Créer un compte
        </Button>
      </form>
    </>
  );
};

export default AuthPage;
