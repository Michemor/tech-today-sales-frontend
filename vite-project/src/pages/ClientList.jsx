import { DataGrid } from "@mui/x-data-grid";
import { getClients } from "../services/clientServices";
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


const ClientList = () => {
    const [clients, setClients] = useState([]);

    const [value, setValue] = useState('1'); 

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
       {field: 'client_id', headerName: 'ID', width: 90},
       {field: 'client_name', headerName: 'Client Name', width: 150},
       {field: 'client_email', headerName: 'Client Email', width: 200},
       {field: 'client_contact', headerName: 'Client Contact', width: 150},
       {field: 'job_title', headerName: 'Job Title', width: 150},
       {field: 'deal_information', headerName: 'Deal Information', width: 150},
       {field: 'timestamp', headerName: 'Created At', width: 150},
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
            <Paper>
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