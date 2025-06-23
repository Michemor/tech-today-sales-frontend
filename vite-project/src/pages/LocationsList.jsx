import Paper from "@mui/material/Paper";
import { getOffices } from "../services/officeService"
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Collapse from "@mui/material/Collapse";

const Locations = () => {

    const [buildings, setBuildings] = useState([]);
    const [offices, setOffices] = useState([]);

    const [value, setValue] = useState('1'); 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

   useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getOffices();
            // Transform the data to ensure each row has required fields
            const transformedBuildings = data.buildings.map(building => ({
                ...building
            }));
            setBuildings(transformedBuildings);

            const transformedOffices = data.offices.map(office => ({
                ...office
            }));
            setOffices(transformedOffices);

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

    const officesColumns = [
        { field: 'office_id', headerName: 'ID', width: 90 },
        { field: 'office_name', headerName: 'Office Name', width: 150 },
        { field: 'office_floor', headerName: 'Office Floor', width: 150 },
        { field: 'more_data_on_office', headerName: 'More Data on Office', width: 120 },
        { field: 'building_id', headerName: 'Bulding ID', width: 120 },
    ];


    return (
        <>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Buildings" value='1' />
            <Tab label="Offices" value='2' />   
        </Tabs>
        <Collapse in={value === '1'} timeout="auto" unmountOnExit mountOnEnter>
        <Paper sx={{ m:3, p: 3 }}>
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
       <Paper sx={{ m:3, p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center', color: 'primary.main' }}>
                Offices List </Typography>
           <DataGrid
                rows={offices}
                columns={officesColumns}
                getRowId={(row) => row.office_id}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
            />
        </Paper>
        </Collapse>
        </>
    )
}

export default Locations