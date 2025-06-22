import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import FeedbackIcon from '@mui/icons-material/Feedback';
import Divider from "@mui/material/Divider";



const ConfirmAlert = (title, content , open, handleClose) => {

    return (
        <>
        <Box>                   
                <Alert
                open={open}
                onClose={handleClose}
                icon={<FeedbackIcon />}
                severity="info"
                variant="filled"
                >
                    <Typography variant="h6"> {title} </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1"> {content} </Typography>
                    <Button onClick={handleClose} color="primary" variant="contained" sx={{ mr: 2 }}> OK </Button>
                </Alert>
        </Box>
        </>
    );
}

export default ConfirmAlert;