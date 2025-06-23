import { useEffect, useState } from "react";
import { getMeetings } from "../services/clientServices";
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";


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
        { field: 'meeting_id', headerName: 'ID', width: 90 },
        { field: 'meeting_date', headerName: 'Client Name', width: 150 },
        { field: 'meeting_location', headerName: 'Location', width: 200 },
        { field: 'meetingtype', headerName: 'Meeting Time', width: 150 },
        { field: 'meeting_remarks', headerName: 'Notes', width: 200 },
        { field: 'meeting_status', headerName: 'Notes', width: 200 },
    ];

    return (
        <>
        <Paper sx={{ width: '100%', height: 400, marginTop: 2, padding: 2 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center', color: 'primary.main' }}>
                Meetings List </Typography>
            <DataGrid
            rows={meetings || []}
            columns={meetingsColumns}
            getRowId={(row) => row.meeting_id}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                },
            }}  >

            </DataGrid>
            </Paper>
        </>
    )
}