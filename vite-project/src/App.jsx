import Home from "./pages/Home";
import OfficeData from "./pages/OfficeData";
import ClientData from "./pages/ClientData";
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CssBaseline from "@mui/material/CssBaseline";
import ClientList from "./pages/ClientList";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Locations from "./pages/BuildingsList";

export default function App() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

    return (
        <>
        <Box 
        sx={{ 
          display: 'flex',
          width: '100%' ,
          minWidth: '100vw',
          flexGrow: 1 }}
        >
      <AppBar 
      position="static"
      sx={{
        width: '100%',
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sales Department
          </Typography>
          <Button color="inherit" onClick={() => handleNavigation('/clientform')}> Client Details </Button>
          <Button color="inherit" onClick={() => handleNavigation('/locationform')}> Sales Locations </Button>
          <IconButton onClick={() => handleNavigation('/')}> 
            <HomeRoundedIcon sx={{  color: '#ffffff', ml: 2 }} /> 
            </IconButton>          
          <IconButton> <AccountCircleRoundedIcon sx={{  color: '#ffffff', ml: 2 }} /> </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    
    <CssBaseline />
        <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="/clientform" element={<ClientData />} />
            <Route path="/locationform" element={<OfficeData/>} />
            <Route path='/clients' element={<ClientList />} />
            <Route path='/locations' element={<Locations />} />
        </Routes>
        </>
    )
}
