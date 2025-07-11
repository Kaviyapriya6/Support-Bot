import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, TextField, Button, Typography, Avatar, Paper, Grid, Alert, MenuItem,
  FormControl, InputLabel, Select, IconButton, Chip, RadioGroup, FormControlLabel,
  Radio, FormLabel, Autocomplete, Card, CardContent, Divider, Stack
} from '@mui/material';
import { 
  PhotoCamera, 
  Delete, 
  Info, 
  Person, 
  Email, 
  Language, 
  Schedule, 
  Settings, 
  Group, 
  Add 
} from '@mui/icons-material';

const AgentForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(initialData.profileImage || null);
  const [currentRole, setCurrentRole] = useState('');
  const [serverError, setServerError] = useState('');
  const [availableGroups, setAvailableGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [formData, setFormData] = useState({
    agentType: initialData.agentType || 'support',
    workType: initialData.workType || 'fulltime',
    email: initialData.email || '',
    profileImage: initialData.profileImage || null,
    timezone: initialData.timezone || 'GMT-04:00',
    language: initialData.language || 'english',
    signature: initialData.signature || '',
    roles: initialData.roles || ['Agent'],
    ticketVisibility: initialData.ticketVisibility || 'all',
    group: initialData.groups && initialData.groups.length > 0 ? initialData.groups[0] : '',
  });

  const agentTypes = [
    { value: 'support', label: 'Support Agent' },
    { value: 'sales', label: 'Sales Agent' },
    { value: 'admin', label: 'Admin Agent' },
    { value: 'manager', label: 'Manager' },
  ];

  const timezones = [
    { value: 'GMT-04:00', label: '(GMT-04:00) Eastern Time (US & Canada)' },
    { value: 'GMT-05:00', label: '(GMT-05:00) Central Time (US & Canada)' },
    { value: 'GMT-06:00', label: '(GMT-06:00) Mountain Time (US & Canada)' },
    { value: 'GMT-07:00', label: '(GMT-07:00) Pacific Time (US & Canada)' },
    { value: 'GMT+00:00', label: '(GMT+00:00) Greenwich Mean Time' },
    { value: 'GMT+01:00', label: '(GMT+01:00) Central European Time' },
    { value: 'GMT+05:30', label: '(GMT+05:30) India Standard Time' },
    { value: 'GMT+08:00', label: '(GMT+08:00) China Standard Time' },
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
  ];

  const availableRoles = [
    'Agent', 'Admin', 'Manager', 'Support Lead', 'Sales Lead', 
    'Customer Success', 'Technical Support', 'Billing Support'
  ];

  // Fetch groups from API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoadingGroups(true);
        const response = await fetch('/api/groups');
        if (response.ok) {
          const data = await response.json();
          const groups = data.success ? data.data : data;
          setAvailableGroups(groups.map(group => group.name));
        } else {
          setAvailableGroups([]);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
        setAvailableGroups([]);
      } finally {
        setLoadingGroups(false);
      }
    };

    fetchGroups();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setImagePreview(imageUrl);
      handleInputChange('profileImage', imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    handleInputChange('profileImage', null);
  };

  const handleAddRole = () => {
    const role = currentRole.trim();
    if (role && !formData.roles.includes(role)) {
      handleInputChange('roles', [...formData.roles, role]);
      setCurrentRole('');
    }
  };

  const handleRemoveRole = (role) => {
    handleInputChange('roles', formData.roles.filter(r => r !== role));
  };

  const handleSubmit = async () => {
    setServerError('');
    try {
      // Convert single group to groups array for API compatibility
      const submitData = {
        ...formData,
        groups: formData.group ? [formData.group] : []
      };
      // Remove the single group field since API expects groups array
      delete submitData.group;
      
      await onSubmit(submitData);
    } catch (err) {
      setServerError(err.message || 'Something went wrong.');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold', 
          color: '#1a1a1a',
          fontSize: '2rem'
        }}>
          {isEdit ? 'Edit Agent' : 'Create New Agent'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
          {isEdit ? 'Update agent information and permissions' : 'Add a new agent to your team'}
        </Typography>
      </Box>

      <Stack spacing={3}>
        {/* Agent Configuration */}
        <Paper elevation={0} sx={{ bgcolor: 'white', border: '1px solid #e5e7eb' }}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Person sx={{ mr: 1.5, color: '#6b7280', fontSize: '1.25rem' }} />
              <Typography variant="h6" component="h2" sx={{ 
                fontWeight: 600, 
                color: '#1a1a1a',
                fontSize: '1.1rem'
              }}>
                Agent Configuration
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                  Agent Type *
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.agentType}
                    onChange={(e) => handleInputChange('agentType', e.target.value)}
                    displayEmpty
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        bgcolor: 'white',
                        '& fieldset': { borderColor: '#d1d5db' },
                        '&:hover fieldset': { borderColor: '#9ca3af' },
                        '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                      },
                      '& .MuiSelect-select': {
                        py: 1.5,
                        fontSize: '0.95rem'
                      }
                    }}
                  >
                    {agentTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
                  Work Type *
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={formData.workType}
                    onChange={(e) => handleInputChange('workType', e.target.value)}
                    sx={{ gap: 1 }}
                  >
                    <FormControlLabel
                      value="fulltime"
                      control={<Radio size="small" />}
                      label={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
                            Full Time
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#6b7280' }}>
                            8 seats available
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="occasional"
                      control={<Radio size="small" />}
                      label={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
                            Occasional
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#6b7280' }}>
                            3 day passes available
                          </Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Agent Details */}
        <Paper elevation={0} sx={{ bgcolor: 'white', border: '1px solid #e5e7eb' }}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Email sx={{ mr: 1.5, color: '#6b7280', fontSize: '1.25rem' }} />
              <Typography variant="h6" component="h2" sx={{ 
                fontWeight: 600, 
                color: '#1a1a1a',
                fontSize: '1.1rem'
              }}>
                Agent Details
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                  Email Address *
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="agent@company.com"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#d1d5db' },
                      '&:hover fieldset': { borderColor: '#9ca3af' },
                      '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                    },
                    '& .MuiInputBase-input': {
                      py: 1.5,
                      fontSize: '0.95rem'
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
                  Profile Photo
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    src={imagePreview} 
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      bgcolor: '#f3f4f6',
                      color: '#6b7280',
                      fontSize: '1.5rem'
                    }}
                  >
                    {formData.email ? formData.email.charAt(0).toUpperCase() : <Person />}
                  </Avatar>
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="profile-image-upload"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="profile-image-upload">
                      <Button 
                        variant="outlined" 
                        component="span" 
                        startIcon={<PhotoCamera />}
                        size="small"
                        sx={{ 
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontSize: '0.875rem',
                          borderColor: '#d1d5db',
                          color: '#374151',
                          '&:hover': {
                            borderColor: '#9ca3af',
                            bgcolor: '#f9fafb'
                          }
                        }}
                      >
                        Upload Photo
                      </Button>
                    </label>
                    <Typography variant="caption" display="block" sx={{ 
                      mt: 1, 
                      color: '#6b7280',
                      fontSize: '0.75rem'
                    }}>
                      Square images work best (400x400px)
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                  Timezone *
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        bgcolor: 'white',
                        '& fieldset': { borderColor: '#d1d5db' },
                        '&:hover fieldset': { borderColor: '#9ca3af' },
                        '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                      },
                      '& .MuiSelect-select': {
                        py: 1.5,
                        fontSize: '0.95rem'
                      }
                    }}
                  >
                    {timezones.map((tz) => (
                      <MenuItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                  Language *
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        bgcolor: 'white',
                        '& fieldset': { borderColor: '#d1d5db' },
                        '&:hover fieldset': { borderColor: '#9ca3af' },
                        '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                      },
                      '& .MuiSelect-select': {
                        py: 1.5,
                        fontSize: '0.95rem'
                      }
                    }}
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                  Email Signature
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.signature}
                  onChange={(e) => handleInputChange('signature', e.target.value)}
                  placeholder="Enter agent's email signature..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#d1d5db' },
                      '&:hover fieldset': { borderColor: '#9ca3af' },
                      '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '0.95rem'
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Permissions & Settings */}
        <Paper elevation={0} sx={{ bgcolor: 'white', border: '1px solid #e5e7eb' }}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Settings sx={{ mr: 1.5, color: '#6b7280', fontSize: '1.25rem' }} />
              <Typography variant="h6" component="h2" sx={{ 
                fontWeight: 600, 
                color: '#1a1a1a',
                fontSize: '1.1rem'
              }}>
                Permissions & Settings
              </Typography>
            </Box>

            {/* Roles */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                  Roles
                </Typography>
                <IconButton size="small" sx={{ ml: 1, color: '#9ca3af' }}>
                  <Info fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 2, fontSize: '0.875rem' }}>
                Determines the features that an agent can access
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Autocomplete
                  sx={{ minWidth: 250 }}
                  options={availableRoles}
                  value={currentRole}
                  onChange={(event, newValue) => setCurrentRole(newValue || '')}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      placeholder="Select a role..."
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          bgcolor: 'white',
                          '& fieldset': { borderColor: '#d1d5db' },
                          '&:hover fieldset': { borderColor: '#9ca3af' },
                          '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                        }
                      }}
                    />
                  )}
                />
                <Button 
                  variant="contained"
                  onClick={handleAddRole}
                  disabled={!currentRole.trim()}
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none',
                    bgcolor: '#3b82f6',
                    '&:hover': { bgcolor: '#2563eb' },
                    '&:disabled': { bgcolor: '#e5e7eb' }
                  }}
                >
                  + Add
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.roles.map((role) => (
                  <Chip
                    key={role}
                    label={role}
                    onDelete={() => handleRemoveRole(role)}
                    sx={{ 
                      borderRadius: '6px',
                      bgcolor: '#dbeafe',
                      color: '#1e40af',
                      '& .MuiChip-deleteIcon': {
                        color: '#1e40af'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Ticket Visibility */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
                Scope for ticket visibility
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={formData.ticketVisibility}
                  onChange={(e) => handleInputChange('ticketVisibility', e.target.value)}
                  sx={{ gap: 1 }}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio size="small" />}
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
                          All tickets
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          Can view and edit all tickets
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="group"
                    control={<Radio size="small" />}
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
                          Group tickets
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          Can view and edit tickets in their group(s) and assigned tickets
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="assigned"
                    control={<Radio size="small" />}
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
                          Assigned tickets
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          Can view and edit only tickets assigned to them
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Groups */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                  Group
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 2, fontSize: '0.875rem' }}>
                Assign agent to a group for better collaboration
              </Typography>
              
              {loadingGroups ? (
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Loading groups...
                  </Typography>
                </Box>
              ) : availableGroups.length === 0 ? (
                <Box sx={{ 
                  border: '2px dashed #d1d5db', 
                  borderRadius: '8px', 
                  p: 3, 
                  textAlign: 'center',
                  bgcolor: '#f9fafb'
                }}>
                  <Group sx={{ fontSize: 40, color: '#9ca3af', mb: 1 }} />
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    No groups available. Create groups from the Groups section to organize agents.
                  </Typography>
                </Box>
              ) : (
                <>
                  <FormControl fullWidth>
                    <Select
                      value={formData.group}
                      onChange={(e) => handleInputChange('group', e.target.value)}
                      displayEmpty
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          bgcolor: 'white',
                          '& fieldset': { borderColor: '#d1d5db' },
                          '&:hover fieldset': { borderColor: '#9ca3af' },
                          '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                        },
                        '& .MuiSelect-select': {
                          py: 1.5,
                          fontSize: '0.95rem'
                        }
                      }}
                    >
                      <MenuItem value="">
                        <em>No group assigned</em>
                      </MenuItem>
                      {availableGroups.map((group) => (
                        <MenuItem key={group} value={group}>
                          {group}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography variant="caption" sx={{ 
                    color: '#6b7280', 
                    mt: 1, 
                    display: 'block',
                    fontSize: '0.75rem'
                  }}>
                    Select a group to assign this agent to
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Error Message */}
        {serverError && (
          <Alert severity="error" sx={{ borderRadius: '8px' }}>
            {serverError}
          </Alert>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{ 
              borderRadius: '8px',
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              borderColor: '#d1d5db',
              color: '#374151',
              '&:hover': {
                borderColor: '#9ca3af',
                bgcolor: '#f9fafb'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ 
              borderRadius: '8px',
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              bgcolor: '#3b82f6',
              '&:hover': { bgcolor: '#2563eb' }
            }}
          >
            {isEdit ? 'Update Agent' : 'Create Agent'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default AgentForm;