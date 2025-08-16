import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { getSales } from "../services/clientServices";
import { DataGrid } from '@mui/x-data-grid';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";



export const ViewSales = () => {
    const navigate = useNavigate();

    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSales();
                console.log("Sales data fetched:", data);
                const transformedData = data.map((item, index) => {
                    // Add validation to ensure required fields exist
                    const clientId = item.client?.client_id;
                    if (!clientId) {
                        console.warn(`Item at index ${index} missing client_id:`, item);
                    }
                    
                    return {
                        id: clientId,
                        name: item.client?.client_name || 'N/A',
                        email: item.client?.client_email || 'N/A',
                        meeting_date: item.meetings?.[0]?.meeting_date || 'N/A',
                        meeting_status: item.meetings?.[0]?.meeting_status || 'N/A',
                        is_isp_connected: item.internet_records?.[0]?.is_isp_connected || 'N/A',
                        building_name: item.buildings?.[0]?.building_name || 'N/A',
                        office_name: item.offices?.[0]?.office_name || 'N/A',
                    };
                });
                setSalesData(transformedData);
                console.log('Sales data received:', transformedData);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };
        fetchData();
    }, []);


    const HandleRowClick = (id) => {
        console.log('Row clicked with ID:', id); // Debug log
        if (id) {
            navigate(`/client/${id}`);
        } else {
            console.error('No ID provided for navigation');
        }
    }

    const columns = [
        { field: 'id', headerName: 'Client ID', width: 150 },
        { field: 'name', headerName: 'Client Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'meeting_date', headerName: 'Meeting Date', width: 180 },
        { field: 'meeting_status', headerName: 'Meeting Status', width: 180 },
        { field: 'is_isp_connected', headerName: 'Does the client have a connection?', width: 150 },
        { field: 'building_name', headerName: 'Building Name', width: 200 },
        { field: 'office_name', headerName: 'Office Name', width: 200 },
    ]

    return(
        <>
        <Box>
        <Paper
        elevation={3}
        sx = {{
            padding: 2,
            mx: 2,
            my: 2,
        }}
        >
            <Typography variant="h4" gutterBottom sx={{
                textAlign: 'center',
                marginBottom: 2,
                color: 'primary.main',
            }}>
                Sales Data Overview
            </Typography>
            <Divider/>
            <Autocomplete
                freeSolo
                options={salesData.map((option) => option.name)}
                renderInput={(params) => (
                    <TextField  variant="outlined" {...params} label="Search by Client Name" />
                )}
                sx={{ marginTop: 2, marginBottom: 2 }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                onChange={(event, value) => {
                    setTimeout(() => {
                    if (value) {
                        const selectedClient = salesData.find(client => client.name === value);
                        if (selectedClient) {
                            HandleRowClick(selectedClient.id);
                        }
                    }
                }, 500); 
                }}
            />
           <DataGrid
               rows={salesData}
               columns={columns}
               getRowId={(row) => row.id}
               initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 20 },
                }
               }}
               pageSize={20}
               onRowClick={(params) => {
                   console.log('DataGrid row clicked:', params.row);
                   HandleRowClick(params.row.id);
               }}
               rowsPerPageOptions={[20, 50, 100]}
               sx={{
                mt: 2,
               }}
           />
        </Paper>
        </Box>
        </>
    )
}