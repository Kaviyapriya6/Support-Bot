'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  FormControlLabel,
  Checkbox,
  Breadcrumbs,
  Link
} from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';

const businessHoursOptions = [
  'General working hours',
  '24/7 Support',
  'Business hours (9 AM - 6 PM)',
  'Extended hours (8 AM - 10 PM)',
  'Weekend only',
  'Weekdays only'
];

const CreateGroupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    businessHours: 'General working hours',
    addAgentsInNextStep: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required';
    }
    
    if (!formData.businessHours) {
      newErrors.businessHours = 'Business hours are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAlert({
          show: true,
          type: 'success',
          message: 'Group created successfully!'
        });
        
        // Redirect to groups list after a short delay
        setTimeout(() => {
          router.push('/groups');
        }, 1500);
      } else {
        setAlert({
          show: true,
          type: 'error',
          message: data.error || 'Failed to create group'
        });
      }
    } catch (err) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Failed to create group'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/groups');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          component="button"
          variant="body2"
          onClick={handleBack}
          sx={{ textDecoration: 'none', color: 'primary.main' }}
        >
          Groups
        </Link>
        <Typography variant="body2" color="text.primary">
          Create New Group
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mr: 2, textTransform: 'none' }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Create New Group
        </Typography>
      </Box>

      {/* Alert */}
      {alert.show && (
        <Alert 
          severity={alert.type} 
          sx={{ mb: 3 }} 
          onClose={() => setAlert({ show: false, type: '', message: '' })}
        >
          {alert.message}
        </Alert>
      )}

      {/* Form */}
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Name"
              placeholder="e.g. Refund group"
              value={formData.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
            />
            
            <TextField
              label="Description"
              placeholder="e.g. This group will answer all queries related to refunds."
              value={formData.description}
              onChange={handleChange('description')}
              multiline
              rows={4}
              fullWidth
            />
            
            <FormControl fullWidth error={!!errors.businessHours}>
              <InputLabel>Business Hours *</InputLabel>
              <Select
                value={formData.businessHours}
                onChange={handleChange('businessHours')}
                label="Business Hours *"
              >
                {businessHoursOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.addAgentsInNextStep}
                  onChange={handleChange('addAgentsInNextStep')}
                />
              }
              label="Add agents in the next step"
            />
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={loading}
                sx={{ textTransform: 'none' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={<Save />}
                sx={{ textTransform: 'none', minWidth: 120 }}
              >
                {loading ? 'Creating...' : 'Create Group'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateGroupPage;