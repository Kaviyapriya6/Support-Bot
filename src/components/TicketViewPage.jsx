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
  ArrowBack as ArrowBackIcon,
  CloudDownload as CloudDownloadIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketView({ ticketData }) {
  const router = useRouter();
  const [showCloseDialog, setShowCloseDialog] = useState(false);

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

  const handleCloseTicket = () => {
    setShowCloseDialog(true);
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

  if (!ticketData) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <Typography variant="h6" color="error">
          Ticket data is missing.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', p: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

        {/* Header Section */}
        <Paper 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3, 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', 
            border: '1px solid #e2e8f0' 
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            {/* Left side - Ticket info */}
            <Stack direction="row" alignItems="center" spacing={3}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => router.back()}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                Back
              </Button>
              
              <Box sx={{ 
                p: 2, 
                bgcolor: 'primary.main', 
                borderRadius: 2, 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AssignmentIcon sx={{ fontSize: 32 }} />
              </Box>
              
              <Box>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    {ticketData.ticketId}
                  </Typography>
                  <Chip
                    label={ticketData.status}
                    color={getStatusColor(ticketData.status)}
                    size="medium"
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  Created {formatDate(ticketData.createdAt)} • Last updated {formatDate(ticketData.updatedAt)}
                </Typography>
              </Box>
            </Stack>

            {/* Right side - Actions */}
            <Stack direction="row" spacing={2}>
              <Button 
                variant="outlined" 
                startIcon={<PrintIcon />} 
                onClick={handlePrint}
                sx={{ minWidth: 100 }}
              >
                Print
              </Button>
              <Button 
                variant="contained" 
                startIcon={<EditIcon />} 
                onClick={handleEdit}
                sx={{ minWidth: 100 }}
              >
                Edit
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Left Column - Main Content */}
          <Grid item xs={12} lg={8}>
            
            {/* Customer Information */}
            <Paper sx={{ p: 4, borderRadius: 3, mb: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <PersonIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} color="#1e293b">
                  Customer Information
                </Typography>
              </Stack>
              
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="#64748b" fontWeight={500} mb={1}>
                      Customer ID
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {ticketData.customerId}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="#64748b" fontWeight={500} mb={1}>
                      Email Address
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EmailIcon fontSize="small" color="action" />
                      <Typography variant="body1" fontWeight={600}>
                        {ticketData.email}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="#64748b" fontWeight={500} mb={1}>
                      Phone Number
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body1" fontWeight={600}>
                        {ticketData.phone}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Issue Description */}
            <Paper sx={{ p: 4, borderRadius: 3, mb: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <AssignmentIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} color="#1e293b">
                  Issue Description
                </Typography>
              </Stack>
              
              <Box mb={3}>
                <Typography variant="body2" color="#64748b" fontWeight={500} mb={1}>
                  Subject
                </Typography>
                <Typography variant="h6" fontWeight={600} color="#1e293b">
                  {ticketData.subject}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="#64748b" fontWeight={500} mb={1}>
                  Description
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {ticketData.description}
                </Typography>
              </Box>
            </Paper>

            {/* Attachments */}
            {ticketData.fileName && (
              <Paper sx={{ p: 4, borderRadius: 3, mb: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" fontWeight={700} color="#1e293b" mb={3}>
                  Attachments
                </Typography>
                
                <Box sx={{ 
                  p: 3, 
                  bgcolor: '#f8fafc', 
                  borderRadius: 2,
                  border: '1px solid #e2e8f0'
                }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CloudDownloadIcon color="primary" />
                      <Typography variant="body1" fontWeight={600}>
                        {ticketData.fileName}
                      </Typography>
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
          </Grid>

          {/* Right Column - Sidebar */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: 20 }}>
              <Typography variant="h6" fontWeight={700} color="#1e293b" mb={3}>
                Ticket Details
              </Typography>
              
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body2" color="#64748b" fontWeight={500} mb={1}>
                    Status
                  </Typography>
                  <Chip 
                    label={ticketData.status} 
                    color={getStatusColor(ticketData.status)} 
                    sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="body2" color="#64748b" fontWeight={500} mb={1}>
                    Priority
                  </Typography>
                  <Chip 
                    label={ticketData.priority} 
                    color={getPriorityColor(ticketData.priority)} 
                    sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="body2" color="#64748b" fontWeight={500} mb={1}>
                    Issue Type
                  </Typography>
                  <Chip 
                    label={ticketData.issueType} 
                    variant="outlined" 
                    sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Close Dialog */}
        <Dialog open={showCloseDialog} onClose={() => setShowCloseDialog(false)}>
          <DialogTitle>Close Ticket</DialogTitle>
          <DialogContent>
            Are you sure you want to close this ticket?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCloseDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setShowCloseDialog(false);
                console.log('Closing ticket…');
              }}
            >
              Close Ticket
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}