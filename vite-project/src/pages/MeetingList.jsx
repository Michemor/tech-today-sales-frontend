import { useEffect, useState } from "react";
import { getMeetings } from "../services/clientServices";
import Paper from "@mui/material/Paper";
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";


export const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);

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
        { field: 'meeting_id', headerName: 'ID', width: 90, editable: false},
        { field: 'meeting_date', headerName: 'Meeting Date', width: 150, editable: true},
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

            >

            </DataGrid>
            </Paper>
        </>
    )
}