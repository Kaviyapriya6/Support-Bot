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

  const handleDownload = () => {
    console.log('Downloading attachment...');
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
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

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

        <Grid container spacing={4}>
          {/* Left column */}
          <Grid item xs={12} md={8}>
            {/* Customer Info */}
            <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <PersonIcon color="primary" />
                <Typography variant="h6" fontWeight={600}>Customer Information</Typography>
              </Stack>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">Customer ID</Typography>
                  <Typography fontWeight={500}>{ticketData.customerId}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">Email</Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <EmailIcon fontSize="small" />
                    <Typography fontWeight={500}>{ticketData.email}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">Phone</Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PhoneIcon fontSize="small" />
                    <Typography fontWeight={500}>{ticketData.phone}</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Issue */}
            <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <AssignmentIcon color="primary" />
                <Typography variant="h6" fontWeight={600}>Issue Description</Typography>
              </Stack>
              <Box mb={2}>
                <Typography variant="body2">Subject</Typography>
                <Typography variant="h6" fontWeight={500}>{ticketData.subject}</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Description</Typography>
                <Typography>{ticketData.description}</Typography>
              </Box>
            </Paper>

            {/* Attachments */}
            {ticketData.fileName && (
              <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Typography variant="h6" fontWeight={600} mb={2}>Attachments</Typography>
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CloudDownloadIcon />
                      <Typography fontWeight={500}>{ticketData.fileName}</Typography>
                    </Stack>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => console.log('Downloading…')}
                    >
                      Download
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            )}
          </Grid>

          {/* Right column */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>Ticket Details</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2">Status</Typography>
                  <Chip label={ticketData.status} color={getStatusColor(ticketData.status)} />
                </Box>
                <Box>
                  <Typography variant="body2">Priority</Typography>
                  <Chip label={ticketData.priority} color={getPriorityColor(ticketData.priority)} />
                </Box>
                <Box>
                  <Typography variant="body2">Issue Type</Typography>
                  <Chip label={ticketData.issueType} variant="outlined" />
                </Box>
                <Box>
                  <Typography variant="body2">Assigned To</Typography>
                  <Typography fontWeight={500}>{ticketData.assignedTo || '-'}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
