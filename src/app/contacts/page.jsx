// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead,
//   TableRow, Paper, Avatar, Chip, IconButton, Checkbox, Toolbar, TextField,
//   FormControl, InputLabel, Select, MenuItem, InputAdornment, Dialog, DialogTitle,
//   DialogContent, DialogActions, Alert
// } from '@mui/material';
// import { Add, Search, Edit, Delete } from '@mui/icons-material';

// const ContactListPage = () => {
//   const router = useRouter();
//   const [contacts, setContacts] = useState([]);
//   const [search, setSearch] = useState('');
//   const [notification, setNotification] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [contactToDelete, setContactToDelete] = useState(null);

//   const fetchContacts = async () => {
//     const res = await fetch('/api/contacts');
//     const data = await res.json();
//     setContacts(data);
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const handleDelete = (contact) => {
//     setContactToDelete(contact);
//     setDeleteDialogOpen(true);
//   };

//   const confirmDelete = async () => {
//     const res = await fetch(`/api/contacts/${contactToDelete._id}`, {
//       method: 'DELETE'
//     });
//     if (res.ok) {
//       setNotification({ message: 'Deleted successfully', severity: 'success' });
//       fetchContacts();
//     } else {
//       setNotification({ message: 'Failed to delete', severity: 'error' });
//     }
//     setDeleteDialogOpen(false);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
//         <Typography variant="h4">Contacts</Typography>
//         <Button
//           startIcon={<Add />}
//           variant="contained"
//           onClick={() => router.push('/contact/create')}
//         >
//           Add Contact
//         </Button>
//       </Box>

//       <TextField
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search"
//         InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
//         sx={{ mb: 2, width: 300 }}
//       />

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Contact</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Company</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(contact => (
//               <TableRow key={contact._id}>
//                 <TableCell>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Avatar src={contact.profileImage} sx={{ mr: 1 }}>
//                       {contact.name.charAt(0)}
//                     </Avatar>
//                     {contact.name}
//                   </Box>
//                 </TableCell>
//                 <TableCell>{contact.email}</TableCell>
//                 <TableCell>{contact.company}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => router.push(`/contacts/edit/${contact._id}`)}><Edit /></IconButton>
//                   <IconButton color="error" onClick={() => handleDelete(contact)}><Delete /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>Delete {contactToDelete?.name}?</DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button color="error" onClick={confirmDelete}>Delete</Button>
//         </DialogActions>
//       </Dialog>

//       {notification && (
//         <Alert
//           severity={notification.severity}
//           onClose={() => setNotification(null)}
//           sx={{ mt: 2 }}
//         >
//           {notification.message}
//         </Alert>
//       )}
//     </Box>
//   );
// };

// export default ContactListPage;
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '../../components/DataTable';

export default function ContactListPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contacts');
      if (!res.ok) throw new Error('Failed to fetch contacts');
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = () => {
    router.push('/contacts/create');
  };

  const handleEdit = (id) => {
    router.push(`/contacts/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) throw new Error('Failed to delete contact');
    
    // Remove the deleted contact from the list
    setContacts(contacts.filter(contact => contact._id !== id));
  };

  const columns = [
    {
      field: 'name',
      header: 'Name'
    },
    {
      field: 'email',
      header: 'Email'
    },
    {
      field: 'phone',
      header: 'Phone'
    },
    {
      field: 'company',
      header: 'Company'
    },
    {
      field: 'status',
      header: 'Status',
      type: 'status',
      statusColors: {
        'active': 'success',
        'inactive': 'default',
        'blocked': 'error'
      }
    },
    {
      field: 'createdAt',
      header: 'Created Date',
      type: 'date'
    }
  ];

  const searchFields = ['name', 'email', 'phone', 'company'];

  const filterOptions = {
    status: {
      label: 'Status',
      values: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'blocked', label: 'Blocked' }
      ]
    }
  };

  return (
    <DataTable
      title="Contacts"
      data={contacts}
      columns={columns}
      loading={loading}
      error={error}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchFields={searchFields}
      filterOptions={filterOptions}
      entityType="contact"
    />
  );
}
