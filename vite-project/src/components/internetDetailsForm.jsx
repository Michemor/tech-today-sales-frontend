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
import Autocomplete from '@mui/material/Autocomplete';
import Collapse from '@mui/material/Collapse';

export const InternetDetailsForm = memo(({ internetDetails, setInternetDetails }) => {

    return(
        <>
        <Paper 
                sx={{
                  p: 4,
                  m: 3,
                  backgroundColor: 'background.paper',
                  boxShadow: 3,
                  borderRadius: 2, 
                }}>
              <Typography variant="h5" component={"h1"} gutterBottom
              sx={{ 
                textAlign: 'center',
                color: 'primary.main',
              }}> Internet Details Section </Typography>
              <Divider/>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'secondary.light',
                  p: 2,
                  mt: 2,
                  borderRadius: 2,
                  color: 'text.secondary',
                }} >
              <FormControl>
                <FormLabel id="internet-connection-label"> Do they have an existing internet connection? </FormLabel>
                <Divider/>
                <RadioGroup                  
                  name="is_connected"
                  value={internetDetails.is_connected}
                  onChange={(e) => setInternetDetails({ ...internetDetails, is_connected: e.target.value })}
                  sx={{ color: 'text.secondary' }}>
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              </Box>
        
              <Collapse in={internetDetails.is_connected === "true"} mountOnEnter unmountOnExit>
                <Stack spacing={2} direction='column' sx={{ mt: 2 }}>
                  <Box sx={{
                    border: '1px solid',
                    p:2,
                    borderColor: 'divider',
                    color: 'text.secondary',
                    borderRadius: 2,
                    }}>
                    <FormControl>
                      <FormLabel id="isp-label"> Internet Service Provider </FormLabel>
                      <RadioGroup                        
                        name="isp_name"
                        value={internetDetails.isp_name}
                        onChange={(e) => setInternetDetails({ ...internetDetails, isp_name: e.target.value })}
                        sx={{ color: 'text.secondary' }}>
                        <FormControlLabel value="Liquid" control={<Radio />} label="Liquid" />
                        <FormControlLabel value="Safaricom Fibre" control={<Radio />} label="Safaricom Fibre" />
                        <FormControlLabel value="Zuku" control={<Radio />} label="Zuku" />
                        <FormControlLabel value="NTT/IS (Internet Solutions)" control={<Radio />} label="NTT/IS (Internet Solutions)" />
                        <FormControlLabel value="Telkom" control={<Radio />} label="Telkom" />
                        <FormControlLabel value="Fibre" control={<Radio />} label="Faiba" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    { internetDetails.isp_name === 'Other' && (
                    <TextField
                    name="other_isp"
                    value={internetDetails.isp_name}
                    onChange={(e) => setInternetDetails({ ...internetDetails, isp_name: e.target.value })}
                    label="If Other indicate the ISP name"
                    variant="outlined"
                    fullWidth
                    />
                    )}
                  </Box>
                  
                 <Box sx={{
                  border: '1px solid',
                  p: 2,
                  borderColor: 'divider',
                  borderRadius: 2,
                  color: 'text.secondary',
                 }}>
                  <FormControl>
                    <FormLabel id="net-price"> Price/Rate per month </FormLabel>
                    <RadioGroup
                    value={internetDetails.net_price}
                    onChange={(e) => setInternetDetails({ ...internetDetails, net_price: e.target.value })}
                    name="net_price"
                    sx={{ color: 'text.secondary' }}>
                      <FormControlLabel value="Below 5000" control={<Radio />} label="Below 5000" />
                      <FormControlLabel value="5000 - 10,000" control={<Radio />} label="5000 - 10,000" />  
                      <FormControlLabel value="10,000 - 20,000" control={<Radio />} label="10,000 - 20,000" />  
                      <FormControlLabel value="Other" control={<Radio />} label="Other" />  
                      </RadioGroup>
                  </FormControl>
                  {internetDetails.net_price === 'Other' && (
                     <TextField
                  name='other_price'
                  value={internetDetails.net_price}
                  onChange={(e) => setInternetDetails({ ...internetDetails, net_price: e.target.value })}
                  label="If Other indicate the price"
                  variant="outlined"
                  fullWidth
                  />
                  )}
                 </Box>
        
                 
                  <Autocomplete
                  options={['Dedicated', 'Shared']}
                  value={internetDetails.connection_type}
                  onChange={(e, newVal) => setInternetDetails({ ...internetDetails, connection_type: newVal })}
                  renderInput={(params) => (
                    <TextField 
                    {...params} 
                    label="Connection Type" 
                    variant="outlined" />
                  )}
                  />
        
                  <Box sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    p: 2,
                    color: 'text.secondary',
                    borderRadius: 2,
                    }}>
                    <FormControl>
                      <FormLabel id="product-label"> Product </FormLabel>
                      <RadioGroup
                        name="product"
                        value={internetDetails.product}
                        onChange={(e) => setInternetDetails({ ...internetDetails, product: e.target.value })}
                        sx={{ color: 'text.secondary' }}>
                        <FormControlLabel value="Internet" control={<Radio />} label="Internet" />
                        <FormControlLabel value="Domain & Hosting" control={<Radio />} label="Domain & Hosting" />
                        <FormControlLabel value="PBX/Telephony" control={<Radio />} label="PBX/Telephony" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                       </FormControl>
                       { internetDetails.product === 'Other' && (
                        <TextField
                           label="If other indicate the product"
                           name="other_product"
                           fullWidth
                           value={internetDetails.product}
                           onChange={(e) => setInternetDetails({ ...internetDetails, product: e.target.value })}
                           variant="outlined"
                            />
                       )}
                  </Box>
                  
                  <Autocomplete
                      options={['Pending', 'Negotiated', 'Closed']}
                      renderInput={(params) => (
                        <TextField 
                        {...params} 
                        label="Deal Status" 
                        variant="outlined" />
                      )}
                      value={internetDetails.deal_status}
                      onChange={(e, newVal) => setInternetDetails({ ...internetDetails, deal_status: newVal })}
                      />
                </Stack>
              </Collapse>
              
              </Paper>
        </>
    )
})