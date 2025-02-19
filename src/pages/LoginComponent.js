import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Alert, Link, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import BrushIcon from '@mui/icons-material/Brush';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      component="main" 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: `
          linear-gradient(45deg, 
            rgba(0,0,0,0.8), 
            rgba(76, 29, 149, 0.8)
          ),
          url('https://source.unsplash.com/random/1920x1080/?modern-art')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
        }
      }}
      maxWidth={false}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Paper 
          elevation={24} 
          sx={{ 
            padding: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.3)',
            width: '100%',
            maxWidth: '400px',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              background: 'linear-gradient(45deg, transparent, rgba(76, 29, 149, 0.1))',
              borderRadius: '0 0 0 100%',
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <BrushIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            </motion.div>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #6366F1, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              CENTURIONART
            </Typography>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: 'text.secondary',
                mt: 1,
                fontStyle: 'italic'
              }}
            >
              Where Creativity Meets Collection
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField 
              label="Email" 
              variant="outlined" 
              fullWidth 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              disabled={loading}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  }
                }
              }}
            />
            <TextField 
              label="Password" 
              variant="outlined" 
              type="password" 
              fullWidth 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              disabled={loading}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  }
                }
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={loading}
              sx={{ 
                py: 1.5,
                borderRadius: '12px',
                background: 'linear-gradient(45deg, #6366F1, #A855F7)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4F46E5, #9333EA)',
                }
              }}
            >
              {loading ? 'Authenticating...' : 'Enter Gallery'}
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
            New to the collection? {' '}
            <Link 
              href="/regstration" 
              sx={{ 
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Join the Artists
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
}