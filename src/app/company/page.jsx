'use client';
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction,
  Checkbox, Avatar, IconButton, Menu, MenuItem, Divider, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Button, CircularProgress,
  Alert, Snackbar, Chip
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Business as BusinessIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const CompanyContactsList = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/company', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch companies`);
      }
      
      const data = await response.json();
      setCompanies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch companies error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleEditClick = (company) => {
    try {
      console.log('Editing company:', company);
      // Navigate to edit page
      router.push(`/company/edit/${company._id}`);
    } catch (err) {
      console.error('Edit navigation error:', err);
      showNotification('Failed to navigate to edit page', 'error');
    }
  };

  const handleDeleteClick = (company) => {
    console.log('Delete clicked for company:', company);
    setCompanyToDelete(company);
    setConfirmDelete(true);
  };

  const deleteCompany = async (id) => {
    try {
      setActionLoading(true);
      console.log('Deleting company with ID:', id);
      
      const response = await fetch(`/api/company/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Delete request failed`);
      }

      // Remove company from local state
      setCompanies(prev => prev.filter(c => c._id !== id));
      showNotification('Company deleted successfully', 'success');
    } catch (err) {
      console.error('Delete company error:', err);
      showNotification(`Failed to delete company: ${err.message}`, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (companyToDelete) {
      await deleteCompany(companyToDelete._id);
      setConfirmDelete(false);
      setCompanyToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setCompanyToDelete(null);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const handleCloseNotification = () => {
    setNotification({ show: false, message: '', type: 'success' });
  };

  const generateAvatarColor = (name) => {
    const colors = ['#4FC3F7', '#81C784', '#FFB74D', '#F06292', '#BA68C8'];
    return colors[name.length % colors.length];
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '??';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Companies ({companies.length})
        </Typography>
        <IconButton onClick={fetchCompanies} disabled={loading}>
          <RefreshIcon />
        </IconButton>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
          <CircularProgress size={24} />
          <Typography>Loading companies...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && companies.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            No companies found.
          </Typography>
        </Box>
      )}

      <List>
        {companies.map((company) => (
          <React.Fragment key={company._id}>
            <ListItem
              sx={{ 
                '&:hover': { backgroundColor: '#f9f9f9' },
                cursor: 'pointer'
              }}
              secondaryAction={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(company);
                    }}
                    disabled={actionLoading}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(company);
                    }}
                    disabled={actionLoading}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
            >
              <ListItemIcon>
                <Avatar sx={{ bgcolor: generateAvatarColor(company.name || 'Unknown') }}>
                  {getInitials(company.name || 'Unknown')}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={company.name || 'Unnamed Company'}
                secondary={company.industry || 'No Industry'}
              />
              <Chip 
                label={company.contacts || '--'} 
                size="small" 
                variant="outlined" 
                sx={{ mr: 8 }} // Add margin to prevent overlap with action buttons
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={confirmDelete} 
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{companyToDelete?.name}</strong>? 
            This action cannot be undone and will permanently remove the company and all associated data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCancelDelete}
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={actionLoading}
            startIcon={actionLoading ? <CircularProgress size={16} /> : null}
          >
            {actionLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={notification.show}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={notification.type}
          onClose={handleCloseNotification}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CompanyContactsList;