import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { getClientData, updateData } from "../services/clientServices";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

// Optimized EditableField component with React.memo
const EditableField = memo(({ 
    label, 
    value, 
    fieldKey, 
    category, 
    multiline = false, 
    rows = 1,
    editingField,
    hoveredField,
    editValue,
    onEdit,
    onSave,
    onCancel,
    onEditValueChange,
    onHover
}) => {
    const isEditing = editingField?.fieldKey === fieldKey && editingField?.category === category;
    const isHovered = hoveredField === `${category}-${fieldKey}`;

    const handleEdit = useCallback(() => {
        onEdit(fieldKey, value, category);
    }, [fieldKey, value, category, onEdit]);

    const handleMouseEnter = useCallback(() => {
        onHover(`${category}-${fieldKey}`);
    }, [category, fieldKey, onHover]);

    return (
        <Box 
            sx={{ 
                position: 'relative',
                '&:hover .edit-button': { opacity: 1 }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => onHover(null)}
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
                    <IconButton size="small" onClick={onSave} sx={{ color: 'success.main' }}>
                        <CheckIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={onCancel} sx={{ color: 'error.main' }}>
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
                    {isHovered && (
                        <Box
                            className="edit-button"
                            onClick={handleEdit}
                            sx={{
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
                            }}
                        >
                            <EditIcon fontSize="small" />
                            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
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

const CompleteData = () => {
    const { id } = useParams();
    console.log("CompleteData component rendered with ID:", id);
    
    const [clientData, setClientData] = useState({});
    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [hoveredField, setHoveredField] = useState(null);
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

    useEffect(() => {
        const fetchData = async () => {
            const clientData = await getClientData(id);
            setClientData(clientData);
            console.log("Client data fetched:", clientData);
        };
        fetchData();
    }, [id]);

    // Memoized handlers to prevent unnecessary re-renders
    const showAlert = useCallback((severity, message) => {
        setAlert({ open: true, severity, message });
        setTimeout(() => {
            setAlert(prev => ({ ...prev, open: false }));
        }, 3000);
    }, []);

    const handleEdit = useCallback((fieldKey, currentValue, category) => {
        setEditingField({ fieldKey, category });
        setEditValue(currentValue || '');
    }, []);

    const handleSave = useCallback(async () => {
        if (!editingField) return;

        try {
            const data = {
                id: id,
                category: editingField.category,
                field: editingField.fieldKey,
                value: editValue,
                clientData: clientData
            };

            const response = await updateData(data);
            if(!response) {
                showAlert('error', 'Failed to update field');
                return;
            } else {
                setClientData(prev => ({
                    ...prev,
                    [editingField.category]: {
                        ...prev[editingField.category],
                        [editingField.fieldKey]: editValue
                    }
                }));

                showAlert('success', `${editingField.category} field updated successfully`);
                setEditingField(null);
                setEditValue('');
            }
        } catch (error) {
            console.error('Error updating field:', error);
            showAlert('error', 'Failed to update field');
        }
    }, [editingField, editValue, id, clientData, showAlert]);

    const handleCancel = useCallback(() => {
        setEditingField(null);
        setEditValue('');
    }, []);

    const handleEditValueChange = useCallback((e) => {
        setEditValue(e.target.value);
    }, []);

    const handleHover = useCallback((value) => {
        setHoveredField(value);
    }, []);

    // Shared props for all EditableField components to reduce repetition
    const editableFieldProps = useMemo(() => ({
        editingField,
        hoveredField,
        editValue,
        onEdit: handleEdit,
        onSave: handleSave,
        onCancel: handleCancel,
        onEditValueChange: handleEditValueChange,
        onHover: handleHover
    }), [editingField, hoveredField, editValue, handleEdit, handleSave, handleCancel, handleEditValueChange, handleHover]);

    return(
        <Box>
            {/* Alert */}
            {alert.open && (
                <Alert severity={alert.severity} sx={{ mb: 2, mx: 2 }}>
                    {alert.message}
                </Alert>
            )}
            
            <Paper>
                <Typography variant='h5' color="secondary.dark" sx={{ pr: 2, pl: 2, pt: 2 }}>
                    Client Details
                </Typography>
                <Divider sx={{ ml: 2, mr: 2 }} />
                
                <Grid container spacing={3} sx={{ p: 2 }}>
                    {/* LEFT COLUMN - Client & Meeting Info */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        {/* Client Information Section */}
                        <Box sx={{ mb: 3, p: 2, borderRadius: 1, border: '1px solid #e0e0e0' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Client Information
                            </Typography>
                            <Stack spacing={2}>
                                <EditableField
                                    label="Client Name"
                                    value={clientData?.client?.client_name}
                                    fieldKey="client_name"
                                    category="client"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Client Email"
                                    value={clientData?.client?.client_email}
                                    fieldKey="client_email"
                                    category="client"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Client Contact"
                                    value={clientData?.client?.client_contact}
                                    fieldKey="client_contact"
                                    category="client"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Job Title"
                                    value={clientData?.client?.job_title}
                                    fieldKey="job_title"
                                    category="client"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Deal Information"
                                    value={clientData?.client?.deal_information}
                                    fieldKey="deal_information"
                                    category="client"
                                    multiline
                                    rows={3}
                                    {...editableFieldProps}
                                />
                            </Stack>
                        </Box>

                        {/* Meeting Information Section */}
                        <Box sx={{ p: 2, mb: 3, borderRadius: 1, border: '1px solid #e0e0e0' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Meeting Information
                            </Typography>
                            <Stack spacing={2}>
                                <EditableField
                                    label="Meeting Date"
                                    value={clientData?.meeting?.meeting_date}
                                    fieldKey="meeting_date"
                                    category="meeting"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Meeting Location"
                                    value={clientData?.meeting?.meeting_location}
                                    fieldKey="meeting_location"
                                    category="meeting"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Meeting Status"
                                    value={clientData?.meeting?.meeting_status}
                                    fieldKey="meeting_status"
                                    category="meeting"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Meeting Type"
                                    value={clientData?.meeting?.meetingtype}
                                    fieldKey="meetingtype"
                                    category="meeting"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Meeting Remarks"
                                    value={clientData?.meeting?.meeting_remarks}
                                    fieldKey="meeting_remarks"
                                    category="meeting"
                                    multiline
                                    rows={3}
                                    {...editableFieldProps}
                                />
                            </Stack>
                        </Box>
                    </Grid>

                    {/* RIGHT COLUMN - Building, Office & Internet Info */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        {/* Building Information Section */}
                        <Box sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Building Information
                            </Typography>
                            <Stack spacing={2}>
                                <EditableField
                                    label="Building Name"
                                    value={clientData?.building?.building_name}
                                    fieldKey="building_name"
                                    category="building"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Has Fibre been set up in the building?"
                                    value={clientData?.building?.is_fibre_setup}
                                    fieldKey="is_fibre_setup"
                                    category="building"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Ease of Access"
                                    value={clientData?.building?.ease_of_access}
                                    fieldKey="ease_of_access"
                                    category="building"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Access Information"
                                    value={clientData?.building?.access_information}
                                    fieldKey="access_information"
                                    category="building"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Number Of Offices"
                                    value={clientData?.building?.number_offices}
                                    fieldKey="number_offices"
                                    category="building"
                                    {...editableFieldProps}
                                />
                            </Stack>
                        </Box>

                        {/* Office Information Section */}
                        <Box sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Office Information
                            </Typography>
                            <Stack spacing={2}>
                                <EditableField
                                    label="Office Name"
                                    value={clientData?.office?.office_name}
                                    fieldKey="office_name"
                                    category="office"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Office Floor"
                                    value={clientData?.office?.office_floor}
                                    fieldKey="office_floor"
                                    category="office"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Industry Category"
                                    value={clientData?.office?.industry_category}
                                    fieldKey="industry_category"
                                    category="office"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="Number of Staff"
                                    value={clientData?.office?.staff_number}
                                    fieldKey="staff_number"
                                    category="office"
                                    {...editableFieldProps}
                                />
                                <EditableField
                                    label="More Data on office"
                                    value={clientData?.office?.more_data_on_office}
                                    fieldKey="more_data_on_office"
                                    category="office"
                                    {...editableFieldProps}
                                />
                            </Stack>
                        </Box>

                        {/* Internet Information Section */}
                        <Box sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Internet Information
                            </Typography>
                            <Stack spacing={2}>
                                <EditableField
                                    label="Does the client have a connection?"
                                    value={clientData?.internet?.is_isp_connected == "false" ? "No" : "Yes"}
                                    fieldKey="is_isp_connected"
                                    category="internet"
                                    {...editableFieldProps}
                                />
                                {clientData?.internet?.is_isp_connected === "true" && (
                                    <>
                                        <EditableField
                                            label="Internet Provider"
                                            value={clientData?.internet?.isp_name}
                                            fieldKey="isp_name"
                                            category="internet"
                                            {...editableFieldProps}
                                        />
                                        <EditableField
                                            label="Internet Product"
                                            value={clientData?.internet?.service_provided}
                                            fieldKey="service_provided"
                                            category="internet"
                                            {...editableFieldProps}
                                        />
                                        <EditableField
                                            label="Internet Connection Type"
                                            value={clientData?.internet?.internet_connection_type}
                                            fieldKey="internet_connection_type"
                                            category="internet"
                                            {...editableFieldProps}
                                        />
                                        <EditableField
                                            label="Price of Internet monthly"
                                            value={clientData?.internet?.isp_price}
                                            fieldKey="isp_price"
                                            category="internet"
                                            {...editableFieldProps}
                                        />
                                        <EditableField
                                            label="Deal Status"
                                            value={clientData?.internet?.deal_status}
                                            fieldKey="deal_status"
                                            category="internet"
                                            {...editableFieldProps}
                                        />
                                    </>
                                )}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default memo(CompleteData);