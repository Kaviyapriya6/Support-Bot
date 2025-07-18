'use client';

import {
  Box, Button, Typography, Paper, Grid, Chip, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Restore as ReopenIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  CloudDownload as CloudDownloadIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketView({ ticketData }) {
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'info';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      case 'Closed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const handleEdit = () => {
    router.push(`/tickets/edit/${ticketData._id}`);
  };

  const handleReopen = () => {
    console.log('Reopening ticket...');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      // If you have a direct file URL
      if (ticketData.fileUrl) {
        // Method 1: Direct download using file URL
        const link = document.createElement('a');
        link.href = ticketData.fileUrl;
        link.download = ticketData.fileName || 'attachment';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Method 2: API call to get file blob
        const response = await fetch(`/api/tickets/${ticketData._id}/download`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // if using auth
          },
        });

        if (!response.ok) {
          throw new Error('Failed to download file');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = ticketData.fileName || 'attachment';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      // You might want to show a toast notification here
      alert('Failed to download file. Please try again.');
    }
  };

  const handleClose = () => {
    router.push('/tickets');
  };

  if (!ticketData) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6" color="error">
          Ticket data is missing.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', p: 3 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>

        {/* Header */}
        <Box sx={{
          mb: 4, p: 3, bgcolor: 'white', borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0'
        }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1.5, bgcolor: 'primary.main', borderRadius: 2, color: 'white' }}>
                <AssignmentIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    {ticketData.ticketId}
                  </Typography>
                  <Chip
                    label={ticketData.status}
                    color={getStatusColor(ticketData.status)}
                    size="small"
                  />
                </Stack>
                <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                  Created {formatDate(ticketData.createdAt)} • Last updated {formatDate(ticketData.updatedAt)}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
                Print
              </Button>
              <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEdit}>
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleClose}
                sx={{
                  '&:hover': {
                    bgcolor: 'error.light',
                    color: 'white'
                  }
                }}
              >
                Close
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* Ticket Details */}
        <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Typography variant="h6" fontWeight={600} mb={3}>Ticket Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>Status</Typography>
              <Chip label={ticketData.status} color={getStatusColor(ticketData.status)} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>Priority</Typography>
              <Chip label={ticketData.priority} color={getPriorityColor(ticketData.priority)} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>Issue Type</Typography>
              <Chip label={ticketData.issueType} variant="outlined" />
            </Grid>
          </Grid>
        </Paper>

        {/* Customer Information */}
        <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <PersonIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>Customer Information</Typography>
          </Stack>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>Customer ID</Typography>
              <Typography fontWeight={500}>{ticketData.customerId}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>Email</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmailIcon fontSize="small" color="action" />
                <Typography fontWeight={500}>{ticketData.email}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>Phone</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon fontSize="small" color="action" />
                <Typography fontWeight={500}>{ticketData.phone}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Issue Description */}
        <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <AssignmentIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>Issue Description</Typography>
          </Stack>
          <Box mb={3}>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>Subject</Typography>
            <Typography variant="h6" fontWeight={500} sx={{ color: '#1e293b' }}>
              {ticketData.subject}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>Description</Typography>
            <Typography sx={{ color: '#374151', lineHeight: 1.6 }}>
              {ticketData.description}
            </Typography>
          </Box>
        </Paper>

        {/* Associated Emails */}
        {Array.isArray(ticketData.emails) && ticketData.emails.length > 0 && (
          <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight={600} mb={3}>Associated Emails</Typography>
            <Box>
              {ticketData.emails.map((email) => (
                <Paper key={email._id} sx={{ p: 2, mb: 2, bgcolor: '#f3f4f6' }}>
                  <Typography variant="subtitle1" fontWeight={500}>{email.subject}</Typography>
                  <Typography variant="body2" color="text.secondary">From: {email.from}</Typography>
                  <Typography variant="body2" color="text.secondary">To: {email.to}</Typography>
                  <Typography variant="body2" color="text.secondary">Date: {new Date(email.createdAt).toLocaleString()}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{email.description}</Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        )}

        {/* Attachments */}
        {ticketData.fileName && (
          <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight={600} mb={3}>Attachments</Typography>
            <Box sx={{ 
              p: 3, 
              bgcolor: '#f8fafc', 
              borderRadius: 2,
              border: '1px solid #e2e8f0'
            }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <CloudDownloadIcon color="primary" />
                  <Typography fontWeight={500}>{ticketData.fileName}</Typography>
                </Stack>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </Stack>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
}