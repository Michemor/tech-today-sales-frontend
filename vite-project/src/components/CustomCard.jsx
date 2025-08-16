import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";


const CustomCard = ({ title, message, icon, onClick }) => {
    return (
        <Card  sx={{
            width: 300,
            minHeight: 100,
            height: 'auto',
            boxShadow: 3,
            transform: 'translateY(0)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                },
            display: 'flex',
            flexDirection: 'column',
        }}   onClick={onClick}>
            <CardContent sx={{
                position: 'relative',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                pb: 1
            }}>
                 {icon}
                <Typography variant="h6" sx={{
                    position: 'absolute',
                    top: 16,
                    left: 60,
                    color: 'primary.main',
                    fontWeight: 'bold',
                }}>{title}</Typography>
                <Divider sx={{ mt: 2 }} />
                <Typography variant="body2" sx={{
                    mt: 4,
                    flex: 1}}>{message}</Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    );
}

export default CustomCard;