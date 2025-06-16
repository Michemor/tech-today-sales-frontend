import FormControl from "@mui/material/FormControl";
import InputBox from "../components/InputBox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Tab from "@mui/material/Tab";


const ClientData = () => {

    const [value, setValue] = useState('1');

   const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div>
            <TabContext value={value}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: '500vw',
            }}>
            <Typography sx={{
                textAlign: 'center',
                mt: 5,
                fontWeight: 'bold',
                fontSize: 20,
                color: '#03a9f4'
            }}> Sales Office </Typography>

            <TabList onChange={handleChange} aria-label="Client Details">
                <Tab label="Client Details" value="1" />
                <Tab label="Meeting Details" value="2" />
                <Tab label="Office Details" value="3" />
                <Tab label="Client Inquries " value="4" />

            </TabList>
            <Divider middle aria-hidden='true' sx={{
                mr: 5,
                ml: 5,
            }} />
           
         <FormControl
            title="Client Details"
            sx={{
                ml: 4,
                mr: 4,
            }}>
                <TabPanel value="1"> 
                    <Typography sx={{
                mt: 5,
                fontWeight: 'bold',
                fontSize: 20,
                color: '#03a9f4'
            }}> Client Details </Typography>
            <InputBox 
            id='f-name'
            label='First Name'
            variant="outlined"
            required
            />
            <InputBox 
            id='l-name'
            label='Last Name'
            variant="outlined"
            required
            />
            <InputBox 
            id='contact'
            label='Contact'
            variant="outlined"
            required
            />
            <InputBox 
            id='email'
            label='Email'
            variant="outlined"
            required
            />
            <InputBox 
            id='job-title'
            label='Job Title'
            variant="outlined"
            required
            />
             <Divider middle aria-hidden='true' sx={{
                mr: 5,
                ml: 5,
            }} />
           
            <InputBox 
            id='m-date'
            label='Meeting Date'
            variant="outlined"
            required
            />
                </TabPanel>
            
          </FormControl>
            </Box>
            </TabContext>
        </div>
    );
}

export default ClientData;