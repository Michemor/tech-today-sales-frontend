import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';

export const SearchBar = () => {

    return (
        <>
        <FormControl variant='standard'>
        <TextField
            id="search-bar"
            variant="outlined"
            placeholder="Search..."
            sx={{ 
                borderRadius: 2,
                width: '100%',
                mt: 2,
            }}
            size="small"
        />
        <IconButton 
            type="submit" 
            sx={{ position: 'absolute', mt: 2, right: 0 }} 
            aria-label="search">

            <SearchIcon />
        </IconButton>
        </FormControl>
        </>
    )
}