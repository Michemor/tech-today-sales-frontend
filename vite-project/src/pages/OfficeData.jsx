import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";


const OfficeData = () => {

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    
    // inputs on office
    const [office_name, setOfficeName] = useState('');
    const [office_floor, setOfficeFloor] = useState('');
    const [number_of_offices, setNumberOfOffices] = useState('');

    // handle navigation to next tab
    const handleNext = () => {
        if(!office_name || !office_floor || !number_of_offices){

            

        } else {

            value === '1' ? setValue('2') : setValue('1');
        }

    }


    // inputs on building
     const [is_fibre_setup, setIsFibreSetup] = useState('');
    const [building_name, setBuildingName] = useState('');
    const [more_offices, setMoreOffices] = useState('');
    const [ease_of_access, setEaseOfAccess] = useState('');
    const [more_info_access, setMoreInfoAccess] = useState('');

    // handle validaito
    

    // handle Submit function

    const handleSubmit = () => {

    }


    return (
        <>
          <Box component="form"
          onSubmit={handleSubmit}
          autoComplete="off">
        <Tabs 
        sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        value={value} onChange={handleChange} aria-label=" Sales Locations ">
            <Tab value="1" label="Office Details" />
            <Tab value="2" label="Building Information" />
            </Tabs>
           
            <Collapse in={value === '1'} timeout="auto" unmountOnExit>
                <Paper elevation={2} sx={{
                    m: 4,
                    p: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',

            }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}> Office Details </Typography>
                 <Stack sx={{width: '100%'}} spacing={2} direction="column">
                <TextField 
                label="Office Name"
                value={office_name}
                onChange={(e) => setOfficeName(e.target.value)}
                variant="outlined"
                required
                sx={{ width: '100%', mt: 2 }}>
                    Office Name
                </TextField>
                <TextField 
                type="number"
                label="Office Floor"
                value={office_floor}
                onChange={(e) => setOfficeFloor(e.target.value)}
                variant="outlined"
                required
                sx={{ width: '100%', mt: 2 }}>
                    Office Floor
                </TextField>
                <TextField 
                label="Number of offices"
                value={number_of_offices}
                onChange={(e) => setNumberOfOffices(e.target.value)}
                variant="outlined"
                type="number"
                required
                sx={{ width: '100%', mt: 2 }}>
                    Number of offices
                </TextField>
                </Stack>
                <Button onClick={handleNext} color="primary" variant="contained" sx={{ 
                    width: '50%',
                    margin: '0 auto',
                    display: 'block',
                    mt: 2 }}>
                    Next
                </Button>
            </Paper>
            </Collapse>
            
            <Collapse in={value === '2'} timeout="auto" unmountOnExit>
            <Paper elevation={2} sx={{
                    m: 4,
                    p: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
            }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}> Building Information </Typography>
                 <Stack sx={{width: '100%'}} spacing={2} direction="column">
                <TextField 
                label="Building Name"
                value={building_name}
                onChange={(e) => setBuildingName(e.target.value)}
                variant="outlined"
                required
                sx={{ width: '100%', mt: 2 }}>
                    Building Name
                </TextField>
                <Box sx={{
                    border: 1,
                    borderColor: 'divider',
                    p: 2,
                }}>
                <FormControl>
                    <FormLabel> Is Fibre Set Up? </FormLabel>
                    <RadioGroup 
                    column
                    value={is_fibre_setup}
                    onChange={(e) => setIsFibreSetup(e.target.value)}
                    sx={{ 
                        color: 'secondary.dark'
                    }}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Can connect to MyISP Base Station" control={<Radio />} label="Can Connect to MyISP Base Station" />
                    </RadioGroup>
                </FormControl>
                </Box>
                <TextField 
                label="More information on offices i.e floor and name "
                value={more_offices}
                multiline
                rows={4}
                onChange={(e) => setMoreOffices(e.target.value)}
                variant="outlined"_
                required
                sx={{ width: '100%', mt: 2 }}/>
                <Box sx={{
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'secondary.dark',
                    p: 2,
                    mt: 2
                }}>
                <FormControl>
                    <FormLabel> Ease of Access </FormLabel>
                    <RadioGroup
                    column
                    value={ease_of_access}
                    onChange={(e) => setEaseOfAccess(e.target.value)}
                    sx={{ 
                        color: 'secondary.dark'
                    }}
                    >
                        <Typography sx={{ m: 3 }}> Easy </Typography>
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <Typography sx={{ m: 3 }}> Difficult </Typography>

                    </RadioGroup>
                    </FormControl>
                    </Box>

                    <TextField
                    label="Additional Information regarding access to the building"
                    value={more_info_access}
                    onChange={(e) => setMoreInfoAccess(e.target.value)}
                    variant="outlined"
                    required
                    multiline
                    rows={4}
                    />
                </Stack>
                <Stack direction='row' spacing={2} sx={{ width: '100%', mt: 2 }}>
                <Button onClick={handleNext} color="primary" variant="contained" sx={{ 
                    width: '50%',
                    margin: '0 auto',
                    display: 'block',
                    mt: 2 }}>
                    Back
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained" sx={{ 
                    width: '50%',
                    margin: '0 auto',
                    display: 'block',
                    mt: 2 }}>
                    Submit
                </Button>
                </Stack>
                </Paper>
            </Collapse>
        </Box>
        </>
    );
}

export default OfficeData;