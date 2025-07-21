import { useState } from "react";
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
import CustomDialog from "../components/CustomDialog";
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { sendData} from "../services/officeService";
import CircularProgress from '@mui/material/CircularProgress';
import { OfficeDetailForm } from "../components/officeDetailForm";


const OfficeData = () => {

    // useNavigate hook to navigate to different pages
    let navigate = useNavigate()
    //opens a dialog when the user tries to navigate to the next tab without filling in the inputs
    const [dialogOpen, setDialogOpen] = useState(false)

    //handles open and close of pages for Collapse Component
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const [isSubmitting, setIsSubmitting] = useState(false);

        // inputs on building
    const [is_fibre_setup, setIsFibreSetup] = useState('');
    const [building_name, setBuildingName] = useState('');
    const [more_offices, setMoreOffices] = useState('');
    const [ease_of_access, setEaseOfAccess] = useState('');
    const [more_info_access, setMoreInfoAccess] = useState('');

    const [officeDetails, setOfficeDetails] = useState({
            office_name: '',
            office_floor: 0,
            number_staff: 0,
            number_of_offices: 0,
            industry: '',
        });

    // disables and enables the next tab based on whether the inputs are filled
    const [step1Complete, setStep1Complete] = useState(false)
    useEffect(() => {
        setStep1Complete(building_name && is_fibre_setup && more_offices && ease_of_access && more_info_access);

  }, [building_name, is_fibre_setup, more_offices, ease_of_access, more_info_access]);


    // handle navigation to next tab
    const handleNext = () => {
        if(building_name === '' || is_fibre_setup === '' || more_offices === '' || ease_of_access === '' || more_info_access === ''){
            setDialogOpen(true)
        } else {
           value === '1' ? setValue('2') : setValue('1');
        }

    }
    


    // handle Submit function
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!officeDetails.office_name || !officeDetails.industry || officeDetails.number_staff === 0 || officeDetails.number_of_offices === 0 || officeDetails.office_floor === 0){
            setDialogOpen(true)
        } else {
            
        const officeDict =  {
            "office_name": officeDetails.office_name,
            "office_floor": officeDetails.office_floor,
            "number_of_offices": officeDetails.number_of_offices,
            "number_staff": officeDetails.number_staff,
            "industry": officeDetails.industry,
            "is_fibre_setup": is_fibre_setup,
            "building_name": building_name,
            "more_offices": more_offices,
            "ease_of_access": ease_of_access,
            "more_info_access": more_info_access
        }
            try {
                console.log(officeDict);
                setIsSubmitting(true);
                const success = await sendData(officeDict);
                if (success) {
                    console.log("Data submitted successfully");

                // set fields to empty after submission
                setOfficeDetails({
                    office_name: '',
                    office_floor: 0,
                    number_staff: 0,
                    number_of_offices: 0,
                    industry: '',
                });
                setIsFibreSetup('');
                setBuildingName('');
                setMoreOffices('');
                setEaseOfAccess('');
                setMoreInfoAccess('');
                setValue('1'); 
                // navigate to the home page after successful submission
                navigate('/');
                } else {
                    console.error("Failed to submit data");
                    setDialogOpen(true); // Show dialog on failure
                }
            } catch (error) {
                console.error("Error submitting data:", error);
                setDialogOpen(true); // Show dialog on error
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    return (
        <>
        <CustomDialog
            open={dialogOpen}
            title='Error'
            content='There was an error in submitting the form. Check if fields were empty or try again later'
            onClose={() => setDialogOpen(false)}
            />
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
            <Tab value="1" label="Building Information" />
            <Tab value="2" label="Office Details" disabled={!step1Complete} />
            </Tabs>
           
            <Collapse in={value === '1'} timeout="auto" unmountOnExit>
             <Paper elevation={2} sx={{
                    mx: 2,
                    my: 2,
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
                name="building_name"
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
                    name="is_fibre_setup"
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
                name="more_offices"
                multiline
                rows={4}
                onChange={(e) => setMoreOffices(e.target.value)}
                variant="outlined"
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
                    name="ease_of_access"
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
                    name="more_info_access"
                    required
                    multiline
                    rows={4}
                    />
                </Stack>
                </Paper>
            </Collapse>
            
            <Collapse in={value === '2'} timeout="auto" unmountOnExit>
            <OfficeDetailForm
              officeDetails={officeDetails}
              setOfficeDetails={setOfficeDetails}
            />
            </Collapse>
              <Stack direction='row' spacing={2} sx={{ width: '100%', mt: 2 }}>
                <Button onClick={handleNext} color="primary" variant="contained" sx={{ 
                    width: '50%',
                    margin: '0 auto',
                    display: 'block',
                    mt: 2 }}>
                    Next
                </Button>
                <Button disabled={value === '1'} type="submit" color="primary" variant="contained" sx={{ 
                    width: '50%',
                    margin: '0 auto',
                    display: 'block',
                    mt: 2 }}
                    >
                        Submit
                        </Button>
                    <Backdrop
                        sx={{ color: 'grey.500', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isSubmitting}
                        onClick={() => setIsSubmitting(false)}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                
                </Stack>
        </Box>
        </>
    );
}

export default OfficeData;