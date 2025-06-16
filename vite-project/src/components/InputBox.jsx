import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";

const InputBox = ({ label, value, id, required, onChange }) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      autoFocus="true"
      fullWidth
      required={required}
      onChange={onChange}
      sx={{
        mt: 3,
      }}
    />
  );
};

export default InputBox;
