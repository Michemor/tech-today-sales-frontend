import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";


export const ClientDetailsForm = ({ clientDetails, handleChange }) => {

    return (
        <>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
                Client Details
            </Typography>
            <Stack spacing={2}>
                <TextField
                    label="First Name"
                    name="first_name"
                    value={clientDetails.first_name || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    name="last_name"
                    value={clientDetails.last_name || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Contact Number"
                    name="contact_number"
                    value={clientDetails.contact_number || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Job Title"
                    name="job_title"
                    value={clientDetails.job_title || ''}
                    onChange={handleChange}
                    fullWidth
                />
            </Stack>
        </Paper>
        </>
    );
}

