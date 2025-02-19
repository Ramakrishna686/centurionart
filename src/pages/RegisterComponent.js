import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Alert, Link, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import PaletteIcon from '@mui/icons-material/Palette';

export default function RegistrationComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authService.register(email, password);
      navigate('/login');
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
          linear-gradient(135deg, 
            rgba(52, 211, 153, 0.8), 
            rgba(59, 130, 246, 0.8)
          ),
          url('https://source.unsplash.com/random/1920x1080/?artwork-studio')
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
          background: 'repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
        }
      }}
      maxWidth={false}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <PaletteIcon sx={{ fontSize: 45, color: '#34D399', mb: 2 }} />
            </motion.div>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #34D399, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Join CENTURIONART
            </Typography>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: 'text.secondary',
                mt: 1,
                fontStyle: 'italic'
              }}
            >
              Begin Your Artistic Journey
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField 
              label="Email" 
              variant="outlined" 
              type="email" 
              fullWidth 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              disabled={loading}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
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
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />
            <TextField 
              label="Confirm Password" 
              variant="outlined" 
              type="password" 
              fullWidth 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required
              disabled={loading}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
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
                background: 'linear-gradient(135deg, #34D399, #3B82F6)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2EBD8E, #2563EB)',
                }
              }}
            >
              {loading ? 'Creating Account...' : 'Start Creating'}
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
            Already have an account? {' '}
            <Link 
              href="/login" 
              sx={{ 
                color: '#3B82F6',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Return to Gallery
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
}