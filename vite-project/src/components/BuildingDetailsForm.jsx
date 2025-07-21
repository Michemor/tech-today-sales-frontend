import { memo, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const BuildingDetailsForm = memo(({ buildingDetails, setBuildingDetails }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Memoized update functions for better performance
  const updateField = useCallback((field) => (event) => {
    setBuildingDetails(prev => ({ ...prev, [field]: event.target.value }));
  }, [setBuildingDetails]);
  
  return (
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
          }}>
          Building Details Section
        </Typography>
        <Divider/>
        
        <TextField
          name='building_name'
          value={buildingDetails.building_name || ''}
          onChange={updateField('building_name')}
          label="Building Name"
          variant="outlined"
          fullWidth
          required
          size={isMobile ? 'small' : 'medium'}
        />
        
        <Box sx={{
          border: '1px solid',
          borderColor: 'divider',
          p: { xs: 1.5, sm: 2 },
          borderRadius: 1
        }}>
          <FormControl>
            <FormLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Is Fibre Set Up?
            </FormLabel>
            <RadioGroup 
              name="is_fibre_setup"
              value={buildingDetails.is_fibre_setup || ''}
              onChange={updateField('is_fibre_setup')}
              sx={{ 
                color: 'secondary.dark',
                '& .MuiFormControlLabel-label': {
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }
              }}
            >
              <FormControlLabel value="Yes" control={<Radio size={isMobile ? 'small' : 'medium'} />} label="Yes" />
              <FormControlLabel value="No" control={<Radio size={isMobile ? 'small' : 'medium'} />} label="No" />
              <FormControlLabel 
                value="Can connect to MyISP Base Station" 
                control={<Radio size={isMobile ? 'small' : 'medium'} />} 
                label="Can Connect to MyISP Base Station" 
              />
            </RadioGroup>
          </FormControl>
        </Box>
           <Box sx={{
          border: '1px solid',
          borderColor: 'secondary.dark',
          borderRadius: 1,
          p: { xs: 1.5, sm: 2 },
        }}>
          <FormControl>
            <FormLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Ease of Access
            </FormLabel>
            <RadioGroup
              name="ease_of_access"
              value={buildingDetails.ease_of_access || ''}
              onChange={updateField('ease_of_access')}
              sx={{ 
                color: 'secondary.dark',
                '& .MuiFormControlLabel-label': {
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }
              }}
            >
              <Typography sx={{ 
                m: { xs: 0.5, sm: 1 }, 
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
                Easy
              </Typography>
              <FormControlLabel value="1" control={<Radio size={isMobile ? 'small' : 'medium'} />} label="1" />
              <FormControlLabel value="2" control={<Radio size={isMobile ? 'small' : 'medium'} />} label="2" />
              <FormControlLabel value="3" control={<Radio size={isMobile ? 'small' : 'medium'} />} label="3" />
              <Typography sx={{ 
                m: { xs: 0.5, sm: 1 }, 
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
                Difficult
              </Typography>
            </RadioGroup>
          </FormControl>
        </Box>
         
        <TextField
          name='more_info_access'
          value={buildingDetails.more_info_access || ''}
          onChange={updateField('more_info_access')}
          label="Additional Information regarding access to the building"
          variant="outlined"
          fullWidth
          multiline
          rows={isMobile ? 3 : 4}
          required
          size={isMobile ? 'small' : 'medium'}
        />
        
        <TextField
          name='number_offices'
          value={buildingDetails.number_offices || ''}
          onChange={updateField('number_offices')}
          label="Number of Offices in the Building"
          variant="outlined"
          fullWidth
          type="number"
          slotProps={{
            input: {
              min: 1,
              step: 1,
              pattern: "[1-9][0-9]*"
            }
          }}
          rows={isMobile ? 3 : 4}
          required
          size={isMobile ? 'small' : 'medium'}
        />
      </Stack>
    </Paper>
  );
});
