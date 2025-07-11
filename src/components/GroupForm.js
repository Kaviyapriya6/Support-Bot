import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';

const businessHoursOptions = [
  'General working hours',
  '24/7 Support',
  'Business hours (9 AM - 6 PM)',
  'Extended hours (8 AM - 10 PM)',
  'Weekend only',
  'Weekdays only'
];

const GroupForm = ({ 
  open, 
  onClose, 
  onSubmit, 
  initialData = null, 
  isEditing = false,
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    businessHours: initialData?.businessHours || 'General working hours',
    addAgentsInNextStep: false
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      businessHours: 'General working hours',
      addAgentsInNextStep: false
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {isEditing ? 'Edit Group' : 'New Group'}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              placeholder="e.g. Refund group"
              value={formData.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
              size="small"
            />
            
            <TextField
              label="Description"
              placeholder="e.g. This group will answer all queries related to refunds."
              value={formData.description}
              onChange={handleChange('description')}
              multiline
              rows={3}
              fullWidth
              size="small"
            />
            
            <FormControl fullWidth size="small">
              <InputLabel>Business Hours</InputLabel>
              <Select
                value={formData.businessHours}
                onChange={handleChange('businessHours')}
                label="Business Hours"
                error={!!errors.businessHours}
              >
                {businessHoursOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {!isEditing && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.addAgentsInNextStep}
                    onChange={handleChange('addAgentsInNextStep')}
                    size="small"
                  />
                }
                label="Add agents in the next step"
              />
            )}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            sx={{ minWidth: 80 }}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GroupForm;