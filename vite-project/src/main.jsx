import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import  { ThemeProvider, createTheme} from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#dd2c00',
      light: '#ff7043',
    },
    secondary: {
      main: '#ffccbc',
      light: '#9e9e9e',
      dark: '#757575',
      inactive: '#bdbdbd',
    },
  },
  // Responsive breakpoints
  breakpoints: {
    values: {
      xs: 0,     // Extra small devices (phones)
      sm: 600,   // Small devices (tablets)
      md: 900,   // Medium devices (small laptops)
      lg: 1200,  // Large devices (desktops)
      xl: 1536,  // Extra large devices (large desktops)
    },
  },
  // Global responsive typography
  typography: {
    h1: {
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h6: {
      fontSize: '1.25rem',
      '@media (max-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.9rem',
      },
    },
  },
  // Global component overrides for responsiveness
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '0 16px',
          '@media (max-width:600px)': {
            padding: '0 8px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            fontSize: '0.8rem',
            padding: '6px 12px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            '& .MuiToolbar-root': {
              minHeight: '56px',
              padding: '0 8px',
            },
          },
        },
      },
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
