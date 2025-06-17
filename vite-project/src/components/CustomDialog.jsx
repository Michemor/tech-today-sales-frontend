import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

const CustomDialog = ({open, onClose, title, content }) => {

    

    return (
        <>
       <Dialog
       onClose={onClose}
       open={open}
       >
        <DialogTitle
        sx={{
            color: 'primary.main',
            textAlign: 'center'
            }}>
                {title}
        </DialogTitle>
        <DialogContent>
            {content}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} autoFocus> OK </Button>
        </DialogActions>
       </Dialog>
        </>
    )
}
export default CustomDialog;