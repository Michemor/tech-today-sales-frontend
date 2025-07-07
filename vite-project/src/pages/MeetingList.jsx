import { useEffect, useState } from "react";
import { deleteMeeting, getMeetings, updateMeeting } from "../services/clientServices";
import Paper from "@mui/material/Paper";
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from "@mui/material/Alert";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from "@mui/material/Button";

export const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);
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
            'Edit Meeting',
            'Are you sure you want to edit this meeting?',
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
            'Delete Meeting',
            'Are you sure you want to delete this meeting?',
            async () => {
                try {
                    const response = await deleteMeeting(id);
                    setMeetings( meetings.filter((row) => row.meeting_id !== id));
                    showAlert("success", "Meeting deleted successfully");
                    console.log('Meeting deleted successfully:', response.message);
                } catch (error){
                    console.error('Error in deleting meeting:', error);
                    showAlert("error", "Error deleting meeting");
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
            const response = await updateMeeting(newRow);
            if (response.success) {
            // Update the local state with the updated data
            showAlert("success", "Meeting updated successfully");
            setMeetings(prevMeetings => 
                prevMeetings.map(meeting => 
                    meeting.meeting_id === newRow.meeting_id ? newRow : meeting
                )
            );
            return newRow;
        }} catch (error) {
            console.error("Error updating meeting:", error);
            showAlert("error", "Error updating meeting");
            throw error;
        }

    }

    const handleRowModelsChange = (newRowModels) => {
        setRowsModesModel(newRowModels);
    };

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const data = await getMeetings(); // Adjust the endpoint as needed
                setMeetings(data.meetings || []);
            } catch (error) {
                console.error("Error fetching meetings:", error);
            }
        };

        fetchMeetings();
    }, []);


    const meetingsColumns = [
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
        { field: 'meeting_id', headerName: 'ID', width: 90, editable: false},
        { field: 'meeting_date', headerName: 'Client Name', width: 150, editable: true},
        { field: 'meeting_location', headerName: 'Location', width: 200, editable: true},
        { field: 'meetingtype', headerName: 'Meeting Type', width: 150, editable: true},
        { field: 'meeting_remarks', headerName: 'Meeting Remarks', width: 200, editable: true},
        { field: 'meeting_status', headerName: 'Meeting Status', width: 200, editable: true},
        {field: 'client_id', headerName: 'Client ID', width: 200},
    ];

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
                Meetings List </Typography>
            <DataGrid
            rows={meetings}
            columns={meetingsColumns}
            getRowId={(row) => row?.meeting_id || 'undefined'}
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
                <Alert severity="error">Error updating meeting: {error.message}</Alert>
            }}
            >

            </DataGrid>
            </Paper>
        </>
    )
}