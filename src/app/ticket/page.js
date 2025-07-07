'use client'
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Reply as ReplyIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Flag as FlagIcon
} from '@mui/icons-material';

const TicketManagementPage = () => {
  const [tickets, setTickets] = useState([
    {
      id: 'TID001',
      title: 'Login Issues',
      description: 'Users are experiencing login problems with the new authentication system',
      status: 'Open',
      priority: 'High',
      assignee: 'John Doe',
      email: 'john.doe@example.com',
      createdDate: '1/15/2024',
      avatar: 'J',
      bookmarked: false
    },
    {
      id: 'TID002',
      title: 'UI Display Problem',
      description: 'The dashboard is not displaying correctly on mobile devices',
      status: 'In Progress',
      priority: 'Medium',
      assignee: 'Jane Smith',
      email: 'jane.smith@example.com',
      createdDate: '1/14/2024',
      avatar: 'J',
      bookmarked: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editTicketOpen, setEditTicketOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignee: '',
    email: ''
  });

  const priorityColors = {
    High: 'error',
    Medium: 'warning',
    Low: 'success'
  };

  const statusColors = {
    Open: 'error',
    'In Progress': 'warning',
    Closed: 'success',
    Resolved: 'info'
  };

  useEffect(() => {
    const filtered = tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(filtered);
  }, [searchTerm, tickets]);

  const handleMenuOpen = (event, ticket) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  const handleBookmark = (ticketId) => {
    setTickets(prev => prev.map(ticket =>
      ticket.id === ticketId ? { ...ticket, bookmarked: !ticket.bookmarked } : ticket
    ));
    showSnackbar('Bookmark updated', 'success');
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(prev => prev.map(ticket =>
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
    showSnackbar(`Ticket status changed to ${newStatus}`, 'success');
    handleMenuClose();
  };

  const handleDeleteTicket = (ticketId) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
    showSnackbar('Ticket deleted successfully', 'success');
    handleMenuClose();
  };

  const handleQuickAddTicket = () => {
    // Quick add with default values
    const ticket = {
      id: `TID${String(tickets.length + 1).padStart(3, '0')}`,
      title: 'New Ticket',
      description: 'Please update with details',
      status: 'Open',
      priority: 'Medium',
      assignee: 'Unassigned',
      email: 'support@example.com',
      createdDate: new Date().toLocaleDateString('en-US', { 
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      avatar: 'U',
      bookmarked: false
    };

    setTickets(prev => [...prev, ticket]);
    showSnackbar('New ticket created - please edit to add details', 'success');
  };

  const handleEditTicket = () => {
    if (!selectedTicket) return;

    setTickets(prev => prev.map(ticket =>
      ticket.id === selectedTicket.id ? { ...ticket, ...newTicket } : ticket
    ));
    setEditTicketOpen(false);
    setNewTicket({
      title: '',
      description: '',
      priority: 'Medium',
      assignee: '',
      email: ''
    });
    showSnackbar('Ticket updated successfully', 'success');
  };

  const openEditDialog = (ticket) => {
    setSelectedTicket(ticket);
    setNewTicket({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      assignee: ticket.assignee,
      email: ticket.email
    });
    setEditTicketOpen(true);
    handleMenuClose();
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleReply = (ticket) => {
    showSnackbar(`Reply to ${ticket.title} - Feature would open email client`, 'info');
  };

  const handleArchive = (ticketId) => {
    showSnackbar('Ticket archived successfully', 'success');
    handleMenuClose();
  };

  const handleFlag = (ticketId) => {
    showSnackbar('Ticket flagged for review', 'warning');
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          All Tickets
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleQuickAddTicket}
          sx={{
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#1565c0' },
            textTransform: 'none',
            px: 3
          }}
        >
          QUICK ADD
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#666' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            bgcolor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
      </Box>

      {/* Tickets List */}
      <Stack spacing={2}>
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} sx={{ bgcolor: 'white', boxShadow: 1 }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                {/* Avatar */}
                <Avatar
                  sx={{
                    bgcolor: ticket.avatar === 'J' ? '#ff9800' : ticket.avatar === 'U' ? '#9c27b0' : '#2196f3',
                    width: 40,
                    height: 40,
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}
                >
                  {ticket.avatar}
                </Avatar>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                      {ticket.title}
                    </Typography>
                    <Chip
                      label={ticket.id}
                      size="small"
                      sx={{
                        bgcolor: '#e3f2fd',
                        color: '#1976d2',
                        fontSize: '0.75rem'
                      }}
                    />
                    <Chip
                      label={ticket.priority}
                      size="small"
                      color={priorityColors[ticket.priority]}
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                    {ticket.assignee} • {ticket.email} • {ticket.createdDate}
                  </Typography>

                  {ticket.description && (
                    <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>
                      {ticket.description}
                    </Typography>
                  )}
                </Box>

                {/* Status and Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={ticket.status}
                    color={statusColors[ticket.status]}
                    size="small"
                    sx={{ fontSize: '0.75rem' }}
                  />

                  {/* Action Buttons */}
                  <IconButton
                    size="small"
                    onClick={() => handleReply(ticket)}
                    sx={{ color: '#666' }}
                  >
                    <ReplyIcon />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => handleBookmark(ticket.id)}
                    sx={{ color: ticket.bookmarked ? '#ff9800' : '#666' }}
                  >
                    {ticket.bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => openEditDialog(ticket)}
                    sx={{ color: '#666' }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, ticket)}
                    sx={{ color: '#666' }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleStatusChange(selectedTicket?.id, 'Open')}>
          Mark as Open
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedTicket?.id, 'In Progress')}>
          Mark as In Progress
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedTicket?.id, 'Resolved')}>
          Mark as Resolved
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedTicket?.id, 'Closed')}>
          Mark as Closed
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleArchive(selectedTicket?.id)}>
          <ArchiveIcon sx={{ mr: 1 }} /> Archive
        </MenuItem>
        <MenuItem onClick={() => handleFlag(selectedTicket?.id)}>
          <FlagIcon sx={{ mr: 1 }} /> Flag
        </MenuItem>
        <MenuItem onClick={() => handleDeleteTicket(selectedTicket?.id)} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Edit Ticket Dialog */}
      <Dialog open={editTicketOpen} onClose={() => setEditTicketOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Edit Ticket
          <IconButton onClick={() => setEditTicketOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              required
              value={newTicket.title}
              onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newTicket.description}
              onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                label="Priority"
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Assignee"
              fullWidth
              required
              value={newTicket.assignee}
              onChange={(e) => setNewTicket({ ...newTicket, assignee: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              required
              type="email"
              value={newTicket.email}
              onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditTicketOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditTicket}>
            Update Ticket
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TicketManagementPage;