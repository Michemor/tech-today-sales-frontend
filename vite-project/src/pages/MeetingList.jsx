import { useEffect, useState } from "react";
import { deleteMeeting, getMeetings, updateMeeting } from "../services/clientServices";
import Paper from "@mui/material/Paper";
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import { UpdateMeeting } from "../utils/UpdateMeeting";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);
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
            const response = await deleteMeeting(id);
            setMeetings( meetings.filter((row) => row.meeting_id !== id));
            <Alert severity="success">Meeting deleted successfully</Alert>
            console.log('Meeting deleted successfully:', response.message);
        } catch (error){
            console.error('Error in deleting meeting:', error);
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
            const response = await updateMeeting(newRow);
            if (response.success) {
            // Update the local state with the updated data
            <Alert severity="success">Meeting updated successfully</Alert>
            setMeetings(prevMeetings => 
                prevMeetings.map(meeting => 
                    meeting.meeting_id === newRow.meeting_id ? newRow : meeting
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