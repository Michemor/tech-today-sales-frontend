import FormControl from "@mui/material/FormControl";
import InputBox from "../components/InputBox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const ClientData = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Form state variables
  // These will hold the values for the form fields
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Item One" value={"1"} />
        <Tab label="Item Two" value={"2"} />
        <Tab label="Item Three" value={"3"} />
      </Tabs>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: "500vw",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            mt: 5,
            fontWeight: "bold",
            fontSize: 20,
            color: "#03a9f4",
          }}
        >
          {" "}
          Sales Office{" "}
        </Typography>

        <Divider
          middle
          aria-hidden="true"
          sx={{
            mr: 5,
            ml: 5,
          }}
        />

        <FormControl
          title="Client Details"
          sx={{
            ml: 4,
            mr: 4,
          }}
        >
          <Typography
            sx={{
              mt: 5,
              fontWeight: "bold",
              fontSize: 20,
              color: "#03a9f4",
            }}
          >
            {" "}
            Client Details{" "}
          </Typography>
          <Collapse in={value === "1"} unmountOnExit mountOnEnter>
            <Stack spacing={2} direction="column">
              <TextField
                label="First Name"
                variant="outlined"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                id="f-name"
                required
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                id="l-name"
                required
              />
            </Stack>
          </Collapse>
          <Collapse in={value === "2"}>
            <InputBox
              id="contact"
              label="Contact"
              variant="outlined"
              required
            />
            <InputBox id="email" label="Email" variant="outlined" required />
            <InputBox
              id="job-title"
              label="Job Title"
              variant="outlined"
              required
            />
            <Divider
              middle
              aria-hidden="true"
              sx={{
                mr: 5,
                ml: 5,
              }}
            />

            <InputBox
              id="m-date"
              label="Meeting Date"
              variant="outlined"
              required
            />
          </Collapse>
        </FormControl>
      </Box>
    </>
  );
};

export default ClientData;
