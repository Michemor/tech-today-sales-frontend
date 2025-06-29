

// This file provides a popover on the screen for user to update a meeting.

import Popover from "@mui/material/Popover"


export const UpdateMeeting = () => {
    return (
        <>
        <Popover
        open={open}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        >
            <Typography variant="h6" component="h2">
                Update Meeting </Typography>
        </Popover>

        </>
    )
}