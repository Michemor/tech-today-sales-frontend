import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from '@mui/material/Tabs';
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import { Form } from "react-router";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";

const ClientData = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


    // State to hold client details
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact_number, setContactNumber] = useState("");
    const [job_title, setJobTitle] = useState("");

    // State to hold meeting details
    const getDateToday = () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); 
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;

    }

    const [meeting_date, setMeetingDate] = useState(getDateToday());
    const [meeting_location, setMeetingLocation] = useState("");
    const [meeting_remarks, setMeetingRemarks] = useState("");
    const [meeting_status, setMeetingStatus] = useState("");

    // set office details
    const [office_name, setOfficeName] = useState("");
    const [number_staff, setNumberStaff] = useState("");
    const [industry_category, setIndustryCategory] = useState("");

    // set internet status information
    const [internet_connected, setInternetConnected] = useState("No");
    const [provider, setProvider] = useState("");
    const [internet_price, setInternetPrice] = useState("");
    const [type_of_connection, setTypeOfConnection] = useState(""); 
    const [extra_net_info, setExtraNetInfo] = useState("");

    const [product, setProduct] = useState("");
    const [deal_status, setDealStatus] = useState("");

    // Function to handle next button click
    const handleNext = () => {
        if (value === "1") { 
            setValue("2");
        }
        else if (value === "2") {
            setValue("3");
        } else if (value === "3") {
            setValue("4");
        }
    };

    
// validate input fields
  const validateInput = (input) => {
        if (!input || input.trim() === "") {
            <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Alert  severity="error" sx={{ mb: 2 }}>
                Please fill out all required fields.
            </Alert>
            </Backdrop>
        }
        return true; // Valid input
    };

    const isConnected = internet_connected === "Yes";

    const handleProviderChange = (event) => {
        const value = event.target.value;
        setInternetConnected(isConnected ? "Yes" : "No");
        if (value === "No") {
            setProvider("");
            setInternetPrice("");
            setTypeOfConnection("");
            setExtraNetInfo("");
            setProduct("");
            setDealStatus("");
        }
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle the form submission, e.g., send data to an API
        console.log({
            first_name,
            last_name,
            email,
            contact_number,
            job_title,
            meeting_date,
            meeting_location,
            meeting_remarks,
            meeting_status,
            office_name,
            number_staff,
            industry_category,
            internet_connected,
            provider,
            internet_price,
            type_of_connection,
            extra_net_info,
            product,
            deal_status
        });
    };

    
    return (
        <>
        <Box>
            <Tabs value={value} onChange={handleChange} aria-label=" Client Data Tab"
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-evenly',
                marginTop: 2,
            }}>
                <Tab label="Client Details" value="1" />
                <Tab label="Meeting Details" value="2" />
                <Tab label="Office Details" value="3" />
                <Tab label="Internet Information" value="4" />
            </Tabs>
            <Collapse in={value === "1"}>
            <Paper sx={{ 
                m: 4, 
                p: 2,
                display: 'flex',
               flexDirection: 'column',
               color: 'primary.main',
               
            }}>
            
            <Typography variant="h6" >Client Details Section</Typography>
            <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
            <TextField
                label="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                variant="outlined"
                validateInput={validateInput(first_name)}
                fullWidth
                sx={{ mt: 2 }}/>
            <TextField
                label="Last Name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                validateInput={validateInput(last_name)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}/>
                </Stack>
            <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                validateInput={validateInput(email)}
                helperText="Please enter a valid email address"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}/>
            <TextField
                label="Contact Number"
                type="tel"
                value={contact_number}
                onChange={(e) => setContactNumber(e.target.value)}
                validateInput={validateInput(contact_number)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}/>
            <TextField
                label="Job Title"
                value={job_title}
                validateInput={validateInput(job_title)}
                onChange={(e) => setJobTitle(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}/>
            </Paper>
            <Button sx={{ 
                width: '30%',
                margin: '0 auto',
                display: 'block',
                }}
                variant="contained" color="primary" onClick={handleNext} > Next </Button>
            </Collapse>
             <Collapse in={value === "2"}>
            <Paper sx={{ 
                m: 4, 
                p: 2,
                display: 'flex',
               flexDirection: 'column',
               color: 'primary.main',
            }}>
            <Typography variant="h6" > Meeting Details </Typography>
            <TextField
                required
                type="date"
                value={meeting_date}
                validateInput={validateInput(meeting_date)}
                onChange={(e) => setMeetingDate(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}/>
            <TextField
                label="Meeting Location"
                value={meeting_location}
                validateInput={validateInput(meeting_location)}
                onChange={(e) => setMeetingLocation(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}/>
            <TextField
                type="meeting_remarks"
                label="Meeting Remarks"
                value={meeting_remarks}
                validateInput={validateInput(meeting_remarks)}
                onChange={(e) => setMeetingRemarks(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}/>
           <Autocomplete
                options={['Scheduled', 'Completed', 'Cancelled']}
                value={meeting_status}
                onChange={(event, newValue) => setMeetingStatus(newValue)}
                validateInput={validateInput(meeting_status)}
                renderInput={(params) => <TextField {...params} label="Meeting Status" />}
                fullWidth
                sx={{ mt: 2 }}/>
            </Paper>
            <Button sx={{ 
                width: '30%',
                margin: '0 auto',
                display: 'block',
                }}
                variant="contained" color="primary" onClick={handleNext} > Next </Button>
            </Collapse>
            <Collapse in={value === "3"}>
            <Paper sx={{ 
                m: 4, 
                p: 2,
                display: 'flex',
               flexDirection: 'column',
               color: 'primary.main',
            }}>
            <Typography variant="h6" > Office Details Section</Typography>
            <TextField
                label="Office Name"
                value={office_name}
                onChange={(e) => setOfficeName(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}/>
                <TextField
                label="Number of Staff"
                type="number"
                value={number_staff}
                onChange={(e) => setNumberStaff(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}/>
                <Box sx={{ 
                   border: 1,
                   borderRadius: 1,
                     p: 2,
                    borderColor: 'divider', mt: 2 }}>
                <FormControl>
                    <FormLabel id ="Industry Category" sx={{ mt: 2 }}> Industry Category </FormLabel>
                   <RadioGroup
                       column
                       value={industry_category}
                       onChange={(e) => setIndustryCategory(e.target.value)}
                       sx={{ 
                        color: 'secondary.dark',
                        mt: 2 }}>
                           <FormControlLabel value="NGO" control={<Radio />} label="NGO" />
                           <FormControlLabel value="Manufacturing Industries" control={<Radio />} label="Manufacturing Industries" />
                           <FormControlLabel value="Bank" control={<Radio />} label="Bank" />
                           <FormControlLabel value="Hospitals" control={<Radio />} label="Hospitals" />
                           <FormControlLabel  sx={{ color: 'secondary.light' }} value="Other" control={<Radio />} label="Other" />
                       </RadioGroup>
                </FormControl>
                </Box>
            </Paper>
            <Button sx={{ 
                width: '30%',
                margin: '0 auto',
                display: 'block',
                }}
                variant="contained" color="primary" onClick={handleNext} > Next </Button>
            </Collapse >

            <Collapse in={value === "4"}>
            <Paper sx={{
                m: 4, 
                p: 2,
                display: 'flex',
               flexDirection: 'column',
               color: 'primary.main',
            }}>
             <Typography variant="h6" > Internet Information Section</Typography>   
                <Stack spacing={2} direction="column" sx={{ mb: 2 }}>
                <FormControl sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: 'secondary.dark',
                        p: 2,
                        mt: 2 }}> 
                        <FormLabel id="internet-connected"> Does the client have an existing internet connection?  </FormLabel>
                        <RadioGroup
                        value={internet_connected}
                        validateInput={validateInput(internet_connected)}
                        onChange={handleProviderChange}
                        sx={{
                            color: 'secondary.dark',
                            mt: 2
                        }}>
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    <Paper id ="net-section-two" sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: 'secondary.main',
                        p: 2,
                    }}>
                        <Stack spacing={2} direction="column" sx={{ 
                            mb: 2 }}>

                <FormControl sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: 'secondary.dark',
                        p: 2,
                        mt: 2 }}>
                    <FormLabel id="provider-label"> Internet Service Provider </FormLabel>
                        <RadioGroup
                        value={provider}
                        disabled={!isConnected}
                        onChange={(e) => setProvider(e.target.value)}
                        sx={{
                            color: 'secondary.dark',
                            mt: 2
                        }}>
                            <FormControlLabel value="Liquid" control={<Radio />} label="Liquid" />
                            <FormControlLabel value="Safaricom Fibre " control={<Radio />} label="Safaricom Fibre" />
                            <FormControlLabel value="Zuku" control={<Radio />} label="Zuku" />
                            <FormControlLabel value="NTT/IS (Internet Solutions)" control={<Radio />} label="NTT/IS (Internet Solutions)" />
                            <FormControlLabel value="Telkom" control={<Radio />} label="Telkom" />
                            <FormControlLabel value="Faiba" control={<Radio />} label="Faiba" />
                            <FormControlLabel  sx={{ color: 'secondary.light' }} value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>

                        <TextField 
                        label="Other Provider"
                        sx={{ 
                            width: '50%',
                            mt: 2 }}
                            value={ provider === "Other" ? provider : ""}
                            onChange={(e) => setProvider(e.target.value)}
                        />
                </FormControl>
           <FormControl sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: 'secondary.dark',
                        p: 2,
                        mt: 2 }}>
                    <FormLabel id="internet-price"> Price/Rate per Month </FormLabel>
                        <RadioGroup
                        value={internet_price}
                        onChange={(e) => setInternetPrice(e.target.value)}
                        sx={{
                            color: 'secondary.dark',
                            mt: 2
                        }}>
                            <FormControlLabel value="Below 5000" control={<Radio />} label="Below 5000" />
                            <FormControlLabel value="5000-10000" control={<Radio />} label="5000-10000" />
                            <FormControlLabel value="10000-15000" control={<Radio />} label="10000-15000" />
                            <FormControlLabel sx={{ color:'secondary.light'}}value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                         <TextField 
                        label="Other Price"
                        sx={{ 
                            width: '50%',
                            mt: 2 }}
                            value={ internet_price === "Other" ? internet_price : ""}
                            onChange={(e) => setInternetPrice(e.target.value)}
                        />
                </FormControl>
                <FormControl sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: 'secondary.dark',
                        p: 2,
                        mt: 2 }}>
                    <FormLabel id="type-of-connection"> Type of Connection </FormLabel>
                        <RadioGroup
                        value={type_of_connection}
                        onChange={(e) => setTypeOfConnection(e.target.value)}
                        sx={{
                            color: 'secondary.dark',
                            mt: 2
                        }}>
                            <FormControlLabel value="Dedicated" control={<Radio />} label="Dedicated" />
                            <FormControlLabel value="Shared" control={<Radio />} label="Shared" />
                        </RadioGroup>
                </FormControl>

                <FormControl sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: 'secondary.dark',
                        p: 2,
                        mt: 2 }}>
                    <FormLabel id="product"> Product / Service </FormLabel>
                    <RadioGroup
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        sx={{
                            color: 'secondary.dark',
                            mt: 2
                        }}>
                            <FormControlLabel value="Internet" control={<Radio />} label="Internet" />
                            <FormControlLabel value="Domain & Hosting" control={<Radio />} label="Domain & Hosting" />
                            <FormControlLabel value="PBX/Telephony" control={<Radio />} label="PBX/Telephony" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        <TextField
                        label="Other Product"
                        sx={{ 
                            width: '50%',
                            mt: 2 }}
                            value={ product === "Other" ? product : ""}
                            onChange={(e) => setProduct(e.target.value)}
                        />
                       </FormControl>

                       <TextField
                       label="Extra Net Information"
                          value={extra_net_info}
                            onChange={(e) => setExtraNetInfo(e.target.value)}
                          variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ mt: 2 }}/>  
                            <FormControl sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: 'secondary.dark',
                        p: 2,
                        mt: 2 }}>
                            <FormLabel id="deal-status"> Deal Status </FormLabel>
                        <RadioGroup
                        value={deal_status}
                        onChange={(e) => setDealStatus(e.target.value)}
                        sx={{
                            color: 'secondary.dark',
                            mt: 2
                        }}>
                            <FormControlLabel value="Closed" control={<Radio />} label="Closed" />
                            <FormControlLabel value="Follow Up" control={<Radio />} label="Follow Up" />
                            <FormControlLabel value="Negotiating" control={<Radio />} label="Negotiating" />
                            <FormControlLabel value="Complete" control={<Radio />} label="Complete" />
                            <FormControlLabel value="Dropped" control={<Radio />} label="Dropped" />
                            <FormControlLabel  sx={{ color: 'secondary.light' }}value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        <TextField
                        label="Other Deal Status"
                        sx={{ 
                            width: '50%',
                            mt: 2 }}
                            value={ deal_status === "Other" ? deal_status : ""}
                            onChange={(e) => setDealStatus(e.target.value)}
                        />
                    </FormControl>
                    </Stack>
                    </Paper>
             </Stack>
            </Paper>
             <Button sx={{ 
                width: '30%',
                margin: '0 auto',
                display: 'block',
                }}
                variant="contained" color="primary" onClick = {
                    
                    handleSubmit
                    } > Submit </Button>
            </Collapse>
        </Box>
        </>
    )}

export default ClientData;
