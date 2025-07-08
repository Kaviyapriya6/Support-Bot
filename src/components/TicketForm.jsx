'use client';

import {
  Box, Button, TextField, Typography, MenuItem,
  Select, InputLabel, FormControl, Grid, Paper,
  Card, CardContent, Divider, Chip,
  Alert, Stack, LinearProgress
} from '@mui/material';
import {
  AttachFile as AttachFileIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketForm({ initialValues, onSubmit, mode = 'create' }) {
  const router = useRouter();
  const [fileName, setFileName] = useState(initialValues?.fileName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    customerId: Yup.string().required('Customer ID is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    issueType: Yup.string().required('Issue type is required'),
    priority: Yup.string().required('Priority is required'),
    subject: Yup.string().required('Subject is required'),
    description: Yup.string().required('Description is required'),
    file: Yup.mixed()
  });

  const formik = useFormik({
    initialValues: initialValues || {
      customerId: '',
      email: '',
      phone: '',
      ticketId: '',
      issueType: '',
      priority: '',
      status: mode === 'create' ? 'Open' : '',
      subject: '',
      description: '',
      file: null
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Always set status to "Open" for new tickets
        const submissionValues = {
          ...values,
          status: mode === 'create' ? 'Open' : values.status
        };

        if (onSubmit) {
          await onSubmit({ ...submissionValues, fileName });
          return;
        }

        const { file, ...payloadData } = submissionValues;
        const payload = { ...payloadData, fileName };

        const url = mode === 'create' ? '/api/tickets' : `/api/tickets/${values._id}`;
        const method = mode === 'create' ? 'POST' : 'PUT';

        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to save ticket');
        }

        const savedTicket = await res.json();
        alert('Ticket saved successfully!');
        router.push('/tickets');
      } catch (err) {
        console.error('Error saving ticket:', err);
        alert(`Error saving ticket: ${err.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      formik.setFieldValue('file', file);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f8fafc',
      p: 3
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ 
          mb: 4,
          p: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ 
                p: 1.5, 
                bgcolor: 'primary.main', 
                borderRadius: 2,
                color: 'white'
              }}>
                <AssignmentIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  {mode === 'create' ? 'Create New Ticket' : 'Edit Ticket'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                  {mode === 'create' ? 'Fill in the details to create a new support ticket' : 'Update the ticket information'}
                </Typography>
              </Box>
            </Stack>
            
            {/* Action Buttons in Header */}
            <Stack direction="row" spacing={2}>
              <Button 
                variant="outlined" 
                onClick={() => router.back()}
                startIcon={<CancelIcon />}
                sx={{ 
                  borderColor: '#e2e8f0',
                  color: '#64748b',
                  '&:hover': {
                    borderColor: '#cbd5e1',
                    bgcolor: '#f8fafc'
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="ticket-form"
                variant="contained" 
                disabled={isSubmitting || !formik.isValid}
                startIcon={<SaveIcon />}
                sx={{ 
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' },
                  px: 3
                }}
              >
                {isSubmitting ? 'Saving...' : 'Save Ticket'}
              </Button>
            </Stack>
          </Stack>
          
          {isSubmitting && (
            <LinearProgress 
              sx={{ 
                mt: 2, 
                borderRadius: 1,
                bgcolor: '#e2e8f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 1
                }
              }} 
            />
          )}
        </Box>

        {/* Main Form */}
        <Paper sx={{ 
          p: 4, 
          borderRadius: 3,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0',
          bgcolor: 'white'
        }}>
          <form id="ticket-form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              {/* Customer Information Section */}
              <Grid item xs={12}>
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <PersonIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      Customer Information
                    </Typography>
                  </Stack>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Customer ID"
                        name="customerId"
                        value={formik.values.customerId || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.customerId && Boolean(formik.errors.customerId)}
                        helperText={formik.touched.customerId && formik.errors.customerId}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Ticket ID"
                        name="ticketId"
                        value={formik.values.ticketId || ''}
                        disabled
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: '#f8fafc'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formik.values.email || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ color: '#64748b', mr: 1 }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formik.values.phone || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        InputProps={{
                          startAdornment: <PhoneIcon sx={{ color: '#64748b', mr: 1 }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 4, borderColor: '#e2e8f0' }} />

                {/* Issue Description and Ticket Classification Row */}
                <Grid container spacing={4} sx={{ mb: 3 }}>
                  {/* Issue Description Section - Left Side */}
                  <Grid item xs={12} md={8}>
                    <Paper elevation={0} sx={{ 
                      p: 3, 
                      border: '1px solid #e0e0e0', 
                      borderRadius: 2,
                      bgcolor: '#fafafa',
                      height: '100%'
                    }}>
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                        <Box sx={{
                          p: 1,
                          borderRadius: 1,
                          bgcolor: 'primary.main',
                          color: 'white'
                        }}>
                          <AssignmentIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                          Issue Description
                        </Typography>
                      </Stack>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={formik.values.subject || ''}
                            onChange={formik.handleChange}
                            error={formik.touched.subject && Boolean(formik.errors.subject)}
                            helperText={formik.touched.subject && formik.errors.subject}
                            placeholder="Brief summary of the issue"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'white'
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={10}
                            label="Detailed Description"
                            name="description"
                            value={formik.values.description || ''}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            placeholder="Please provide a comprehensive description of the issue, including steps to reproduce, error messages, and any relevant details..."
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'white'
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Ticket Classification Section - Right Side */}
                  <Grid item xs={12} md={4}>
                    <Paper elevation={0} sx={{ 
                      p: 3, 
                      border: '1px solid #e0e0e0', 
                      borderRadius: 2,
                      bgcolor: '#f8fafc',
                      height: '100%'
                    }}>
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                        <Box sx={{
                          p: 1,
                          borderRadius: 1,
                          bgcolor: 'warning.main',
                          color: 'white'
                        }}>
                          <AssignmentIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                          Classification
                        </Typography>
                      </Stack>
                      
   <Grid item xs={12}>
  <TextField
    fullWidth
    name="issueType"
    label="Issue Type"
    value={formik.values.issueType || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.issueType && Boolean(formik.errors.issueType)}
    helperText={formik.touched.issueType && formik.errors.issueType}
    placeholder="Enter the type of issue (e.g., Technical, Billing, General)"
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        bgcolor: 'white',
        minHeight: 56,
      },
      '& .MuiInputLabel-root': {
        color: '#374151',
      },
      '& .MuiOutlinedInput-input': {
        padding: '16px 14px',
      }
    }}
  />
</Grid>

<Grid item xs={12}>
  <FormControl fullWidth>
    <InputLabel>Priority Level</InputLabel>
    <Select
      name="priority"
      value={formik.values.priority || ''}
      onChange={formik.handleChange}
      error={formik.touched.priority && Boolean(formik.errors.priority)}
      sx={{
        borderRadius: 2,
        bgcolor: 'white',
        minHeight: 56,
        '& .MuiSelect-select': {
          minHeight: '24px !important',
          display: 'flex',
          alignItems: 'center'
        }
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 300,
            '& .MuiMenuItem-root': {
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }
          }
        }
      }}
      displayEmpty
      renderValue={(selected) => {
        if (!selected) {
          return <Typography sx={{ color: '#9ca3af' }}></Typography>;
        }
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              label={selected} 
              color={selected === 'High' ? 'error' : selected === 'Medium' ? 'warning' : 'success'} 
              size="small" 
            />
            <Typography variant="body2">{selected} Priority</Typography>
          </Box>
        );
      }}
    >
      <MenuItem value="Low">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip label="Low" color="success" size="small" />
          <Typography variant="body2">Low Priority</Typography>
        </Box>
      </MenuItem>
      <MenuItem value="Medium">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip label="Med" color="warning" size="small" />
          <Typography variant="body2">Medium Priority</Typography>
        </Box>
      </MenuItem>
      <MenuItem value="High">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip label="High" color="error" size="small" />
          <Typography variant="body2">High Priority</Typography>
        </Box>
      </MenuItem>
    </Select>
    {formik.touched.priority && formik.errors.priority && (
      <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5, ml: 2 }}>
        {formik.errors.priority}
      </Typography>
    )}
  </FormControl>
</Grid>



                      {/* Current Values Display */}
                      <Box sx={{ mt: 4 }}>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500, mb: 2, display: 'block' }}>
                          Current Classification:
                        </Typography>
                        <Stack direction="column" spacing={2}>
                          {formik.values.issueType && (
                            <Chip 
                              label={`Type: ${formik.values.issueType}`} 
                              variant="outlined"
                              size="small"
                              sx={{ 
                                fontWeight: 500, 
                                borderColor: 'primary.main', 
                                color: 'primary.main',
                                alignSelf: 'flex-start'
                              }}
                            />
                          )}
                          {formik.values.priority && (
                            <Chip 
                              label={`Priority: ${formik.values.priority}`} 
                              color={formik.values.priority === 'High' ? 'error' : formik.values.priority === 'Medium' ? 'warning' : 'success'}
                              variant="filled"
                              size="small"
                              sx={{ 
                                fontWeight: 500,
                                alignSelf: 'flex-start'
                              }}
                            />
                          )}
                          {mode === 'create' && (
                            <Chip 
                              label="Status: Open" 
                              color="info"
                              variant="filled"
                              size="small"
                              sx={{ 
                                fontWeight: 500,
                                alignSelf: 'flex-start'
                              }}
                            />
                          )}
                          {mode === 'edit' && formik.values.status && (
                            <Chip 
                              label={`Status: ${formik.values.status}`} 
                              color={formik.values.status === 'Open' ? 'info' : formik.values.status === 'In Progress' ? 'warning' : formik.values.status === 'Resolved' ? 'success' : 'default'}
                              variant="filled"
                              size="small"
                              sx={{ 
                                fontWeight: 500,
                                alignSelf: 'flex-start'
                              }}
                            />
                          )}
                        </Stack>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: '#e2e8f0' }} />

                {/* File Upload Section */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 3 }}>
                    Attachments
                  </Typography>
                  
                  <Box sx={{ 
                    p: 4, 
                    border: '2px dashed #cbd5e1', 
                    borderRadius: 3,
                    textAlign: 'center',
                    bgcolor: '#f8fafc',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: '#f0f9ff'
                    }
                  }}>
                    <CloudUploadIcon sx={{ fontSize: 48, color: '#64748b', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                      Upload Files
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                      Drag and drop files here or click to browse
                    </Typography>
                    <Button 
                      variant="contained" 
                      component="label"
                      startIcon={<AttachFileIcon />}
                      sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1
                      }}
                    >
                      Choose Files
                      <input hidden type="file" onChange={handleFileChange} />
                    </Button>
                    
                    {fileName && (
                      <Alert 
                        severity="success" 
                        sx={{ 
                          mt: 3, 
                          maxWidth: 400,
                          mx: 'auto',
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {fileName}
                        </Typography>
                      </Alert>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}