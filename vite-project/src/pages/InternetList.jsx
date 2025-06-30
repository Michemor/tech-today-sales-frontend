import { deleteInternet, getInternet, updateInternet } from "../services/clientServices"
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


export const InternetList = () => {
    const [internetDetails, setInternetDetails] = useState([]);
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
            const response = await deleteInternet(id);
            setInternetDetails(internetDetails.filter((row) => row.internet_id !== id));
            <Alert severity="success">Internet connection deleted successfully</Alert>
            console.log('Internet Conenction Details deleted successfully:', response.message);
        } catch (error){
            console.error('Error in deleting network connection details:', error);
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
            const response = await updateInternet(newRow);
            if (response.success) {
            // Update the local state with the updated data
            <Alert severity="success">Internet Connection Details updated successfully</Alert>
            setInternetDetails(prevInternetDetails => 
                prevInternetDetails.map(internetDetails => 
                    internetDetails.internet_id === newRow.internet_id ? newRow : internetDetails
                )
            );
            return newRow;
        }} catch (error) {
            console.error("Error updating meeting:", error);
            throw error;
        }

    }

    const handleRowModelsChange = (newRowModels) => {
        setRowsModesModel(newRowModels);
    };


    useEffect(() => {
        const fetchInternetDetails = async () => {
            try {
                const data = await getInternet();
                setInternetDetails(data.internet || []);
            } catch (error) {
                console.error("Error fetching internet details:", error);
            }
        };

        fetchInternetDetails();
    }, []);

    const internetColumns = [
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
       <Paper sx={{ 
            m: 2,
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
                    editMode="cell"
                    rowModesModel={rowsModesModel}
                    onRowModesModelChange={handleRowModelsChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => {
                        console.error("Error processing row update:", error);
                        <Alert severity="error">Error updating internet connection details</Alert>
                    }}
                    />
        </Paper>
        </>
    )
}