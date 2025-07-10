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

      if (!response.ok) throw new Error('Failed to fetch companies');
      const data = await response.json();
      setCompanies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const deleteCompany = async (id) => {
    try {
      const response = await fetch(`/api/company/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Delete request failed');

      setCompanies(prev => prev.filter(c => c._id !== id));
      showNotification('Company deleted successfully', 'success');
    } catch (err) {
      showNotification('Failed to delete company', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const generateAvatarColor = (name) => {
    const colors = ['#4FC3F7', '#81C784', '#FFB74D', '#F06292', '#BA68C8'];
    return colors[name.length % colors.length];
  };

  const getInitials = (name) =>
    name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Companies ({companies.length})</Typography>
        <IconButton onClick={fetchCompanies}><RefreshIcon /></IconButton>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography>Loading companies...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      {!loading && companies.length === 0 && (
        <Typography>No companies found.</Typography>
      )}

      <List>
        {companies.map((company) => (
          <React.Fragment key={company._id}>
            <ListItem
              sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
              secondaryAction={
                <>
                  <IconButton onClick={() => router.push(`/company/edit/${company._id}`)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => {
                    setCompanyToDelete(company);
                    setConfirmDelete(true);
                  }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </>
              }
            >
              <ListItemIcon>
                <Avatar sx={{ bgcolor: generateAvatarColor(company.name) }}>
                  {getInitials(company.name)}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={company.name}
                secondary={company.industry || 'No Industry'}
              />
              <Chip label={company.contacts || '--'} size="small" variant="outlined" />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Delete Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{companyToDelete?.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              await deleteCompany(companyToDelete._id);
              setConfirmDelete(false);
              setCompanyToDelete(null);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={notification.show}
        autoHideDuration={4000}
        onClose={() => setNotification({ show: false, message: '', type: 'success' })}
      >
        <Alert
          severity={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: 'success' })}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CompanyContactsList;
