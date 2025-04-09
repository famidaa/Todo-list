import { Box, Typography, Paper, Container, Grid, Card, CardContent, useTheme } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const NoProcrastinationScreen = () => {
  const theme = useTheme();
  
  const tips = [
    {
      title: "Break Tasks Down",
      description: "Divide large tasks into smaller, manageable chunks",
      icon: <TimerIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main
    },
    {
      title: "Use the Pomodoro Technique",
      description: "Work for 25 minutes, then take a 5-minute break",
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main
    },
    {
      title: "Set Clear Goals",
      description: "Define what success looks like for each task",
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.light
    },
    {
      title: "Track Your Progress",
      description: "Celebrate small wins to stay motivated",
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.light
    }
  ];

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
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'primary.main',
              mb: 2,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 2,
              }
            }}
          >
            No Procrastination
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Stay focused and productive with these proven strategies to overcome procrastination and achieve your goals.
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {tips.map((tip, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 2,
                      color: tip.color
                    }}
                  >
                    {tip.icon}
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        ml: 2,
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    >
                      {tip.title}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      lineHeight: 1.6
                    }}
                  >
                    {tip.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default NoProcrastinationScreen; 