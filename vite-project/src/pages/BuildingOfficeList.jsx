import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteOffice, getOffices, updateOffice } from '../services/officeService';
import Alert from '@mui/material/Alert';


const BuildingOffice = () => {

    const [offices, setOffices] = useState([]);
    const [rowsModesModel, setRowsModesModel] = useState({});

    const handleRowEditStop = (params, e) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            e.defaultMuiPrevented = true;
        }
    }
    
        const handleEditClick = (id) => () => {
            setRowsModesModel({...rowsModesModel, [id]: {mode: GridRowModes.Edit }});
        }
        const handleSaveClick = (id) => () => {
            setRowsModesModel({...rowsModesModel, [id]: {mode: GridRowModes.View }});
        }
        const handleDeleteClick = (id) => async () => {
            try {
                const response = await deleteOffice(id);
                setOffices(offices.filter((row) => row.office_id !== id));
                <Alert severity="success">Office deleted successfully</Alert>
                console.log('Office deleted successfully:', response.message);
            } catch (error){
                console.error('Error in deleting office:', error);
            }
        }
    
        const handleCancelClick = (id) => () => {
            setRowsModesModel({...rowsModesModel, [id]: {
                mode: GridRowModes.View, 
                ignoreModifications: true 
            }});
        }
    
        const processRowUpdate = async (newRow) => {
            try {
                const response = await updateOffice(newRow);
                if (response.success) {
                // Update the local state with the updated data
                <Alert severity="success">Office updated successfully</Alert>
                setOffices(prevOffices => 
                    prevOffices.map(office => 
                        office.office_id === newRow.office_id ? newRow : office
                    )
                );
                return newRow;
            }} catch (error) {
                console.error("Error updating office:", error);
                throw error;
            }
    
        }
    
        const handleRowModelsChange = (newRowModels) => {
            setRowsModesModel(newRowModels);
        };

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
             {
                        field: 'actions',
                        type: 'actions',
                        headerName: 'Actions',
                        width: 100,
                        cellClassName: 'actions',
                        getActions: ({ id }) => {
                            const isInEditMode = rowsModesModel[id]?.mode === GridRowModes.Edit;
            
                            if (isInEditMode) {
                                return [
                                    <GridActionsCellItem
                                        icon={<SaveIcon />}
                                        label="Save"
                                        sx={{ color: 'primary.main' }}
                                        onClick={handleSaveClick(id)}
                                    />,
                                    <GridActionsCellItem
                                        icon={<CancelIcon />}
                                        label="Cancel"
                                        className="textPrimary"
                                        onClick={handleCancelClick(id)}
                                        color="inherit"
                                    />,
                                ];
                            }
            
                            return [
                                <GridActionsCellItem
                                    icon={<EditIcon />}
                                    label="Edit"
                                    className="textPrimary"
                                    onClick={handleEditClick(id)}
                                    color="inherit"
                                />,
                                <GridActionsCellItem
                                    icon={<DeleteIcon />}
                                    label="Delete"
                                    onClick={handleDeleteClick(id)}
                                    color="inherit"
                                />,
                            ];
                        },
                    },
        { field: 'office_id', headerName: 'ID', width: 90},
        { field: 'office_name', headerName: 'Office Name', width: 150, editable: true },
        { field: 'office_floor', headerName: 'Office Floor', width: 150, editable: true },
        { field: 'more_data_on_office', headerName: 'More Data on Office', width: 120, editable: true },
        { field: 'building_id', headerName: 'Bulding ID', width: 120},
        ]

    return (
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
                editMode='cell'
                onRowModesModelChange={handleRowModelsChange}
                rowModesModel={rowsModesModel}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => {
                    console.error('Error updating office:', error);
                    <Alert severity="error">Error updating office: {error.message}</Alert>
                }}
                pageSizeOptions={[5, 10, 25]}
            />
        </Paper>
    );
}

export default BuildingOffice;