/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import BarChartIcon from "@mui/icons-material/BarChart";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../../context/AuthContext";
import { Utils } from "../../utils/Utils";

const drawerWidth = 240;

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [activeOption, setActiveOption] = useState("dashboard");
  const navigate = useNavigate();

  const handleOptionClick = (option: string, path: string) => {
    setActiveOption(option);
    navigate(path);
  };

  const handleLogout = () => {
    Utils.confirmMessage(
      "Êtes-vous sûr de vouloir déconnecter ?", 
      async () => {
        logout();
        navigate("/");
      },
      () => { 
        console.log("Déconnexion annulée par l'utilisateur.");
      }
    );
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      sx={{
        width: isOpen ? drawerWidth : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1E293B",
          color: "#FFF",
        },
      }}
    >

      <Divider />

      <List>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, path: "/admin", option: "dashboard" },
          { text: "Articles", icon: <ArticleIcon />, path: "/admin/article", option: "articles" },
          { text: "Report", icon: <BarChartIcon />, path: "/admin/report", option: "report" },
          { text: "Institution", icon: <BusinessIcon />, path: "/admin/institution", option: "institution" },
          { text: "Profile", icon: <AccountCircleIcon />, path: "/admin/profile", option: "profile" },
          { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings", option: "settings" },
        ].map(({ text, icon, path, option }) => (
          <ListItem key={option} disablePadding>
            <ListItemButton selected={activeOption === option} onClick={() => handleOptionClick(option, path)}>
              <ListItemIcon sx={{ color: "#FFF" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: "#FFF" }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
