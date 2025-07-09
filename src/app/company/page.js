'use client';
import React, { useState } from 'react';
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
  Button
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const CompanyContactsList = () => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Acme Inc', contacts: '--' },
    { id: 2, name: 'Advanced Machinery', contacts: '--' },
    { id: 3, name: 'Freshworks', contacts: '--' },
    { id: 4, name: 'Global Learning Inc', contacts: '--' },
    { id: 5, name: 'Jet Propulsion Laboratory , NASA', contacts: '--' },
  ]);

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

  const confirmDeleteCompany = () => {
    setCompanies(prev => prev.filter(company => company.id !== activeMenuId));
    setConfirmDelete(false);
    setActiveMenuId(null);
  };

  const generateAvatarColor = (name) => {
    const colors = ['#4FC3F7', '#81C784', '#FFB74D', '#F06292', '#BA68C8'];
    return colors[name.length % colors.length];
  };

  const getInitials = (name) => name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Box sx={{ width: '100%', height: '100%', p: 2, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', px: 2, py: 1.5, bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="subtitle2" sx={{ flex: 1, fontWeight: 600 }}>Company</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Contacts</Typography>
        </Box>

        {/* Company List */}
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
                    primary={company.name}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
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

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
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
      </Box>
    </Box>
  );
};

export default CompanyContactsList;
