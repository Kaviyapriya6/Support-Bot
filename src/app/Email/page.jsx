'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Checkbox,
  Avatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  IconButton,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  Email,
  MoreVert,
  KeyboardArrowDown,
  SupportAgent,
  EmojiEmotions,
  Person,
  Schedule,
  CheckCircle,
  PriorityHigh,
  Business,
  Refresh,
  Delete,
  Edit
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const SupportTicketList = () => {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [updatingTicket, setUpdatingTicket] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/email', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch tickets`);
      }
      
      const data = await response.json();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch tickets error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleEditClick = (ticket) => {
    try {
      console.log('Editing ticket:', ticket);
      router.push(`/email/edit/${ticket._id}`);
    } catch (err) {
      console.error('Edit navigation error:', err);
      showNotification('Failed to navigate to edit page', 'error');
    }
  };

  const handleDeleteClick = (ticket) => {
    console.log('Delete clicked for ticket:', ticket);
    setTicketToDelete(ticket);
    setConfirmDelete(true);
  };

  const deleteTicket = async (id) => {
    try {
      setActionLoading(true);
      console.log('Deleting ticket with ID:', id);
      
      const response = await fetch(`/api/email/${id}`, {
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

      // Remove ticket from local state
      setTickets(prev => prev.filter(t => t._id !== id));
      setSelectedTickets(prev => prev.filter(ticketId => ticketId !== id));
      showNotification('Ticket deleted successfully', 'success');
    } catch (err) {
      console.error('Delete ticket error:', err);
      showNotification(`Failed to delete ticket: ${err.message}`, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const updateTicketField = async (ticketId, field, value) => {
    try {
      setUpdatingTicket(ticketId);
      
      const response = await fetch(`/api/email/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [field]: value })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Update request failed`);
      }

      // Update ticket in local state
      setTickets(prev => prev.map(ticket => 
        ticket._id === ticketId 
          ? { ...ticket, [field]: value }
          : ticket
      ));
      
      showNotification(`Ticket ${field} updated successfully`, 'success');
    } catch (err) {
      console.error('Update ticket error:', err);
      showNotification(`Failed to update ticket: ${err.message}`, 'error');
    } finally {
      setUpdatingTicket(null);
    }
  };

  const handleSelectTicket = (ticketId) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedTickets(tickets.map(ticket => ticket._id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleConfirmDelete = async () => {
    if (ticketToDelete) {
      await deleteTicket(ticketToDelete._id);
      setConfirmDelete(false);
      setTicketToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setTicketToDelete(null);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const handleCloseNotification = () => {
    setNotification({ show: false, message: '', type: 'success' });
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'low': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'high': return '#f44336';
      case 'urgent': return '#9c27b0';
      default: return '#757575';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return '#4caf50';
      case 'pending': return '#ff9800';
      case 'closed': return '#757575';
      default: return '#757575';
    }
  };

  const generateAvatarColor = (name) => {
    const colors = ['#4FC3F7', '#81C784', '#FFB74D', '#F06292', '#BA68C8'];
    return colors[(name?.length || 0) % colors.length];
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '??';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 60) return `${minutes} minutes ago`;
      if (hours < 24) return `${hours} hours ago`;
      return `${days} days ago`;
    } catch {
      return 'Unknown';
    }
  };

  const handleCreateTicket = () => {
    router.push('/email/create');
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      {/* Header */}
      <Paper elevation={1} sx={{ mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SupportAgent sx={{ mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Support Tickets ({tickets.length})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your support tickets and customer communications
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={fetchTickets} disabled={loading}>
              <Refresh />
            </IconButton>
            <Button variant="contained" color="primary" onClick={handleCreateTicket}>
              Create Ticket
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
          <CircularProgress size={24} />
          <Typography>Loading tickets...</Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Empty State */}
      {!loading && tickets.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            No support tickets found.
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={handleCreateTicket}
          >
            Create your first ticket
          </Button>
        </Box>
      )}

      {/* Ticket List */}
      {tickets.length > 0 && (
        <Paper elevation={1}>
          {/* Select All Header */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Checkbox
              checked={selectedTickets.length === tickets.length}
              indeterminate={selectedTickets.length > 0 && selectedTickets.length < tickets.length}
              onChange={handleSelectAll}
              size="small"
            />
            {selectedTickets.length > 0 && (
              <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                {selectedTickets.length} selected
              </Typography>
            )}
          </Box>

          {/* Ticket Items */}
          <List sx={{ p: 0 }}>
            {tickets.map((ticket, index) => (
              <React.Fragment key={ticket._id}>
                <ListItem 
                  sx={{ 
                    py: 2, 
                    px: 2,
                    '&:hover': { backgroundColor: 'grey.50' }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
                    <Checkbox
                      checked={selectedTickets.includes(ticket._id)}
                      onChange={() => handleSelectTicket(ticket._id)}
                      size="small"
                    />
                  </ListItemIcon>

                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    {/* Avatar */}
                    <Avatar 
                      sx={{ 
                        bgcolor: generateAvatarColor(ticket.subject || ticket.to),
                        width: 32,
                        height: 32,
                        mr: 2,
                        fontSize: '14px'
                      }}
                    >
                      {getInitials(ticket.subject || ticket.to || 'Ticket')}
                    </Avatar>

                    {/* Ticket Details */}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mr: 1 }}>
                          {ticket.subject || 'No Subject'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          #{ticket._id?.slice(-6) || 'N/A'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <Person sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          From: {ticket.from || 'Unknown'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          • To: {ticket.to || 'Unknown'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          • Created: {formatDate(ticket.createdAt)}
                        </Typography>
                        {ticket.updatedAt && (
                          <Typography variant="caption" color="text.secondary">
                            • Updated: {formatDate(ticket.updatedAt)}
                          </Typography>
                        )}
                      </Box>

                      {/* Tags */}
                      {ticket.tags && ticket.tags.length > 0 && (
                        <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5 }}>
                          {ticket.tags.map((tag, i) => (
                            <Chip 
                              key={i}
                              label={tag}
                              size="small"
                              sx={{ fontSize: '10px', height: 20 }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>

                    {/* Status and Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {/* Priority */}
                      <FormControl size="small" sx={{ minWidth: 80 }}>
                        <Select
                          value={ticket.priority || 'Low'}
                          onChange={(e) => updateTicketField(ticket._id, 'priority', e.target.value)}
                          disabled={updatingTicket === ticket._id}
                          sx={{ 
                            fontSize: '12px',
                            '& .MuiSelect-select': {
                              py: 0.5,
                              color: getPriorityColor(ticket.priority)
                            }
                          }}
                        >
                          <MenuItem value="Low">Low</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Urgent">Urgent</MenuItem>
                        </Select>
                      </FormControl>

                      {/* Status */}
                      <FormControl size="small" sx={{ minWidth: 80 }}>
                        <Select
                          value={ticket.status || 'Open'}
                          onChange={(e) => updateTicketField(ticket._id, 'status', e.target.value)}
                          disabled={updatingTicket === ticket._id}
                          sx={{ 
                            fontSize: '12px',
                            '& .MuiSelect-select': {
                              py: 0.5,
                              color: getStatusColor(ticket.status)
                            }
                          }}
                        >
                          <MenuItem value="Open">Open</MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Closed">Closed</MenuItem>
                        </Select>
                      </FormControl>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(ticket);
                          }}
                          disabled={actionLoading}
                          size="small"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(ticket);
                          }}
                          disabled={actionLoading}
                          size="small"
                          color="error"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
                {index < tickets.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

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
            Are you sure you want to delete ticket <strong>{ticketToDelete?.subject || 'this ticket'}</strong>? 
            This action cannot be undone and will permanently remove the ticket and all associated data.
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

export default SupportTicketList;