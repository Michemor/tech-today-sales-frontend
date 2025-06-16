import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Grid';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import CustomCard from '../components/CustomCard';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

const Home = () => {

    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path);
    }

    return (
        <>
        <Typography
    sx={{
      mt: 2,
      textAlign: 'center',
      fontSize: 25,
      color: 'primary.main',
      fontWeight: 'bold',
    }}>
      Welcome to Sales Department
    </Typography>
    <Typography sx={{
      mt: 2,
      textAlign: 'center',
      fontSize: 15,
    }}>
      Click on the tiles below to access the actions
    </Typography>
        <Box sx={{ 
            flexGrow: 1, p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Stack direction="column" spacing={2} sx={{}}>
        <Stack  direction="row" spacing={2} sx={{ ml: 5,}}>
               <Item> 
                <CustomCard 
                title={<Typography variant="h6">Client Details List</Typography>} 
                message={"View and manage client details."}
                icon={<GroupRoundedIcon sx={{ color: 'primary.main' }} />} 
                onClick={() => handleClick('/clients')} />
                
                </Item>
            <Item> 
                <CustomCard 
                title={<Typography variant="h6">Sales Location List</Typography>} 
                message={"View and manage sales locations."}
                icon={<PinDropRoundedIcon sx={{ color: 'primary.main' }} />} 
                onClick={() => handleClick('/locations')} />
                </Item>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2, ml: 5,}}>
           <Item> 

            <CustomCard 
            title={<Typography variant="h6">Client Details Form</Typography>} 
            message={"Fill out the form to add or edit client details."}
            icon={<NotesRoundedIcon sx={{ color: 'primary.main' }} />} 
            onClick={() => handleClick('/clientform')} />
            </Item>
            <Item>
                <CustomCard 
                title={<Typography variant="h6">Sales Location Form</Typography>} 
                message={"Fill out the form to add or edit sales location details."}
                icon={<EditNoteRoundedIcon sx={{ color: 'primary.main' }} />} 
                onClick={() => handleClick('/locationform')} />
            </Item>
        </Stack>
        </Stack>
        </Box>
        </>
    )
}

export default Home