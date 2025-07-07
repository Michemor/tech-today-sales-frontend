import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import CustomCard from '../components/CustomCard'
import CssBaseline from "@mui/material/CssBaseline";

export default function Home() {
  const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }

  return (
    <>
      <CssBaseline/>
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 2,
          width: '100%'
        }}>
        
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 25, md: 30 },
              color: 'primary.main',
              fontWeight: 'bold',
              marginBottom: 1
            }}>
            Welcome to Sales Department
          </Typography>
          <Typography sx={{
            fontSize: { xs: 12, sm: 15, md: 18 },
            color: 'text.secondary'
          }}>
            Click on the tiles below to access the actions
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '100%',
          maxWidth: 800
        }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            sx={{ 
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <CustomCard 
              title='Client Details List'
              message="View and manage client details."
              icon={<GroupRoundedIcon sx={{ color: 'primary.main' }} />} 
              onClick={() => handleClick('/clients')} 
            />
            <CustomCard 
              title='Sales Location List' 
              message="View and manage sales locations."
              icon={<PinDropRoundedIcon sx={{ color: 'primary.main' }} />} 
              onClick={() => handleClick('/locations')} 
            />
          </Stack>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            sx={{ 
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <CustomCard 
              title='Client Details Form'
              message="Fill out the form to add or edit client details."
              icon={<NotesRoundedIcon sx={{ color: 'primary.main' }} />} 
              onClick={() => handleClick('/clientform')} 
            />
            <CustomCard 
              title='Sales Location Form' 
              message="Fill out the form to add or edit sales location details."
              icon={<EditNoteRoundedIcon sx={{ color: 'primary.main' }} />} 
              onClick={() => handleClick('/locationform')} 
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
