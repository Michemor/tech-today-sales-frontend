import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';


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
      color: '#039be5',
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
            alignItems: 'center',
            minHeight: '100vh',
            
            }}>
                
        <Grid container spacing={3} sx={{
            maxWidth: '800px',
            m: 1,
        }}>
            <Grid item xs={12} sm={6} md={3}> 
                <Paper elevation={3} 
                onClick={() => handleClick('/clients')}
                sx={{ 
                p: 3,
                height: '200px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}> Client Details List </Paper>
            </Grid> 
            <Grid item xs={12} sm={6} md={3}> 
                <Paper elevation={3} 
                onClick={() => handleClick('/locations')}
                sx={{ 
                        p: 3,
                        height: '200px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}> Sales Location List </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}> 
                <Paper elevation={3}
                onClick= {() => handleClick('/clientform')}
                sx={{ 
                        p: 3,
                        height: '200px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}> Client Details Form </Paper>
            </Grid>
            <Grid item xs={2} sm={4} md={3}> 
                <Paper elevation={3} 
                  onClick= {() => handleClick('/locationform')}
                sx={{ 
                        p: 3,
                        height: '200px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}> Sales Location Form </Paper>
            </Grid>
        </Grid>
        </Box>
        </>
    )
}

export default Home