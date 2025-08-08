import { memo, useEffect, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { getOfficeNames } from '../services/clientServices'; // Adjust the import path as necessary


export const OfficeDetailForm = memo(({ officeDetails, setOfficeDetails }) => {
  const [currentCategory, setCurrentCategory] = useState(officeDetails.industry || '');
  const [officeName, setOfficeName] = useState();

  // Memoized update functions for better performance
  const updateField = useCallback((field) => (event) => {
    setOfficeDetails(prev => ({ ...prev, [field]: event.target.value }));
  }, [setOfficeDetails]);

  const updateOtherIndustry = useCallback((event) => {
    setOfficeDetails(prev => ({ ...prev, industry: event.target.value }));
  }, [setOfficeDetails]);

  const handleCategoryChange = useCallback((event) => {
    const newCategory = event.target.value;
    setCurrentCategory(newCategory);
    setOfficeDetails(prev => ({ ...prev, industry: newCategory }));
  }, [setOfficeDetails]);

  const updateAutoCompleteField = useCallback((field) => (e, newValue) => {
    setOfficeDetails(prev => ({ ...prev, [field]: newValue }));
  }, [setOfficeDetails]);

  const handlePositiveIntegerChange = useCallback((fieldName) => (event) => {
    const value = event.target.value;
    
    // Allow empty string for better UX while typing
    if (value === '') {
      setOfficeDetails(prev => ({ ...prev, [fieldName]: '' }));
      return;
    }
    
    // Only allow positive integers
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue > 0 && value === numericValue.toString()) {
      setOfficeDetails(prev => ({ ...prev, [fieldName]: value }));
    }
  }, [setOfficeDetails]);

  useEffect(() => {
    const fetchOfficeNames = async () => {
      const names = await getOfficeNames();
      setOfficeName(names);
    };
    fetchOfficeNames();

  }, [setOfficeName]);

    return (
        <>
        <Paper 
        sx={{
          mx: 2,
          my: 2,
          p: 4,
          backgroundColor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2, 
        }}>
          <Stack spacing={2} direction='column' >
            <Typography variant="h5"
            sx={{ 
              color: 'primary.main',
              textAlign: 'center',
            }}> Office Details </Typography>
            <Divider/>
            
            <Autocomplete
              options={officeName || []}
              freeSolo
              value={officeDetails.office_name}
              onChange={updateAutoCompleteField('office_name')}
              onInputChange={(event, newValue) => {
                // Update office name in state when input changes
                setOfficeDetails(prev => ({ ...prev, office_name: newValue }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Office Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />

            <TextField 
                type="number"
                label="Office Floor"
                name="office_floor"
                value={officeDetails.office_floor}
                onChange={handlePositiveIntegerChange('office_floor')}
                variant="outlined"
                slotProps={{
                  input: {
                    min: 0,
                    pattern: "[1-9][0-9]*"
                  }
                }}
                onKeyDown={(e) => {
                  // Prevent typing negative signs, decimal points, and 'e'
                  if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                    e.preventDefault();
                  }
                }}
                required
                sx={{ width: '100%', mt: 2 }}/>
            <TextField
            label="Number of Staff"
            name='number_staff'
            value={officeDetails.number_staff}
            onChange={handlePositiveIntegerChange('number_staff')}
            required
            type="number"
            slotProps={{
              input: {
                min: 1,
                pattern: "[1-9][0-9]*"
              }
            }}
            onKeyDown={(e) => {
              // Prevent typing negative signs, decimal points, and 'e'
              if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                e.preventDefault();
              }
            }}
            variant="outlined"/>
             
            <Box
            sx={{
              border: '1px solid',
              borderColor: 'secondary.light',
              p: 2,
              borderRadius: 2,
              color: 'text.secondary',
            }}
            > 
            <FormControl>
              <FormLabel id="industry"> Industry Category </FormLabel>
              <RadioGroup
                name="industry"
                value={currentCategory}
                onChange={(e) => handleCategoryChange(e)}>
                <FormControlLabel value="NGO" control={<Radio />} label="NGO" />
                <FormControlLabel value="Manufacturing Industries" control={<Radio />} label="Manufacturing Industries" />
                <FormControlLabel value="Bank" control={<Radio />} label="Bank" />
                <FormControlLabel value="Educational Institution" control={<Radio />} label="Educational Institution" />
                <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
            </FormControl>
            {currentCategory === 'Other' && (
              <TextField
                label="Specify Other Industry"
                name='other_industry'
                value={officeDetails.industry || ''}
                onChange={updateOtherIndustry}
                variant="outlined"
                fullWidth
              />
            )}
            </Box> 
            <TextField
            label="Additional Information"
            name='more_offices'
            value={officeDetails.more_offices || ''}
            onChange={updateField('more_offices')}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Stack>
    </Paper>
    </>
    )

})