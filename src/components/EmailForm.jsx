'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Paper,
  Chip,
  IconButton,
  Toolbar,
  Divider,
  Collapse,
  Grid,
  Alert,
  CircularProgress,
  Snackbar,
  FormHelperText
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  FormatListBulleted,
  FormatListNumbered,
  Link as LinkIcon,
  Code,
  Image,
  FormatQuote,
  AttachFile,
  InsertPhoto,
  TableChart,
  Close,
  Add,
  Send,
  Cancel,
  Warning,
  CheckCircle
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const SupportTicketForm = ({ onSubmit }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    from: 'ihub (support@smsgroup-support.freshdesk.com)',
    to: '',
    cc: [],
    bcc: [],
    subject: '',
    description: '',
    priority: 'Low',
    status: 'Open',
    tags: '',
    group: '',
    type: '',
    referenceNumber: '',
    sendAnother: false,
    attachments: []
  });

  const [showMoreFields, setShowMoreFields] = useState(false);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [ccInput, setCcInput] = useState('');
  const [bccInput, setBccInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email?.trim());
  };

  const validateForm = () => {
    const errors = {};

    // Required field validations
    if (!formData.to?.trim()) {
      errors.to = 'Recipient email is required';
    } else if (!validateEmail(formData.to)) {
      errors.to = 'Please enter a valid email address';
    }

    if (!formData.subject?.trim()) {
      errors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters long';
    }

    if (!formData.description?.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters long';
    }

    // Validate CC emails
    const invalidCcEmails = formData.cc.filter(email => !validateEmail(email));
    if (invalidCcEmails.length > 0) {
      errors.cc = `Invalid CC emails: ${invalidCcEmails.join(', ')}`;
    }

    // Validate BCC emails
    const invalidBccEmails = formData.bcc.filter(email => !validateEmail(email));
    if (invalidBccEmails.length > 0) {
      errors.bcc = `Invalid BCC emails: ${invalidBccEmails.join(', ')}`;
    }

    // Validate tags format
    if (formData.tags?.trim()) {
      const tags = formData.tags.split(',').map(tag => tag.trim());
      const invalidTags = tags.filter(tag => tag.length > 0 && (tag.length < 2 || tag.length > 20));
      if (invalidTags.length > 0) {
        errors.tags = 'Each tag must be between 2-20 characters';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Real-time validation for touched fields
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const errors = {};
      
      if (touched.to) {
        if (!formData.to?.trim()) {
          errors.to = 'Recipient email is required';
        } else if (!validateEmail(formData.to)) {
          errors.to = 'Please enter a valid email address';
        }
      }

      if (touched.subject) {
        if (!formData.subject?.trim()) {
          errors.subject = 'Subject is required';
        } else if (formData.subject.trim().length < 3) {
          errors.subject = 'Subject must be at least 3 characters long';
        }
      }

      if (touched.description) {
        if (!formData.description?.trim()) {
          errors.description = 'Description is required';
        } else if (formData.description.trim().length < 10) {
          errors.description = 'Description must be at least 10 characters long';
        }
      }

      setValidationErrors(prev => {
        // Only update if there are actual changes
        const newErrors = { ...prev };
        Object.keys(errors).forEach(key => {
          if (errors[key] !== newErrors[key]) {
            newErrors[key] = errors[key];
          }
        });
        
        // Clear errors for fields that are now valid
        Object.keys(newErrors).forEach(key => {
          if (!errors[key] && touched[key]) {
            newErrors[key] = '';
          }
        });
        
        return newErrors;
      });
    }
  }, [formData.to, formData.subject, formData.description, touched]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleBlur = (field) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      sendAnother: event.target.checked
    });
  };

  const handleAddCc = () => {
    if (ccInput.trim()) {
      if (!validateEmail(ccInput.trim())) {
        setNotification({
          open: true,
          message: 'Please enter a valid email address',
          severity: 'error'
        });
        return;
      }
      
      if (!formData.cc.includes(ccInput.trim())) {
        setFormData({
          ...formData,
          cc: [...formData.cc, ccInput.trim()]
        });
        setCcInput('');
        // Clear CC validation errors
        setValidationErrors(prev => ({ ...prev, cc: '' }));
      } else {
        setNotification({
          open: true,
          message: 'Email already added to CC',
          severity: 'warning'
        });
      }
    }
  };

  const handleAddBcc = () => {
    if (bccInput.trim()) {
      if (!validateEmail(bccInput.trim())) {
        setNotification({
          open: true,
          message: 'Please enter a valid email address',
          severity: 'error'
        });
        return;
      }
      
      if (!formData.bcc.includes(bccInput.trim())) {
        setFormData({
          ...formData,
          bcc: [...formData.bcc, bccInput.trim()]
        });
        setBccInput('');
        // Clear BCC validation errors
        setValidationErrors(prev => ({ ...prev, bcc: '' }));
      } else {
        setNotification({
          open: true,
          message: 'Email already added to BCC',
          severity: 'warning'
        });
      }
    }
  };

  const handleRemoveCc = (emailToRemove) => {
    setFormData({
      ...formData,
      cc: formData.cc.filter(email => email !== emailToRemove)
    });
  };

  const handleRemoveBcc = (emailToRemove) => {
    setFormData({
      ...formData,
      bcc: formData.bcc.filter(email => email !== emailToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all required fields as touched
    setTouched({
      to: true,
      subject: true,
      description: true,
      priority: true,
      status: true
    });

    if (!validateForm()) {
      setNotification({
        open: true,
        message: 'Please fix the validation errors before submitting',
        severity: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for API
      const submissionData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Send to your API
      const response = await fetch('/api/Email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      // Check if response is ok first
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Failed to submit support ticket.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, try to get text
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch {
            // If both fail, use default message
            errorMessage = `Server error: ${response.status} ${response.statusText}`;
          }
        }
        throw new Error(errorMessage);
      }

      // Parse successful response
      let result;
      try {
        result = await response.json();
      } catch {
        // If the response is not JSON but was successful, that's still ok
        result = { success: true };
      }

      setNotification({
        open: true,
        message: 'Support ticket submitted successfully!',
        severity: 'success'
      });

      if (!formData.sendAnother) {
        handleReset();
        // Navigate to ticket dashboard after successful creation
        router.push('/tickets');
        return;
      }

    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Failed to submit support ticket. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      from: 'ihub (support@smsgroup-support.freshdesk.com)',
      to: '',
      cc: [],
      bcc: [],
      subject: '',
      description: '',
      priority: 'Low',
      status: 'Open',
      tags: '',
      group: '',
      type: '',
      referenceNumber: '',
      sendAnother: false,
      attachments: []
    });
    setValidationErrors({});
    setTouched({});
    setShowMoreFields(false);
    setShowCc(false);
    setShowBcc(false);
    setCcInput('');
    setBccInput('');
  };

  const handleCancel = () => {
    handleReset();
  };

  const handleKeyPress = (callback) => (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      callback();
    }
  };

  const closeNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Check if form has validation errors (only show errors that aren't empty)
  const hasValidationErrors = Object.keys(validationErrors).some(key => validationErrors[key]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          Create Support Ticket
        </Typography>

        {/* Header Info */}
        <Alert severity="info" sx={{ mb: 3 }}>
          When you hit send, the contact will receive an email and a ticket will be associated with them.{' '}
          <Link href="#" color="primary" underline="hover">
            Learn more
          </Link>
        </Alert>

        {/* Validation Summary */}
        {hasValidationErrors && (
          <Alert severity="error" sx={{ mb: 3 }} icon={<Warning />}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Please fix the following errors before submitting:
            </Typography>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              {Object.entries(validationErrors).map(([field, error]) => 
                error && (
                  <li key={field} style={{ fontSize: '14px', marginBottom: '4px' }}>
                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {error}
                  </li>
                )
              )}
            </ul>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* From Field */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              From
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={formData.from}
                onChange={handleChange('from')}
              >
                <MenuItem value="ihub (support@smsgroup-support.freshdesk.com)">
                  ihub (support@smsgroup-support.freshdesk.com)
                </MenuItem>
                <MenuItem value="admin (admin@smsgroup-support.freshdesk.com)">
                  admin (admin@smsgroup-support.freshdesk.com)
                </MenuItem>
                <MenuItem value="noreply (noreply@smsgroup-support.freshdesk.com)">
                  noreply (noreply@smsgroup-support.freshdesk.com)
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* To Field */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              To *
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.to}
              onChange={handleChange('to')}
              onBlur={handleBlur('to')}
              placeholder="Enter recipient email address"
              error={!!validationErrors.to}
              helperText={validationErrors.to}
            />
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              <Link 
                href="#" 
                variant="body2" 
                color="primary"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCc(!showCc);
                }}
              >
                {showCc ? 'Hide Cc' : 'Add Cc'}
              </Link>
              <Typography variant="body2" color="text.secondary">
                |
              </Typography>
              <Link 
                href="#" 
                variant="body2" 
                color="primary"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  setShowBcc(!showBcc);
                }}
              >
                {showBcc ? 'Hide Bcc' : 'Add Bcc'}
              </Link>
            </Box>
          </Box>

          {/* CC Field */}
          <Collapse in={showCc}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Cc
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={ccInput}
                  onChange={(e) => setCcInput(e.target.value)}
                  placeholder="Enter email address"
                  onKeyPress={handleKeyPress(handleAddCc)}
                  error={!!validationErrors.cc}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleAddCc}
                  startIcon={<Add />}
                  disabled={!ccInput.trim()}
                >
                  Add
                </Button>
              </Box>
              {validationErrors.cc && (
                <FormHelperText error>
                  {validationErrors.cc}
                </FormHelperText>
              )}
              {formData.cc.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {formData.cc.map((email, index) => (
                    <Chip
                      key={index}
                      label={email}
                      onDelete={() => handleRemoveCc(email)}
                      deleteIcon={<Close />}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Collapse>

          {/* BCC Field */}
          <Collapse in={showBcc}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Bcc
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={bccInput}
                  onChange={(e) => setBccInput(e.target.value)}
                  placeholder="Enter email address"
                  onKeyPress={handleKeyPress(handleAddBcc)}
                  error={!!validationErrors.bcc}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleAddBcc}
                  startIcon={<Add />}
                  disabled={!bccInput.trim()}
                >
                  Add
                </Button>
              </Box>
              {validationErrors.bcc && (
                <FormHelperText error>
                  {validationErrors.bcc}
                </FormHelperText>
              )}
              {formData.bcc.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {formData.bcc.map((email, index) => (
                    <Chip
                      key={index}
                      label={email}
                      onDelete={() => handleRemoveBcc(email)}
                      deleteIcon={<Close />}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Collapse>

          {/* Subject Field */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Subject *
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.subject}
              onChange={handleChange('subject')}
              onBlur={handleBlur('subject')}
              placeholder="Enter subject"
              error={!!validationErrors.subject}
              helperText={validationErrors.subject || `${formData.subject.length}/100 characters`}
              inputProps={{ maxLength: 100 }}
            />
          </Box>

          {/* Description Field with Toolbar */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Description *
            </Typography>
            
            {/* Rich Text Toolbar */}
            <Paper variant="outlined" sx={{ mb: 0 }}>
              <Toolbar 
                sx={{ 
                  minHeight: '48px !important', 
                  px: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <IconButton size="small" sx={{ mr: 0.5 }} title="Bold">
                  <FormatBold fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 0.5 }} title="Italic">
                  <FormatItalic fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 1 }} title="Underline">
                  <FormatUnderlined fontSize="small" />
                </IconButton>
                
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                
                <IconButton size="small" sx={{ mr: 0.5 }} title="Align Left">
                  <FormatAlignLeft fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 0.5 }} title="Align Center">
                  <FormatAlignCenter fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 0.5 }} title="Align Right">
                  <FormatAlignRight fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 1 }} title="Justify">
                  <FormatAlignJustify fontSize="small" />
                </IconButton>
                
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                
                <IconButton size="small" sx={{ mr: 0.5 }} title="Bullet List">
                  <FormatListBulleted fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 0.5 }} title="Numbered List">
                  <FormatListNumbered fontSize="small" />
                </IconButton>
                
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                
                <IconButton size="small" sx={{ mr: 0.5 }} title="Link">
                  <LinkIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 0.5 }} title="Code">
                  <Code fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 0.5 }} title="Image">
                  <Image fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 0.5 }} title="Quote">
                  <FormatQuote fontSize="small" />
                </IconButton>
              </Toolbar>
              
              {/* Second toolbar row */}
              <Toolbar 
                sx={{ 
                  minHeight: '48px !important', 
                  px: 1,
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <IconButton size="small" sx={{ mr: 0.5 }} title="Attach File">
                  <AttachFile fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 0.5 }} title="Insert Photo">
                  <InsertPhoto fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ mr: 0.5 }} title="Insert Table">
                  <TableChart fontSize="small" />
                </IconButton>
              </Toolbar>
            </Paper>
            
            <TextField
              fullWidth
              multiline
              rows={8}
              value={formData.description}
              onChange={handleChange('description')}
              onBlur={handleBlur('description')}
              placeholder="Enter detailed description of the issue..."
              error={!!validationErrors.description}
              helperText={validationErrors.description || `${formData.description.length}/2000 characters`}
              inputProps={{ maxLength: 2000 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }
              }}
            />
          </Box>

          {/* Priority and Status Fields */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Priority *
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={formData.priority}
                  onChange={handleChange('priority')}
                  error={!!validationErrors.priority}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
                </Select>
              </FormControl>
              {validationErrors.priority && (
                <FormHelperText error>
                  {validationErrors.priority}
                </FormHelperText>
              )}
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Status *
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={formData.status}
                  onChange={handleChange('status')}
                  error={!!validationErrors.status}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
              {validationErrors.status && (
                <FormHelperText error>
                  {validationErrors.status}
                </FormHelperText>
              )}
            </Grid>
          </Grid>

          {/* Tags Field */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Tags
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.tags}
              onChange={handleChange('tags')}
              placeholder="Enter tags separated by commas (e.g., bug, urgent, ui)"
              error={!!validationErrors.tags}
              helperText={validationErrors.tags || "Separate multiple tags with commas"}
            />
          </Box>

          {/* Show More Fields Link */}
          <Box sx={{ mb: 3 }}>
            <Link
              href="#"
              variant="body2"
              color="primary"
              underline="hover"
              onClick={(e) => {
                e.preventDefault();
                setShowMoreFields(!showMoreFields);
              }}
            >
              {showMoreFields ? 'Show fewer fields' : 'Show more fields'}
            </Link>
          </Box>

          {/* Additional Fields */}
          <Collapse in={showMoreFields}>
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                    Group
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={formData.group}
                      onChange={handleChange('group')}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select group</em>
                      </MenuItem>
                      <MenuItem value="Technical Support">Technical Support</MenuItem>
                      <MenuItem value="Customer Service">Customer Service</MenuItem>
                      <MenuItem value="Sales">Sales</MenuItem>
                      <MenuItem value="Billing">Billing</MenuItem>
                      <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                      <MenuItem value="IT Support">IT Support</MenuItem>
                      <MenuItem value="Account Management">Account Management</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                    Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={formData.type}
                      onChange={handleChange('type')}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select type</em>
                      </MenuItem>
                      <MenuItem value="Technical Support">Technical Support</MenuItem>
                      <MenuItem value="Customer Service">Customer Service</MenuItem>
                      <MenuItem value="Sales">Sales</MenuItem>
                      <MenuItem value="Billing">Billing</MenuItem>
                      <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                      <MenuItem value="IT Support">IT Support</MenuItem>
                      <MenuItem value="Account Management">Account Management</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                    Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={formData.type}
                      onChange={handleChange('type')}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select type</em>
                      </MenuItem>
                      <MenuItem value="Bug Report">Bug Report</MenuItem>
                      <MenuItem value="Feature Request">Feature Request</MenuItem>
                      <MenuItem value="Question">Question</MenuItem>
                      <MenuItem value="Complaint">Complaint</MenuItem>
                      <MenuItem value="Feedback">Feedback</MenuItem>
                      <MenuItem value="Technical Issue">Technical Issue</MenuItem>
                      <MenuItem value="Account Issue">Account Issue</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                    Reference Number
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={formData.referenceNumber}
                    onChange={handleChange('referenceNumber')}
                    placeholder="Enter reference number if applicable (e.g., existing ticket ID)"
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.sendAnother}
                  onChange={handleCheckboxChange}
                  size="small"
                />
              }
              label="Send another ticket after this one"
            />
            
            <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                startIcon={<Cancel />}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <Send />}
                disabled={isSubmitting}
                sx={{ minWidth: 120 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Ticket'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SupportTicketForm;
