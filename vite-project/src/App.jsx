import Home from "./pages/Home";
import OfficeData from "./pages/OfficeData";
import ClientData from "./pages/ClientData";
import { Routes, Route } from "react-router";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import CssBaseline from "@mui/material/CssBaseline";
import Locations from "./pages/LocationsList";
import ClientList from "./pages/ClientList";


export default function App() {
    return (
        <>
        <div>
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
          <Button color="inherit"> Client Details </Button>
          <Button color="inherit"> Sales Locations </Button>
          <LogoutIcon sx={{ ml: 2 }}></LogoutIcon>
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
        </div>
        </>
    )
}
