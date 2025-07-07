import Box from "@mui/material/Box";
import { useState } from "react";
import { OfficeDetailForm } from "../components/officeDetailForm";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Collapse from "@mui/material/Collapse";
import { sendClientData } from "../services/clientServices";
import { useCallback } from "react";
import { ClientDetailsForm } from "../components/clientDetailsForm";
import { MeetingDetailsForm } from "../components/meetingDetailsForm";
import { InternetDetailsForm } from "../components/internetDetailsForm";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

export const ClientData = () => {

    const navigate = useNavigate();
    const getToday = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    };

     const [clientDetails, setClientDetails] = useState({
    client_name: '',
    client_email: '',
    contact: '',
    job: '',
    deal_info: '',
  });

  const [meetingDetails, setMeetingDetails] = useState({
    meetingDate: getToday(),
    meetingLocation: '',
    meetingRemarks: '',
    meetingType: '',
    meetingStatus: '',
  });

  const [officeDetails, setOfficeDetails] = useState({
    office_name: '',
    number_staff: 0,
    industry: '',
  });

  const [internetDetails, setInternetDetails] = useState({
    is_connected: 'false',
    isp_name: '',
    net_price: '',
    connection_type: '',
    product: '',
    deal_status: '',
  });


  const [value, setValue] = useState('1');
  const handleNext = useCallback(() => {
      if (!clientDetails.client_name || !clientDetails.client_email || !meetingDetails.meetingLocation || !officeDetails.office_name) {
        alert('Please fill all required fields in Section 1 before proceeding to Section 2.');
        return;
      }
      if (!meetingDetails.meetingDate) {
        alert('Please select a meeting date.');
        return;
      }
      if (!officeDetails.industry) {
        alert('Please select an industry for the office details.');
        return;
    } else {
          setValue((prev) => (prev === '1' ? '2' : '1'));
    }
  }, [clientDetails, meetingDetails, officeDetails]);


  const handleSubmit = async (e) => {

    e.preventDefault();
    // send data to backend
    try {
      const data = {
        ...clientDetails,
        ...meetingDetails,
        ...officeDetails,
        ...internetDetails,
      }
      const response = await sendClientData(data);

      if (response.success) {
        alert('Data submitted successfully!: ', response.message);
      } else {
        alert('Failed to submit data. Please try again: ', response.message);
        console.log('Response:', response);
        return;
      }
      
    } catch (error) {
      console.log('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
      return;
    } finally {
      // Reset the form fields after submission
      setClientDetails({
        client_name: '',
        client_email: '',
        contact: '',
        job: '',
        deal_info: '',
      });
      setMeetingDetails({
        meetingDate: getToday(),
        meetingLocation: '',
        meetingRemarks: '',
        meetingType: '',
        meetingStatus: '',
      });
      setOfficeDetails({
        office_name: '',
        number_staff: 0,
        industry: '',
      });

      setInternetDetails({
        is_connected: 'false',
        isp_name: '',
        net_price: '',
        connection_type: '',
        product: '',
        deal_status: '',
      });
      
      <Dialog
      open={true}
      
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Navigate to the Buildings Form to enter the details of the site.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/locationform')} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      // Reset to first tab
    }

  }

  return (
    <>
     <Box 
     component='form'
     onSubmit={handleSubmit}
     >
      <Tabs
      value={value}
      onChange={() => handleNext()}
      sx={{ m: 3 }}
      centered
      >
      <Tab label="Section 1" value="1"/>
      <Tab label="Section 2" value="2"/>
      </Tabs>

      <Collapse in={value === '1'} mountOnEnter unmountOnExit>
        <ClientDetailsForm
        clientDetails={clientDetails}
        setClientDetails={setClientDetails}/>

        <MeetingDetailsForm
        meetingDetails={meetingDetails}
        setMeetingDetails={setMeetingDetails}/>

        <OfficeDetailForm
        officeDetails={officeDetails}
        setOfficeDetails={setOfficeDetails}/>

        <Button
        onClick={handleNext}
        variant="contained"
        sx={{ 
          width: '30%',
          margin: ' 0 auto',
          display: 'block',
        }}
        > Next
        </Button>
        </Collapse>

        <Collapse in={value === '2'} mountOnEnter unmountOnExit>
      <InternetDetailsForm internetDetails={internetDetails}
      setInternetDetails={setInternetDetails} />
        </Collapse>

        <Button onClick={handleSubmit} disabled={value === '1'} variant="contained" sx={{
      width: '30%',
      margin: '0 auto',
      display: 'block',
      mt: 3,
      mb: 3,}}> 
      Submit
     </Button>
     </Box>
    </>
  );
};



export default ClientData;
