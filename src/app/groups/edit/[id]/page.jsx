'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  Breadcrumbs,
  Link,
  CircularProgress,
  Skeleton
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

const EditGroupPage = () => {
  const router = useRouter();
  const params = useParams();
  const groupId = params.id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    businessHours: 'General working hours'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Fetch group data
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        setFetchLoading(true);
        const response = await fetch(`/api/groups/${groupId}`);
        const data = await response.json();
        
        if (data.success) {
          setFormData({
            name: data.data.name,
            description: data.data.description || '',
            businessHours: data.data.businessHours
          });
        } else {
          setAlert({
            show: true,
            type: 'error',
            message: data.error || 'Failed to fetch group'
          });
        }
      } catch (err) {
        setAlert({
          show: true,
          type: 'error',
          message: 'Failed to fetch group'
        });
      } finally {
        setFetchLoading(false);
      }
    };

    if (groupId) {
      fetchGroup();
    }
  }, [groupId]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
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
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
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
          message: 'Group updated successfully!'
        });
        
        // Redirect to groups list after a short delay
        setTimeout(() => {
          router.push('/groups');
        }, 1500);
      } else {
        setAlert({
          show: true,
          type: 'error',
          message: data.error || 'Failed to update group'
        });
      }
    } catch (err) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Failed to update group'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/groups');
  };

  if (fetchLoading) {
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Skeleton variant="text" width={200} height={30} sx={{ mb: 2 }} />
        <Skeleton variant="text" width={300} height={40} sx={{ mb: 3 }} />
        <Paper sx={{ p: 4 }}>
          <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 3 }} />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Skeleton variant="rectangular" width={80} height={40} />
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>
        </Paper>
      </Box>
    );
  }

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
          Edit Group
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
          Edit Group
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
                {loading ? 'Updating...' : 'Update Group'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditGroupPage;