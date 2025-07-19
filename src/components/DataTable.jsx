'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  IconButton
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Add as AddIcon, 
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

export default function DataTable({
  title,
  data = [],
  columns = [],
  loading = false,
  error = null,
  onAdd,
  onEdit,
  onDelete,
  onView,
  searchFields = [],
  filterOptions = {},
  entityType = 'item',
  showView = false
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });
  const [deleting, setDeleting] = useState(false);

  // Helper function to get nested object values
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value?.[key], obj);
  };

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = data;

    // Apply search
    if (searchTerm && searchFields.length > 0) {
      result = result.filter(item =>
        searchFields.some(field => {
          const value = getNestedValue(item, field);
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter(item => {
          const itemValue = getNestedValue(item, key);
          return itemValue === value;
        });
      }
    });

    return result;
  }, [data, searchTerm, filters, searchFields]);

  // Render cell content based on column configuration
  const renderCellContent = (item, column) => {
    const value = getNestedValue(item, column.field);

    switch (column.type) {
      case 'avatar':
        return (
          <Avatar src={value} sx={{ width: 32, height: 32 }}>
            {column.fallback ? getNestedValue(item, column.fallback)?.charAt(0).toUpperCase() : '?'}
          </Avatar>
        );
      case 'chips':
        return value?.map((chipValue, index) => (
          <Chip
            key={`${item._id}-${column.field}-${index}`}
            label={chipValue}
            size="small"
            sx={{ mr: 0.5, mb: 0.5 }}
          />
        ));
      case 'status':
        return (
          <Chip
            label={value}
            size="small"
            color={column.statusColors?.[value] || 'default'}
          />
        );
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '';
      default:
        return value || '';
    }
  };

  const handleDeleteClick = (item) => {
    setDeleteDialog({ open: true, item });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.item || !onDelete) return;
    
    setDeleting(true);
    try {
      await onDelete(deleteDialog.item._id);
      setDeleteDialog({ open: false, item: null });
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, item: null });
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {onAdd && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            sx={{ textTransform: 'none' }}
          >
            New {entityType}
          </Button>
        )}
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        {searchFields.length > 0 && (
          <TextField
            placeholder={`Search ${entityType}s...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}

        {/* Filters */}
        {Object.entries(filterOptions).map(([filterKey, options]) => (
          <FormControl key={filterKey} size="small" sx={{ minWidth: 150 }}>
            <InputLabel>{options.label}</InputLabel>
            <Select
              value={filters[filterKey] || 'all'}
              onChange={(e) => handleFilterChange(filterKey, e.target.value)}
              label={options.label}
            >
              <MenuItem value="all">All {options.label}</MenuItem>
              {options.values.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Box>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredData.length} of {data.length} {entityType}s
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Table */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field}>{column.header}</TableCell>
                ))}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow 
                  key={item._id} 
                  hover 
                  onClick={() => onView && onView(item._id)}
                  sx={{ 
                    cursor: onView ? 'pointer' : 'default',
                    '&:hover': onView ? { backgroundColor: '#f5f5f5' } : {}
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {renderCellContent(item, column)}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    <Box 
                      sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {showView && onView && (
                        <IconButton
                          size="small"
                          onClick={() => onView(item._id)}
                          title="View"
                        >
                          <ViewIcon />
                        </IconButton>
                      )}
                      {onEdit && (
                        <IconButton
                          size="small"
                          onClick={() => onEdit(item._id)}
                          title="Edit"
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(item)}
                          title="Delete"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                      {data.length === 0 ? `No ${entityType}s yet` : `No ${entityType}s match your search criteria`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.length === 0 ? `Create your first ${entityType} to get started` : 'Try adjusting your search or filters'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        maxWidth="sm"
      >
        <DialogTitle>Delete {entityType}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {entityType}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={deleting}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={16} /> : <DeleteIcon />}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
