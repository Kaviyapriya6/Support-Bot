'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  Toolbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add, Search, Edit, Delete, Phone, Email, Twitter, Facebook, Business, MoreVert, FilterList, Download as Export, Upload as Import, Refresh as Sync } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { getContacts, deleteContact } from '../lib/contacts'; // Adjust the import path as necessary

const ContactListPage = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filters, setFilters] = useState({
    timezone: '',
    tags: '',
    company: ''
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  useEffect(() => {
    let filtered = contacts;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.timezone) {
      filtered = filtered.filter(contact => contact.timezone === filters.timezone);
    }
    if (filters.company) {
      filtered = filtered.filter(contact => contact.company === filters.company);
    }
    if (filters.tags) {
      filtered = filtered.filter(contact => 
        contact.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase()))
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, filters]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleSelectContact = (contactId) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete.id);
      setContacts(getContacts());
      setDeleteDialogOpen(false);
      setContactToDelete(null);
      setNotification({
        open: true,
        message: 'Contact deleted successfully',
        severity: 'success'
      });
    }
  };

  const uniqueTimezones = [...new Set(contacts.map(c => c.timezone))];
  const uniqueCompanies = [...new Set(contacts.map(c => c.company))];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Contacts</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button startIcon={<Export />} variant="outlined">
            Export
          </Button>
          <Button startIcon={<Import />} variant="outlined">
            Import
          </Button>
          <Button startIcon={<Sync />} variant="outlined">
            Sync
          </Button>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => router.push('/contact/create')}
          >
            Add Contact
          </Button>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search all contacts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={filters.timezone}
              onChange={(e) => setFilters(prev => ({ ...prev, timezone: e.target.value }))}
              label="Timezone"
            >
              <MenuItem value="">Any</MenuItem>
              {uniqueTimezones.map(tz => (
                <MenuItem key={tz} value={tz}>{tz}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Company</InputLabel>
            <Select
              value={filters.company}
              onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
              label="Company"
            >
              <MenuItem value="">Any</MenuItem>
              {uniqueCompanies.map(company => (
                <MenuItem key={company} value={company}>{company}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            placeholder="Filter by tags"
            value={filters.tags}
            onChange={(e) => setFilters(prev => ({ ...prev, tags: e.target.value }))}
            sx={{ minWidth: 150 }}
          />
        </Box>
      </Paper>

      {/* Contacts Table */}
      <TableContainer component={Paper}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <Checkbox
            indeterminate={selectedContacts.length > 0 && selectedContacts.length < filteredContacts.length}
            checked={filteredContacts.length > 0 && selectedContacts.length === filteredContacts.length}
            onChange={handleSelectAll}
          />
          <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
            {selectedContacts.length > 0 ? `${selectedContacts.length} selected` : `${filteredContacts.length} contacts`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            1 - 2 of 2
          </Typography>
        </Toolbar>
        
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedContacts.length > 0 && selectedContacts.length < filteredContacts.length}
                  checked={filteredContacts.length > 0 && selectedContacts.length === filteredContacts.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Email address</TableCell>
              <TableCell>Work phone</TableCell>
              <TableCell>Facebook</TableCell>
              <TableCell>Twitter</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => handleSelectContact(contact.id)}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={contact.profileImage}
                      sx={{ mr: 2, width: 40, height: 40 }}
                    >
                      {contact.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">{contact.name}</Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {contact.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{contact.title || '---'}</TableCell>
                <TableCell>{contact.company || '---'}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ mr: 1, fontSize: 16 }} />
                    {contact.email}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ mr: 1, fontSize: 16 }} />
                    {contact.workPhone}
                  </Box>
                </TableCell>
                <TableCell>{contact.facebook || '---'}</TableCell>
                <TableCell>{contact.twitter || '---'}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => router.push(`/contact/edit/${contact.id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteContact(contact)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {contactToDelete?.name}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      {notification.open && (
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}
        >
          {notification.message}
        </Alert>
      )}
    </Box>
  );
};

export default ContactListPage;