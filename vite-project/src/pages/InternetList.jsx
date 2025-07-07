import { deleteInternet, getInternet, updateInternet } from "../services/clientServices"
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
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


export const InternetList = () => {
    const [internetDetails, setInternetDetails] = useState([]);
    const [rowsModesModel, setRowsModesModel] = useState({});
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: '',
        content: '',
        onConfirm: null
    });
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: ''
    });

    const showAlert = (severity, message) => {
        setAlert({
            open: true,
            severity,
            message
        });
        setTimeout(() => {
            setAlert(prev => ({ ...prev, open: false }));
        }, 3000);
    };

    const showConfirmDialog = (title, content, onConfirm) => {
        setConfirmDialog({
            open: true,
            title,
            content,
            onConfirm
        });
    };

    const handleConfirmClose = () => {
        setConfirmDialog(prev => ({ ...prev, open: false }));
    };

    const handleConfirmAction = () => {
        if (confirmDialog.onConfirm) {
            confirmDialog.onConfirm();
        }
        handleConfirmClose();
    };

            const handleRowEditStop = (params, e) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            e.defaultMuiPrevented = true;
        }
    }

    const handleEditClick = (id) => () => {
        showConfirmDialog(
            'Edit Internet Connection',
            'Are you sure you want to edit this internet connection?',
            () => {
                setRowsModesModel({...rowsModesModel, [id]: {mode: GridRowModes.Edit }});
            }
        );
    }
    const handleSaveClick = (id) => () => {
        setRowsModesModel({...rowsModesModel, [id]: {mode: GridRowModes.View }});
    }
    const handleDeleteClick = (id) => async () => {
        showConfirmDialog(
            'Delete Internet Connection',
            'Are you sure you want to delete this internet connection?',
            async () => {
                try {
                    const response = await deleteInternet(id);
                    setInternetDetails(internetDetails.filter((row) => row.internet_id !== id));
                    showAlert("success", "Internet connection deleted successfully");
                    console.log('Internet Connection Details deleted successfully:', response.message);
                } catch (error){
                    console.error('Error in deleting network connection details:', error);
                    showAlert("error", "Error deleting internet connection");
                }
            }
        );
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
            showAlert("success", "Internet Connection Details updated successfully");
            setInternetDetails(prevInternetDetails => 
                prevInternetDetails.map(internetDetails => 
                    internetDetails.internet_id === newRow.internet_id ? newRow : internetDetails
                )
            );
            return newRow;
        }} catch (error) {
            console.error("Error updating internet connection:", error);
            showAlert("error", "Error updating internet connection");
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
        {/* Alert */}
        {alert.open && (
            <Alert severity={alert.severity} sx={{ mb: 2 }}>
                {alert.message}
            </Alert>
        )}

        {/* Confirmation Dialog */}
        <Dialog
            open={confirmDialog.open}
            onClose={handleConfirmClose}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">
                {confirmDialog.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {confirmDialog.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirmClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirmAction} color="primary" variant="contained" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>

       <Paper elevation={3} sx={{ 
            mx: 2,
            my: 2,
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