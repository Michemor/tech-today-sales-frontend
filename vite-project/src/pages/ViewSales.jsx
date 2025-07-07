import { useState, useEffect } from "react";
import { getSalesData } from "../services/salesServices";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { getClients } from "../services/clientServices";


export const ViewSales = () => {

    // fetching client details first

    const [clients, setClients] = useState([]);

    useEffect(() => {
        const getClients = await getClients();
        
    }, []);
    

    return(
        <>
        <Paper
        elevation={3}
        sx = {{
            padding: 2,
            mx: 2,
            my: 2,
        }}
        >
            <Typography variant="h4" gutterBottom sx={{
                textAlign: 'center',
                marginBottom: 2,
                color: 'primary.main',
            }}>
                Sales overview
            </Typography>
            <Divider/>
            <Card sx={{ display: 'flex' }}>
            </Card>
        </Paper>
        </>
    )
}