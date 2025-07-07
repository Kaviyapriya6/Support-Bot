import React from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const validationSchema = Yup.object({
  contactName: Yup.string().required('Contact Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Enter a valid 10-digit number'),
  issueType: Yup.string().required('Issue Type is required'),
  priority: Yup.string().required('Priority is required'),
  subject: Yup.string().required('Subject is required'),
  description: Yup.string().required('Description is required'),
});

const CreateTicketForm = () => {
 const formik = useFormik({
  initialValues: {
    contactName: '',
    email: '',
    phoneNumber: '',
    issueType: '',
    priority: 'Medium',
    subject: '',
    description: '',
  },
  validationSchema,
  onSubmit: async (values, { resetForm }) => {
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        resetForm();
      } else {
        alert('Submission failed: ' + data.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }
});


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
<form onSubmit={formik.handleSubmit}>
  <Grid container spacing={3}>
    {/* Contact Information */}
    <Grid item xs={12}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
        Contact Information
      </Typography>
    </Grid>

    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Contact Name"
        name="contactName"
        value={formik.values.contactName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.contactName && Boolean(formik.errors.contactName)}
        helperText={formik.touched.contactName && formik.errors.contactName}
        placeholder="Enter contact name"
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        placeholder="Enter email"
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        placeholder="Enter phone number"
      />
    </Grid>

    {/* Ticket Details */}
    <Grid item xs={12} sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
        Ticket Details
      </Typography>
    </Grid>

    <Grid item xs={12} md={6}>
      <FormControl fullWidth error={formik.touched.issueType && Boolean(formik.errors.issueType)}>
        <InputLabel>Issue Type</InputLabel>
        <Select
          name="issueType"
          value={formik.values.issueType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Issue Type"
        >
          <MenuItem value=""><em>Select issue type</em></MenuItem>
          <MenuItem value="technical">Technical Issue</MenuItem>
          <MenuItem value="billing">Billing</MenuItem>
          <MenuItem value="general">General Inquiry</MenuItem>
          <MenuItem value="bug">Bug Report</MenuItem>
          <MenuItem value="feature">Feature Request</MenuItem>
        </Select>
        {formik.touched.issueType && formik.errors.issueType && (
          <Typography variant="caption" color="error">{formik.errors.issueType}</Typography>
        )}
      </FormControl>
    </Grid>

    <Grid item xs={12} md={6}>
      <FormControl fullWidth error={formik.touched.priority && Boolean(formik.errors.priority)}>
        <InputLabel>Priority</InputLabel>
        <Select
          name="priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Priority"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Critical">Critical</MenuItem>
        </Select>
        {formik.touched.priority && formik.errors.priority && (
          <Typography variant="caption" color="error">{formik.errors.priority}</Typography>
        )}
      </FormControl>
    </Grid>

    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Subject"
        name="subject"
        value={formik.values.subject}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.subject && Boolean(formik.errors.subject)}
        helperText={formik.touched.subject && formik.errors.subject}
        placeholder="Enter subject"
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Description"
        name="description"
        multiline
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        placeholder="Describe the issue"
      />
    </Grid>

    {/* Attachments */}
    <Grid item xs={12} sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
        Attachments
      </Typography>
      <UploadArea elevation={0}>
        <CloudUpload sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
        <Typography variant="body1" sx={{ color: '#1976d2', mb: 0.5 }}>
          Click to upload files or drag and drop
        </Typography>
        <Typography variant="body2" color="text.secondary">
          PDF, DOC, DOCX, JPG, PNG, GIF up to 10MB each
        </Typography>
      </UploadArea>
    </Grid>

    {/* Actions */}
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="outlined" onClick={formik.handleReset}>Cancel</Button>
        <Button variant="contained" type="submit">Submit Ticket</Button>
      </Box>
    </Grid>
  </Grid>
</form>

        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateTicketForm;
