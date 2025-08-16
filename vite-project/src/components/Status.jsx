import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { getCount } from "../services/clientServices"; // Adjust the import path as necessary
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router";
import PendingIcon from '@mui/icons-material/Pending';


const StatCard = ({ title, value, icon }) => (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 3, boxShadow: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
        </Box>
        <Box sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            color: 'secondary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid secondary.main',
        }}>
            {icon}
        </Box>
    </Card>
);


export const StatusCard = () => {
    const [client_count, setClientCount] = useState(0);
    const [meeting_count, setMeetingCount] = useState(0);
    const [deal_status, setDealStatus] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const count = await getCount();
                console.log("Fetched Count Data:", count);
                setClientCount(count.data.client_count);
                setMeetingCount(count.data.meeting_count);
                setDealStatus(count.data.deal_status);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    console.log("Client Count:", client_count);
    console.log("Meeting Count:", meeting_count);

    const cardData = [
        { title: "Potential Clients", value: client_count, icon: <PeopleIcon sx={{ color: 'secondary.main' }} onClick={() => navigate('/clients')} /> },
        { title: "Scheduled Meetings", value: meeting_count, icon: <ListAltIcon sx={{ color: 'secondary.main' }} onClick={() => navigate('/clients')} /> },
        { title: "Deal Status: Pending", value: deal_status, icon: <PendingIcon sx={{ color: 'secondary.main' }} onClick={() => navigate('/clients')} /> },
    ];

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {cardData.map((data, index) => (
                <Grid item xs={12} sm={6} lg={2.4} key={index}>
                    <StatCard title={data.title} value={data.value} icon={data.icon} />
                </Grid>
            ))}
        </Grid>
    );
}