import { useEffect, useState } from "react";
import { getOffices } from "../services/clientServices";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from "@mui/material/Button";


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
        { field: 'industry_category', headerName: 'Industry Category', width: 200 },
        { field: 'more_data_on_office', headerName: 'More Data on Office', width: 200 },
        { field: 'building_id', headerName: 'Building ID', width: 200 },
    ]

    return (
        <>
        {/* Alert */}
        {alert.open && (
            <Alert severity={alert.severity} sx={{ mb: 2 }}>
                {alert.message}
            </Alert>
        )}

       <Paper elevation={3} sx={{ 
            mx: 2,
            my: 2,
            padding: 2 
            }}>
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
        </>
    );

}