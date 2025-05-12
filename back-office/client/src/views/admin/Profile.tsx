import { useState } from 'react'
import { AddUser, UserAccount, UserList } from '../../components/admin/ProfileComp';
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import { Token } from '../../utils/Token';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const userProfile = JSON.parse(Token.GetToken("user") as string) || {};
  
  const getTabs = () => {
    const tabs = [{ label: "Mon Compte", component: <UserAccount /> }];

    if (userProfile?.role === 'admin') {
      tabs.push(
        { label: "Liste Utilisateurs", component: <UserList /> },
        { label: "Créer un utilisateur", component: <AddUser /> },
        { label: "Logs", component: <Typography variant="h6">En cours...</Typography> }
      );
    }

    return tabs;
  };

  const tabs = getTabs();

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
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Paper>
      <Box sx={{ width: "100%"}}>
        {tabs[selectedTab]?.component || <Typography variant="h6">Bienvenue sur la gestion d'article</Typography>}
      </Box>
    </Box>
  )
}

export default Profile