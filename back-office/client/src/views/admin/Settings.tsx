import { Box, Paper, Tab, Tabs } from "@mui/material"
import { useState } from "react";

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState(0);
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
        <Tabs>
          <Tabs 
            value={selectedTab} 
            onChange={(_, newValue) => setSelectedTab(newValue)} 
            variant="fullWidth"
          >
            <Tab label="Parametre General" />
          </Tabs>
        </Tabs>
      </Paper>
      <Box sx={{ width: "100%"}}>
        <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
          settings content
        </Paper>
      </Box>
    </Box>
  )
}

export default Settings