import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import { getClients, updateClient } from "../services/clientServices";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MeetingList } from "./MeetingList";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Collapse from "@mui/material/Collapse";
import { OfficeList } from "./OfficeList";
import { InternetList } from "./InternetList";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteClient } from "../services/clientServices";
import Alert from '@mui/material/Alert';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [value, setValue] = useState('1'); 
    const [rowModelsMode, setRowModelsMode] = useState({});

    const handleRowEditStop = (params, e) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            e.defaultMuiPrevented = true;
        }
    }

    const handleEditClick = (id) => () => {
        setRowModelsMode({...rowModelsMode, [id]: {mode: GridRowModes.Edit }});
    }
    const handleSaveClick = (id) => () => {
        setRowModelsMode({...rowModelsMode, [id]: {mode: GridRowModes.View }});
    }
    const handleDeleteClick = (id) => async () => {
        try {
            const response = await deleteClient(id);
            setClients( clients.filter((row) => row.client_id !== id));
            <Alert severity="success">Client deleted successfully</Alert>
            console.log('Client deleted successfully:', response.message);
        } catch (error){
            console.error('Error in deleting client:', error);
        }
    }

    const handleCancelClick = (id) => () => {
        setRowModelsMode({...rowModelsMode, [id]: {
            mode: GridRowModes.View, 
            ignoreModifications: true 
        }});
    }

    const processRowUpdate = async (newRow) => {
        try {
            const response = await updateClient(newRow);
            if (response.success) {
            // Update the local state with the updated data
            <Alert severity="success">Client updated successfully</Alert>
            setClients(prevClients => 
                prevClients.map(client => 
                    client.client_id === newRow.client_id ? newRow : client
                )
            );
            return newRow;
        }} catch (error) {
            console.error("Error updating client:", error);
            throw error;
        }

    }

    const handleRowModelsChange = (newRowModels) => {
        setRowModelsMode(newRowModels);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClients();
                const transformedClients = data.clients.map(client => ({
                    ...client,
                    id: client.client_id, // Ensure the id field is set correctly    
                }));
                setClients(transformedClients);
            } catch (error) {
                console.error("Failed to fetch clients data: ", error);
                setClients([]);
            }
        };
        fetchData();
    }, []);

    const clientColumns = [
         {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModelsMode[id]?.mode === GridRowModes.Edit;

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
       {field: 'client_id', headerName: 'ID', width: 90},
       {field: 'client_name', headerName: 'Client Name', width: 150, editable: true},
       {field: 'client_email', headerName: 'Client Email', width: 200, editable: true},
       {field: 'client_contact', headerName: 'Client Contact', width: 150, editable: true},
       {field: 'job_title', headerName: 'Job Title', width: 150, editable: true},
       {field: 'deal_information', headerName: 'Deal Information', width: 150, editable: true},
       {field: 'timestamp', headerName: 'Created At', width: 150,},
    ];
    return (
        <>
        <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Clients" value='1'/>
                <Tab label="Meetings" value='2'/>
                <Tab label="Offices" value='3'/>
                <Tab label="Internet" value='4'/>
            </Tabs>
        <Box>
            <Collapse in={value === '1'} timeout="auto" unmountOnExit>
            <Paper sx={{
            m: 2,
            padding: 2 
            }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center', color: 'primary.main' }}>
                    Clients List    </Typography>
                <DataGrid
                    rows={clients || []}
                    columns={clientColumns}
                    getRowId={(row) => row.client_id}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    editMode="cell"
                    rowModesModel={rowModelsMode}
                    onRowModesModelChange={handleRowModelsChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => {
                        console.error("Error processing row update:", error);
                    }}
                    density="comfortable"
                    pageSizeOptions={[5, 10, 20]}>
                </DataGrid>
            </Paper>
            </Collapse>
        </Box>

        <Collapse in={value === '2'} mountOnEnter unmountOnExit>
        <MeetingList />
        </Collapse>

        <Collapse in={value === '3'} mountOnEnter unmountOnExit>
        <OfficeList/>
            </Collapse>

        <Collapse in={value === '4'} mountOnEnter unmountOnExit>
        <InternetList />
            </Collapse>
        </>
    )
}

export default ClientList