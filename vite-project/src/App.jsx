import OfficeData from "../src/pages/BuildingOfficeList";
import ClientData from "../src/pages/ClientData";
import { Routes, Route } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
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
import CompleteData from "./components/CompleteData";

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

  const handleNavigation = (path) => {
    navigate(path);
  };
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
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Toolbar />
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
            <Route path="/client/:id" element={<CompleteData />} />
        </Routes>
      </Main>

        </>
    )
}
