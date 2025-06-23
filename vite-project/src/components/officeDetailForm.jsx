import { memo } from 'react';
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

  const handleCategoryChange = (event) => {
    setCurrentCategory(event.target.value);
  }

    return (
        <>
        <Paper 
        sx={{
          p: 4,
          mt: 3,
          mb: 3,
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
            onChange={(e) => setOfficeDetails({ ...officeDetails, office_name: e.target.value })}
            required
            variant="outlined"
            fullWidth
            />
            <TextField
            label="Number of Staff"
            name='number_staff'
            value={officeDetails.number_staff}
            onChange={(e) => setOfficeDetails({ ...officeDetails, number_staff: e.target.value })}
            required
            type="number"
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
                value={officeDetails.other_industry}
                onChange={(e) => setOfficeDetails({ ...officeDetails, other_industry: e.target.value })}
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