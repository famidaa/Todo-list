import { Box, Typography, Paper, Container } from '@mui/material';
import { useTodo } from '../context/TodoContext';

const StatisticsScreen = () => {
  const { state } = useTodo();
  const { todos } = state;

  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Container maxWidth="md">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #6C63FF 0%, #FF6584 100%)',
          },
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
          Task Statistics
        </Typography>
        
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">Total Tasks</Typography>
            <Typography variant="h3" color="primary.main">{totalTasks}</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">Completed Tasks</Typography>
            <Typography variant="h3" color="success.main">{completedTasks}</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">Pending Tasks</Typography>
            <Typography variant="h3" color="warning.main">{pendingTasks}</Typography>
          </Paper>
          
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">Completion Rate</Typography>
            <Typography variant="h3" color="info.main">{completionRate.toFixed(1)}%</Typography>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};

export default StatisticsScreen; 