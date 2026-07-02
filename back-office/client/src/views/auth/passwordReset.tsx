import React, { FormEvent, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockResetIcon from '@mui/icons-material/LockReset';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useLocation, useSearchParams } from 'react-router-dom';
import '../../assets/css/auth.css';
import { Utils } from '../../utils/Utils';
import { UserService } from '../../services/user.service';

const PasswordReset: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const isResetMode = useMemo(
    () => location.pathname.includes('reset-password') || Boolean(token),
    [location.pathname, token],
  );

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(value.length > 0 && !emailPattern.test(value));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordError(password.length > 0 && password !== value);
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailPattern.test(email)) {
      setEmailError(true);
      Utils.errorPage("L'adresse email n'a pas un format valide");
      return;
    }

    setLoader(true);
    try {
      await UserService.forgotPassword({ email });
      setEmailSent(true);
      Utils.success('Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.');
    } catch {
      Utils.errorPage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoader(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) {
      Utils.errorPage('Lien de réinitialisation invalide ou expiré.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      Utils.errorPage('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      Utils.errorPage('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoader(true);
    try {
      await UserService.resetPassword({ token, password });
      Utils.success('Votre mot de passe a été réinitialisé avec succès. Vous pouvez vous connecter.');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch {
      Utils.errorPage('Lien invalide ou expiré. Veuillez refaire une demande.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box className="password-reset-page">
      <Box className="password-reset-card">
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mb: 2 }}
        >
          <ArrowBackIcon fontSize="small" />
          Retour à la connexion
        </Link>

        {isResetMode ? (
          <form onSubmit={handleResetPassword} className="password-reset-form">
            <Typography variant="h4" mb={1}>
              Nouveau mot de passe
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Choisissez un nouveau mot de passe pour votre compte.
            </Typography>

            {!token && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Lien de réinitialisation invalide. Demandez un nouveau lien depuis la page mot de passe oublié.
              </Alert>
            )}

            <TextField
              fullWidth
              type="password"
              label="Nouveau mot de passe"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              disabled={!token}
            />
            <TextField
              fullWidth
              type="password"
              label="Confirmer le mot de passe"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              margin="normal"
              error={passwordError}
              helperText={passwordError ? 'Les deux mots de passe ne sont pas identiques' : ''}
              required
              disabled={!token}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={!token || !password || !confirmPassword || passwordError || loader}
              startIcon={<LockResetIcon />}
              sx={{ mt: 2 }}
            >
              Réinitialiser le mot de passe
            </Button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="password-reset-form">
            <Typography variant="h4" mb={1}>
              Mot de passe oublié
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Entrez votre adresse email. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </Typography>

            {emailSent && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.
              </Alert>
            )}

            <TextField
              fullWidth
              label="Adresse email"
              variant="outlined"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              margin="normal"
              inputMode="email"
              error={emailError}
              helperText={emailError ? "L'adresse email n'a pas un format valide" : ''}
              required
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={!email || emailError || loader}
              startIcon={<EmailIcon />}
              sx={{ mt: 2 }}
            >
              Envoyer le lien
            </Button>
          </form>
        )}

        {loader && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={28} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PasswordReset;
