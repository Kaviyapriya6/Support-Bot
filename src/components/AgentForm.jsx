import React, { useState } from 'react';
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
  const [imagePreview, setImagePreview] = useState(initialData.profileImage || null);
  const [currentRole, setCurrentRole] = useState('');
  const [serverError, setServerError] = useState('');
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
    groups: initialData.groups || [],
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

  const availableGroups = [
    'Support Team', 'Sales Team', 'Technical Team', 
    'Management', 'Customer Success', 'Billing Team'
  ];

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
      await onSubmit(formData);
    } catch (err) {
      setServerError(err.message || 'Something went wrong.');
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {isEdit ? 'Edit Agent' : 'Create New Agent'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isEdit ? 'Update agent information and permissions' : 'Add a new agent to your team'}
        </Typography>
      </Box>

      <Stack spacing={4}>
        {/* Agent Configuration */}
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Person sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'semibold' }}>
                Agent Configuration
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Agent Type *</InputLabel>
                  <Select
                    value={formData.agentType}
                    onChange={(e) => handleInputChange('agentType', e.target.value)}
                    label="Agent Type *"
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
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
                    Work Type *
                  </FormLabel>
                  <RadioGroup
                    value={formData.workType}
                    onChange={(e) => handleInputChange('workType', e.target.value)}
                  >
                    <FormControlLabel
                      value="fulltime"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>Full Time</Typography>
                          <Typography variant="caption" color="text.secondary">
                            8 seats available
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="occasional"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>Occasional</Typography>
                          <Typography variant="caption" color="text.secondary">
                            3 day passes available
                          </Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Agent Details */}
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Email sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'semibold' }}>
                Agent Details
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address *"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="agent@company.com"
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Profile Photo
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    src={imagePreview} 
                    sx={{ width: 80, height: 80 }}
                  >
                    {formData.email ? formData.email.charAt(0).toUpperCase() : 'A'}
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
                        sx={{ mb: 1 }}
                      >
                        Upload Photo
                      </Button>
                    </label>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Square images work best (400x400px)
                    </Typography>
                    {imagePreview && (
                      <Button 
                        color="error" 
                        size="small" 
                        onClick={handleRemoveImage}
                        startIcon={<Delete />}
                        sx={{ mt: 1 }}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>
                    <Schedule sx={{ mr: 1, fontSize: 'small' }} />
                    Timezone *
                  </InputLabel>
                  <Select
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    label="Timezone *"
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
                <FormControl fullWidth>
                  <InputLabel>
                    <Language sx={{ mr: 1, fontSize: 'small' }} />
                    Language *
                  </InputLabel>
                  <Select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    label="Language *"
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
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Email Signature"
                  value={formData.signature}
                  onChange={(e) => handleInputChange('signature', e.target.value)}
                  placeholder="Enter agent's email signature..."
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Permissions & Settings */}
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Settings sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'semibold' }}>
                Permissions & Settings
              </Typography>
            </Box>

            {/* Roles */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Roles
                </Typography>
                <IconButton size="small" sx={{ ml: 1 }}>
                  <Info fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Determines the features that an agent can access
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Autocomplete
                  sx={{ minWidth: 300 }}
                  options={availableRoles}
                  value={currentRole}
                  onChange={(event, newValue) => setCurrentRole(newValue || '')}
                  renderInput={(params) => (
                    <TextField {...params} label="Select role" size="small" />
                  )}
                />
                <Button 
                  variant="contained"
                  onClick={handleAddRole}
                  disabled={!currentRole.trim()}
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.roles.map((role) => (
                  <Chip
                    key={role}
                    label={role}
                    onDelete={() => handleRemoveRole(role)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Ticket Visibility */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Ticket Visibility Scope
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={formData.ticketVisibility}
                  onChange={(e) => handleInputChange('ticketVisibility', e.target.value)}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>All tickets</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Can view and edit all tickets
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="group"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Group tickets</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Can view and edit tickets in their group(s) and assigned tickets
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="assigned"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Assigned tickets</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Can view and edit only tickets assigned to them
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Groups */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Groups
                </Typography>
                <Group sx={{ ml: 1, fontSize: 'small', color: 'text.secondary' }} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Organize agents into groups for better collaboration
              </Typography>
              <Autocomplete
                multiple
                options={availableGroups}
                value={formData.groups}
                onChange={(event, newValue) => handleInputChange('groups', newValue)}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Choose groups" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={option}
                    />
                  ))
                }
              />
            </Box>
          </CardContent>
        </Card>

        {/* Error Message */}
        {serverError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {serverError}
          </Alert>
        )}

        {/* Action Buttons */}
        <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ px: 4 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{ px: 4 }}
            >
              {isEdit ? 'Update Agent' : 'Create Agent'}
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default AgentForm;