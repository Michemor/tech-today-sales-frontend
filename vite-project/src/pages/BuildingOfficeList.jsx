import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { deleteOffice, getOffices } from '../services/officeService';
import { Dialog, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';
import List from '@mui/material/List';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import FactoryIcon from '@mui/icons-material/Factory';
import { EditOfficeData } from '../components/EditDataCard';
import Button from '@mui/material/Button';
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const BuildingOffice = ({buildingId }) => {

    console.log("Reached offices");

    const [offices, setOffices] = useState([]);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteOfficeId, setDeleteOfficeId] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleCloseEditForm = () => {
        setEditFormOpen(false);
    }

    const handleEditOffice = () => {
        setEditFormOpen(true);
    }

    const handleConfirmDelete = ({officeId}) => {
        setDeleteOfficeId(officeId);
        setDeleteDialog(true);
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialog(false);
    }

        useEffect(() => {
            const fetchData = async () => {
                try{
                    const data = await getOffices(buildingId);
                    setOffices(data.offices);

                } catch (error) {
                    console.error("Error fetching office data:", error);
                }
            }

            fetchData();
        }, [buildingId]);
    
    const handleDeleteOffice = async () => {

        setLoading(true);

        if (deleteOfficeId) {
            try {
                const response = await deleteOffice(deleteOfficeId);
                if (response) {
                    console.log("Office deleted successfully:", response);
                    setOffices(prev => prev.filter(office => office.id !== deleteOfficeId));
                    setDeleteDialog(false);
                    setTimeout(() => {
                        window.location.reload(); // Reload the page to reflect changes
                    }, 3000);
                }
            } catch (error) {
                console.error("Error deleting office:", error);
            } finally {
                setLoading(false);
            }
        }
    }


    return (
        <>
       <Box sx={{ 
            p: 2, 
            m: 2,
            backgroundColor: 'background.paper', 
            boxShadow: 2 }}>
                <Typography sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    color: 'primary.main',
                    mb: 2
                }}> Office List </Typography>
                <Divider/>
                {offices.length > 0 ? (
                    <List>
                        {offices.map((office) => (
                            <ListItem key={office.id} sx={{

                                borderBottom: '1px solid',

                                borderColor: 'divider',
                                '&:last-child': {
                                    borderBottom: 'none',
                                },
                            }}>
                                <Stack>
                                    <ListItemText sx={{ color: 'primary.main' }} primary={office.office_name}/>
                                     {office.more_data_on_office.length > 4 ? <ListItemText secondary={`${office.more_data_on_office}`} /> : null}
                                      <ListItemText secondary={
                                        <Box>
                                          <FactoryIcon sx={{ height: 17, width: 17, mr: 0.5, mt: 0.5 }}/>
                                          <span>{office.industry_category}</span>
                                        </Box>
                                      } />
                                      <ListItemText secondary={`${office.staff_number} staff`} />
                                    <ListItemText secondary={`${office.office_floor}${
                                        office.office_floor === 1 ? 'st' :
                                        office.office_floor === 2 ? 'nd' :
                                        office.office_floor === 3 ? 'rd' :
                                        'th'} floor
                                    `} />
                                    <Stack direction="row">
                                    <ListItemButton component='a' sx={{
                                        color: "primary.main",
                                        borderRadius: 1,
                                        border: '1px solid primary.main'
                                    }}
                                    onClick={handleEditOffice}
                                    >
                                                <ListItemText primary='Edit' sx={{
                                                    textAlign: 'center',
                                                    color: 'primary.main'
                                                }}/>
                                    </ListItemButton>
                                    <ListItemButton component='a' onClick={handleConfirmDelete}>
                                                <ListItemText primary='Delete' sx={{
                                                    textAlign: 'center',
                                                    color: 'primary.main'
                                                }} />
                                    </ListItemButton>
                                        </Stack>
                                </Stack>  
                                <EditOfficeData open={editFormOpen} office={office} handleClose={handleCloseEditForm} />

                            </ListItem>
                            
                        )
                        )} 
                    </List>
                ) : (
                    <Typography variant="body2">No offices found for this building.</Typography>
                )}

                {/** Dialog to handle deleting confirmation */}
                <Dialog open={deleteDialog} onClose={handleCloseDeleteDialog}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this building?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button 
                    onClick={() => handleDeleteOffice} 
                    color="error"
                    variant="contained"
                    autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>   
                {loading && <CircularProgress sx={{
                    color: 'primary.main',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }} />}

                </Dialog>
       </Box>
      </>  
    );
}

export default BuildingOffice;