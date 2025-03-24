import { useState } from "react";
import { AddEditArticle, ListArticle } from "../../components/admin/ArticleComp";
import { AddEditCategorie, ListCategorie } from "../../components/admin/CategorieComp";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";

const Articles = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderContent = () => {
    switch (selectedTab) {
      case 0: return <ListArticle />;
      case 1: return <AddEditArticle />;
      case 2: return <ListCategorie />;
      case 3: return <AddEditCategorie />;
      default: return <Typography variant="h6">Bienvenue sur la gestion du club</Typography>;
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
          <Tab label="Gérer les Articles" />
          <Tab label="Ajouter un Article" />
          <Tab label="Gérer les Catégories" />
          <Tab label="Ajouter une Catégorie" />
        </Tabs>
      </Paper>
      <Box sx={{ width: "100%"}}>{renderContent()}</Box>
    </Box>
  );
};

export default Articles;