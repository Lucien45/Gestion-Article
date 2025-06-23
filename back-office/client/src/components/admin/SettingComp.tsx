import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  Grid,
} from "@mui/material";

export const SettingsGeneral:React.FC = () => {
  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Paramètres généraux
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nom de l'organisation" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Langue par défaut" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Fuseau horaire" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Devise" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Adresse principale" fullWidth variant="outlined" />
        </Grid>
      </Grid>
      <Button variant="contained" sx={{ mt: 2 }}>
        Enregistrer
      </Button>
    </Paper>
  )
}

export const SettingsSite:React.FC = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
            Paramètres du site
        </Typography>
        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
            <Typography variant="h6" mb={2}>
                Général
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Nom du site" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Slogan" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Téléphone" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Email de contact" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Adresse" fullWidth variant="outlined" />
                </Grid>
            </Grid>
            <Button variant="contained" sx={{ mt: 2 }}>
                Enregistrer
            </Button>
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
            <Typography variant="h6" mb={2}>
                Réseaux sociaux
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField label="Facebook" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField label="Instagram" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField label="WhatsApp" fullWidth variant="outlined" />
                </Grid>
            </Grid>
            <Button variant="contained" sx={{ mt: 2 }}>
                Enregistrer
            </Button>
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
            <Typography variant="h6" mb={2}>
                Apparence
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    label="Couleur principale"
                    fullWidth
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField label="Favicon URL" fullWidth variant="outlined" />
                </Grid>
            </Grid>
            <Button variant="contained" sx={{ mt: 2 }}>
                Enregistrer
            </Button>
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
            <Typography variant="h6" mb={2}>
                Autres
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    label="Lien politique de confidentialité"
                    fullWidth
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField label="Lien CGU" fullWidth variant="outlined" />
                </Grid>
            </Grid>
            <Button variant="contained" sx={{ mt: 2 }}>
                Enregistrer
            </Button>
        </Paper>
    </Box>
  )
}

export const SettingsApp:React.FC = () => {
  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Paramètres de l'application
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Version de l'application" fullWidth variant="outlined" disabled value="1.0.0" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Mode (production/développement)" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Clé API externe"
            fullWidth
            variant="outlined"
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="URL de l'API"
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Button variant="contained" sx={{ mt: 2 }}>
        Enregistrer
      </Button>
    </Paper>
  )
}

