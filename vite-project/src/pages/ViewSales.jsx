import { DataGrid } from "@mui/x-data-grid"
import { useState, useEffect } from "react";
import { getSalesData } from "../services/salesServices";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


export const ViewSales = () => {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSalesData();
            const transformedSales = response.map((sale) => ({
                ...sale,
                id: sale.client_id, 
            }));
            setSales(transformedSales || []);
        };
        fetchData();
    }, []);

     const columns = [
    { field: 'client_id', headerName: 'Client ID' },
    { field: 'client_name', headerName: 'Client Name' },
    { field: 'deal_information', headerName: 'Deal Information' },
    { field: 'meeting_meeting_date', headerName: 'Meeting Date' },
    { field: 'meeting_meeting_location', headerName: 'Meeting Location' },
    { field: 'meeting_meeting_status', headerName: 'Meeting Status' },
    { field: 'internet_is_isp_connected', headerName: 'Is ISP Connected?' },
    { field: 'internet_isp_name', headerName: 'ISP Name' },
    { field: 'internet_service_provided', headerName: 'Service Provided' },
    { field: 'internet_isp_price', headerName: 'ISP Price' },
    { field: 'internet_deal_status', headerName: 'Deal Status' },
    { field: 'office_office_name', headerName: 'Office Name' },
    { field: 'office_industry_category', headerName: 'Industry' },
  ];

    return(
        <>
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
                Sales overview
            </Typography>
            <Divider/>
            <DataGrid
            rows={sales || []}
            columns={columns || []}
            getRowId={(row) => row.id}
            initialState = {{
                pagination: {
                    paginationModel: { pageSize: 10},
                },
            }}
            pageSizeOptions={[5, 10, 20]}
            />
        </Paper>
        </>
    )
}