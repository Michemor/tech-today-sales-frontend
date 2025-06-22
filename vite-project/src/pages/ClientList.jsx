import { DataGrid } from "@mui/x-data-grid";
import { getClients } from "../services/clientServices";
import { useEffect, useState } from "react";

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getClients();

            const transformClients = data.clients.map(client => ({
                ...client,
            }));
            setClients(transformClients);
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Client Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone Number', width: 150 },
        { field: 'address', headerName: 'Address', width: 250 },
        { field: 'created_at', headerName: 'Created At', width: 180 },
    ];
    return (
        <>
        <Box>
            <Paper>
                <DataGrid>
                    rows={clients}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    autoHeight
                    disableSelectionOnClick
                </DataGrid>
            </Paper>
        </Box>
        </>
    )
}

export default ClientList