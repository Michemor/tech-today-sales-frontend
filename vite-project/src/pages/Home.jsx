import { useState } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import CustomCard from '../components/CustomCard'
import { ClientDetailsForm } from '../components/ClientDetailsForm'
import { OfficeDetailForm } from '../components/officeDetailForm'
import { MeetingDetailsForm } from '../components/meetingDetailsForm'
import { InternetDetailsForm } from '../components/internetDetailsForm'
import { BuildingDetailsForm } from '../components/BuildingDetailsForm'
import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { sendClientData } from '../services/clientServices';
import Grid from '@mui/material/Grid';

export default function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    
    const [comprehensiveFormOpen, setComprehensiveFormOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: ''
    });
    
    const showAlert = (severity, message) => {
        setAlert({
            open: true,
            severity,
            message
        });
        setTimeout(() => {
            setAlert(prev => ({ ...prev, open: false }));
        }, 3000);
    };
    
    const [clientDetails, setClientDetails] = useState({
      client_name: '',
      client_email: '',
      contact: '',
      job: '',
      deal_info: ''
    });
    const [officeDetails, setOfficeDetails] = useState({});
    const [meetingDetails, setMeetingDetails] = useState({});
    const [internetDetails, setInternetDetails] = useState({
      is_connected: '',
      isp_name: '',
      connection_type: '',
      product: '',
      net_price: '',
      deal_status: '',
    });
    const [buildingDetails, setBuildingDetails] = useState({
      building_name: '',
      is_fibre_setup: '',
      ease_of_access: '',
      more_info_access: '',
      number_offices: '',
    });
    
    const steps = ['Client Details', 'Meeting Details', 'Internet Details', 'Building Details', 'Office Details'];
    const handleComprehensiveFormOpen = () => {
      setComprehensiveFormOpen(true);
      setActiveStep(0);
    };

    const handleComprehensiveFormClose = () => {
      setComprehensiveFormOpen(false);
      setActiveStep(0);
    };

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClick = (path) => {
      navigate(path);
    };

    const handleSubmit = async () => {
      // Here you would typically send data to your backend
      try {
        const data = {
          ...clientDetails,
          ...meetingDetails,
          ...internetDetails,
          ...buildingDetails,
          ...officeDetails
        }
        const response = await sendClientData(data);

        if (response && response.success) {
          console.log('Data submitted successfully');
          setSubmitSuccess(true);
          setTimeout(() => {
            setSubmitSuccess(false);
            setComprehensiveFormOpen(false);
            setActiveStep(0);
          }, 2000);
        } else {
          showAlert('error', `Failed to submit data. Please try again,`);
          console.log('Failed to submit data:', response?.message || 'Unknown error');
          // Close dialog and reset form even on failure
          setComprehensiveFormOpen(false);
          setActiveStep(0);
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        showAlert('error', 'Failed to submit data. Please try again.');
        // Close dialog and reset form even on error
        setComprehensiveFormOpen(false);
        setActiveStep(0);
      } finally {
        // Reset all form data
        setClientDetails({
          client_name: '',
          client_email: '',
          contact: '',
          job: '',
          deal_info: ''
        });
        setMeetingDetails({});
        setInternetDetails({
          isp_name: '',
          net_price: '',
          product: '',
          other_isp: '',
          other_price: '',
          other_product: '',
          is_connected: ''
        });
        setBuildingDetails({
          building_name: '',
          is_fibre_setup: '',
          more_offices: '',
          ease_of_access: '',
          more_info_access: ''
        });
        setOfficeDetails({});
      }
    };

    const renderStepContent = (step) => {
      switch (step) {
        case 0:
          return (
            <ClientDetailsForm 
              clientDetails={clientDetails}
              setClientDetails={setClientDetails}
            />
          );
        case 1:
          return (
            <MeetingDetailsForm 
              meetingDetails={meetingDetails}
              setMeetingDetails={setMeetingDetails}
            />
          );
        case 2:
          return (
            <InternetDetailsForm 
              internetDetails={internetDetails}
              setInternetDetails={setInternetDetails}
            />
          );
        case 3:
          return (
            <BuildingDetailsForm 
              buildingDetails={buildingDetails}
              setBuildingDetails={setBuildingDetails}
            />
          );
        case 4:
          return (
            <OfficeDetailForm 
              officeDetails={officeDetails}
              setOfficeDetails={setOfficeDetails}
            />
          );
        default:
          return 'Unknown step';
      }
    };

  return (
    <>
      <CssBaseline/>
      {/* Alert */}
      {alert.open && (
          <Alert severity={alert.severity} sx={{ mb: 2, mx: 2 }}>
              {alert.message}
          </Alert>
      )}
      <Box 
        sx={{ 
          minHeight: '100vh',
          padding: 2,
          width: '100%'
        }}>
        
        <Box sx={{ textAlign: 'left', marginBottom: 4 }}>
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 25, md: 30 },
              color: 'primary.main',
              fontWeight: 'bold',
              marginBottom: 1,
              textAlign: 'center'
            }}>
            Welcome to Sales Department
          </Typography>
          <Typography sx={{
            fontSize: { xs: 12, sm: 15, md: 18 },
            color: 'text.secondary',
            textAlign: 'center'
          }}>
            Click on the tiles below to access the actions
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            sx={{ 
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Fab onClick={handleComprehensiveFormOpen} color="primary" aria-label="add" sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 1000
            }}>
              <AddIcon />
            </Fab>
            
          </Stack>
        </Box>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 1, sm: 2, md: 3 }
        }}>
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{ 
              width: '100%',
              justifyContent: 'center',
              alignItems: 'stretch'
            }}
          >
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <CustomCard 
                title='Client Details List'
                message="View and manage client details."
                icon={<GroupRoundedIcon sx={{ color: 'primary.main' }} />} 
                onClick={() => handleClick('/clients')} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <CustomCard 
                title='Sales Location List' 
                message="View and manage sales locations."
                icon={<PinDropRoundedIcon sx={{ color: 'primary.main' }} />} 
                onClick={() => handleClick('/locations')} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <CustomCard 
                title='Complete Details Form' 
                message="Fill out all details in a step-by-step process: Client, Meeting, Internet, Building & Office."
                icon={<EditNoteRoundedIcon sx={{ color: 'success.main' }} />} 
                onClick={handleComprehensiveFormOpen} 
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Comprehensive Form Modal */}
      <Dialog
        open={comprehensiveFormOpen}
        onClose={handleComprehensiveFormClose}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 0, sm: 1, md: 2 },
            maxHeight: { xs: '100vh', sm: '95vh', md: '90vh' },
            height: { xs: '100vh', sm: 'auto' },
            borderRadius: { xs: 0, sm: 1, md: 2 },
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 2 },
          fontSize: { xs: '1rem', sm: '1.25rem' }
        }}>
          <Box sx={{ 
            fontSize: { xs: '1rem', sm: '1.25rem' },
            fontWeight: 'bold'
          }}>
            Complete Details Form - Step {activeStep + 1} of {steps.length}
          </Box>
          <IconButton 
            onClick={handleComprehensiveFormClose} 
            size="small"
            sx={{ ml: 1 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ 
          px: { xs: 1, sm: 2, md: 3 },
          py: { xs: 1, sm: 2 }
        }}>
          <Stepper 
            activeStep={activeStep} 
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{ 
              mb: { xs: 2, sm: 3, md: 4 },
              '& .MuiStepLabel-label': {
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
              }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {submitSuccess ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: { xs: 2, sm: 3, md: 4 },
              px: { xs: 1, sm: 2 }
            }}>
              <CheckCircleIcon sx={{ 
                fontSize: { xs: 40, sm: 50, md: 60 }, 
                color: 'success.main', 
                mb: { xs: 1, sm: 2 } 
              }} />
              <Alert severity="success" sx={{ 
                mb: { xs: 1, sm: 2 },
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
                All information has been successfully submitted!
              </Alert>
              <Typography variant="h6" gutterBottom sx={{
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }
              }}>
                Thank you for completing the form.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}>
                Returning to home page...
              </Typography>
            </Box>
          ) : (
            <Box sx={{ 
              minHeight: { xs: 'auto', sm: '400px' },
              '& .MuiPaper-root': {
                mx: { xs: 0, sm: 1, md: 2 },
                my: { xs: 1, sm: 2 },
                p: { xs: 2, sm: 3, md: 4 }
              }
            }}>
              {renderStepContent(activeStep)}
            </Box>
          )}
        </DialogContent>
        
        {!submitSuccess && (
          <DialogActions sx={{ 
            p: { xs: 2, sm: 3 },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 0 }
          }}>
            <Button 
              disabled={activeStep === 0} 
              onClick={handleBack}
              variant="outlined"
              fullWidth={isMobile}
              sx={{ 
                order: { xs: 2, sm: 1 },
                minWidth: { sm: '100px' }
              }}
            >
              Back
            </Button>
            <Box sx={{ 
              flex: { xs: 'none', sm: '1 1 auto' },
              order: { xs: 1, sm: 2 }
            }} />
            {activeStep === steps.length - 1 ? (
              <Button 
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                fullWidth={isMobile}
                sx={{ 
                  order: { xs: 1, sm: 3 },
                  minWidth: { sm: '120px' }
                }}
              >
                Submit All
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                variant="contained"
                color="primary"
                fullWidth={isMobile}
                sx={{ 
                  order: { xs: 1, sm: 3 },
                  minWidth: { sm: '100px' }
                }}
              >
                Next
              </Button>
            )}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
