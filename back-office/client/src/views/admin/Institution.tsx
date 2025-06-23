import { Paper, Typography, Divider, Box, TextField, Button, Grid } from "@mui/material";

export const Institution = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Informations sur l'institution
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nom de l'institution" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Type" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Adresse" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Téléphone" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth variant="outlined" />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Enregistrer
        </Button>
      </Paper>
    </Box>
  );
};