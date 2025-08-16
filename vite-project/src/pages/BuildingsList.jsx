import { getBuildings } from "../services/officeService";
import {  useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import BuildingOffice from "./BuildingOfficeList";
import Alert from '@mui/material/Alert';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Avatar, CardActions, CardHeader, Divider, Menu, Stack } from "@mui/material";
import { Box, Grid } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import { EditBuildingData } from "../components/EditDataCard";
import { deleteBuilding } from "../services/officeService";
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText }from '@mui/material';

const BuildingCard = ({building, setAlertState }) => {

    const [showBuildingOffices, setShowBuildingOffices] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleToggleOffices = () => {
        setShowBuildingOffices(prev => !prev);

    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMoreActions = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleEdit = () => {
        setEditFormOpen(true);
    }

    const handleEditClose = () => {
        setEditFormOpen(false);
    }

    const handleDeleteClick = () => {
        handleClose()
        setDeleteConfirmOpen(true);
    }

    const handleDeleteCancel = () => {
        setDeleteConfirmOpen(false);
    }


    const handleDeleteConfirm = async () => {
        setDeleteConfirmOpen(false);
        // confirmDialog

        try {
            const response = await deleteBuilding(building.building_id);
            setAlertState({
                open: true,
                message: response,
                severity: "success"
            });
            setTimeout(() => {
                window.location.reload(); // Reload the page to reflect changes
            }, 3000);
        } catch (error) {
            console.log("Error deleting building:", error);
            setAlertState({
                open: true,
                message: "Error deleting building",
                severity: "error"
            });
        }
    }


    return (
        <Card 
        sx={{
            m: 3,
            minWidth: 400,
        }}>
            <CardHeader
                avatar={
                   <Avatar sx={{ 
                        bgcolor: 'primary.main',
                        color: 'white'
                    }}>
                        {building.building_name.charAt(0) || 'B'}
                    </Avatar>
                    
                }
             title={building.building_name} subheader={`Building ID: ${building.building_id}`}/>
            <CardContent>
                <Stack direction="column" spacing={1} justifyContent="center">
                <Typography variant="body2"> {building.access_information.length > 4 ? building.access_information : "No access information provided"} </Typography>
                <Typography variant="body2">
                    {building.ease_of_access === 1 ? 'Easy access' : building.ease_of_access === 2 ? 'Moderate access' : 'Difficult access'}
                     </Typography>
                <Typography variant="body2"> {building.is_fibre_setup == "Yes" ? "Fibre is set up" : "No Fibre"} </Typography>
               <Typography variant="body2">
                  {building.number_offices} offices
               </Typography>
               </Stack>
            </CardContent>
            <CardActions>
                <Stack spacing={2} direction="row" justifyContent="center">
                <Button onClick={handleToggleOffices}>
                    {showBuildingOffices ? "Hide Offices" : "Show Offices"}
                </Button>
                <Button onClick={handleMoreActions} endIcon={<KeyboardArrowDownIcon />}>
                    Actions
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                </Menu>
                <EditBuildingData open={editFormOpen} handleClose={handleEditClose} building={building} name={building.building_name} />
                </Stack>
            </CardActions>
            <Collapse in={showBuildingOffices} timeout="auto" unmountOnExit mountOnEnter>
                <BuildingOffice buildingId={building.building_id} />
            </Collapse>

            <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this building?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button 
                    onClick={handleDeleteConfirm} 
                    color="error"
                    variant="contained"
                    autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}

const Locations = () => {
    const [buildings, setBuildings] = useState([]);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: ""
    });

   useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getBuildings();
            setBuildings(data);
        } catch (error) {
            console.error("Error fetching office data:", error);
            setAlert({
                open: true,
                message: "Error fetching building data",
                severity: "error"
            });
        }
    };

    fetchData();
}, []);

     console.log(buildings);

     // Auto-hide alert after 5 seconds
       useEffect(() => {
        if (alert.open) {
            const timer = setTimeout(() => {
                setAlert(prev => ({ ...prev, open: false }));
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [alert.open]);

    return (
        <>
        {/* Alert for success/error messages */}
        {alert.open && (
            <Alert 
            severity={alert.severity} 
            onClose={() => setAlert(prev => ({ ...prev, open: false }))}
            sx={{ 
                mb: 2,
                position: 'sticky',
                top: 10,
                zIndex: 1000,
                width: '80%',
                margin: '0 auto',
            }}>
                {alert.message}
            </Alert>
        )}
        <Box>
            <Stack direction="row" spacing={1} justifyContent="center">
                <ApartmentIcon 

                sx={{
                    color: 'primary.main',
                    height: 30,
                    width: 30
                }}/>
        <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
                mb: 2, 
                textAlign: 'center', 
                color: 'primary.main',
                fontWeight: 'bold'
                 }}>
                    Buildings
            </Typography>
               </Stack>
            </Box>
            <Box sx={{ 
                display: 'inline-block',
                margin: 'auto',
                }}>
                <Grid container spacing={2}>
                    {buildings.map((building) => (
                        <Grid item xs={12} sm={12} md={6} >
                            <BuildingCard building={{...building}} setAlertState={setAlert} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default Locations