import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  InputBase,
  Divider,
  Badge,
} from "@mui/material";
import { FaCaretDown } from "react-icons/fa";
import { Search, Menu as MenuIcon, Mail } from "@mui/icons-material";
import { Token } from "../../utils/Token";
import { apiUrl } from "../../services/api";
import { styled } from '@mui/material/styles';
import { UserService } from "../../services/user.service";
import { useNavigate } from "react-router";
import { Utils } from "../../utils/Utils";
import { logout } from "../../context/AuthContext";
import { LogService } from "../../services/log.service";

interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface User {
  id: number;
  email: string;
  username: string;
  profile?: string;
  role: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SearchBar = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  borderRadius: "20px",
  padding: "5px 10px",
  width: "250px",
});

const drawerWidth = 240;

const Navbar = ({ toggleSidebar, isOpen }: NavbarProps) => {
  const [dataUser, setDataUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userProfile = JSON.parse(Token.GetToken("user") as string);
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile) {
      UserService.getUserById(userProfile.id)
      .then((res) => {
        setDataUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function submitLogout() {
    setAnchorEl(null);
    Utils.confirmMessage(
        'Êtes-vous sûr de vouloir vous déconnecter ?',
        async () => {
          logout();
          const Log = {
            action: 'déconnexion',
            user: Number(userProfile?.id),
          };
          LogService.createLog(Log);
          navigate("/");
        },
        () => { 
          console.log("Déconnexion annulée par l'utilisateur.");
        }
    );
  }

  const handleOptionClick = (path: string) => {
    setAnchorEl(null);
    navigate(path);
  };
  
  return (
    
    <AppBar position="fixed" 
      sx={{ 
        backgroundColor: "#fff", 
        width: `calc(100% - ${isOpen ? drawerWidth : 0}px)`, 
        ml: isOpen ? `${drawerWidth}px` : 0,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingX: 2 }}>

        {/* SECTION GAUCHE : LOGO & MENU */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
            <MenuIcon sx={{ color: "#333" }} />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2F8D46", marginLeft: 1 }}>
            APP ADMIN
          </Typography>
        </Box>

        {/* SECTION CENTRALE : SEARCH BAR */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <SearchBar>
            <Search sx={{ color: "#999", marginRight: "5px" }} />
            <InputBase placeholder="Rechercher..." sx={{ flex: 1 }} />
          </SearchBar>
        </Box>

        {/* SECTION DROITE : PROFIL & MESSAGES */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <Mail sx={{ color: "#333" }} />
          </IconButton>

          {/* USER PROFILE */}
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleMenuOpen}>
            <Typography variant="body1" sx={{ fontWeight: "500", color: "#333", marginRight: 1 }}>
              {dataUser?.username || "Utilisateur"}
            </Typography>

            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar
                src={dataUser?.profile ? `${apiUrl}/${dataUser.profile}` : dataUser?.username}
                alt={dataUser?.username || "profileDefault"}
                sx={{ width: 40, height: 40, border: "2px solid #ddd" }}
              />
            </StyledBadge>
            <FaCaretDown style={{ marginLeft: "5px", color: "#333" }} />
          </Box>

          {/* MENU DÉROULANT */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{ style: { width: 200 } }} 
          >
            <MenuItem >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {dataUser?.username || "Utilisateur"} 👋
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {dataUser?.email || "email inconnu"}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>
                  {dataUser?.role || "Rôle non défini"}
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleOptionClick('/admin/profile')}>Profil</MenuItem>
            <MenuItem onClick={() => handleOptionClick('/admin/settings')}>Paramètres</MenuItem>
            <MenuItem onClick={() => submitLogout()}>Déconnexion</MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
