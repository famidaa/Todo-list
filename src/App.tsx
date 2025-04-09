import { useState } from 'react'
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Typography,
  Paper,
} from '@mui/material'
import { TodoProvider } from './context/TodoContext'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import FilterBar from './components/FilterBar'
import { useTodo } from './context/TodoContext'

function App() {
  const { state } = useTodo()
  const theme = createTheme({
    palette: {
      mode: state.theme,
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 4,
              }}
            >
              Task Master
            </Typography>
            <AddTodo />
            <FilterBar />
            <TodoList />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
