import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { memo, useCallback } from "react";
import Divider from "@mui/material/Divider";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { validateInput } from "../utils/validation"; // Adjust the import path as necessary
import { useState } from "react";


export const ClientDetailsForm = memo(({ clientDetails, setClientDetails }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [error, setError] = useState({});

    // Memoized update functions to prevent unnecessary re-renders
    const updateField = useCallback((field, type = null) => (event) => {
      const value = event.target.value;

       if (type === 'phone') {
            // Only allow numeric input
            const numericValue = value.replace(/\D/g, '');
            // Limit to 10 digits
            const limitedValue = numericValue.slice(0, 10);
            
            const errorMessage = validateInput(limitedValue, type);
            setError(prev => ({ ...prev, [field]: errorMessage }));
            setClientDetails(prev => ({ ...prev, [field]: limitedValue }));
            return;
        } else if (type === 'email') {
            const errorMessage = validateInput(value, type);
            setError(prev => ({ ...prev, [field]: errorMessage }));
            
            // If email format is invalid and user tries to input numbers, clear the field
            if (errorMessage && /\d/.test(value)) {
                setClientDetails(prev => ({ ...prev, [field]: '' }));
                return;
            }
            setClientDetails(prev => ({ ...prev, [field]: value }));
        } else {
            setError(prev => ({ ...prev, [field]: '' }));
            setClientDetails(prev => ({ ...prev, [field]: value }));
        }
    }, [setClientDetails]);

    const handleBlur = useCallback((field, type) => (event) => {
        const errorMessage = validateInput(event.target.value, type);
        setError(prev => ({ ...prev, [field]: errorMessage }));
    }, []);

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
          onChange={updateField('client_email', 'email')}
          onBlur={handleBlur('client_email', 'email')}
          fullWidth
          required
          label="Client Email"
          error={!!error.client_email}
          helperText={error.client_email}
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
          onChange={updateField('contact', 'phone')}
          onBlur={handleBlur('contact', 'phone')}
          error={!!error.contact}
          helperText={error.contact}
          label="Contact Number"
          slotProps={{
            input: {
              maxLength: 10,
              pattern: '[0-9]*',}
          }}
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

