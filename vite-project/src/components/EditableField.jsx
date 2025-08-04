import { memo, useCallback, useMemo } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const EditableField = memo(({ 
    label, 
    value, 
    fieldKey, 
    category, 
    multiline = false, 
    rows = 1,
    isEditing,
    isHovered,
    editValue,
    onEdit,
    onSave,
    onCancel,
    onEditValueChange,
    onMouseEnter,
    onMouseLeave
}) => {
    const handleFieldEdit = useCallback(() => {
        onEdit(fieldKey, value, category);
    }, [fieldKey, value, category, onEdit]);

    const handleFieldMouseEnter = useCallback(() => {
        onMouseEnter(fieldKey, category);
    }, [fieldKey, category, onMouseEnter]);

    const editBoxStyles = useMemo(() => ({
        position: 'absolute',
        right: -8,
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 0,
        transition: 'opacity 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        padding: '4px 8px',
        borderRadius: 1,
        color: 'primary.main',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'primary.main',
        cursor: 'pointer',
        fontSize: '0.75rem',
        fontWeight: 500,
        '&:hover': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText'
        }
    }), []);

    const containerStyles = useMemo(() => ({
        position: 'relative',
        '&:hover .edit-button': {
            opacity: 1
        }
    }), []);

    return (
        <Box 
            sx={containerStyles}
            onMouseEnter={handleFieldMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isEditing ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        label={label}
                        value={editValue}
                        onChange={onEditValueChange}
                        variant="standard"
                        size="small"
                        multiline={multiline}
                        rows={rows}
                        sx={{ flex: 1 }}
                        autoFocus
                    />
                    <IconButton 
                        size="small" 
                        onClick={onSave}
                        sx={{ color: 'success.main' }}
                    >
                        <CheckIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                        size="small" 
                        onClick={onCancel}
                        sx={{ color: 'error.main' }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            ) : (
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        label={label}
                        value={value || ""}
                        variant="standard"
                        size="small"
                        multiline={multiline}
                        rows={rows}
                        slotProps={{ input: { readOnly: true } }}
                        sx={{ width: '100%' }}
                    />
                    {isHovered && !isEditing && (
                        <Box
                            className="edit-button"
                            onClick={handleFieldEdit}
                            sx={editBoxStyles}
                        >
                            <EditIcon fontSize="small" />
                            <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 'inherit' }}>
                                Edit
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
});

EditableField.displayName = 'EditableField';

export default EditableField;
