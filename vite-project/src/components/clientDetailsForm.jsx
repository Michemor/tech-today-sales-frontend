import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { memo, useCallback } from "react";
import Divider from "@mui/material/Divider";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export const ClientDetailsForm = memo(({ clientDetails, setClientDetails }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Memoized update functions to prevent unnecessary re-renders
    const updateField = useCallback((field) => (event) => {
        setClientDetails(prev => ({ ...prev, [field]: event.target.value }));
    }, [setClientDetails]);

    return (
        <>
         <Paper sx={{
          border: '1px solid',
          borderColor: 'divider',
          mx: { xs: 0, sm: 1, md: 2 },
          my: { xs: 1, sm: 2 },
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: 'background.paper',
          boxShadow: 3,
          borderRadius: { xs: 1, sm: 2 },
        }}>
          <Stack spacing={{ xs: 1.5, sm: 2, md: 2.5 }} direction='column' sx={{ width: '100%' }}>
          <Typography variant="h5" component="h1" gutterBottom
          sx={{
            textAlign: 'center',
            color: 'primary.main',
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
          }}> Client Details Section </Typography>
          <Divider/>
          <TextField
          name='client_name'
          value={clientDetails.client_name || ''}
          onChange={updateField('client_name')}
          label="Client Name"
          variant="outlined"
          fullWidth
          required
          size={isMobile ? 'small' : 'medium'}
          />
          <TextField
          name='client_email'
          value={clientDetails.client_email || ''}
          onChange={updateField('client_email')}
          fullWidth
          required
          label="Client Email"
          error={clientDetails.client_email && !clientDetails.client_email.includes('@')}
          helperText={clientDetails.client_email && !clientDetails.client_email.includes('@') ? "Please enter a valid email address" : ""}
          variant="outlined"
          size={isMobile ? 'small' : 'medium'}
          sx={{
            error: { color: 'error.main',},
          }}
          />
          <TextField
          name='contact'
          value={clientDetails.contact || ''}
          type='tel'
          onChange={updateField('contact')}
          label="Contact Number"
          required
          variant="outlined"
          size={isMobile ? 'small' : 'medium'}
          />
          <TextField
          name='job'
          value={clientDetails.job || ''}
          onChange={updateField('job')}
          label="Job Title"
          variant="outlined"
          fullWidth
          required
          size={isMobile ? 'small' : 'medium'}
          />
          <TextField
          name='deal_info'
          value={clientDetails.deal_info || ''}
          onChange={updateField('deal_info')}
          label="Deal Information"
          multiline
          rows={isMobile ? 3 : 4}
          variant="outlined"
          fullWidth
          required
          size={isMobile ? 'small' : 'medium'}
          />
          </Stack>
        </Paper>
        </>
    )});

