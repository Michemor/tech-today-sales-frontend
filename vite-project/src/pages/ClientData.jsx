import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import { sendClientData } from "../services/clientServices";
import CustomDialog from "../components/CustomDialog";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";

const ClientData = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [clientDetails, setClientDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    job_title: "",
  });

  const handleClientDetailsChange = useCallback((e) => {
    const { name, value } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }, []);

  const [step1Complete, setStep1Complete] = useState(false);
  useEffect(() => {
    setStep1Complete(
      clientDetails.first_name !== "" &&
        clientDetails.last_name !== "" &&
        clientDetails.email !== "" &&
        clientDetails.contact_number !== "" &&
        clientDetails.job_title !== ""
    );
  }, [clientDetails]);

  // State to hold meeting details
  const getDateToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [meetingDetails, setMeetingDetails] = useState({
    meeting_date: getDateToday(),
    meeting_location: "",
    meeting_remarks: "",
    meeting_status: "",
  });

  const handleMeetingDetailChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const [step2Complete, setStep2Complete] = useState(false);
  useEffect(() => {
    setStep2Complete(
      meetingDetails.meeting_date !== "" &&
        meetingDetails.meeting_location !== "" &&
        meetingDetails.meeting_remarks !== "" &&
        meetingDetails.meeting_status !== ""
    );
  }, [meetingDetails]);

  const [officeDetails, setOfficeDetails] = useState({
    office_name: "",
    number_staff: 0,
    industry_category: "",
  });

  const handleOfficeDetailsChange = useCallback((e) => {
    const { name, value } = e.target;
    setOfficeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }, []);

  const [step3Complete, setStep3Complete] = useState(false);
  useEffect(() => {
    setStep3Complete(
      officeDetails.office_name !== "" &&
        officeDetails.number_staff !== "" &&
        officeDetails.industry_category !== ""
    );
  }, [officeDetails]);

  // show internet details section based in internet connection status
  const [internetConnected, setInternetConnected] = useState("");

  const [internetDetails, setInternetDetails] = useState({
    provider: "",
    internet_price: 0,
    type_of_connection: "",
    extra_net_info: "",
    product: "",
    deal_status: "",
  });
  useEffect(() => {
    if (internetConnected === "No") {
      setInternetConnected("No");
      setInternetDetails({
        provider: "",
        internet_price: 0,
        type_of_connection: "",
        extra_net_info: "",
        product: "",
        deal_status: "",
      });
    } else {
      setInternetDetails((prevDetails) => ({
        ...prevDetails,
        internet_connected: "Yes",
      }));
    }
  }, [internetConnected]);

  const handleInternetDetailsChange = (e) => {
    const { name, value } = e.target;
    setInternetDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to handle provider change based on internet connection status
  /** const handleInternetConnectedChange = (event) => {
        const value = event.target.value;
        setInternetConnected(value);
        if (value === "No") {
            setInternetDetails((prevDetails) => ({
                ...prevDetails,
                provider: "",
                internet_price: 0,
                type_of_connection: "",
                extra_net_info: "",
                product: "",
                deal_status: ""
            }));
    }
}

   */

  const handleNext = () => {
    if (
      !clientDetails.first_name ||
      !clientDetails.last_name ||
      !clientDetails.email ||
      !clientDetails.contact_number ||
      !clientDetails.job_title
    ) {
      setDialogOpen(true);
    } else {
      if (value === "1") {
        setValue("2");
      } else if (value === "2") {
        setValue("3");
      } else if (value === "3") {
        setValue("4");
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can handle the form submission, e.g., send data to an API
    if (
      !clientDetails.first_name ||
      !clientDetails.last_name ||
      !clientDetails.email ||
      !clientDetails.contact_number ||
      !clientDetails.job_title ||
      !meetingDetails.meeting_date ||
      !meetingDetails.meeting_location ||
      !meetingDetails.meeting_remarks ||
      !meetingDetails.meeting_status ||
      !officeDetails.office_name ||
      !officeDetails.number_staff ||
      !officeDetails.industry_category
    ) {
      setDialogOpen(true);
      return;
    } else {
      try {
        setIsSubmitting(true);

        // set information in dictionary
        const salesDetails = {
          client_name: `${clientDetails.first_name} ${clientDetails.last_name}`,
          client_email: clientDetails.email,
          client_contact: clientDetails.contact_number,
          job_title: clientDetails.job_title,
          date: meetingDetails.meeting_date,
          location: meetingDetails.meeting_location,
          remarks: meetingDetails.meeting_remarks,
          status: meetingDetails.meeting_status,
          office_name: officeDetails.office_name,
          staff_number: officeDetails.number_staff,
          industry_category: officeDetails.industry_category,
          isp_connected: internetDetails.internet_connected,
          isp_name: internetDetails.provider,
          net_price: internetDetails.internet_price,
          net_connection_type: internetDetails.type_of_connection,
          deal_information: internetDetails.extra_net_info,
          product: internetDetails.product,
          deal_status: internetDetails.deal_status,
        };
        const success = await sendClientData(salesDetails);
        if (success) {
          // Handle successful submission, e.g., show a success message or redirect
          console.log("Data submitted successfully");

          setClientDetails({
            first_name: "",
            last_name: "",
            email: "",
            contact_number: "",
            job_title: "",
          });
          setMeetingDetails({
            meeting_date: getDateToday(),
            meeting_location: "",
            meeting_remarks: "",
            meeting_status: "",
          });
          setOfficeDetails({
            office_name: "",
            number_staff: 0,
            industry_category: "",
          });
          setInternetDetails({
            provider: "",
            internet_price: 0,
            type_of_connection: "",
            extra_net_info: "",
            product: "",
            deal_status: "",
          });
          setValue("1");

          navigate("/"); // Reset to the first tab
        } else {
          <Snackbar
            open={dialogOpen}
            autoHideDuration={6000}
            onClose={() => setDialogOpen(false)}
            message="Error submitting data"
          />;
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        setDialogOpen(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <CustomDialog
        open={dialogOpen}
        title="Error"
        content="There was an error in submitting the form. Check if fields were empty or try again later"
        onClose={() => setDialogOpen(false)}
      />
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label=" Client Data Tab"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Tab label="Client Details" value="1" />
          <Tab label="Meeting Details" value="2" disabled={!step1Complete} />
          <Tab label="Office Details" value="3" disabled={!step2Complete} />
          <Tab
            label="Internet Information"
            value="4"
            disabled={!step3Complete}
          />
        </Tabs>
        <TabHolder currentValue={value} showValue="1">
          <Paper
            sx={{
              m: 4,
              p: 2,
              display: "flex",
              flexDirection: "column",
              color: "primary.main",
            }}
          >
            <Typography variant="h6">Client Details Section</Typography>
            <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
              <TextField
                label="First Name"
                name="first_name"
                value={clientDetails.first_name.trim()}
                onChange={handleClientDetailsChange}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Last Name"
                name="last_name"
                value={clientDetails.last_name.trim()}
                onChange={handleClientDetailsChange}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
            </Stack>
            <TextField
              type="email"
              label="Email"
              error={
                clientDetails.email !== "" && !clientDetails.email.includes("@")
              }
              helperText={
                clientDetails.email !== "" && !clientDetails.email.includes("@")
                  ? "Please enter a valid email"
                  : ""
              }
              name="email"
              value={clientDetails.email}
              onChange={handleClientDetailsChange}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Contact Number"
              name="contact_number"
              error={
                clientDetails.contact_number !== "" &&
                !/^\d+$/.test(clientDetails.contact_number)
              }
              type="tel"
              value={clientDetails.contact_number}
              onChange={handleClientDetailsChange}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Job Title"
              name="job_title"
              value={clientDetails.job_title}
              onChange={handleClientDetailsChange}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
          </Paper>
          <Button
            sx={{
              width: "30%",
              margin: "0 auto",
              display: "block",
            }}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {" "}
            Next{" "}
          </Button>
        </TabHolder>
        <TabHolder currentValue={value} showValue="2">
          <Paper
            sx={{
              m: 4,
              p: 2,
              display: "flex",
              flexDirection: "column",
              color: "primary.main",
            }}
          >
            <Typography variant="h6"> Meeting Details </Typography>
            <TextField
              required
              type="date"
              name="meeting_date"
              value={meetingDetails.meeting_date}
              onChange={handleMeetingDetailChange}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Meeting Location"
              name="meeting_location"
              value={meetingDetails.meeting_location}
              onChange={handleMeetingDetailChange}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              type="meeting_remarks"
              label="Meeting Remarks"
              name="meeting_remarks"
              value={meetingDetails.meeting_remarks}
              onChange={handleMeetingDetailChange}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
            <Autocomplete
              options={["Scheduled", "Completed", "Cancelled"]}
              name="meeting_status"
              value={meetingDetails.meeting_status}
              onChange={handleMeetingDetailChange}
              renderInput={(params) => (
                <TextField {...params} label="Meeting Status" />
              )}
              fullWidth
              sx={{ mt: 2 }}
            />
          </Paper>
          <Button
            sx={{
              width: "30%",
              margin: "0 auto",
              display: "block",
            }}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {" "}
            Next{" "}
          </Button>
        </TabHolder>
        <TabHolder currentValue={value} showValue="3">
          <Paper
            sx={{
              m: 4,
              p: 2,
              display: "flex",
              flexDirection: "column",
              color: "primary.main",
            }}
          >
            <Typography variant="h6"> Office Details Section</Typography>
            <TextField
              label="Office Name"
              value={officeDetails.office_name}
              onChange={handleOfficeDetailsChange}
              name="office_name"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Number of Staff"
              type="number"
              value={officeDetails.number_staff}
              onChange={handleOfficeDetailsChange}
              error={
                officeDetails.number_staff !== "" ||
                !/^\d+$/.test(officeDetails.number_staff) ||
                officeDetails.number_staff <= 0
              }
              name="number_staff"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
            <Box
              sx={{
                border: 1,
                borderRadius: 1,
                p: 2,
                borderColor: "divider",
                mt: 2,
              }}
            >
              <FormControl>
                <FormLabel id="Industry Category" sx={{ mt: 2 }}>
                  {" "}
                  Industry Category{" "}
                </FormLabel>
                <RadioGroup
                  column
                  value={officeDetails.industry_category}
                  onChange={handleOfficeDetailsChange}
                  sx={{
                    color: "secondary.dark",
                    mt: 2,
                  }}
                >
                  <FormControlLabel
                    value="NGO"
                    control={<Radio />}
                    label="NGO"
                  />
                  <FormControlLabel
                    value="Manufacturing Industries"
                    control={<Radio />}
                    label="Manufacturing Industries"
                  />
                  <FormControlLabel
                    value="Bank"
                    control={<Radio />}
                    label="Bank"
                  />
                  <FormControlLabel
                    value="Hospitals"
                    control={<Radio />}
                    label="Hospitals"
                  />
                  <FormControlLabel
                    sx={{ color: "secondary.light" }}
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Paper>
          <Button
            sx={{
              width: "30%",
              margin: "0 auto",
              display: "block",
            }}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {" "}
            Next{" "}
          </Button>
        </TabHolder>

        <TabHolder currentValue={value} showValue="4">
          <Paper
            sx={{
              m: 4,
              p: 2,
              display: "flex",
              flexDirection: "column",
              color: "primary.main",
            }}
          >
            <Typography variant="h6"> Internet Information Section</Typography>
            <Stack spacing={2} direction="column" sx={{ mb: 2 }}>
              <FormControl
                sx={{
                  border: 1,
                  borderRadius: 1,
                  borderColor: "secondary.dark",
                  p: 2,
                  mt: 2,
                }}
              >
                <FormLabel id="internet-connected">
                  {" "}
                  Does the client have an existing internet connection?{" "}
                </FormLabel>
                <RadioGroup
                  value={internetDetails.internet_connected}
                  onChange={handleInternetDetailsChange}
                  sx={{
                    color: "secondary.dark",
                    mt: 2,
                  }}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              <Collapse in={internetDetails.internet_connected === "Yes"}>
                <Paper
                  id="net-section-two"
                  sx={{
                    border: 1,
                    borderRadius: 1,
                    borderColor: "secondary.main",
                    p: 2,
                  }}
                >
                  <Stack
                    spacing={2}
                    direction="column"
                    sx={{
                      mb: 2,
                    }}
                  >
                    <FormControl
                      sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: "secondary.dark",
                        p: 2,
                        mt: 2,
                      }}
                    >
                      <FormLabel id="provider-label">
                        {" "}
                        Internet Service Provider{" "}
                      </FormLabel>
                      <RadioGroup
                        value={internetDetails.provider}
                        disabled={internetDetails.internet_connected === "No"}
                        onChange={handleInternetDetailsChange}
                        sx={{
                          color: "secondary.dark",
                          mt: 2,
                        }}
                      >
                        <FormControlLabel
                          value="Liquid"
                          control={<Radio />}
                          label="Liquid"
                        />
                        <FormControlLabel
                          value="Safaricom Fibre "
                          control={<Radio />}
                          label="Safaricom Fibre"
                        />
                        <FormControlLabel
                          value="Zuku"
                          control={<Radio />}
                          label="Zuku"
                        />
                        <FormControlLabel
                          value="NTT/IS (Internet Solutions)"
                          control={<Radio />}
                          label="NTT/IS (Internet Solutions)"
                        />
                        <FormControlLabel
                          value="Telkom"
                          control={<Radio />}
                          label="Telkom"
                        />
                        <FormControlLabel
                          value="Faiba"
                          control={<Radio />}
                          label="Faiba"
                        />
                        <FormControlLabel
                          sx={{ color: "secondary.light" }}
                          value="Other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>

                      <TextField
                        label="Other Provider"
                        sx={{
                          width: "50%",
                          mt: 2,
                        }}
                        value={
                          internetDetails.provider === "Other"
                            ? internetDetails.provider
                            : ""
                        }
                        onChange={(e) => handleInternetDetailsChange(e)}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: "secondary.dark",
                        p: 2,
                        mt: 2,
                      }}
                    >
                      <FormLabel id="internet-price">
                        {" "}
                        Price/Rate per Month{" "}
                      </FormLabel>
                      <RadioGroup
                        value={internetDetails.internet_price}
                        onChange={handleInternetDetailsChange}
                        sx={{
                          color: "secondary.dark",
                          mt: 2,
                        }}
                      >
                        <FormControlLabel
                          value="Below 5000"
                          control={<Radio />}
                          label="Below 5000"
                        />
                        <FormControlLabel
                          value="5000-10000"
                          control={<Radio />}
                          label="5000-10000"
                        />
                        <FormControlLabel
                          value="10000-15000"
                          control={<Radio />}
                          label="10000-15000"
                        />
                        <FormControlLabel
                          sx={{ color: "secondary.light" }}
                          value="Other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                      <TextField
                        label="Other Price"
                        sx={{
                          width: "50%",
                          mt: 2,
                        }}
                        value={
                          internetDetails.internet_price === "Other"
                            ? internetDetails.internet_price
                            : ""
                        }
                        onChange={handleInternetDetailsChange}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: "secondary.dark",
                        p: 2,
                        mt: 2,
                      }}
                    >
                      <FormLabel id="type-of-connection">
                        {" "}
                        Type of Connection{" "}
                      </FormLabel>
                      <RadioGroup
                        value={internetDetails.type_of_connection}
                        onChange={handleInternetDetailsChange}
                        sx={{
                          color: "secondary.dark",
                          mt: 2,
                        }}
                      >
                        <FormControlLabel
                          value="Dedicated"
                          control={<Radio />}
                          label="Dedicated"
                        />
                        <FormControlLabel
                          value="Shared"
                          control={<Radio />}
                          label="Shared"
                        />
                      </RadioGroup>
                    </FormControl>

                    <FormControl
                      sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: "secondary.dark",
                        p: 2,
                        mt: 2,
                      }}
                    >
                      <FormLabel id="product"> Product / Service </FormLabel>
                      <RadioGroup
                        value={internetDetails.product}
                        onChange={handleInternetDetailsChange}
                        sx={{
                          color: "secondary.dark",
                          mt: 2,
                        }}
                      >
                        <FormControlLabel
                          value="Internet"
                          control={<Radio />}
                          label="Internet"
                        />
                        <FormControlLabel
                          value="Domain & Hosting"
                          control={<Radio />}
                          label="Domain & Hosting"
                        />
                        <FormControlLabel
                          value="PBX/Telephony"
                          control={<Radio />}
                          label="PBX/Telephony"
                        />
                        <FormControlLabel
                          value="Other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                      <TextField
                        label="Other Product"
                        sx={{
                          width: "50%",
                          mt: 2,
                        }}
                        value={
                          internetDetails.product === "Other"
                            ? internetDetails.product
                            : ""
                        }
                        onChange={(e) => handleInternetDetailsChange(e)}
                      />
                    </FormControl>

                    <TextField
                      label="Extra Net Information"
                      value={internetDetails.extra_net_info}
                      onChange={handleInternetDetailsChange}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ mt: 2 }}
                    />
                    <FormControl
                      sx={{
                        border: 1,
                        borderRadius: 1,
                        borderColor: "secondary.dark",
                        p: 2,
                        mt: 2,
                      }}
                    >
                      <FormLabel id="deal-status"> Deal Status </FormLabel>
                      <RadioGroup
                        value={internetDetails.deal_status}
                        onChange={handleInternetDetailsChange}
                        sx={{
                          color: "secondary.dark",
                          mt: 2,
                        }}
                      >
                        <FormControlLabel
                          value="Closed"
                          control={<Radio />}
                          label="Closed"
                        />
                        <FormControlLabel
                          value="Follow Up"
                          control={<Radio />}
                          label="Follow Up"
                        />
                        <FormControlLabel
                          value="Negotiating"
                          control={<Radio />}
                          label="Negotiating"
                        />
                        <FormControlLabel
                          value="Complete"
                          control={<Radio />}
                          label="Complete"
                        />
                        <FormControlLabel
                          value="Dropped"
                          control={<Radio />}
                          label="Dropped"
                        />
                        <FormControlLabel
                          sx={{ color: "secondary.light" }}
                          value="Other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                      <TextField
                        label="Other Deal Status"
                        sx={{
                          width: "50%",
                          mt: 2,
                        }}
                        value={
                          internetDetails.deal_status === "Other"
                            ? internetDetails.deal_status
                            : ""
                        }
                        onChange={handleInternetDetailsChange}
                      />
                    </FormControl>
                  </Stack>
                </Paper>
              </Collapse>
            </Stack>
          </Paper>
          <Button
            sx={{
              width: "30%",
              margin: "0 auto",
              display: "block",
            }}
            variant="contained"
            color="primary"
          >
            {" "}
            Submit{" "}
          </Button>

          <Backdrop
            open={isSubmitting}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Alert severity="info" sx={{ mb: 2 }}>
              Submitting data, please wait...
            </Alert>
          </Backdrop>
        </TabHolder>
      </Box>
    </>
  );
};

function TabHolder({ currentValue, showValue, children }) {
  if (showValue === currentValue) {
    return <Collapse in={true}>{children}</Collapse>;
  }
}

export default ClientData;
