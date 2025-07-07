'use client';
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
  Snackbar,
  Slide
} from '@mui/material';
import {
  Search as SearchIcon,
  Reply as ReplyIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Flag as FlagIcon,
  Add as AddIcon
} from '@mui/icons-material';
import CreateTicketForm from '../../components/Creationform';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Modal state for Create Ticket Form
  const [createTicketModalOpen, setCreateTicketModalOpen] = useState(false);
  
  // Modal state for Edit Ticket Form
  const [editTicketModalOpen, setEditTicketModalOpen] = useState(false);
  
  // Delete confirmation dialog state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);

  const [editData, setEditData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Open',
    assignee: '',
    email: ''
  });

  const [addData, setAddData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Open',
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

  const generateTicketId = () => {
    const maxId = tickets.reduce((max, ticket) => {
      const num = parseInt(ticket.id.replace('TID', ''));
      return num > max ? num : max;
    }, 0);
    return `TID${String(maxId + 1).padStart(3, '0')}`;
  };

  const getAvatarInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const getCurrentDate = () => {
    const now = new Date();
    return `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
  };

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

  const handleAddTicket = () => {
    if (!addData.title || !addData.assignee || !addData.email) {
      showSnackbar('Please fill in all required fields', 'error');
      return;
    }

    const newTicket = {
      id: generateTicketId(),
      title: addData.title,
      description: addData.description,
      status: addData.status,
      priority: addData.priority,
      assignee: addData.assignee,
      email: addData.email,
      createdDate: getCurrentDate(),
      avatar: getAvatarInitial(addData.assignee),
      bookmarked: false
    };

    setTickets(prev => [newTicket, ...prev]);
    setCreateTicketModalOpen(false);
    resetAddData();
    showSnackbar('Ticket created successfully', 'success');
  };

  const resetAddData = () => {
    setAddData({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Open',
      assignee: '',
      email: ''
    });
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

  // Modal handlers
  const handleOpenCreateTicketModal = () => {
    setCreateTicketModalOpen(true);
  };

  const handleCloseCreateTicketModal = () => {
    setCreateTicketModalOpen(false);
    resetAddData(); // Reset form data when closing
  };

  // Edit Modal handlers
  const handleOpenEditTicketModal = (ticket) => {
    setSelectedTicket(ticket);
    setEditData({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      assignee: ticket.assignee,
      email: ticket.email
    });
    setEditTicketModalOpen(true);
    handleMenuClose();
  };

  const handleCloseEditTicketModal = () => {
    setEditTicketModalOpen(false);
    setSelectedTicket(null);
    resetEditData();
  };

  const resetEditData = () => {
    setEditData({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Open',
      assignee: '',
      email: ''
    });
  };

  // Delete confirmation handlers
  const handleOpenDeleteConfirm = (ticket) => {
    setTicketToDelete(ticket);
    setDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setTicketToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (ticketToDelete) {
      setTickets(prev => prev.filter(ticket => ticket.id !== ticketToDelete.id));
      showSnackbar(`Ticket "${ticketToDelete.title}" deleted successfully`, 'success');
      handleCloseDeleteConfirm();
    }
  };

  // Function to handle ticket creation from the modal
  const handleCreateTicketSubmit = (ticketData) => {
    const newTicket = {
      id: generateTicketId(),
      ...ticketData,
      createdDate: getCurrentDate(),
      avatar: getAvatarInitial(ticketData.assignee),
      bookmarked: false
    };

    setTickets(prev => [newTicket, ...prev]);
    setCreateTicketModalOpen(false);
    showSnackbar('Ticket created successfully', 'success');
  };

  // Function to handle ticket editing from the modal
  const handleEditTicketSubmit = (ticketData) => {
    if (!selectedTicket) return;
    
    const updatedTicket = {
      ...selectedTicket,
      ...ticketData,
      avatar: getAvatarInitial(ticketData.assignee)
    };

    setTickets(prev => prev.map(ticket =>
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    ));
    setEditTicketModalOpen(false);
    showSnackbar('Ticket updated successfully', 'success');
  };

  const openEditDialog = (ticket) => {
    // Validation: Check if ticket exists and has required fields
    if (!ticket) {
      showSnackbar('Error: No ticket selected', 'error');
      return;
    }
    
    if (!ticket.id) {
      showSnackbar('Error: Invalid ticket - missing ID', 'error');
      return;
    }
    
    // Additional validation for required fields
    if (!ticket.title || !ticket.assignee) {
      showSnackbar('Error: Ticket missing required information', 'error');
      return;
    }
    
    // If all validations pass, open the edit modal
    handleOpenEditTicketModal(ticket);
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
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleOpenCreateTicketModal}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1
          }}
        >
          ADD TICKET
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
        {filteredTickets.length === 0 ? (
          <Card sx={{ bgcolor: 'white', boxShadow: 1 }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No tickets found
              </Typography>
            </CardContent>
          </Card>
        ) : (
          filteredTickets.map((ticket) => (
            <Card key={ticket.id} sx={{ bgcolor: 'white', boxShadow: 1 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
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

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={ticket.status}
                      color={statusColors[ticket.status]}
                      size="small"
                      sx={{ fontSize: '0.75rem' }}
                    />

                    <IconButton size="small" onClick={() => handleReply(ticket)} sx={{ color: '#666' }}>
                      <ReplyIcon />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => handleBookmark(ticket.id)}
                      sx={{ color: ticket.bookmarked ? '#ff9800' : '#666' }}
                    >
                      {ticket.bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>

                    <IconButton size="small" onClick={() => openEditDialog(ticket)} sx={{ color: '#666' }}>
                      <EditIcon />
                    </IconButton>

                    <IconButton 
                      size="small" 
                      onClick={() => handleOpenDeleteConfirm(ticket)} 
                      sx={{ color: '#f44336' }}
                    >
                      <DeleteIcon />
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
          ))
        )}
      </Stack>

      {/* Create Ticket Modal */}
      <Dialog
        open={createTicketModalOpen}
        onClose={handleCloseCreateTicketModal}
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            minHeight: '400px'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 2
        }}>
          <Typography variant="h6" component="div">
            Create New Ticket
          </Typography>
          <IconButton 
            onClick={handleCloseCreateTicketModal}
            size="small"
            sx={{ color: '#666' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 0 }}>
          <CreateTicketForm 
            open={createTicketModalOpen}
            onClose={handleCloseCreateTicketModal}
            onSubmit={handleCreateTicketSubmit}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCloseDeleteConfirm}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center',
          pb: 2,
          color: '#f44336'
        }}>
          <DeleteIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Delete Ticket
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete the following ticket?
          </Typography>
          <Box sx={{ 
            p: 2, 
            bgcolor: '#f5f5f5', 
            borderRadius: 1,
            border: '1px solid #e0e0e0'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {ticketToDelete?.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              <strong>ID:</strong> {ticketToDelete?.id}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              <strong>Assignee:</strong> {ticketToDelete?.assignee}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              <strong>Status:</strong> {ticketToDelete?.status}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, color: '#f44336' }}>
            <strong>Warning:</strong> This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleCloseDeleteConfirm}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete Ticket
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Ticket Modal */}
      <Dialog
        open={editTicketModalOpen}
        onClose={handleCloseEditTicketModal}
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            minHeight: '400px'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 2
        }}>
          <Typography variant="h6" component="div">
            Edit Ticket - {selectedTicket?.id}
          </Typography>
          <IconButton 
            onClick={handleCloseEditTicketModal}
            size="small"
            sx={{ color: '#666' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 0 }}>
          <CreateTicketForm 
            open={editTicketModalOpen}
            onClose={handleCloseEditTicketModal}
            onSubmit={handleEditTicketSubmit}
            initialData={editData}
            isEditing={true}
          />
        </DialogContent>
      </Dialog>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleStatusChange(selectedTicket?.id, 'Open')}>Mark as Open</MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedTicket?.id, 'In Progress')}>Mark as In Progress</MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedTicket?.id, 'Resolved')}>Mark as Resolved</MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedTicket?.id, 'Closed')}>Mark as Closed</MenuItem>
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