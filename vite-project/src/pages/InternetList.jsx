import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import { getInternet } from "../services/clientServices";


export const InternetList = () => {
    const [internetDetails, setInternetDetails] = useState([]);

    useEffect(() => {
        const fetchInternetDetails = async () => {
            try {
                const data = await getInternet();
                console.log("Internet Details Fetched:", data);
                setInternetDetails(data || []);
            } catch (error) {
                console.error("Error fetching internet details:", error);
            }
        };

        fetchInternetDetails();
    }, []);

    const internetColumns = [
        { field: 'client_id', headerName: 'Client ID', width: 90 },
        { field: 'is_isp_connected', headerName: 'Do they have an internet connection?', width: 150 },
        { field: 'isp_name', headerName: 'ISP Name', width: 150 },
        { field: 'isp_price', headerName: 'Price/Rate per month', width: 150 },
        { field: 'internet_connection_type', headerName: 'Type of Internet Connection', width: 200 },
        { field: 'service_provided', headerName: 'Service Provided', width: 200 },
        { field: 'deal_status', headerName: 'Deal Status', width: 200 },
        { field: 'timestamp', headerName: 'Created At', width: 200 },
    ];

    return(
        <>
       <Paper elevation={3} sx={{ 
            mx: 2,
            my: 2,
            padding: 2 
            }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center', color: 'primary.main' }}>
                Internet List
            </Typography>
                <DataGrid
                    rows={internetDetails || []}
                    columns={internetColumns}
                    getRowId={(row) => row.internet_id}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[10, 20, 50, 100]}
                    />
        </Paper>
        </>
    )
}