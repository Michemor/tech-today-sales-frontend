import { updateBuilding, updateOffice } from "../services/officeService";
import { useState } from "react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button, Box, TextField }  from "@mui/material";
  


export const EditBuildingData = ({ open, handleClose, name, building }) => {

    const [modBuilding, setModBuilding] = useState({
        building_name: building.building_name,
        access_information: building.access_information,
        number_offices: building.number_offices,
        ease_of_access: building.ease_of_access,
        is_fibre_setup: building.is_fibre_setup
    });

    const [loading, setLoading] = useState(false);

      // Update the building object when the form is submitted
      const handleSave = async () => {
                setLoading(true);
        // Call a function to save the updated building data
        try { 
          const response = await updateBuilding(building.building_id, modBuilding);
          console.log(response.message)
          handleClose();
          // window.location.reload(); // Reload the page to reflect changes
          return response.message;
        } catch (error) {
            console.error("Error updating building:", error);
            setLoading(false);
            throw error;
        } finally {
          setLoading(false);
        }
      };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit {name} </DialogTitle>
      <DialogContent>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin='dense'
          fullWidth
          autoFocus
          defaultValue={building.building_name}
          label="Building Name"
          onChange={(e) => {
            setModBuilding({ ...modBuilding, building_name: e.target.value });
          }}
        />
        <TextField
          margin='dense'
          fullWidth
          autoFocus
          multiline
          label="Access Information"
          rows={3}
          defaultValue={building.access_information}
          onChange={(e) => {
            setModBuilding({ ...modBuilding, access_information: e.target.value });
          }}
        />
        <TextField
          margin='dense'
          fullWidth
          autoFocus
          defaultValue={building.number_offices}
          label="Number of offices"
          onChange={(e) => {
            setModBuilding({ ...modBuilding, number_offices: e.target.value });
          }}
        />
        <TextField
          margin='dense'
          fullWidth
          autoFocus
          label="Set access between 1 and 3"
          type="number"
          defaultValue={building.ease_of_access}
          slotProps={{
           input: {
             min: 1,
             max: 3
           }
          }}
          onChange={(e) => {
            setModBuilding({ ...modBuilding, ease_of_access: e.target.value });
          }}
        />
        <TextField
          margin='dense'
          fullWidth
          autoFocus
          label="Is Fibre Setup? (Yes/No)"
          helperText="Please enter Yes or No"
          defaultValue={building.is_fibre_setup}
          onChange={(e) => {
            setModBuilding({ ...modBuilding, is_fibre_setup: e.target.value });
          }}
        />
      </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
      {loading && <CircularProgress sx={{ 
        color: 'primary.main',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}/>}
    </Dialog>
  );
};

export const EditOfficeData = ({ open, handleClose, office }) => {

    const [modOffice, setModOffice] = useState({
        office_name: office.office_name,
        industry_category: office.industry_category,
        staff_number: office.staff_number,
        office_floor: office.office_floor,
        more_data_on_office: office.more_data_on_office
    });

    const [loading, setLoading] = useState(false);

      // Update the building object when the form is submitted
      const handleSave = async () => {
        // Call a function to save the updated building data
        setLoading(true);
        try {
          const response = await updateOffice(office.office_id, modOffice);
          console.log(response.message);
          handleClose();
          // window.location.reload(); // Reload the page to reflect changes
          return response.message;
        } catch (error) {
          console.error("Error updating office:", error);
          setLoading(false);
          throw error;
        } finally {
          setLoading(false);
        }
      };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit {name} </DialogTitle>
      <DialogContent>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin='dense'
          fullWidth
          label="Office Name"
          autoFocus
          defaultValue={office.office_name}
          onChange={(e) => {
            setModOffice({ ...modOffice, office_name: e.target.value });
          }}
        />
        <TextField
          margin='dense'
          fullWidth
          autoFocus
          label="More Data on Office"
          multiline
          rows={3}
          defaultValue={office.more_data_on_office}
          onChange={(e) => {
            setModOffice({ ...modOffice, more_data_on_office: e.target.value });
          }}
        />
        <TextField
          margin='dense'
          fullWidth
          autoFocus
          label="Office Floor"
          defaultValue={office.office_floor}
          onChange={(e) => {
            setModOffice({ ...modOffice, office_floor: e.target.value });
          }}
        />
        <TextField
          margin='dense'
          fullWidth
          autoFocus
          label="Number of staff"
          type="number"
          defaultValue={office.staff_number}
          slotProps={{
           input: {
             min: 1,
             max: 3
           }
          }}
          onChange={(e) => {
            setModOffice({ ...modOffice, staff_number: e.target.value });
          }}
        />
        <TextField
          margin='dense'
          fullWidth
          autoFocus
          label="Industry Category"
          helperText="Please enter the industry category"
          defaultValue={office.industry_category}
          onChange={(e) => {
            setModOffice({ ...modOffice, industry_category: e.target.value });
          }}
        />
      </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
      {loading && <CircularProgress sx={{ 
        color: 'primary.main',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}/>}
    </Dialog>
  );
};