import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import  { ThemeProvider, createTheme} from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#dd2c00',
    },
    secondary: {
      main: '#ffccbc',
      light: '#9e9e9e',
      dark: '#757575',
      inactive: '#bdbdbd',
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
