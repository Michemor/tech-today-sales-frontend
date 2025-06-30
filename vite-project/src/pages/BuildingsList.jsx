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
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { deleteBuilding, updateBuilding } from "../services/officeService";
import Alert from '@mui/material/Alert';



const Locations = () => {
    const [buildings, setBuildings] = useState([]);
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
                    const response = await deleteBuilding(id);
                    setBuildings(buildings.filter((row) => row.building_id !== id));
                    <Alert severity="success">Building Details deleted successfully</Alert>
                    console.log('Building Details deleted successfully:', response.message);
                } catch (error){
                    console.error('Error in deleting building:', error);
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
                    const response = await updateBuilding(newRow);
                    if (response.success) {
                    // Update the local state with the updated data
                    <Alert severity="success">Building Details updated successfully</Alert>
                    setBuildings(prevBuildings => 
                        prevBuildings.map(building => 
                            building.building_id === newRow.building_id ? newRow : building
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
    { field: 'building_id', headerName: 'ID', width: 90 },
    { field: 'building_name', headerName: 'Building Name', width: 150 },
    { field: 'number_offices', headerName: 'Number of Offices', width: 150 },
    { field: 'is_fibre_setup', headerName: 'Is Fibre Setup', width: 120 },
    { field: 'ease_of_access', headerName: 'Ease of Access', width: 120 },
    { field: 'access_information', headerName: 'Access Information', width: 200 }
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
                editMode="cell"
                rowModesModel={rowsModesModel}
                onRowModesModelChange={handleRowModelsChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => {
                    console.error('Error updating building:', error);
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