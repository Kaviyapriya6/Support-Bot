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
  const [showOtherIssueType, setShowOtherIssueType] = useState(false);
  const [otherIssueType, setOtherIssueType] = useState('');

  const validationSchema = Yup.object({
    customerName: Yup.string()
      .required('Customer Name is required')
      .min(3, 'Customer Name must be at least 3 characters')
      .max(50, 'Customer Name must not exceed 50 characters'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address'
      ),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(
        /^[0-9]{10}$/,
        'Phone number must be exactly 10 digits'
      )
      .test(
        'is-valid-phone',
        'Phone number must contain only digits',
        (value) => value && /^\d+$/.test(value)
      ),
    issueType: Yup.string()
      .required('Issue type is required')
      .min(3, 'Issue type must be at least 3 characters')
      .max(100, 'Issue type must not exceed 100 characters'),
    priority: Yup.string()
      .required('Priority is required')
      .oneOf(['Low', 'Medium', 'High'], 'Please select a valid priority level'),
    subject: Yup.string()
      .required('Subject is required')
      .min(5, 'Subject must be at least 5 characters')
      .max(200, 'Subject must not exceed 200 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters')
      .max(2000, 'Description must not exceed 2000 characters'),
    file: Yup.mixed()
      .nullable()
      .test(
        'fileSize',
        'File size must be less than 5MB',
        (value) => !value || (value && value.size <= 5 * 1024 * 1024)
      )
      .test(
        'fileType',
        'Only images, PDFs, and documents are allowed',
        (value) => {
          if (!value) return true;
          const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'
          ];
          return allowedTypes.includes(value.type);
        }
      )
  });

  const formik = useFormik({
    initialValues: initialValues || {
      customerName: '',
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
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Only images, PDFs, and documents are allowed');
        return;
      }
      
      setFileName(file.name);
      formik.setFieldValue('file', file);
    }
  };

  const handleIssueTypeChange = (event) => {
    const value = event.target.value;
    if (value === 'Other') {
      setShowOtherIssueType(true);
      formik.setFieldValue('issueType', '');
    } else {
      setShowOtherIssueType(false);
      setOtherIssueType('');
      formik.setFieldValue('issueType', value);
    }
  };

  const handleOtherIssueTypeChange = (event) => {
    const value = event.target.value;
    setOtherIssueType(value);
    formik.setFieldValue('issueType', value);
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
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    bgcolor: '#fafcff'
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <PersonIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      Customer Information
                    </Typography>
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Customer Name"
                        name="customerName"
                        value={formik.values.customerName || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                        helperText={formik.touched.customerName && formik.errors.customerName}
                        placeholder="Enter customer name (3-50 characters)"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: 'white'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formik.values.email || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        placeholder="Enter valid email address"
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ color: '#64748b', mr: 1 }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: 'white'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formik.values.phone || ''}
                        onChange={(e) => {
                          // Only allow digits and limit to 10 characters
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          formik.setFieldValue('phone', value);
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        placeholder="Enter 10-digit phone number"
                        InputProps={{
                          startAdornment: <PhoneIcon sx={{ color: '#64748b', mr: 1 }} />
                        }}
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

                <Divider sx={{ my: 4, borderColor: '#e2e8f0' }} />

                {/* Issue Description Heading */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <AssignmentIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    Issue Description
                  </Typography>
                </Stack>

                {/* Issue Details Row - All fields in one horizontal line */}
                <Grid container spacing={3} sx={{ mb: 3 }} alignItems="flex-start">
                  {/* Subject */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formik.values.subject || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.subject && Boolean(formik.errors.subject)}
                      helperText={formik.touched.subject && formik.errors.subject}
                      placeholder="Brief summary (5-200 chars)"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: 'white'
                        }
                      }}
                    />
                  </Grid>
                  {/* Issue Type */}
                  <Grid item xs={12} md={3}>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel>Issue Type</InputLabel>
                        <Select
                          name="issueType"
                          value={showOtherIssueType ? 'Other' : (formik.values.issueType || '')}
                          onChange={handleIssueTypeChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.issueType && Boolean(formik.errors.issueType)}
                          sx={{
                            borderRadius: 2,
                            bgcolor: 'white',
                            height: 56,
                            '& .MuiSelect-select': {
                              height: '24px !important',
                              display: 'flex',
                              alignItems: 'center',
                              padding: '16px 14px',
                            }
                          }}
                          displayEmpty
                        >
                          <MenuItem value="">
                            <Typography sx={{ color: '#9ca3af' }}>Select issue type</Typography>
                          </MenuItem>
                          <MenuItem value="Technical">Technical Issue</MenuItem>
                          <MenuItem value="Billing">Billing Issue</MenuItem>
                          <MenuItem value="Account">Account Issue</MenuItem>
                          <MenuItem value="General">General Inquiry</MenuItem>
                          <MenuItem value="Bug Report">Bug Report</MenuItem>
                          <MenuItem value="Feature Request">Feature Request</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                        {formik.touched.issueType && formik.errors.issueType && (
                          <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5, ml: 2 }}>
                            {formik.errors.issueType}
                          </Typography>
                        )}
                      </FormControl>
                      
                      {showOtherIssueType && (
                        <TextField
                          fullWidth
                          label="Specify Issue Type"
                          value={otherIssueType}
                          onChange={handleOtherIssueTypeChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.issueType && Boolean(formik.errors.issueType)}
                          helperText={formik.touched.issueType && formik.errors.issueType}
                          placeholder="Please specify the issue type"
                          sx={{
                            mt: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              bgcolor: 'white',
                              height: 56,
                            },
                            '& .MuiInputLabel-root': {
                              color: '#374151',
                            },
                            '& .MuiOutlinedInput-input': {
                              padding: '16px 14px',
                            }
                          }}
                        />
                      )}
                    </Box>
                  </Grid>
                  {/* Detailed Description */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Detailed Description"
                      name="description"
                      value={formik.values.description || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                      placeholder="Comprehensive description (10-2000 chars)"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: 'white',
                          height: 56, // Match height with other fields
                          alignItems: 'flex-start'
                        },
                        '& .MuiInputBase-inputMultiline': {
                          paddingTop: '16px'
                        }
                      }}
                    />
                  </Grid>
                  {/* Priority Level */}
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      {/* <InputLabel>Priority Level</InputLabel> */}
                      <Select
                        name="priority"
                        value={formik.values.priority || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.priority && Boolean(formik.errors.priority)}
                        sx={{
                          borderRadius: 2,
                          bgcolor: 'white',
                          height: 56,
                          minHeight: 56,
                          '& .MuiSelect-select': {
                            height: '24px !important',
                            minHeight: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '16px 14px',
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
                            return (
                              <Typography sx={{ color: '#9ca3af', minHeight: '24px', display: 'flex', alignItems: 'center' }}>
                                Select priority
                              </Typography>
                            );
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
                </Grid>

                <Divider sx={{ my: 4, borderColor: '#e2e8f0' }} />

                {/* File Upload Section */}
                <Box>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      Attachments
                    </Typography>
                    <Chip 
                      label="Optional" 
                      color="info" 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: '0.75rem'
                      }}
                    />
                  </Stack>
                  
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
                      Upload Files (Optional)
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                      Drag and drop files here or click to browse (Max size: 5MB) - This field is optional
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', mb: 2, display: 'block' }}>
                      Supported formats: JPG, PNG, GIF, PDF, DOC, DOCX, TXT
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