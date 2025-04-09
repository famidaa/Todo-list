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
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
} from '@mui/icons-material';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/todo';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'work':
      return '#2196f3';
    case 'personal':
      return '#4caf50';
    case 'shopping':
      return '#ff9800';
    case 'health':
      return '#f44336';
    default:
      return '#9e9e9e';
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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Progress
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {completedTasks} of {state.todos.length} tasks completed
        </Typography>
      </Box>

      <AnimatePresence>
        {filteredTodos.map((todo) => (
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
                      >
                        {todo.completed ? (
                          <CheckCircleIcon color="success" />
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
                        }}
                      />
                      <Chip
                        label={todo.priority}
                        size="small"
                        color={getPriorityColor(todo.priority)}
                      />
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch({ type: 'DELETE_TODO', payload: todo.id })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default TodoList; 