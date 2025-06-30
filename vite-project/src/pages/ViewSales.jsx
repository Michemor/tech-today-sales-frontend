import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getSalesData } from "../services/salesService";
import { Box, Typography, Paper } from "@mui/material";


const ViewSales = () => {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const data = await getSalesData();
                setSales(data || []);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        }

        fetchSalesData();
    }, []);

   const columns = [
  // Client Information
  {
    field: 'client_id',
    headerName: 'Client ID',
    width: 90,
    type: 'number',
  },
  {
    field: 'client_name',
    headerName: 'Client Name',
    width: 150,
  },
  {
    field: 'client_contact',
    headerName: 'Contact',
    width: 150,
  },
  {
    field: 'client_email',
    headerName: 'Email',
    width: 200,
  },

  // Meeting Information
  {
    field: 'meeting_meeting_date',
    headerName: 'Meeting Date',
    width: 150,
  },
  {
    field: 'meeting_meeting_location',
    headerName: 'Meeting Location',
    width: 200,
  },
  {
    field: 'meeting_meetingtype',
    headerName: 'Meeting Type',
    width: 130,
    // Note: This field appears to be None in your sample, so it might be empty
  },
  {
    field: 'meeting_meeting_status',
    headerName: 'Meeting Status',
    width: 130,
  },
  {
    field: 'meeting_meeting_remarks', // Based on the "Clien needed next week." part
    headerName: 'Meeting Remarks',
    flex: 1, // Takes remaining space
    minWidth: 200,
  },

  // Internet Information
  {
    field: 'internet_isp_name',
    headerName: 'ISP Name',
    width: 150,
  },
  {
    field: 'internet_internet_connection_type',
    headerName: 'Connection Type',
    width: 160,
  },
  {
    field: 'internet_is_isp_connected', // Corrected field name based on 'true'/'false' values
    headerName: 'ISP Connected',
    width: 120,
    type: 'boolean',
  },
  {
    field: 'internet_isp_price',
    headerName: 'ISP Price',
    width: 120,
    type: 'number',
  },
  {
    field: 'internet_deal_status',
    headerName: 'Deal Status',
    width: 120,
  },
  {
    field: 'internet_service_provided', // Based on "Enterprise Cloud Solutions"
    headerName: 'Service Provided',
    width: 200,
  },
  {
    field: 'internet_timestamp',
    headerName: 'Internet Record Timestamp',
    width: 220,
  },

  // Office Information
  {
    field: 'office_office_name',
    headerName: 'Office Name',
    width: 200,
  },
  {
    field: 'office_staff_number',
    headerName: 'Staff Count',
    width: 120,
    type: 'number',
  },
  {
    field: 'office_industry_category',
    headerName: 'Industry Category',
    width: 180,
  },
];

    return (
        <Box sx={{ 
            width: '100%', 
            height: '100vh',
            padding: { xs: 1, sm: 2, md: 3 }
        }}>
            <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom
                sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    marginBottom: { xs: 2, md: 3 }
                }}
            >
                Sales Overview
            </Typography>
            
            <Paper 
                elevation={3} 
                sx={{ 
                    height: { xs: '70vh', sm: '75vh', md: '80vh' },
                    width: '100%',
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    },
                    '& .MuiDataGrid-cell': {
                        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                    },
                }}
            >
                <DataGrid
                    rows={sales}
                    columns={columns}
                    getRowId={(row) => row?.client_id}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 25, page: 0 },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                />
            </Paper>
        </Box>
    )
}

export default ViewSales;