import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Grid,
  LinearProgress,
  Tooltip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/todo';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return '#FF4B4B';
    case 'medium':
      return '#FFA726';
    case 'low':
      return '#66BB6A';
    default:
      return '#9E9E9E';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'work':
      return '#6C63FF';
    case 'personal':
      return '#66BB6A';
    case 'shopping':
      return '#FFA726';
    case 'health':
      return '#FF6584';
    default:
      return '#9E9E9E';
  }
};

const TodoList = () => {
  const { state, dispatch } = useTodo();

  const filteredTodos = state.todos.filter((todo) => {
    const categoryMatch =
      state.filter.category === 'all' || todo.category === state.filter.category;
    const priorityMatch =
      state.filter.priority === 'all' || todo.priority === state.filter.priority;
    const statusMatch =
      state.filter.status === 'all' ||
      (state.filter.status === 'completed' && todo.completed) ||
      (state.filter.status === 'pending' && !todo.completed);
    return categoryMatch && priorityMatch && statusMatch;
  });

  const completedTasks = state.todos.filter((todo) => todo.completed).length;
  const progress = (completedTasks / state.todos.length) * 100 || 0;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Progress Overview
        </Typography>
        <Box sx={{ position: 'relative', mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(108, 99, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #6C63FF 0%, #FF6584 100%)',
              },
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              position: 'absolute',
              right: 0,
              top: -20,
              fontWeight: 500,
            }}
          >
            {Math.round(progress)}%
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {completedTasks} of {state.todos.length} tasks completed
        </Typography>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {filteredTodos.length === 0 ? (
          <ListItem>
            <ListItemText 
              primary="No Procrastination" 
              sx={{ 
                textAlign: 'center',
                color: 'text.secondary',
                fontStyle: 'italic'
              }}
            />
          </ListItem>
        ) : (
          filteredTodos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                sx={{
                  mb: 2,
                  position: 'relative',
                  opacity: todo.completed ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 8px 24px rgba(0, 0, 0, 0.3)'
                        : '0 8px 24px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={8}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          onClick={() =>
                            dispatch({ type: 'TOGGLE_TODO', payload: todo.id })
                          }
                          sx={{
                            color: todo.completed ? 'success.main' : 'text.secondary',
                            '&:hover': {
                              backgroundColor: 'rgba(108, 99, 255, 0.1)',
                            },
                          }}
                        >
                          {todo.completed ? (
                            <CheckCircleIcon />
                          ) : (
                            <UncheckedIcon />
                          )}
                        </IconButton>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              textDecoration: todo.completed
                                ? 'line-through'
                                : 'none',
                              fontWeight: 600,
                            }}
                          >
                            {todo.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {todo.description}
                          </Typography>
                          {todo.dueDate && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                mt: 1,
                              }}
                            >
                              <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">
                                Due: {new Date(todo.dueDate).toLocaleDateString()}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                        }}
                      >
                        <Chip
                          label={todo.category}
                          size="small"
                          sx={{
                            bgcolor: getCategoryColor(todo.category),
                            color: 'white',
                            fontWeight: 500,
                          }}
                        />
                        <Chip
                          label={todo.priority}
                          size="small"
                          sx={{
                            bgcolor: getPriorityColor(todo.priority),
                            color: 'white',
                            fontWeight: 500,
                          }}
                        />
                        <Tooltip title="Delete task">
                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch({ type: 'DELETE_TODO', payload: todo.id })
                            }
                            sx={{
                              color: 'error.main',
                              '&:hover': {
                                backgroundColor: 'error.light',
                                color: 'white',
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </List>
    </Box>
  );
};

export default TodoList; 