import { useEffect, useState } from "react";
import { deleteMeeting, getMeetings } from "../services/clientServices";
import Paper from "@mui/material/Paper";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import { UpdateMeeting } from "../utils/UpdateMeeting";

const EditToolbar = ({selectedRow, handleDelete, onUpdate}) => {

    return (
        <GridToolbarContainer>
            <Button
                color="error"
                onClick={() => handleDelete(selectedRow)}
                startIcon={<DeleteIcon />}
                disabled={!selectedRow}
            >
                Delete Selected Row
            </Button>
            <Button
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => {onUpdate(selectedRow)}}
                disabled={!selectedRow}
                >
                    Update
                </Button>
        </GridToolbarContainer>
    );
};

export const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success'});

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

    const handleRowSelection = (rowId) => {
        setSelectedRow(rowId);
    }

    const onUpdate = (rowId) => {
        if (!rowId) {
            showSnackbar('No row selected for update', 'error');
            return;
        }
        
        return (
            <UpdateMeeting meeting_id={rowId}/>)
    }

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    }

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    }


    const handleDelete = (id) => {

        if(!id) { return;}
        setSelectedId(id);
        setDialogOpen(true);
    }

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteMeeting(selectedId);
            if (response.success) {
                setMeetings((prev) => prev.filter((row) => row.meeting_id !== selectedId));
                console.log("Meeting deleted successfully:", response.message);
                showSnackbar('Meeting deleted successfully');
            }
        } catch (error) {
            console.error("Error deleting meeting:", error);
            showSnackbar('Failed to delete meeting', 'error');
            setDialogOpen(false);
        }
    }

    const meetingsColumns = [
        {field: 'actions', type: 'actions', width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDelete(params.row.meeting_id)}
                />,
            ]},
        { field: 'meeting_id', headerName: 'ID', width: 90, editable: false},
        { field: 'meeting_date', headerName: 'Client Name', width: 150},
        { field: 'meeting_location', headerName: 'Location', width: 200},
        { field: 'meetingtype', headerName: 'Meeting Type', width: 150},
        { field: 'meeting_remarks', headerName: 'Meeting Remarks', width: 200},
        { field: 'meeting_status', headerName: 'Meeting Status', width: 200},
    ];

    return (
        <>
        <Paper sx={{ 
            m: 2,
            padding: 2 
            }}>
                <Stack direction='row'
                justifyContent={'space-between'}
                m={2}
                >
            <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center', color: 'primary.main' }}>
                Meetings List </Typography>
                <Button color="primary" onClick={<UpdateMeeting/>}><EditIcon sx={{
                    mr: 1,
                }}/> Update </Button>
                </Stack>
            <DataGrid
            rows={meetings}
            columns={meetingsColumns}
            getRowId={(row) => row?.meeting_id || 'undefined'}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                },
            }}  
            onRowSelectionModelChange={(newSelection) => {
                handleRowSelection(newSelection[0]);
                }}
            checkboxSelection
            slots={{
                toolbar: EditToolbar
            }}
            slotProps={{
                toolbar: {
                    selectedRow: selectedRow,
                    onUpdate: onUpdate,
                    handleDelete: (id) => handleDelete(id)
                }
            }}
            >

            </DataGrid>
            </Paper>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this meeting?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
                        <Button onClick={handleConfirmDelete} color="primary">Delete</Button>
                    </DialogActions>
                </DialogContent>    
            </Dialog>
            <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}