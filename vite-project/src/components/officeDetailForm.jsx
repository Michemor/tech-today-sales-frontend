import { memo, useCallback } from 'react';
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
import { useState } from 'react';


export const OfficeDetailForm = memo(({ officeDetails, setOfficeDetails }) => {
  const [currentCategory, setCurrentCategory] = useState(officeDetails.industry || '');

  // Memoized update functions for better performance
  const updateField = useCallback((field) => (event) => {
    setOfficeDetails(prev => ({ ...prev, [field]: event.target.value }));
  }, [setOfficeDetails]);

  const updateOtherIndustry = useCallback((event) => {
    setOfficeDetails(prev => ({ ...prev, other_industry: event.target.value, industry: event.target.value }));
  }, [setOfficeDetails]);

  const handleCategoryChange = useCallback((event) => {
    const newCategory = event.target.value;
    setCurrentCategory(newCategory);
    setOfficeDetails(prev => ({ ...prev, industry: newCategory }));
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
            <TextField
            label="Office Name"
            name='office_name'
            value={officeDetails.office_name}
            onChange={updateField('office_name')}
            required
            variant="outlined"
            fullWidth
            />
            <TextField 
                label="Number of offices"
                value={officeDetails.number_of_offices}
                name="number_of_offices"
                onChange={handlePositiveIntegerChange('number_of_offices')}
                variant="outlined"
                type="number"
                inputProps={{ 
                  min: 1,
                  step: 1,
                  pattern: "[1-9][0-9]*"
                }}
                onKeyDown={(e) => {
                  // Prevent typing negative signs, decimal points, and 'e'
                  if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                    e.preventDefault();
                  }
                }}
                required
                sx={{ width: '100%', mt: 2 }}
                />
            <TextField
            label="Number of Staff"
            name='number_staff'
            value={officeDetails.number_staff}
            onChange={handlePositiveIntegerChange('number_staff')}
            required
            type="number"
            inputProps={{ 
              min: 1,
              step: 1,
              pattern: "[1-9][0-9]*"
            }}
            onKeyDown={(e) => {
              // Prevent typing negative signs, decimal points, and 'e'
              if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                e.preventDefault();
              }
            }}
            variant="outlined"/>
             <TextField 
                type="number"
                label="Office Floor"
                name="office_floor"
                value={officeDetails.office_floor}
                onChange={handlePositiveIntegerChange('office_floor')}
                variant="outlined"
                inputProps={{ 
                  min: 1,
                  step: 1,
                  pattern: "[1-9][0-9]*"
                }}
                onKeyDown={(e) => {
                  // Prevent typing negative signs, decimal points, and 'e'
                  if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                    e.preventDefault();
                  }
                }}
                required
                sx={{ width: '100%', mt: 2 }}/>
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
                value={officeDetails.other_industry || ''}
                onChange={updateOtherIndustry}
                variant="outlined"
                fullWidth
              />
            )}
            </Box> 
             
            </Stack>
        </Paper>
        </>
    )

})