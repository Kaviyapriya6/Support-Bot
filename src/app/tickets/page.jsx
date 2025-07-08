'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Button, Chip, Snackbar, Alert, TextField, MenuItem, 
  Select, FormControl, InputLabel, Paper, Stack, Card, CardContent
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Assignment as AssignmentIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const router = useRouter();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/tickets');
      if (!res.ok) throw new Error('Failed to fetch tickets');
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      showToast('Error fetching tickets', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    try {
      const res = await fetch(`/api/tickets/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete ticket');
      showToast('Ticket deleted successfully', 'success');
      fetchTickets();
    } catch (err) {
      showToast('Error deleting ticket', 'error');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const ticketToUpdate = tickets.find(t => t._id === id);
      if (!ticketToUpdate) return;

      const res = await fetch(`/api/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...ticketToUpdate,
          status: newStatus
        })
      });

      if (!res.ok) throw new Error('Failed to update status');
      
      // Update local state
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket._id === id ? { ...ticket, status: newStatus } : ticket
        )
      );
      
      showToast('Status updated successfully', 'success');
    } catch (err) {
      showToast('Error updating status', 'error');
      // Revert the change by refetching
      fetchTickets();
    }
  };

  const showToast = (message, severity) => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject?.toLowerCase().includes(search.toLowerCase()) ||
      t.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      t.ticketId?.toLowerCase().includes(search.toLowerCase()) ||
      t.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColor = (status) => {
    switch (status) {
      case 'Open': return 'info';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      case 'Closed': return 'default';
      default: return 'primary';
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const columns = [
    { 
      field: 'ticketId', 
      headerName: 'Ticket ID', 
      width: 140,
      renderCell: ({ value }) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
          {value}
        </Typography>
      )
    },
    { 
      field: 'customerName', 
      headerName: 'Customer Name', 
      width: 120,
      renderCell: ({ value }) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      )
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 200,
      renderCell: ({ value }) => (
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          {value}
        </Typography>
      )
    },
    { 
      field: 'phone', 
      headerName: 'Phone', 
      width: 130,
      renderCell: ({ value }) => (
        <Typography variant="body2">
          {value}
        </Typography>
      )
    },
    { 
      field: 'subject', 
      headerName: 'Subject', 
      width: 200,
      renderCell: ({ value }) => (
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {value}
        </Typography>
      )
    },
    {      
      field: 'issueType', 
      headerName: 'Issue Type', 
      width: 140,
      renderCell: ({ value }) => (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          height: '100%',
          py: 0.5
        }}>
          <Chip 
            label={value} 
            variant="outlined" 
            size="small"
            sx={{ 
              borderColor: 'primary.main', 
              color: 'primary.main',
              fontWeight: 500,
              fontSize: '0.75rem',
              height: 24,
              '& .MuiChip-label': {
                px: 1.5,
                fontSize: '0.75rem'
              }
            }} 
          />
        </Box>
      )
    },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 100,
      renderCell: ({ value }) => (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          height: '100%',
          py: 0.5
        }}>
          <Chip 
            label={value} 
            color={priorityColor(value)} 
            variant="filled" 
            size="small"
            sx={{ 
              fontWeight: 500,
              fontSize: '0.75rem',
              height: 24,
              minWidth: 60,
              '& .MuiChip-label': {
                px: 1.5,
                fontSize: '0.75rem'
              }
            }}
          />
        </Box>
      )
    },
    {
      field: 'status', 
      headerName: 'Status', 
      width: 150, 
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Open', 'In Progress', 'Resolved', 'Closed'],
      renderCell: ({ value, row }) => (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          height: '100%',
          py: 0.5
        }}>
          <FormControl size="small" fullWidth>
            <Select
              value={value || 'Open'}
              onChange={(e) => handleStatusUpdate(row._id, e.target.value)}
              variant="outlined"
              sx={{
                height: 32,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& .MuiSelect-select': {
                  padding: '4px 8px',
                  display: 'flex',
                  alignItems: 'center'
                }
              }}
              renderValue={(selected) => (
                <Chip 
                  label={selected} 
                  color={statusColor(selected)} 
                  variant="filled" 
                  size="small"
                  sx={{ 
                    fontWeight: 500,
                    height: 24,
                    '& .MuiChip-label': {
                      fontSize: '0.75rem',
                      px: 1.5
                    }
                  }}
                />
              )}
            >
              {['Open', 'In Progress', 'Resolved', 'Closed'].map((status) => (
                <MenuItem key={status} value={status}>
                  <Chip 
                    label={status} 
                    color={statusColor(status)} 
                    variant="filled" 
                    size="small"
                    sx={{ 
                      fontWeight: 500,
                      '& .MuiChip-label': {
                        fontSize: '0.75rem'
                      }
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )
    },
    {
      field: 'actions', 
      headerName: 'Actions', 
      width: 160, 
      sortable: false, 
      renderCell: ({ row }) => (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          height: '100%',
          py: 0.5
        }}>
          <Stack direction="row" spacing={0.5}>
            <IconButton 
              size="small"
              color="info" 
              onClick={() => router.push(`/tickets/view/${row._id}`)}
              sx={{
                '&:hover': {
                  bgcolor: 'info.light',
                  color: 'white'
                }
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small"
              color="primary" 
              onClick={() => router.push(`/tickets/edit/${row._id}`)}
              sx={{
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'white'
                }
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small"
              color="error" 
              onClick={() => handleDelete(row._id)}
              sx={{
                '&:hover': {
                  bgcolor: 'error.light',
                  color: 'white'
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      )
    }
  ];

  const getTicketStats = () => {
    const stats = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'Open').length,
      inProgress: tickets.filter(t => t.status === 'In Progress').length,
      resolved: tickets.filter(t => t.status === 'Resolved').length,
      closed: tickets.filter(t => t.status === 'Closed').length
    };
    return stats;
  };

  const stats = getTicketStats();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f8fafc',
      p: 3
    }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ 
          mb: 4,
          p: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ 
                p: 1.5, 
                bgcolor: 'primary.main', 
                borderRadius: 2,
                color: 'white'
              }}>
                <AssignmentIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Support Tickets
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                  Manage and track all customer support tickets
                </Typography>
              </Box>
            </Stack>
            
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => router.push('/tickets/create')}
              sx={{ 
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600
              }}
            >
              Create Ticket
            </Button>
          </Stack>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" spacing={3}>
            <Card sx={{ 
              flex: 1, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {stats.total}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Total Tickets
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              flex: 1, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'info.main' }}>
                  {stats.open}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Open
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              flex: 1, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main' }}>
                  {stats.inProgress}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  In Progress
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              flex: 1, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main' }}>
                  {stats.resolved}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Resolved
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        {/* Filters */}
        <Box sx={{ 
          mb: 3,
          p: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <SearchIcon sx={{ color: '#64748b' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                Search & Filter
              </Typography>
            </Stack>
            
            <TextField
              label="Search Tickets"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ 
                minWidth: 300,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
              placeholder="Search by Ticket ID, Customer ID, Email..."
            />

            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status Filter"
                sx={{
                  borderRadius: 2,
                }}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>

            <Chip 
              label={`${filteredTickets.length} tickets found`}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          </Stack>
        </Box>

        {/* Data Table */}
        <Paper sx={{ 
          p: 3, 
          borderRadius: 2,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0',
          bgcolor: 'white'
        }}>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredTickets.map(t => ({ ...t, id: t._id }))}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 25]}
              loading={loading}
              sortingOrder={['asc', 'desc']}
              disableSelectionOnClick
              rowHeight={56}
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': {
                  bgcolor: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  fontWeight: 600,
                  color: '#1e293b'
                },
                '& .MuiDataGrid-row': {
                  borderBottom: '1px solid #f1f5f9',
                  '&:hover': {
                    bgcolor: '#f8fafc'
                  }
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }
              }}
            />
          </div>
        </Paper>

        <Snackbar open={toast.open} autoHideDuration={3000} onClose={handleCloseToast}>
          <Alert 
            onClose={handleCloseToast} 
            severity={toast.severity} 
            sx={{ 
              width: '100%',
              borderRadius: 2
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
