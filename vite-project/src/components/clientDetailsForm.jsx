import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { memo } from "react";
import Divider from "@mui/material/Divider";


export const ClientDetailsForm = memo(({ clientDetails, setClientDetails }) => {

    return (
        <>
         <Paper sx={{
          border: '1px solid',
          borderColor: 'divider',
          p: 3,
          backgroundColor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Stack spacing={2} direction='column' sx={{ width: '100%' }}>
          <Typography variant="h5" component="h1" gutterBottom
          sx={{
            textAlign: 'center',
            color: 'primary.main',
          }}> Client Details Section </Typography>
          <Divider/>
          <TextField
          name='client_name'
          value={clientDetails.client_name}
          onChange={(e) => setClientDetails({ ...clientDetails, client_name: e.target.value })}
          label="Client Name"
          variant="outlined"
          fullWidth
          required
          />
          <TextField
          name='client_email'
          value={clientDetails.client_email}
          onChange={(e) => setClientDetails({ ...clientDetails, client_email: e.target.value })}
          fullWidth
          required
          label="Client Email"
          error = {clientDetails.client_email.includes('@')}
          helperText={!clientDetails.client_email.includes('@') ? "Please enter a valid email address" : ""}
          variant="outlined"
          sx={{
            error: { color: 'error.main',},
          }}
          />
          <TextField
          name='contact'
          value={clientDetails.contact}
          type='tel'
          onChange={(e) => setClientDetails({ ...clientDetails, contact: e.target.value })}
          label="Contact Number"
          required
          variant="outlined"
          />
          <TextField
          name='job'
          value={clientDetails.job}
          onChange={(e) => setClientDetails({ ...clientDetails, job: e.target.value })}
          label="Job Title"
          variant="outlined"
          fullWidth
          required  
          />
          <TextField
          name='deal_info'
          value={clientDetails.deal_info}
          onChange={(e) => setClientDetails({ ...clientDetails, deal_info: e.target.value })}
          label="Deal Information"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          required  
          />
          </Stack>
        </Paper>
        </>
    )});

