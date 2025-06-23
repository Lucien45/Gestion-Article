import { Box, Paper, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react";
import { SettingsApp, SettingsGeneral, SettingsSite } from "../../components/admin/SettingComp";

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const renderContent = () => {
    switch (selectedTab) {
      case 0: return <SettingsGeneral />;
      case 1: return <SettingsSite />;
      case 2: return <SettingsApp />;
      default: return <Typography variant="h6">Bienvenue sur la page settings</Typography>;
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
          <Tab label="Parametre General" />
          <Tab label="Parametre Site web" />
          <Tab label="Parametre Application web" />
        </Tabs>
      </Paper>
      <Box sx={{ width: "100%"}}>
        {renderContent()}
      </Box>
    </Box>
  )
}

export default Settings