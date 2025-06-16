import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const CustomCard = ({ title, message, icon, onClick }) => {
    return (
        <Card  sx={{
            width: 300,
            height: 200,
            boxShadow: 3,
        }}   onClick={onClick}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                {icon}
                <Typography variant="body2">{message}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="inherit" sx={{
                    backgroundColor: 'primary.light',
                    color: '#fff',
                }} onClick={onClick}>
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}

export default CustomCard;