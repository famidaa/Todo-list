import { useState } from 'react'
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Typography,
  Paper,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import FilterBar from './components/FilterBar'
import { useTodo } from './context/TodoContext'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ListAltIcon from '@mui/icons-material/ListAlt'
import BarChartIcon from '@mui/icons-material/BarChart'
import PsychologyIcon from '@mui/icons-material/Psychology'
import StatisticsScreen from './screens/StatisticsScreen'
import NoProcrastinationScreen from './screens/NoProcrastinationScreen'

function MainScreen() {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        maxWidth: '1200px !important',
        width: '100%',
        mx: 'auto',
        px: { xs: 2, md: 4 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #2D3250 0%, #F6B17A 100%)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
          <CheckCircleIcon sx={{ fontSize: 48, mr: 2, color: 'primary.main' }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            TaskList
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <AddTodo />
          <FilterBar />
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <TodoList />
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <BottomNavigation
      value={location.pathname}
      onChange={(event, newValue) => {
        navigate(newValue);
      }}
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <BottomNavigationAction label="Tasks" value="/" icon={<ListAltIcon />} />
      <BottomNavigationAction label="Statistics" value="/statistics" icon={<BarChartIcon />} />
      <BottomNavigationAction label="No Procrastination" value="/no-procrastination" icon={<PsychologyIcon />} />
    </BottomNavigation>
  );
}

function App() {
  const { state } = useTodo()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  
  const theme = createTheme({
    palette: {
      mode: state.theme,
      primary: {
        main: '#2D3250',
        light: '#424769',
        dark: '#1B1F3B',
      },
      secondary: {
        main: '#F6B17A',
        light: '#FFC49B',
        dark: '#E69B5C',
      },
      background: {
        default: state.theme === 'dark' ? '#1A1B1E' : '#F0F2F5',
        paper: state.theme === 'dark' ? '#2A2B2E' : '#FFFFFF',
      },
    },
    typography: {
      fontFamily: "'Inter', 'Poppins', sans-serif",
      h3: {
        fontWeight: 800,
        letterSpacing: '-0.5px',
      },
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.3px',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: state.theme === 'dark' 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 12,
            padding: '10px 24px',
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            height: 80,
            borderRadius: '24px 24px 0 0',
            boxShadow: state.theme === 'dark' 
              ? '0 -4px 20px rgba(0, 0, 0, 0.2)'
              : '0 -4px 20px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            py: { xs: 3, md: 6 },
            px: { xs: 2, md: 0 },
            pb: { xs: 12, md: 10 },
            background: state.theme === 'dark' 
              ? 'linear-gradient(180deg, #1A1B1E 0%, #2A2B2E 100%)'
              : 'linear-gradient(180deg, #F0F2F5 0%, #FFFFFF 100%)',
          }}
        >
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/statistics" element={<StatisticsScreen />} />
            <Route path="/no-procrastination" element={<NoProcrastinationScreen />} />
          </Routes>
          <Navigation />
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
