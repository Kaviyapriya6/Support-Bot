'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Chip
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Business as BusinessIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const CompanyContactsList = () => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Fetch companies from API
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
        throw new Error(`Failed to fetch companies: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform API data to match component structure
      const transformedCompanies = data.map(company => ({
        id: company.id,
        name: company.name,
        contacts: company.contacts || '--',
        description: company.description || '',
        industry: company.industry || '',
        healthScore: company.healthScore || '',
        accountTier: company.accountTier || '',
        renewalDate: company.renewalDate || '',
        domain: company.domain || '',
        createdAt: company.createdAt || new Date().toISOString()
      }));

      setCompanies(transformedCompanies);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError(err.message);
      
      // Fallback to sample data if API fails
      setCompanies([
        { id: 1, name: 'Acme Inc', contacts: '--', industry: 'Technology' },
        { id: 2, name: 'Advanced Machinery', contacts: '--', industry: 'Manufacturing' },
        { id: 3, name: 'Freshworks', contacts: '--', industry: 'Technology' },
        { id: 4, name: 'Global Learning Inc', contacts: '--', industry: 'Education' },
        { id: 5, name: 'Jet Propulsion Laboratory , NASA', contacts: '--', industry: 'Aerospace' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Delete company via API
  const deleteCompany = async (companyId) => {
    try {
      const response = await fetch(`/api/company/${companyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete company');
      }

      // Remove from local state
      setCompanies(prev => prev.filter(company => company.id !== companyId));
      showNotification('Company deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting company:', err);
      showNotification('Failed to delete company', 'error');
    }
  };

  // Load companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const handleCheckboxChange = (id) => {
    const newSelectedItems = new Set(selectedItems);
    newSelectedItems.has(id) ? newSelectedItems.delete(id) : newSelectedItems.add(id);
    setSelectedItems(newSelectedItems);
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActiveMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenuId(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    router.push(`/company/edit/${activeMenuId}`);
  };

  const handleDelete = () => {
    handleMenuClose();
    setConfirmDelete(true);
  };

  const handleViewDetails = () => {
    handleMenuClose();
    router.push(`/company/${activeMenuId}`);
  };

  const confirmDeleteCompany = async () => {
    if (activeMenuId) {
      await deleteCompany(activeMenuId);
    }
    setConfirmDelete(false);
    setActiveMenuId(null);
  };

  const handleRefresh = () => {
    fetchCompanies();
    showNotification('Companies refreshed', 'info');
  };

  const generateAvatarColor = (name) => {
    const colors = ['#4FC3F7', '#81C784', '#FFB74D', '#F06292', '#BA68C8', '#FF8A65', '#A1C4FD'];
    return colors[name.length % colors.length];
  };

  const getInitials = (name) => name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const getHealthScoreColor = (score) => {
    if (!score) return 'default';
    if (score === 'excellent') return 'success';
    if (score === 'good') return 'info';
    if (score === 'average') return 'warning';
    return 'error';
  };

  const getAccountTierColor = (tier) => {
    if (!tier) return 'default';
    if (tier === 'enterprise') return 'error';
    if (tier === 'professional') return 'warning';
    if (tier === 'standard') return 'info';
    return 'default';
  };

  return (
    <Box sx={{ width: '100%', height: '100%', p: 2, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
          <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
            Companies ({companies.length})
          </Typography>
          <IconButton onClick={handleRefresh} disabled={loading} size="small" sx={{ mr: 1 }}>
            <RefreshIcon />
          </IconButton>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, minWidth: 80 }}>Contacts</Typography>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ ml: 2 }}>Loading companies...</Typography>
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error" action={
              <Button color="inherit" size="small" onClick={fetchCompanies}>
                Retry
              </Button>
            }>
              {error}
            </Alert>
          </Box>
        )}

        {/* Empty State */}
        {!loading && !error && companies.length === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4 }}>
            <BusinessIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No companies found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start by adding your first company
            </Typography>
          </Box>
        )}

        {/* Company List */}
        {!loading && !error && companies.length > 0 && (
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <List sx={{ p: 0 }}>
              {companies.map((company, index) => (
                <React.Fragment key={company.id}>
                  <ListItem sx={{ px: 2, py: 1.5, '&:hover': { bgcolor: 'action.hover' } }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Checkbox
                        checked={selectedItems.has(company.id)}
                        onChange={() => handleCheckboxChange(company.id)}
                        size="small"
                        sx={{ p: 0.5 }}
                      />
                    </ListItemIcon>

                    <Avatar sx={{
                      width: 32,
                      height: 32,
                      bgcolor: generateAvatarColor(company.name),
                      mr: 2,
                      fontSize: '0.875rem'
                    }}>
                      {getInitials(company.name)}
                    </Avatar>

                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight={500}>
                            {company.name}
                          </Typography>
                          {company.industry && (
                            <Chip 
                              label={company.industry} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontSize: '0.75rem', height: 20 }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          {company.healthScore && (
                            <Chip 
                              label={`Health: ${company.healthScore}`} 
                              size="small" 
                              color={getHealthScoreColor(company.healthScore)}
                              sx={{ fontSize: '0.7rem', height: 18 }}
                            />
                          )}
                          {company.accountTier && (
                            <Chip 
                              label={company.accountTier} 
                              size="small" 
                              color={getAccountTierColor(company.accountTier)}
                              sx={{ fontSize: '0.7rem', height: 18 }}
                            />
                          )}
                        </Box>
                      }
                      sx={{ flex: 1 }}
                    />

                    <Box sx={{ minWidth: 100, textAlign: 'right', mr: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {company.contacts}
                      </Typography>
                    </Box>

                    <ListItemSecondaryAction>
                      <IconButton size="small" onClick={(event) => handleMenuOpen(event, company.id)} sx={{ p: 0.5 }}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>

                  {index < companies.length - 1 && <Divider sx={{ mx: 2 }} />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleViewDetails}>View Details</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>

        {/* Confirm Delete Dialog */}
        <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this company? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button onClick={confirmDeleteCompany} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Notification Snackbar */}
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
    </Box>
  );
};

export default CompanyContactsList;