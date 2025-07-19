'use client'
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonAdd as PersonAddIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

const SignupPage = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        password: formData.password,
      });
      
      if (result.success) {
        // Show success message and redirect to login
        router.push('/auth/login?message=Account created successfully. Please sign in.');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: 2
    }}>
      <Paper 
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 500,
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <PersonAddIcon 
            sx={{ 
              fontSize: 48, 
              color: 'primary.main', 
              marginBottom: 2 
            }} 
          />
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: '#1a1a1a',
              marginBottom: 1
            }}
          >
            Create Account
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6b7280',
              fontSize: '0.875rem'
            }}
          >
            Join Support Bot and streamline your customer support
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ marginBottom: 2 }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        {/* Signup Form */}
        <Box component="form" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 1 }}>
            <TextField
              fullWidth
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
            <TextField
              fullWidth
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          </Box>

          <TextField
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            required
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#6b7280' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />

          <TextField
            fullWidth
            name="company"
            label="Company (Optional)"
            value={formData.company}
            onChange={handleInputChange}
            margin="normal"
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon sx={{ color: '#6b7280' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />

          <TextField
            fullWidth
            name="phone"
            label="Phone Number (Optional)"
            value={formData.phone}
            onChange={handleInputChange}
            margin="normal"
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: '#6b7280' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            required
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />

          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            margin="normal"
            required
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />

          {/* Terms and Conditions */}
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                disabled={loading}
                sx={{ color: 'primary.main' }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                I agree to the{' '}
                <Link 
                  href="#" 
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link 
                  href="#" 
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Privacy Policy
                </Link>
              </Typography>
            }
            sx={{ marginTop: 2, marginBottom: 1 }}
          />

          {/* Sign Up Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              marginTop: 2,
              marginBottom: 2,
              padding: '12px',
              fontSize: '1rem',
              fontWeight: 500,
              textTransform: 'none',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: '#1d4ed8',
              },
              '&:disabled': {
                backgroundColor: '#9ca3af',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Create Account'
            )}
          </Button>

          {/* Divider */}
          <Divider sx={{ marginY: 2 }}>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
              OR
            </Typography>
          </Divider>

          {/* Sign In Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Already have an account?{' '}
              <Link 
                href="/auth/login" 
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupPage;
