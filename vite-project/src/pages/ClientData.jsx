import FormControl from "@mui/material/FormControl";
import InputBox from "../components/InputBox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const ClientData = () => {
    return (
        <div>
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
            }}> Client Details </Typography>
            <FormControl
            title="Client Details"
            sx={{
                m: 4,
            }}>
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
            id='m-date'
            label='Meeting Date'
            variant="outlined"
            required
            />
          </FormControl>
            </Box>
        </div>
    );
}

export default ClientData;