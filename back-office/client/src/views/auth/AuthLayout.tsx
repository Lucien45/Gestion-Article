import { useRef, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import '../../assets/css/auth.css'
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const signInBtn = container?.querySelector('#sign-in-btn');
    const signUpBtn = container?.querySelector('#sign-up-btn');

    const handleSignUpClick = () => container?.classList.add('sign-up-mode');
    const handleSignInClick = () => container?.classList.remove('sign-up-mode');

    signUpBtn?.addEventListener('click', handleSignUpClick);
    signInBtn?.addEventListener('click', handleSignInClick);

    return () => {
      signUpBtn?.removeEventListener('click', handleSignUpClick);
      signInBtn?.removeEventListener('click', handleSignInClick);
    };
  }, []);

  return (
    <Box className="container" ref={containerRef}>
      <Box className="forms-container">
        <Box className="signin-signup">
          <Outlet/>
        </Box>
      </Box>

      <Box className="panels-container">
        {/* LEFT PANEL */}
        <Box className="panel left-panel">
          <Box className="content">
            <Typography variant="h5">Nouveau ici ?</Typography>
            <Typography variant="body1" mb={2}>Créez un compte dès maintenant.</Typography>
            <Button id="sign-up-btn" variant="outlined">S'inscrire</Button>
          </Box>
        </Box>

        {/* RIGHT PANEL */}
        <Box className="panel right-panel">
          <Box className="content">
            <Typography variant="h5">Déjà inscrit ?</Typography>
            <Typography variant="body1" mb={2}>Connectez-vous pour continuer.</Typography>
            <Button id="sign-in-btn" variant="outlined">Se connecter</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
