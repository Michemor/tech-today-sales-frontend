import { memo, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';


export const MeetingDetailsForm = memo(({ meetingDetails, setMeetingDetails }) => {

    // Memoized update functions for better performance
    const updateField = useCallback((field) => (event) => {
        setMeetingDetails(prev => ({ ...prev, [field]: event.target.value }));
    }, [setMeetingDetails]);

    const updateAutocompleteField = useCallback((field) => (event, newValue) => {
        setMeetingDetails(prev => ({ ...prev, [field]: newValue }));
    }, [setMeetingDetails]);

    return(
         <Paper sx={{
          mx: 2,
          my: 2,
          p: 4,
          backgroundColor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2, 
        }}
          >
          <Stack spacing={2} direction='column' >
          <Typography variant="h5" 
          sx={{ 
            color: 'primary.main',
            textAlign: 'center',
          }}
          > Meeting Details </Typography>
          <Divider/>
          <Typography variant="subtitle1" sx={{
            ml: 2,
            color: 'text.secondary',
          }}> Meeting Date </Typography>
          <TextField
          name='meetingDate'
          type='date'
          value={meetingDetails.meetingDate}
          onChange={updateField('meetingDate')}
          required
          fullWidth
          />
          <TextField
          name='meetingLocation'
          label="Meeting Location"
          value={meetingDetails.meetingLocation}
          onChange={updateField('meetingLocation')}
          fullWidth
          required
          variant="outlined"
          />
          <TextField
          name='meetingRemarks'
          value={meetingDetails.meetingRemarks}
          onChange={updateField('meetingRemarks')}
          fullWidth
          label="Meeting Remarks"
          variant="outlined"
          multiline
          rows={4}
          />
          <Autocomplete
          options={['In-person', 'Online', 'Phone']}
          sx={{ width: '100%' }}
          value={meetingDetails.meetingType}
          onChange={updateAutocompleteField('meetingType')}
          getOptionLabel={(option) => option?.toString() || ''}
          renderInput={(params) => (
            <TextField 
            {...params} 
            label="Meeting Type"
            variant="outlined" />
          )} 
          />
          <Autocomplete
          options={['Scheduled', 'Completed', 'Cancelled']}
          renderInput={(params) => (
            <TextField 
            {...params} 
            label="Meeting Status"
            variant="outlined" />
          )}
          value={meetingDetails.meetingStatus}
          onChange={updateAutocompleteField('meetingStatus')}
          />
          </Stack>
        </Paper>
    )
})