import { useEffect, useState } from "react";
import { getOffices } from "../services/clientServices";
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";



export const OfficeList = () => {
    const [offices, setOffices] = useState([]);
    
    useEffect  (() => {
        const fetchOffices = async () => {
            try {
                const data = await getOffices();
                setOffices(data.offices || []);
            } catch (error) {
                console.error("Error fetching offices:", error);
            }
        };

        fetchOffices();
    }, []);

    const officesColumns = [
        { field: 'office_id', headerName: 'ID', width: 90 },
        { field: 'office_name', headerName: 'Office Name', width: 150 },
        { field: 'staff_number', headerName: 'Office Floor', width: 150 },
        { field: 'industry_category', headerName: 'More Data on Office', width: 200 },
        { field: 'client_id', headerName: 'More Data on Office', width: 200 },
    ]

    return (
        <Paper sx={{ width: '100%', height: 400, marginTop: 2, padding: 2 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center', color: 'primary.main' }}>
                Offices List
            </Typography>
            <DataGrid
                rows={offices || []}
                columns={officesColumns}
                getRowId={(row) => row.office_id}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
            />
        </Paper>
    );

}