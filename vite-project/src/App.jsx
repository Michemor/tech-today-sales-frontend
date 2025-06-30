import Home from "./pages/Home";
import OfficeData from "./pages/OfficeData";
import ClientData from "./pages/ClientData";
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from "@mui/material/CssBaseline";
import ClientList from "./pages/ClientList";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MenuIcon from '@mui/icons-material/Menu';
import Locations from "./pages/BuildingsList";
import ViewSales from "./pages/ViewSales";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 280;

export default function App() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDesktopSidebar = () => {
    setDesktopSidebarOpen(!desktopSidebarOpen);
  };

  const menuItems = [
    { label: 'Home', path: '/', icon: <HomeRoundedIcon /> },
    { label: 'Client Details', path: '/clientform', icon: <PersonAddIcon /> },
    { label: 'Sales Locations', path: '/locationform', icon: <LocationOnIcon /> },
    { label: 'Clients', path: '/clients', icon: <PeopleIcon /> },
    { label: 'Locations', path: '/locations', icon: <BusinessIcon /> },
    { label: 'View Sales', path: '/sales', icon: <AnalyticsIcon /> },
  ];

  const SidebarContent = ({ onClose = null }) => (
    <Box sx={{ width: drawerWidth, height: '100%' }}>
      {/* Sidebar Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: theme.spacing(2),
          minHeight: '64px',
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        }}
      >
        <Typography variant="h6" noWrap>
          Sales Menu
        </Typography>
        {onClose && (
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      
      <Divider />
      
      {/* Navigation Menu */}
      <List sx={{ paddingTop: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton 
              onClick={() => handleNavigation(item.path)}
              sx={{
                margin: '4px 8px',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: theme.palette.primary.light + '20',
                },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* Top AppBar */}
        <AppBar 
          position="fixed" 
          sx={{ 
            width: { 
              xs: '100%', 
              md: desktopSidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%' 
            },
            ml: { 
              xs: 0, 
              md: desktopSidebarOpen ? `${drawerWidth}px` : 0 
            },
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={isMobile ? toggleMobileMenu : toggleDesktopSidebar}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              Sales Department
            </Typography>
            
            <IconButton color="inherit">
              <AccountCircleRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Desktop Sidebar */}
        {!isMobile && (
          <Drawer
            variant="persistent"
            anchor="left"
            open={desktopSidebarOpen}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <SidebarContent />
          </Drawer>
        )}

        {/* Mobile Sidebar */}
        {isMobile && (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <SidebarContent onClose={() => setMobileMenuOpen(false)} />
          </Drawer>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            width: { 
              xs: '100%', 
              md: desktopSidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%' 
            },
            ml: { 
              xs: 0, 
              md: desktopSidebarOpen ? `${drawerWidth}px` : 0 
            },
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Toolbar /> {/* This creates space for the fixed AppBar */}
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientform" element={<ClientData />} />
            <Route path="/locationform" element={<OfficeData />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/sales" element={<ViewSales />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
