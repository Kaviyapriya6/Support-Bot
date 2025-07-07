
"use client"
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Grid,
  AppBar,
  Toolbar,
  Container,
  Paper,
  InputAdornment,
  Avatar,
  Divider,
  FormHelperText,
  Alert,
  Stack,
  Badge,
  Tooltip,
  Menu,
  ListItemIcon,
  ListItemText,
  MenuItem as MuiMenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Reply as ReplyIcon,
  Bookmark as BookmarkIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Forward as ForwardIcon,
  Chat as ChatIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon,
  CloudUpload as CloudUploadIcon,
  SmartToy as SmartToyIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme with BizBooks colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0047AB', // Deep Blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFD700', // Gold
      contrastText: '#000000',
    },
    background: {
      default: '#F0F4F8', // Light Gray
      paper: '#ffffff',
    },
    success: {
      main: '#28a745',
    },
    error: {
      main: '#FF4C4C',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

const TicketingSystem = () => {
  const [currentView, setCurrentView] = useState('list');
  const [tickets, setTickets] = useState([
    {
      id: 'TID001',
      title: 'Login Issues with Mobile App',
      contact: 'Ramani',
      department: 'Zoho',
      email: 'ramani@zoho.com',
      phone: '+91 9876543210',
      issueType: 'Bug',
      priority: 'P1',
      status: 'Open',
      description: 'Unable to login to mobile app after recent update. Getting error message.',
      createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
      attachments: []
    },
    {
      id: 'TID002',
      title: 'Feature Request: Dark Mode',
      contact: 'Priya Kumar',
      department: 'Design',
      email: 'priya@company.com',
      phone: '+91 9876543211',
      issueType: 'Request',
      priority: 'P2',
      status: 'In Progress',
      description: 'Request to add dark mode feature to the application for better user experience.',
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      attachments: []
    },
    {
      id: 'TID003',
      title: 'Payment Gateway Integration',
      contact: 'Arjun Singh',
      department: 'Development',
      email: 'arjun@company.com',
      phone: '+91 9876543212',
      issueType: 'Support',
      priority: 'P3',
      status: 'Resolved',
      description: 'Need help with payment gateway integration for the new checkout flow.',
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
      attachments: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [formData, setFormData] = useState({
    contact: '',
    email: '',
    phone: '',
    issueType: '',
    priority: '',
    subject: '',
    description: '',
    attachments: []
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const filtered = tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(filtered);
  }, [searchTerm, tickets]);

  const generateTicketId = () => {
    const num = tickets.length + 1;
    return `TID${num.toString().padStart(3, '0')}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'default';
      case 'In Progress': return 'primary';
      case 'Resolved': return 'success';
      case 'Closed': return 'secondary';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'P1': return 'error';
      case 'P2': return 'warning';
      case 'P3': return 'success';
      default: return 'default';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    return 'Just now';
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
  };

  const handleFormSubmit = () => {
    if (!formData.contact || !formData.issueType || !formData.priority || !formData.subject || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newTicket = {
      id: generateTicketId(),
      title: formData.subject,
      contact: formData.contact,
      department: 'General',
      email: formData.email,
      phone: formData.phone,
      issueType: formData.issueType,
      priority: formData.priority,
      status: 'Open',
      description: formData.description,
      createdAt: new Date(),
      attachments: formData.attachments
    };
    
    setTickets([newTicket, ...tickets]);
    setFormData({
      contact: '',
      email: '',
      phone: '',
      issueType: '',
      priority: '',
      subject: '',
      description: '',
      attachments: []
    });
    setCurrentView('list');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMenuClick = (event, ticket) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  const TicketListItem = ({ ticket }) => (
    <Card sx={{ mb: 2, transition: 'all 0.3s ease' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="body2" color="text.secondary" fontWeight="medium">
                {ticket.id}
              </Typography>
              <Chip
                label={ticket.priority}
                color={getPriorityColor(ticket.priority)}
                size="small"
                variant="outlined"
              />
            </Box>
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              {ticket.title}
            </Typography>
            
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                {ticket.contact.charAt(0)}
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                <strong>{ticket.contact}</strong> · {ticket.department}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" gap={3} color="text.secondary">
              <Box display="flex" alignItems="center" gap={0.5}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="body2">
                  {getTimeAgo(ticket.createdAt)}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <CalendarIcon fontSize="small" />
                <Typography variant="body2">
                  {ticket.createdAt.toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="flex-end" gap={2}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
              
              <Box display="flex" gap={0.5}>
                <Tooltip title="Reply">
                  <IconButton size="small" color="primary">
                    <ReplyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bookmark">
                  <IconButton size="small" color="secondary">
                    <BookmarkIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton size="small" color="success">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="More">
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMenuClick(e, ticket)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const TicketForm = () => (
    <Card>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            onClick={() => setCurrentView('list')}
            color="primary"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            Create New Ticket
          </Typography>
        </Box>
      </Box>
      
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Name"
              required
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              error={!formData.contact}
              helperText={!formData.contact ? 'Contact name is required' : ''}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Ticket ID"
              value={generateTicketId()}
              disabled
              variant="filled"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required error={!formData.issueType}>
              <InputLabel>Issue Type</InputLabel>
              <Select
                value={formData.issueType}
                label="Issue Type"
                onChange={(e) => handleInputChange('issueType', e.target.value)}
              >
                <MenuItem value="Bug">Bug</MenuItem>
                <MenuItem value="Request">Feature Request</MenuItem>
                <MenuItem value="Support">Support</MenuItem>
                <MenuItem value="Question">Question</MenuItem>
              </Select>
              {!formData.issueType && (
                <FormHelperText>Issue type is required</FormHelperText>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required error={!formData.priority}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label="Priority"
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                <MenuItem value="P1">P1 - High</MenuItem>
                <MenuItem value="P2">P2 - Medium</MenuItem>
                <MenuItem value="P3">P3 - Low</MenuItem>
              </Select>
              {!formData.priority && (
                <FormHelperText>Priority is required</FormHelperText>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subject"
              required
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              error={!formData.subject}
              helperText={!formData.subject ? 'Subject is required' : ''}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              required
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              error={!formData.description}
              helperText={!formData.description ? 'Description is required' : ''}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                p: 4,
                textAlign: 'center',
                border: '2px dashed',
                borderColor: 'grey.300',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'primary.50',
                }
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                <strong>Click to upload</strong> or drag and drop
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PNG, JPG, PDF up to 10MB
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Box display="flex" gap={2} mt={4}>
          <Button
            variant="contained"
            size="large"
            onClick={handleFormSubmit}
            sx={{ px: 4 }}
          >
            Create Ticket
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setCurrentView('list')}
            sx={{ px: 4 }}
          >
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Header */}
        <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper' }}>
          <Toolbar>
            <Box display="flex" alignItems="center" gap={2} flexGrow={1}>
              <Typography variant="h4" color="text.primary">
                {currentView === 'list' ? 'All Tickets' : 'Create Ticket'}
              </Typography>
              {currentView === 'list' && (
                <Badge badgeContent={tickets.length} color="primary">
                  <Chip label="Tickets" variant="outlined" />
                </Badge>
              )}
            </Box>
            
            <Box display="flex" alignItems="center" gap={2}>
              {currentView === 'list' && (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<SmartToyIcon />}
                    sx={{ color: 'black' }}
                  >
                    AI Assistant
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setCurrentView('add')}
                  >
                    Add Ticket
                  </Button>
                </>
              )}
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
              <IconButton color="inherit">
                <PersonIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {currentView === 'list' ? (
            <>
              {/* Search and Filters */}
              <Box mb={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ flexGrow: 1, maxWidth: 400 }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                  >
                    Filter
                  </Button>
                </Stack>
              </Box>

              {/* Tickets List */}
              <Box>
                {filteredTickets.length === 0 ? (
                  <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <ChatIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      No tickets found
                    </Typography>
                    <Typography color="text.secondary">
                      {searchTerm ? 'Try adjusting your search terms' : 'Create your first ticket to get started'}
                    </Typography>
                  </Paper>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TicketListItem key={ticket.id} ticket={ticket} />
                  ))
                )}
              </Box>
            </>
          ) : (
            <TicketForm />
          )}
        </Container>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MuiMenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <ForwardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Forward</ListItemText>
          </MuiMenuItem>
          <MuiMenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <ChatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Chat</ListItemText>
          </MuiMenuItem>
          <MuiMenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Assign</ListItemText>
          </MuiMenuItem>
        </Menu>
      </Box>
    </ThemeProvider>
  );
};

export default TicketingSystem;