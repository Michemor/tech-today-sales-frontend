import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { getOffices } from '../services/officeService';
import Alert from '@mui/material/Alert';


const BuildingOffice = () => {

    const [offices, setOffices] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try{
                    const data = await getOffices();

                    const transformedOffices = data.offices.map(office => ({
                        ...office
                    }));
                    setOffices(transformedOffices);

                } catch (error) {
                    console.error("Error fetching office data:", error);
                }
            }

            fetchData();
        }, []);

        const officesColumns = [
        { field: 'office_id', headerName: 'ID', width: 90},
        { field: 'office_name', headerName: 'Office Name', width: 150, editable: true },
        { field: 'office_floor', headerName: 'Office Floor', width: 150, editable: true },
        { field: 'more_data_on_office', headerName: 'More Data on Office', width: 120, editable: true },
        { field: 'building_id', headerName: 'Bulding ID', width: 120},
        ]

    return (
        <>
        {/* Alert */}
        {alert.open && (
            <Alert severity={alert.severity} sx={{ mb: 2 }}>
                {alert.message}
            </Alert>
        )}

         <Paper sx={{ mx: 3, my: 2, p: 3 }}>
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
        </>
    );
}

export default BuildingOffice;