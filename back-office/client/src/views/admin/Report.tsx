import { Paper, Typography, Divider, Box, Grid, Button } from "@mui/material";

const Report = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Rapports & Statistiques
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" color="primary">Articles publiés</Typography>
              <Typography variant="h4" fontWeight="bold">128</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" color="primary">Utilisateurs actifs</Typography>
              <Typography variant="h4" fontWeight="bold">34</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" color="primary">Commentaires</Typography>
              <Typography variant="h4" fontWeight="bold">210</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Exporter les rapports :
          </Typography>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Exporter en PDF
          </Button>
          <Button variant="outlined" color="primary">
            Exporter en CSV
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Report;