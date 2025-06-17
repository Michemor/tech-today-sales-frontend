import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import FeedbackIcon from '@mui/icons-material/Feedback';



const ConfirmAlert = (onClose, OnConfirm) => {

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = () => {
        OnConfirm();
        onClose();
    };

    return (
        <>
        <Box>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                onClick={(e) => e.stopPropagation()}
            >                    
                <Alert
                icon={<FeedbackIcon />}
                severity="info"
                variant="filled"
                >
                    <Typography variant="h6">Confirm Submission</Typography>
                    <Typography variant="body1">Are you sure you want to submit the form?</Typography>
                    <Button onClick={handleClose} color="primary" variant="contained" sx={{ mr: 2 }}>Cancel</Button>
                    <Button onClick={handleConfirm} color="primary" variant="contained">Yes</Button>
                </Alert>
            </Backdrop> 
        </Box>
        </>
    );
}

export default ConfirmAlert;