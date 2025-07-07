import OfficeData from "./pages/OfficeData";
import ClientData from "../src/pages/ClientData";
import { Routes, Route } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
<<<<<<< HEAD
=======
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from "@mui/material/CssBaseline";
>>>>>>> fdc61cd53e6e976622b9c2123cb832c54c77bc11
import ClientList from "./pages/ClientList";
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Home from "./pages/Home";
import { ViewSales } from "./pages/ViewSales";
import Locations from '../src/pages/BuildingsList'
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
<<<<<<< HEAD
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleIcon from '@mui/icons-material/People';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginRight: theme.spacing(2),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: `${drawerWidth}px`,
          marginRight: theme.spacing(2),
        },
      },
    ],
  }),
);

const TopAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function App() {
    const navigate = useNavigate()
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }
=======
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
>>>>>>> fdc61cd53e6e976622b9c2123cb832c54c77bc11

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };
<<<<<<< HEAD
    return (
        <>
        <TopAppBar position="fixed" open={open} sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {me: 2},
            open && { display: 'none'}
          ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Sales Department
          </Typography>
          <IconButton onClick={() => handleNavigation('/')}> 
            <HomeRoundedIcon sx={{  color: '#ffffff', ml: 2 }} /> 
            </IconButton>          
          <IconButton> 
            <AccountCircleRoundedIcon sx={{  color: '#ffffff', ml: 2 }} /> </IconButton>
        </Toolbar>
      </TopAppBar>
      <Drawer
      sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor='left'
        open={open}
        >
          <DrawerHeader sx={{
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            height: '64px',
            backgroundColor: 'primary.main',
          }}>
            <Typography noWrap component="div" sx={{ 
              flexGrow: 1, 
              fontSize: '20px',
              color: '#fff',
            }}>
              Tech Today
            </Typography>
            <IconButton onClick={handleDrawerClose} sx={{ color: '#fff' }}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/')} sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}>
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  <HomeRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                  </ListItemButton>
                  </ListItem>
            {['Client Form', 'Location Form', 'Clients', 'Locations', 'Sales'].map((text, index) => (
              <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => handleNavigation(`/${text.toLowerCase().replace(' ', '')}`)}>
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {index === 0 ? <ModeEditIcon /> : 
                     index === 1 ? <EditLocationAltIcon /> : 
                     index === 2 ? <PeopleIcon /> : 
                     index === 3 ?  <LocationOnIcon /> : 
                     index === 4 ? <Inventory2Icon /> : 
                     <AccountCircleRoundedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                      </ListItemButton>
              </ListItem>
            ))}
          </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientform" element={<ClientData />} />
            <Route path="/locationform" element={<OfficeData />} />
            <Route path='/clients' element={<ClientList />} />
            <Route path='/locations' element={<Locations />} />
            <Route path="/sales" element={<ViewSales />}/>
        </Routes>
      </Main>

        </>
    )
=======

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
>>>>>>> fdc61cd53e6e976622b9c2123cb832c54c77bc11
}
