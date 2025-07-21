import { useEffect } from "react"
import { useState } from "react";
import { getClientData } from "../services/clientServices";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PersonIcon from '@mui/icons-material/Person';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

const CompleteData = () => {
    const { id } = useParams();
    console.log("CompleteData component rendered with ID:", id);
    const [clientData, setClientData] = useState({});

    useEffect(() => {
          const fetchData = async () => {
              const clientData = await getClientData(id);
              setClientData(clientData);
              console.log("Client data fetched:", clientData);
          };
          fetchData();
      }, [id]);

    return(
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" underline="hover" sx={{ textDecoration: 'none', color: 'inherit' }}>
                    Home
                </Link>
                <Link href="/sales" underline="hover" sx={{ textDecoration: 'none', color: 'inherit' }}>
                    Sales
                </Link>
                <Typography color="text.primary">
                    Client Details
                </Typography>
            </Breadcrumbs>
            <Paper>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
                    <Stack 
                        direction="row" 
                        spacing={2} 
                        alignItems="center"
                        sx={{ 
                            mb: 2,
                            justifyContent: { xs: "center", sm: "flex-start" },
                            flexWrap: { xs: "wrap", sm: "nowrap" }
                        }}
                    >
                        <Avatar sx={{ 
                            bgcolor: 'primary.main', 
                            width: { xs: 50, sm: 60 }, 
                            height: { xs: 50, sm: 60 }
                        }}>
                            <PersonIcon sx={{ 
                                width: { xs: 30, sm: 40 }, 
                                height: { xs: 30, sm: 40 } 
                            }} />
                        </Avatar>
                        <Typography variant="h5" component="h1" sx={{
                            color: 'primary.main',
                            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                            fontWeight: 'medium',
                            textAlign: { xs: 'center', sm: 'left' }
                        }}>
                            {clientData?.client?.client_name 
                                ? `${clientData.client.client_name}` 
                                : "Loading client data..."}
                        </Typography>
                    </Stack>
                </Box>
                <Divider sx={{ m: 2 }} />
                
                {/* Main responsive grid container */}
                <Grid container spacing={3} sx={{ p: 2 }}>
                    
                    {/* LEFT COLUMN - Client & Meeting Info */}
                    <Grid size={12} md={6}>
                        
                        {/* Client Information Section */}
                        <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Client Information
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    label="Client Name"
                                    value={clientData?.client?.client_name || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Client Email"
                                    value={clientData?.client?.client_email || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Client Contact"
                                    value={clientData?.client?.client_contact || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Job Title"
                                    value={clientData?.client?.job_title || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Deal Information"
                                    value={clientData?.client?.deal_information || ""}
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={3}
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Stack>
                        </Paper>

                        {/* Meeting Information Section */}
                        <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Meeting Information
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    label="Meeting Date"
                                    value={clientData?.meeting?.meeting_date || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Meeting Location"
                                    value={clientData?.meeting?.meeting_location || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Meeting Status"
                                    value={clientData?.meeting?.meeting_status || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Meeting Type"
                                    value={clientData?.meeting?.meetingtype || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Meeting Remarks"
                                    value={clientData?.meeting?.meeting_remarks || ""}
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={3}
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* RIGHT COLUMN - Building, Office & Internet Info */}
                    <Grid size={12} md={6}>
                        
                        {/* Building Information Section */}
                        <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Building Information
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    label="Building Name"
                                    value={clientData?.building?.building_name || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                    <TextField
                                    label="Has Fibre been set up in the building?"
                                    value={clientData?.building?.is_fibre_setup || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Ease of Access"
                                    value={clientData?.building?.ease_of_access || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Access Information"
                                    value={clientData?.building?.access_information || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Number Of Offices"
                                    value={clientData?.building?.number_offices || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Stack>
                        </Paper>

                        {/* Office Information Section */}
                        <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Office Information
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    label="Office Name"
                                    value={clientData?.office?.office_name || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Office Floor"
                                    value={clientData?.office?.office_floor || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Industry Category"
                                    value={clientData?.office?.industry_category || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="Number of Staff"
                                    value={clientData?.office?.staff_number || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                <TextField
                                    label="More Data on office"
                                    value={clientData?.office?.more_data_on_office || ""}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Stack>
                        </Paper>

                        {/* Internet Information Section */}
                        <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Internet Information
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    label="Does the client have a connection?"
                                    value={clientData?.internet?.is_isp_connected == "false" ? "No" : "Yes"}
                                    variant="outlined"
                                    size="small"
                                    slotProps={{ readOnly: true }}
                                    fullWidth
                                />
                                { clientData?.internet?.is_isp_connected === "true" && (
                                    <>
                                        <TextField
                                            label="Internet Provider"
                                            value={clientData?.internet?.isp_name || ""}
                                            variant="outlined"
                                            size="small"
                                            slotProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Internet Product"
                                            value={clientData?.internet?.service_provided || ""}
                                            variant="outlined"
                                            size="small"
                                            slotProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Internet Connection Type"
                                            value={clientData?.internet?.internet_connection_type || ""}
                                            variant="outlined"
                                            size="small"
                                            slotProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Price of Internet monthly"
                                            value={clientData?.internet?.isp_price || ""}
                                            variant="outlined"
                                            size="small"
                                            slotProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Deal Status"
                                            value={clientData?.internet?.deal_status || ""}
                                            variant="outlined"
                                            size="small"
                                            slotProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default CompleteData;