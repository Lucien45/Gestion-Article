import { useState } from 'react'
import { AddUser, UserAccount, UserList } from '../../components/admin/ProfileComp';
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  const renderContent = () => {
    switch (selectedTab) {
      case 0: return <UserAccount />;
      case 1: return <UserList />;
      case 2: return <AddUser />;
      default: return <Typography variant="h6">Bienvenue sur la gestion d'article</Typography>;
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "1500px",
        }}
      >
        <Tabs 
          value={selectedTab} 
          onChange={(_, newValue) => setSelectedTab(newValue)} 
          variant="fullWidth"
        >
          <Tab label="Mon Compte" />
          <Tab label="Liste Utilisateurs" />
          <Tab label="Créer un utilisateur" />
        </Tabs>
      </Paper>
      <Box sx={{ width: "100%"}}>{renderContent()}</Box>
    </Box>
  )
}

export default Profile