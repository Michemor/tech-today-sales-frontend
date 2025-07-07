import { useEffect, useState } from "react";
import { getOffices } from "../services/clientServices";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import { updateOffice } from "../services/clientServices";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteOffice } from "../services/clientServices";
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from "@mui/material/Button";


export const OfficeList = () => {
    const [offices, setOffices] = useState([]);
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
                'Edit Office',
                'Are you sure you want to edit this office?',
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
                'Delete Office',
                'Are you sure you want to delete this office?',
                async () => {
                    try {
                        const response = await deleteOffice(id);
                        setOffices(offices.filter((row) => row.office_id !== id));
                        showAlert("success", "Office deleted successfully");
                        console.log('Office deleted successfully:', response.message);
                    } catch (error){
                        console.error('Error in deleting office:', error);
                        showAlert("error", "Error deleting office");
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
                const response = await updateOffice(newRow);
                if (response.success) {
                // Update the local state with the updated data
                showAlert("success", "Office updated successfully");
                setOffices(prevOffices => 
                    prevOffices.map(office => 
                        office.office_id === newRow.office_id ? newRow : office
                    )
                );
                return newRow;
            }} catch (error) {
                console.error("Error updating office:", error);
                showAlert("error", "Error updating office");
                throw error;
            }

        }
    
        const handleRowModelsChange = (newRowModels) => {
            setRowsModesModel(newRowModels);
        };
    
    
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
        { field: 'office_id', headerName: 'ID', width: 90 },
        { field: 'office_name', headerName: 'Office Name', width: 150 },
        { field: 'staff_number', headerName: 'Office Floor', width: 150 },
        { field: 'industry_category', headerName: 'More Data on Office', width: 200 },
        { field: 'client_id', headerName: 'Client ID', width: 200 },
    ]

    return (
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
                editMode="cell"
                rowModesModel={rowsModesModel}
                onRowModesModelChange={handleRowModelsChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => {
                    <Alert severity="error">Error updating office: {error.message}</Alert>
                }}
            />
        </Paper>
        </>
    );

}