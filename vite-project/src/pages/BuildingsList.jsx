import Paper from "@mui/material/Paper";
import { getBuildings } from "../services/officeService";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Collapse from "@mui/material/Collapse";
import BuildingOffice from "./BuildingOfficeList";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { DataGrid } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from "@mui/material/Button";




const Locations = () => {


    const [buildings, setBuildings] = useState([]);

    const [value, setValue] = useState('1'); 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

   useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getBuildings();
            // Transform the data to ensure each row has required fields
            const transformedBuildings = data.buildings.map(building => ({
                ...building
            }));
            setBuildings(transformedBuildings);

        } catch (error) {
            console.error("Error fetching office data:", error);
        }
    };

    fetchData();
}, []);

    const buildingsColumns = [
    { field: 'building_id', headerName: 'ID', width: 90 },
    { field: 'building_name', headerName: 'Building Name', width: 150 },
    { field: 'number_offices', headerName: 'Number of Offices', width: 150 },
    { field: 'is_fibre_setup', headerName: 'Is Fibre Setup', width: 120 },
    { field: 'ease_of_access', headerName: 'Ease of Access', width: 120 },
    { field: 'access_information', headerName: 'Access Information', width: 200 }
];



    return (
        <>
        {/* Alert for success/error messages */}
        {alert.open && (
            <Alert severity={alert.severity} sx={{ mb: 2 }}>
                {alert.message}
            </Alert>
        )}

        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Buildings" value='1' />
            <Tab label="Offices" value='2' />   
        </Tabs>
        <Collapse in={value === '1'} timeout="auto" unmountOnExit mountOnEnter>
        <Paper sx={{ mx: 3, my: 2, p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center', color: 'primary.main' }}>
               Buildings List </Typography>
           <DataGrid
                rows={buildings}
                columns={buildingsColumns}
                getRowId={(row) => row.building_id}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
            />
        </Paper>
        </Collapse>

        <Collapse in={value === '2'} timeout="auto" unmountOnExit mountOnEnter>
       <BuildingOffice/>
       </Collapse>
        </>
    )
}

export default Locations