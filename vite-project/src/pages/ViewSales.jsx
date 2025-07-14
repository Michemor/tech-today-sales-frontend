import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { getSalesData } from "../services/clientServices";
import { DataGrid } from '@mui/x-data-grid';


export const ViewSales = () => {

    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSalesData();
            setSalesData(data);
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'clientName', headerName: 'Client Name', width: 150 },
        { field: 'product', headerName: 'Product', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 110 },
        { field: 'price', headerName: 'Price', width: 110 },
        { field: 'date', headerName: 'Date', width: 150 },
    ]

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
               rows={salesData}
               columns={columns}
               getRowId={(row) => row.id}
               initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                }
               }}
               pageSize={5}
               rowsPerPageOptions={[5]}
           />
        </Paper>
        </>
    )
}