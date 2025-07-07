import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  styled
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const UploadArea = styled(Paper)(({ theme }) => ({
  border: '2px dashed #e0e0e0',
  borderRadius: '8px',
  padding: '40px 20px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#1976d2',
    backgroundColor: '#f5f5f5'
  }
}));

const CreateTicketForm = () => {
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phoneNumber: '',
    issueType: '',
    priority: 'Medium',
    subject: '',
    description: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    // Handle cancel logic here
  };

  const handleCreateWithBot = () => {
    console.log('Create ticket using bot');
    // Handle bot creation logic here
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
            Create New Ticket
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Fill out the form below to create a new support ticket.
          </Typography>

          <Grid container spacing={3}>
            {/* Contact Name and Email */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Name"
                required
                value={formData.contactName}
                onChange={handleInputChange('contactName')}
                placeholder="Enter contact name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="Enter email address"
                variant="outlined"
              />
            </Grid>

            {/* Phone Number and Issue Type */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange('phoneNumber')}
                placeholder="Enter phone number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Issue Type</InputLabel>
                <Select
                  value={formData.issueType}
                  onChange={handleInputChange('issueType')}
                  label="Issue Type"
                >
                  <MenuItem value="">
                    <em>Select issue type</em>
                  </MenuItem>
                  <MenuItem value="technical">Technical Issue</MenuItem>
                  <MenuItem value="billing">Billing</MenuItem>
                  <MenuItem value="general">General Inquiry</MenuItem>
                  <MenuItem value="bug">Bug Report</MenuItem>
                  <MenuItem value="feature">Feature Request</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Priority */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={handleInputChange('priority')}
                  label="Priority"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Subject */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                required
                value={formData.subject}
                onChange={handleInputChange('subject')}
                placeholder="Enter ticket subject"
                variant="outlined"
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                required
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange('description')}
                placeholder="Describe the issue in detail"
                variant="outlined"
              />
            </Grid>

            {/* Attach Files */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                Attach Files
              </Typography>
              <UploadArea elevation={0}>
                <CloudUpload sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
                <Typography variant="body1" sx={{ color: '#1976d2', mb: 1 }}>
                  Click to upload files or drag and drop
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  PDF, DOC, DOCX, JPG, PNG, GIF up to 10MB each
                </Typography>
              </UploadArea>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{ minWidth: 100 }}
                >
                  Cancel
                </Button>
                {/* <Button
                  variant="outlined"
                  onClick={handleCreateWithBot}
                  sx={{ minWidth: 160 }}
                >
                  Create Ticket Using Bot
                </Button> */}
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ minWidth: 120 }}
                >
                  Submit Ticket
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateTicketForm;